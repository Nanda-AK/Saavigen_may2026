import { Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/content/site";

// Plan 2.7. Also reused at the end of articles (plan 6) and the Insights listing.
// The plan's second button ("Message us on WhatsApp") is replaced, at SaaviGenAI's
// request, by the permanent WhatsApp button on every page (layout/WhatsAppFloat).
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
        <div data-reveal style={{ "--reveal-index": 2 } as React.CSSProperties} className="mt-11 flex justify-center">
          <Button href={`mailto:${site.email}`} size="lg" arrow wrap>
            <Icon icon={Mail} size={18} />
            Email us: {site.email}
          </Button>
        </div>
      </Container>
    </section>
  );
}
