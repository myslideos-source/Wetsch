"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import MaterialCalculator from "@/components/calculators/MaterialCalculator";
import PavingCalculator from "@/components/calculators/PavingCalculator";
import WasteCalculator from "@/components/calculators/WasteCalculator";

const TABS = [
  { id: "material", label: "Material", headline: "Wie viel Material brauche ich?" },
  { id: "pflaster", label: "Pflaster", headline: "Was kostet meine Einfahrt?" },
  { id: "entsorgung", label: "Entsorgung", headline: "Was soll weg?" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function Calculators() {
  const [tab, setTab] = useState<TabId>("material");
  const activeTab = TABS.find((t) => t.id === tab)!;

  return (
    <section id="rechner" className="bg-off-white px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 md:mb-16">
          <p className="label-technical text-xs text-accent mb-4">Rechner</p>
          <h2 className="font-display font-extrabold uppercase leading-[0.92] text-graphite text-[clamp(2.2rem,5.5vw,4rem)]">
            Erste Zahlen,
            <br />
            bevor wir da sind.
          </h2>
        </div>

        <div
          role="tablist"
          aria-label="Rechner auswählen"
          className="mb-10 flex flex-wrap gap-2 border-b border-anthracite/10 pb-1"
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "relative px-4 py-3 text-sm font-medium uppercase tracking-wide transition-colors",
                tab === t.id ? "text-graphite" : "text-anthracite/40 hover:text-anthracite/70"
              )}
            >
              {t.label}
              {tab === t.id && (
                <motion.span
                  layoutId="calc-tab-underline"
                  className="absolute -bottom-[3px] left-0 right-0 h-0.5 bg-accent"
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-display text-2xl font-bold uppercase text-graphite mb-8 md:text-3xl">
              {activeTab.headline}
            </h3>
            {tab === "material" && <MaterialCalculator />}
            {tab === "pflaster" && <PavingCalculator />}
            {tab === "entsorgung" && <WasteCalculator />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
