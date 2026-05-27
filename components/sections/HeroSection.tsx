import { Button } from "@/components/ui/Button";

type HeroSectionProps = {
  label: string;
  heading: string;
  subheading: string;
  image?: string;
};

export function HeroSection({ label, heading, subheading, image }: HeroSectionProps) {
  return (
    <section className="bg-navy py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <div className={image ? "grid items-center gap-10 lg:grid-cols-2" : undefined}>
          <div>
            <p className="mb-5 font-mono text-s uppercase tracking-widest text-gold">
              {label}
            </p>
            <h1 className="mb-5 max-w-3xl font-display text-4xl font-bold leading-tight text-white md:text-5xl">
              {heading}
            </h1>
            <p className="mb-8 max-w-2xl leading-relaxed text-on-dark md:text-lg">
              {subheading}
            </p>
            <Button href="/contact" variant="teal">
              Contact Us
            </Button>
          </div>
          {image && (
            <div className="hidden justify-center lg:flex">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt="SaaviGenAI Hero Section Image"
                aria-hidden="true"
                width={512}
                height={320}
                fetchPriority="high"
                className="max-h-80 w-full max-w-lg rounded-4xl object-contain drop-shadow-2xl"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
