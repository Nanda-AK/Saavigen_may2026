import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Plan 2.5 "Run it yourself, or let us run it".
// [IMAGE]: one small illustration per card in the hero's style: a team at a console
// (platform) and the SaaviGenAI team supporting a customer team (managed).
// Drawn as SVG with theme colours; links start flowing when the card is hovered.

function Team({ x, y, filled }: { x: number; y: number; filled: boolean }) {
  return (
    <g>
      {[
        [x, y],
        [x + 22, y - 12],
        [x + 22, y + 12],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={7} strokeWidth={1.25} className={filled ? "fill-signal stroke-signal" : "fill-canvas stroke-ink"} />
      ))}
    </g>
  );
}

function ConsoleBox({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={96} height={64} rx={4} strokeWidth={1.25} className="fill-canvas stroke-ink" />
      <line x1={x} x2={x + 96} y1={y + 16} y2={y + 16} strokeWidth={1} className="stroke-line-strong" />
      {[28, 38, 48].map((dy, i) => (
        <line key={dy} x1={x + 12} x2={x + (i === 1 ? 62 : 80)} y1={y + dy} y2={y + dy} strokeWidth={1.5} strokeLinecap="round" className={i === 1 ? "stroke-signal" : "stroke-line-strong"} />
      ))}
    </g>
  );
}

function Link({ d }: { d: string }) {
  return <path d={d} fill="none" strokeWidth={1.25} className="path-link stroke-ink-muted" />;
}

function PlatformArt() {
  return (
    <svg viewBox="0 0 320 150" aria-hidden="true" className="size-full">
      <Team x={58} y={75} filled={false} />
      <Link d="M 96 75 C 140 75, 150 75, 190 75" />
      <ConsoleBox x={190} y={43} />
    </svg>
  );
}

function ManagedArt() {
  return (
    <svg viewBox="0 0 320 150" aria-hidden="true" className="size-full">
      <Team x={34} y={52} filled />
      <Team x={34} y={108} filled={false} />
      <Link d="M 72 52 C 120 52, 140 66, 190 66" />
      <Link d="M 72 108 C 120 108, 140 88, 190 88" />
      <path d="M 45 70 L 45 90" strokeWidth={1.25} strokeDasharray="2 3" className="stroke-signal" fill="none" />
      <ConsoleBox x={190} y={45} />
    </svg>
  );
}

const CARDS = [
  {
    title: "SaaviAIDR Platform",
    body: "Deploy it in your environment and operate it with your own team.",
    cta: "Explore the platform",
    href: "/saaviaidr/",
    art: <PlatformArt />,
    tone: "bg-raised",
  },
  {
    title: "Managed AI Security",
    body: "Our specialists deploy, tune and operate SaaviAIDR for you.",
    cta: "See managed services",
    href: "/managed-services/",
    art: <ManagedArt />,
    tone: "bg-sunken",
  },
];

export function PathCards() {
  return (
    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:gap-6">
      {CARDS.map((c, i) => (
        <article
          key={c.title}
          data-reveal
          style={{ "--reveal-index": i } as React.CSSProperties}
          className={cn(
            "path-card group/path flex flex-col overflow-hidden rounded-box border border-line transition-[transform,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-signal motion-reduce:hover:translate-y-0",
            c.tone,
          )}
        >
          <div className="aspect-[32/15] border-b border-line px-6 pt-6 md:px-10 md:pt-8">{c.art}</div>
          <div className="flex flex-1 flex-col items-start p-6 md:p-10">
            <h3 className="text-h2 text-ink md:text-[2rem]">{c.title}</h3>
            <p className="mt-3 max-w-[40ch] text-lead text-ink-soft">{c.body}</p>
            <Button href={c.href} variant="secondary" arrow className="mt-8">
              {c.cta}
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
