"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="ueber-uns" className="bg-off-white px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <p className="label-technical text-xs text-accent mb-4">Über uns</p>
            <h2 className="font-display font-extrabold uppercase leading-[0.95] text-graphite text-[clamp(2.2rem,5.5vw,4.25rem)]">
              Wir bauen nicht für den
              <br />
              nächsten Sommer.
              <br />
              <span className="text-accent">Wir bauen für die</span>
              <br />
              <span className="text-accent">nächsten Jahrzehnte.</span>
            </h2>
          </div>

          <div className="md:col-span-5 md:pt-3">
            <svg width="100%" height="2" viewBox="0 0 400 2" className="mb-8 hidden md:block">
              <motion.line
                x1="0"
                y1="1"
                x2="400"
                y2="1"
                stroke="#e8642a"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
              />
            </svg>
            <p className="text-lg text-anthracite/80">
              Wetsch steht für solides Bauhandwerk aus der Region Dinkelsbühl.
            </p>
            <p className="mt-4 text-anthracite/70">
              Von Erdarbeiten und Abbruch über Hausbau und Innenausbau bis zur fertigen
              Außenanlage begleiten wir Projekte zuverlässig von Anfang bis Ende.
            </p>
            <ul className="mt-8 space-y-3">
              {["Klare Kommunikation.", "Saubere Arbeit.", "Lösungen, die funktionieren."].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3 text-graphite">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span className="font-medium">{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
