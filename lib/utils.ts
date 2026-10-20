import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge removes conflicting classes (e.g. "px-4" then "px-6" keeps "px-6").
// It must be told about this site's custom theme names (styles/globals.css @theme),
// otherwise it misreads them:
//   - "text-h2" looked like a colour, so "text-h2 text-ink" dropped the heading size
//   - "max-w-page" wasn't recognised, so a later "max-w-[46rem]" couldn't replace it
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "h2", "h3", "lead", "body", "label"] }],
      "max-w": [{ "max-w": ["page", "prose"] }],
      rounded: [{ rounded: ["box"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
