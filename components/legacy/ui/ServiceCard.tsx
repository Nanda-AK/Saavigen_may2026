import Link from "next/link";

export type ServiceCardProps = {
  number: string;
  title: string;
  description: string;
  href: string;
};

export function ServiceCard({ number, title, description, href }: ServiceCardProps) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-default bg-surface p-8 transition-transform duration-200 hover:-translate-y-1.5">
      <div className="absolute left-0 right-0 top-0 h-1 bg-gold" />
      <span className="absolute right-6 top-5 font-mono text-xs tracking-wide text-gold">{number}</span>
      <h3 className="mt-4 font-display text-xl font-bold text-primary md:text-2xl">{title}</h3>
      <div className="my-4 h-0.5 w-8 bg-gold" />
      <p className="text-[15px] leading-relaxed text-secondary">{description}</p>
      <Link className="mt-6 inline-block text-sm font-semibold text-teal transition-colors duration-150 hover:text-teal-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2" href={href}>
        Learn more →
      </Link>
    </article>
  );
}
