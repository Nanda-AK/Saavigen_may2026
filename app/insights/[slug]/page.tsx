import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { AuthorBox } from "@/components/insights/AuthorBox";
import { Gallery } from "@/components/insights/Gallery";
import { ContactBand } from "@/components/sections/ContactBand";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { authors } from "@/content/team";
import { formatDate, getAllArticles, getArticle, getRelated, renderMarkdown } from "@/lib/insights";
import { pageMetadata } from "@/lib/metadata";

// Plan 6: the template used for every article. One static page per Markdown
// file in content/insights/ (generateStaticParams), built at deploy time.

export const dynamicParams = false; // unknown slugs -> 404

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return pageMetadata(`${a.title} | SaaviGenAI`, a.summary ?? `${a.category} article from SaaviGenAI, ${formatDate(a.date)}.`, `/insights/${a.slug}/`);
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const author = authors[article.author];
  const related = getRelated(article);
  const html = article.body ? renderMarkdown(article.body) : "";

  return (
    <>
      {/* Reading progress: a hairline under the header that fills as you scroll (CSS scroll timeline) */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-16 z-40 h-[2px] lg:top-20">
        <div className="read-progress motion-ok h-full bg-ink" />
      </div>

      <PageHero
        video="page-insights"
        size="md"
        eyebrow={article.category}
        title={article.title}
        sub={
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[1.0625rem]">
            {author?.companyAnchor ? (
              <Link href={author.companyAnchor} className="font-medium text-white underline-offset-4 hover:underline">
                {author.name}
              </Link>
            ) : (
              <span className="font-medium text-white">{author?.name ?? article.author}</span>
            )}
            <span aria-hidden="true">·</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readingMinutes} min read</span>
          </span>
        }
      />

      <article className="bg-canvas pt-16 pb-24 md:pt-24 md:pb-32">
        <Container className="max-w-[54rem]">
          <Link href="/insights/" className="link-cta group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink-muted hover:text-ink">
            <Icon icon={ArrowLeft} size={16} />
            <span className="link-cta-label">All insights</span>
          </Link>
        </Container>

        {/* Cover image: lifts into place as it scrolls in */}
        {article.cover ? (
          <Container className="mt-10 max-w-6xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={article.cover} alt="" width={1200} height={750} className="lift-in motion-ok aspect-[16/9] w-full rounded-[1.75rem] object-cover" />
          </Container>
        ) : null}

        <Container className="mt-14 max-w-[42rem] md:mt-20">
          {/* Every article has full text. If a future one ships without a body, show its summary
              (and the "Read the original" link below) instead of an empty page. */}
          {html ? (
            <div className="prose-article" dangerouslySetInnerHTML={{ __html: html }} />
          ) : article.summary ? (
            <p className="text-lead text-ink-soft">{article.summary}</p>
          ) : null}

          {/* "First shared": the site versions are written up from the author's shorter LinkedIn posts. */}
          {article.source ? (
            <p className="mt-12 border-t border-line pt-6 text-ink-muted">
              First shared on {article.source.name}, {formatDate(article.date)}.{" "}
              <a href={article.source.url} target="_blank" rel="noopener noreferrer" className="link-cta group inline-flex items-center gap-1 font-medium text-ink">
                <span className="link-cta-label">Read the original</span>
                <Icon icon={ArrowUpRight} size={16} />
              </a>
            </p>
          ) : null}
        </Container>

        {article.gallery.length ? (
          <Container className="mt-16 max-w-6xl">
            <Gallery images={article.gallery} title="Photos from the event" />
          </Container>
        ) : null}

        <Container className="mt-16 max-w-[54rem]">
          <AuthorBox authorKey={article.author} />
        </Container>
      </article>

      {/* Related articles: three cards */}
      {related.length ? (
        <section aria-labelledby="related-title" className="border-t border-line bg-canvas py-20 md:py-28">
          <Container>
            <h2 id="related-title" className="text-h2 text-ink">
              Related articles
            </h2>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {related.map((a, i) => (
                <ArticleCard key={a.slug} article={a} layout="stack" index={i} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <ContactBand />
    </>
  );
}
