import { vendors } from "@/content/vendors";
import { cn } from "@/lib/utils";

// Plan 2.2 "Works with" logo strip as a slow marquee (CSS only, see .marquee in globals.css).
// The list is repeated so the loop is seamless; screen readers only get the first copy.
// Hover or keyboard focus pauses it. Reduced motion shows a still, wrapped row.
export function VendorStrip({ className }: { className?: string }) {
  const copies = 4; // enough copies to fill wide screens with only five names

  return (
    <div className={cn("marquee group/marquee relative overflow-hidden", className)}>
      <div className="marquee-track flex w-max items-center">
        {Array.from({ length: copies }, (_, copy) => (
          <ul
            key={copy}
            aria-label={copy === 0 ? "Works with" : undefined}
            aria-hidden={copy === 0 ? undefined : true}
            className="flex shrink-0 items-center"
          >
            {vendors.map((v) => (
              <li key={`${copy}-${v.name}`} className="px-8 md:px-12">
                {v.logo ? (
                  // Official logo files are shown in the same grey as the text wordmarks.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={v.logo} alt={v.name} className="h-8 w-auto opacity-60 grayscale" />
                ) : (
                  <span className="whitespace-nowrap text-[1.625rem] font-semibold tracking-[-0.035em] text-ink-muted">{v.name}</span>
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
