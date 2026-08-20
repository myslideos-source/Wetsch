import type { Metadata } from "next";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum der ${COMPANY.name}.`,
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <div className="bg-off-white px-5 pb-24 pt-40 md:px-10 md:pt-48">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-extrabold uppercase text-graphite mb-10">
          Impressum
        </h1>

        <div className="space-y-8 text-anthracite/80">
          <section>
            <h2 className="font-display text-xl font-bold uppercase text-graphite mb-2">
              Angaben gemäß § 5 TMG
            </h2>
            <p>
              {COMPANY.name}
              <br />
              {COMPANY.street}
              <br />
              {COMPANY.zip} {COMPANY.city}
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold uppercase text-graphite mb-2">
              Vertreten durch
            </h2>
            <p>[Platzhalter – Name der/des Geschäftsführenden]</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold uppercase text-graphite mb-2">
              Kontakt
            </h2>
            <p>
              Telefon: {COMPANY.phone}
              <br />
              Telefax: {COMPANY.fax}
              <br />
              E-Mail: [Platzhalter]
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold uppercase text-graphite mb-2">
              Registereintrag
            </h2>
            <p>
              Eintragung im Handelsregister.
              <br />
              Registergericht: [Platzhalter]
              <br />
              Registernummer: [Platzhalter]
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold uppercase text-graphite mb-2">
              Umsatzsteuer-ID
            </h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
              <br />
              [Platzhalter]
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold uppercase text-graphite mb-2">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p>[Platzhalter]</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold uppercase text-graphite mb-2">
              EU-Streitschlichtung
            </h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
              bereit. Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit
              oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
