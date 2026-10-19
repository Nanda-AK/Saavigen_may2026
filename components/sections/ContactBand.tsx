import { Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/content/site";

// Plan 2.7. Also reused at the end of articles (plan 6) and the Insights listing.
// Background: a faint dot grid that drifts very slowly (.contact-band-pattern in globals.css).
export function ContactBand() {
  return (
    <section aria-labelledby="contact-band-title" className="relative overflow-hidden border-t border-line bg-sunken">
      <div aria-hidden="true" className="contact-band-pattern absolute inset-0" />
      <Container className="relative py-20 md:py-28 lg:py-32">
        <h2 id="contact-band-title" data-reveal className="max-w-[16ch] text-h2 text-ink md:text-[3.25rem] md:leading-[1.05]">
          Let&apos;s talk about securing your AI
        </h2>
        <p data-reveal style={{ "--reveal-index": 1 } as React.CSSProperties} className="mt-5 max-w-[46ch] text-lead text-ink-soft">
          Tell us what AI you&apos;re running. We&apos;ll show you what SaaviAIDR sees.
        </p>
        <div data-reveal style={{ "--reveal-index": 2 } as React.CSSProperties} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {/* Long labels may wrap on small phones, so they're allowed to wrap there. */}
          <Button href={`mailto:${site.email}`} className="h-auto py-3 whitespace-normal text-left sm:whitespace-nowrap">
            <Icon icon={Mail} size={18} />
            Email us: {site.email}
          </Button>
          <Button href={site.whatsapp.href} variant="secondary" className="h-auto py-3 whitespace-normal text-left sm:whitespace-nowrap">
            <Icon icon={MessageCircle} size={18} />
            Message us on WhatsApp: {site.whatsapp.display}
          </Button>
        </div>
      </Container>
    </section>
  );
}
