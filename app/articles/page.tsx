import Link from "next/link";
import { FooterCTABand } from "@/components/sections/FooterCTABand";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pageMetadata } from "@/lib/metadata";
import { basePath } from "@/lib/site";

export const metadata = pageMetadata(
  "Articles | SaaviGenAI",
  "Practical thinking on AI security, LLMs, and enterprise AI governance from the SaaviGenAI team.",
  "/articles",
);

const articles = [
  {
    title:
      "Will Indian Banks Trust Claude with Their Core Banking Data?",
    description:
      "Anthropic's India-hosted Claude addresses data residency requirements, but trust in enterprise AI goes beyond where data is processed. For highly regulated sectors like banking, governance, control, auditability and data sovereignty will likely shape AI adoption, driving a hybrid approach where closed models power general workloads while self-hosted models handle mission critical systems.",
    author: "Nanda Kumar Kirubakaran",
    date: "August 4, 2026",
    source: "LinkedIn Pulse",
    image: `${basePath}/images/will_indian_banks_trust_claude.jpg`,
    href: "https://www.linkedin.com/posts/nandakumar80_anthropic-claudeai-aws-share-7490289895429640192-gcQX/",
  },
  {
    title:
      "Claude Went Rogue? Or Did the Sandbox Fail?",
    description:
      "Anthropic's recent findings show that the biggest AI security risks may not come from the model itself, but from the environments in which AI agents operate. As agents gain greater autonomy, organizations need end-to-end visibility into AI behavior, tool usage, credentials and runtime activity - making AI Detection & Response (AIDR) the next critical layer of enterprise AI security.",
    author: "Nanda Kumar Kirubakaran",
    date: "August 3, 2026",
    source: "LinkedIn Pulse",
    image: `${basePath}/images/claude_went_rogue.jpg`,
    href: "https://www.linkedin.com/posts/nandakumar80_ai-cybersecurity-aiagents-share-7489982114205978624-coqn/",
  },
  {
    title:
      "SaaviGenAI Sponsors Anthropic CCCL AI Security Event in Bengaluru",
    description:
      "70+ security professionals, engineers, and AI enthusiasts gathered for an evening of deep-tech learning on Constitutional AI, threat models, and the future of AI security in India.",
    author: "SaaviGenAI Team",
    date: "July 12, 2026",
    source: "SaaviGenAI Blog",
    image: `${basePath}/images/ThumbnailArticle3.jpeg`,
    href: "/articles/cccl-ai-security-event",
  },
  {
    title:
      "Claude Mythos & Project Glasswing: The Moment AI Crossed Into Cyber Offense Reality",
    description:
      "Anthropic's Claude Mythos can identify high-severity vulnerabilities, generate functional exploits, and has already found thousands of previously undetected flaws fundamentally shifting the cybersecurity asymmetry toward AI-assisted attackers.",
    author: "Nanda Kumar Kirubakaran",
    date: "April 8, 2026",
    source: "LinkedIn Pulse",
    image: `${basePath}/images/blog1.img`,
    href: "https://www.linkedin.com/pulse/claude-mythos-project-glasswing-moment-ai-crossed-kirubakaran-akwdc/",
  },
  {
    title:
      "LLMs Are Trained on Only 5% of the Internet — Here's Why That Matters",
    description:
      "Large Language Models are trained only on the publicly crawlable surface web — excluding paywalled content, private data, and restricted sources. Understanding this gap is critical for anyone building or governing AI systems.",
    author: "Nanda Kumar",
    date: "October 19, 2025",
    source: "Medium",
    image: `${basePath}/images/blog2.png`,
    href: "https://medium.com/@nandakumar_89332/llms-are-trained-on-only-5-of-the-internet-heres-why-that-matters-24f8dbfbe5a4",
  },
  {
    title:
      "The Cost of Unchecked Ai Deloittes 440k And Reputation Reminder For Every Leader",
    description:
      "Deloitte’s $440k AI hallucination error highlights why business leaders must rigorously verify automated outputs to protect credibility.",
    author: "Nanda Kumar",
    date: "Oct 10, 2025",
    source: "Medium",
    image: `${basePath}/images/blog4.png`,
    href: "https://medium.com/@nandakumar_89332/the-cost-of-unchecked-ai-deloittes-440k-and-reputation-reminder-for-every-leader-7a91ca5738df",
  },
];

export default function ArticlesPage() {
  return (
    <>
      <HeroSection
        label="Articles"
        heading="Practical thinking on AI security and governance."
        subheading="Field notes, analysis, and perspectives from the SaaviGenAI team — written for security leaders, AI practitioners, and enterprise teams navigating the new AI landscape."
      />

      <section className="bg-base py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <SectionLabel
            label="Published"
            heading="Latest articles."
            subheading="Perspectives on AI security, LLM governance, and enterprise AI adoption — with more in progress."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {articles.map((article) => (
              <article
                key={article.title}
                className="relative flex flex-col overflow-hidden rounded-2xl border border-default bg-surface transition-transform duration-200 hover:-translate-y-1.5"
              >
                <div className="aspect-video w-full overflow-hidden bg-navy/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-default bg-base px-2.5 py-0.5 font-mono text-xs text-gold">
                      {article.source}
                    </span>
                    <span className="font-mono text-xs text-muted">
                      {article.date}
                    </span>
                  </div>

                  <h2 className="mb-3 font-display text-lg font-bold leading-snug text-primary md:text-xl">
                    {article.title}
                  </h2>

                  <p className="mb-5 flex-1 text-[15px] leading-relaxed text-secondary">
                    {article.description}
                  </p>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs text-muted">{article.author}</span>
                    <span
                      aria-hidden="true"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-teal"
                    >
                      Read article →
                    </span>
                  </div>
                </div>

                {article.href.startsWith("/") ? (
                  <Link
                    href={article.href}
                    className="absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
                    aria-label={article.title}
                  />
                ) : (
                  <a
                    href={article.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
                    aria-label={article.title}
                  />
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <FooterCTABand />
    </>
  );
}
