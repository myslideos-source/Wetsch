"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Container, Info, Scale } from "lucide-react";
import SelectCard from "@/components/ui/SelectCard";
import Button from "@/components/ui/Button";
import { WASTE_MATERIALS, calculateWaste } from "@/lib/calculators";
import { useQuotePrefill } from "@/hooks/useQuotePrefill";

export default function WasteCalculator() {
  const [volume, setVolume] = useState(6);
  const [materialId, setMaterialId] = useState(WASTE_MATERIALS[0].id);
  const { requestQuote } = useQuotePrefill();

  const result = useMemo(() => calculateWaste(volume, materialId), [volume, materialId]);
  const material = WASTE_MATERIALS.find((m) => m.id === materialId)!;

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
      <div className="md:col-span-7">
        <p className="mb-3 text-sm font-medium text-anthracite">Was soll weg?</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {WASTE_MATERIALS.map((m) => (
            <SelectCard
              key={m.id}
              label={m.label}
              selected={materialId === m.id}
              onClick={() => setMaterialId(m.id)}
            />
          ))}
        </div>

        <label htmlFor="waste-volume" className="mb-2 mt-8 block text-sm font-medium text-anthracite">
          Menge
        </label>
        <div className="flex items-center gap-3">
          <input
            id="waste-volume"
            type="range"
            min={1}
            max={40}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full accent-accent"
          />
          <span className="label-technical w-20 shrink-0 text-right text-sm">{volume} m³</span>
        </div>
      </div>

      <div className="md:col-span-5">
        <div className="h-full rounded-3xl bg-graphite p-8 text-off-white">
          <p className="label-technical text-xs text-off-white/50 mb-6">Ergebnis</p>

          {result ? (
            <motion.div
              key={`${volume}-${materialId}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between border-b border-off-white/10 pb-4">
                <span className="flex items-center gap-2 text-sm text-off-white/70">
                  <Container size={16} className="text-accent" aria-hidden /> Containergröße
                </span>
                <span className="font-display text-2xl font-bold">{result.container.m3} m³</span>
              </div>
              <div className="flex items-center justify-between border-b border-off-white/10 pb-4">
                <span className="flex items-center gap-2 text-sm text-off-white/70">
                  <Scale size={16} className="text-accent" aria-hidden /> Geschätztes Gewicht
                </span>
                <span className="font-display text-2xl font-bold">{result.weightTons} t</span>
              </div>

              <div>
                <p className="text-sm text-off-white/60 mb-1">Entsorgungskosten (Richtwert)</p>
                <p className="font-display text-3xl font-bold text-accent">
                  {result.estimatedCostMin.toLocaleString("de-DE")}–
                  {result.estimatedCostMax.toLocaleString("de-DE")} €
                </p>
              </div>

              <div className="flex items-start gap-2 rounded-xl border border-off-white/15 bg-off-white/5 p-4 text-xs text-off-white/70">
                <Info size={14} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                Unverbindliche Orientierung für {material.label}. Der finale Preis hängt von
                Zusammensetzung, Menge und Entsorgungsweg ab.
              </div>

              <Button
                onClick={() =>
                  requestQuote({
                    projectType: "Entsorgung",
                    summary: `${volume} m³ ${material.label} · Container ${result.container.m3} m³ · ca. ${result.weightTons} t · Richtwert ${result.estimatedCostMin}–${result.estimatedCostMax} €`,
                  })
                }
                className="w-full"
              >
                Angebot anfordern
              </Button>
            </motion.div>
          ) : (
            <p className="text-off-white/60">Bitte Menge angeben.</p>
          )}
        </div>
      </div>
    </div>
  );
}
