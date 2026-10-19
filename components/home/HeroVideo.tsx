"use client";

import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/*
  Home hero (plan 2.1), styled after mynctech.com: full-screen background video
  with one large title on top.

  Two independent rhythms (as requested):
    - VIDEO_MS: the background cuts to the next short clip (with a slow zoom)
    - TITLE_MS: the title changes
  The slide pills follow the titles; clicking one jumps both title and video.

  Titles: the first is the plan's hero headline (the real <h1>). The others are
  headlines taken word for word from the plan's own sections, so no new copy.

  Interaction: on desktop the video layer drifts slightly against the pointer
  (parallax). It is driven by CSS variables set directly on the element, so the
  pointer never causes a React re-render.

  Videos: free Mixkit clips, 4 s 720p loops in public/videos/ (sources in
  content/media-credits.md). Only the current and the next clip are loaded.

  Accessibility and performance
  - Pause / play button (auto-rotating content must be pausable).
  - Everything stops while the hero is off screen or the tab is hidden.
  - prefers-reduced-motion or Save-Data: still poster image, no rotation, no parallax.
  - Only the <h1> is read by screen readers; the rotating copies are aria-hidden.
*/

export const VIDEO_MS = 3000;
export const TITLE_MS = 4500;

const VIDEOS = ["hero-01-datacenter", "hero-02-circuit", "hero-03-network", "hero-04-code", "hero-05-engineers", "hero-06-world"];

const TITLES = [
  ["Your AI is running.", "Do you know what it's doing?"], // 2.1 (the h1)
  ["One platform for every AI", "in your enterprise"], // 2.2
  ["From blind spot", "to control"], // 2.3
  ["Detection and response for", "the AI in your enterprise"], // 3.1
  ["Built for how", "security teams work"], // 2.4
];

const src = (name: string, ext: "mp4" | "jpg") => `/videos/${name}.${ext}`;

