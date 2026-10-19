import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ICON_STROKE } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "contrast" | "light" | "light-outline" | "link";

const variants: Record<Variant, string> = {
  // Blue pill: the main action on a page
  primary: "bg-accent-fill text-white hover:bg-accent-fill-hover",
  // Outlined pill in the text colour
  secondary: "border border-ink/80 text-ink hover:bg-ink hover:text-canvas",
  // Flipped colours for use on an inverse (black) card
  contrast: "bg-on-inverse text-inverse hover:opacity-90",
  // On the dark video hero (white whatever the theme).
  light: "bg-white text-[color:#1d1d1f] hover:bg-white/90",
  "light-outline": "border border-white/45 text-white hover:border-white hover:bg-white/10",
  // Text link with arrow (Apple "Learn more >")
  link: "h-auto min-h-0 px-0 text-accent-ink hover:underline underline-offset-4",
};

const base =
  "group inline-flex min-h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-6 text-[0.9375rem] font-medium tracking-[-0.01em] transition-colors duration-200";

type Common = {
  variant?: Variant;
  /** Arrow that nudges right on hover. External links get a diagonal arrow. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type AsLink = Common & { href: string; onClick?: () => void };
type AsButton = Common & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & { href?: undefined };

// mailto:, tel: and https: links leave the site, so they use a plain <a>.
const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

function Arrow({ external }: { external: boolean }) {
  const Glyph = external ? ArrowUpRight : ArrowRight;
  return (
    <Glyph
      width={16}
      height={16}
      strokeWidth={ICON_STROKE + 0.5}
      aria-hidden="true"
      className="shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transition-none"
    />
  );
}

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", arrow = false, className, children } = props;
  const classes = cn(base, variants[variant], className);

  if (props.href !== undefined) {
    const external = isExternal(props.href);
    const content = (
      <>
        {children}
        {arrow ? <Arrow external={external && !props.href.startsWith("mailto:")} /> : null}
      </>
    );
    if (external) {
      const newTab = props.href.startsWith("http");
      return (
        <a
          className={classes}
          href={props.href}
          onClick={props.onClick}
          {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {content}
        </a>
      );
    }
    return (
      <Link className={classes} href={props.href} onClick={props.onClick}>
        {content}
      </Link>
    );
  }

  const { variant: _v, arrow: _a, className: _c, children: _ch, href: _h, type = "button", ...rest } = props;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
      {arrow ? <Arrow external={false} /> : null}
    </button>
  );
}
