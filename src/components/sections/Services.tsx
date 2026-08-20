"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  DoorOpen,
  Grid2x2,
  Hammer,
  Home,
  KeyRound,
  Layers,
  Trees,
  Truck,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import { SERVICES, type Service } from "@/lib/constants";

const ICONS: Record<Service["slug"], LucideIcon> = {
  abbrucharbeiten: Hammer,
  aussenanlagen: Trees,
  bauschuttentsorgung: Truck,
  fertighausbau: Warehouse,
  hausbau: Home,
  immobilienverkauf: KeyRound,
  innenausbau: DoorOpen,
  pflasterarbeiten: Grid2x2,
  trockenbau: Layers,
};

const GRADIENTS: Record<Service["slug"], string> = {
  abbrucharbeiten: "linear-gradient(135deg,#2a2a27,#4a4640)",
  aussenanlagen: "linear-gradient(135deg,#3a4432,#6f7a4a)",
  bauschuttentsorgung: "linear-gradient(135deg,#3a3733,#8a8378)",
  fertighausbau: "linear-gradient(135deg,#1a1a18,#4a4640)",
  hausbau: "linear-gradient(135deg,#c14f1f,#e8642a)",
  immobilienverkauf: "linear-gradient(135deg,#3a352f,#a7a49b)",
  innenausbau: "linear-gradient(135deg,#2a2a27,#5c574e)",
  pflasterarbeiten: "linear-gradient(135deg,#4a4640,#c9c6bf)",
  trockenbau: "linear-gradient(135deg,#3a3733,#6f6a60)",
};

export default function Services() {
  const [active, setActive] = useState(0);
  const activeService = SERVICES[active];
  const Icon = ICONS[activeService.slug];

  return (
    <section id="leistungen" className="bg-off-white px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label-technical text-xs text-accent mb-4">Leistungen</p>
            <h2 className="font-display font-extrabold uppercase leading-[0.92] text-graphite text-[clamp(2.4rem,6vw,4.5rem)]">
              Alles aus
              <br />
              einer Hand.
            </h2>
          </div>
          <p className="max-w-sm text-anthracite/70">
            Neun Gewerke, ein Ansprechpartner. Wählen Sie eine Leistung, um zu sehen, was
            dahintersteckt.
          </p>
        </div>

        {/* Desktop: list + swapping visual */}
        <div className="hidden md:grid md:grid-cols-12 md:gap-12">
          <div className="col-span-5">
            <ul>
              {SERVICES.map((service, i) => (
                <li key={service.slug} className="border-b border-anthracite/10">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="group flex w-full items-center gap-6 py-5 text-left transition-colors"
                    aria-current={active === i}
                  >
                    <span
                      className={`label-technical text-sm transition-colors ${
                        active === i ? "text-accent" : "text-concrete-dark"
                      }`}
                    >
                      {service.index}
                    </span>
                    <span
                      className={`font-display text-2xl font-bold uppercase tracking-tight transition-colors lg:text-3xl ${
                        active === i ? "text-graphite" : "text-anthracite/40"
                      }`}
                    >
                      {service.title}
                    </span>
                    <ArrowUpRight
                      size={20}
                      className={`ml-auto shrink-0 transition-all ${
                        active === i ? "translate-x-0 opacity-100 text-accent" : "-translate-x-2 opacity-0"
                      }`}
                      aria-hidden
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-7">
            <div className="sticky top-28 overflow-hidden rounded-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.slug}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex aspect-[4/3] flex-col justify-between p-10"
                  style={{ background: GRADIENTS[activeService.slug] }}
                >
                  <div className="flex items-center justify-between">
                    <Icon size={40} className="text-off-white/90" aria-hidden />
                    <span className="font-display text-8xl font-extrabold text-off-white/15">
                      {activeService.index}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-3xl font-bold uppercase text-off-white lg:text-4xl">
                      {activeService.title}
                    </h3>
                    <p className="mt-3 max-w-md text-off-white/85">{activeService.description}</p>
                    <Link
                      href={`/leistungen/${activeService.slug}`}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-off-white underline decoration-accent underline-offset-4 hover:text-accent"
                    >
                      Mehr erfahren <ArrowUpRight size={16} aria-hidden />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile: swipe cards */}
        <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-4 [scroll-snap-type:x_mandatory] md:hidden scrollbar-thin">
          {SERVICES.map((service) => {
            const CardIcon = ICONS[service.slug];
            return (
              <div
                key={service.slug}
                className="relative flex aspect-[3/4] w-[78vw] shrink-0 flex-col justify-between rounded-3xl p-7 [scroll-snap-align:start]"
                style={{ background: GRADIENTS[service.slug] }}
              >
                <div className="flex items-center justify-between">
                  <CardIcon size={32} className="text-off-white/90" aria-hidden />
                  <span className="font-display text-6xl font-extrabold text-off-white/15">
                    {service.index}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase text-off-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-off-white/85">{service.short}</p>
                  <Link
                    href={`/leistungen/${service.slug}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-off-white underline decoration-accent underline-offset-4"
                  >
                    Mehr erfahren <ArrowUpRight size={16} aria-hidden />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
