"use client";

import { Layers, Link2, Server, Shield, Unplug } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ComposedIcon } from "@/components/ui/ComposedIcon";
import { Icon } from "@/components/ui/Icon";
import { vendors } from "@/content/vendors";
import { cn } from "@/lib/utils";

/*
  Plan 2.4 "Why SaaviAIDR". The three points are tabs: hovering, clicking or
  arrow-keying through them switches the diagram on the right. While nobody has
  interacted and the section is on screen, it advances by itself every 7 s
  (a thin line under the active point shows the time left). Reduced motion: no auto-advance.

  The diagrams stand in for the optional dashboard screenshot ([IMAGE: Optional...]).
  Every label in them is wording from the content plan (2.4 and 3.6).
*/

const POINTS = [
  {
    id: "one-view",
    title: "One view across all your AI",
    body: "Every agent's activity in one format, searchable with one query.",
    icon: <Icon icon={Layers} size={22} />,
  },
  {
    id: "your-data",
    title: "Your data stays with you",
    body: "Runs in your own cloud or on-premises, with an air-gapped option.",
    icon: <ComposedIcon base={Shield} badge={Server} />,
  },
  {
    id: "your-soc",
    title: "Fits your existing SOC",
    body: "Mapped to OWASP Top 10 for LLM Applications and MITRE ATLAS, with findings exported to your SIEM.",
    icon: <Icon icon={Link2} size={22} />,
  },
];

const ADVANCE_MS = 7000;

