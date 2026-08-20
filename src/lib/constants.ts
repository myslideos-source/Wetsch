// Zentrale Unternehmens- und Inhaltsdaten für die Wetsch GmbH & Co. KG Website.
// Unbekannte Werte werden bewusst als [Platzhalter] gekennzeichnet statt erfunden.

export const COMPANY = {
  name: "Wetsch GmbH & Co. KG",
  shortName: "Wetsch",
  street: "Sittlingen 17",
  zip: "91550",
  city: "Dinkelsbühl",
  region: "Dinkelsbühl",
  phone: "09851 1730",
  phoneHref: "+4998511730",
  fax: "09851 553748",
  status: "Aktuell offen für neue Aufträge",
  addressFull: "Sittlingen 17, 91550 Dinkelsbühl",
  mapsQuery: "Sittlingen+17+91550+Dinkelsbühl",
} as const;

export const NAV_LINKS = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Projekte", href: "#projekte" },
  { label: "Rechner", href: "#rechner" },
  { label: "Ablauf", href: "#ablauf" },
  { label: "Über uns", href: "#ueber-uns" },
  { label: "Kontakt", href: "#kontakt" },
] as const;

export type ServiceSlug =
  | "abbrucharbeiten"
  | "aussenanlagen"
  | "bauschuttentsorgung"
  | "fertighausbau"
  | "hausbau"
  | "immobilienverkauf"
  | "innenausbau"
  | "pflasterarbeiten"
  | "trockenbau";

export interface Service {
  index: string;
  slug: ServiceSlug;
  title: string;
  short: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  keyword: string;
}

export const SERVICES: Service[] = [
  {
    index: "01",
    slug: "abbrucharbeiten",
    title: "Abbrucharbeiten",
    short: "Rückbau, Entkernung und fachgerechte Entsorgung.",
    description:
      "Vom kompletten Gebäudeabbruch bis zur gezielten Entkernung: Wir planen den Rückbau so, dass Statik, Nachbarschaft und Entsorgungswege von Anfang an mitgedacht sind.",
    seoTitle: "Abbruchunternehmen Dinkelsbühl",
    seoDescription:
      "Abbrucharbeiten in Dinkelsbühl: Rückbau, Entkernung und fachgerechte Entsorgung aus einer Hand. Jetzt Projekt anfragen.",
    keyword: "Abbruchunternehmen Dinkelsbühl",
  },
  {
    index: "02",
    slug: "aussenanlagen",
    title: "Außenanlagen",
    short: "Von Erdarbeiten bis zur fertigen Einfahrt.",
    description:
      "Erdarbeiten, Entwässerung, Pflaster und Bepflanzung – wir bauen Außenanlagen, die auch nach Jahren noch tragen, entwässern und funktionieren.",
    seoTitle: "Außenanlagen Dinkelsbühl",
    seoDescription:
      "Außenanlagen in Dinkelsbühl: Erdarbeiten, Entwässerung und Pflasterflächen aus einer Hand. Jetzt Projekt anfragen.",
    keyword: "Außenanlagen Dinkelsbühl",
  },
  {
    index: "03",
    slug: "bauschuttentsorgung",
    title: "Bauschuttentsorgung",
    short: "Saubere Trennung, korrekte Entsorgungswege.",
    description:
      "Bauschutt, Beton, Ziegel oder Mischabfall – wir organisieren Container, Trennung und Abtransport nach den geltenden Entsorgungsvorgaben.",
    seoTitle: "Bauschuttentsorgung Dinkelsbühl",
    seoDescription:
      "Bauschuttentsorgung in Dinkelsbühl: Container, Trennung und Abtransport nach geltenden Vorgaben. Jetzt Projekt anfragen.",
    keyword: "Bauschuttentsorgung Dinkelsbühl",
  },
  {
    index: "04",
    slug: "fertighausbau",
    title: "Fertighausbau",
    short: "Bodenplatte, Keller und Anschlussarbeiten.",
    description:
      "Wir übernehmen die Vorbereitung und Baubegleitung für Fertighausprojekte – von Bodenplatte und Keller bis zu Erschließung und Außenanlage.",
    seoTitle: "Fertighausbau Dinkelsbühl",
    seoDescription:
      "Fertighausbau in Dinkelsbühl: Bodenplatte, Keller und Baubegleitung aus einer Hand. Jetzt Projekt anfragen.",
    keyword: "Fertighausbau Dinkelsbühl",
  },
  {
    index: "05",
    slug: "hausbau",
    title: "Hausbau",
    short: "Vom Aushub bis zum schlüsselfertigen Zuhause.",
    description:
      "Erdarbeiten, Rohbau, Ausbau: Wir begleiten Hausbauprojekte über alle Gewerke hinweg – koordiniert, transparent und mit klaren Absprachen.",
    seoTitle: "Hausbau Dinkelsbühl",
    seoDescription:
      "Hausbau in Dinkelsbühl: vom Aushub bis zum schlüsselfertigen Zuhause. Jetzt Projekt anfragen.",
    keyword: "Hausbau Dinkelsbühl",
  },
  {
    index: "06",
    slug: "immobilienverkauf",
    title: "Immobilienverkauf",
    short: "Grundstücke und Objekte aus der Region.",
    description:
      "Wir vermitteln Grundstücke und Bauprojekte aus der Region Dinkelsbühl und beraten zu Lage, Erschließung und baulichen Möglichkeiten.",
    seoTitle: "Immobilien Dinkelsbühl",
    seoDescription:
      "Immobilienverkauf in Dinkelsbühl: Grundstücke und Objekte aus der Region. Jetzt anfragen.",
    keyword: "Immobilien Dinkelsbühl",
  },
  {
    index: "07",
    slug: "innenausbau",
    title: "Innenausbau",
    short: "Wände, Böden, Decken – bezugsfertig.",
    description:
      "Von der Rohbauabnahme bis zur Übergabe: Trockenbau, Böden und Oberflächen, sauber koordiniert mit allen beteiligten Gewerken.",
    seoTitle: "Innenausbau Dinkelsbühl",
    seoDescription:
      "Innenausbau in Dinkelsbühl: Wände, Böden und Decken bezugsfertig ausgebaut. Jetzt Projekt anfragen.",
    keyword: "Innenausbau Dinkelsbühl",
  },
  {
    index: "08",
    slug: "pflasterarbeiten",
    title: "Pflasterarbeiten",
    short: "Präzise Flächen für Einfahrt, Hof und Terrasse.",
    description:
      "Tragfähiger Unterbau, exaktes Gefälle, sauberes Fugenbild: Wir verlegen Pflasterflächen, die Belastung und Witterung dauerhaft standhalten.",
    seoTitle: "Pflasterarbeiten Dinkelsbühl",
    seoDescription:
      "Pflasterarbeiten in Dinkelsbühl: Einfahrten, Höfe und Terrassen fachgerecht gepflastert. Jetzt Projekt anfragen.",
    keyword: "Pflasterarbeiten Dinkelsbühl",
  },
  {
    index: "09",
    slug: "trockenbau",
    title: "Trockenbau",
    short: "Wände, Decken und Dämmung nach Maß.",
    description:
      "Trennwände, abgehängte Decken und Dämmlösungen – flexibel geplant und sauber ausgeführt, für Neubau und Sanierung gleichermaßen.",
    seoTitle: "Trockenbau Dinkelsbühl",
    seoDescription:
      "Trockenbau in Dinkelsbühl: Wände, Decken und Dämmung nach Maß. Jetzt Projekt anfragen.",
    keyword: "Trockenbau Dinkelsbühl",
  },
];

