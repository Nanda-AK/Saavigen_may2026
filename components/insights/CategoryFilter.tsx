"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { ArticleListCard } from "@/components/insights/ArticleListCard";
import { CATEGORIES, type Article } from "@/lib/article-utils";
import { cn } from "@/lib/utils";

/*
  Plan 5.2 category filter + 5.3 listing.
  - Chips: All + the plan's categories. The choice is kept in the URL
    (?category=...), so a filtered view can be shared or bookmarked.
  - Where the browser supports the View Transitions API, cards glide into their
    new places when the filter changes; elsewhere they simply update.
  - A polite live region tells screen-reader users how many articles are shown.
*/
type Choice = "All" | (typeof CATEGORIES)[number];

export function CategoryFilter({ articles, authorNames }: { articles: Article[]; authorNames: Record<string, string> }) {
  const [choice, setChoice] = useState<Choice>("All");

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("category");
    const match = CATEGORIES.find((c) => c.toLowerCase() === fromUrl?.toLowerCase());
    if (match) setChoice(match);
  }, []);

  function choose(next: Choice) {
    const url = new URL(window.location.href);
    if (next === "All") url.searchParams.delete("category");
    else url.searchParams.set("category", next);
    window.history.replaceState(null, "", url);

    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (doc.startViewTransition && !reduce) doc.startViewTransition(() => flushSync(() => setChoice(next)));
    else setChoice(next);
  }

  const shown = choice === "All" ? articles : articles.filter((a) => a.category === choice);

  return (
    <>
      <div role="group" aria-label="Filter articles by category" className="flex flex-wrap gap-2">
        {(["All", ...CATEGORIES] as Choice[]).map((c) => {
          const count = c === "All" ? articles.length : articles.filter((a) => a.category === c).length;
          const on = c === choice;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              onClick={() => choose(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-[0.9375rem] font-medium transition-colors duration-200",
                on ? "border-ink bg-inverse text-on-inverse" : "border-line text-ink-soft hover:border-ink hover:text-ink",
              )}
            >
              {c}
              <span className={cn("ml-2 text-[0.8125rem]", on ? "text-on-inverse/60" : "text-ink-muted")}>{count}</span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        {shown.length} {shown.length === 1 ? "article" : "articles"} shown
      </p>

      <ul className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((a) => (
          <li key={a.slug} style={{ viewTransitionName: `article-${a.slug}` }}>
            <ArticleListCard article={a} authorName={authorNames[a.author] ?? a.author} />
          </li>
        ))}
      </ul>
    </>
  );
}
