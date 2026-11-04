import { Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/content/site";

// Plan 2.7. Also reused at the end of articles (plan 6) and the Insights listing.
// The plan's second button ("Message us on WhatsApp") is replaced, at SaaviGenAI's
// request, by the permanent WhatsApp button on every page (layout/WhatsAppFloat).
export function ContactBand({ id = "contact-band-title" }: { id?: string }) {
  return (
    <CtaBand id={id} title="Let's talk about securing your AI" line="Tell us what AI you're running. We'll show you what SaaviAIDR sees.">
      <Button href={`mailto:${site.email}`} size="lg" wrap>
        <Icon icon={Mail} size={18} />
        Email us: {site.email}
      </Button>
    </CtaBand>
  );
}
