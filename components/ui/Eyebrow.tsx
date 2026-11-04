import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Short line above a headline. Only used where the content plan says
// "Above the headline". `onDark` is for the video hero.
export function Eyebrow({ className, onDark = false, children }: { className?: string; onDark?: boolean; children: ReactNode }) {
  return (
    <p
      className={cn(
        "text-[0.9375rem] font-semibold tracking-[-0.01em] md:text-[1.0625rem]",
        onDark ? "text-white/70" : "text-ink-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}
