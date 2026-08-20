#!/usr/bin/env node
// Lädt die kuratierten Demo-/Beispielbilder von Pexels in public/images.
// Ausführen mit: npm run images:download
//
// Alle Fotos stammen von Pexels (https://www.pexels.com) und stehen unter der
// Pexels-Lizenz (freie kommerzielle Nutzung ohne Namensnennung):
// https://www.pexels.com/license/
// Die jeweilige Quell-URL steht zu Referenzzwecken in image-sources.json.
//
// Dieses Sandbox-/CI-Environment kann pexels.com evtl. nicht erreichen
// (Netzwerk-Policy) – das Skript ist für die lokale Ausführung mit normalem
// Internetzugang gedacht.

import { readFile, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const publicImagesDir = path.join(rootDir, "public", "images");

const sources = JSON.parse(
  await readFile(path.join(__dirname, "image-sources.json"), "utf-8")
);

function pexelsDownloadUrl(id) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1920`;
}

async function downloadOne(entry) {
  const dest = path.join(publicImagesDir, entry.file);
  await mkdir(path.dirname(dest), { recursive: true });

  const url = pexelsDownloadUrl(entry.pexelsId);
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; wetsch-image-setup/1.0)" },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} für ${url}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buffer);
  return { dest, size: buffer.length };
}

async function main() {
  console.log(`Lade ${sources.length} Demo-Bilder von Pexels herunter …\n`);

  let ok = 0;
  let failed = 0;

  for (const entry of sources) {
    const dest = path.join(publicImagesDir, entry.file);
    if (existsSync(dest)) {
      console.log(`✓ übersprungen (existiert bereits): ${entry.file}`);
      ok++;
      continue;
    }
    try {
      const { size } = await downloadOne(entry);
      console.log(`✓ ${entry.file} (${(size / 1024).toFixed(0)} KB)`);
      ok++;
    } catch (err) {
      console.error(`✗ ${entry.file}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n${ok} von ${sources.length} Bildern bereit.`);
  if (failed > 0) {
    console.log(
      `${failed} fehlgeschlagen – bitte Internetverbindung prüfen und erneut ausführen (bereits geladene Dateien werden übersprungen).`
    );
    process.exitCode = 1;
  } else {
    console.log("Als Nächstes: npm run images:manifest");
  }
}

main();
