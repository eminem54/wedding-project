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

await writeFile(MANIFEST, JSON.stringify(nextManifest, null, 2) + "\n");
