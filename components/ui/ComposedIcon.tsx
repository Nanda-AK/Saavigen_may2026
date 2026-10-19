import type { LucideIcon } from "lucide-react";
import { Icon } from "@/components/ui/Icon";

// Two library icons layered: a main glyph plus a small badge in the corner.
// Used where the plan asks for a combined symbol (e.g. "a speech bubble with a
// building") and no single icon exists. Same stroke weight as every other icon.
export function ComposedIcon({ base, badge, size = 22 }: { base: LucideIcon; badge: LucideIcon; size?: number }) {
  return (
    <span className="relative inline-flex" style={{ width: size, height: size }} aria-hidden="true">
      <Icon icon={base} size={size} />
      <span className="absolute -right-1.5 -bottom-1.5 inline-flex rounded-[3px] bg-raised p-px">
        <Icon icon={badge} size={Math.round(size * 0.55)} />
      </span>
    </span>
  );
}
