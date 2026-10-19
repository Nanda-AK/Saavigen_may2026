import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const tones = {
  canvas: "bg-canvas",
  raised: "bg-raised",
  sunken: "bg-sunken",
} as const;

type SectionProps = {
  id?: string;
  tone?: keyof typeof tones;
  /** Adds a 1px top border to separate sections that share a background */
  divided?: boolean;
  className?: string;
  containerClassName?: string;
  labelledBy?: string;
  children: ReactNode;
};

// Standard vertical rhythm: 64px mobile, 96px tablet, 128px desktop.
export function Section({
  id,
  tone = "canvas",
  divided = false,
  className,
  containerClassName,
  labelledBy,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(tones[tone], divided && "border-t border-line", "py-16 md:py-24 lg:py-32", className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
