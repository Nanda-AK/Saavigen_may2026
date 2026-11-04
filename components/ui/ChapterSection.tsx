"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Chapter = { title: string; body: string; icon: ReactNode; media: number };

/*
  Sticky "chapters" layout (OpenAI / Apple product pages): the left column (title
  and a media panel) stays pinned while the list on the right scrolls past. The
  item crossing the middle of the screen becomes active: it brightens, a line
  grows beside it, and the pinned media panel switches to that item's picture.
  Hovering an item also activates it. Mobile: a normal stacked list.
*/
export function ChapterSection({ heading, chapters, media }: { heading: ReactNode; chapters: Chapter[]; media: ReactNode[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    // A thin band across the middle of the viewport: whichever item is in it is active.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = chapters[active]?.media ?? 0;

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          {heading}
          {/* Fixed-shape stage: screenshots of different shapes are centred inside it,
              so switching between them never pushes or overlaps other content. */}
          <div className="relative mt-10 hidden aspect-[5/4] lg:block">
            {media.map((m, i) => (
              <div
                key={i}
                aria-hidden={i !== current}
                className={cn(
                  "absolute inset-0 flex items-center transition-[opacity,transform] duration-700 ease-out",
                  i === current ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0",
                )}
              >
                {m}
              </div>
            ))}
          </div>
        </div>
      </div>

      <ol className="lg:col-span-7 lg:pt-4">
        {chapters.map((c, i) => (
          <li
            key={c.title}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-index={i}
            data-active={i === active}
            onMouseEnter={() => setActive(i)}
            className="chapter relative grid grid-cols-[auto_1fr] gap-6 border-t border-line py-10 pl-6 last:border-b md:py-14"
          >
            <span aria-hidden="true" className="chapter-bar absolute top-0 left-0 h-full w-[2px] bg-ink" />
            <span className="mt-1 text-ink">{c.icon}</span>
            <div>
              <h3 className="text-[1.625rem] font-semibold leading-tight tracking-[-0.03em] text-ink md:text-[2rem]">{c.title}</h3>
              <p className="mt-3 max-w-[46ch] text-lead text-ink-muted">{c.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
