import { vendors } from "@/content/vendors";

// Plan 2.2 "Works with": the vendor logos orbit the SaaviAIDR mark on a tilted
// 3D ring (one platform at the centre of every AI). Pure CSS, see ".orbit" in
// globals.css. Hover or keyboard focus pauses it; reduced motion keeps it still.
// The ring is decorative; the list itself is a normal <ul> for screen readers.
export function LogoOrbit() {
  return (
    <div className="orbit relative mx-auto h-[15rem] w-full max-w-5xl sm:h-[17rem] lg:h-[20rem]">
      <div className="orbit-ring" style={{ "--n": vendors.length } as React.CSSProperties}>
        <span aria-hidden="true" className="orbit-path" />

        <div className="orbit-center">
          <span className="flex items-center gap-2.5 rounded-[14px] bg-inverse px-5 py-3.5 text-on-inverse shadow-[0_20px_50px_-20px_rgb(0_0_0/0.45)] sm:px-6 sm:py-4">
            <span aria-hidden="true" className="key-mark h-5 sm:h-6" />
            <span className="text-[1rem] font-semibold tracking-[-0.02em] sm:text-[1.125rem]">SaaviAIDR</span>
          </span>
        </div>

        {/* preserve-3d must be repeated on every element between the ring and the items,
            otherwise the browser flattens the logos onto one line */}
        <ul aria-label="Works with" className="[transform-style:preserve-3d]">
          {vendors.map((v, i) => (
            <li key={v.name} className="orbit-item" style={{ "--i": i } as React.CSSProperties}>
              <span className="flex items-center gap-2.5 whitespace-nowrap rounded-[12px] border border-line bg-raised px-3.5 py-2.5 text-ink shadow-[0_10px_30px_-18px_rgb(0_0_0/0.35)] sm:px-5 sm:py-3.5">
                {v.logo ? (
                  <span aria-hidden="true" className="logo-mask size-5 sm:size-6" style={{ "--logo": `url(${v.logo})` } as React.CSSProperties} />
                ) : null}
                <span className="text-[0.8125rem] font-semibold tracking-[-0.01em] sm:text-[0.9375rem]">{v.name}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