export interface StoryPhase {
  index: string;
  label: string;
}

export const STORY_PHASES: StoryPhase[] = [
  { index: "01", label: "Planung" },
  { index: "02", label: "Erdarbeiten" },
  { index: "03", label: "Rohbau" },
  { index: "04", label: "Ausbau" },
  { index: "05", label: "Außenanlagen" },
  { index: "06", label: "Fertigstellung" },
];

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: "01",
    title: "Anfrage",
    description: "Projekt kurz beschreiben oder Fotos hochladen.",
  },
  {
    index: "02",
    title: "Vor-Ort-Termin",
    description: "Wir sehen uns die Gegebenheiten an.",
  },
  {
    index: "03",
    title: "Planung & Angebot",
    description: "Transparent und nachvollziehbar.",
  },
  {
    index: "04",
    title: "Umsetzung",
    description: "Koordiniert und sauber ausgeführt.",
  },
  {
    index: "05",
    title: "Übergabe",
    description: "Fertig ist fertig.",
  },
];

export interface Project {
  id: string;
  title: string;
  location: string;
  year: string;
  tags: string[];
  size: "large" | "medium" | "small";
  hasBeforeAfter?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "efh-dinkelsbuehl",
    title: "Einfamilienhaus Dinkelsbühl",
    location: "Dinkelsbühl",
    year: "[Platzhalter]",
    tags: ["Hausbau", "Außenanlagen", "Pflasterarbeiten"],
    size: "large",
    hasBeforeAfter: true,
  },
  {
    id: "hofanlage-feuchtwangen",
    title: "Hofanlage Feuchtwangen",
    location: "Feuchtwangen",
    year: "[Platzhalter]",
    tags: ["Erdarbeiten", "Entwässerung", "Pflaster"],
    size: "medium",
  },
  {
    id: "einfahrt-wassertruedingen",
    title: "Einfahrt Wassertrüdingen",
    location: "Wassertrüdingen",
    year: "[Platzhalter]",
    tags: ["Pflasterarbeiten", "Randsteine"],
    size: "small",
    hasBeforeAfter: true,
  },
  {
    id: "innenausbau-dinkelsbuehl",
    title: "Innenausbau Dinkelsbühl",
    location: "Dinkelsbühl",
    year: "[Platzhalter]",
    tags: ["Trockenbau", "Innenausbau"],
    size: "medium",
  },
  {
    id: "abbruch-fichtenau",
    title: "Gebäudeabbruch Fichtenau",
    location: "Fichtenau",
    year: "[Platzhalter]",
    tags: ["Abbrucharbeiten", "Entsorgung"],
    size: "small",
  },
  {
    id: "aussenanlage-dinkelsbuehl",
    title: "Außenanlage Dinkelsbühl",
    location: "Dinkelsbühl",
    year: "[Platzhalter]",
    tags: ["Außenanlagen", "Entwässerung"],
    size: "large",
  },
];

