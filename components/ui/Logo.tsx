import { cn } from "@/lib/utils";

// Stand-in until the official horizontal logo arrives (plan 1.1 [IMAGE]):
// the key mark from the existing logo + the name set in the heading font.
// Both take the current text colour, so one component works on light, dark,
// over the video hero and in the footer.
// To swap in the real logo: replace the two spans with an <img> or inline SVG.
//
// Sizes: "md" = compact (menu panel), "lg" = header, "xl" = footer.
const SIZES = {
  md: { gap: "gap-2.5", mark: "h-7", name: "text-[1.1875rem]" },
  lg: { gap: "gap-3", mark: "h-8 lg:h-10", name: "text-[1.3125rem] lg:text-[1.625rem]" },
  xl: { gap: "gap-3 lg:gap-3.5", mark: "h-9 lg:h-12", name: "text-[1.5rem] lg:text-[2rem]" },
} as const;

export function Logo({ className, size = "md", compact = false }: { className?: string; size?: keyof typeof SIZES; compact?: boolean }) {
  const s = SIZES[size];
  return (
    <span className={cn("inline-flex items-center", s.gap, className)}>
      <span aria-hidden="true" className={cn("key-mark shrink-0", s.mark)} />
      <span className={cn("font-display font-semibold tracking-[-0.025em]", s.name, compact && "max-[359px]:sr-only")}>SaaviGenAI</span>
    </span>
  );
}
