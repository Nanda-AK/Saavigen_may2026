import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Every line icon goes through here so the stroke weight is identical site-wide.
export const ICON_STROKE = 1.5;

type IconProps = {
  icon: LucideIcon;
  size?: number;
  className?: string;
  /** Only set when the icon carries meaning on its own (no visible text next to it) */
  label?: string;
};

export function Icon({ icon: Glyph, size = 20, className, label }: IconProps) {
  return (
    <Glyph
      width={size}
      height={size}
      strokeWidth={ICON_STROKE}
      className={cn("shrink-0", className)}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      focusable="false"
    />
  );
}
