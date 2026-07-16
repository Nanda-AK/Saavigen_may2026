import { Bot, ExternalLink, Linkedin, ShieldCheck } from "lucide-react";
import { FooterCTABand } from "@/components/sections/FooterCTABand";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pageMetadata } from "@/lib/metadata";
import { basePath } from "@/lib/site";

export const metadata = pageMetadata(
  "SaaviGenAI Sponsors Anthropic CCCL AI Security Event in Bengaluru | SaaviGenAI",
  "70+ security professionals, engineers, and AI enthusiasts gathered in Bengaluru for the Anthropic CCCL AI Security event, sponsored by SaaviGenAI.",
  "/articles/cccl-ai-security-event",
);

const speakers = [
  {
    name: "Dr. Chinmay",
    href: "https://www.linkedin.com/in/chinmayth",
    contribution:
      "Delivered a deep technical session on AI security concepts and emerging threat models.",
  },
  {
    name: "Lakshmi Narasimhan",
    href: "https://www.linkedin.com/in/lakshnarasimhan/",
    contribution:
      "Shared insights on AI security, contributing to the technical depth of the evening.",
  },
  {
    name: "Aranya Bandhu",
    href: "https://www.linkedin.com/in/aranyabandhu/",
    contribution:
      "Brought real-world context to the discussion, grounding the evening's themes in practical application.",
  },
  {
    name: "Geetansh Aditya",
    href: "https://www.linkedin.com/in/geetansh-aditya/",
    contribution:
      "Contributed further perspective on applying AI security concepts in practice.",
  },
  {
    name: "Rohit Madhavan",
    href: "https://www.linkedin.com/in/rohitmadhavan/",
    contribution:
      "Added practitioner perspective on securing AI-powered applications in production environments.",
  },
  {
    name: "Nanda, Founder of SaaviGenAI",
    href: "https://www.linkedin.com/in/nandakumar80/",
    contribution:
      "Presented on Anthropic's Constitutional AI (CAI), exploring how alignment principles are shaping the next generation of safe AI systems.",
  },
];

