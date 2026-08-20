import type { Metadata } from "next";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: `Datenschutzerklärung der ${COMPANY.name}.`,
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <div className="bg-off-white px-5 pb-24 pt-40 md:px-10 md:pt-48">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-extrabold uppercase text-graphite mb-10">
          Datenschutzerklärung
        </h1>

        <div className="space-y-8 text-anthracite/80">
          <section>
            <h2 className="font-display text-xl font-bold uppercase text-graphite mb-2">
              1. Verantwortliche Stelle
            </h2>
            <p>
              {COMPANY.name}
              <br />
              {COMPANY.street}
              <br />
              {COMPANY.zip} {COMPANY.city}
              <br />
              Telefon: {COMPANY.phone}
              <br />
              E-Mail: [Platzhalter]
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold uppercase text-graphite mb-2">
              2. Hosting
            </h2>
            <p>
              Diese Website wird bei einem externen Dienstleister gehostet. Anbieter:
              [Platzhalter]. Personenbezogene Daten, die auf dieser Website erfasst werden,
              werden auf den Servern des Hosters verarbeitet.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold uppercase text-graphite mb-2">
              3. Kontakt- und Anfrageformular
            </h2>
            <p>
              Wenn Sie uns über das Anfrageformular kontaktieren, werden die von Ihnen
              angegebenen Daten (u. a. Name, Kontaktdaten, Projektangaben und optional
              hochgeladene Fotos) zum Zweck der Bearbeitung Ihrer Anfrage und für den Fall
              sich anschließender Fragen bei uns gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1
              lit. b DSGVO, sofern die Anfrage der Vorbereitung eines Vertrags dient, andernfalls
              Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Bearbeitung von
              Anfragen).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold uppercase text-graphite mb-2">
              4. Rechner &amp; Konfiguratoren
            </h2>
            <p>
              Die auf dieser Website angebotenen Rechner (Material-, Pflaster- und
              Entsorgungsrechner) sowie der Projekt-Konfigurator führen Berechnungen
              ausschließlich lokal in Ihrem Browser durch. Die eingegebenen Werte werden erst
              dann an uns übermittelt, wenn Sie darüber aktiv ein Angebot anfordern.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold uppercase text-graphite mb-2">
              5. Cookies
            </h2>
            <p>
              Diese Website verwendet nur technisch notwendige Funktionen ohne Tracking- oder
              Marketing-Cookies. Sollten künftig Analyse- oder Marketingdienste eingesetzt
              werden, wird diese Erklärung entsprechend ergänzt und – soweit erforderlich – eine
              Einwilligung eingeholt.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold uppercase text-graphite mb-2">
              6. Ihre Rechte
            </h2>
            <p>
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
              Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen die Verarbeitung Ihrer
              personenbezogenen Daten. Wenden Sie sich hierzu an die oben genannte
              verantwortliche Stelle.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold uppercase text-graphite mb-2">
              7. Beschwerderecht
            </h2>
            <p>
              Ihnen steht zudem ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde zu,
              z. B. bei der zuständigen Aufsichtsbehörde des Bundeslandes Bayern.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
