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

// Pages whose first section is a dark full-bleed video hero (marked data-hero="dark").
// On these the header starts transparent with white text, so it sits on the video.
// (This list only sets the first paint; after loading, the header checks the page
// itself for data-hero="dark", so a page missing here just shows a brief flash.)
const DARK_HERO_PAGES = ["/", "/saaviaidr/", "/managed-services/", "/insights/", "/company/", "/contact/", "/privacy/", "/terms/"];

// "/insights/some-article/" should still highlight "Insights".
const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(href);

// Plan 1.1: logo, four links, Contact Us. Below 1024px the links move into a
// menu panel; Contact Us stays in the bar at every width.
export function Header() {
  const pathname = usePathname() ?? "/";
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const [open, setOpen] = useState(false);
  const [overHero, setOverHero] = useState(DARK_HERO_PAGES.includes(normalized) || normalized.startsWith("/insights/"));
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Close the menu after navigating to another page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Transparent while the dark hero is behind the bar. The observer watches a
  // thin strip at the top of the window (rootMargin cuts off the rest), so no
  // scroll listener is needed.
  useEffect(() => {
    const hero = document.querySelector('[data-hero="dark"]');
    if (!hero) {
      setOverHero(false);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setOverHero(entry.isIntersecting), {
      rootMargin: "0px 0px -92% 0px",
    });
    io.observe(hero);
    return () => io.disconnect();
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

  const clear = overHero && !open;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color,color] duration-300",
        clear ? "border-transparent bg-transparent text-white" : "header-glass border-line text-ink",
      )}
    >
      {/* 64px tall on mobile, 80px on desktop. If you change this, also change the
          hero's -mt-16 / lg:-mt-20 (HeroVideo.tsx) and the mobile menu's top-16. */}
      <Container className="flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link href="/" aria-label="SaaviGenAI home" className="rounded-[8px]">
          <Logo size="lg" compact />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-10 xl:gap-12">
            {primaryNav.map((item) => {
              const active = isActive(normalized, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative py-2 text-[1rem] font-medium tracking-[-0.01em] transition-colors duration-200",
                      "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-300",
                      active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
                      clear
                        ? active
                          ? "text-white"
                          : "text-white/75 hover:text-white"
                        : active
                          ? "text-ink"
                          : "text-ink-soft hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <Button href={contactLink.href} variant={clear ? "light" : "primary"} size="md">
            {contactLink.label}
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-full transition-colors lg:hidden",
              clear ? "hover:bg-white/10" : "hover:bg-sunken",
            )}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon icon={open ? X : Menu} size={22} />
          </button>
        </div>
      </Container>

      <div id="mobile-menu" hidden={!open} className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-canvas text-ink lg:hidden">
        <Container className="py-4">
          <nav aria-label="Primary">
            <ul>
              {primaryNav.map((item) => {
                const active = isActive(normalized, item.href);
                return (
                  <li key={item.href} className="border-b border-line">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => close()}
                      className={cn(
                        "flex items-center justify-between py-5 text-[1.75rem] font-semibold tracking-[-0.03em]",
                        active ? "text-ink" : "text-ink-soft",
                      )}
                    >
                      {item.label}
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
