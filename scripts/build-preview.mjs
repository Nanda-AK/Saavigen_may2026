// Builds a temporary PREVIEW of the site into out/, for hosting somewhere other
// than saavigen.ai (e.g. Netlify Drop: drag the out/ folder onto app.netlify.com/drop).
// Run: npm run build:preview
//
// Differences from the normal production build (npm run build):
//   - every page carries <meta name="robots" content="noindex, nofollow">
//   - robots.txt disallows all crawlers
//   - out/_headers adds an X-Robots-Tag: noindex header (Netlify reads this file)
// so a preview copy never competes with the real site in search results.
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const env = { ...process.env, NEXT_PUBLIC_NOINDEX: "1" };
execSync("npx next build", { stdio: "inherit", env });
execSync("npx next-sitemap", { stdio: "inherit", env });
writeFileSync("out/.nojekyll", "");
writeFileSync("out/_headers", "/*\n  X-Robots-Tag: noindex, nofollow\n");
console.log("\nPreview build ready in out/  (not indexable). Drag that folder onto https://app.netlify.com/drop");
