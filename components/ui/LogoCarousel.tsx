import { vendors } from "@/content/vendors";

// Plan 2.2 "Works with": logo cards drifting left in a seamless loop.
// Each logo is painted in its vendor's brand colour (content/vendors.ts); on hover
// the card picks up a soft tint of that colour and a coloured outline.
// The list is repeated COPIES times so the loop never shows a gap; screen
// readers only get the first copy. Hovering or keyboard focus pauses it
// (CSS ".logo-carousel"). No pause button: removed at SaaviGenAI's request.
const COPIES = 4;

export function LogoCarousel() {
  return (
    <div className="logo-carousel overflow-hidden py-3">
      <div className="logo-carousel-track motion-ok" style={{ "--copies": COPIES, "--duration": `${vendors.length * 8}s` } as React.CSSProperties}>
        {Array.from({ length: COPIES }, (_, copy) => (
          <ul key={copy} aria-label={copy === 0 ? "Works with" : undefined} aria-hidden={copy === 0 ? undefined : true} className="flex shrink-0 gap-4 pr-4">
            {vendors.map((v) => (
              <li
                key={`${copy}-${v.name}`}
                style={{ "--brand-tint": v.tint } as React.CSSProperties}
                className="flex h-28 w-52 shrink-0 flex-col items-center justify-center gap-3 rounded-[1.125rem] bg-sunken text-ink ring-1 ring-transparent transition-[background-color,box-shadow] duration-300 hover:bg-[color-mix(in_srgb,var(--brand-tint)_10%,var(--raised))] hover:ring-[color-mix(in_srgb,var(--brand-tint)_45%,transparent)] sm:h-32 sm:w-60"
              >
                {v.logo ? (
                  <span aria-hidden="true" className="logo-mask size-8 sm:size-9" style={{ "--logo": `url(${v.logo})`, background: v.color } as React.CSSProperties} />
                ) : (
                  // No logo yet: a monogram in the vendor colour
                  <span aria-hidden="true" className="inline-flex size-8 items-center justify-center rounded-[8px] text-[0.8125rem] font-bold text-canvas sm:size-9" style={{ background: v.color }}>
                    {v.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
                <span className="text-[1rem] font-semibold tracking-[-0.02em]">{v.name}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
