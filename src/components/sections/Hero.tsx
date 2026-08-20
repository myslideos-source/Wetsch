"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, MapPin, Sparkles, Star } from "lucide-react";
import Button from "@/components/ui/Button";
import DemoImage from "@/components/ui/DemoImage";
import imageManifest from "@/lib/image-manifest.json";
import { COMPANY, HERO_IMAGE } from "@/lib/constants";

const hasRealHeroImage = HERO_IMAGE.src in (imageManifest as Record<string, unknown>);

const HERO_FALLBACK_GRADIENT =
  "radial-gradient(120% 90% at 20% 0%, #3a352f 0%, #1a1a18 55%, #0c0c0b 100%)";

const HEADLINE_LINES = ["WIR BAUEN.", "WAS BLEIBT."];

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const radius = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.45]);

  return (
    <div ref={wrapperRef} className="relative h-[180vh]">
      <motion.section
        style={
          prefersReducedMotion
            ? undefined
            : { scale, borderRadius: radius, overflow: "hidden" }
        }
        className="sticky top-0 h-screen w-full bg-graphite"
        aria-label="Wetsch GmbH & Co. KG – Bauunternehmen aus Dinkelsbühl"
      >
        <ConstructionScene />

        <motion.div
          style={
            prefersReducedMotion
              ? undefined
              : { opacity: dim }
          }
          className="absolute inset-0 bg-black"
          aria-hidden
        />

        <motion.div
          style={
            prefersReducedMotion
              ? undefined
              : { opacity: contentOpacity, y: contentY }
          }
          className="relative z-10 flex h-full flex-col justify-end px-5 pb-28 md:px-10 md:pb-20"
        >
          <div className="max-w-5xl">
            <div className="mb-6 flex items-center gap-2 label-technical text-xs text-off-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-vivid" aria-hidden />
              Bauunternehmen · Dinkelsbühl
            </div>

            <h1 className="font-display font-extrabold uppercase text-off-white leading-[0.9] text-[clamp(3rem,11vw,8.5rem)]">
              {HEADLINE_LINES.map((line, i) => (
                <motion.span
                  key={line}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="block overflow-hidden"
                >
                  <span className="block">
                    {i === 1 ? <span className="text-accent-vivid">{line}</span> : line}
                  </span>
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 max-w-xl text-lg text-off-white/80 md:text-xl"
            >
              Bauprojekte aus Dinkelsbühl – von Erdarbeiten und Außenanlagen bis zum fertigen
              Zuhause.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Button href="#kontakt" size="lg">
                Projekt starten
              </Button>
              <Button href="#projekte" variant="outline-light" size="lg">
                Projekte entdecken
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-off-white/70 label-technical"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} className="text-accent-vivid" aria-hidden /> {COMPANY.city}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles size={14} className="text-accent-vivid" aria-hidden /> Neue Projekte
                verfügbar
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Star size={14} className="text-accent-vivid" aria-hidden /> Regionales Bauunternehmen
              </span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="absolute bottom-6 right-6 z-10 hidden flex-col items-center gap-2 text-off-white/60 md:flex"
          aria-hidden
        >
          <span className="label-technical text-[10px] [writing-mode:vertical-rl]">Scrollen</span>
          <motion.span
            animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={16} />
          </motion.span>
        </motion.div>
      </motion.section>
    </div>
  );
}

function ConstructionScene() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden">
      <DemoImage
        src={HERO_IMAGE.src}
        alt={HERO_IMAGE.alt}
        fallbackGradient={HERO_FALLBACK_GRADIENT}
        sizes="100vw"
        priority
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(12,12,11,0.35) 0%, rgba(12,12,11,0.55) 55%, rgba(12,12,11,0.9) 100%)",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full opacity-[0.12]"
        aria-hidden
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="blueprint-grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#f3f1ec" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
      </svg>

      <motion.div
        aria-hidden
        className="absolute inset-y-0 left-[-20%] w-[45%]"
        style={{
          background:
            "linear-gradient(100deg, transparent, rgba(232,100,42,0.16), transparent)",
        }}
        animate={prefersReducedMotion ? undefined : { x: ["0%", "260%"] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      />

      {!hasRealHeroImage && (
        <svg
          className="absolute bottom-0 right-[4%] h-[70%] w-auto text-off-white/25 md:right-[8%]"
          viewBox="0 0 200 260"
          fill="none"
          aria-hidden
        >
          <line x1="30" y1="260" x2="30" y2="20" stroke="currentColor" strokeWidth="3" />
          <line x1="30" y1="20" x2="180" y2="20" stroke="currentColor" strokeWidth="3" />
          <line x1="30" y1="40" x2="150" y2="20" stroke="currentColor" strokeWidth="2" />
          <line x1="10" y1="60" x2="50" y2="60" stroke="currentColor" strokeWidth="2" />
          <motion.g
            animate={prefersReducedMotion ? undefined : { y: [0, 14, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <line x1="160" y1="20" x2="160" y2="110" stroke="currentColor" strokeWidth="2" />
            <rect x="150" y="110" width="20" height="14" fill="currentColor" opacity="0.5" />
          </motion.g>
        </svg>
      )}

      {!prefersReducedMotion && (
        <div className="absolute inset-0" aria-hidden>
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-off-white/30"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 100}%`,
              }}
              animate={{ opacity: [0, 0.6, 0], y: [0, -30, -60] }}
              transition={{
                duration: 6 + (i % 5),
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />
    </div>
  );
}
