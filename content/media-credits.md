# Media credits

Stock media used on the site, where it came from, and how it was processed.
Keep this list up to date whenever a clip, photo or logo is added or replaced.

## Home hero videos (public/videos/)

All from Pexels (https://www.pexels.com). The Pexels licence allows free use,
including commercial use, without attribution; it does not allow selling unaltered
copies or implying endorsement by the people/brands shown.
**TO CONFIRM before launch:** read the current terms at https://www.pexels.com/license/.

| File | Pexels video | Pexels ID | Page |
|---|---|---|---|
| ai-01-neural-nodes | Futuristic network of glowing connections | 35008786 | https://www.pexels.com/video/35008786/ |
| ai-02-chip-data | Futuristic circuit board with glowing microchip | 36382300 | https://www.pexels.com/video/36382300/ |
| ai-03-threat-interface | Futuristic neon digital interface display | 29844748 | https://www.pexels.com/video/29844748/ |
| ai-04-neural-field | Futuristic neural network animation with glowing nodes | 33164273 | https://www.pexels.com/video/33164273/ |
| ai-05-data-flow | Dynamic binary code flow in digital space | 31359793 | https://www.pexels.com/video/31359793/ |
| ai-06-processor | Futuristic circuit board with central processor | 35977437 | https://www.pexels.com/video/35977437/ |

Processing (ffmpeg, read straight from the Pexels original): 6-second excerpt
from 1 s in, 1280px wide, 25 fps, H.264 (CRF 30-35), audio removed, `+faststart`.
The `.jpg` next to each clip is its first frame, used as the poster.
Clips were chosen for AI themes (neural networks, AI chips, AI interfaces), the
site's dark-blue palette, and a measured motion score so none reads as a still.

To replace a clip: keep the same file name (or update `VIDEOS` in
components/home/HeroVideo.tsx), keep it under about 1.5 MB, and regenerate the poster.

## Home "Run it yourself / let us run it" photos (public/images/home/)

Pexels photos, 1280x800 WebP, metadata stripped:

| File | Pexels photo | Pexels ID |
|---|---|---|
| card-platform.webp | Person facing a big screen with numbers | 9783346 |
| card-managed.webp | Woman in yellow long sleeve shirt looking at computer data (analyst at monitoring dashboards, team behind) | 8204355 |

## Insights covers (public/images/insights/)

1200x750 WebP, all metadata (including GPS) stripped:

| File | Source |
|---|---|
| claude-went-rogue-or-did-the-sandbox-fail.webp | Frame from Mixkit 46635 "Programming and coding new technologies" |
| claude-mythos-project-glasswing.webp | Frame from Mixkit 47050 "Close up of fiber optics in a server room" |
| will-indian-banks-trust-claude-with-core-banking-data.webp | Frame from Mixkit 4809 "Business people at work meeting" |
| cccl-ai-security-event-bengaluru.webp | SaaviGenAI's own event photo (public/images/ThumbnailArticle3.jpeg) |

Mixkit (https://mixkit.co) free licence: **TO CONFIRM** at https://mixkit.co/license/.

## Logos (public/logos/)

claude, openai, googlegemini, n8n, whatsapp: Simple Icons (https://simpleicons.org),
CC0 SVG data; the marks themselves belong to their owners. Interim until official
files are supplied (see content/vendors.ts). OpenShell has no logo yet.
