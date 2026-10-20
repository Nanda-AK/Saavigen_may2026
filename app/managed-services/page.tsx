import {
  BarChart3,
  Briefcase,
  Compass,
  Handshake,
  Mail,
  RefreshCcw,
  Rocket,
  ScanSearch,
  ShieldCheck,
  Siren,
  SlidersHorizontal,
  Target,
  UserCheck,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { FillText } from "@/components/ui/FillText";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Placeholder } from "@/components/ui/Placeholder";
import { ResponsiveTable } from "@/components/ui/ResponsiveTable";
import { ScrollPipeline } from "@/components/ui/ScrollPipeline";
import { Section, SectionHeader } from "@/components/ui/Section";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

// All copy on this page comes from SaaviGenAI_Website_Content_Plan.md section 4.
// Plan note: the service scope on this page is intentionally general and will be refined later.
export const metadata = pageMetadata(
  "Managed AI Security Services | SaaviGenAI",
  "SaaviGenAI deploys, tunes and operates SaaviAIDR in your environment, so your organisation gets AI detection and response without building a new team.",
  "/managed-services/",
);

const TALK = "/contact/?interest=managed-services";

const WHY = [
  { title: "Specialist skills", body: "Our team brings AI security experience your team may not have yet.", icon: <Icon icon={UserCheck} size={28} /> },
  { title: "Tuned to your environment", body: "Detections are adjusted to how your organisation actually uses AI.", icon: <Icon icon={SlidersHorizontal} size={28} /> },
  { title: "Your team stays focused", body: "We handle the day-to-day work so your team can focus on priorities.", icon: <Icon icon={Target} size={28} /> },
];

const INCLUDED = [
  { title: "Deployment and onboarding", body: "We install SaaviAIDR in your environment and connect your AI agents and chatbots.", icon: Rocket },
  { title: "Monitoring and triage", body: "We review alerts and separate real threats from noise.", icon: ScanSearch },
  { title: "Detection tuning", body: "We adjust rules to your environment and test changes safely before enforcement.", icon: Wrench },
  { title: "Investigation and response support", body: "We investigate incidents and act within playbooks agreed with you.", icon: Siren },
  { title: "Reporting and reviews", body: "Regular reports on AI usage, risk and activity, with review meetings.", icon: BarChart3 },
];

const STEPS = [
  { title: "Assess", body: "We understand the AI in use across your organisation and your priorities.", icon: <Icon icon={Compass} size={24} /> },
  { title: "Deploy", body: "We install SaaviAIDR and onboard your agents and chatbots.", icon: <Icon icon={Rocket} size={24} /> },
  { title: "Tune", body: "We test detections against your real activity before enforcing them.", icon: <Icon icon={SlidersHorizontal} size={24} /> },
  { title: "Operate", body: "We monitor, triage and respond in line with agreed playbooks.", icon: <Icon icon={ShieldCheck} size={24} /> },
  { title: "Review", body: "We report regularly and refine coverage as your AI use grows.", icon: <Icon icon={RefreshCcw} size={24} /> },
];

const ROLES = [
  ["Platform deployment and updates", "Leads", "Provides environment access"],
  ["Agent and chatbot onboarding", "Leads", "Supports rollout to users"],
  ["Alert monitoring and triage", "Leads", "Receives escalations"],
  ["Response actions", "Acts within agreed playbooks", "Approves playbooks and major actions"],
  ["Reporting and reviews", "Prepares and presents", "Reviews and sets priorities"],
];

const OPTIONS = [
  { title: "Co-managed", body: "Your SOC leads response. We handle deployment, tuning, triage support and reviews.", icon: Handshake, inverse: false },
  { title: "Fully managed", body: "We operate SaaviAIDR end to end, within playbooks agreed with you.", icon: Briefcase, inverse: true },
];

