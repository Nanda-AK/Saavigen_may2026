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
  with one large title on top. Every SLIDE_MS the video cross-fades to the next
  clip and the title changes.

  Titles: the first is the plan's hero headline (it is the real <h1>). The others
  are headlines taken word for word from the plan's own sections, so no new copy.
  Each title is split into two lines: white, then blue.

  Videos: free Mixkit stock clips, compressed to 8 s 720p loops in public/videos/
  (sources listed in content/media-credits.md). Only the current and the next
  clip are loaded, so a visitor never downloads all five up front.

  Accessibility and performance
  - Visible pause/play button (auto-rotating content must be pausable).
  - Rotation stops while the hero is off screen or the tab is hidden.
  - prefers-reduced-motion or Save-Data: still poster images, no auto-rotation.
  - Only the <h1> is read by screen readers; the rotating copies are aria-hidden.
*/

export const SLIDE_MS = 4500;

const SLIDES = [
  { video: "hero-01-datacenter", lines: ["Your AI is running.", "Do you know what it's doing?"] }, // 2.1
  { video: "hero-02-network", lines: ["One platform for every AI", "in your enterprise"] }, // 2.2
  { video: "hero-03-servers", lines: ["From blind spot", "to control"] }, // 2.3
  { video: "hero-04-circuit", lines: ["Detection and response for", "the AI in your enterprise"] }, // 3.1
  { video: "hero-05-engineers", lines: ["Built for how", "security teams work"] }, // 2.4
];

const src = (name: string, ext: "mp4" | "jpg") => `/videos/${name}.${ext}`;

export function HeroVideo() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true); // user's pause / play choice
  const [stillOnly, setStillOnly] = useState(false); // reduced motion or Save-Data
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeRef = useRef(0); // read inside timeouts, which would otherwise see a stale `active`
  activeRef.current = active;

  // Decide once whether to show moving video at all.
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

  const running = playing && visible && !stillOnly;

  // Play the active clip, pause the others, and start loading the next one.
  // Playback is only ever started from here (no autoPlay attribute), so
  // reduced-motion visitors never see a clip start before this check runs.
  useEffect(() => {
    if (stillOnly) {
      videoRefs.current.forEach((v) => v?.pause());
      return;
    }
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active && running) {
        if (v.preload !== "auto") {
          v.preload = "auto";
          v.load();
        }
        v.play().catch(() => {
          /* autoplay can be refused (e.g. battery saver); the poster stays visible */
        });
      } else if (i !== active) {
        // Let the outgoing clip keep moving through the cross-fade, then pause it
        // (unless the visitor has clicked back to it in the meantime).
        window.setTimeout(() => activeRef.current !== i && v.pause(), 1300);
      } else {
        v.pause();
      }
    });
    const next = videoRefs.current[(active + 1) % SLIDES.length];
    if (next && next.preload !== "auto") {
      next.preload = "auto";
      next.load();
    }
  }, [active, running, stillOnly]);

  // Advance every SLIDE_MS while running.
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % SLIDES.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [active, running]);

  const goTo = useCallback((i: number) => setActive(i), []);

  return (
    <section
      ref={rootRef}
      data-hero="dark"
      aria-labelledby="hero-title"
      aria-roledescription="carousel"
      className="relative isolate -mt-16 flex min-h-[100svh] flex-col overflow-hidden bg-[#05070b] text-white md:min-h-[100dvh]"
    >
      {/* Background videos (decorative). The poster shows instantly; the video fades in when ready. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {SLIDES.map((s, i) => (
          <video
            key={s.video}
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            className="hero-video absolute inset-0 size-full object-cover"
            data-active={i === active}
            poster={src(s.video, "jpg")}
            muted
            loop
            playsInline
            preload={i === 0 ? "auto" : "none"}
            tabIndex={-1}
          >
            <source src={src(s.video, "mp4")} type="video/mp4" />
          </video>
        ))}
        <div className="hero-scrim absolute inset-0" />
      </div>

      <Container className="flex flex-1 flex-col justify-end pt-32 pb-28 md:justify-center md:pt-40 md:pb-32">
        <Eyebrow onDark>The Key to Secure AI</Eyebrow>

        {/* All titles share one grid cell, so the block never changes height between slides. */}
        <div className="mt-5 grid">
          {SLIDES.map((s, i) => {
            const Tag = i === 0 ? "h1" : "p";
            return (
              <Tag
                key={s.video}
                id={i === 0 ? "hero-title" : undefined}
                aria-hidden={i === 0 ? undefined : true}
                data-active={i === active}
                className="hero-title col-start-1 row-start-1 max-w-[18ch] text-display font-bold md:max-w-none"
              >
                <span className="hero-line" style={{ "--line": 0 } as React.CSSProperties}>
                  {s.lines[0]}
                </span>
                <span className="hero-line text-[#2997ff]" style={{ "--line": 1 } as React.CSSProperties}>
                  {s.lines[1]}
                </span>
              </Tag>
            );
          })}
        </div>

        <p className="mt-7 max-w-[46ch] text-lead text-white/80">
          SaaviAIDR gives security teams visibility, detection and response across every AI agent and chatbot in the
          enterprise.
        </p>
        {/* Font size is text-[1rem], not text-base: the old site's legacy colour token
            "--color-base" (globals.css LEGACY block) turns text-base into a white text colour.
            Safe to use text-base again once the legacy block is deleted in Phase 7. */}
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/saaviaidr/" variant="light" arrow className="min-h-12 px-7 text-[1rem]">
            Explore SaaviAIDR
          </Button>
          <Button href="/contact/" variant="light-outline" className="min-h-12 px-7 text-[1rem]">
            Contact Us
          </Button>
        </div>
      </Container>

      {/* Slide controls: one pill per slide (the active one fills over time) + pause / play */}
      <Container className="pointer-events-none absolute inset-x-0 bottom-0 pb-8">
        <div className="pointer-events-auto flex items-center justify-end gap-3">
          <div role="group" aria-label="Choose slide" className="flex items-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.video}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show slide ${i + 1} of ${SLIDES.length}`}
                aria-current={i === active ? "true" : undefined}
                className="group/dot relative flex h-6 items-center"
              >
                <span
                  className={cn(
                    "relative block h-1.5 overflow-hidden rounded-full bg-white/35 transition-[width] duration-500 ease-out group-hover/dot:bg-white/60",
                    i === active ? "w-10" : "w-1.5",
                  )}
                >
                  {i === active ? (
                    <span
                      key={`${active}-${running}`}
                      className="hero-progress absolute inset-0 rounded-full bg-white"
                      data-running={running}
                      style={{ "--slide-ms": `${SLIDE_MS}ms` } as React.CSSProperties}
                    />
                  ) : null}
                </span>
              </button>
            ))}
          </div>
          {!stillOnly ? (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause slideshow" : "Play slideshow"}
              className="inline-flex size-9 items-center justify-center rounded-full border border-white/30 text-white/85 transition-colors hover:border-white hover:text-white"
            >
              <Icon icon={playing ? Pause : Play} size={15} />
            </button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
