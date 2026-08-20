"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/constants";

export default function Process() {
  return (
    <section id="ablauf" className="bg-off-white px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 md:mb-20">
          <p className="label-technical text-xs text-accent mb-4">Ablauf</p>
          <h2 className="font-display font-extrabold uppercase leading-[0.92] text-graphite text-[clamp(2.2rem,5.5vw,4rem)]">
            So wird aus einer
            <br />
            Idee ein Projekt.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-0 md:grid-cols-5">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative border-t border-anthracite/10 py-8 pr-6 md:border-t-0 md:border-l md:py-2 md:pl-6"
            >
              <span className="label-technical text-accent text-xs">{step.index}</span>
              <h3 className="mt-3 font-display text-xl font-bold uppercase text-graphite">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-anthracite/60">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
