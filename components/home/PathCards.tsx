import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Plan 2.5 "Run it yourself, or let us run it". Apple-style pair: one light card,
// one inverse (black in light mode) card.
// [IMAGE]: one small illustration per card: a team at a console (platform) and
// the SaaviGenAI team supporting a customer team (managed). Drawn as SVG in
// currentColor, so they adapt to the card colour; links flow on hover.

function Team({ x, y, filled }: { x: number; y: number; filled: boolean }) {
  return (
    <g>
      {[
        [x, y],
        [x + 22, y - 12],
        [x + 22, y + 12],
      ].map(([cx, cy]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={7}
          strokeWidth={1.25}
          className={filled ? "fill-accent stroke-accent" : "stroke-current"}
          style={filled ? undefined : { fill: "var(--card-bg)" }}
        />
      ))}
    </g>
  );
}

function ConsoleBox({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={96} height={64} rx={8} strokeWidth={1.25} className="stroke-current" style={{ fill: "var(--card-bg)" }} />
      <line x1={x} x2={x + 96} y1={y + 16} y2={y + 16} strokeWidth={1} className="stroke-current opacity-30" />
      {[28, 38, 48].map((dy, i) => (
        <line
          key={dy}
          x1={x + 12}
          x2={x + (i === 1 ? 62 : 80)}
          y1={y + dy}
          y2={y + dy}
          strokeWidth={1.5}
          strokeLinecap="round"
          className={i === 1 ? "stroke-accent" : "stroke-current opacity-30"}
        />
      ))}
    </g>
  );
}

function Link({ d }: { d: string }) {
  return <path d={d} fill="none" strokeWidth={1.25} className="path-link stroke-current opacity-60" />;
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
      <path d="M 45 70 L 45 90" strokeWidth={1.25} strokeDasharray="2 3" className="stroke-accent" fill="none" />
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
    inverse: false,
  },
  {
    title: "Managed AI Security",
    body: "Our specialists deploy, tune and operate SaaviAIDR for you.",
    cta: "See managed services",
    href: "/managed-services/",
    art: <ManagedArt />,
    inverse: true,
  },
];

export function PathCards() {
  return (
    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-20">
      {CARDS.map((c, i) => (
        <article
          key={c.title}
          data-reveal
          style={{ "--reveal-index": i, "--card-bg": c.inverse ? "var(--inverse)" : "var(--raised)" } as React.CSSProperties}
          className={cn(
            "path-card flex flex-col overflow-hidden rounded-[1.75rem] transition-transform duration-500 ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0",
            c.inverse ? "bg-inverse text-on-inverse" : "bg-raised text-ink",
          )}
        >
          <div className="flex flex-1 flex-col items-start p-8 md:p-12">
            <h3 className="text-[2rem] font-semibold leading-tight tracking-[-0.035em] md:text-[2.5rem]">{c.title}</h3>
            <p className={cn("mt-4 max-w-[34ch] text-lead", c.inverse ? "text-on-inverse/75" : "text-ink-muted")}>{c.body}</p>
            <Button href={c.href} variant={c.inverse ? "contrast" : "primary"} arrow className="mt-8">
              {c.cta}
            </Button>
          </div>
          <div className="aspect-[32/15] px-8 pb-8 md:px-12 md:pb-12">{c.art}</div>
        </article>
      ))}
    </div>
  );
}
