import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TileProps = {
  /** An <Icon /> or <ComposedIcon /> element */
  icon?: ReactNode;
  title: string;
  body: string;
  /** Position in a group, used to stagger the scroll reveal */
  index?: number;
  /** Card colour: grey on white sections (default), white on grey sections */
  surface?: "sunken" | "raised";
  className?: string;
};

// Apple-style card: no border, soft grey fill, 20px corners.
// Hover: lifts slightly with a soft shadow and the icon turns blue.
export function Tile({ icon, title, body, index = 0, surface = "sunken", className }: TileProps) {
  return (
    <article
      data-reveal
      style={{ "--reveal-index": index } as React.CSSProperties}
      className={cn(
        "group/tile relative rounded-box p-7 transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgb(0_0_0/0.25)] motion-reduce:hover:translate-y-0 md:p-8",
        surface === "sunken" ? "bg-sunken" : "bg-raised",
        className,
      )}
    >
      {icon ? (
        <span className="mb-12 inline-flex bg-inherit text-ink transition-colors duration-300 group-hover/tile:text-accent-ink">{icon}</span>
      ) : null}
      <h3 className="text-h3 text-ink">{title}</h3>
      <p className="mt-2.5 text-ink-muted">{body}</p>
    </article>
  );
}
