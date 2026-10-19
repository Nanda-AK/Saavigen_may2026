import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export type PipelineStep = {
  title: string;
  body: string;
  icon: ReactNode;
  /** "alert" lights the step in amber instead of blue (e.g. Detect) */
  tone?: "accent" | "alert";
};

/*
  Scroll-driven pipeline (plan 2.3 "From blind spot to control").
  Desktop, in browsers with CSS scroll-driven animations (Chrome, Edge, Safari 26+):
  the section is taller than the screen and its content stays pinned while you
  scroll; the line fills and each step lights up as you go. No JavaScript: the
  progress value --p comes from a CSS view-timeline (".pipeline" in globals.css).
  Mobile, Firefox and reduced motion: a normal section with every step lit.
*/
export function ScrollPipeline({
  id,
  title,
  steps,
  tone = "sunken",
}: {
  id: string;
  title: string;
  steps: PipelineStep[];
  tone?: "sunken" | "canvas";
}) {
  return (
    <section aria-labelledby={id} className={cn("pipeline", tone === "sunken" ? "bg-sunken" : "bg-canvas")}>
      <div className="pipeline-sticky">
        <Container className="py-20 md:py-28">
          <SectionHeader id={id} title={title} />
          <div className="pipeline-progress relative mt-16 md:mt-24" style={{ "--n": steps.length } as React.CSSProperties}>
            <span aria-hidden="true" className="pipeline-track hidden md:block">
              <span className="pipeline-fill" />
              <span className="pipeline-head" />
            </span>
            <ol className="grid gap-12 md:grid-cols-[repeat(var(--n),minmax(0,1fr))] md:gap-8">
              {steps.map((step, i) => (
                <li key={step.title} className="pipeline-step relative" data-tone={step.tone ?? "accent"} style={{ "--i": i } as React.CSSProperties}>
                  {/* Mobile: vertical connector from this node down to the next one
                      (own height - 56px node + 48px gap = 100% - 8px) */}
                  {i < steps.length - 1 ? (
                    <span aria-hidden="true" className="absolute top-14 left-7 h-[calc(100%-0.5rem)] w-px bg-line-strong md:hidden" />
                  ) : null}
                  <span className="pipeline-node relative z-10 inline-flex size-14 items-center justify-center rounded-full border-[1.5px]">
                    {step.icon}
                  </span>
                  <div className="pipeline-text">
                    <p className="mt-7 font-mono text-label text-ink-muted">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-1.5 text-[1.625rem] font-semibold tracking-[-0.03em] text-ink">{step.title}</h3>
                    <p className="mt-2 max-w-[30ch] text-ink-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </div>
    </section>
  );
}
