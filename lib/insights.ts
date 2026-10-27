// Reads the Insights articles from content/insights/*.md at build time.
// Nothing here ships to the browser (static export renders it into HTML).
// Browser-safe types and helpers live in lib/article-utils.ts.
//
// Each file's frontmatter is checked when the site builds. A typo in a
// category or date stops the build with a message naming the file, instead
// of quietly publishing a broken card.
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { CATEGORIES, readingMinutes, type Article, type GalleryImage } from "@/lib/article-utils";

export { CATEGORIES, formatDate, type Article, type Category } from "@/lib/article-utils";

const DIR = path.join(process.cwd(), "content", "insights");

function fail(file: string, message: string): never {
  throw new Error(`content/insights/${file}: ${message}`);
}

function toIsoDate(value: unknown, file: string) {
  const d = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(d.getTime())) fail(file, `"date" is not a valid date (use YYYY-MM-DD)`);
  return d.toISOString().slice(0, 10);
}

function parse(file: string): Article {
  const { data, content } = matter(readFileSync(path.join(DIR, file), "utf8"));
  for (const key of ["title", "date", "author", "category"]) {
    if (!data[key]) fail(file, `missing "${key}"`);
  }
  if (!CATEGORIES.includes(data.category)) {
    fail(file, `category "${data.category}" must be one of: ${CATEGORIES.join(", ")}`);
  }
  // Strip HTML comments (editor notes) so they never count as article text.
  const body = content.replace(/<!--[\s\S]*?-->/g, "").trim();
  const gallery: GalleryImage[] = Array.isArray(data.gallery)
    ? data.gallery.map((g: { src?: string; alt?: string }, i: number) => {
        if (!g?.src || !g?.alt) fail(file, `gallery item ${i + 1} needs both "src" and "alt"`);
        return { src: String(g.src), alt: String(g.alt) };
      })
    : [];
  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title),
    date: toIsoDate(data.date, file),
    author: String(data.author),
    category: data.category,
    summary: data.summary ? String(data.summary) : null,
    cover: data.cover ? String(data.cover) : null,
    source: data.source?.url ? { name: String(data.source.name), url: String(data.source.url) } : null,
    featured: typeof data.featured === "number" ? data.featured : null,
    gallery,
    body,
    readingMinutes: readingMinutes(body),
  };
}

/** All articles, newest first. */
export function getAllArticles(): Article[] {
  return readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parse)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

/** The three Home page cards (plan 2.6), in their `featured` order. */
export function getFeaturedArticles(): Article[] {
  return getAllArticles()
    .filter((a) => a.featured !== null)
    .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0))
    .slice(0, 3);
}

/** Plan 6 "Related articles: three cards": same category first, then the newest others. */
export function getRelated(article: Article, count = 3): Article[] {
  const others = getAllArticles().filter((a) => a.slug !== article.slug);
  return [...others.filter((a) => a.category === article.category), ...others.filter((a) => a.category !== article.category)].slice(0, count);
}

/** Markdown -> HTML at build time. Content is our own (content/insights), so raw HTML is allowed. */
export function renderMarkdown(markdown: string): string {
  return marked.parse(markdown, { async: false, gfm: true }) as string;
}
