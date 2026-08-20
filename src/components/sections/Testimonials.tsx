"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const testimonial = TESTIMONIALS[index];

  const go = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="bg-concrete/30 px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <p className="label-technical text-xs text-accent mb-4">Kundenstimmen</p>
        <Quote className="mx-auto mb-8 text-accent" size={36} aria-hidden />

        <div className="relative min-h-[180px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <p className="font-display text-2xl font-medium leading-snug text-graphite md:text-3xl">
                „{testimonial.quote}“
              </p>
              <p className="mt-6 label-technical text-sm text-anthracite/50">
                {testimonial.author}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {TESTIMONIALS.length > 1 && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-anthracite/15 text-graphite hover:border-accent hover:text-accent"
              aria-label="Vorherige Bewertung"
            >
              <ChevronLeft size={18} aria-hidden />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Bewertung ${i + 1} anzeigen`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-accent" : "w-1.5 bg-anthracite/20"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-anthracite/15 text-graphite hover:border-accent hover:text-accent"
              aria-label="Nächste Bewertung"
            >
              <ChevronRight size={18} aria-hidden />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
