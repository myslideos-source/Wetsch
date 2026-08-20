import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import DemoImage from "@/components/ui/DemoImage";
import { COMPANY, SERVICES } from "@/lib/constants";

const SERVICE_HERO_GRADIENT = "linear-gradient(135deg,#2a2a27,#4a4640)";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/leistungen/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: { canonical: `/leistungen/${service.slug}` },
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription,
    },
  };
}

export default async function ServicePage({ params }: PageProps<"/leistungen/[slug]">) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.slug !== service.slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Start", item: "https://www.wetsch-bau.de/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Leistungen",
        item: "https://www.wetsch-bau.de/#leistungen",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `https://www.wetsch-bau.de/leistungen/${service.slug}`,
      },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "GeneralContractor",
      name: COMPANY.name,
    },
    areaServed: "Dinkelsbühl",
  };

  return (
    <div className="bg-off-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <section className="relative overflow-hidden bg-graphite px-5 pb-16 pt-40 text-off-white md:px-10 md:pb-24 md:pt-48">
        <DemoImage
          src={service.image.src}
          alt={service.image.alt}
          fallbackGradient={SERVICE_HERO_GRADIENT}
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/85 to-graphite/40" />
        <div className="relative mx-auto max-w-[1400px]">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-off-white/50">
            <Link href="/" className="hover:text-accent-vivid">
              Start
            </Link>
            <span aria-hidden>/</span>
            <Link href="/#leistungen" className="hover:text-accent-vivid">
              Leistungen
            </Link>
            <span aria-hidden>/</span>
            <span className="text-off-white/80">{service.title}</span>
          </nav>

          <p className="label-technical text-xs text-accent-vivid mb-4">{service.index} · Leistung</p>
          <h1 className="font-display font-extrabold uppercase leading-[0.92] text-[clamp(2.6rem,7vw,5.5rem)]">
            {service.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-off-white/80">{service.description}</p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/#kontakt" size="lg">
              Projekt anfragen
            </Button>
            <Button href={`tel:${COMPANY.phoneHref}`} variant="outline-light" size="lg">
              {COMPANY.phone}
            </Button>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <p className="label-technical text-xs text-accent mb-4">{service.keyword}</p>
          <h2 className="font-display text-3xl font-bold uppercase text-graphite mb-6 md:text-4xl">
            {service.title} aus Dinkelsbühl
          </h2>
          <p className="max-w-2xl text-anthracite/70">
            Wetsch GmbH &amp; Co. KG übernimmt {service.title.toLowerCase()} für Projekte in
            Dinkelsbühl und der umliegenden Region. Vom ersten Vor-Ort-Termin bis zur Übergabe
            koordinieren wir alle notwendigen Schritte und sprechen offen über Aufwand, Ablauf
            und Kosten.
          </p>

          <div className="mt-14">
            <h3 className="label-technical text-xs text-anthracite/50 mb-6">Weitere Leistungen</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
              {others.map((s) => (
                <Link
                  key={s.slug}
                  href={`/leistungen/${s.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-anthracite/10 px-5 py-4 transition-colors hover:border-accent"
                >
                  <span className="font-medium text-graphite">{s.title}</span>
                  <ArrowUpRight
                    size={16}
                    className="text-anthracite/30 transition-colors group-hover:text-accent"
                    aria-hidden
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <Link
              href="/#kontakt"
              className="inline-flex items-center gap-2 font-display text-2xl font-bold uppercase text-graphite hover:text-accent"
            >
              Projekt jetzt anfragen <ArrowRight size={22} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
