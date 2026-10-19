import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ICON_STROKE } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/*
  Enterprise "split" button (instead of the common rounded pill):
  - near-square corners (3px)
  - label on the left; optional arrow in its own cell, divided by a hairline
  - on hover a solid fill sweeps in from the left and the arrow nudges forward
  Colours per variant are CSS variables read by .btn in globals.css:
    --btn-bg / --btn-fg        resting background and text
    --btn-sweep / --btn-fg-hover  the fill that sweeps in, and the text on top of it
    --btn-border               outline colour (transparent for filled variants)
*/

type Variant = "primary" | "secondary" | "contrast" | "light" | "light-outline" | "link";
type Size = "sm" | "md" | "lg";

const variants: Record<Exclude<Variant, "link">, string> = {
  primary: "[--btn-bg:var(--accent-fill)] [--btn-fg:#fff] [--btn-sweep:#004e9e] [--btn-fg-hover:#fff] [--btn-border:transparent]",
  secondary:
    "[--btn-bg:transparent] [--btn-fg:var(--ink)] [--btn-sweep:var(--ink)] [--btn-fg-hover:var(--canvas)] [--btn-border:var(--ink)]",
  contrast:
    "[--btn-bg:var(--on-inverse)] [--btn-fg:var(--inverse)] [--btn-sweep:var(--accent-fill)] [--btn-fg-hover:#fff] [--btn-border:transparent]",
  // On the dark video hero: white whatever the theme
  light: "[--btn-bg:#fff] [--btn-fg:#1d1d1f] [--btn-sweep:var(--accent-fill)] [--btn-fg-hover:#fff] [--btn-border:transparent]",
  "light-outline":
    "[--btn-bg:transparent] [--btn-fg:#fff] [--btn-sweep:#fff] [--btn-fg-hover:#1d1d1f] [--btn-border:rgb(255_255_255/0.55)]",
};

const sizes: Record<Size, { label: string; cell: string }> = {
  sm: { label: "min-h-10 px-4 text-[0.875rem]", cell: "w-10" },
  md: { label: "min-h-12 px-5 text-[0.9375rem]", cell: "w-12" },
  lg: { label: "min-h-14 px-6 text-[1rem]", cell: "w-14" },
};

type Common = {
  variant?: Variant;
  size?: Size;
  /** Arrow in its own cell. External links get a diagonal arrow. */
  arrow?: boolean;
  /** Let a long label wrap on narrow screens instead of overflowing */
  wrap?: boolean;
  className?: string;
  children: ReactNode;
};

type AsLink = Common & { href: string; onClick?: () => void };
type AsButton = Common & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & { href?: undefined };

// mailto:, tel: and https: links leave the site, so they use a plain <a>.
const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

function Inner({ size, arrow, external, wrap, children }: { size: Size; arrow: boolean; external: boolean; wrap: boolean; children: ReactNode }) {
  const Glyph = external ? ArrowUpRight : ArrowRight;
  return (
    <>
      <span aria-hidden="true" className="btn-sweep" />
      <span
        className={cn(
          "btn-label relative z-10 flex items-center gap-2 font-medium tracking-[-0.01em]",
          sizes[size].label,
          wrap ? "whitespace-normal py-3 text-left sm:whitespace-nowrap" : "whitespace-nowrap",
        )}
      >
        {children}
      </span>
      {arrow ? (
        <span className={cn("btn-cell relative z-10 flex shrink-0 items-center justify-center", sizes[size].cell)}>
          <Glyph width={18} height={18} strokeWidth={ICON_STROKE + 0.25} aria-hidden="true" className="btn-arrow" />
        </span>
      ) : null}
    </>
  );
}

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", arrow = false, wrap = false, className, children } = props;

  if (variant === "link") {
    const linkClasses = cn("group inline-flex items-center gap-1.5 font-medium text-accent-ink hover:underline underline-offset-4", className);
    if (props.href !== undefined) {
      return (
        <Link href={props.href} className={linkClasses}>
          {children}
          {arrow ? <ArrowRight width={16} height={16} aria-hidden="true" className="transition-transform group-hover:translate-x-[3px]" /> : null}
        </Link>
      );
    }
  }

  const classes = cn("btn group", variants[variant as Exclude<Variant, "link">], className);

  if (props.href !== undefined) {
    const external = isExternal(props.href);
    const inner = (
      <Inner size={size} arrow={arrow} external={external && !props.href.startsWith("mailto:")} wrap={wrap}>
        {children}
      </Inner>
    );
    if (external) {
      const newTab = props.href.startsWith("http");
      return (
        <a className={classes} href={props.href} onClick={props.onClick} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {inner}
        </a>
      );
    }
    return (
      <Link className={classes} href={props.href} onClick={props.onClick}>
        {inner}
      </Link>
    );
  }

  const { variant: _v, size: _s, arrow: _a, wrap: _w, className: _c, children: _ch, href: _h, type = "button", ...rest } = props;
  return (
    <button type={type} className={classes} {...rest}>
      <Inner size={size} arrow={arrow} external={false} wrap={wrap}>
        {children}
      </Inner>
    </button>
  );
}
