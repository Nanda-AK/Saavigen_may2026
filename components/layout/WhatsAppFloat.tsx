import { site } from "@/content/site";

// Permanent round WhatsApp button, bottom right on every page (replaces the WhatsApp
// buttons in the contact bands). The button itself always stays a circle; the label
// "Message us on WhatsApp" (plan 2.7 wording) appears as a tooltip to its left on
// hover / keyboard focus, and is always the link's name for screen readers.
// Glyph: Simple Icons WhatsApp mark, painted via mask (.logo-mask).
export function WhatsAppFloat() {
  return (
    <a
      href={site.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message us on WhatsApp: ${site.whatsapp.display}`}
      className="wa-float group fixed right-4 bottom-4 z-50 inline-flex size-14 items-center justify-center rounded-full bg-inverse text-on-inverse shadow-[0_18px_40px_-14px_rgb(0_0_0/0.45)] transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105 md:right-6 md:bottom-6"
    >
      <span aria-hidden="true" className="logo-mask size-[26px]" style={{ "--logo": "url(/logos/whatsapp.svg)" } as React.CSSProperties} />
      <span
        aria-hidden="true"
        className="wa-tip pointer-events-none absolute right-[calc(100%+0.75rem)] hidden whitespace-nowrap rounded-[10px] bg-inverse px-3.5 py-2 text-[0.875rem] font-medium text-on-inverse shadow-[0_10px_30px_-12px_rgb(0_0_0/0.4)] sm:block"
      >
        Message us on WhatsApp
      </span>
    </a>
  );
}
