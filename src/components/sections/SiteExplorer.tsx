"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HardHat, Plus, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { HOTSPOTS } from "@/lib/constants";

export default function SiteExplorer() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const activeHotspot = HOTSPOTS.find((h) => h.id === active);

  return (
    <section className="bg-off-white px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="label-technical text-xs text-accent mb-4">Baustellen-Modus</p>
          <h2 className="font-display font-extrabold uppercase leading-[0.92] text-graphite text-[clamp(2.4rem,5.5vw,4rem)]">
            Sehen, was
            <br />
            wir wirklich tun.
          </h2>
          <p className="mt-6 max-w-md text-anthracite/70">
            Entdecken Sie interaktiv, welche Arbeiten auf einer typischen Wetsch-Baustelle
            zusammenkommen – von den ersten Erdarbeiten bis zur Entsorgung.
          </p>
          <div className="mt-8">
            <Button
              onClick={() => setOpen(true)}
              size="lg"
              className="!bg-graphite hover:!bg-black"
            >
              <HardHat size={18} aria-hidden /> Baustelle entdecken
            </Button>
          </div>
        </div>

        <div className="md:col-span-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group relative block aspect-[4/3] w-full overflow-hidden rounded-3xl"
            aria-label="Baustellen-Modus öffnen"
          >
            <SiteScene />
            <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0" />
            {HOTSPOTS.slice(0, 4).map((h) => (
              <span
                key={h.id}
                className="absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-xs font-semibold text-off-white shadow-lg"
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
                aria-hidden
              >
                {h.id}
              </span>
            ))}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 md:p-10"
            role="dialog"
            aria-modal="true"
            aria-label="Baustellen-Modus"
            onClick={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-anthracite"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-off-white/10 text-off-white hover:bg-off-white/20"
                aria-label="Schließen"
              >
                <X size={20} aria-hidden />
              </button>

              <div className="relative aspect-[4/3] w-full">
                <SiteScene />

                {HOTSPOTS.map((h) => (
                  <div
                    key={h.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  >
                    <button
                      type="button"
                      onClick={() => setActive(active === h.id ? null : h.id)}
                      className="relative flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-off-white shadow-lg"
                      aria-expanded={active === h.id}
                      aria-label={`${h.id} ${h.label}`}
                    >
                      <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-40" aria-hidden />
                      <span className="relative">
                        {active === h.id ? <Plus size={16} className="rotate-45" /> : h.id}
                      </span>
                    </button>
                  </div>
                ))}
              </div>

              <div className="min-h-[92px] border-t border-off-white/10 p-6 md:p-8">
                <AnimatePresence mode="wait">
                  {activeHotspot ? (
                    <motion.div
                      key={activeHotspot.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="label-technical text-xs text-accent-vivid mb-1">
                        {activeHotspot.id} · {activeHotspot.label}
                      </p>
                      <p className="text-off-white/85">{activeHotspot.text}</p>
                    </motion.div>
                  ) : (
                    <p className="text-off-white/50">
                      Tippen Sie auf einen Punkt, um mehr über die jeweilige Leistung zu erfahren.
                    </p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function SiteScene() {
  return (
    <div
      className="absolute inset-0"
      style={{ background: "linear-gradient(160deg,#2a2a27,#1a1a18 70%)" }}
      aria-hidden
    >
      <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMax slice">
        <rect x="0" y="230" width="400" height="70" fill="#3a3733" />
        <path d="M40 230 L110 230 L130 260 L20 260 Z" fill="#5c574e" />
        <rect x="150" y="150" width="120" height="80" fill="#c9c6bf" opacity="0.9" />
        <path d="M150 150 L210 110 L270 150 Z" fill="#e8642a" />
        <rect x="300" y="60" width="4" height="170" fill="#a7a49b" />
        <line x1="302" y1="60" x2="360" y2="70" stroke="#a7a49b" strokeWidth="3" />
        <line x1="355" y1="72" x2="355" y2="120" stroke="#a7a49b" strokeWidth="2" />
        <rect x="60" y="245" width="34" height="20" rx="2" fill="#e8642a" opacity="0.85" />
        <circle cx="200" cy="255" r="10" fill="#3a3733" />
      </svg>
    </div>
  );
}
