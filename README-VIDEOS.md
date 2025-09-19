# Video Teasers & Posters

This project uses lightweight teaser MP4s for the gallery grid and full videos in the modal.

## Generate teasers/posters (Windows PowerShell)

1. Install ffmpeg: https://ffmpeg.org/download.html and add to PATH.
2. Run:

```pwsh
pwsh -File scripts/generate-teasers.ps1 -TeaserSeconds 5
```

Outputs:
- `public/videos/teasers/*-teaser.mp4`
- `public/videos/posters/*-poster.jpg`

Teasers are ~0.5–2 MB each; posters are single-frame JPGs.

## Wire-up locations
The gallery reads from `src/lib/videoConfig.ts`. Update the mapping or add new entries to surface new videos.

## Production note
For best performance, host full videos as HLS via a streaming service (Cloudflare Stream/Mux). Replace the `full` URLs in `videoConfig.ts` with the HLS master playlist URLs.
