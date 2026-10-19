// Reads the Insights articles from content/insights/*.md at build time.
// Nothing here ships to the browser (static export renders it into HTML).
//
// Each file's frontmatter is checked when the site builds. A typo in a
// category or date stops the build with a message naming the file, instead
// of quietly publishing a broken card.
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Plan 5.2 categories ([TO CONFIRM] final names). The listing filter uses this order.
export const CATEGORIES = ["AI Agent Security", "AI Governance", "Industry Analysis", "Company News"] as const;
export type Category = (typeof CATEGORIES)[number];

export type Article = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  author: string; // key in content/authors (Phase 5)
  category: Category;
  summary: string | null; // null = [PLACEHOLDER] in the plan
  cover: string | null; // image path, e.g. /images/insights/<slug>.webp (1200x750)
  source: { name: string; url: string } | null;
  featured: number | null; // 1-3 = order on the Home page
  body: string;
};

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
    body: content.trim(),
  };
}

/** All articles, newest first. */
export function getAllArticles(): Article[] {
  return readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parse)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** The three Home page cards (plan 2.6), in their `featured` order. */
export function getFeaturedArticles(): Article[] {
  return getAllArticles()
    .filter((a) => a.featured !== null)
    .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0))
    .slice(0, 3);
}

/** "August 3, 2026", the format used in the content plan. */
export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
