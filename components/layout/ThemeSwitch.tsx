"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

// TEMPORARY review aid. SaaviGenAI will keep only one theme at launch.
// When that's decided: delete this file, its use in Footer.tsx, the
// THEME_INIT_SCRIPT in app/layout.tsx, and set color-scheme in globals.css.

type Choice = "system" | "light" | "dark";
const STORAGE_KEY = "saavigen-theme";

// Runs in <head> before the page paints, so a saved choice never flashes the wrong theme.
export const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

const options: { value: Choice; label: string; icon: typeof Sun }[] = [
  { value: "system", label: "Use system theme", icon: Monitor },
  { value: "light", label: "Use light theme", icon: Sun },
  { value: "dark", label: "Use dark theme", icon: Moon },
];

export function ThemeSwitch({ className }: { className?: string }) {
  const [choice, setChoice] = useState<Choice>("system");

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    if (current === "light" || current === "dark") setChoice(current);
  }, []);

  function apply(next: Choice) {
    setChoice(next);
    const root = document.documentElement;
    try {
      if (next === "system") {
        delete root.dataset.theme;
        localStorage.removeItem(STORAGE_KEY);
      } else {
        root.dataset.theme = next;
        localStorage.setItem(STORAGE_KEY, next);
      }
    } catch {
      // Storage can be blocked (private mode); the theme still applies for this visit.
    }
  }

  return (
    <div role="group" aria-label="Colour theme" className={cn("inline-flex rounded-box border border-footer-line p-0.5", className)}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-label={o.label}
          aria-pressed={choice === o.value}
          onClick={() => apply(o.value)}
          className={cn(
            "inline-flex size-8 items-center justify-center rounded-[4px] transition-colors",
            choice === o.value ? "bg-footer-line text-footer-ink" : "text-footer-muted hover:text-footer-ink",
          )}
        >
          <Icon icon={o.icon} size={16} />
        </button>
      ))}
    </div>
  );
}
