// Source photos live in assets/source/ (NOT public/, so originals are never published).
// Resizes them to the sizes the site uses, converts them to WebP and
// strips ALL metadata (EXIF, including GPS location, which several event photos had).
// Run: npm run images   (re-run after adding a photo to the JOBS list)
//
// fit "cover" crops to the exact size (focusing on the most interesting area);
// fit "inside" keeps the whole photo and only limits the longest side.
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const team = (file, name) => ({ src: `assets/source/team/${file}`, out: `public/images/team/${name}.webp`, w: 720, h: 720, fit: "cover" });
const event = (file, name) => ({ src: `assets/source/cccl/${file}`, out: `public/images/insights/cccl/${name}.webp`, w: 1600, h: 1600, fit: "inside" });

const JOBS = [
  // Company page headshots (square). Jamuna's source is only 193x193: replace with a larger photo.
  team("nanda_founder.jpg", "nanda-kumar"),
  team("jamuna_swamy.jpeg", "jamuna-swamy"),
  team("aamir_hamza.jpeg", "aamir-hamza"),
  team("atharv_chouhan.jpeg", "atharv-chouhan"),
  team("tulasi_patil.jpeg", "tulasi-patil"),
  team("yasar.png", "yasar-ameen"),
  // CCCL event article gallery
  event("blog3imag.jpeg", "audience-session"),
  event("blog3imag2.jpg", "dr-chinmay-presenting"),
  event("blog3img3.jpeg", "token-of-appreciation"),
  event("blog3img4.jpeg", "speakers-exchanging-gifts"),
  event("blog3img5.jpg", "attendees-with-banners"),
  event("blog3speakers.jpg", "speakers-and-organisers"),
  event("blog3founder.jpg", "nanda-presenting"),
  event("blog3collage.jpg", "speaker-collage"),
];

for (const job of JOBS) {
  await mkdir(path.dirname(job.out), { recursive: true });
  const pipeline = sharp(job.src).rotate(); // rotate() applies the camera orientation before metadata is dropped
  if (job.fit === "cover") pipeline.resize(job.w, job.h, { fit: "cover", position: "attention" });
  else pipeline.resize(job.w, job.h, { fit: "inside", withoutEnlargement: true });
  await pipeline.webp({ quality: 80 }).toFile(job.out); // sharp drops metadata unless .withMetadata() is called
  const { width, height, exif } = await sharp(job.out).metadata();
  console.log(`${job.out}  ${width}x${height}  ${(await stat(job.out)).size} B  metadata: ${exif ? "PRESENT" : "none"}`);
}
