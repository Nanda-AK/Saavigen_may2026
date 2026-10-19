import { Button } from "@/components/ui/Button";
import { InViewVideo } from "@/components/ui/InViewVideo";
import { cn } from "@/lib/utils";

// Plan 2.5 "Run it yourself, or let us run it". Each card leads with a short
// looping clip (plays only while on screen): a specialist at a server console
// for the platform, a team working in a server room for the managed service.
// [IMAGE] in the plan asked for illustrations of exactly these two scenes.
const CARDS = [
  {
    title: "SaaviAIDR Platform",
    body: "Deploy it in your environment and operate it with your own team.",
    cta: "Explore the platform",
    href: "/saaviaidr/",
    video: "card-platform-operator",
    inverse: false,
  },
  {
    title: "Managed AI Security",
    body: "Our specialists deploy, tune and operate SaaviAIDR for you.",
    cta: "See managed services",
    href: "/managed-services/",
    video: "card-managed-team",
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
          <div className="relative aspect-[16/10] overflow-hidden">
            <InViewVideo name={c.video} className="transition-transform duration-[1200ms] ease-out group-hover/path:scale-[1.05] motion-reduce:transform-none" />
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
