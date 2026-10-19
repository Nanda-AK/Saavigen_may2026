"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/*
  Home hero visual (plan 2.1 [IMAGE]): activity from many AI agents flowing into
  one calm security console.

  How it is built
  - HTML: the agent chips (left / top) and the console (right / bottom). Real text,
    crisp at any size, coloured by the theme tokens.
  - <canvas>: the curved streams and the moving particles between them. One
    requestAnimationFrame loop, no library, no React re-render per frame.
  - React state only changes about once a second (a new console row), never per frame.

  The story it tells, in plan order (2.3 How it works):
    Discover  chips and DISCOVER rows appear one by one (pure CSS, works without JS)
    Monitor   particles stream in; some are logged as MONITOR rows
    Detect    every 7-10 s an amber particle arrives; the console flags it
    Respond   a moment later the console logs the automated response
  Visitors can also click / tap to send a threat, and the pointer acts as a lens
  that labels the nearest event.

  Words used come from the content plan (3.3 capabilities):
    events: prompts, responses, tool calls, files, model usage
    threats: prompt injection, jailbreaks, data leakage, secret-file access, destructive commands
    responses: end sessions, revoke keys, quarantine agents

  Performance and accessibility
  - The loop only runs while the hero is on screen and the tab is visible.
  - prefers-reduced-motion: one still frame, no loop, no click.
  - The whole visual is one role="img" with a text description; its parts are hidden
    from screen readers.
*/

const SOURCES = ["Claude", "OpenAI Codex", "Gemini", "n8n", "OpenShell"];
const EVENTS = ["prompt", "response", "tool call", "file", "model usage"];
const THREATS = ["prompt injection", "jailbreak", "data leakage", "secret-file access", "destructive command"];
const RESPONSES = ["end session", "revoke key", "quarantine agent"];
const STAGES = ["Discover", "Monitor", "Detect", "Respond"] as const;
type Stage = (typeof STAGES)[number];

type Row = { id: number; stage: "DISCOVER" | "MONITOR" | "DETECT" | "RESPOND"; text: string; time: string };
type Stream = { x0: number; y0: number; c1x: number; c1y: number; c2x: number; c2y: number; x1: number; y1: number };
type Particle = { s: number; t: number; v: number; threat: boolean; label: string };
type Ripple = { x: number; y: number; age: number };

const MAX_ROWS = 7;
const pick = <T,>(list: readonly T[]) => list[Math.floor(Math.random() * list.length)];

// First paint (server HTML): one DISCOVER row per agent, revealed in step with the chips by CSS.
const INITIAL_ROWS: Row[] = SOURCES.map((s, i) => ({ id: -1 - i, stage: "DISCOVER", text: s, time: "00:00" }));

function point(st: Stream, t: number) {
  const u = 1 - t;
  return {
    x: u * u * u * st.x0 + 3 * u * u * t * st.c1x + 3 * u * t * t * st.c2x + t * t * t * st.x1,
    y: u * u * u * st.y0 + 3 * u * u * t * st.c1y + 3 * u * t * t * st.c2y + t * t * t * st.y1,
  };
}

