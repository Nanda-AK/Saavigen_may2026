import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
  Apple-classic buttons (chosen by SaaviGenAI from the style comparison):
  - ONE solid button per group for the main action: softly rounded (8-12px), no arrow.
  - Every secondary action is a TEXT LINK with a chevron; the underline draws in on
    hover and the chevron nudges right (.link-cta in globals.css).

  Variants
    primary     blue fill            (main action on light sections)
    light       white fill           (main action on the dark video hero)
    contrast    flipped colours      (main action on an inverse / black card)
    link        blue text + chevron  (secondary action on light sections)
    link-light  light-blue text      (secondary action on dark backgrounds)
*/

type Variant = "primary" | "light" | "contrast" | "link" | "link-light";
type Size = "sm" | "md" | "lg";

const fills: Record<"primary" | "light" | "contrast", string> = {
  primary: "bg-accent-fill text-white hover:bg-accent-fill-hover",
  light: "bg-white text-[color:#1d1d1f] hover:bg-[#e8e8ed]",
  contrast: "bg-on-inverse text-inverse hover:opacity-85",
};

const solidSizes: Record<Size, string> = {
  sm: "min-h-9 rounded-[8px] px-4 text-[0.875rem]",
  md: "min-h-11 rounded-[10px] px-5 text-[0.9375rem]",
  lg: "min-h-12 rounded-[12px] px-6 text-[1.0625rem]",
};

const linkSizes: Record<Size, string> = {
  sm: "text-[0.9375rem]",
  md: "text-[1.0625rem]",
  lg: "text-[1.1875rem]",
};

type Common = {
  variant?: Variant;
  size?: Size;
  /** Let a long label wrap on narrow screens instead of overflowing (solid buttons) */
  wrap?: boolean;
  className?: string;
  children: ReactNode;
};

type AsLink = Common & { href: string; onClick?: () => void };
type AsButton = Common & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & { href?: undefined };

// mailto:, tel: and https: links leave the site, so they use a plain <a>.
const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", wrap = false, className, children } = props;
  const isLink = variant === "link" || variant === "link-light";

  const classes = isLink
    ? cn(
        "link-cta group inline-flex items-center gap-0.5 font-medium tracking-[-0.01em]",
        variant === "link" ? "text-accent-ink" : "text-[color:#2997ff]",
        linkSizes[size],
        className,
      )
    : cn(
        "inline-flex items-center justify-center gap-2 font-medium tracking-[-0.01em] transition-[background-color,opacity] duration-200",
        fills[variant as keyof typeof fills],
        solidSizes[size],
        wrap ? "whitespace-normal py-3 text-center sm:whitespace-nowrap" : "whitespace-nowrap",
        className,
      );

  const content = isLink ? (
    <>
      <span className="link-cta-label">{children}</span>
      <ChevronRight width={18} height={18} strokeWidth={2} aria-hidden="true" className="link-cta-chevron shrink-0" />
    </>
  ) : (
    children
  );

  if (props.href !== undefined) {
    if (isExternal(props.href)) {
      const newTab = props.href.startsWith("http");
      return (
        <a className={classes} href={props.href} onClick={props.onClick} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
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

  const { variant: _v, size: _s, wrap: _w, className: _c, children: _ch, href: _h, type = "button", ...rest } = props;
  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
