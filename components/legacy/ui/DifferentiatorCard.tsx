import type { ReactNode } from "react";

type DifferentiatorCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export function DifferentiatorCard({ icon, title, description }: DifferentiatorCardProps) {
  return (
    <article className="flex items-start gap-4 rounded-2xl bg-surface p-6 transition-transform duration-200 hover:-translate-y-1.5">
      <div className="text-2xl text-gold">{icon}</div>
      <div>
        <h3 className="text-sm font-semibold text-primary">{title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-secondary">{description}</p>
      </div>
    </article>
  );
}
