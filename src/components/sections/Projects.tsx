"use client";

import { ArrowUpRight } from "lucide-react";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import { PROJECTS } from "@/lib/constants";

const GRADIENTS: Record<string, string> = {
  "efh-dinkelsbuehl": "linear-gradient(135deg,#1a1a18,#4a4640 60%,#e8642a)",
  "hofanlage-feuchtwangen": "linear-gradient(135deg,#3a3733,#8a8378)",
  "einfahrt-wassertruedingen": "linear-gradient(135deg,#2a2a27,#5c574e)",
  "innenausbau-dinkelsbuehl": "linear-gradient(135deg,#3a352f,#a7a49b)",
  "abbruch-fichtenau": "linear-gradient(135deg,#1a1a18,#3a3733)",
  "aussenanlage-dinkelsbuehl": "linear-gradient(135deg,#3a4432,#6f7a4a)",
};

const SPAN: Record<string, string> = {
  large: "md:col-span-7 md:row-span-2",
  medium: "md:col-span-5 md:row-span-1",
  small: "md:col-span-5 md:row-span-1",
};

export default function Projects() {
  const beforeAfterProjects = PROJECTS.filter((p) => p.hasBeforeAfter);

  return (
    <section id="projekte" className="bg-graphite px-5 py-24 text-off-white md:px-10 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-14 md:mb-20">
          <p className="label-technical text-xs text-accent-vivid mb-4">Projekte</p>
          <h2 className="font-display font-extrabold uppercase leading-[0.9] text-[clamp(2.6rem,7vw,5.5rem)]">
            Nicht erzählen.
            <br />
            <span className="text-accent-vivid">Zeigen.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:auto-rows-[220px]">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              data-cursor="ANSEHEN"
              className={`group relative overflow-hidden rounded-2xl ${SPAN[project.size]}`}
            >
              <div
                className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ background: GRADIENTS[project.id] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

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

        {beforeAfterProjects.length > 0 && (
          <div className="mt-24">
            <p className="label-technical text-xs text-accent-vivid mb-4">Vorher / Nachher</p>
            <h3 className="font-display text-3xl font-bold uppercase mb-10 md:text-4xl">
              Der Unterschied, live gezogen.
            </h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {beforeAfterProjects.map((project) => (
                <div key={project.id}>
                  <BeforeAfterSlider
                    beforeGradient="linear-gradient(135deg,#5c574e,#8a8378)"
                    afterGradient={GRADIENTS[project.id]}
                  />
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{project.title}</p>
                      <p className="text-sm text-off-white/60">{project.tags.join(" · ")}</p>
                    </div>
                    <span className="label-technical text-xs text-off-white/50">
                      {project.location}
                    </span>
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
