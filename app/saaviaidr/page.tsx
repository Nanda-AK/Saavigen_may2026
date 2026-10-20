import {
  ArrowRight,
  Bell,
  Cloud,
  EyeOff,
  FileCheck,
  History,
  KeyRound,
  Link2,
  OctagonX,
  ScanSearch,
  Server,
  Smartphone,
  TrendingUp,
  TriangleAlert,
  Unplug,
  UserRound,
  Users,
  Eye,
} from "lucide-react";
import { ArchitectureDiagram } from "@/components/platform/ArchitectureDiagram";
import { WhatWeSecure } from "@/components/sections/WhatWeSecure";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Button } from "@/components/ui/Button";
import { ChapterSection } from "@/components/ui/ChapterSection";
import { ComposedIcon } from "@/components/ui/ComposedIcon";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Tile } from "@/components/ui/Tile";
import { pageMetadata } from "@/lib/metadata";

// All copy on this page comes from SaaviGenAI_Website_Content_Plan.md section 3.
export const metadata = pageMetadata(
  "SaaviAIDR Platform | AI Detection and Response | SaaviGenAI",
  "Discover, monitor and protect the AI agents and chatbots in your organisation. SaaviAIDR runs in your environment and fits your existing SOC.",
  "/saaviaidr/",
);

const DEMO = "/contact/?interest=platform-demo";

// 3.3 Capabilities. `media` = which screenshot the pinned panel shows (see SCREENS).
const CAPABILITIES = [
  {
    title: "Auto-discovered AI inventory",
    body: "See which agents, models, MCP servers and users are active, and label each as approved or under review.",
    icon: <Icon icon={ScanSearch} size={28} />,
    media: 0,
  },
  {
    title: "Complete activity visibility",
    body: "Prompts, responses, tool calls, files, model usage and cost, captured for every session.",
    icon: <Icon icon={Eye} size={28} />,
    media: 2,
  },
  {
    title: "Real-time threat detection",
    body: "Built-in rules for prompt injection, jailbreaks, data leakage, secret-file access and destructive commands.",
    icon: <Icon icon={TriangleAlert} size={28} />,
    media: 1,
  },
  {
    title: "Behaviour analytics",
    body: "Baselines for each user and agent flag unusual tools, token spikes and changes in behaviour.",
    icon: <Icon icon={TrendingUp} size={28} />,
    media: 2,
  },
  {
    title: "AI-assisted alert analysis",
    body: "Each alert is reviewed with its session context and given a verdict, confidence level and likely intent.",
    icon: <Icon icon={FileCheck} size={28} />,
    media: 1,
  },
  {
    title: "Automated response",
    body: "Playbooks can end sessions, revoke keys or quarantine agents, and can be tested safely before they are enforced.",
    icon: <Icon icon={OctagonX} size={28} />,
    media: 1,
  },
];

// Plan 3.3 [IMAGE]: cropped product screenshots, sample data only (to be supplied).
const SCREENS = [
  <BrowserFrame key="inv" label="The AI inventory view (sample data only)" />,
  <BrowserFrame key="alert" label="An alert with its AI-assisted analysis (sample data only)" />,
  <BrowserFrame key="session" label="The session or event view (sample data only)" />,
];

const HOW = [
  { title: "Collect", body: "Your AI agents and applications send activity data to SaaviAIDR." },
  { title: "Unify", body: "All activity is converted into one consistent format." },
  { title: "Detect", body: "Rules and behaviour analytics check every event in real time." },
  { title: "Respond", body: "Alerts are analysed and response playbooks take action." },
];

const TEAMS = [
  { title: "CISOs and security leaders", body: "A clear picture of AI risk across the organisation.", icon: <Icon icon={Users} size={26} /> },
  { title: "SOC teams", body: "Alerts, investigations and response in one place.", icon: <Icon icon={Bell} size={26} /> },
  {
    title: "AI and platform teams",
    body: "Visibility into which agents, models and tools are in use, and what they cost.",
    icon: <Icon icon={Server} size={26} />,
  },
];

const DEPLOY = [
  {
    title: "Your cloud or on-premises",
    body: "Self-hosted and single-tenant. Your AI activity data stays inside your environment.",
    icon: <ComposedIcon base={Cloud} badge={Server} />,
  },
  {
    title: "Air-gapped option",
    body: "Alert analysis can run on a local model, so no data leaves your environment.",
    icon: <Icon icon={Unplug} size={30} />,
  },
  { title: "Connects to your SOC", body: "Findings export to your existing SIEM and SOAR tools.", icon: <Icon icon={Link2} size={30} /> },
];

const SECURITY = [
  {
    title: "Role-based access",
    body: "Separate roles for administrators, SOC managers and analysts, with prompt content masked for analysts.",
    icon: <ComposedIcon base={UserRound} badge={KeyRound} size={26} />, // a user with a key
  },
  { title: "Mandatory multi-factor authentication", body: "Required on every sign-in.", icon: <Icon icon={Smartphone} size={26} /> },
  { title: "Audit trail", body: "Every configuration change is recorded.", icon: <Icon icon={History} size={26} /> },
  { title: "Data redaction", body: "Secrets and personal data are redacted.", icon: <Icon icon={EyeOff} size={26} /> },
];

