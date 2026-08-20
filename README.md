# Wetsch GmbH & Co. KG — Website

Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion.

## Entwicklung

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
npm run lint
```

## Struktur

- `src/app` — Routen (Startseite, `/leistungen/[slug]`, `/impressum`, `/datenschutz`, `sitemap.ts`, `robots.ts`, `api/contact`)
- `src/components/sections` — Seitenabschnitte (Hero, ConstructionStory, Services, Projects, SiteExplorer, Calculators, Configurator, About, Stats, Process, Testimonials, FAQ, Contact, QuoteForm)
- `src/components/calculators` — Material-, Pflaster- und Entsorgungsrechner
- `src/components/layout` — Header, Footer, MobileContactBar, CustomCursor
- `src/components/ui` — wiederverwendbare Bausteine (Button, SelectCard, BeforeAfterSlider, AnimatedNumber, DemoImage, DemoBadge)
- `src/lib/constants.ts` — Unternehmensdaten, Leistungen, Projekte, FAQ, Stats, Bildpfade
- `src/lib/calculators.ts` — Rechenlogik der drei Rechner

## Bildmaterial einrichten

Hero, alle 9 Leistungen, 8 Demo-Projekte und 2 Vorher/Nachher-Paare sind auf
kuratierte, lizenzfreie Pexels-Fotos vorbereitet (Liste inkl. Quell-URLs in
`scripts/image-sources.json`). Dieses Sandbox-Environment kann pexels.com aus
Netzwerkrichtlinien-Gründen nicht erreichen – die Bilder daher lokal (mit
normalem Internetzugang) herunterladen:

```bash
npm run images:setup   # lädt Bilder + erzeugt Blur-Placeholder-Manifest
```

Das entspricht `npm run images:download` (Dateien nach `public/images/…`)
gefolgt von `npm run images:manifest` (erzeugt `src/lib/image-manifest.json`
mit Maßen und Blur-Placeholdern via `sharp`). Danach `public/images` und die
aktualisierte `image-manifest.json` committen.

Solange keine Bilder vorliegen, rendern alle Komponenten automatisch die
gestaltete Verlaufs-Optik als Platzhalter (`DemoImage`-Fallback) – die Seite
ist also jederzeit ohne Bilder lauffähig.

## Offene Platzhalter

Mit `[Platzhalter]` gekennzeichnete Inhalte (Gründungsjahr, Projektzahlen, Kundenbewertungen, Impressum-Pflichtangaben) sind bewusst nicht erfunden und müssen vor dem Launch durch reale Unternehmensdaten ersetzt werden — siehe `src/lib/constants.ts`, `src/app/impressum/page.tsx` und `src/app/datenschutz/page.tsx`.

Die Projekte und Vorher/Nachher-Paare sind mit lizenzierten Pexels-Beispielbildern visualisierte Demo-Referenzen (sichtbar mit „Beispielprojekt“/„Visualisierung“ gekennzeichnet, `isDemo: true` im Code) und keine tatsächlich von Wetsch ausgeführten Projekte. Sobald echte Fotos vorliegen, einfach die Dateien unter `public/images/…` austauschen (gleicher Dateiname) oder die Pfade in `src/lib/constants.ts` anpassen und `npm run images:manifest` erneut ausführen.
