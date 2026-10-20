"use client";

import { useEffect, useRef, useState } from "react";

/*
  One fixed, looping background video for an inner-page hero (each page has its
  own clip; it never changes). Muted, plays inline, slow zoom (CSS .hero-video).
  - Pauses while off screen or when the tab is hidden; resumes when back.
  - No pause button: SaaviGenAI asked for it to be removed (Oct 2026).
  - Save-Data: poster image only. Reduced motion: still plays (agreed with
    SaaviGenAI), but the zoom is switched off by CSS.
  Clips live in public/videos/page-*.mp4 with a .jpg poster (content/media-credits.md).
*/
export function BackgroundVideo({ name }: { name: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if ((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) {
      setSaveData(true);
      return;
    }
    let onScreen = true;
    const sync = () => {
      if (onScreen && !document.hidden) {
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
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      <video
        ref={ref}
        className="hero-video absolute inset-0 size-full object-cover"
        data-active={!saveData}
        poster={`/videos/${name}.jpg`}
        muted
        loop
        playsInline
        preload={saveData ? "none" : "auto"}
        tabIndex={-1}
      >
        <source src={`/videos/${name}.mp4`} type="video/mp4" />
      </video>
      <div className="hero-scrim absolute inset-0" />
    </div>
  );
}
