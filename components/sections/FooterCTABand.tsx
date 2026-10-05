import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function FooterCTABand() {
  return (
    <section className="bg-navy py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <SectionLabel
            tone="dark"
            label="Start The Conversation"
            heading="Ready to strengthen security for the AI-powered enterprise?"
            subheading="Tell us where you are today. We will help you identify a practical path forward."
          />
          <Button href="/contact" variant="teal" className="justify-self-end">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
