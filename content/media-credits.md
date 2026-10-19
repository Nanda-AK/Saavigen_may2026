# Media credits

Stock media used on the site, where it came from, and how it was processed.
Keep this list up to date whenever a clip or photo is added or replaced.

## Home hero videos (public/videos/)

All from Mixkit (https://mixkit.co), free stock video. Mixkit's free video
licence is understood to allow use on commercial websites without attribution,
but not resale or redistribution of the clips on their own.
**TO CONFIRM before launch:** read the current terms at https://mixkit.co/license/.

| File | Mixkit clip | Mixkit ID | Source URL |
|---|---|---|---|
| hero-01-datacenter | Bluish data center hallway | 23282 | https://assets.mixkit.co/videos/23282/23282-720.mp4 |
| hero-02-network | Scrambled dots and lines within a sphere of dots | 31771 | https://assets.mixkit.co/videos/31771/31771-720.mp4 |
| hero-03-servers | Close up of server racks lights | 23215 | https://assets.mixkit.co/videos/23215/23215-720.mp4 |
| hero-04-circuit | High tech circuit board with processor | 47051 | https://assets.mixkit.co/videos/47051/47051-720.mp4 |
| hero-05-engineers | Engineers working in the data center | 22966 | https://assets.mixkit.co/videos/22966/22966-720.mp4 |

Processing (ffmpeg): 8-second excerpt, 1280px wide, 25 fps, H.264 (CRF 30, CRF 34
for the network clip), audio removed, `+faststart` so playback starts before the
file finishes downloading. Each `.jpg` next to a clip is its first frame, used as
the poster that shows instantly while the video loads.

To replace a clip: keep the same file name (or update `SLIDES` in
components/home/HeroVideo.tsx), aim for under 2 MB, and regenerate the poster.

## Updated hero set and card clips (replaces the table above where names differ)

Hero clips are now 4-second loops; the hero cuts to the next one every 3 s.

| File | Mixkit clip | Mixkit ID |
|---|---|---|
| hero-01-datacenter | Bluish data center hallway | 23282 |
| hero-02-circuit | High tech circuit board with processor | 47051 |
| hero-03-network | 3D animation of lines and luminous points rotating | 31510 |
| hero-04-code | Experienced programmer working on a powerful computer | 41656 |
| hero-05-engineers | Engineers working in the data center | 22966 |
| hero-06-world | World map in a digital world | 12748 |
| card-platform-operator | Information technology specialist in data center | 23218 |
| card-managed-team | Engineer team working in a server room | 23158 |

Clips were picked partly by a measured motion score (average frame-to-frame
pixel change), so the hero never shows near-static footage that reads as a photo.

## Insights covers (public/images/insights/)

1200x750 WebP, metadata (incl. GPS) stripped:
- claude-went-rogue-...: frame from Mixkit 46635 "Programming and coding new technologies"
- claude-mythos-...: frame from Mixkit 47050 "Close up of fiber optics in a server room"
- will-indian-banks-...: frame from Mixkit 4809 "Business people at work meeting"
- cccl-ai-security-event-bengaluru: SaaviGenAI's own event photo (ThumbnailArticle3.jpeg)

## Logos (public/logos/)

claude, openai, googlegemini, n8n, whatsapp: Simple Icons (https://simpleicons.org),
CC0 SVG data; the marks belong to their owners. Interim until official files are supplied.
