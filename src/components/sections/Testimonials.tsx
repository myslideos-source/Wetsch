"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { COMPANY, TESTIMONIALS } from "@/lib/constants";

const siteUrl = "https://www.wetsch-bau.de";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const testimonial = TESTIMONIALS[index];

  const go = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#business`,
    review: TESTIMONIALS.filter((t) => !t.isPlaceholder).map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: 5,
      },
      reviewBody: t.quote,
    })),
  };

  return (
    <section className="bg-concrete/30 px-5 py-24 md:px-10 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
      />
      <div className="mx-auto max-w-3xl text-center">
        <p className="label-technical text-xs text-accent mb-4">Kundenstimmen</p>

        <div className="relative min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <div className="mb-5 flex justify-center gap-1" aria-label={`${testimonial.rating} von 5 Sternen`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < testimonial.rating ? "fill-accent text-accent" : "text-anthracite/20"}
                    aria-hidden
                  />
                ))}
              </div>
              <p className="font-display text-2xl font-medium leading-snug text-graphite md:text-3xl">
                „{testimonial.quote}“
              </p>
              <p className="mt-6 label-technical text-sm text-anthracite/50">
                {testimonial.author}
                {!testimonial.isPlaceholder && (
                  <span className="text-anthracite/35"> · Rezension aus {testimonial.source}</span>
                )}
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

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${COMPANY.mapsQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex items-center gap-2 rounded-full border border-anthracite/15 bg-off-white px-5 py-3 text-sm font-medium text-graphite transition-colors hover:border-accent hover:text-accent"
        >
          <Star size={16} className="text-accent" aria-hidden />
          Weitere Bewertungen bei Google
        </a>
      </div>
    </section>
  );
}
