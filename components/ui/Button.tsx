import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ICON_STROKE } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  // Ink fill. The accent teal never fills a button (it's kept for signals).
  primary: "bg-inverse text-on-inverse hover:bg-inverse-hover",
  // 1px ink outline
  secondary: "border border-ink text-ink hover:bg-sunken",
  // Text link with arrow, for low-emphasis actions inside cards
  ghost: "px-0 text-ink underline decoration-line-strong underline-offset-[6px] hover:decoration-signal",
};

const base =
  "group inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-box px-5 text-[0.9375rem] font-medium leading-none transition-colors duration-200";

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
      strokeWidth={ICON_STROKE}
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
