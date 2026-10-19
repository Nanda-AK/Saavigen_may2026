import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TileProps = {
  /** An <Icon /> or <ComposedIcon /> element */
  icon?: ReactNode;
  title: string;
  body: string;
  /** Position in a group, used to stagger the scroll reveal */
  index?: number;
  className?: string;
};

// Icon + title + one line. Hover: lifts 2px and the border turns to the accent.
export function Tile({ icon, title, body, index = 0, className }: TileProps) {
  return (
    <article
      data-reveal
      style={{ "--reveal-index": index } as React.CSSProperties}
      className={cn(
        "group/tile relative rounded-box border border-line bg-raised p-6 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-signal motion-reduce:hover:translate-y-0 md:p-7",
        className,
      )}
    >
      {icon ? (
        <span className="mb-10 inline-flex size-12 items-center justify-center rounded-box border border-line text-ink transition-colors duration-300 group-hover/tile:border-signal group-hover/tile:text-signal-ink">
          {icon}
        </span>
      ) : null}
      <h3 className="text-h3 text-ink">{title}</h3>
      <p className="mt-2 text-ink-muted">{body}</p>
    </article>
  );
}
