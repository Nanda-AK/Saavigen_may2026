import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Small mono label above a headline. Only used where the content plan says
// "Above the headline", so it stays rare (Taste rule: max 1 per 3 sections).
export function Eyebrow({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p className={cn("font-mono text-label font-medium uppercase text-signal-ink", className)}>{children}</p>
  );
}
