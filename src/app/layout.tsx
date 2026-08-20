import type { Metadata, Viewport } from "next";
import { Big_Shoulders, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import { COMPANY } from "@/lib/constants";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileContactBar from "@/components/layout/MobileContactBar";
import CustomCursor from "@/components/layout/CustomCursor";

const shoulders = Big_Shoulders({
  variable: "--font-shoulders",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = "https://www.wetsch-bau.de";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${COMPANY.name} | Bauunternehmen Dinkelsbühl`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    "Wetsch GmbH & Co. KG aus Dinkelsbühl – Bauunternehmen für Hausbau, Außenanlagen, Pflasterarbeiten, Abbruch, Innenausbau und mehr. Jetzt Projekt anfragen.",
  keywords: [
    "Bauunternehmen Dinkelsbühl",
    "Pflasterarbeiten Dinkelsbühl",
    "Abbruchunternehmen Dinkelsbühl",
    "Außenanlagen Dinkelsbühl",
    "Hausbau Dinkelsbühl",
    "Trockenbau Dinkelsbühl",
    "Bauschuttentsorgung Dinkelsbühl",
  ],
  authors: [{ name: COMPANY.name }],
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: COMPANY.name,
    title: `${COMPANY.name} | Bauunternehmen Dinkelsbühl`,
    description:
      "Bauprojekte aus Dinkelsbühl – von Erdarbeiten und Außenanlagen bis zum fertigen Zuhause.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.name} | Bauunternehmen Dinkelsbühl`,
    description:
      "Bauprojekte aus Dinkelsbühl – von Erdarbeiten und Außenanlagen bis zum fertigen Zuhause.",
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1a18",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["GeneralContractor", "HomeAndConstructionBusiness"],
  "@id": `${siteUrl}/#business`,
  name: COMPANY.name,
  image: `${siteUrl}/og-image.jpg`,
  url: siteUrl,
  telephone: `+${COMPANY.phoneHref.replace("+", "")}`,
  faxNumber: COMPANY.fax,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.street,
    addressLocality: COMPANY.city,
    postalCode: COMPANY.zip,
    addressCountry: "DE",
  },
  areaServed: {
    "@type": "City",
    name: "Dinkelsbühl",
  },
  priceRange: "€€",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "[Platzhalter]",
      closes: "[Platzhalter]",
    },
  ],
  makesOffer: [
    "Abbrucharbeiten",
    "Außenanlagen",
    "Bauschuttentsorgung",
    "Fertighausbau",
    "Hausbau",
    "Innenausbau",
    "Pflasterarbeiten",
    "Trockenbau",
  ].map((name) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name,
    },
  })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${shoulders.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-off-white text-graphite font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CustomCursor />
        <Header />
        <main className="flex-1 pb-20 lg:pb-0">{children}</main>
        <Footer />
        <MobileContactBar />
      </body>
    </html>
  );
}
