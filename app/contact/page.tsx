import { Mail, Phone } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pageMetadata } from "@/lib/metadata";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata = pageMetadata(
  "Contact | SaaviGenAI",
  "Get in touch with SaaviGenAI about SaaviSOC, SaaviAIDR, or AI upskilling for your organisation.",
  "/contact",
);

const CONTACT_PHONE = "+91 97422 66597";

export default function ContactPage() {
  return (
    <section className="bg-base py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <SectionLabel
          label="Contact"
          heading="Start the conversation."
          subheading="Share where you are today — your current maturity, constraints, and immediate concerns. We will help define the first practical step."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:max-w-2xl">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-4 rounded-2xl border border-default bg-surface p-6 transition-colors hover:border-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="mb-0.5 font-mono text-xs uppercase tracking-widest text-gold">
                Email
              </p>
              <p className="text-sm font-semibold text-primary">
                {CONTACT_EMAIL}
              </p>
            </div>
          </a>

          <a
            href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
            className="flex items-center gap-4 rounded-2xl border border-default bg-surface p-6 transition-colors hover:border-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="mb-0.5 font-mono text-xs uppercase tracking-widest text-gold">
                Phone
              </p>
              <p className="text-sm font-semibold text-primary">
                {CONTACT_PHONE}
              </p>
            </div>
          </a>
        </div>

        <p className="mt-8 max-w-md text-sm leading-relaxed text-secondary">
          We aim to respond to all enquiries within 1–2 business days. For
          discovery calls or programme proposals, please mention which service
          you are interested in when you reach out.
        </p>
      </div>
    </section>
  );
}
