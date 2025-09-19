import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import type { Post } from '@/lib/types';

// Posts
export async function fetchPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('published_date', { ascending: false });
  if (error) throw error;
  return (data || []).map(dbToPost);
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) {
    if (error.code === 'PGRST116') return null; // no rows
    throw error;
  }
  return dbToPost(data as Tables<'posts'>);
}

export async function upsertPost(post: Post): Promise<Post> {
  const row: TablesInsert<'posts'> = {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    author: post.author,
    published_date: post.publishedDate ?? null,
    featured_image: post.featuredImage,
    content: post.content,
    status: post.status || 'published',
  };
  const { data, error } = await supabase
    .from('posts')
    .upsert(row)
    .select('*')
    .single();
  if (error) throw error;
  return dbToPost(data as Tables<'posts'>);
}

export async function deletePost(slug: string): Promise<void> {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('slug', slug);
  if (error) throw error;
}

function dbToPost(row: Tables<'posts'>): Post {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    author: row.author,
    publishedDate: row.published_date || new Date().toISOString(),
    featuredImage: row.featured_image,
    content: row.content,
    status: row.status as Post['status'],
  };
}

// Popup Config
export type PopupConfig = Tables<'popup_config'>;

export async function fetchPopupConfig(): Promise<PopupConfig | null> {
  try {
    const { data, error, status } = await supabase
      .from('popup_config')
      .select('*')
      .order('id', { ascending: true })
      .limit(1)
      .maybeSingle();
    if (error) {
      // Gracefully swallow 404 / table not found so UI still works
      if (status === 404 || (error as any).code === '42P01') return null;
      throw error;
    }
    return data ?? null;
  } catch (e) {
    // Network/DNS or client init error - return null to use local defaults
    console.warn('fetchPopupConfig failed, using defaults:', e);
    return null;
  }
}

export async function savePopupConfig(cfg: Partial<PopupConfig>): Promise<PopupConfig> {
  // Ensure there's always a single row with id=1
  const payload: TablesInsert<'popup_config'> | TablesUpdate<'popup_config'> = {
    id: 1,
    enabled: cfg.enabled ?? true,
    delay_ms: cfg.delay_ms ?? 3000,
    title: cfg.title ?? 'Special Offer!',
    subtitle: cfg.subtitle ?? '20% OFF Last-Minute Bookings',
    validity_text: cfg.validity_text ?? 'Valid for today only',
    body_text: cfg.body_text ?? 'Book your appointment today and enjoy 20% off our premium services.',
    whatsapp_number: cfg.whatsapp_number ?? '919876543210',
  whatsapp_message: cfg.whatsapp_message ?? "Hi B21! I'm interested in your 20% off last-minute booking offer.",
  // @ts-ignore optional column depending on DB migration
  banner_image: (cfg as any).banner_image ?? '/Pop-up banner offer.webp'
  };
  const { data, error } = await supabase
    .from('popup_config')
    .upsert(payload as TablesInsert<'popup_config'>)
    .select('*')
    .single();
  if (error) throw error;
  return data as PopupConfig;
}

// Franchise Leads
export async function saveFranchiseLead(form: { name:string; email:string; phone:string; city:string; message:string; }) {
  try {
    // cast supabase any to allow inserting into optional table not present in generated types
    const client:any = supabase as any;
    const { error } = await client.from('franchise_leads').insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      city: form.city,
      message: form.message,
      created_at: new Date().toISOString()
    });
    if (error) throw error;
  } catch (e) {
    console.warn('Franchise lead not saved (table missing?):', e);
  }
}