export interface Stat {
  value: string;
  suffix: string;
  label: string;
  isNumber: boolean;
}

export const STATS: Stat[] = [
  { value: "[Platzhalter]", suffix: "", label: "Jahre Erfahrung", isNumber: false },
  { value: "[Platzhalter]", suffix: "", label: "Projekte", isNumber: false },
  { value: "[Platzhalter]", suffix: " km", label: "Regionale Einsatzgebiete", isNumber: false },
  { value: "9", suffix: "", label: "Leistungsbereiche", isNumber: true },
];

export interface Testimonial {
  quote: string;
  author: string;
  isPlaceholder: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "[Platzhalter Kundenbewertung]",
    author: "[Platzhalter]",
    isPlaceholder: true,
  },
  {
    quote: "[Platzhalter Kundenbewertung]",
    author: "[Platzhalter]",
    isPlaceholder: true,
  },
  {
    quote: "[Platzhalter Kundenbewertung]",
    author: "[Platzhalter]",
    isPlaceholder: true,
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Wie schnell bekomme ich ein Angebot?",
    answer:
      "Nach Ihrer Anfrage melden wir uns zeitnah zurück und vereinbaren bei Bedarf einen Vor-Ort-Termin. Je nach Projektumfang folgt Ihr Angebot im Anschluss an die Besichtigung.",
  },
  {
    question: "Welche Regionen bedienen Sie?",
    answer:
      "Wir sind von Dinkelsbühl aus in der Region tätig, unter anderem in Feuchtwangen, Wassertrüdingen und Fichtenau. Sprechen Sie uns bei Ihrem Standort einfach an.",
  },
  {
    question: "Übernehmen Sie komplette Außenanlagen?",
    answer:
      "Ja. Von Erdarbeiten und Entwässerung über den Unterbau bis zur fertigen Pflasterfläche planen und bauen wir Außenanlagen als Gesamtprojekt.",
  },
  {
    question: "Kann ich nur einzelne Arbeiten beauftragen?",
    answer:
      "Ja. Sie können einzelne Gewerke wie Pflasterarbeiten oder Abbruch beauftragen oder ein komplettes Bauprojekt aus einer Hand umsetzen lassen.",
  },
  {
    question: "Übernehmen Sie auch die Entsorgung?",
    answer:
      "Ja, Bauschutt, Beton, Ziegel, Erde und Mischabfall organisieren wir inklusive Container und Abtransport nach den geltenden Entsorgungsvorgaben.",
  },
  {
    question: "Kann ich Bilder meiner Baustelle senden?",
    answer:
      "Ja. Im Anfrageformular können Sie Fotos direkt vom Smartphone hochladen oder fotografieren – das hilft uns bei der ersten Einschätzung.",
  },
  {
    question: "Wie früh sollte ich mein Projekt anfragen?",
    answer:
      "Je früher, desto besser für die Terminplanung. Bei größeren Projekten empfehlen wir eine Anfrage mehrere Monate vor dem geplanten Baustart.",
  },
];

export const HOTSPOTS = [
  {
    id: 1,
    label: "Erdarbeiten",
    x: 18,
    y: 62,
    text: "Aushub, Planum und Bodenvorbereitung für Fundament und Außenanlage.",
  },
  {
    id: 2,
    label: "Entwässerung",
    x: 34,
    y: 74,
    text: "Drainagen, Rohrleitungen und Gefälle für zuverlässigen Wasserabfluss.",
  },
  {
    id: 3,
    label: "Rohbau",
    x: 52,
    y: 40,
    text: "Fundament, Wände und tragende Bauteile bis zur Rohbauabnahme.",
  },
  {
    id: 4,
    label: "Außenanlage",
    x: 74,
    y: 66,
    text: "Geländemodellierung, Wege und Flächen rund um das Gebäude.",
  },
  {
    id: 5,
    label: "Pflaster",
    x: 66,
    y: 84,
    text: "Unterbau und Verlegung von Einfahrten, Höfen und Terrassenflächen.",
  },
  {
    id: 6,
    label: "Entsorgung",
    x: 86,
    y: 46,
    text: "Container, Trennung und fachgerechter Abtransport von Bauabfällen.",
  },
] as const;
