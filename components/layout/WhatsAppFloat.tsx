import { site } from "@/content/site";

// Permanent WhatsApp button, bottom right on every page (replaces the WhatsApp
// buttons in the contact bands). The label "Message us on WhatsApp" (plan 2.7
// wording) slides out on hover / keyboard focus; it is always the link's name
// for screen readers. Glyph: Simple Icons WhatsApp mark, painted via mask.
export function WhatsAppFloat() {
  return (
    <a
      href={site.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message us on WhatsApp: ${site.whatsapp.display}`}
      className="wa-float fixed right-4 bottom-4 z-50 flex h-14 items-center rounded-[6px] bg-inverse px-4 text-on-inverse shadow-[0_18px_40px_-14px_rgb(0_0_0/0.45)] transition-transform duration-200 hover:-translate-y-0.5 md:right-6 md:bottom-6"
    >
      {/* Label first so it grows out to the left while the icon stays at the right edge */}
      <span aria-hidden="true" className="wa-label overflow-hidden whitespace-nowrap text-[0.9375rem] font-medium">
        Message us on WhatsApp
      </span>
      <span aria-hidden="true" className="logo-mask size-6 shrink-0" style={{ "--logo": "url(/logos/whatsapp.svg)" } as React.CSSProperties} />
    </a>
  );
}
