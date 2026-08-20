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
- `src/components/ui` — wiederverwendbare Bausteine (Button, SelectCard, BeforeAfterSlider, AnimatedNumber)
- `src/lib/constants.ts` — Unternehmensdaten, Leistungen, Projekte, FAQ, Stats
- `src/lib/calculators.ts` — Rechenlogik der drei Rechner

## Offene Platzhalter

Mit `[Platzhalter]` gekennzeichnete Inhalte (Gründungsjahr, Projektzahlen, Kundenbewertungen, Impressum-Pflichtangaben, echte Projektfotos/-videos) sind bewusst nicht erfunden und müssen vor dem Launch durch reale Unternehmensdaten ersetzt werden — siehe `src/lib/constants.ts`, `src/app/impressum/page.tsx` und `src/app/datenschutz/page.tsx`.

Die visuellen Platzhalter für Baustellenfotos/-videos (Hero-Hintergrund, Projektkarten, Leistungs-Panels) sind bewusst gestaltete, abstrakte Verläufe/Illustrationen im Marken-Look — sie sollten durch echtes Bild-/Videomaterial ersetzt werden, sobald dieses vorliegt.
