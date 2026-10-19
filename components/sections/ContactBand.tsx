import { Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/content/site";

// Plan 2.7. Also reused at the end of articles (plan 6) and the Insights listing.
export function ContactBand() {
  return (
    <section aria-labelledby="contact-band-title" className="bg-sunken">
      <Container className="py-24 text-center md:py-32 lg:py-40">
        <h2 id="contact-band-title" data-reveal className="mx-auto max-w-[16ch] text-h2 text-ink md:text-[4rem] md:leading-[1.02]">
          Let&apos;s talk about securing your AI
        </h2>
        <p data-reveal style={{ "--reveal-index": 1 } as React.CSSProperties} className="mx-auto mt-6 max-w-[42ch] text-lead text-ink-muted">
          Tell us what AI you&apos;re running. We&apos;ll show you what SaaviAIDR sees.
        </p>
        <div
          data-reveal
          style={{ "--reveal-index": 2 } as React.CSSProperties}
          className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap"
        >
          {/* Long labels may wrap on small phones, so they're allowed to wrap there. */}
          <Button href={`mailto:${site.email}`} className="h-auto min-h-12 py-3 whitespace-normal sm:whitespace-nowrap">
            <Icon icon={Mail} size={18} />
            Email us: {site.email}
          </Button>
          <Button href={site.whatsapp.href} variant="secondary" className="h-auto min-h-12 py-3 whitespace-normal sm:whitespace-nowrap">
            <Icon icon={MessageCircle} size={18} />
            Message us on WhatsApp: {site.whatsapp.display}
          </Button>
        </div>
      </Container>
    </section>
  );
}
