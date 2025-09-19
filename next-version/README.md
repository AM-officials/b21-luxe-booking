# B21 Next Version (Parallel Build)

This directory contains a fresh Next.js App Router implementation (Option B) alongside the existing Vite app. Development is isolated so you can migrate incrementally.

## Scripts

```bash
npm install
npm run dev
```

## Structure
- `src/app` : App Router pages (`/`, `/services`, more to follow)
- `src/components` : Shared UI (loading screen etc.)
- `src/lib` : (to be added) data & Supabase utils

## Pending (from overhaul plan)
1. Port header/footer + branding with black/white logos
2. Implement multi-page routes (/gallery, /locations, /faq, /blog, /blog/[slug], /login, /admin)
3. Animated LoadingScreen (basic version done; refine shimmer & exit timing)
4. Popup banner w/ image + CMS wiring
5. SectionSeparator component (wave | angle | curve)
6. Services page gender expand cards
7. Gallery page w/ Instagram Reels embed
8. Locations + franchise modal form
9. FAQ accordion with motion
10. CMS enhancements (blog image upload, popup banner management) and Supabase tables

This scaffold will expand in subsequent commits.
