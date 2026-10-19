import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Step = {
  title: string;
  body: string;
  icon: ReactNode;
  /** "alert" lights the step in amber instead of blue (e.g. Detect) */
  tone?: "accent" | "alert";
};

// Numbered steps joined by a line. Horizontal from 768px, vertical below.
// When the list scrolls into view (RevealObserver adds .is-revealed) each
// connector draws itself and each step lights up, one after another; then a
// small dot keeps travelling along the line. All CSS: see "StepFlow" in globals.css.
export function StepFlow({ steps, nodeBg = "bg-canvas", className }: { steps: Step[]; nodeBg?: string; className?: string }) {
  return (
    <ol data-reveal className={cn("stepflow grid gap-12 md:gap-8", className)} style={{ "--n": steps.length } as React.CSSProperties}>
      {steps.map((step, i) => (
        <li key={step.title} className="stepflow-step relative" data-tone={step.tone ?? "accent"} style={{ "--i": i } as React.CSSProperties}>
          {i < steps.length - 1 ? (
            <span aria-hidden="true" className="stepflow-link">
              <span className="stepflow-pulse" />
            </span>
          ) : null}
          <span className={cn("stepflow-node relative z-10 inline-flex size-14 items-center justify-center rounded-full border-[1.5px]", nodeBg)}>
            {step.icon}
          </span>
          <p className="mt-7 font-mono text-label text-ink-muted">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="mt-1.5 text-[1.625rem] font-semibold tracking-[-0.03em] text-ink">{step.title}</h3>
          <p className="mt-2 max-w-[30ch] text-ink-muted">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
