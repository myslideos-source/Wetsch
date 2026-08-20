"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export default function MobileContactBar() {
  const pathname = usePathname();
  const kontaktHref = pathname === "/" ? "#kontakt" : "/#kontakt";

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 flex lg:hidden border-t border-anthracite/10 bg-off-white/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]"
      role="region"
      aria-label="Schnellkontakt"
    >
      <a
        href={`tel:${COMPANY.phoneHref}`}
        className="flex flex-1 items-center justify-center gap-2 py-4 text-sm font-medium uppercase tracking-wide text-graphite border-r border-anthracite/10 min-h-[44px]"
      >
        <Phone size={18} aria-hidden />
        Anrufen
      </a>
      <Link
        href={kontaktHref}
        className="flex flex-1 items-center justify-center gap-2 bg-accent py-4 text-sm font-semibold uppercase tracking-wide text-off-white min-h-[44px]"
      >
        Projekt anfragen
      </Link>
    </div>
  );
}
