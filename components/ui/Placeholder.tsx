import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Visible marker for anything the content plan says is still missing.
// Kinds match the plan's markers. `note` is the plan's own wording.
// Find every use with:  npm run placeholders   (added in Phase 7)
type Kind = "PLACEHOLDER" | "TO CONFIRM" | "IMAGE";

const frame = "border border-dashed border-alert bg-alert/10 text-alert-ink";

/** Inline: sits inside a sentence or replaces a single value (e.g. a phone number). */
export function Placeholder({ kind = "PLACEHOLDER", note }: { kind?: Kind; note: string }) {
  return (
    <span
      data-placeholder={kind}
      className={cn(frame, "inline rounded-[3px] px-1.5 py-0.5 font-mono text-[0.8125rem] leading-relaxed")}
    >
      [{kind}: {note}]
    </span>
  );
}

/** Block: stands in for an image, screenshot or a whole piece of content. */
export function PlaceholderBlock({
  kind = "IMAGE",
  note,
  className,
  children,
}: {
  kind?: Kind;
  note: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      data-placeholder={kind}
      role={kind === "IMAGE" ? "img" : undefined}
      aria-label={kind === "IMAGE" ? `Image to be supplied: ${note}` : undefined}
      className={cn(frame, "flex flex-col justify-center gap-2 rounded-box p-5", className)}
    >
      <span className="font-mono text-label font-medium uppercase">{kind}</span>
      <span className="text-sm leading-snug">{note}</span>
      {children}
    </div>
  );
}
