import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Plan 2.5 "Run it yourself, or let us run it". Each card leads with a photo:
// a person working against a wall of streaming data (your own team operating the
// platform) and a modern operations centre with a team of specialists (the managed
// service). Free Pexels photos, see content/media-credits.md.
const CARDS = [
  {
    title: "SaaviAIDR Platform",
    body: "Deploy it in your environment and operate it with your own team.",
    cta: "Explore the platform",
    href: "/saaviaidr/",
    image: "/images/home/card-platform.webp",
    inverse: false,
  },
  {
    title: "Managed AI Security",
    body: "Our specialists deploy, tune and operate SaaviAIDR for you.",
    cta: "See managed services",
    href: "/managed-services/",
    image: "/images/home/card-managed.webp",
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
          style={{ "--reveal-index": i } as React.CSSProperties}
          className={cn("group/path flex flex-col overflow-hidden rounded-[1.25rem]", c.inverse ? "bg-inverse text-on-inverse" : "bg-raised text-ink")}
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-tint">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.image}
              alt=""
              loading="lazy"
              decoding="async"
              width={1280}
              height={800}
              className="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover/path:scale-[1.05] motion-reduce:transform-none"
            />
          </div>
          <div className="flex flex-1 flex-col items-start p-8 md:p-10">
            <h3 className="text-[1.75rem] font-semibold leading-tight tracking-[-0.035em] md:text-[2.25rem]">{c.title}</h3>
            <p className={cn("mt-3 max-w-[36ch] text-lead", c.inverse ? "text-on-inverse/70" : "text-ink-muted")}>{c.body}</p>
            <Button href={c.href} variant={c.inverse ? "contrast" : "primary"} className="mt-8">
              {c.cta}
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
