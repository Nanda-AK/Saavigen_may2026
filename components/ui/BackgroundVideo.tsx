"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

/*
  One fixed, looping background video for an inner-page hero (each page has its
  own clip; it never changes). Muted, plays inline, slow zoom (CSS .hero-video).
  - Pauses while off screen or when the tab is hidden; resumes when back.
  - Pause / play button (auto-playing motion over 5 s must be pausable).
  - Save-Data: poster image only. Reduced motion: still plays (agreed with
    SaaviGenAI), but the zoom is switched off by CSS.
  Clips live in public/videos/page-*.mp4 with a .jpg poster (content/media-credits.md).
*/
export function BackgroundVideo({ name }: { name: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if ((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) {
      setSaveData(true);
      setPlaying(false);
      return;
    }
    let onScreen = true;
    const sync = () => {
      if (playing && onScreen && !document.hidden) {
        v.muted = true; // autoplay is only allowed for muted video
        v.play().catch(() => {
          /* autoplay refused: the poster stays */
        });
      } else {
        v.pause();
      }
    };
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      sync();
    });
    io.observe(v);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [playing]);

  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <video
          ref={ref}
          className="hero-video absolute inset-0 size-full object-cover"
          data-active="true"
          poster={`/videos/${name}.jpg`}
          muted
          loop
          playsInline
          preload="auto"
          tabIndex={-1}
        >
          <source src={`/videos/${name}.mp4`} type="video/mp4" />
        </video>
        <div className="hero-scrim absolute inset-0" />
      </div>
      {!saveData ? (
        <Container className="pointer-events-none absolute inset-x-0 bottom-0 pb-6">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause background video" : "Play background video"}
            className="pointer-events-auto inline-flex size-9 items-center justify-center rounded-[8px] border border-white/30 text-white/85 transition-colors hover:border-white hover:text-white"
          >
            <Icon icon={playing ? Pause : Play} size={15} />
          </button>
        </Container>
      ) : null}
    </>
  );
}
