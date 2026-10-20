import { ArrowUpRight, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

// All copy on this page comes from SaaviGenAI_Website_Content_Plan.md section 8.
export const metadata = pageMetadata(
  "Contact SaaviGenAI",
  "Talk to SaaviGenAI about SaaviAIDR or managed AI security services. Email contact@saavigen.ai.",
  "/contact/",
);

// Location (Bangalore) confirmed by SaaviGenAI; it is information, not a link.
const CHANNELS: { channel: string; details: string; prompt?: string; href?: string; icon: typeof Mail }[] = [
  { channel: "Location", details: "Bangalore", icon: MapPin },
  { channel: "Email", details: site.email, prompt: "Email us", href: `mailto:${site.email}`, icon: Mail },
  { channel: "WhatsApp", details: site.whatsapp.display, prompt: "Message us on WhatsApp", href: site.whatsapp.href, icon: MessageCircle },
  { channel: "LinkedIn", details: site.linkedin.display, prompt: "Follow us on LinkedIn", href: site.linkedin.href, icon: Linkedin },
];

export default function ContactPage() {
  return (
    <>
      {/* 8.1 Hero */}
      <PageHero
        video="page-contact-network"
        size="md"
        title="Let's talk about securing your AI"
        sub="Tell us about the AI in your organisation. We'll show you how SaaviAIDR can help."
      />

      <Section labelledBy="form-title">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* 8.2 Contact options (+ 8.4 company details) */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2 className="sr-only">Contact options</h2>
              <ul>
                {CHANNELS.map((c, i) => {
                  const inner = (
                    <>
                      <span className="inline-flex size-12 items-center justify-center rounded-full bg-sunken text-ink transition-colors duration-300 group-hover:bg-inverse group-hover:text-on-inverse">
                        <Icon icon={c.icon} size={20} />
                      </span>
                      <span>
                        <span className="block text-[0.875rem] text-ink-muted">{c.channel}</span>
                        <span className="mt-0.5 block text-[1.25rem] font-semibold tracking-[-0.02em] break-all text-ink">{c.details}</span>
                        {c.prompt ? <span className="mt-1 block text-[0.9375rem] text-ink-soft">{c.prompt}</span> : null}
                      </span>
                    </>
                  );
                  const rowClass = "group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-7";
                  return (
                    <li key={c.channel} data-reveal style={{ "--reveal-index": i } as React.CSSProperties} className="border-t border-line last:border-b">
                      {c.href ? (
                        <a href={c.href} {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={rowClass}>
                          {inner}
                          <span aria-hidden="true" className="text-ink-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink">
                            <Icon icon={ArrowUpRight} size={22} />
                          </span>
                        </a>
                      ) : (
                        <div className={rowClass}>{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="mt-8 space-y-3 text-[0.9375rem]">
                {/* Plan 8.2 response time line (confirmed: 3 days) */}
                <p className="text-ink-soft">We reply within 3 days.</p>
                <p>
                  <Placeholder kind="TO CONFIRM" note="Registered company name, if you want it shown." />
                </p>
              </div>
            </div>
          </div>

          {/* 8.3 Contact form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
