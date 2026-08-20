"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import SelectCard from "@/components/ui/SelectCard";
import Button from "@/components/ui/Button";
import { PAVING_MATERIALS, PAVING_OPTIONS, calculatePaving } from "@/lib/calculators";
import { useQuotePrefill } from "@/hooks/useQuotePrefill";
import { cn } from "@/lib/utils";

export default function PavingCalculator() {
  const [area, setArea] = useState(60);
  const [materialId, setMaterialId] = useState(PAVING_MATERIALS[0].id);
  const [options, setOptions] = useState<string[]>([]);
  const { requestQuote } = useQuotePrefill();

  const result = useMemo(
    () => calculatePaving(area, materialId, options),
    [area, materialId, options]
  );
  const material = PAVING_MATERIALS.find((m) => m.id === materialId)!;

  const toggleOption = (id: string) =>
    setOptions((prev) => (prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]));

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
      <div className="md:col-span-7">
        <label htmlFor="pav-area" className="mb-2 block text-sm font-medium text-anthracite">
          Fläche
        </label>
        <div className="flex items-center gap-3">
          <input
            id="pav-area"
            type="range"
            min={20}
            max={500}
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className="w-full accent-accent"
          />
          <span className="label-technical w-20 shrink-0 text-right text-sm">{area} m²</span>
        </div>

        <p className="mb-3 mt-8 text-sm font-medium text-anthracite">Material</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {PAVING_MATERIALS.map((m) => (
            <SelectCard
              key={m.id}
              label={m.label}
              description={`ca. ${m.pricePerM2Min}–${m.pricePerM2Max} €/m²`}
              selected={materialId === m.id}
              onClick={() => setMaterialId(m.id)}
            />
          ))}
        </div>

        <p className="mb-3 mt-8 text-sm font-medium text-anthracite">Zusatzoptionen</p>
        <div className="grid grid-cols-2 gap-3">
          {PAVING_OPTIONS.map((opt) => (
            <SelectCard
              key={opt.id}
              label={opt.label}
              description={`+${opt.extraPerM2} €/m²`}
              selected={options.includes(opt.id)}
              onClick={() => toggleOption(opt.id)}
            />
          ))}
        </div>
      </div>

      <div className="md:col-span-5">
        <div className="h-full rounded-3xl bg-graphite p-8 text-off-white">
          <p className="label-technical text-xs text-off-white/50 mb-6">Ergebnis</p>

          {result ? (
            <motion.div
              key={`${area}-${materialId}-${options.join(",")}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <p className="text-sm text-off-white/60 mb-1">Geschätzte Preisspanne</p>
                <p className="font-display text-4xl font-bold text-accent">
                  {result.min.toLocaleString("de-DE")}–{result.max.toLocaleString("de-DE")} €
                </p>
              </div>

              <div
                className={cn(
                  "flex items-start gap-2 rounded-xl border border-off-white/15 bg-off-white/5 p-4 text-xs text-off-white/70"
                )}
              >
                <Info size={14} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                Unverbindliche Orientierung. Der finale Preis hängt von Boden, Material und
                Ausführung ab.
              </div>

              <p className="text-xs text-off-white/40">
                Berechnung: {area} m² {material.label}
                {options.length > 0 &&
                  ` + ${options
                    .map((o) => PAVING_OPTIONS.find((p) => p.id === o)?.label)
                    .join(", ")}`}
              </p>

              <Button
                onClick={() =>
                  requestQuote({
                    projectType: "Pflasterarbeiten",
                    areaM2: area,
                    summary: `${area} m² ${material.label}${
                      options.length
                        ? ", " +
                          options
                            .map((o) => PAVING_OPTIONS.find((p) => p.id === o)?.label)
                            .join(", ")
                        : ""
                    } · Richtwert ${result.min}–${result.max} €`,
                  })
                }
                className="w-full"
              >
                Genaues Angebot erhalten
              </Button>
            </motion.div>
          ) : (
            <p className="text-off-white/60">Bitte Fläche angeben.</p>
          )}
        </div>
      </div>
    </div>
  );
}
