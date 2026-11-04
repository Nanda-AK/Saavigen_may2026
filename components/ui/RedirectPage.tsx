import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteUrl } from "@/lib/site";

/*
  Old-URL redirects for a static site (GitHub Pages can't send real 301s).
  Each old route renders this page, which:
    - forwards the browser instantly (<meta http-equiv="refresh" content="0">;
      React hoists the <meta> into <head>),
    - points search engines at the new URL (canonical) and keeps itself out of
      search results (noindex), which they treat like a permanent redirect,
    - shows a plain link in the rare case the browser doesn't forward.
  The list of old URLs lives in the app/ folders that use this component (and is
  excluded from the sitemap in next-sitemap.config.js).
*/
export function redirectMetadata(to: string): Metadata {
  return {
    title: { absolute: "This page has moved | SaaviGenAI" },
    robots: { index: false, follow: true },
    alternates: { canonical: new URL(to, siteUrl).toString() },
  };
}

export function RedirectPage({ to, label }: { to: string; label: string }) {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <section className="bg-canvas py-32">
        <Container>
          <h1 className="text-h2 text-ink">This page has moved</h1>
          <p className="mt-4 text-lead text-ink-muted">
            <Link href={to} className="text-ink underline underline-offset-4">
              Go to {label}
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
