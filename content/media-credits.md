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
