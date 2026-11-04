import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const tones = {
  canvas: "bg-canvas",
  sunken: "bg-sunken",
} as const;

type SectionProps = {
  id?: string;
  /** Sections alternate white (canvas) and light grey (sunken), Apple-style */
  tone?: keyof typeof tones;
  className?: string;
  containerClassName?: string;
  labelledBy?: string;
  children: ReactNode;
};

// Standard vertical rhythm: 80px mobile, 112px tablet, 144px desktop.
export function Section({ id, tone = "canvas", className, containerClassName, labelledBy, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn(tones[tone], "py-20 md:py-28 lg:py-36", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/** Centred section headline with an optional supporting line. */
export function SectionHeader({
  id,
  title,
  sub,
  align = "center",
  className,
}: {
  id: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div data-reveal className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl", className)}>
      <h2 id={id} className="text-h2 text-ink">
        {title}
      </h2>
      {sub ? <p className="mt-5 text-lead text-ink-muted">{sub}</p> : null}
    </div>
  );
}
