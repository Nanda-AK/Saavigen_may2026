import { Linkedin } from "lucide-react";
import { CategoryFilter } from "@/components/insights/CategoryFilter";
import { ContactBand } from "@/components/sections/ContactBand";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { site } from "@/content/site";
import { authors } from "@/content/team";
import { getAllArticles } from "@/lib/insights";
import { pageMetadata } from "@/lib/metadata";

// All copy on this page comes from SaaviGenAI_Website_Content_Plan.md section 5.
export const metadata = pageMetadata(
  "Insights | AI Security Articles | SaaviGenAI",
  "Articles and analysis on AI security, AI agents and AI governance from the SaaviGenAI team.",
  "/insights/",
);

export default function InsightsPage() {
  const articles = getAllArticles();
  const authorNames = Object.fromEntries(Object.entries(authors).map(([k, a]) => [k, a.name]));

  return (
    <>
      {/* 5.1 Hero */}
      <PageHero
        video="page-insights"
        size="md"
        title="Insights on AI security"
        sub="Practical analysis of AI security, AI agents and governance for security leaders and AI teams."
      />

      {/* 5.2 Category filter + 5.3 Article listing */}
      <Section labelledBy="articles-title">
        <h2 id="articles-title" className="sr-only">
          Articles
        </h2>
        <CategoryFilter articles={articles} authorNames={authorNames} />
      </Section>

      {/* 5.4 Follow prompt */}
      <section aria-label="Follow SaaviGenAI" className="border-t border-line bg-canvas">
        <div className="mx-auto flex max-w-page flex-col items-start justify-between gap-6 px-4 py-14 sm:flex-row sm:items-center sm:px-8 lg:px-12">
          <p className="flex items-center gap-4 text-[1.5rem] font-semibold tracking-[-0.03em] text-ink">
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-sunken">
              <Icon icon={Linkedin} size={20} />
            </span>
            Follow SaaviGenAI on LinkedIn for new articles.
          </p>
          <Button href={site.linkedin.href} variant="primary">
            Follow on LinkedIn
          </Button>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
