import Link from "next/link";
import { ArticleCover } from "@/components/ui/ArticleCover";
import { formatDate, type Article } from "@/lib/insights";
import { cn } from "@/lib/utils";

type Layout = "feature" | "row" | "stack";

// One article card. The title link stretches over the whole card (after:inset-0),
// so the card is one click target but screen readers hear just the title.
// Plan 2.6 shows: cover, category, title, date. Listing cards (Phase 5) add summary and author.
export function ArticleCard({ article, layout = "stack", index = 0 }: { article: Article; layout?: Layout; index?: number }) {
  const href = `/insights/${article.slug}/`;
  const cover =
    article.cover === "generated" ? (
      <ArticleCover slug={article.slug} category={article.category} className="transition-transform duration-500 ease-out group-hover/card:scale-[1.03] motion-reduce:transform-none" />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={article.cover} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
    );

  return (
    <article
      data-reveal
      style={{ "--reveal-index": index } as React.CSSProperties}
      className={cn(
        "group/card relative flex overflow-hidden rounded-box border border-line bg-raised transition-[transform,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-signal motion-reduce:hover:translate-y-0",
        layout === "row" ? "flex-col sm:flex-row" : "flex-col",
        layout === "feature" && "h-full",
      )}
    >
      <div
        className={cn(
          "overflow-hidden border-line",
          layout === "feature" && "aspect-[16/10] border-b lg:aspect-auto lg:flex-1",
          layout === "stack" && "aspect-[16/10] border-b",
          layout === "row" && "aspect-[16/10] border-b sm:aspect-auto sm:w-[42%] sm:shrink-0 sm:border-r sm:border-b-0",
        )}
      >
        {cover}
      </div>
      <div className={cn("flex flex-col p-6", layout === "feature" && "md:p-8")}>
        <p className="font-mono text-label uppercase text-ink-muted">{article.category}</p>
        <h3 className={cn("mt-3 text-ink", layout === "feature" ? "text-h3 md:text-[1.75rem] md:leading-tight" : "text-[1.1875rem] leading-snug")}>
          <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-[var(--focus)] focus-visible:after:rounded-box">
            {article.title}
          </Link>
        </h3>
        <p className="mt-4 text-sm text-ink-muted">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
        </p>
      </div>
    </article>
  );
}
