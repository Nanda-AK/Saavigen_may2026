import { FooterCTABand } from "@/components/legacy/sections/FooterCTABand";
import { HeroSection } from "@/components/legacy/sections/HeroSection";
import { SectionLabel } from "@/components/legacy/ui/SectionLabel";

type ServiceDetailPageProps = {
  label: string;
  heading: string;
  subheading: string;
  outcomes: string[];
  model: string[];
};

export function ServiceDetailPage({
  label,
  heading,
  subheading,
  outcomes,
  model,
}: ServiceDetailPageProps) {
  return (
    <>
      <HeroSection label={label} heading={heading} subheading={subheading} />

      <section className="bg-base py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <SectionLabel
            label="Outcomes"
            heading="What this helps you achieve."
            subheading="Each engagement is shaped around practical security outcomes that can be explained to technical and executive stakeholders."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {outcomes.map((outcome) => (
              <article
                key={outcome}
                className="rounded-2xl border border-default bg-surface p-6 md:p-8"
              >
                <div className="mb-4 h-0.5 w-8 bg-gold" />
                <p className="text-sm leading-relaxed text-secondary">
                  {outcome}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <SectionLabel
              label="Operating Model"
              heading="Designed to be manageable from day one."
              subheading="We keep scope clear, workflows repeatable, and reporting connected to business priorities."
            />
            <div className="rounded-2xl border border-default bg-base p-6 md:p-8">
              {model.map((item, index) => (
                <div
                  key={item}
                  className={`rounded-xl p-4 text-sm leading-relaxed text-secondary ${index % 2 === 0 ? "bg-surface" : "bg-base"}`}
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

      <section className="bg-base py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <SectionLabel
            label="Next Step"
            heading="Start with a focused conversation."
            subheading="Share your current maturity, constraints, and immediate concerns. We will help define the first practical step."
          />
        </div>
      </section>

      <FooterCTABand />
    </>
  );
}
