import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = "public/gallery";
const VARIANTS = [
  { dir: "thumb", width: 600, quality: 75 },
  { dir: "full", width: 1600, quality: 80 },
];

const files = (await readdir(SRC_DIR)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));

await Promise.all(VARIANTS.map((v) => mkdir(path.join(SRC_DIR, v.dir), { recursive: true })));

await Promise.all(
  files.flatMap((file) =>
    VARIANTS.map(async (v) => {
      const src = path.join(SRC_DIR, file);
      const out = path.join(SRC_DIR, v.dir, file.replace(/\.[^.]+$/, ".webp"));
      const [srcStat, outStat] = await Promise.all([stat(src), stat(out).catch(() => null)]);
      if (outStat && outStat.mtimeMs >= srcStat.mtimeMs) return;

      await sharp(src)
        .rotate()
        .resize({ width: v.width, withoutEnlargement: true })
        .webp({ quality: v.quality })
        .toFile(out);
      console.log(`optimized ${out}`);
    })
  )
);
