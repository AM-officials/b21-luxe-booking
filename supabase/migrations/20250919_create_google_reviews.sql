-- Create cached Google reviews table
create table if not exists public.google_reviews (
  id bigint generated always as identity primary key,
  place_id text not null,
  author_name text not null,
  author_url text,
  profile_photo_url text,
  rating int not null check (rating between 1 and 5),
  text text,
  time timestamptz not null,
  language text,
  created_at timestamptz not null default now()
);

-- RLS: enable and allow read to anon, writes only via service role
alter table public.google_reviews enable row level security;

drop policy if exists "Allow read to anon" on public.google_reviews;
create policy "Allow read to anon"
  on public.google_reviews for select
  using (true);

-- No insert/update/delete policy for anon; service role bypasses RLS
