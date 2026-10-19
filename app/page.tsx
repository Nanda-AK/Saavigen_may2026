import { Activity, ScanSearch, ShieldCheck, TriangleAlert } from "lucide-react";
import { HeroSignal } from "@/components/home/HeroSignal";
import { PathCards } from "@/components/home/PathCards";
import { WhySaaviAidr } from "@/components/home/WhySaaviAidr";
import { ContactBand } from "@/components/sections/ContactBand";
import { WhatWeSecure } from "@/components/sections/WhatWeSecure";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { StepFlow } from "@/components/ui/StepFlow";
import { getFeaturedArticles } from "@/lib/insights";
import { pageMetadata } from "@/lib/metadata";

// All copy on this page comes from SaaviGenAI_Website_Content_Plan.md section 2.
export const metadata = pageMetadata(
  "SaaviAIDR | AI Detection and Response | SaaviGenAI",
  "SaaviAIDR gives security teams visibility, detection and response across the AI agents and chatbots in their organisation. Self-hosted, with managed service options.",
  "/",
);

const STEPS = [
  { title: "Discover", body: "Find every AI agent, model and user in use.", icon: <Icon icon={ScanSearch} size={22} /> },
  { title: "Monitor", body: "See prompts, responses and tool calls in one place.", icon: <Icon icon={Activity} size={22} /> },
  {
    title: "Detect",
    body: "Catch prompt injection, jailbreaks and data leakage as they happen.",
    icon: <Icon icon={TriangleAlert} size={22} />,
    tone: "alert" as const, // amber: the alert moment
  },
  { title: "Respond", body: "Stop risky sessions automatically, or hand off to your SOC.", icon: <Icon icon={ShieldCheck} size={22} /> },
];

export default function HomePage() {
  const featured = getFeaturedArticles();
  const [lead, ...rest] = featured;

  return (
    <>
      {/* 2.1 Hero */}
      <section aria-labelledby="hero-title" className="border-b border-line">
        <Container className="pt-12 pb-14 md:pt-20 md:pb-20 lg:pt-24">
          <Eyebrow>The Key to Secure AI</Eyebrow>
          <h1 id="hero-title" className="mt-5 text-display text-ink">
            <span className="md:block">Your AI is running. </span>
            <span className="text-ink-muted md:block">Do you know what it&apos;s doing?</span>
          </h1>
          <p className="mt-6 max-w-[54ch] text-lead text-ink-soft">
            SaaviAIDR gives security teams visibility, detection and response across every AI agent and chatbot in the
            enterprise.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/saaviaidr/" arrow>
              Explore SaaviAIDR
            </Button>
            <Button href="/contact/" variant="secondary">
              Contact Us
            </Button>
          </div>
          <HeroSignal className="mt-12 h-[30rem] sm:h-[28rem] md:mt-16 md:h-[clamp(26rem,42vw,34rem)]" />
        </Container>
      </section>

      {/* 2.2 What we secure + Works with */}
      <WhatWeSecure headline="One platform for every AI in your enterprise" />

      {/* 2.3 How it works */}
      <Section tone="raised" divided labelledBy="how-title">
        <h2 id="how-title" data-reveal className="max-w-[18ch] text-h2 text-ink">
          From blind spot to control
        </h2>
        <StepFlow steps={STEPS} className="mt-14 lg:mt-20" />
      </Section>

      {/* 2.4 Why SaaviAIDR */}
      <Section divided labelledBy="why-title">
        <h2 id="why-title" data-reveal className="max-w-[18ch] text-h2 text-ink">
          Built for how security teams work
        </h2>
        <WhySaaviAidr />
      </Section>

      {/* 2.5 Platform or managed service */}
      <Section divided labelledBy="paths-title">
        <h2 id="paths-title" data-reveal className="max-w-[18ch] text-h2 text-ink">
          Run it yourself, or let us run it
        </h2>
        <PathCards />
      </Section>

      {/* 2.6 Insights */}
      <Section divided labelledBy="insights-title">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 id="insights-title" data-reveal className="text-h2 text-ink">
            Insights on AI security
          </h2>
          <Button href="/insights/" variant="secondary" arrow className="self-start md:self-auto">
            View all insights
          </Button>
        </div>
        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-12 lg:gap-6">
          {lead ? (
            <div className="lg:col-span-7">
              <ArticleCard article={lead} layout="feature" />
            </div>
          ) : null}
          <div className="grid gap-5 lg:col-span-5 lg:gap-6">
            {rest.map((a, i) => (
              <ArticleCard key={a.slug} article={a} layout="row" index={i + 1} />
            ))}
          </div>
        </div>
      </Section>

      {/* 2.7 Contact band */}
      <ContactBand />
    </>
  );
}
