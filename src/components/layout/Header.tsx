"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const hrefFor = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-off-white/85 backdrop-blur-md border-b border-anthracite/10 py-3"
            : "bg-transparent py-6"
        )}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 md:px-10">
          <Link
            href="/"
            className={cn(
              "font-display font-extrabold tracking-tight transition-colors",
              scrolled ? "text-graphite" : "text-off-white",
              "text-2xl md:text-3xl"
            )}
            aria-label="Wetsch GmbH & Co. KG – Startseite"
          >
            WETSCH<span className={scrolled ? "text-accent" : "text-accent-vivid"}>.</span>
          </Link>

          <nav
            className={cn(
              "hidden lg:flex items-center gap-8 label-technical text-xs transition-colors",
              scrolled ? "text-anthracite" : "text-off-white/90"
            )}
            aria-label="Hauptnavigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={hrefFor(link.href)}
                className={cn(
                  "relative py-1 transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:transition-all hover:after:w-full",
                  scrolled
                    ? "hover:text-accent after:bg-accent"
                    : "hover:text-accent-vivid after:bg-accent-vivid"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${COMPANY.phoneHref}`}
              className={cn(
                "hidden sm:inline-flex items-center gap-2 text-sm font-medium transition-colors",
                scrolled ? "text-anthracite hover:text-accent" : "text-off-white hover:text-accent-vivid"
              )}
              aria-label={`Anrufen: ${COMPANY.phone}`}
            >
              <Phone size={16} aria-hidden />
              {COMPANY.phone}
            </a>
            <a
              href={`tel:${COMPANY.phoneHref}`}
              className={cn(
                "sm:hidden flex h-11 w-11 items-center justify-center rounded-full transition-colors",
                scrolled ? "bg-graphite text-off-white" : "bg-off-white/15 text-off-white"
              )}
              aria-label={`Anrufen: ${COMPANY.phone}`}
            >
              <Phone size={18} aria-hidden />
            </a>
            <div className="hidden md:block">
              <Button href={hrefFor("#kontakt")} size="md">
                Projekt anfragen
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden",
                scrolled ? "bg-graphite text-off-white" : "bg-off-white/15 text-off-white"
              )}
              aria-label="Menü öffnen"
              aria-expanded={menuOpen}
            >
              <Menu size={20} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-graphite text-off-white flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className="flex items-center justify-between px-5 py-6">
              <span className="font-display text-2xl font-extrabold">
                WETSCH<span className="text-accent-vivid">.</span>
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-off-white/10"
                aria-label="Menü schließen"
              >
                <X size={20} aria-hidden />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-8" aria-label="Mobile Hauptnavigation">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  <Link
                    href={hrefFor(link.href)}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 font-display text-4xl font-bold uppercase tracking-tight hover:text-accent-vivid transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="flex flex-col gap-4 px-8 pb-10">
              <a
                href={`tel:${COMPANY.phoneHref}`}
                className="flex items-center gap-3 text-lg font-medium"
              >
                <Phone size={20} aria-hidden /> {COMPANY.phone}
              </a>
              <Button href={hrefFor("#kontakt")} onClick={() => setMenuOpen(false)} size="lg" className="w-full">
                Projekt anfragen
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