export function HeroSignal({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLOListElement>(null);
  const maxRows = useRef(MAX_ROWS); // re-measured from the console height on every resize
  const chipRefs = useRef<(HTMLLIElement | null)[]>([]);
  const hoverSource = useRef<number | null>(null);
  const injectRef = useRef<((x: number, y: number) => void) | null>(null);

  const [rows, setRows] = useState<Row[]>(INITIAL_ROWS);
  const [stage, setStage] = useState<Stage>("Discover");
  const [alerting, setAlerting] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const consoleEl = consoleRef.current;
    if (!wrap || !canvas || !consoleEl) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const started = performance.now();
    const timers: number[] = [];
    let rowId = 0;
    let lastMonitorRow = 0;

    const clock = () => {
      const s = Math.floor((performance.now() - started) / 1000);
      return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
    };
    const addRow = (stageName: Row["stage"], text: string) =>
      setRows((prev) => [...prev, { id: rowId++, stage: stageName, text, time: clock() }].slice(-maxRows.current));

    // Theme colours: CSS variables use light-dark(), so read the resolved colour from a probe element.
    const probe = document.createElement("span");
    probe.style.display = "none";
    wrap.appendChild(probe);
    const colors = { line: "", muted: "", ink: "", signal: "", alert: "", raised: "", font: "" };
    const readColors = () => {
      const resolve = (v: string) => {
        probe.style.color = `var(${v})`;
        return getComputedStyle(probe).color;
      };
      colors.line = resolve("--line-strong");
      colors.muted = resolve("--ink-muted");
      colors.ink = resolve("--ink");
      colors.signal = resolve("--signal");
      colors.alert = resolve("--alert");
      colors.raised = resolve("--raised");
      const mono = getComputedStyle(document.documentElement).getPropertyValue("--font-plex-mono").trim();
      colors.font = `500 11px ${mono || "ui-monospace, monospace"}`;
    };
    readColors();

    // Geometry: streams run from each chip to the console, measured from the real DOM
    // so the drawing always lines up with the CSS layout (side by side, or stacked on mobile).
    let W = 0;
    let H = 0;
    let streams: Stream[] = [];
    const layout = () => {
      const box = wrap.getBoundingClientRect();
      W = box.width;
      H = box.height;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // How many log rows fit: list height / (row height + 8px gap). Oldest rows drop off the top.
      const list = rowsRef.current;
      if (list) {
        const first = list.firstElementChild as HTMLElement | null;
        const rowH = (first?.offsetHeight ?? 18) + 8;
        maxRows.current = Math.max(3, Math.floor((list.clientHeight - 24 + 8) / rowH));
      }

      const c = consoleEl.getBoundingClientRect();
      const chips = chipRefs.current.map((el) => el!.getBoundingClientRect());
      const stacked = c.top - box.top > Math.max(...chips.map((r) => r.bottom - box.top)) - 2;
      const n = chips.length;
      streams = chips.map((r, i) => {
        if (stacked) {
          const x0 = r.left - box.left + r.width / 2;
          const y0 = r.bottom - box.top;
          const x1 = c.left - box.left + ((i + 1) / (n + 1)) * c.width;
          const y1 = c.top - box.top;
          const dy = y1 - y0;
          return { x0, y0, c1x: x0, c1y: y0 + dy * 0.55, c2x: x1, c2y: y1 - dy * 0.55, x1, y1 };
        }
        const x0 = r.right - box.left;
        const y0 = r.top - box.top + r.height / 2;
        const x1 = c.left - box.left;
        const y1 = c.top - box.top + ((i + 1) / (n + 1)) * c.height;
        const dx = x1 - x0;
        return { x0, y0, c1x: x0 + dx * 0.5, c1y: y0, c2x: x1 - dx * 0.5, c2y: y1, x1, y1 };
      });
    };
    layout();

    // Simulation state
    let particles: Particle[] = [];
    let ripples: Ripple[] = [];
    let spawnIn = 0;
    let nextThreatAt = performance.now() + 4500;
    let userThreatActive = false;
    const pointer = { x: 0, y: 0, inside: false };

    const spawn = (threat: boolean, s = Math.floor(Math.random() * streams.length), fast = false) => {
      particles.push({
        s,
        t: 0,
        v: threat ? (fast ? 0.55 : 0.2) : 0.11 + Math.random() * 0.09,
        threat,
        label: threat ? pick(THREATS) : pick(EVENTS),
      });
    };

    const detect = (p: Particle) => {
      const st = streams[p.s];
      ripples.push({ x: st.x1, y: st.y1, age: 0 });
      setStage("Detect");
      setAlerting(true);
      addRow("DETECT", `${p.label} · ${SOURCES[p.s]}`);
      timers.push(
        window.setTimeout(() => {
          setStage("Respond");
          addRow("RESPOND", `${pick(RESPONSES)} · ${SOURCES[p.s]}`);
        }, 900),
        window.setTimeout(() => {
          setStage("Monitor");
          setAlerting(false);
          userThreatActive = false;
        }, 2600),
      );
    };

    // Click / tap: send a threat down the stream whose start is nearest the pointer.
    injectRef.current = (x, y) => {
      if (reduce || userThreatActive) return;
      let best = 0;
      let bestD = Infinity;
      streams.forEach((st, i) => {
        const d = Math.hypot(st.x0 - x, st.y0 - y) * 0.6 + Math.hypot(st.x1 - x, st.y1 - y) * 0.4;
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      userThreatActive = true;
      spawn(true, best, true);
      nextThreatAt = performance.now() + 9000;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Streams
      streams.forEach((st, i) => {
        const focus = hoverSource.current;
        ctx.globalAlpha = focus === null || focus === i ? 1 : 0.35;
        ctx.strokeStyle = focus === i ? colors.muted : colors.line;
        ctx.lineWidth = focus === i ? 1.5 : 1;
        ctx.beginPath();
        ctx.moveTo(st.x0, st.y0);
        ctx.bezierCurveTo(st.c1x, st.c1y, st.c2x, st.c2y, st.x1, st.y1);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;

      // Particles (the lens brightens the ones near the pointer)
      const lensR = 84;
      let nearest: { p: Particle; x: number; y: number; d: number } | null = null;
      for (const p of particles) {
        const { x, y } = point(streams[p.s], p.t);
        const d = pointer.inside ? Math.hypot(x - pointer.x, y - pointer.y) : Infinity;
        const dim = hoverSource.current !== null && hoverSource.current !== p.s;
        if (p.threat) {
          ctx.globalAlpha = 1;
          ctx.fillStyle = colors.alert;
          ctx.beginPath();
          ctx.arc(x, y, 3.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 0.35;
          ctx.strokeStyle = colors.alert;
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          const inLens = d < lensR;
          ctx.globalAlpha = dim ? 0.25 : inLens ? 1 : 0.7;
          ctx.fillStyle = inLens ? colors.ink : colors.muted;
          ctx.beginPath();
          ctx.arc(x, y, inLens ? 2.6 : 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
        if (d < 56 && (!nearest || d < nearest.d)) nearest = { p, x, y, d };
      }
      ctx.globalAlpha = 1;

      // Detection ripples at the console edge
      ripples = ripples.filter((r) => r.age < 1);
      for (const r of ripples) {
        ctx.globalAlpha = 1 - r.age;
        ctx.strokeStyle = colors.alert;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 6 + r.age * 34, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.lineWidth = 1;

      // Lens ring and the label of the nearest event
      if (pointer.inside && !reduce) {
        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = colors.line;
        ctx.setLineDash([2, 4]);
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, lensR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      }
      if (nearest) {
        const text = `${nearest.p.label} · ${SOURCES[nearest.p.s]}`;
        ctx.font = colors.font;
        const tw = ctx.measureText(text).width;
        let lx = nearest.x + 10;
        const ly = nearest.y - 24;
        if (lx + tw + 14 > W) lx = nearest.x - tw - 24;
        ctx.fillStyle = colors.raised;
        ctx.strokeStyle = nearest.p.threat ? colors.alert : colors.line;
        ctx.beginPath();
        ctx.roundRect(lx, ly, tw + 14, 20, 4);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = nearest.p.threat ? colors.alert : colors.ink;
        ctx.fillText(text, lx + 7, ly + 14);
      }
    };

    // Reduced motion: a single still frame with particles spread along each stream.
    const drawStill = () => {
      particles = streams.flatMap((_, s) => [0.2, 0.45, 0.7].map((t) => ({ s, t, v: 0, threat: false, label: pick(EVENTS) })));
      particles.push({ s: 1, t: 0.85, v: 0, threat: true, label: THREATS[0] });
      draw();
    };

    let raf = 0;
    let last = performance.now();
    let running = false;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      spawnIn -= dt;
      if (spawnIn <= 0 && particles.length < 64) {
        spawn(false);
        spawnIn = 0.14 + Math.random() * 0.1;
      }
      if (now >= nextThreatAt && !userThreatActive) {
        spawn(true);
        nextThreatAt = now + 7000 + Math.random() * 3000;
      }

      const arrived: Particle[] = [];
      for (const p of particles) {
        p.t += p.v * dt;
        if (p.t >= 1) arrived.push(p);
      }
      if (arrived.length) {
        particles = particles.filter((p) => p.t < 1);
        for (const p of arrived) {
          if (p.threat) detect(p);
          else if (now - lastMonitorRow > 1400) {
            lastMonitorRow = now;
            addRow("MONITOR", `${p.label} · ${SOURCES[p.s]}`);
          }
        }
      }
      for (const r of ripples) r.age += dt * 1.1;

      draw();
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reduce) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    let onScreen = false;
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen && !document.hidden) start();
      else stop();
    });
    io.observe(wrap);
    const onVisibility = () => (document.hidden ? stop() : onScreen && start());
    document.addEventListener("visibilitychange", onVisibility);

    const ro = new ResizeObserver(() => {
      layout();
      if (reduce) drawStill();
    });
    ro.observe(wrap);

    // Re-read colours when the theme changes (OS setting or the temporary theme switch).
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const onTheme = () => {
      readColors();
      if (reduce) drawStill();
    };
    scheme.addEventListener("change", onTheme);
    const mo = new MutationObserver(onTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const onMove = (e: PointerEvent) => {
      const b = wrap.getBoundingClientRect();
      pointer.x = e.clientX - b.left;
      pointer.y = e.clientY - b.top;
      pointer.inside = true;
    };
    const onLeave = () => (pointer.inside = false);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    if (reduce) {
      setStage("Monitor");
      drawStill();
    } else {
      // Hand over from the CSS discovery sequence to the live loop.
      timers.push(window.setTimeout(() => setStage("Monitor"), 2100));
    }

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      scheme.removeEventListener("change", onTheme);
      document.removeEventListener("visibilitychange", onVisibility);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      timers.forEach(clearTimeout);
      probe.remove();
      injectRef.current = null;
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label="Activity from AI agents such as Claude, OpenAI Codex, Gemini, n8n and OpenShell flowing into the SaaviAIDR console, where risky activity is detected and stopped."
      onClick={(e) => {
        const b = e.currentTarget.getBoundingClientRect();
        injectRef.current?.(e.clientX - b.left, e.clientY - b.top);
      }}
      className={cn("hero-signal relative cursor-crosshair overflow-hidden rounded-box border border-line bg-raised select-none", className)}
    >
      <div aria-hidden="true" className="hero-grid absolute inset-0" />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 size-full" />

      {/* Agent sources */}
      <ul
        aria-hidden="true"
        className="absolute inset-x-4 top-4 flex flex-wrap justify-center gap-2 md:inset-x-auto md:top-8 md:bottom-8 md:left-8 md:flex-col md:flex-nowrap md:items-start md:justify-around"
      >
        {SOURCES.map((s, i) => (
          <li
            key={s}
            ref={(el) => {
              chipRefs.current[i] = el;
            }}
            onPointerEnter={() => (hoverSource.current = i)}
            onPointerLeave={() => (hoverSource.current = null)}
            style={{ "--i": i } as React.CSSProperties}
            className="hero-chip rounded-box border border-line bg-canvas px-3 py-1.5 font-mono text-[0.75rem] text-ink-soft transition-colors hover:border-ink-muted hover:text-ink md:px-3.5 md:py-2 md:text-[0.8125rem]"
          >
            {s}
          </li>
        ))}
      </ul>

      {/* Console */}
      <div
        ref={consoleRef}
        aria-hidden="true"
        className={cn(
          "hero-console absolute inset-x-4 top-[38%] bottom-4 flex flex-col overflow-hidden rounded-box border bg-canvas transition-colors duration-300 md:inset-x-auto md:top-8 md:right-8 md:bottom-8 md:w-[46%] lg:w-[42%]",
          alerting ? "border-alert" : "border-line",
        )}
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <span className="font-display text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink">SaaviAIDR</span>
          <ol className="flex gap-2.5 font-mono text-[0.625rem] uppercase tracking-[0.08em] sm:gap-3.5 sm:text-[0.6875rem]">
            {STAGES.map((s) => (
              <li
                key={s}
                className={cn(
                  "border-b pb-0.5 transition-colors duration-300",
                  s === stage
                    ? s === "Detect"
                      ? "border-alert text-alert-ink"
                      : "border-signal text-signal-ink"
                    : "border-transparent text-ink-muted",
                )}
              >
                {s}
              </li>
            ))}
          </ol>
        </div>
        <ol ref={rowsRef} className="flex min-h-0 flex-1 flex-col justify-start gap-2 overflow-hidden px-4 py-3 font-mono text-[0.6875rem] sm:text-[0.75rem]">
          {rows.map((r, i) => (
            <li
              key={r.id}
              style={r.id < 0 ? ({ "--i": i } as React.CSSProperties) : undefined}
              className={cn(
                "grid grid-cols-[2.75rem_4.75rem_minmax(0,1fr)] items-baseline gap-2 sm:grid-cols-[3rem_5.25rem_minmax(0,1fr)]",
                r.id < 0 ? "hero-row-initial" : "hero-row",
              )}
            >
              <span className="text-ink-muted">{r.time}</span>
              <span
                className={cn(
                  r.stage === "DETECT" ? "text-alert-ink" : r.stage === "RESPOND" ? "text-signal-ink" : "text-ink-muted",
                )}
              >
                {r.stage}
              </span>
              <span className={cn("truncate", r.stage === "DETECT" ? "text-ink" : "text-ink-soft")}>{r.text}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* NEW MICROCOPY, not in the content plan: needs approval */}
      <p aria-hidden="true" className="hero-hint pointer-events-none absolute bottom-3 left-4 hidden font-mono text-[0.6875rem] text-ink-muted md:block">
        Click to simulate a threat
      </p>
    </div>
  );
}
