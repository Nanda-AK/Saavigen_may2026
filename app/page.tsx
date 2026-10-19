import { ShieldCheck, Sparkles, Users } from "lucide-react";
import { FooterCTABand } from "@/components/legacy/sections/FooterCTABand";
import { HeroSection } from "@/components/legacy/sections/HeroSection";
import { DifferentiatorCard } from "@/components/legacy/ui/DifferentiatorCard";
import { SectionLabel } from "@/components/legacy/ui/SectionLabel";
import { ServiceCard } from "@/components/legacy/ui/ServiceCard";
import { pageMetadata } from "@/lib/metadata";
import { basePath, services } from "@/lib/site";

export const metadata = pageMetadata(
  "Securing the AI-Powered Enterprise | SaaviGenAI",
  "SaaviGenAI delivers practitioner-led managed SOC, AI detection and response, and enterprise AI upskilling — so teams can adopt intelligent systems without increasing risk.",
);

export default function HomePage() {
  return (
    <>
      <HeroSection
        label="Managed Security + AI Governance"
        heading="Securing the AI-powered enterprise."
        subheading="SaaviGenAI combines practitioner-led cyber operations with pragmatic AI governance so teams can adopt intelligent systems without increasing risk. Always on. Always watching."
        image={`${basePath}/images/newHome.png`}
      />

      <section className="bg-base py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <SectionLabel
            label="What We Do"
            heading="Three services. One partnership."
            subheading="Focused capabilities for organisations that need security outcomes and AI governance — without the overhead of building it all in-house."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.href} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <SectionLabel
            label="Why SaaviGenAI"
            heading="Built for pragmatic operators."
            subheading="We help teams move quickly while keeping security, governance, and executive clarity in view."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <DifferentiatorCard
              icon={<ShieldCheck className="h-6 w-6" />}
              title="Security-first"
              description="Operational controls and response practices designed around real attacker behaviour and business context — not generic frameworks."
            />
            <DifferentiatorCard
              icon={<Sparkles className="h-6 w-6" />}
              title="AI-aware"
              description="Detection, governance, and training practices that account for the new risks introduced by models, copilots, agents, and automation — because your existing stack wasn't built for this."
            />
            <DifferentiatorCard
              icon={<Users className="h-6 w-6" />}
              title="Practitioner-led"
              description="Every engagement is shaped by hands-on security experience across real enterprise environments — not generic advisory playbooks repackaged as outcomes."
            />
          </div>
        </div>
      </section>

      <section className="bg-base py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <SectionLabel
              label="Approach"
              heading="Clarity first, then execution."
              subheading="We start with the risks, responsibilities, and operating model your business actually needs. From there, we build repeatable security motions that your teams can trust and your executives can explain."
            />
            <div className="rounded-2xl border border-default bg-surface p-6 md:p-8">
              {[
                "Understand your current exposure, operating constraints, and compliance obligations.",
                "Prioritise the highest-value security and AI governance outcomes.",
                "Build manageable workflows for monitoring, response, and enablement.",
                "Keep the operating model lightweight so it evolves with your business.",
              ].map((item, index) => (
                <div
                  key={item}
                  className={`rounded-xl p-4 text-sm leading-relaxed text-secondary ${
                    index % 2 === 0 ? "bg-base" : "bg-surface"
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

      <FooterCTABand />
    </>
  );
}
