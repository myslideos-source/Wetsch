"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { STORY_PHASES } from "@/lib/constants";

export default function ConstructionStory() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <ConstructionStoryStatic />;
  }

  return <ConstructionStoryScroll />;
}

function ConstructionStoryScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const phaseProgress = useTransform(scrollYProgress, [0, 1], [0, STORY_PHASES.length]);

  useMotionValueEvent(phaseProgress, "change", (v) => {
    const idx = Math.min(STORY_PHASES.length - 1, Math.max(0, Math.floor(v)));
    setActivePhase(idx);
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-off-white"
      style={{ height: `${STORY_PHASES.length * 100 + 100}vh` }}
      aria-label="Vom Grundstück zum fertigen Projekt – Bauablauf"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-5 md:px-10">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="label-technical text-xs text-accent mb-4">Bau-Story</p>
            <h2 className="font-display font-extrabold uppercase leading-[0.92] text-graphite text-[clamp(2.2rem,5vw,3.75rem)]">
              Von der Erde
              <br />
              bis zum
              <br />
              fertigen Projekt
            </h2>

            <div className="mt-10 space-y-1">
              {STORY_PHASES.map((phase, i) => (
                <div
                  key={phase.index}
                  className="flex items-center gap-3 py-1.5 transition-opacity"
                  style={{ opacity: i === activePhase ? 1 : 0.35 }}
                >
                  <span
                    className={`label-technical text-xs ${
                      i === activePhase ? "text-accent" : "text-concrete-dark"
                    }`}
                  >
                    {phase.index}
                  </span>
                  <span
                    className={`text-sm md:text-base font-medium ${
                      i === activePhase ? "text-graphite" : "text-concrete-dark"
                    }`}
                  >
                    {phase.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 h-1 w-full max-w-xs overflow-hidden rounded-full bg-concrete">
              <motion.div
                className="h-full bg-accent"
                style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              />
            </div>
          </div>

          <div className="md:col-span-8">
            <StoryVisual progress={phaseProgress} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ConstructionStoryStatic() {
  return (
    <section className="bg-off-white px-5 py-24 md:px-10" aria-label="Vom Grundstück zum fertigen Projekt – Bauablauf">
      <div className="mx-auto max-w-[1400px]">
        <p className="label-technical text-xs text-accent mb-4">Bau-Story</p>
        <h2 className="font-display font-extrabold uppercase leading-[0.92] text-graphite text-[clamp(2.2rem,5vw,3.75rem)] mb-12">
          Von der Erde bis zum fertigen Projekt
        </h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
          {STORY_PHASES.map((phase) => (
            <div key={phase.index} className="rounded-xl border border-anthracite/10 p-4">
              <span className="label-technical text-xs text-accent">{phase.index}</span>
              <p className="mt-2 text-sm font-medium text-graphite">{phase.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FadeLayer({
  progress,
  from,
  span = 0.5,
  children,
}: {
  progress: MotionValue<number>;
  from: number;
  span?: number;
  children: ReactNode;
}) {
  const opacity = useTransform(progress, [from, from + span], [0, 1], { clamp: true });
  return <motion.g style={{ opacity }}>{children}</motion.g>;
}

function DrawLayer({
  progress,
  from,
  span = 0.5,
  d,
  stroke,
  strokeWidth,
  strokeDasharray,
  strokeLinecap,
  fill,
}: {
  progress: MotionValue<number>;
  from: number;
  span?: number;
  d: string;
  stroke: string;
  strokeWidth: number | string;
  strokeDasharray?: string;
  strokeLinecap?: "round" | "butt" | "square";
  fill: string;
}) {
  const pathLength = useTransform(progress, [from, from + span], [0, 1], { clamp: true });
  const opacity = useTransform(progress, [from, from + 0.05], [0, 1], { clamp: true });
  return (
    <motion.path
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      strokeLinecap={strokeLinecap}
      fill={fill}
      style={{ pathLength, opacity }}
    />
  );
}

function StoryVisual({ progress }: { progress: MotionValue<number> }) {
  const skyOpacity = useTransform(progress, [4.5, 6], [0, 1], { clamp: true });

  return (
    <div className="relative aspect-[4/3] w-full rounded-3xl bg-concrete/40 p-6 md:p-10">
      <svg viewBox="0 0 400 300" className="h-full w-full overflow-visible" aria-hidden>
        <motion.rect
          x="0"
          y="0"
          width="400"
          height="300"
          rx="24"
          fill="#f2895c"
          style={{ opacity: skyOpacity }}
          opacity={0.08}
        />

        {/* Grundlinie */}
        <line x1="20" y1="255" x2="380" y2="255" stroke="#a7a49b" strokeWidth="2" />

        {/* 01 Planung — Grundstücksumriss */}
        <DrawLayer
          progress={progress}
          from={0}
          span={0.7}
          d="M70 255 L70 235 L330 235 L330 255"
          fill="none"
          stroke="#2a2a27"
          strokeWidth="1.5"
          strokeDasharray="6 5"
        />

        {/* 02 Erdarbeiten — Aushub */}
        <FadeLayer progress={progress} from={1} span={0.6}>
          <path d="M90 255 L120 255 L135 290 L285 290 L300 255 L330 255 L330 255 L70 255 Z" fill="#8a8378" opacity={0.5} />
          <path d="M120 255 L135 290 L285 290 L300 255" fill="none" stroke="#5c574e" strokeWidth="1.5" />
        </FadeLayer>

        {/* 03 Rohbau — Fundament & Wände */}
        <FadeLayer progress={progress} from={2} span={0.3}>
          <rect x="110" y="243" width="180" height="12" fill="#c9c6bf" />
        </FadeLayer>
        <DrawLayer progress={progress} from={2.2} span={0.5} d="M120 243 L120 140" stroke="#2a2a27" strokeWidth="3" fill="none" />
        <DrawLayer progress={progress} from={2.3} span={0.5} d="M280 243 L280 140" stroke="#2a2a27" strokeWidth="3" fill="none" />
        <DrawLayer progress={progress} from={2.4} span={0.5} d="M120 140 L200 95 L280 140" stroke="#2a2a27" strokeWidth="3" fill="none" />
        <FadeLayer progress={progress} from={2.6} span={0.4}>
          <rect x="120" y="140" width="160" height="103" fill="#e7e4dc" />
        </FadeLayer>

        {/* 04 Ausbau — Dach, Fenster, Tür */}
        <FadeLayer progress={progress} from={3} span={0.5}>
          <path d="M110 140 L200 88 L290 140 L280 140 L200 100 L120 140 Z" fill="#e8642a" />
        </FadeLayer>
        <FadeLayer progress={progress} from={3.3} span={0.5}>
          <rect x="140" y="165" width="30" height="30" fill="#2a2a27" opacity={0.85} />
          <rect x="230" y="165" width="30" height="30" fill="#2a2a27" opacity={0.85} />
          <rect x="188" y="195" width="24" height="48" fill="#1a1a18" />
        </FadeLayer>

        {/* 05 Außenanlagen — Weg & Grün */}
        <DrawLayer
          progress={progress}
          from={4}
          span={0.6}
          d="M280 255 L340 255 L355 290"
          stroke="#a7a49b"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />
        <FadeLayer progress={progress} from={4.3} span={0.5}>
          <circle cx="95" cy="250" r="14" fill="#6f7a4a" />
          <rect x="91" y="250" width="8" height="10" fill="#5c574e" />
        </FadeLayer>

        {/* 06 Fertigstellung — Glow */}
        <FadeLayer progress={progress} from={5} span={0.8}>
          <rect x="185" y="205" width="30" height="12" fill="#f2895c" opacity={0.9} />
          <circle cx="200" cy="60" r="18" fill="#e8642a" opacity={0.15} />
        </FadeLayer>
      </svg>
    </div>
  );
}
