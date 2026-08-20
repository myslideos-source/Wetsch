import { MapPin, Phone, Printer } from "lucide-react";
import Button from "@/components/ui/Button";
import QuoteForm from "@/components/sections/QuoteForm";
import { COMPANY } from "@/lib/constants";

export default function Contact() {
  return (
    <section id="kontakt" className="bg-off-white px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 max-w-2xl">
          <p className="label-technical text-xs text-accent mb-4">Kontakt</p>
          <h2 className="font-display font-extrabold uppercase leading-[0.92] text-graphite text-[clamp(2.4rem,6vw,4.5rem)]">
            Ihr Projekt beginnt
            <br />
            mit einem Gespräch.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="rounded-3xl bg-graphite p-8 text-off-white md:p-10">
              <p className="font-display text-2xl font-bold uppercase">{COMPANY.name}</p>
              <ul className="mt-6 space-y-4 text-off-white/80">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-accent-vivid" aria-hidden />
                  <span>
                    {COMPANY.street}
                    <br />
                    {COMPANY.zip} {COMPANY.city}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="shrink-0 text-accent-vivid" aria-hidden />
                  {COMPANY.phone}
                </li>
                <li className="flex items-center gap-3">
                  <Printer size={18} className="shrink-0 text-accent-vivid" aria-hidden />
                  {COMPANY.fax}
                </li>
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                <Button href={`tel:${COMPANY.phoneHref}`} size="lg" className="w-full">
                  Jetzt anrufen
                </Button>
                <Button
                  href={`https://www.google.com/maps/search/?api=1&query=${COMPANY.mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline-light"
                  size="lg"
                  className="w-full"
                >
                  Route öffnen
                </Button>
              </div>

              <p className="mt-8 inline-flex items-center gap-2 text-xs label-technical text-accent-vivid">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" aria-hidden />
                {COMPANY.status}
              </p>
            </div>
          </div>

          <div className="md:col-span-7">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
