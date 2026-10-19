"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// A short decorative clip that plays (muted, looping) only while it is on screen.
// Reduced motion or Save-Data: the poster image stays, nothing plays.
// Nothing is downloaded until the clip first scrolls near the viewport.
export function InViewVideo({ name, className }: { name: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    if (reduce || saveData) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (v.preload !== "auto") {
            v.preload = "auto";
            v.load();
          }
          v.muted = true;
          v.play().catch(() => {
            /* autoplay refused: poster stays */
          });
        } else {
          v.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      aria-hidden="true"
      tabIndex={-1}
      className={cn("size-full object-cover", className)}
      poster={`/videos/${name}.jpg`}
      muted
      loop
      playsInline
      preload="none"
    >
      <source src={`/videos/${name}.mp4`} type="video/mp4" />
    </video>
  );
}