export default function ManagedServicesPage() {
  return (
    <>
      {/* 4.1 Hero */}
      <PageHero
        video="page-managed"
        eyebrow="Managed AI Security"
        title="SaaviAIDR, operated by our specialists"
        sub="We deploy, tune and run SaaviAIDR in your environment, so you get AI detection and response without building a new team."
      >
        <Button href={TALK} variant="light" size="lg">
          Talk to us about managed services
        </Button>
        <Button href="/saaviaidr/" variant="link-light" size="lg">
          Explore the platform
        </Button>
      </PageHero>

      {/* 4.2 Why a managed service: headline fills in on scroll, then three points */}
      <Section labelledBy="why-managed-title">
        <FillText as="h2" id="why-managed-title" text="AI security, without the extra headcount" className="max-w-[20ch] text-[clamp(2.25rem,1.4rem+3.6vw,4.5rem)] leading-[1.04] tracking-[-0.045em]" />
        <ul className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-24">
          {WHY.map((w, i) => (
            <li key={w.title} data-reveal style={{ "--reveal-index": i } as React.CSSProperties} className="border-t border-ink pt-7">
              <span className="text-ink">{w.icon}</span>
              <h3 className="mt-8 text-[1.5rem] font-semibold tracking-[-0.03em] text-ink">{w.title}</h3>
              <p className="mt-2 text-ink-muted">{w.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 4.3 What we do: bento (two large, three small) */}
      <Section tone="sunken" labelledBy="included-title">
        {/* Service list confirmed by SaaviGenAI (Oct 2026). */}
        <SectionHeader id="included-title" title="What's included" />
        <ul className="mt-14 grid gap-4 md:grid-cols-6 lg:mt-20 lg:gap-5">
          {INCLUDED.map((s, i) => (
            <li
              key={s.title}
              data-reveal
              style={{ "--reveal-index": i } as React.CSSProperties}
              className={cn(
                "group flex flex-col rounded-box bg-raised p-7 transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgb(0_0_0/0.25)] md:p-9",
                i < 2 ? "md:col-span-3 md:min-h-[18rem]" : "md:col-span-2",
              )}
            >
              <span className="text-ink transition-transform duration-500 group-hover:-translate-y-0.5">
                <Icon icon={s.icon} size={i < 2 ? 36 : 28} />
              </span>
              <h3 className={cn("mt-auto pt-12 font-semibold tracking-[-0.03em] text-ink", i < 2 ? "text-[1.75rem] md:text-[2rem]" : "text-[1.375rem]")}>{s.title}</h3>
              <p className="mt-2.5 max-w-[40ch] text-ink-muted">{s.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 4.4 How an engagement works: scroll-driven five-step pipeline */}
      <ScrollPipeline id="engagement-title" title="How we work together" steps={STEPS} tone="canvas" />

      {/* 4.5 Shared responsibilities */}
      <Section tone="sunken" labelledBy="roles-title">
        <SectionHeader id="roles-title" title="Clear roles from day one" />
        <p className="mt-6 text-center">
          <Placeholder kind="TO CONFIRM" note="Each row below is a suggestion to be refined." />
        </p>
        <div data-reveal className="mx-auto mt-14 max-w-5xl lg:mt-20">
          <ResponsiveTable caption="Shared responsibilities between SaaviGenAI and your team" columns={["Activity", "SaaviGenAI", "Your team"]} rows={ROLES} />
        </div>
      </Section>

      {/* 4.6 Engagement options */}
      <Section labelledBy="options-title">
        <SectionHeader id="options-title" title="Choose the level of support you need" />
        <p className="mt-6 text-center">
          <Placeholder kind="TO CONFIRM" note="Names and scope of each option." />
        </p>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-20">
          {OPTIONS.map((o, i) => (
            <article
              key={o.title}
              data-reveal
              style={{ "--reveal-index": i } as React.CSSProperties}
              className={cn(
                "group flex min-h-[22rem] flex-col rounded-[1.5rem] p-9 transition-transform duration-500 ease-out hover:-translate-y-1 md:p-12",
                o.inverse ? "bg-inverse text-on-inverse" : "bg-sunken text-ink",
              )}
            >
              <span className={cn("inline-flex size-14 items-center justify-center rounded-full", o.inverse ? "bg-on-inverse/10" : "bg-raised")}>
                <Icon icon={o.icon} size={26} />
              </span>
              <h3 className="mt-auto pt-14 text-[2.25rem] font-semibold tracking-[-0.04em] md:text-[2.75rem]">{o.title}</h3>
              <p className={cn("mt-3 max-w-[38ch] text-lead", o.inverse ? "text-on-inverse/70" : "text-ink-muted")}>{o.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* 4.7 Closing call to action (WhatsApp is the floating button on every page) */}
      <CtaBand id="managed-cta" title="Let's discuss what you need" line="Tell us about the AI in your organisation and we'll suggest the right level of support.">
        <Button href={`mailto:${site.email}`} size="lg" wrap>
          <Icon icon={Mail} size={18} />
          Email us: {site.email}
        </Button>
      </CtaBand>
    </>
  );
}
