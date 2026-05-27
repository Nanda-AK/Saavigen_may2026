import dynamic from "next/dynamic";
import { FooterCTABand } from "@/components/sections/FooterCTABand";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pageMetadata } from "@/lib/metadata";

const WaitlistForm = dynamic(
  () => import("@/components/sections/WaitlistForm").then((m) => m.WaitlistForm),
);

export const metadata = pageMetadata(
  "Insights | SaaviGenAI",
  "Security and AI governance insights from SaaviGenAI. Articles are coming soon; contact us to be notified.",
  "/insights",
);

export default function InsightsPage() {
  return (
    <>
      <HeroSection
        label="Insights"
        heading="Practical thinking on security and AI governance."
        subheading="We are preparing field notes, guidance, and perspectives for teams securing AI-enabled organizations."
      />

      <section className="bg-base py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <SectionLabel
              label="Coming Soon"
              heading="Insights are being prepared."
              subheading="Practical guidance on security operations, AI governance, and safe adoption is being prepared for publication."
            />
            <div className="rounded-2xl border border-default bg-surface p-6 md:p-8">
              <h2 className="font-display text-2xl font-bold text-primary">
                Want to be notified?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-secondary">
                Share your email to register interest in upcoming SaaviGenAI
                insights.
              </p>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <SectionLabel
            label="Future Topics"
            heading="What we plan to cover."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              "Managed security operations for lean teams",
              "AI detection and response patterns",
              "Practical AI governance and workforce enablement",
            ].map((topic) => (
              <article
                key={topic}
                className="rounded-2xl border border-default bg-base p-6 md:p-8"
              >
                <div className="mb-4 h-0.5 w-8 bg-gold" />
                <h3 className="font-display text-xl font-bold text-primary">
                  {topic}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FooterCTABand />
    </>
  );
}
