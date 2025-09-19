// Supabase Edge Function: google-reviews
// Fetches Google Places reviews for configured Place IDs and caches them in Supabase
// Requires environment variables: GOOGLE_API_KEY, PLACE_IDS (comma-separated)
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

// Types for Google Places Details API
interface GoogleReview {
  author_name: string
  author_url?: string
  profile_photo_url?: string
  rating: number
  relative_time_description?: string
  text: string
  time: number // unix seconds
  language?: string
}

interface PlaceDetailsResponse {
  result?: { reviews?: GoogleReview[]; name?: string; place_id?: string }
  status: string
  error_message?: string
}

const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY')
const PLACE_IDS = (Deno.env.get('PLACE_IDS') || '').split(',').map((s: string) => s.trim()).filter(Boolean)
const PLACE_INPUTS = (Deno.env.get('PLACE_INPUTS') || '').split(',').map((s: string) => s.trim()).filter(Boolean)

if (!GOOGLE_API_KEY) {
  console.error('Missing GOOGLE_API_KEY')
}

async function fetchReviews(placeId: string): Promise<GoogleReview[]> {
  const fields = 'reviews,name,place_id'
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=${fields}&key=${GOOGLE_API_KEY}`
  const res = await fetch(url)
  const data = await res.json() as PlaceDetailsResponse
  if (data.status !== 'OK') {
    console.warn('Google Places error', { placeId, status: data.status, error: data.error_message })
    return []
  }
  return data.result?.reviews || []
}

async function resolvePlaceId(input: string): Promise<string | null> {
  // Accept either plain name or full Google Maps URL
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(input)}&inputtype=textquery&fields=place_id&key=${GOOGLE_API_KEY}`
  const res = await fetch(url)
  const data = await res.json() as { status: string; candidates?: Array<{ place_id: string }> }
  if (data.status !== 'OK' || !data.candidates?.length) return null
  return data.candidates[0].place_id
}

async function upsertReviewsToDb(placeId: string, reviews: GoogleReview[]) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

  const endpoint = `${supabaseUrl}/rest/v1/google_reviews`
  const rows = reviews.map((r) => ({
    place_id: placeId,
    author_name: r.author_name,
    author_url: r.author_url ?? null,
    profile_photo_url: r.profile_photo_url ?? null,
    rating: r.rating,
    text: r.text,
    time: new Date(r.time * 1000).toISOString(),
    language: r.language ?? null,
    created_at: new Date().toISOString(),
  }))

  // Delete old reviews for this place then insert new ones (simple cache replace)
  await fetch(`${endpoint}?place_id=eq.${encodeURIComponent(placeId)}`, {
    method: 'DELETE',
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json'
    }
  })

  if (rows.length) {
    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rows)
    })
  }
}

serve(async (req) => {
  try {
    const url = new URL(req.url)
    let refresh = url.searchParams.get('refresh') === '1'
    // Also accept JSON body { refresh: boolean }
    if (!refresh && (req.method === 'POST' || req.method === 'GET')) {
      try {
        const body = await req.json().catch(() => null)
        if (body && typeof body.refresh === 'boolean') refresh = body.refresh
      } catch (_) {/* ignore */}
    }

    // Allow CORS
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,OPTIONS',
          'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        },
      })
    }

    // Determine list of place IDs
    let pids: string[] = [...PLACE_IDS]
    if (!pids.length && PLACE_INPUTS.length) {
      for (const inp of PLACE_INPUTS) {
        const pid = await resolvePlaceId(inp)
        if (pid) pids.push(pid)
      }
    }
    if (!pids.length) return new Response(JSON.stringify({ error: 'No PLACE_IDS or PLACE_INPUTS configured' }), { status: 400 })

    // On refresh, fetch from Google and cache to DB
    if (refresh) {
      for (const pid of pids) {
        const reviews = await fetchReviews(pid)
        await upsertReviewsToDb(pid, reviews)
      }
    }

    // Always return cached reviews from DB
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseAnon = Deno.env.get('SUPABASE_ANON_KEY')!
  const endpoint = `${supabaseUrl}/rest/v1/google_reviews?select=*&order=time.desc&limit=60`
    const res = await fetch(endpoint, {
      headers: { 'apikey': supabaseAnon, 'Authorization': `Bearer ${supabaseAnon}` }
    })
    const cached = await res.json()

    return new Response(JSON.stringify({ reviews: cached }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (e) {
    console.error(e)
    return new Response(JSON.stringify({ error: 'Internal error' }), { status: 500 })
  }
})
