import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Review {
  id?: number;
  place_id: string;
  author_name: string;
  author_url?: string | null;
  profile_photo_url?: string | null;
  rating: number;
  text?: string | null;
  time: string; // ISO
  language?: string | null;
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fn = async () => {
      try {
        // 1) Get cached reviews from Supabase Edge Function
        const res = await supabase.functions.invoke('google-reviews', { body: { refresh: false } });
        if (!res.error && res.data) {
          setReviews(res.data.reviews || []);
        }
        // 2) Trigger background refresh (non-blocking)
        supabase.functions.invoke('google-reviews', { body: { refresh: true } }).catch(() => {});
      } catch (e) {
        console.warn('Failed to load reviews', e);
      } finally {
        setLoading(false);
      }
    };
    fn();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4 text-center text-muted-foreground">Loading Google reviews…</div>
      </section>
    );
  }

  if (!reviews.length) {
    return (
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4 text-center text-muted-foreground">No reviews available at the moment.</div>
      </section>
    );
  }

  const display = reviews.slice(0, 9);

  return (
    <section className="py-16 bg-secondary/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-10">What Clients Say on Google</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {display.map((r) => (
            <article key={`${r.place_id}-${r.time}`} className="bg-background rounded-xl shadow-luxury p-6 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                {r.profile_photo_url ? (
                  <img src={r.profile_photo_url} alt={r.author_name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm">
                    {r.author_name[0]?.toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="font-semibold">
                    {r.author_url ? (
                      <a href={r.author_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {r.author_name}
                      </a>
                    ) : r.author_name}
                  </div>
                  <div className="text-xs text-muted-foreground">{new Date(r.time).toLocaleDateString()}</div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill={i < r.rating ? 'currentColor' : 'none'} />
                ))}
              </div>

              {r.text && <p className="text-sm text-foreground/90">{r.text}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
