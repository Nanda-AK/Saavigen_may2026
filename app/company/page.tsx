import { Compass, Linkedin, MessageSquareText, Wrench } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { FillText } from "@/components/ui/FillText";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section, SectionHeader } from "@/components/ui/Section";
import { advisor, founder, foundingMembers, type Person } from "@/content/team";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

// All copy on this page comes from SaaviGenAI_Website_Content_Plan.md section 7.
export const metadata = pageMetadata(
  "About SaaviGenAI | The Team Behind SaaviAIDR",
  "SaaviGenAI builds SaaviAIDR, a detection and response platform for enterprise AI. Meet our founder, advisor and founding members.",
  "/company/",
);

const PRINCIPLES = [
  { title: "Practical", body: "Controls that teams can run every day.", icon: Wrench },
  { title: "Clear", body: "Plain language, with no jargon or fear.", icon: MessageSquareText },
  { title: "Practitioner-led", body: "Built from experience of operating real systems.", icon: Compass },
];

function LinkedInLink({ href, name, className }: { href: string; name: string; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} on LinkedIn`}
      className={cn("link-cta group inline-flex items-center gap-2 text-[1rem] font-medium text-ink", className)}
    >
      <Icon icon={Linkedin} size={18} />
      <span className="link-cta-label">LinkedIn</span>
    </a>
  );
}

// Founder and advisor: large portrait (greyscale, colour on hover) beside the bio.
function Profile({ person, reverse = false, children }: { person: Person; reverse?: boolean; children?: React.ReactNode }) {
  return (
    <article id={person.id} className="grid scroll-mt-28 items-center gap-10 md:grid-cols-12 md:gap-14">
      <div data-reveal className={cn("portrait overflow-hidden rounded-[1.5rem] bg-tint md:col-span-5", reverse && "md:order-2")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={person.photo} alt={`Portrait of ${person.name}`} width={720} height={720} loading="lazy" className="aspect-square w-full object-cover" />
      </div>
      <div data-reveal style={{ "--reveal-index": 1 } as React.CSSProperties} className="md:col-span-7">
        <p className="text-[1rem] font-medium text-ink-muted">{person.role}</p>
        <h3 className="mt-2 text-[2.5rem] font-semibold leading-none tracking-[-0.045em] text-ink md:text-[3.5rem]">{person.name}</h3>
        {children}
        <p className="mt-6 max-w-[56ch] text-lead text-ink-soft">{person.bio}</p>
        <LinkedInLink href={person.linkedin} name={person.name} className="mt-8" />
      </div>
    </article>
  );
}

export default function CompanyPage() {
  return (
    <>
      {/* 7.1 Hero */}
      <PageHero
        video="page-company"
        eyebrow="About SaaviGenAI"
        title="Practitioner-led security for enterprise AI"
        sub="We build SaaviAIDR so organisations can adopt AI with clear visibility and control."
      />

      {/* 7.2 Mission: headline, supporting text fills in on scroll, then the founder's quote */}
      <Section labelledBy="mission-title">
        <h2 id="mission-title" data-reveal className="text-[1rem] font-semibold text-ink-muted">
          Security outcomes, not security theatre
        </h2>
        <FillText
          text="We focus on practical controls, clear visibility and plain communication. The aim is security that teams can actually run, not just present."
          className="mt-8 max-w-[28ch] text-[clamp(2rem,1.3rem+3vw,4rem)] leading-[1.08] tracking-[-0.045em]"
        />
        <figure data-reveal className="mt-24 grid gap-8 border-t border-ink pt-12 md:grid-cols-12 lg:mt-32">
          <span aria-hidden="true" className="text-[6rem] leading-[0.6] font-semibold text-ink md:col-span-2 md:text-[9rem]">
            &ldquo;
          </span>
          <div className="md:col-span-10">
            <blockquote className="text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] leading-[1.25] font-medium tracking-[-0.03em] text-ink">
              Most enterprises deploying AI today are doing so without any visibility into what those systems are actually
              doing at runtime.
            </blockquote>
            <figcaption className="mt-6 text-[1rem] text-ink-muted">Nanda Kumar, Founder &amp; CEO</figcaption>
          </div>
        </figure>
      </Section>

      {/* 7.3 Founder + 7.4 Senior Advisor & Mentor */}
      <Section tone="sunken" labelledBy="leadership-title">
        <h2 id="leadership-title" className="sr-only">
          Founder and advisor
        </h2>
        <div className="grid gap-24 lg:gap-32">
          <Profile person={founder} />
          <Profile person={advisor} reverse>
            <p className="mt-5 text-[1rem] text-ink-muted">{advisor.experience}</p>
            {/* [IMAGE] credential badges: styled text tags (no official logos used) */}
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Credentials">
              {advisor.credentials.map((c) => (
                <li key={c} className="rounded-full border border-line-strong bg-raised px-3.5 py-1.5 text-[0.875rem] font-medium text-ink">
                  {c}
                </li>
              ))}
            </ul>
          </Profile>
        </div>
      </Section>

      {/* 7.5 Founding members */}
      <Section labelledBy="members-title">
        <SectionHeader id="members-title" title="Founding members" />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {foundingMembers.map((m, i) => (
            <li key={m.id} id={m.id} data-reveal style={{ "--reveal-index": i } as React.CSSProperties} className="portrait group scroll-mt-28">
              <div className="overflow-hidden rounded-[1.25rem] bg-tint">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.photo} alt={`Portrait of ${m.name}`} width={720} height={720} loading="lazy" className="aspect-[4/5] w-full object-cover" />
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <h3 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ink">{m.name}</h3>
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${m.name} on LinkedIn`}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-ink hover:text-ink"
                >
                  <Icon icon={Linkedin} size={17} />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* 7.6 Our principles */}
      <Section tone="sunken" labelledBy="principles-title">
        <SectionHeader id="principles-title" title="How we work" />
        <p className="mt-6 text-center">
          <Placeholder kind="TO CONFIRM" note="These are draft principles based on the mission text on the current website. Please approve or replace them." />
        </p>
        <Container className="mt-14 max-w-5xl px-0 sm:px-0 lg:mt-20 lg:px-0">
          <ol>
            {PRINCIPLES.map((p, i) => (
              <li
                key={p.title}
                data-reveal
                style={{ "--reveal-index": i } as React.CSSProperties}
                className="group grid items-baseline gap-3 border-t border-line py-10 last:border-b md:grid-cols-[4rem_1fr_1fr] md:gap-8"
              >
                <span className="font-mono text-label text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="flex items-center gap-4 text-[2.25rem] font-semibold tracking-[-0.045em] text-ink transition-transform duration-500 group-hover:translate-x-2 md:text-[3rem]">
                  {p.title}
                </h3>
                <p className="flex items-center gap-3 text-lead text-ink-muted">
                  <span className="text-ink">
                    <Icon icon={p.icon} size={22} />
                  </span>
                  {p.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* 7.7 Closing call to action */}
      <CtaBand id="company-cta" title="Work with us" line="Talk to us about SaaviAIDR or our managed services.">
        <Button href="/contact/" size="lg">
          Contact Us
        </Button>
      </CtaBand>
    </>
  );
}
