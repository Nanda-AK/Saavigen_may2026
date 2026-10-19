"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { contactLink, primaryNav } from "@/content/site";
import { cn } from "@/lib/utils";

// "/insights/some-article/" should still highlight "Insights".
const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(href);

// Plan 1.1: logo, four links, Contact Us. Below 1024px the links move into a
// menu panel; Contact Us stays in the bar at every width.
export function Header() {
  const pathname = usePathname() ?? "/";
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Close the menu after navigating to another page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // While open: Escape closes it, the page behind can't scroll, and it
  // closes itself if the window is widened to desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close(true);
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && close();
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
      document.documentElement.style.overflow = "";
    };
  }, [open, close]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas">
      <Container className="flex h-16 items-center justify-between gap-6 lg:h-[72px]">
        <Link href="/" aria-label="SaaviGenAI home" className="rounded-box text-ink">
          <Logo compact />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {primaryNav.map((item) => {
              const active = isActive(normalized, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative py-2 text-[0.9375rem] transition-colors duration-200",
                      // 1px line under the link: grows on hover, stays for the current page
                      "after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:bg-signal after:transition-transform after:duration-300",
                      active
                        ? "text-ink after:scale-x-100"
                        : "text-ink-soft after:scale-x-0 hover:text-ink hover:after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button href={contactLink.href} className="min-h-10 px-4">
            {contactLink.label}
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-box text-ink hover:bg-sunken lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon icon={open ? X : Menu} size={22} />
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-canvas lg:hidden"
      >
        <Container className="py-6">
          <nav aria-label="Primary">
            <ul className="divide-y divide-line border-b border-line">
              {primaryNav.map((item) => {
                const active = isActive(normalized, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => close()}
                      className={cn(
                        "flex items-center justify-between py-5 font-display text-2xl tracking-[-0.02em]",
                        active ? "text-ink" : "text-ink-soft",
                      )}
                    >
                      {item.label}
                      {active ? <span aria-hidden="true" className="size-2 rounded-full bg-signal" /> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </Container>
      </div>
    </header>
  );
}
