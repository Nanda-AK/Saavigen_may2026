import { cn } from "@/lib/utils";

// Stand-in until the official horizontal logo arrives (plan 1.1 [IMAGE]):
// the key mark from the existing logo + the name set in the heading font.
// Both take the current text colour, so one component works on light, dark,
// over the video hero and in the footer.
// To swap in the real logo: replace the two spans with an <img> or inline SVG.
//
// size "lg" = header (grows on desktop), "md" = footer.
export function Logo({ className, size = "md", compact = false }: { className?: string; size?: "md" | "lg"; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center", size === "lg" ? "gap-3" : "gap-2.5", className)}>
      <span aria-hidden="true" className={cn("key-mark shrink-0", size === "lg" ? "h-8 lg:h-10" : "h-7")} />
      <span
        className={cn(
          "font-display font-semibold tracking-[-0.025em]",
          size === "lg" ? "text-[1.3125rem] lg:text-[1.625rem]" : "text-[1.1875rem]",
          compact && "max-[359px]:sr-only",
        )}
      >
        SaaviGenAI
      </span>
    </span>
  );
}
