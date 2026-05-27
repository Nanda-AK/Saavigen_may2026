import {
  BarChart3,
  Clock,
  DollarSign,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import { FooterCTABand } from "@/components/sections/FooterCTABand";
import { HeroSection } from "@/components/sections/HeroSection";
import { DifferentiatorCard } from "@/components/ui/DifferentiatorCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pageMetadata } from "@/lib/metadata";
import { basePath } from "@/lib/site";

export const metadata = pageMetadata(
  "SaaviSOC | SaaviGenAI",
  "Enterprise-grade threat monitoring and incident response — without the cost or complexity of building it in-house.",
  "/services/managed-soc",
);

const howItWorks = [
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: "Zero CAPEX deployment",
    description:
      "Fully subscription-based. No upfront infrastructure investment — turning a large capital project into a predictable operating cost your CFO will appreciate.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "24×7 security monitoring",
    description:
      "Your environment is watched around the clock — weekends, holidays, and the 3am window when attackers prefer to move. Our analysts and AI detection layer work continuously so your team doesn't have to.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Threat detection and incident visibility",
    description:
      "SaaviSOC correlates signals across your environment to surface real threats, not just noise. You get clear incident visibility with context — not a flood of raw alerts your team has to manually triage.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Faster onboarding and deployment",
    description:
      "Most clients are fully onboarded within weeks, not months. Our structured onboarding process is designed to get you protected quickly, with minimal disruption to your operations.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Reduced dependency on large internal teams",
    description:
      "You don't need a 10-person SOC team to have enterprise-grade security coverage. SaaviSOC acts as an extension of your existing team — or your entire security function if needed.",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Predictable, lower fixed OPEX",
    description:
      "Flat-rate pricing means no surprise costs, no per-alert billing, no vendor lock-in traps. You know exactly what you're spending every month.",
  },
];

const compliance = [
  { code: "PCI-DSS", name: "Payment Card Industry Data Security Standard" },
  {
    code: "HIPAA",
    name: "Health Insurance Portability and Accountability Act",
  },
  { code: "GDPR", name: "General Data Protection Regulation" },
  { code: "NIST", name: "NIST Cybersecurity Framework" },
  {
    code: "CIS Controls",
    name: "Centre for Internet Security Critical Security Controls",
  },
  {
    code: "ISO 27001",
    name: "International Information Security Management Standard",
  },
];

const audiences = [
  "Enterprises looking to strengthen security posture without building an in-house SOC.",
  "SMBs that need enterprise-grade protection at a size-appropriate cost.",
  "Regulated industries — healthcare, fintech, e-commerce — with active compliance requirements.",
  "Fast-growing companies whose security needs have outpaced their internal capabilities.",
  "CISOs and IT leaders who need to demonstrate security maturity to boards, auditors, and customers.",
];

export default function ManagedSocPage() {
  return (
    <>
      <HeroSection
        label="SaaviSOC"
        heading="Your Security. Always On. Always Watching."
        subheading="Enterprise-grade threat monitoring and incident response — without the cost or complexity of building it in-house."
        image={`${basePath}/images/newSaaviSOC.png`}
      />

      <section className="bg-base py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <SectionLabel
            label="How It Works"
            heading="Security that works from day one."
            subheading="Built on modern open security platforms with an AI-powered detection layer — 24×7 visibility, rapid incident response, and continuous compliance monitoring. No capital expenditure. No hiring surge. No months of setup. Just security that works."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {howItWorks.map((item) => (
              <DifferentiatorCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <SectionLabel
            label="Compliance-Ready by Design"
            heading="Built for regulated environments."
            subheading="SaaviSOC monitoring and reporting capabilities are aligned with major frameworks from the ground up. Whether you're preparing for an audit, managing a regulated workload, or building a compliance programme from scratch, SaaviSOC gives you the monitoring, logging, and reporting foundation you need."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {compliance.map((item) => (
              <div
                key={item.code}
                className="rounded-2xl border border-default bg-base p-6"
              >
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-gold">
                  {item.code}
                </p>
                <p className="text-sm leading-relaxed text-secondary">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-base py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <SectionLabel
              label="Who It's For"
              heading="Designed for teams that need real security coverage."
            />
            <div className="rounded-2xl border border-default bg-surface p-6 md:p-8">
              {audiences.map((item, index) => (
                <div
                  key={item}
                  className={`rounded-xl p-4 text-sm leading-relaxed text-secondary ${
                    index % 2 === 0 ? "bg-surface" : "bg-base"
                  }`}
                >
                  <span className="mr-3 font-mono text-xs text-gold">
                    0{index + 1}
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <SectionLabel
            label="The SaaviSOC Difference"
            heading="Proactive visibility over reactive alerts."
            subheading="Most managed SOC providers hand you a dashboard and a phone number. SaaviSOC is built on a philosophy of proactive visibility — combining modern open-source security platforms, an AI detection layer, and experienced human analysts who know enterprise environments. The result: faster detection, fewer false positives, and security outcomes you can actually measure."
          />
          <blockquote className="mt-8 rounded-2xl border border-default bg-base p-6 md:p-10">
            <div className="mb-4 h-0.5 w-8 bg-gold" />
            <p className="font-display text-xl italic leading-relaxed text-primary">
              &ldquo;We don&apos;t just monitor your environment. We understand
              it, contextualise it, and help you act on it — without drowning
              you in alerts.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      <FooterCTABand />
    </>
  );
}
