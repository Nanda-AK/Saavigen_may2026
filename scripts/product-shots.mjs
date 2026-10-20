// Turns the raw SaaviAIDR dashboard screenshot into the images the site uses.
// Run: npm run product-shots
//
// 1. Anonymise: the plan requires "sample data only, with all sensitive data removed
//    or replaced". The source screenshot shows real team emails and a person's name,
//    so each of those areas is painted over with the dashboard's own background colour
//    and redrawn with sample text in the same colour and size (REPLACEMENTS below).
// 2. Export the full overview + three crops (one per dashboard panel) as WebP.
//
// Source: assets/source/product/dashboard-overview.png (1900x907; git-ignored, never published).
// To use a new screenshot: replace the source file, check the REPLACEMENTS boxes still
// line up (x, y = left / text baseline in source pixels), and re-run.
import { mkdir, stat } from "node:fs/promises";
import sharp from "sharp";

const SRC = "assets/source/product/dashboard-overview.png";
const OUT = "public/images/product";
const BG = "#101317"; // dashboard background, sampled from the screenshot

// [left, top, width, height] of the box to cover; text drawn at (x, baseline).
const REPLACEMENTS = [
  // Page title (was a team member's name)
  { box: [236, 8, 270, 36], x: 240, y: 33, text: "Team overview", size: 21, color: "#e6e9ee", weight: 600 },
  // "Needs attention" table, User column
  ...[
    [270, "priya.menon@example.com"],
    [325, "arjun.rao@example.com"],
    [380, "priya.menon@example.com"],
    [435, "kiran.das@example.com"],
    [490, "kiran.das@example.com"],
  ].map(([y, text]) => ({ box: [858, y - 12, 205, 22], x: 863, y: y + 5, text, size: 13.5, color: "#b0b7c2", weight: 400 })),
  // "Riskiest users" list
  ...[
    [240, "priya.menon@example.com"],
    [317, "arjun.rao@example.com"],
    [394, "kiran.das@example.com"],
    [471, "sanjay.iyer@example.com"],
  ].map(([y, text]) => ({ box: [1354, y - 12, 260, 22], x: 1359, y: y + 5, text, size: 13.5, color: "#e6e9ee", weight: 500 })),
];

const CROPS = {
  "dashboard-alerts": { left: 240, top: 167, width: 1086, height: 396 }, // Needs attention table
  "dashboard-users": { left: 1342, top: 167, width: 535, height: 396 }, // Riskiest users
  "dashboard-trend": { left: 240, top: 578, width: 1637, height: 226 }, // Detection trend chart
};

const { width, height } = await sharp(SRC).metadata();
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
${REPLACEMENTS.map(
  (r) => `<rect x="${r.box[0]}" y="${r.box[1]}" width="${r.box[2]}" height="${r.box[3]}" fill="${BG}"/>
<text x="${r.x}" y="${r.y}" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="${r.size}" font-weight="${r.weight}" fill="${r.color}">${r.text}</text>`,
).join("\n")}
</svg>`;

const clean = await sharp(SRC).composite([{ input: Buffer.from(svg), top: 0, left: 0 }]).png().toBuffer();

await mkdir(OUT, { recursive: true });
const write = async (name, img) => {
  const file = `${OUT}/${name}.webp`;
  await img.webp({ quality: 88 }).toFile(file);
  const m = await sharp(file).metadata();
  console.log(`${file}  ${m.width}x${m.height}  ${(await stat(file)).size} B`);
};
await write("dashboard-overview", sharp(clean));
for (const [name, area] of Object.entries(CROPS)) await write(name, sharp(clean).extract(area));
