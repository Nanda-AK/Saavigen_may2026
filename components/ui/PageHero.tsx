import type { ReactNode } from "react";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

const heights = {
  lg: "min-h-[86svh]",
  md: "min-h-[70svh]",
  sm: "min-h-[52svh]",
} as const;

/*
  Hero for inner pages: full-bleed fixed video (one clip per page), headline at
  the bottom left. Copy comes from the content plan ("Above the headline" goes in
  `eyebrow`). The text rises in on load (.rise-in in globals.css).
  data-hero="dark" tells the Header to sit transparent with white text over it.
  The negative top margin pulls the hero up under the sticky header
  (64px mobile / 80px desktop, see Header.tsx).
*/
export function PageHero({
  video,
  eyebrow,
  title,
  sub,
  size = "lg",
  children,
}: {
  video: string;
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  size?: keyof typeof heights;
  /** Buttons */
  children?: ReactNode;
}) {
  return (
    <section
      data-hero="dark"
      aria-labelledby="page-title"
      className={cn("relative isolate -mt-16 flex flex-col overflow-hidden bg-[#05070b] text-white lg:-mt-20", heights[size])}
    >
      <BackgroundVideo name={video} />
      <Container className="rise-in flex flex-1 flex-col justify-end pt-36 pb-24 md:pb-28">
        {eyebrow ? <Eyebrow onDark>{eyebrow}</Eyebrow> : null}
        <h1 id="page-title" className="mt-5 max-w-[19ch] text-display font-bold">
          {title}
        </h1>
        {sub ? <p className="mt-6 max-w-[50ch] text-lead text-white/80">{sub}</p> : null}
        {children ? <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">{children}</div> : null}
      </Container>
    </section>
  );
}