function Node({ children, strong = false, className }: { children: ReactNode; strong?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "relative z-10 inline-flex items-center justify-center rounded-box border px-3.5 py-2 text-center font-mono text-[0.75rem] leading-snug",
        strong ? "border-ink bg-inverse font-medium text-on-inverse" : "border-line bg-canvas text-ink-soft",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** A 1px connector with dots marching along it (data moving). See .flow-line in globals.css. */
function Flow({ vertical = false, className }: { vertical?: boolean; className?: string }) {
  return <span aria-hidden="true" className={cn("flow-line", vertical ? "flow-line-y" : "flow-line-x", className)} />;
}

function OneView() {
  return (
    <div className="grid h-full grid-cols-[auto_minmax(3rem,1fr)_auto] items-stretch">
      <ul className="grid grid-rows-5 gap-2.5">
        {vendors.map((v) => (
          <li key={v.name} className="flex items-center">
            <Node>{v.name}</Node>
          </li>
        ))}
      </ul>
      {/* Five streams converging on one point; dashes flow toward SaaviAIDR */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" className="size-full overflow-visible">
        {[10, 30, 50, 70, 90].map((y) => (
          <path key={y} d={`M 0 ${y} C 45 ${y}, 55 50, 100 50`} fill="none" vectorEffect="non-scaling-stroke" className="dash-flow stroke-signal" strokeWidth={1} />
        ))}
      </svg>
      <div className="flex items-center">
        <Node strong className="px-5 py-3 text-[0.875rem]">
          SaaviAIDR
        </Node>
      </div>
    </div>
  );
}

function YourData() {
  return (
    <div className="flex h-full flex-col justify-center gap-6">
      <div className="relative rounded-box border border-dashed border-ink-muted px-5 pt-9 pb-6">
        <span className="absolute -top-2.5 left-4 bg-raised px-2 font-mono text-label uppercase text-ink-muted">
          Your cloud or on-premises
        </span>
        <div className="flex flex-col items-center gap-0 sm:flex-row sm:justify-between">
          <ul className="flex flex-wrap justify-center gap-2 sm:flex-col">
            {vendors.slice(0, 3).map((v) => (
              <li key={v.name}>
                <Node>{v.name}</Node>
              </li>
            ))}
          </ul>
          <Flow className="hidden sm:block sm:mx-3 sm:flex-1" />
          <Flow vertical className="my-3 h-8 sm:hidden" />
          <Node strong className="px-5 py-3 text-[0.875rem]">
            SaaviAIDR
          </Node>
        </div>
      </div>
      <p className="flex items-center gap-2.5 font-mono text-[0.75rem] uppercase tracking-[0.08em] text-ink-muted">
        <Icon icon={Unplug} size={16} />
        Air-gapped option
      </p>
    </div>
  );
}

function YourSoc() {
  return (
    <div className="flex h-full flex-col items-center justify-center sm:flex-row sm:items-center">
      <Node strong className="px-5 py-3 text-[0.875rem]">
        SaaviAIDR
      </Node>
      <Flow className="hidden sm:block sm:w-10 sm:shrink-0 lg:w-14" />
      <Flow vertical className="my-2 h-8 sm:hidden" />
      <div className="flex flex-col gap-2">
        <Node className="max-w-[14rem]">OWASP Top 10 for LLM Applications</Node>
        <Node>MITRE ATLAS</Node>
      </div>
      <Flow className="hidden sm:block sm:w-10 sm:shrink-0 lg:w-14" />
      <Flow vertical className="my-2 h-8 sm:hidden" />
      <Node className="px-5 py-3 text-[0.875rem]">SIEM</Node>
    </div>
  );
}

const DIAGRAMS = [OneView, YourData, YourSoc];

export function WhySaaviAidr() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAuto(false);
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    if (rootRef.current) io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !inView) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % POINTS.length), ADVANCE_MS);
    return () => clearTimeout(t);
  }, [auto, inView, active]);

  // Any deliberate interaction stops the auto-advance for good.
  const choose = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  // Tabs keyboard pattern: arrows move between points, Home/End jump to the ends.
  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const last = POINTS.length - 1;
    const next = { ArrowDown: i === last ? 0 : i + 1, ArrowRight: i === last ? 0 : i + 1, ArrowUp: i === 0 ? last : i - 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    choose(next);
    tabRefs.current[next]?.focus();
  };

  const Diagram = DIAGRAMS[active];

  return (
    <div ref={rootRef} className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-12">
      <div role="tablist" aria-orientation="vertical" aria-label="Why SaaviAIDR" className="border-b border-line lg:col-span-5">
        {POINTS.map((p, i) => {
          const selected = i === active;
          return (
            <button
              key={p.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`why-tab-${p.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls="why-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => choose(i)}
              onMouseEnter={() => choose(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              data-reveal
              style={{ "--reveal-index": i } as React.CSSProperties}
              className="group/tab relative flex w-full gap-5 border-t border-line py-6 text-left focus-visible:outline-offset-[-2px] md:py-7"
            >
              <span
                className={cn(
                  "inline-flex size-12 shrink-0 items-center justify-center rounded-box border transition-colors duration-300",
                  selected ? "border-signal text-signal-ink" : "border-line text-ink-muted group-hover/tab:text-ink",
                )}
              >
                {p.icon}
              </span>
              <span>
                <span className={cn("block font-display text-h3 transition-colors duration-300", selected ? "text-ink" : "text-ink-soft")}>
                  {p.title}
                </span>
                <span className="mt-1.5 block text-ink-muted">{p.body}</span>
              </span>
              {/* Time-left line for the auto-advance; restarts whenever the active point changes */}
              {selected ? (
                <span
                  key={`${active}-${auto && inView}`}
                  aria-hidden="true"
                  className={cn("absolute -top-px left-0 h-px bg-signal", auto && inView ? "why-progress" : "w-full")}
                  style={{ "--why-ms": `${ADVANCE_MS}ms` } as React.CSSProperties}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        id="why-panel"
        role="tabpanel"
        aria-labelledby={`why-tab-${POINTS[active].id}`}
        className="relative min-h-[22rem] overflow-hidden rounded-box border border-line bg-raised p-6 sm:p-8 lg:col-span-7 lg:min-h-[26rem] lg:p-10"
      >
        <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-70" />
        <div key={active} className="why-diagram relative h-full min-h-[18rem] lg:min-h-[20rem]">
          <Diagram />
        </div>
      </div>
    </div>
  );
}
