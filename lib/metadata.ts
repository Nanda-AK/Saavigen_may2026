import type { Metadata } from "next";
import { basePath, logoPath, siteUrl } from "@/lib/site";

// next.config uses trailingSlash: true, so every real URL ends in "/".
// Canonicals must match exactly, otherwise they point at a URL that redirects.
function canonicalPath(path: string) {
  const withSlash = path.endsWith("/") ? path : `${path}/`;
  return `${basePath}${withSlash}`;
}

type Options = {
  /** Keep the page out of search results (style guide, redirect pages) */
  noindex?: boolean;
};

/**
 * Per-page SEO tags. `title` is used exactly as written (titles in the content
 * plan already end in "| SaaviGenAI"), so no template is appended.
 */
export function pageMetadata(title: string, description: string, path = "/", options: Options = {}): Metadata {
  const url = new URL(canonicalPath(path), siteUrl).toString();

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: options.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: "SaaviGenAI",
      type: "website",
      // Replaced by a proper 1200x630 share image in Phase 7.
      images: [{ url: logoPath, width: 1024, height: 1024, alt: "SaaviGenAI" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [logoPath],
    },
  };
}
