import { mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = "public/gallery";
// Records which source each output was built from. Comparing mtimes alone misses
// renames (a renamed file keeps its old mtime), so outputs are keyed by the
// source's size + mtime instead.
const MANIFEST = path.join(SRC_DIR, ".optimized.json");
const VARIANTS = [
  { dir: "thumb", width: 600, quality: 75 },
  { dir: "full", width: 1600, quality: 80 },
];

const outName = (file) => file.replace(/\.[^.]+$/, ".webp");

const manifest = JSON.parse(await readFile(MANIFEST, "utf8").catch(() => "{}"));
const files = (await readdir(SRC_DIR)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
const nextManifest = {};

await Promise.all(VARIANTS.map((v) => mkdir(path.join(SRC_DIR, v.dir), { recursive: true })));

await Promise.all(
  files.map(async (file) => {
    const src = path.join(SRC_DIR, file);
    const { size, mtimeMs } = await stat(src);
    const signature = `${size}:${mtimeMs}`;
    nextManifest[file] = signature;

    const outputs = VARIANTS.map((v) => ({ ...v, out: path.join(SRC_DIR, v.dir, outName(file)) }));
    const allExist = (await Promise.all(outputs.map((o) => stat(o.out).catch(() => null)))).every(Boolean);
    if (allExist && manifest[file] === signature) return;

    await Promise.all(
      outputs.map((o) =>
        sharp(src)
          .rotate()
          .resize({ width: o.width, withoutEnlargement: true })
          .webp({ quality: o.quality })
          .toFile(o.out)
      )
    );
    console.log(`optimized ${file}`);
  })
);

const expected = new Set(files.map(outName));
for (const v of VARIANTS) {
  for (const f of await readdir(path.join(SRC_DIR, v.dir))) {
    if (!expected.has(f)) {
      await rm(path.join(SRC_DIR, v.dir, f));
      console.log(`removed stale ${v.dir}/${f}`);
    }
  }
}

// Cover splash photo shown on first load (components/CoverSplash.tsx).
const COVER_SRC = "public/cover.jpg";
const COVER_OUT = "public/cover.webp";
const OG_OUT = "public/og-image.jpg";
const coverStat = await stat(COVER_SRC).catch(() => null);
if (coverStat) {
  const signature = `${coverStat.size}:${coverStat.mtimeMs}`;
  nextManifest["../cover.jpg"] = signature;
  const outputsExist = (await Promise.all([COVER_OUT, OG_OUT].map((f) => stat(f).catch(() => null)))).every(Boolean);
  if (manifest["../cover.jpg"] !== signature || !outputsExist) {
    await sharp(COVER_SRC)
      .rotate()
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(COVER_OUT);
    // Link-preview thumbnail (og:image) for KakaoTalk etc.: a 1200x630 crop
    // centred on the couple's faces, which sit about 38% down the photo.
    const resized = await sharp(COVER_SRC).rotate().resize({ width: 1200 }).toBuffer();
    const { height } = await sharp(resized).metadata();
    const top = Math.round(Math.min(Math.max(height * 0.38 - 315, 0), height - 630));
    await sharp(resized)
      .extract({ left: 0, top, width: 1200, height: 630 })
      .jpeg({ quality: 85 })
      .toFile(OG_OUT);
    console.log("optimized cover.jpg");
  }
}

await writeFile(MANIFEST, JSON.stringify(nextManifest, null, 2) + "\n");
