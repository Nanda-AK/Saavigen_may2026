"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

// One observer for the whole site (about 1 KB) instead of a wrapper per element.
// Any element with `data-reveal` fades and rises into place the first time it
// scrolls into view. The CSS lives in styles/globals.css ("Scroll reveal").
//
// Order matters to avoid a flash of hidden content:
//   1. Elements already on screen are marked revealed straight away (no animation).
//   2. Only then is `reveal-ready` added to <html>, which is what lets CSS hide
//      the rest. If this script never runs, nothing is ever hidden.
export function RevealObserver() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    const track = (el: Element) => {
      if (el.classList.contains("is-revealed")) return;
      const top = el.getBoundingClientRect().top;
      if (reduce || top < window.innerHeight) el.classList.add("is-revealed");
      else io.observe(el);
    };

    document.querySelectorAll("[data-reveal]").forEach(track);
    document.documentElement.classList.add("reveal-ready");

    // Pick up elements rendered later (e.g. after the Insights filter changes).
    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches("[data-reveal]")) track(node);
          node.querySelectorAll("[data-reveal]").forEach(track);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
