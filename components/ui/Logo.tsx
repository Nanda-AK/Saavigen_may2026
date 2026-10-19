import { cn } from "@/lib/utils";

// Stand-in until the official horizontal logo arrives (plan 1.1 [IMAGE]):
// the key mark from the existing logo + the name set in the heading font.
// Both take the current text colour, so one component works on light, dark and the footer.
// To swap in the real logo: replace the two spans with an <img> or inline SVG.
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span aria-hidden="true" className="key-mark h-7 shrink-0" />
      <span className={cn("font-display text-[1.1875rem] font-semibold tracking-[-0.02em]", compact && "max-[359px]:sr-only")}>
        SaaviGenAI
      </span>
    </span>
  );
}
