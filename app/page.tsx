import { Activity, ScanSearch, ShieldCheck, TriangleAlert } from "lucide-react";
import { HeroVideo } from "@/components/home/HeroVideo";
import { PathCards } from "@/components/home/PathCards";
import { WhySaaviAidr } from "@/components/home/WhySaaviAidr";
import { ContactBand } from "@/components/sections/ContactBand";
import { WhatWeSecure } from "@/components/sections/WhatWeSecure";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ScrollPipeline } from "@/components/ui/ScrollPipeline";
import { Section, SectionHeader } from "@/components/ui/Section";
import { getFeaturedArticles } from "@/lib/insights";
import { pageMetadata } from "@/lib/metadata";

// All copy on this page comes from SaaviGenAI_Website_Content_Plan.md section 2.
// Sections alternate white / light grey (Apple-style) after the full-screen video hero.
export const metadata = pageMetadata(
  "SaaviAIDR | AI Detection and Response | SaaviGenAI",
  "SaaviAIDR gives security teams visibility, detection and response across the AI agents and chatbots in their organisation. Self-hosted, with managed service options.",
  "/",
);

const STEPS = [
  { title: "Discover", body: "Find every AI agent, model and user in use.", icon: <Icon icon={ScanSearch} size={24} /> },
  { title: "Monitor", body: "See prompts, responses and tool calls in one place.", icon: <Icon icon={Activity} size={24} /> },
  {
    title: "Detect",
    body: "Catch prompt injection, jailbreaks and data leakage as they happen.",
    icon: <Icon icon={TriangleAlert} size={24} />,
    tone: "alert" as const, // amber: the alert moment
  },
  { title: "Respond", body: "Stop risky sessions automatically, or hand off to your SOC.", icon: <Icon icon={ShieldCheck} size={24} /> },
];

export default function HomePage() {
  const [lead, ...rest] = getFeaturedArticles();

  return (
    <>
      {/* 2.1 Hero: rotating videos and titles */}
      <HeroVideo />

      {/* 2.2 What we secure + Works with (white) */}
      <WhatWeSecure headline="One platform for every AI in your enterprise" />

      {/* 2.3 How it works (grey): pinned while you scroll; the line fills and steps light up */}
      <ScrollPipeline id="how-title" title="From blind spot to control" steps={STEPS} />

      {/* 2.4 Why SaaviAIDR (white) */}
      <Section labelledBy="why-title">
        <SectionHeader id="why-title" title="Built for how security teams work" />
        <WhySaaviAidr />
      </Section>

      {/* 2.5 Platform or managed service (grey) */}
      <Section tone="sunken" labelledBy="paths-title">
        <SectionHeader id="paths-title" title="Run it yourself, or let us run it" />
        <PathCards />
      </Section>

      {/* 2.6 Insights (white) */}
      <Section labelledBy="insights-title">
        <SectionHeader id="insights-title" title="Insights on AI security" />
        <div className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-12">
          {lead ? (
            <div className="lg:col-span-7">
              <ArticleCard article={lead} layout="feature" />
            </div>
          ) : null}
          <div className="grid gap-5 lg:col-span-5">
            {rest.map((a, i) => (
              <ArticleCard key={a.slug} article={a} layout="row" index={i + 1} />
            ))}
          </div>
        </div>
        <div className="mt-12 flex justify-center">
          <Button href="/insights/" variant="secondary" arrow>
            View all insights
          </Button>
        </div>
      </Section>

      {/* 2.7 Contact band (grey) */}
      <ContactBand />
    </>
  );
}
