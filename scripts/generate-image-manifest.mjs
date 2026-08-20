#!/usr/bin/env node
// Erzeugt aus den Dateien in public/images ein Manifest mit Bildmaßen und
// Base64-Blur-Placeholdern für next/image (placeholder="blur").
// Ausführen mit: npm run images:manifest
//
// Bilder, die noch nicht heruntergeladen wurden, tauchen im Manifest nicht
// auf – die Komponenten fallen dann automatisch auf die gestaltete
// Platzhalter-Optik zurück (siehe src/components/ui/DemoImage.tsx).

import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const publicImagesDir = path.join(rootDir, "public", "images");
const outFile = path.join(rootDir, "src", "lib", "image-manifest.json");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  let files = [];
  try {
    files = await walk(publicImagesDir);
  } catch {
    files = [];
  }

  const manifest = {};

  for (const file of files) {
    const relativeToPublic = "/" + path.relative(path.join(rootDir, "public"), file).split(path.sep).join("/");
    try {
      const buffer = await readFile(file);
      const image = sharp(buffer);
      const metadata = await image.metadata();
      const blurBuffer = await image
        .clone()
        .resize(20)
        .jpeg({ quality: 40 })
        .toBuffer();

      manifest[relativeToPublic] = {
        width: metadata.width ?? 1600,
        height: metadata.height ?? 1000,
        blurDataURL: `data:image/jpeg;base64,${blurBuffer.toString("base64")}`,
      };
      console.log(`✓ ${relativeToPublic}`);
    } catch (err) {
      console.error(`✗ ${relativeToPublic}: ${err.message}`);
    }
  }

  await writeFile(outFile, JSON.stringify(manifest, null, 2) + "\n");
  console.log(
    `\nManifest geschrieben: ${path.relative(rootDir, outFile)} (${Object.keys(manifest).length} Bilder)`
  );
}

main();