export function HeroVideo() {
  const [video, setVideo] = useState(0);
  const [title, setTitle] = useState(0);
  const [playing, setPlaying] = useState(true); // the visitor's pause / play choice
  const [stillOnly, setStillOnly] = useState(false); // reduced motion or Save-Data
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const videoNow = useRef(0); // read inside timeouts, which would otherwise see a stale value
  videoNow.current = video;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    if (reduce || saveData) {
      setStillOnly(true);
      setPlaying(false);
    }
  }, []);

  // Pause everything while the hero is off screen or the tab is hidden.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    const onVis = () => setVisible(!document.hidden && el.getBoundingClientRect().bottom > 0);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // Pointer parallax (desktop pointers only).
  useEffect(() => {
    const root = rootRef.current;
    const media = mediaRef.current;
    if (!root || !media || stillOnly || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const b = root.getBoundingClientRect();
      media.style.setProperty("--mx", (((e.clientX - b.left) / b.width) * 2 - 1).toFixed(3));
      media.style.setProperty("--my", (((e.clientY - b.top) / b.height) * 2 - 1).toFixed(3));
    };
    const onLeave = () => {
      media.style.setProperty("--mx", "0");
      media.style.setProperty("--my", "0");
    };
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [stillOnly]);

  const running = playing && visible && !stillOnly;

  // Play the current clip from the start, pause the rest, and preload the next one.
  useEffect(() => {
    if (stillOnly) {
      videoRefs.current.forEach((v) => v?.pause());
      return;
    }
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === video && running) {
        if (v.preload !== "auto") {
          v.preload = "auto";
          v.load();
        }
        v.muted = true; // autoplay is only allowed for muted video
        v.currentTime = 0;
        v.play().catch(() => {
          /* autoplay refused (e.g. battery saver): the poster stays visible */
        });
      } else if (i !== video) {
        // Let the outgoing clip keep moving through the cross-fade, then pause it.
        window.setTimeout(() => videoNow.current !== i && v.pause(), 1300);
      } else {
        v.pause();
      }
    });
    const next = videoRefs.current[(video + 1) % VIDEOS.length];
    if (next && next.preload !== "auto") {
      next.preload = "auto";
      next.load();
    }
  }, [video, running, stillOnly]);

  // Two independent timers: one for the clip, one for the title.
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setVideo((v) => (v + 1) % VIDEOS.length), VIDEO_MS);
    return () => clearTimeout(t);
  }, [video, running]);
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setTitle((v) => (v + 1) % TITLES.length), TITLE_MS);
    return () => clearTimeout(t);
  }, [title, running]);

  const goTo = useCallback((i: number) => {
    setTitle(i);
    setVideo(i % VIDEOS.length);
  }, []);

  return (
    <section
      ref={rootRef}
      data-hero="dark"
      aria-labelledby="hero-title"
      aria-roledescription="carousel"
      className="relative isolate -mt-16 flex min-h-[100svh] flex-col overflow-hidden bg-[#05070b] text-white md:min-h-[100dvh]"
    >
      {/* Background videos (decorative). Posters show instantly; each clip fades in when it's its turn. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div ref={mediaRef} className="hero-media absolute inset-0">
          {VIDEOS.map((name, i) => (
            <video
              key={name}
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              className="hero-video absolute inset-0 size-full object-cover"
              data-active={i === video}
              poster={src(name, "jpg")}
              muted
              loop
              playsInline
              preload={i === 0 ? "auto" : "none"}
              tabIndex={-1}
            >
              <source src={src(name, "mp4")} type="video/mp4" />
            </video>
          ))}
        </div>
        <div className="hero-scrim absolute inset-0" />
      </div>

      <Container className="flex flex-1 flex-col justify-end pt-32 pb-32 md:justify-center md:pt-40">
        <Eyebrow onDark>The Key to Secure AI</Eyebrow>

        {/* All titles share one grid cell, so the block never changes height between titles. */}
        <div className="mt-5 grid">
          {TITLES.map((lines, i) => {
            const Tag = i === 0 ? "h1" : "p";
            return (
              <Tag
                key={lines[0]}
                id={i === 0 ? "hero-title" : undefined}
                aria-hidden={i === 0 ? undefined : true}
                data-active={i === title}
                className="hero-title col-start-1 row-start-1 max-w-[18ch] text-display font-bold md:max-w-none"
              >
                <span className="hero-line" style={{ "--line": 0 } as React.CSSProperties}>
                  {lines[0]}
                </span>
                <span className="hero-line text-[#2997ff]" style={{ "--line": 1 } as React.CSSProperties}>
                  {lines[1]}
                </span>
              </Tag>
            );
          })}
        </div>

        <p className="mt-7 max-w-[46ch] text-lead text-white/80">
          SaaviAIDR gives security teams visibility, detection and response across every AI agent and chatbot in the
          enterprise.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/saaviaidr/" variant="light" size="lg" arrow>
            Explore SaaviAIDR
          </Button>
          <Button href="/contact/" variant="light-outline" size="lg">
            Contact Us
          </Button>
        </div>
      </Container>

      {/* Slide controls (bottom left; the WhatsApp button lives bottom right) */}
      <Container className="pointer-events-none absolute inset-x-0 bottom-0 pb-8">
        <div className="pointer-events-auto flex items-center gap-4">
          {!stillOnly ? (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause slideshow" : "Play slideshow"}
              className="inline-flex size-9 items-center justify-center rounded-[3px] border border-white/30 text-white/85 transition-colors hover:border-white hover:text-white"
            >
              <Icon icon={playing ? Pause : Play} size={15} />
            </button>
          ) : null}
          <div role="group" aria-label="Choose slide" className="flex items-center gap-1.5">
            {TITLES.map((lines, i) => (
              <button
                key={lines[0]}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show slide ${i + 1} of ${TITLES.length}`}
                aria-current={i === title ? "true" : undefined}
                className="group/dot relative flex h-6 items-center"
              >
                <span
                  className={cn(
                    "relative block h-[3px] overflow-hidden bg-white/30 transition-[width] duration-500 ease-out group-hover/dot:bg-white/60",
                    i === title ? "w-12" : "w-5",
                  )}
                >
                  {i === title ? (
                    <span
                      key={`${title}-${running}`}
                      className="hero-progress absolute inset-0 bg-white"
                      data-running={running}
                      style={{ "--slide-ms": `${TITLE_MS}ms` } as React.CSSProperties}
                    />
                  ) : null}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
