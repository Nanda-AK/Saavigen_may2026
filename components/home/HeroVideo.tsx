"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/*
  Home hero (plan 2.1), styled after mynctech.com: full-screen background video
  under a fixed headline and subheadline (exactly as in the plan). Only the video
  changes, every VIDEO_MS, cross-fading to the next AI-themed clip.

  Interaction: on desktop the video layer drifts slightly against the pointer
  (parallax). It is driven by CSS variables set directly on the element, so the
  pointer never causes a React re-render.

  Videos: free Pexels clips (AI / neural network / AI chip visuals), 6 s 720p
  loops in public/videos/ai-*.mp4 (sources in content/media-credits.md). Only the
  current and the next clip are loaded.

  Accessibility and performance
  - Pause / play button (auto-changing content must be pausable).
  - Everything stops while the hero is off screen or the tab is hidden.
  - Reduced motion (agreed with SaaviGenAI): video still plays, but no zoom and no
    parallax. Windows "best performance" mode switches reduced motion on silently.
  - Save-Data: still poster image only.
*/

export const VIDEO_MS = 5000;

const VIDEOS = [
  "ai-01-neural-nodes",
  "ai-02-chip-data",
  "ai-03-threat-interface",
  "ai-04-neural-field",
  "ai-05-data-flow",
  "ai-06-processor",
];

const src = (name: string, ext: "mp4" | "jpg") => `/videos/${name}.${ext}`;

export function HeroVideo() {
  const [video, setVideo] = useState(0);
  const [playing, setPlaying] = useState(true); // the visitor's pause / play choice
  const [stillOnly, setStillOnly] = useState(false); // Save-Data
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const videoNow = useRef(0); // read inside timeouts, which would otherwise see a stale value
  videoNow.current = video;

  // Only a metered connection (Save-Data) falls back to the still poster.
  // To also show stills for reduced motion, add `|| reduce` here.
  useEffect(() => {
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    if (saveData) {
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

  // Pointer parallax (desktop pointers only, not for reduced motion).
  useEffect(() => {
    const root = rootRef.current;
    const media = mediaRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!root || !media || stillOnly || reduce || !window.matchMedia("(pointer: fine)").matches) return;
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

  // Next clip every VIDEO_MS while running.
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setVideo((v) => (v + 1) % VIDEOS.length), VIDEO_MS);
    return () => clearTimeout(t);
  }, [video, running]);

  return (
    <section
      ref={rootRef}
      data-hero="dark"
      aria-labelledby="hero-title"
      className="relative isolate -mt-16 flex min-h-[100svh] flex-col overflow-hidden bg-[#05070b] text-white md:min-h-[100dvh]"
    >
      {/* Background videos (decorative). Posters show instantly; each clip fades in on its turn. */}
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
        <h1 id="hero-title" className="mt-5 max-w-[18ch] text-display font-bold md:max-w-none">
          <span className="block">Your AI is running.</span>
          <span className="block text-[#2997ff]">Do you know what it&apos;s doing?</span>
        </h1>
        <p className="mt-7 max-w-[46ch] text-lead text-white/80">
          SaaviAIDR gives security teams visibility, detection and response across every AI agent and chatbot in the
          enterprise.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href="/saaviaidr/" variant="light" size="lg">
            Explore SaaviAIDR
          </Button>
          <Button href="/contact/" variant="link-light" size="lg">
            Contact Us
          </Button>
        </div>
      </Container>

      {/* Clip controls (bottom left; the WhatsApp button lives bottom right) */}
      <Container className="pointer-events-none absolute inset-x-0 bottom-0 pb-8">
        <div className="pointer-events-auto flex items-center gap-4">
          {!stillOnly ? (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause background video" : "Play background video"}
              className="inline-flex size-9 items-center justify-center rounded-[8px] border border-white/30 text-white/85 transition-colors hover:border-white hover:text-white"
            >
              <Icon icon={playing ? Pause : Play} size={15} />
            </button>
          ) : null}
          <div role="group" aria-label="Choose background video" className="flex items-center gap-1.5">
            {VIDEOS.map((name, i) => (
              <button
                key={name}
                type="button"
                onClick={() => setVideo(i)}
                aria-label={`Show video ${i + 1} of ${VIDEOS.length}`}
                aria-current={i === video ? "true" : undefined}
                className="group/dot relative flex h-6 items-center"
              >
                <span
                  className={cn(
                    "relative block h-[3px] overflow-hidden rounded-full bg-white/30 transition-[width] duration-500 ease-out group-hover/dot:bg-white/60",
                    i === video ? "w-12" : "w-5",
                  )}
                >
                  {i === video ? (
                    <span
                      key={`${video}-${running}`}
                      className="hero-progress motion-ok absolute inset-0 bg-white"
                      data-running={running}
                      style={{ "--slide-ms": `${VIDEO_MS}ms` } as React.CSSProperties}
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
