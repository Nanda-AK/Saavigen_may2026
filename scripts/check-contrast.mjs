// Checks WCAG contrast for the colour pairs the site actually uses, in both themes.
// Run: npm run check:contrast   (exits with an error if any pair fails)
// Colours are read straight from styles/globals.css, so this never drifts from the tokens.
import { readFileSync } from "node:fs";

const css = readFileSync("styles/globals.css", "utf8");
// Only the first :root block holds the design tokens (the second one is legacy).
const rootBlock = css.slice(css.indexOf(":root {"), css.indexOf("}", css.indexOf(":root {")));

const tokens = {};
for (const [, name, value] of rootBlock.matchAll(/--([\w-]+):\s*([^;]+);/g)) {
  const pair = value.match(/light-dark\(\s*(#[0-9a-f]{3,6})\s*,\s*(#[0-9a-f]{3,6})\s*\)/i);
  const single = value.match(/^(#[0-9a-f]{3,6})$/i);
  if (pair) tokens[name] = { light: pair[1], dark: pair[2] };
  else if (single) tokens[name] = { light: single[1], dark: single[1] };
}
tokens.focus = tokens["accent-ink"];
tokens.white = { light: "#ffffff", dark: "#ffffff" };

// [foreground, background, minimum ratio, what it is]
const PAIRS = [
  ["ink", "canvas", 4.5, "body text"],
  ["ink", "sunken", 4.5, "text on grey bands / cards"],
  ["ink-soft", "canvas", 4.5, "supporting text"],
  ["ink-soft", "sunken", 4.5, "supporting text on grey"],
  ["ink-muted", "canvas", 4.5, "meta text"],
  ["ink-muted", "sunken", 4.5, "meta text on grey"],
  ["ink-muted", "raised", 4.5, "meta text on white cards"],
  ["accent-ink", "canvas", 4.5, "links / accent text"],
  ["accent-ink", "sunken", 4.5, "links on grey"],
  ["white", "accent-fill", 4.5, "primary (blue) button label"],
  ["alert-ink", "canvas", 4.5, "alert text"],
  ["alert-ink", "sunken", 4.5, "alert text on grey"],
  ["danger", "canvas", 4.5, "form error text"],
  ["danger", "sunken", 4.5, "form error text on grey panel"],
  ["on-inverse", "inverse", 4.5, "inverse card / button text"],
  ["field", "canvas", 3, "input border (non-text)"],
  ["field", "sunken", 3, "input border on grey"],
  ["focus", "canvas", 3, "focus ring (non-text)"],
  ["focus", "sunken", 3, "focus ring on grey"],
];

const lum = (hex) => {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? [...h].map((c) => c + c).join("") : h;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

let failed = 0;
for (const mode of ["light", "dark"]) {
  console.log(`\n${mode.toUpperCase()}`);
  for (const [fg, bg, min, label] of PAIRS) {
    if (!tokens[fg] || !tokens[bg]) {
      console.log(`  ?    missing token ${fg} or ${bg}`);
      failed++;
      continue;
    }
    const r = ratio(tokens[fg][mode], tokens[bg][mode]);
    const ok = r >= min;
    if (!ok) failed++;
    console.log(`  ${ok ? "pass" : "FAIL"} ${r.toFixed(2).padStart(5)}:1 (min ${min})  ${fg} on ${bg}  ${label}`);
  }
}
console.log(failed ? `\n${failed} pair(s) failed.` : "\nAll pairs pass.");
process.exit(failed ? 1 : 0);
