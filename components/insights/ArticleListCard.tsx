import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { Placeholder } from "@/components/ui/Placeholder";
import { formatDate, type Article } from "@/lib/article-utils";

// Plan 5.3 listing card: cover, category, title, date, author, a one- or
// two-sentence summary, and a "Read article" link. The whole card is clickable
// (the link stretches over it), but screen readers hear the title once.
export function ArticleListCard({ article, authorName }: { article: Article; authorName: string }) {
  return (
    <article className="group/card relative flex h-full flex-col">
      <div className="overflow-hidden rounded-[1.25rem] bg-tint">
        {article.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.cover}
            alt=""
            width={1200}
            height={750}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full object-cover transition-transform duration-[900ms] ease-out group-hover/card:scale-[1.04] motion-reduce:transform-none"
          />
        ) : (
          <div className="aspect-[16/10]" />
        )}
      </div>
      <div className="flex flex-1 flex-col pt-6">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.875rem] text-ink-muted">
          <span className="font-semibold text-ink">{article.category}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
        </p>
        <h3 className="mt-3 text-[1.5rem] leading-[1.15] font-semibold tracking-[-0.03em] text-ink">
          <Link href={`/insights/${article.slug}/`} className="after:absolute after:inset-0 after:rounded-[1.25rem] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-[var(--focus)]">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 text-[0.9375rem] text-ink-muted">{authorName}</p>
        <div className="mt-4 text-ink-soft">
          {article.summary ? <p>{article.summary}</p> : <Placeholder note="one- or two-sentence summary for this article" />}
        </div>
        <p aria-hidden="true" className="mt-auto flex items-center gap-1.5 pt-6 font-medium text-ink">
          Read article
          <span className="transition-transform duration-300 group-hover/card:translate-x-1">
            <Icon icon={ArrowRight} size={18} />
          </span>
        </p>
      </div>
    </article>
  );
}
