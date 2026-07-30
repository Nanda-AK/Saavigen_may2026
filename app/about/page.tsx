import { Eye, Handshake, Shield } from "lucide-react";
import { FooterCTABand } from "@/components/sections/FooterCTABand";
import { HeroSection } from "@/components/sections/HeroSection";
import { DifferentiatorCard } from "@/components/ui/DifferentiatorCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pageMetadata } from "@/lib/metadata";
import { basePath } from "@/lib/site";

export const metadata = pageMetadata(
  "About | SaaviGenAI",
  "SaaviGenAI is practitioner-led managed security and AI governance for organisations adopting intelligent systems.",
  "/about",
);

export default function AboutPage() {
  return (
    <>
      <HeroSection
        label="About Us"
        heading="Practitioner-led security for a changing AI landscape."
        subheading="SaaviGenAI exists to help organisations adopt AI-enabled ways of working without losing control of security, governance, and operational clarity."
      />

      <section className="bg-base py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionLabel
              label="Our Mission"
              heading="Security outcomes without enterprise theater."
              subheading="We focus on practical operating models, usable controls, and clear communication. The aim is to make security and AI governance understandable enough to run, not just impressive enough to present."
            />
            <div className="rounded-2xl border border-default bg-surface p-6 md:p-8">
              <p className="leading-relaxed text-secondary">
                SaaviGenAI supports mid-market and enterprise teams that need a
                steady partner across security operations, AI detection and
                response, and practical workforce enablement. Every engagement
                is grounded in operational reality so the business can move
                forward confidently, without the complexity of building
                everything in-house.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <SectionLabel
            label="The Founder"
            heading="Built by someone who has been in the room."
          />
          <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <blockquote className="rounded-2xl border border-default bg-base p-6 md:p-8">
              <div className="mb-4 h-0.5 w-8 bg-gold" />
              <p className="mb-6 font-display text-xl italic leading-relaxed text-primary">
                &ldquo;Most enterprises deploying AI today are doing so without
                any visibility into what those systems are actually doing at
                runtime. We built SaaviGenAI to change that and to make security
                and AI governance accessible to the organisations that need it
                most.&rdquo;
              </p>
              <p className="font-mono text-xs uppercase tracking-widest text-gold">
                Nanda Kumar — Founder &amp; CEO
              </p>
            </blockquote>
            <div className="rounded-2xl border border-default bg-base p-6 md:p-8">
              <div className="mb-5 flex items-center gap-4">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-gold ring-offset-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${basePath}/images/nanda_founder.jpg`}
                    alt="Nanda Kumar"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="mb-0.5 font-mono text-xs uppercase tracking-widest text-gold">
                    Nanda Kumar
                  </p>
                  <h3 className="font-display text-2xl font-bold text-primary">
                    Founder &amp; CEO, SaaviGenAI
                  </h3>
                  <a
                    href="https://www.linkedin.com/in/nandakumar80"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-teal transition-colors hover:text-teal-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
                  >
                    LinkedIn →
                  </a>
                </div>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-secondary">
                23 years of enterprise experience across Cisco, HPE, and Aruba
                Networks, spanning engineering, security architecture,
                enterprise AI adoption, and LLM security. Nanda has designed and
                operated real systems at scale and brings that depth to every
                SaaviGenAI engagement and programme.
              </p>
              <p className="text-sm leading-relaxed text-secondary">
                Every SaaviGenAI service and course is built from firsthand
                experience of what breaks in practice not from industry
                frameworks recycled into advisory outputs. That practitioner
                perspective is what separates SaaviGenAI from managed service
                providers and training vendors who have never had to operate
                what they recommend.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <SectionLabel
            label="The Team"
            heading="The people behind SaaviGenAI."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="flex items-center gap-4 rounded-2xl border border-default bg-surface p-6">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-gold ring-offset-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${basePath}/images/atikshintern.png`}
                  alt="Atiksh Gupta"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-primary">
                  Atiksh Gupta
                </p>
                <p className="mb-1 text-sm text-secondary">
                  Intern, SaaviGenAI
                </p>
                <a
                  href="https://www.linkedin.com/in/atikshg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-teal transition-colors hover:text-teal-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
                >
                  LinkedIn →
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-default bg-base p-6">
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-gold ring-offset-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${basePath}/images/geetanshintern.png`}
                  alt="Geetansh Aditya"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-primary">Geetansh Aditya</p>
                <p className="mb-1 text-sm text-secondary">
                  Intern, SaaviGenAI
                </p>
                <a
                  href="https://www.linkedin.com/in/geetansh-aditya/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-teal transition-colors hover:text-teal-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
                >
                  LinkedIn →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <SectionLabel
            label="Values"
            heading="Principles that shape every engagement."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <DifferentiatorCard
              icon={<Shield className="h-6 w-6" />}
              title="Trust through discipline"
              description="Security work should be consistent, documented, and explainable under pressure. We don't cut corners and we don't overpromise."
            />
            <DifferentiatorCard
              icon={<Eye className="h-6 w-6" />}
              title="Clarity over noise"
              description="We translate complex signals into focused decisions, priorities, and next steps for technical and executive audiences alike."
            />
            <DifferentiatorCard
              icon={<Handshake className="h-6 w-6" />}
              title="Partner mindset"
              description="We work alongside your team with respect for existing constraints, business goals, and the people responsible for delivering them."
            />
          </div>
        </div>
      </section>

      <section className="bg-base py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <SectionLabel
            label="Who We Help"
            heading="Teams balancing speed, security, and AI adoption."
            subheading="SaaviGenAI is designed for organisations that need the confidence of experienced security operations and the flexibility to evolve their AI governance over time without the overhead of building everything themselves."
          />
        </div>
      </section>

      <FooterCTABand />
    </>
  );
}
