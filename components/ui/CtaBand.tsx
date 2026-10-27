import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

// Closing call-to-action band used at the end of every page (plan: "Every page
// ends with a route to contact"). Centred, large, Apple-style.
export function CtaBand({ id, title, line, children }: { id: string; title: string; line?: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="bg-sunken">
      <Container className="py-24 text-center md:py-32 lg:py-40">
        <h2 id={id} data-reveal className="mx-auto max-w-[18ch] text-h2 text-ink md:text-[4rem] md:leading-[1.02]">
          {title}
        </h2>
        {line ? (
          <p data-reveal style={{ "--reveal-index": 1 } as React.CSSProperties} className="mx-auto mt-6 max-w-[44ch] text-lead text-ink-muted">
            {line}
          </p>
        ) : null}
        <div
          data-reveal
          style={{ "--reveal-index": 2 } as React.CSSProperties}
          className="mt-11 flex flex-col items-center justify-center gap-x-8 gap-y-4 sm:flex-row sm:flex-wrap"
        >
          {children}
        </div>
      </Container>
    </section>
  );
}
