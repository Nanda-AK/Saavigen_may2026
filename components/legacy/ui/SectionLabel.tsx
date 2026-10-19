type SectionLabelProps = {
  label: string;
  heading: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  subheading?: string;
};

export function SectionLabel({ label, heading, align = "left", tone = "light", subheading }: SectionLabelProps) {
  const centered = align === "center";
  const headingColor = tone === "dark" ? "text-white" : "text-primary";
  const bodyColor = tone === "dark" ? "text-on-dark" : "text-secondary";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div className={centered ? "mx-auto mb-2 h-0.5 w-12 bg-gold" : "mb-2 h-0.5 w-12 bg-gold"} />
      <p className="mb-4 font-mono text-sm font-bold uppercase tracking-widest text-gold">{label}</p>
      <h2 className={`font-display text-3xl font-bold ${headingColor} md:text-4xl`}>{heading}</h2>
      {subheading ? <p className={`mt-5 text-base leading-relaxed ${bodyColor} md:text-lg`}>{subheading}</p> : null}
    </div>
  );
}