export default function CcclAiSecurityEventArticle() {
  return (
    <>
      <HeroSection
        label="SaaviGenAI Community"
        heading="SaaviGenAI Sponsors Anthropic CCCL AI Security Event in Bengaluru"
        subheading="On a Sunday evening when most people were winding down their weekend, over 70 security professionals, engineers, and AI enthusiasts chose instead to spend their time learning."
        image={`${basePath}/images/ThumbnailArticle3.jpeg`}
      />

      <section className="bg-base py-8">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="flex flex-wrap items-center gap-2 border-b border-default pb-8">
            <span className="rounded-full border border-default bg-surface px-2.5 py-0.5 font-mono text-xs text-gold">
              SaaviGenAI Blog
            </span>
            <span className="font-mono text-xs text-muted">
              Bengaluru &middot; July 12, 2026
            </span>
            <div className="ml-auto flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/saavigenai/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SaaviGenAI on LinkedIn"
                className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-[#0A66C2] text-white transition-opacity duration-150 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
              >
                <Linkedin className="h-3.5 w-3.5" fill="currentColor" stroke="none" />
              </a>
              <a
                href="https://cccl-ai.github.io/meetups-live/blr6/agenda.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-teal transition-colors duration-150 hover:text-teal-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
              >
                View Event Agenda
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base py-4 md:py-8">
        <div className="mx-auto max-w-4xl px-6 md:px-8 lg:px-12">
          <p className="text-[15px] leading-relaxed text-secondary">
            SaaviGenAI was proud to sponsor the Anthropic CCCL (Claude
            Community) AI Security event in Bengaluru — an evening that
            reaffirmed just how strong the appetite for AI Security knowledge
            has become in India&apos;s tech community.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-secondary">
            The event was organized in support of <strong className="text-primary">Vikram</strong>,
            Ambassador for CCCL, with the support of Anthropic — continuing
            CCCL&apos;s mission of building a grounded, technically rigorous
            AI community in India.
          </p>
        </div>
      </section>

      <section className="bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <SectionLabel
                label="Speaker Lineup"
                heading="Technical depth meets real-world application."
                subheading="The evening featured a strong lineup of speakers covering both the technical depth and real-world application of AI Security."
              />
              <div className="mt-8 overflow-hidden rounded-2xl border border-default">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${basePath}/images/blog3collage.jpg`}
                  alt="Collage of speakers presenting at the Anthropic CCCL AI Security event"
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover"
                />
              </div>
            </div>
            <div className="rounded-2xl border border-default bg-base p-6 md:p-8">
              {speakers.map((speaker, index) => (
                <div
                  key={speaker.name}
                  className={`rounded-xl p-4 ${index % 2 === 0 ? "bg-surface" : "bg-base"}`}
                >
                  <p className="mb-1 font-mono text-xs uppercase tracking-widest text-gold">
                    {speaker.href ? (
                      <a
                        href={speaker.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-gold/40 underline-offset-2 hover:text-teal"
                      >
                        {speaker.name}
                      </a>
                    ) : (
                      speaker.name
                    )}
                  </p>
                  <p className="text-sm leading-relaxed text-secondary">
                    {speaker.contribution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <SectionLabel
            label="Turnout"
            heading="A community that shows up."
            subheading="What stood out most was not just the turnout, but who showed up."
          />
          <div className="mt-10 max-w-4xl space-y-4 text-[15px] leading-relaxed text-secondary">
            <p>
              Attendees traveled significant distances to be part of the
              session — including <strong className="text-primary">Manu Francis</strong>,
              who came all the way from Kerala solely to attend this event.
              It was also an evening of reconnection, with several long-time
              industry professionals — including former Cisco colleagues
              reuniting after nearly a decade — using the event as a chance
              to rebuild old networks around a shared, current interest: AI
              Security.
            </p>
            <p>
              The event was further supported by{" "}
              <strong className="text-primary">Ravi Kandaswamy</strong>,
              Founder of Quana, a recurring collaborator and supporter of
              SaaviGenAI&apos;s community initiatives.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-6 md:px-8 lg:px-12">
          <div className="overflow-hidden rounded-2xl border border-default">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${basePath}/images/blog3speakers.jpg`}
              alt="Speakers, organizers, and attendees at the Anthropic CCCL AI Security event in Bengaluru"
              loading="lazy"
              decoding="async"
              className="w-full object-cover"
            />
          </div>
          <p className="mt-4 text-center text-sm italic text-muted">
            Speakers, organizers, and attendees at the CCCL AI Security event
            in Bengaluru.
          </p>
        </div>
      </section>

      <section className="bg-base py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-6 md:px-8 lg:px-12">
          <div className="overflow-hidden rounded-2xl border border-default">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${basePath}/images/blog3founder.jpg`}
              alt="Nanda, Founder of SaaviGenAI, presenting on Anthropic's Constitutional AI (CAI)"
              loading="lazy"
              decoding="async"
              className="w-full object-cover"
            />
          </div>
          <p className="mt-4 text-center text-sm italic text-muted">
            Nanda, Founder of SaaviGenAI, presenting on Anthropic&apos;s
            Constitutional AI (CAI).
          </p>
        </div>
      </section>

      <section className="bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <SectionLabel
            label="Why This Matters"
            heading="Community is core to our mission."
          />
          <div className="mt-10 max-w-4xl space-y-4 text-[15px] leading-relaxed text-secondary">
            <p>
              At SaaviGenAI, we believe the shift toward agentic AI is
              expanding the security threat surface faster than most
              organizations are prepared for. Events like this one are core
              to our mission — not just building SaaviSOC as a product, but
              actively contributing to a community that takes AI Security as
              seriously as AI adoption itself.
            </p>
            <p>
              We&apos;re committed to continuing to support and participate
              in initiatives like CCCL that bring together practitioners,
              researchers, and builders to advance the state of AI Security
              knowledge in India.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-base py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <SectionLabel
            label="About SaaviSOC and SaaviAIDR"
            heading="What we were founded to solve."
            subheading="Events like this one connect directly to the problem SaaviGenAI was founded to solve: making enterprise-grade AI security accessible, consistent, and affordable."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="flex items-start gap-4 rounded-2xl border border-default bg-surface p-6 md:p-8">
              <div className="text-2xl text-gold">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-primary">
                  SaaviSOC
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-secondary">
                  A Managed SOC (Security Operations Center delivered as a
                  service) built by SaaviGenAI using open-source SIEM
                  technology combined with an AI-driven detection and
                  analysis layer. By replacing expensive proprietary SIEM
                  licensing and large in-house analyst teams with an
                  AI-augmented model, SaaviSOC reduces both CAPEX and OPEX
                  while maintaining consistent, round-the-clock monitoring
                  and threat detection.
                </p>
              </div>
            </article>
            <article className="flex items-start gap-4 rounded-2xl border border-default bg-surface p-6 md:p-8">
              <div className="text-2xl text-gold">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-primary">
                  SaaviAIDR
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-secondary">
                  SaaviGenAI&apos;s flagship product within the SaaviSOC
                  platform, purpose-built to monitor the AI layer itself —
                  LLMs, autonomous agents, RAG pipelines, and the broader AI
                  toolchain. SaaviAIDR detects and responds to AI-native
                  threats such as unauthorized tool or API calls, data
                  exfiltration through AI agents, prompt injection, and
                  misuse of AI-connected systems.
                </p>
              </div>
            </article>
          </div>
          <p className="mx-auto mt-8 max-w-4xl text-[15px] leading-relaxed text-secondary">
            Together, SaaviSOC and SaaviAIDR reflect SaaviGenAI&apos;s core
            thesis: as organizations adopt agentic AI, the threat surface
            expands from <em>text safety</em> (chatbot-level guardrails) to{" "}
            <em>action security</em> (AI agents taking real-world actions).
            Community events like the CCCL AI Security session are part of
            how SaaviGenAI stays close to this evolving threat landscape —
            and how we continue shaping SaaviSOC and SaaviAIDR around real,
            emerging risks rather than theoretical ones.
          </p>
        </div>
      </section>

      <section className="bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <blockquote className="rounded-2xl border border-default bg-base p-6 md:p-10">
            <div className="mb-4 h-0.5 w-8 bg-gold" />
            <p className="mb-6 font-display text-xl italic leading-relaxed text-primary">
              &ldquo;This event is one of several community touchpoints
              SaaviGenAI plans to support in the coming months, as we
              continue building toward a future where AI security is
              proactive, accessible, and built into the foundation of how
              organizations adopt AI — not bolted on as an
              afterthought.&rdquo;
            </p>
            <p className="font-mono text-xs uppercase tracking-widest text-gold">
              SaaviGenAI Team
            </p>
          </blockquote>
        </div>
      </section>

      <FooterCTABand />
    </>
  );
}
