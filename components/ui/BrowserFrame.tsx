import { cn } from "@/lib/utils";

// A dark browser-window frame for product screenshots. Until real screenshots
// (with sample data) are supplied, it shows a clearly marked [IMAGE] placeholder
// with the plan's own description. To use a real screenshot, pass `src`.
export function BrowserFrame({ label, src, alt = "", className }: { label: string; src?: string; alt?: string; className?: string }) {
  return (
    <figure className={cn("overflow-hidden rounded-[1.25rem] bg-[#1d1d1f] p-1.5 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.45)] ring-1 ring-black/10", className)}>
      <div className="flex items-center gap-1.5 px-3 py-2.5" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
      </div>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="w-full rounded-[0.875rem]" />
      ) : (
        <div
          role="img"
          aria-label={`Screenshot to be supplied: ${label}`}
          data-placeholder="IMAGE"
          className="flex aspect-[16/9] flex-col items-center justify-center gap-3 rounded-[0.875rem] border border-dashed border-white/20 bg-[#0d0d0f] px-6 text-center"
        >
          <span className="rounded-full border border-alert/60 px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.06em] text-alert">IMAGE TO SUPPLY</span>
          <span className="max-w-[40ch] text-[0.9375rem] text-white/60">{label}</span>
        </div>
      )}
    </figure>
  );
}
