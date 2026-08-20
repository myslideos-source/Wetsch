"use client";

import { ArrowUpRight, Info } from "lucide-react";
import DemoImage from "@/components/ui/DemoImage";
import DemoBadge from "@/components/ui/DemoBadge";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import { BEFORE_AFTER_PAIRS, PROJECTS } from "@/lib/constants";

const GRADIENTS: Record<string, string> = {
  "efh-dinkelsbuehl": "linear-gradient(135deg,#1a1a18,#4a4640 60%,#e8642a)",
  "hofanlage-feuchtwangen": "linear-gradient(135deg,#3a3733,#8a8378)",
  "einfahrt-wassertruedingen": "linear-gradient(135deg,#2a2a27,#5c574e)",
  "innenausbau-dinkelsbuehl": "linear-gradient(135deg,#3a352f,#a7a49b)",
  "abbruch-fichtenau": "linear-gradient(135deg,#1a1a18,#3a3733)",
  "aussenanlage-dinkelsbuehl": "linear-gradient(135deg,#3a4432,#6f7a4a)",
  "neubau-rohbau": "linear-gradient(135deg,#2a2a27,#e8642a)",
  "moderne-terrasse": "linear-gradient(135deg,#4a4640,#8a8378)",
};

const BEFORE_AFTER_GRADIENTS: Record<string, { before: string; after: string }> = {
  hofeinfahrt: {
    before: "linear-gradient(135deg,#5c574e,#8a8378)",
    after: "linear-gradient(135deg,#2a2a27,#5c574e)",
  },
  "rohbau-fertig": {
    before: "linear-gradient(135deg,#3a3733,#8a8378)",
    after: "linear-gradient(135deg,#1a1a18,#4a4640 60%,#e8642a)",
  },
};

const SPAN: Record<string, string> = {
  large: "md:col-span-7 md:row-span-2",
  medium: "md:col-span-5 md:row-span-1",
  small: "md:col-span-5 md:row-span-1",
};

export default function Projects() {
  return (
    <section id="projekte" className="bg-graphite px-5 py-24 text-off-white md:px-10 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6 md:mb-8">
          <p className="label-technical text-xs text-accent-vivid mb-4">Projekte</p>
          <h2 className="font-display font-extrabold uppercase leading-[0.9] text-[clamp(2.6rem,7vw,5.5rem)]">
            Nicht erzählen.
            <br />
            <span className="text-accent-vivid">Zeigen.</span>
          </h2>
        </div>

        <p className="mb-14 flex max-w-2xl items-start gap-2 text-sm text-off-white/50 md:mb-20">
          <Info size={15} className="mt-0.5 shrink-0" aria-hidden />
          Die folgenden Projekte sind mit lizenzierten Beispielbildern visualisierte
          Demo-Referenzen und werden durch echte Wetsch-Projekte ersetzt, sobald diese
          verfügbar sind.
        </p>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:auto-rows-[220px]">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              data-cursor="ANSEHEN"
              className={`group relative aspect-[4/3] overflow-hidden rounded-2xl md:aspect-auto ${SPAN[project.size]}`}
            >
              <DemoImage
                src={project.image.src}
                alt={project.image.alt}
                fallbackGradient={GRADIENTS[project.id]}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

              <div className="absolute left-4 top-4">
                <DemoBadge />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="translate-y-2 opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="mb-2 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="label-technical rounded-full border border-off-white/25 px-2.5 py-1 text-[10px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display text-xl font-bold uppercase leading-tight md:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-off-white/70">
                    {project.location} · {project.year}
                  </p>
                </div>
              </div>

              <ArrowUpRight
                size={20}
                className="absolute right-5 top-5 -translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                aria-hidden
              />
            </article>
          ))}
        </div>

        {BEFORE_AFTER_PAIRS.length > 0 && (
          <div className="mt-24">
            <p className="label-technical text-xs text-accent-vivid mb-4">Vorher / Nachher</p>
            <h3 className="font-display text-3xl font-bold uppercase mb-4 md:text-4xl">
              Der Unterschied, live gezogen.
            </h3>
            <p className="mb-10 flex max-w-2xl items-start gap-2 text-sm text-off-white/50">
              <Info size={15} className="mt-0.5 shrink-0" aria-hidden />
              Beispielbilder zur Visualisierung – kein bestätigtes Wetsch-Projekt.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {BEFORE_AFTER_PAIRS.map((pair) => (
                <div key={pair.id}>
                  <BeforeAfterSlider
                    before={pair.before}
                    after={pair.after}
                    beforeGradient={BEFORE_AFTER_GRADIENTS[pair.id].before}
                    afterGradient={BEFORE_AFTER_GRADIENTS[pair.id].after}
                  />
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{pair.title}</p>
                      <p className="text-sm text-off-white/60">{pair.tags.join(" · ")}</p>
                    </div>
                    <DemoBadge label="Visualisierung" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
