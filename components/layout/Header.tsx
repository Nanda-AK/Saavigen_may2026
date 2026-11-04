"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Linkedin, Mail, Menu, MessageCircle, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { contactLink, primaryNav, site } from "@/content/site";
import { cn } from "@/lib/utils";

// Pages whose first section is a dark full-bleed video hero (marked data-hero="dark").
// On these the header starts transparent with white text, so it sits on the video.
// (This list only sets the first paint; after loading, the header checks the page
// itself for data-hero="dark", so a page missing here just shows a brief flash.)
// Privacy and Terms are plain documents (no video), so they are not in this list.
const DARK_HERO_PAGES = ["/", "/saaviaidr/", "/managed-services/", "/insights/", "/company/", "/contact/"];

// "/insights/some-article/" should still highlight "Insights".
const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(href);

/*
  Plan 1.1: logo, four links, Contact Us. From 1024px the links sit in the bar.
  Below that, a menu button opens a side panel; Contact Us stays in the bar.

  WHY THE PANEL IS OUTSIDE <header>: the frosted bar uses backdrop-filter, and any
  element with backdrop-filter becomes the "containing block" for position:fixed
  children. A fixed panel inside it would be sized to the 64px bar (height 0) and
  never show. So the glass lives on its own background layer, and the panel is a
  sibling of the header.
*/
export function Header() {
  const pathname = usePathname() ?? "/";
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const [open, setOpen] = useState(false);
  const [overHero, setOverHero] = useState(DARK_HERO_PAGES.includes(normalized) || normalized.startsWith("/insights/"));
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

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

  // While the panel is open: focus moves into it, Escape closes it, the page behind
  // can't scroll, and it closes itself if the window is widened to desktop.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
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

  const clear = overHero;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 isolate border-b transition-[border-color,color] duration-300",
          clear ? "border-transparent text-white" : "border-line text-ink",
        )}
      >
        {/* Frosted background on its own layer (see the note above) */}
        <div aria-hidden="true" className={cn("header-glass absolute inset-0 -z-10 transition-opacity duration-300", clear ? "opacity-0" : "opacity-100")} />

        {/* 64px tall on mobile, 80px on desktop. If you change this, also change the
            heroes' -mt-16 / lg:-mt-20 (HeroVideo.tsx, PageHero.tsx). */}
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
                        clear ? (active ? "text-white" : "text-white/75 hover:text-white") : active ? "text-ink" : "text-ink-soft hover:text-ink",
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
            <Button href={contactLink.href} variant={clear ? "light" : "primary"} size="md" className="max-[359px]:px-3">
              {contactLink.label}
            </Button>
            <button
              ref={toggleRef}
              type="button"
              className={cn("inline-flex size-11 items-center justify-center rounded-full transition-colors lg:hidden", clear ? "hover:bg-white/10" : "hover:bg-sunken")}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Icon icon={Menu} size={22} />
            </button>
          </div>
        </Container>
      </header>

      {/* Phone / tablet menu: dimmed backdrop + side panel sliding in from the right */}
      <div
        aria-hidden="true"
        onClick={() => close(true)}
        className={cn(
          "fixed inset-0 z-[70] bg-black/45 transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={cn(
          "fixed inset-y-0 right-0 z-[71] flex w-[min(84vw,21rem)] flex-col bg-canvas text-ink shadow-[0_0_60px_rgb(0_0_0/0.25)] transition-[transform,visibility] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden",
          open ? "visible translate-x-0" : "invisible translate-x-full",
        )}
      >
        {/* Sized for phones: 56px top bar, 20px links in 52px rows, regular button. */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-line pr-2 pl-5">
          <Link href="/" aria-label="SaaviGenAI home" onClick={() => close()} className="rounded-[8px]">
            <Logo />
          </Link>
          <button
            ref={closeRef}
            type="button"
            onClick={() => close(true)}
            aria-label="Close menu"
            className="inline-flex size-11 items-center justify-center rounded-full hover:bg-sunken"
          >
            <Icon icon={X} size={20} />
          </button>
        </div>

        <nav aria-label="Primary" className="flex-1 overflow-y-auto px-5 pt-2 pb-6">
          <ul>
            {primaryNav.map((item, i) => {
              const active = isActive(normalized, item.href);
              return (
                <li
                  key={item.href}
                  className={cn("border-b border-line transition-[opacity,transform] duration-500", open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0")}
                  style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => close()}
                    className="group flex min-h-[3.25rem] items-center justify-between py-3"
                  >
                    <span className={cn("text-[1.25rem] tracking-[-0.02em]", active ? "font-semibold text-ink" : "font-medium text-ink-soft")}>{item.label}</span>
                    <span className={cn("transition-transform duration-300 group-hover:translate-x-1", active ? "text-ink" : "text-ink-muted")}>
                      <Icon icon={ArrowRight} size={18} />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Button href={contactLink.href} size="md" className="mt-6 w-full" onClick={() => close()}>
            {contactLink.label}
          </Button>
        </nav>

        <ul className="shrink-0 space-y-2.5 border-t border-line px-5 py-5 text-[0.875rem] text-ink-muted">
          <li>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 hover:text-ink">
              <Icon icon={Mail} size={16} /> {site.email}
            </a>
          </li>
          <li>
            <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 hover:text-ink">
              <Icon icon={MessageCircle} size={16} /> <span className="sr-only">WhatsApp: </span>
              {site.whatsapp.display}
            </a>
          </li>
          <li>
            <a href={site.linkedin.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 hover:text-ink">
              <Icon icon={Linkedin} size={16} /> <span className="sr-only">LinkedIn: </span>
              {site.linkedin.display}
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
