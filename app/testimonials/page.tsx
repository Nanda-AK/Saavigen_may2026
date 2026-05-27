import { FooterCTABand } from "@/components/sections/FooterCTABand";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Testimonials | SaaviGenAI",
  "What SaaviGenAI clients value most — across managed SOC, AI detection and response, and enterprise AI upskilling.",
  "/testimonials",
);

const valueCards = [
  {
    service: "SaaviSOC",
    heading: "Onboarded in weeks, not months",
    body: "Most organisations expect SOC deployment to take quarters. SaaviSOC's structured onboarding gets you from zero to active 24×7 security coverage in weeks — zero CAPEX, no hiring surge, no months of setup.",
  },
  {
    service: "SaaviAIDR",
    heading: "Visibility into a threat surface",
    body: "AI has introduced an entirely new attack surface — prompts, agents, tool calls, model behaviour — that your firewall, SIEM, and DLP were never built to see. SaaviAIDR gives you eyes on that surface for the first time.",
  },
  {
    service: "AI Upskilling",
    heading: "Capability built on understanding",
    body: "Before reaching for AI tools, participants first understand how LLMs actually work — their strengths, their failure modes, their limits. That foundation is what makes the learning stick and the workflows last.",
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <HeroSection
        label="Testimonials"
        heading="What our clients say."
        subheading="Hear from the security, engineering, and risk leaders who partnered with SaaviGenAI to secure their AI-powered enterprises."
      />

      <section className="bg-base py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <SectionLabel
            label="What They Value Most"
            heading="Patterns across every engagement."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {valueCards.map((item) => (
              <article
                key={item.heading}
                className="rounded-2xl border border-default bg-surface p-6 md:p-8"
              >
                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-gold">
                  {item.service}
                </p>
                <div className="mb-4 h-0.5 w-8 bg-gold" />
                <h3 className="mb-3 font-display text-xl font-bold text-primary">
                  {item.heading}
                </h3>
                <p className="text-[15px] leading-relaxed text-secondary">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FooterCTABand />
    </>
  );
}
