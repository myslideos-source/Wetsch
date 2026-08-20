import Link from "next/link";
import { Phone, Printer, MapPin } from "lucide-react";
import { COMPANY, NAV_LINKS, SERVICES } from "@/lib/constants";

export default function Footer() {
  return (
    <footer id="kontakt-footer" className="bg-graphite text-off-white">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="font-display text-4xl font-extrabold tracking-tight">
              WETSCH<span className="text-accent-vivid">.</span>
            </span>
            <p className="mt-6 max-w-sm text-off-white/70">
              Solides Bauhandwerk aus der Region Dinkelsbühl – von Erdarbeiten und Abbruch bis
              zum fertigen Zuhause.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 text-xs label-technical text-accent-vivid">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" aria-hidden />
              {COMPANY.status}
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="label-technical text-xs text-off-white/50 mb-5">Leistungen</h3>
            <ul className="space-y-3 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/leistungen/${s.slug}`}
                    className="text-off-white/80 hover:text-accent-vivid transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="label-technical text-xs text-off-white/50 mb-5">Navigation</h3>
            <ul className="space-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={`/${link.href}`} className="text-off-white/80 hover:text-accent-vivid transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="label-technical text-xs text-off-white/50 mb-5">Kontakt</h3>
            <ul className="space-y-3 text-sm text-off-white/80">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent-vivid" aria-hidden />
                <span>
                  {COMPANY.street}
                  <br />
                  {COMPANY.zip} {COMPANY.city}
                </span>
              </li>
              <li>
                <a href={`tel:${COMPANY.phoneHref}`} className="flex items-center gap-2 hover:text-accent-vivid transition-colors">
                  <Phone size={16} className="text-accent-vivid" aria-hidden /> {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Printer size={16} className="text-accent-vivid" aria-hidden /> {COMPANY.fax}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-off-white/10 pt-8 text-xs text-off-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            <Link href="/impressum" className="hover:text-accent-vivid transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-accent-vivid transition-colors">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
