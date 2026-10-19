# Media credits

Stock media used on the site, where it came from, and how it was processed.
Keep this list up to date whenever a clip, photo or logo is added or replaced.

## Videos (public/videos/)

All from Mixkit (https://mixkit.co), free stock video. Mixkit's free video
licence is understood to allow use on commercial websites without attribution,
but not resale or redistribution of the clips on their own.
**TO CONFIRM before launch:** read the current terms at https://mixkit.co/license/.

| File | Used in | Mixkit clip | Mixkit ID |
|---|---|---|---|
| hero-01-datacenter | Home hero | Bluish data center hallway | 23282 |
| hero-02-circuit | Home hero | High tech circuit board with processor | 47051 |
| hero-03-network | Home hero | 3D animation of lines and luminous points rotating | 31510 |
| hero-04-code | Home hero | Experienced programmer working on a powerful computer | 41656 |
| hero-05-engineers | Home hero | Engineers working in the data center | 22966 |
| hero-06-world | Home hero | World map in a digital world | 12748 |
| card-platform-operator | Home "Run it yourself" card | Information technology specialist in data center | 23218 |
| card-managed-team | Home "Let us run it" card | Engineer team working in a server room | 23158 |

Source URL pattern: `https://assets.mixkit.co/videos/<ID>/<ID>-720.mp4`

Processing (ffmpeg): hero clips are 4-second excerpts, 1280px wide; card clips are
6 seconds, 960px wide. All 25 fps H.264 (CRF 30-32), audio removed, `+faststart`
so playback starts before the file finishes downloading. The `.jpg` next to each
clip is its first frame, used as the poster that shows instantly.

Clips were chosen partly by a measured motion score (average frame-to-frame pixel
change), so the hero never shows near-static footage that reads as a photo.

To replace a clip: keep the same file name (or update `VIDEOS` in
components/home/HeroVideo.tsx), keep it under about 1.5 MB, and regenerate the poster.

## Insights covers (public/images/insights/)

1200x750 WebP, all metadata (including GPS) stripped:

| File | Source |
|---|---|
| claude-went-rogue-or-did-the-sandbox-fail.webp | Frame from Mixkit 46635 "Programming and coding new technologies" |
| claude-mythos-project-glasswing.webp | Frame from Mixkit 47050 "Close up of fiber optics in a server room" |
| will-indian-banks-trust-claude-with-core-banking-data.webp | Frame from Mixkit 4809 "Business people at work meeting" |
| cccl-ai-security-event-bengaluru.webp | SaaviGenAI's own event photo (public/images/ThumbnailArticle3.jpeg) |

## Logos (public/logos/)

claude, openai, googlegemini, n8n, whatsapp: Simple Icons (https://simpleicons.org),
CC0 SVG data; the marks themselves belong to their owners. Interim until official
files are supplied (see content/vendors.ts). OpenShell has no logo yet.
