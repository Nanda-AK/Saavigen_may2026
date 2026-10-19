import { cn } from "@/lib/utils";
import type { Category } from "@/lib/insights";

// Abstract cover art drawn from the article's slug (plan 2.6 / 5.3 [IMAGE]:
// "abstract or topic-based visuals in the site's colour palette, same size and ratio").
// The same slug always draws the same picture; each category has its own motif.
// Colours come from CSS classes, so covers follow light and dark mode.

function seeded(slug: string) {
  let h = 2166136261;
  for (const c of slug) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

const W = 400;
const H = 250;

// Streams converging on one point: agents feeding a console (agent security).
function Streams({ rnd }: { rnd: () => number }) {
  const fx = 250 + rnd() * 90;
  const fy = 70 + rnd() * 110;
  const lines = Array.from({ length: 9 }, (_, i) => {
    const y0 = 12 + i * 28 + rnd() * 12;
    const bend = 60 + rnd() * 80;
    return `M -10 ${y0.toFixed(1)} C ${bend.toFixed(1)} ${y0.toFixed(1)}, ${(fx - 90).toFixed(1)} ${fy.toFixed(1)}, ${fx.toFixed(1)} ${fy.toFixed(1)}`;
  });
  const hot = Math.floor(rnd() * lines.length);
  return (
    <>
      {lines.map((d, i) => (
        <path key={i} d={d} className={i === hot ? "stroke-alert" : "stroke-line-strong"} strokeWidth={i === hot ? 1.5 : 1} fill="none" />
      ))}
      <rect x={fx - 2} y={fy - 22} width={70} height={44} rx={4} className="fill-canvas stroke-ink-muted" strokeWidth={1} />
      <circle cx={fx} cy={fy} r={4} className="fill-accent" />
    </>
  );
}

// Columns rising off a baseline (industry analysis).
function Columns({ rnd }: { rnd: () => number }) {
  const count = 14;
  const accent = 3 + Math.floor(rnd() * 8);
  return (
    <>
      <line x1={24} x2={376} y1={210} y2={210} className="stroke-ink-muted" strokeWidth={1} />
      {Array.from({ length: count }, (_, i) => {
        const h = 30 + rnd() * 140;
        const x = 32 + i * 25;
        return <rect key={i} x={x} y={210 - h} width={12} height={h} rx={1.5} className={i === accent ? "fill-accent" : "fill-line-strong"} />;
      })}
    </>
  );
}

// Nested frames (governance: boundaries and controls).
function Frames({ rnd }: { rnd: () => number }) {
  const cx = 200 + (rnd() - 0.5) * 60;
  return (
    <>
      {Array.from({ length: 6 }, (_, i) => {
        const w = 340 - i * 52;
        const h = 210 - i * 32;
        return (
          <rect key={i} x={cx - w / 2} y={125 - h / 2} width={w} height={h} rx={4} fill="none" className={i === 5 ? "stroke-accent" : "stroke-line-strong"} strokeWidth={1} strokeDasharray={i % 2 ? "3 5" : undefined} />
        );
      })}
    </>
  );
}

export function ArticleCover({ slug, category, className }: { slug: string; category: Category; className?: string }) {
  const rnd = seeded(slug);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={cn("block size-full bg-tint", className)}>
      {category === "Industry Analysis" ? <Columns rnd={rnd} /> : category === "AI Governance" ? <Frames rnd={rnd} /> : <Streams rnd={rnd} />}
    </svg>
  );
}
