// Article types and helpers that are safe to use in the browser.
// (lib/insights.ts reads files from disk, so it can only run at build time;
// client components such as the Insights category filter import from here.)

// Plan 5.2 categories (confirmed by SaaviGenAI, Oct 2026). The listing filter uses this order.
export const CATEGORIES = ["AI Agent Security", "AI Governance", "Industry Analysis", "Company News"] as const;
export type Category = (typeof CATEGORIES)[number];

export type GalleryImage = { src: string; alt: string };

export type Article = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  author: string; // key in content/team.ts `authors`
  category: Category;
  summary: string | null; // null = [PLACEHOLDER] in the plan
  cover: string | null; // image path, e.g. /images/insights/<slug>.webp (1200x750)
  source: { name: string; url: string } | null; // original publication, if republished
  featured: number | null; // 1-3 = order on the Home page
  gallery: GalleryImage[];
  body: string; // Markdown; empty until the full text is supplied
  readingMinutes: number;
};

/** "August 3, 2026", the format used in the content plan. */
export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Estimated reading time at ~230 words per minute (minimum 1). */
export function readingMinutes(markdown: string) {
  const words = markdown.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}
