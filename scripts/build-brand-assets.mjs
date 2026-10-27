// Builds the logo files the site uses from the one source logo.
// Run: npm run brand:assets   (re-run whenever the source logo changes)
//
// The source PNG is a white key on a black rounded tile, but its corners are
// solid WHITE (no transparency), which shows up as white corners in dark mode.
// So we never use it directly. Instead we produce:
//   app/icon.png         256px tile with transparent corners (browser tab icon)
//   app/apple-icon.png   180px tile with black corners (iOS adds its own rounding)
//   public/brand/key-mark.png  the key alone as a transparency mask. The site
//                              paints it with CSS (mask-image + currentColor),
//                              so it follows the text colour in light and dark.
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const SRC = "public/images/SaaviGenAI_Key_Logo.png";
const SIZE = 1024;

// Rounded-rect mask slightly inside the tile edge, so the white corners are cut off.
const tileMask = Buffer.from(
  `<svg width="${SIZE}" height="${SIZE}"><rect x="6" y="6" width="${SIZE - 12}" height="${SIZE - 12}" rx="96" ry="96" fill="#fff"/></svg>`,
);

const tile = await sharp(SRC)
  .ensureAlpha()
  .composite([{ input: tileMask, blend: "dest-in" }])
  .png()
  .toBuffer();

// palette: true keeps the icon small (two colours plus edge smoothing).
await sharp(tile).resize(256).png({ palette: true, compressionLevel: 9 }).toFile("app/icon.png");
await sharp(tile)
  .flatten({ background: "#0b0b0b" })
  .resize(180)
  .png()
  .toFile("app/apple-icon.png");

// Key mark: blacken the corners, then use brightness as alpha.
// linear() pushes the near-black tile (about 10/255) down to 0 so it becomes fully transparent.
const { data: alpha, info } = await sharp(tile)
  .flatten({ background: "#000" })
  .greyscale()
  .linear(1.08, -14)
  .raw()
  .toBuffer({ resolveWithObject: true });

await mkdir("public/brand", { recursive: true });
await sharp({
  create: { width: info.width, height: info.height, channels: 3, background: "#000" },
})
  .joinChannel(alpha, { raw: { width: info.width, height: info.height, channels: 1 } })
  .png()
  .toBuffer()
  .then((rgba) => sharp(rgba).trim({ threshold: 0 }).resize({ height: 160 }).png().toFile("public/brand/key-mark.png"));

console.log("Brand assets written: app/icon.png, app/apple-icon.png, public/brand/key-mark.png");