export default function PlatformPage() {
  return (
    <>
      {/* 3.1 Hero */}
      <PageHero
        video="page-platform"
        eyebrow="SaaviAIDR"
        title="Detection and response for the AI in your enterprise"
        sub="See what your AI agents and chatbots are doing, catch risky activity as it happens, and respond before it becomes an incident."
      >
        <Button href={DEMO} variant="light" size="lg">
          Request a demo
        </Button>
        <Button href="/managed-services/" variant="link-light" size="lg">
          See managed services
        </Button>
      </PageHero>

      {/* 3.1 [IMAGE] main product screenshot: lifts into place as it scrolls in */}
      <section aria-label="Product screenshot" className="bg-canvas pt-20 md:pt-28">
        <Container>
          <BrowserFrame className="lift-in motion-ok mx-auto max-w-6xl" label="The SaaviAIDR dashboard in a clean browser frame (sample data only)" />
        </Container>
      </section>

      {/* 3.2 Coverage (same tiles and logo carousel as Home) */}
      <WhatWeSecure id="coverage" headline="Coverage across your AI landscape" />

      {/* 3.3 Capabilities: sticky chapters */}
      <Section tone="sunken" labelledBy="capabilities-title">
        <ChapterSection
          heading={
            <h2 id="capabilities-title" className="text-h2 text-ink">
              What SaaviAIDR does
            </h2>
          }
          chapters={CAPABILITIES}
          media={SCREENS}
        />
      </Section>

      {/* 3.4 How it works: live architecture diagram + the four steps */}
      <Section labelledBy="how-title">
        <SectionHeader id="how-title" title="How SaaviAIDR works" />
        <div data-reveal className="mt-14 lg:mt-20">
          <ArchitectureDiagram />
        </div>
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {HOW.map((s, i) => (
            <li key={s.title} data-reveal style={{ "--reveal-index": i } as React.CSSProperties} className="border-t border-ink pt-6">
              <p className="font-mono text-label text-ink-muted">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-[1.5rem] font-semibold tracking-[-0.03em] text-ink">{s.title}</h3>
              <p className="mt-2 text-ink-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 3.5 Built for every team: large hover rows */}
      <Section tone="sunken" labelledBy="teams-title">
        <SectionHeader id="teams-title" title="One platform, the right view for each team" />
        <ul className="mx-auto mt-14 max-w-5xl lg:mt-20">
          {TEAMS.map((t, i) => (
            <li
              key={t.title}
              data-reveal
              style={{ "--reveal-index": i } as React.CSSProperties}
              className="group grid items-center gap-4 border-t border-line py-9 last:border-b md:grid-cols-[auto_1fr_1.1fr_auto] md:gap-10 md:py-11"
            >
              <span className="text-ink-muted transition-colors duration-300 group-hover:text-ink">{t.icon}</span>
              <h3 className="text-[1.75rem] font-semibold leading-tight tracking-[-0.035em] text-ink transition-transform duration-500 ease-out group-hover:translate-x-2 md:text-[2.25rem]">
                {t.title}
              </h3>
              <p className="text-lead text-ink-muted">{t.body}</p>
              <span aria-hidden="true" className="hidden text-ink opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-x-1 group-hover:opacity-100 md:block">
                <Icon icon={ArrowRight} size={24} />
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3.6 Deployment */}
      <Section labelledBy="deploy-title">
        <SectionHeader id="deploy-title" title="Runs in your environment" />
        <div className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-20 lg:gap-5">
          {DEPLOY.map((d, i) => (
            <Tile key={d.title} index={i} icon={d.icon} title={d.title} body={d.body} />
          ))}
        </div>
      </Section>

      {/* 3.7 Platform security: four items in a single row */}
      <Section tone="sunken" labelledBy="security-title">
        <SectionHeader id="security-title" title="Secure by design" />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-[1.25rem] bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {SECURITY.map((s, i) => (
            <li key={s.title} data-reveal style={{ "--reveal-index": i } as React.CSSProperties} className="group bg-raised p-7 transition-colors duration-300 hover:bg-canvas md:p-8">
              <span className="inline-flex bg-inherit text-ink transition-transform duration-500 group-hover:-translate-y-0.5">{s.icon}</span>
              <h3 className="mt-10 text-[1.25rem] font-semibold leading-snug tracking-[-0.02em] text-ink">{s.title}</h3>
              <p className="mt-2 text-ink-muted">{s.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3.8 Closing call to action */}
      <CtaBand id="platform-cta" title="See SaaviAIDR on your own AI activity" line="We'll walk you through the platform and how it fits your environment.">
        <Button href={DEMO} size="lg">
          Request a demo
        </Button>
        <Button href="/managed-services/" variant="link" size="lg">
          Prefer us to run it? See managed services
        </Button>
      </CtaBand>
    </>
  );
}
