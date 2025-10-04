export type VideoItem = {
  id: string;
  title: string;
  teaser: string; // small mp4 in Supabase Storage
  full: string;   // full mp4 in Supabase Storage
  poster: string; // jpg in Supabase Storage
};

// Videos are stored in Supabase Storage for better performance and streaming
const SUPABASE_STORAGE_URL = 'https://akbpveurkalpkuncswan.supabase.co/storage/v1/object/public/videos';

export const videos: VideoItem[] = [
  {
    id: 'botox-treatment',
    title: 'Botox Treatment',
    teaser: `${SUPABASE_STORAGE_URL}/teasers/botox-treatment-teaser.mp4`,
    full: `${SUPABASE_STORAGE_URL}/botox-treatment.mp4`,
    poster: `${SUPABASE_STORAGE_URL}/posters/botox-treatment-poster.jpg`,
  },
  {
    id: 'hair-straightening',
    title: 'Hair Straightening',
    teaser: `${SUPABASE_STORAGE_URL}/teasers/hair-straightening-teaser.mp4`,
    full: `${SUPABASE_STORAGE_URL}/hair-straightening.mp4`,
    poster: `${SUPABASE_STORAGE_URL}/posters/hair-straightening-poster.jpg`,
  },
  {
    id: 'nanoplastia',
    title: 'Nanoplastia',
    teaser: `${SUPABASE_STORAGE_URL}/teasers/nanoplastia-teaser.mp4`,
    full: `${SUPABASE_STORAGE_URL}/nanoplastia.mp4`,
    poster: `${SUPABASE_STORAGE_URL}/posters/nanoplastia-poster.jpg`,
  },
  {
    id: 'testimonial-2',
    title: 'Client Experience',
    teaser: `${SUPABASE_STORAGE_URL}/teasers/testimonial-2-teaser.mp4`,
    full: `${SUPABASE_STORAGE_URL}/testimonial-2.mp4`,
    poster: `${SUPABASE_STORAGE_URL}/posters/testimonial-2-poster.jpg`,
  },
];
