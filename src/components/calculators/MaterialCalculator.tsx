"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Layers, Scale, Truck } from "lucide-react";
import SelectCard from "@/components/ui/SelectCard";
import Button from "@/components/ui/Button";
import { MATERIAL_TYPES, calculateMaterial } from "@/lib/calculators";
import { useQuotePrefill } from "@/hooks/useQuotePrefill";

export default function MaterialCalculator() {
  const [area, setArea] = useState(40);
  const [height, setHeight] = useState(15);
  const [materialId, setMaterialId] = useState(MATERIAL_TYPES[0].id);
  const { requestQuote } = useQuotePrefill();

  const result = useMemo(
    () => calculateMaterial(area, height, materialId),
    [area, height, materialId]
  );
  const material = MATERIAL_TYPES.find((m) => m.id === materialId)!;

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
      <div className="md:col-span-7">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="mat-area" className="mb-2 block text-sm font-medium text-anthracite">
              Fläche
            </label>
            <div className="flex items-center gap-3">
              <input
                id="mat-area"
                type="range"
                min={1}
                max={500}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full accent-accent"
              />
              <span className="label-technical w-20 shrink-0 text-right text-sm">{area} m²</span>
            </div>
          </div>
          <div>
            <label htmlFor="mat-height" className="mb-2 block text-sm font-medium text-anthracite">
              Schütthöhe
            </label>
            <div className="flex items-center gap-3">
              <input
                id="mat-height"
                type="range"
                min={1}
                max={80}
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full accent-accent"
              />
              <span className="label-technical w-20 shrink-0 text-right text-sm">{height} cm</span>
            </div>
          </div>
        </div>

        <p className="mb-3 mt-8 text-sm font-medium text-anthracite">Material</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {MATERIAL_TYPES.map((m) => (
            <SelectCard
              key={m.id}
              label={m.label}
              description={m.description}
              selected={materialId === m.id}
              onClick={() => setMaterialId(m.id)}
            />
          ))}
        </div>
      </div>

      <div className="md:col-span-5">
        <div className="h-full rounded-3xl bg-graphite p-8 text-off-white">
          <p className="label-technical text-xs text-off-white/50 mb-6">Ergebnis</p>

          {result ? (
            <motion.div
              key={`${area}-${height}-${materialId}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <ResultRow
                icon={Layers}
                label="Benötigtes Volumen"
                value={`${result.volumeM3.toLocaleString("de-DE")} m³`}
              />
              <ResultRow
                icon={Scale}
                label="Geschätztes Gewicht"
                value={`${result.weightTons.toLocaleString("de-DE")} t`}
              />
              <ResultRow
                icon={Truck}
                label="LKW-Ladungen"
                value={`${result.truckloads} ${result.truckloads === 1 ? "Ladung" : "Ladungen"}`}
              />
              <p className="text-xs text-off-white/40">
                Richtwert auf Basis einer Schüttdichte von {material.density} t/m³ für{" "}
                {material.label}. Abweichungen je nach Verdichtung und Material möglich.
              </p>
              <Button
                onClick={() =>
                  requestQuote({
                    projectType: "Material",
                    areaM2: area,
                    summary: `${area} m² Fläche, ${height} cm ${material.label} · ca. ${result.volumeM3} m³ / ${result.weightTons} t / ${result.truckloads} LKW-Ladungen`,
                  })
                }
                className="w-full"
              >
                Dafür Angebot anfordern
              </Button>
            </motion.div>
          ) : (
            <p className="text-off-white/60">Bitte Fläche und Schütthöhe angeben.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Layers;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-off-white/10 pb-4">
      <span className="flex items-center gap-2 text-sm text-off-white/70">
        <Icon size={16} className="text-accent" aria-hidden />
        {label}
      </span>
      <span className="font-display text-2xl font-bold">{value}</span>
    </div>
  );
}
