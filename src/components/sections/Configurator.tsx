"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import SelectCard from "@/components/ui/SelectCard";
import { cn } from "@/lib/utils";
import { useQuotePrefill } from "@/hooks/useQuotePrefill";

const PROJECT_TYPES = ["Neubau", "Außenanlage", "Pflaster", "Abriss", "Innenausbau", "Trockenbau"];
const SIZES = ["Klein (< 50 m²)", "Mittel (50–200 m²)", "Groß (> 200 m²)"];
const TIMELINES = ["Sofort", "1–3 Monate", "3–6 Monate", "Später"];

const STEPS = ["Projekt", "Größe", "Zeitpunkt", "Standort"];

export default function Configurator() {
  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [zip, setZip] = useState("");
  const [done, setDone] = useState(false);
  const { requestQuote } = useQuotePrefill();

  const canNext =
    (step === 0 && projectType) ||
    (step === 1 && size) ||
    (step === 2 && timeline) ||
    (step === 3 && zip.trim().length >= 4);

  const next = () => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      setDone(true);
    }
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const reset = () => {
    setStep(0);
    setProjectType(null);
    setSize(null);
    setTimeline(null);
    setZip("");
    setDone(false);
  };

  const handleRequest = () => {
    requestQuote({
      projectType: projectType ?? undefined,
      timeline: timeline ?? undefined,
      zip,
      summary: `${size ?? ""} ${projectType ?? ""} · Start ${timeline ?? ""} · Region ${zip}`,
    });
  };

  return (
    <section className="bg-concrete/30 px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <p className="label-technical text-xs text-accent mb-4">Projekt-Konfigurator</p>
          <h2 className="font-display font-extrabold uppercase leading-[0.92] text-graphite text-[clamp(2.2rem,5.5vw,4rem)]">
            Was haben Sie vor?
          </h2>
        </div>

        <div className="rounded-3xl bg-off-white p-6 shadow-[0_2px_40px_rgba(0,0,0,0.06)] md:p-10">
          {!done && (
            <div className="mb-10 flex items-center gap-2">
              {STEPS.map((label, i) => (
                <div key={label} className="flex flex-1 items-center gap-2">
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                      i < step
                        ? "bg-accent text-off-white"
                        : i === step
                          ? "bg-graphite text-off-white"
                          : "bg-concrete text-anthracite/40"
                    )}
                  >
                    {i < step ? <Check size={14} /> : i + 1}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="h-px flex-1 bg-anthracite/10">
                      <div
                        className="h-px bg-accent transition-all duration-500"
                        style={{ width: i < step ? "100%" : "0%" }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="summary"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <p className="label-technical text-xs text-accent mb-3">Ihr Projekt</p>
                <div className="rounded-2xl bg-graphite p-6 text-off-white md:p-8">
                  <p className="font-display text-2xl font-bold uppercase md:text-3xl">
                    {size} {projectType}
                  </p>
                  <ul className="mt-4 space-y-2 text-off-white/75">
                    <li>Start: {timeline}</li>
                    <li>Region: {zip}</li>
                  </ul>
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href="#kontakt" onClick={handleRequest} size="lg" className="flex-1">
                    Projekt anfragen
                  </Button>
                  <Button onClick={reset} variant="ghost" size="lg">
                    Neu starten
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3 }}
              >
                {step === 0 && (
                  <StepGrid
                    title="Projekt auswählen"
                    options={PROJECT_TYPES}
                    value={projectType}
                    onChange={setProjectType}
                  />
                )}
                {step === 1 && (
                  <StepGrid title="Projektgröße" options={SIZES} value={size} onChange={setSize} />
                )}
                {step === 2 && (
                  <StepGrid
                    title="Wann soll gestartet werden?"
                    options={TIMELINES}
                    value={timeline}
                    onChange={setTimeline}
                  />
                )}
                {step === 3 && (
                  <div>
                    <p className="mb-5 font-display text-xl font-bold uppercase text-graphite">
                      Standort / PLZ
                    </p>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      placeholder="z. B. 91550"
                      className="w-full rounded-xl border border-anthracite/15 bg-off-white px-5 py-4 text-lg outline-none focus:border-accent"
                    />
                  </div>
                )}

                <div className="mt-10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={back}
                    disabled={step === 0}
                    className="inline-flex items-center gap-2 text-sm font-medium text-anthracite/60 disabled:opacity-0"
                  >
                    <ArrowLeft size={16} aria-hidden /> Zurück
                  </button>
                  <Button onClick={next} disabled={!canNext} magnetic={false}>
                    {step === STEPS.length - 1 ? "Zusammenfassung" : "Weiter"}{" "}
                    <ArrowRight size={16} aria-hidden />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function StepGrid({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: string[];
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="mb-5 font-display text-xl font-bold uppercase text-graphite">{title}</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((opt) => (
          <SelectCard key={opt} label={opt} selected={value === opt} onClick={() => onChange(opt)} />
        ))}
      </div>
    </div>
  );
}
