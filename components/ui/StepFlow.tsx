import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Step = {
  title: string;
  body: string;
  icon: ReactNode;
  /** "alert" lights the step in amber instead of the accent (e.g. Detect) */
  tone?: "signal" | "alert";
};

// Numbered steps joined by a line. Horizontal from 768px, vertical below.
// When the list scrolls into view (RevealObserver adds .is-revealed) each
// connector draws itself and each step lights up, one after another; then a
// small dot keeps travelling along the line. All CSS: see ".stepflow" in globals.css.
export function StepFlow({ steps, className }: { steps: Step[]; className?: string }) {
  return (
    <ol
      data-reveal
      className={cn("stepflow grid gap-12 md:gap-6", className)}
      style={{ "--n": steps.length } as React.CSSProperties}
    >
      {steps.map((step, i) => (
        <li key={step.title} className="stepflow-step relative" data-tone={step.tone ?? "signal"} style={{ "--i": i } as React.CSSProperties}>
          {i < steps.length - 1 ? (
            <span aria-hidden="true" className="stepflow-link">
              <span className="stepflow-pulse" />
            </span>
          ) : null}
          <span className="stepflow-node relative z-10 inline-flex size-12 items-center justify-center rounded-box border bg-canvas">
            {step.icon}
          </span>
          <p className="mt-6 font-mono text-label text-ink-muted">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="mt-1.5 text-h3 text-ink">{step.title}</h3>
          <p className="mt-2 max-w-[32ch] text-ink-muted">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
