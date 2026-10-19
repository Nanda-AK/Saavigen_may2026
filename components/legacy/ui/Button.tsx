import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "outline" | "teal";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy text-white hover:bg-navy-light transition-colors duration-150",
  gold: "bg-gold text-navy hover:opacity-90 transition-opacity duration-150",
  outline:
    "border border-navy text-navy hover:bg-navy hover:text-white transition-colors duration-150",
  teal: "bg-teal text-white hover:bg-teal-dark transition-colors duration-150",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded px-6 py-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2";

type ButtonAsLink = {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

type ButtonAsButton = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  href?: undefined;
  variant?: Variant;
  children: ReactNode;
};

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (props.href) {
    return (
      <Link className={classes} href={props.href} onClick={props.onClick}>
        {props.children}
      </Link>
    );
  }

  const { href: _discardHref, ...buttonProps } = props;
  return (
    <button className={classes} {...buttonProps}>
      {buttonProps.children}
    </button>
  );
}
