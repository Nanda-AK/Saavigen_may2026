import Link from "next/link";
import { formatDate, type Article } from "@/lib/insights";
import { cn } from "@/lib/utils";

type Layout = "feature" | "row" | "stack";

// One article card. The title link stretches over the whole card (after:inset-0),
// so the card is one click target but screen readers hear just the title.
// Plan 2.6 shows: cover, category, title, date. Listing cards (Phase 5) add summary and author.
// Covers are 1200x750 WebP photos in public/images/insights/ (see content/media-credits.md).
export function ArticleCard({ article, layout = "stack", index = 0 }: { article: Article; layout?: Layout; index?: number }) {
  const href = `/insights/${article.slug}/`;

  return (
    <article
      data-reveal
      style={{ "--reveal-index": index } as React.CSSProperties}
      className={cn(
        "group/card relative flex overflow-hidden rounded-[1.25rem] bg-sunken",
        layout === "row" ? "flex-col sm:flex-row" : "flex-col",
        layout === "feature" && "h-full",
      )}
    >
      <div
        className={cn(
          "overflow-hidden bg-tint",
          layout === "feature" && "aspect-[16/10] lg:aspect-auto lg:flex-1",
          layout === "stack" && "aspect-[16/10]",
          layout === "row" && "aspect-[16/10] sm:aspect-auto sm:w-[44%] sm:shrink-0",
        )}
      >
        {article.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.cover}
            alt=""
            loading="lazy"
            decoding="async"
            width={1200}
            height={750}
            className="size-full object-cover transition-transform duration-[900ms] ease-out group-hover/card:scale-[1.05] motion-reduce:transform-none"
          />
        ) : null}
      </div>
      <div className={cn("flex flex-col p-7", layout === "feature" && "md:p-9")}>
        <p className="text-[0.8125rem] font-semibold text-accent-ink">{article.category}</p>
        <h3
          className={cn(
            "mt-2.5 text-ink transition-colors group-hover/card:text-accent-ink",
            layout === "feature" ? "text-[1.625rem] leading-[1.15] tracking-[-0.03em] md:text-[2rem]" : "text-[1.25rem] leading-snug tracking-[-0.02em]",
          )}
        >
          <Link
            href={href}
            className="after:absolute after:inset-0 after:rounded-[1.25rem] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-[var(--focus)]"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-4 text-[0.875rem] text-ink-muted">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
        </p>
      </div>
    </article>
  );
}
