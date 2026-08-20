"use client";

import { useId, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import DemoImage from "@/components/ui/DemoImage";

interface BeforeAfterSliderProps {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  beforeGradient: string;
  afterGradient: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export default function BeforeAfterSlider({
  before,
  after,
  beforeGradient,
  afterGradient,
  beforeLabel = "Vorher",
  afterLabel = "Nachher",
  className = "",
}: BeforeAfterSliderProps) {
  const [value, setValue] = useState(50);
  const id = useId();

  return (
    <div
      className={`relative aspect-[4/3] w-full select-none overflow-hidden rounded-3xl ${className}`}
      data-cursor="ZIEHEN"
    >
      <div className="absolute inset-0">
        <DemoImage src={after.src} alt={after.alt} fallbackGradient={afterGradient} />
        <span className="absolute right-5 top-5 label-technical text-xs text-off-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
          {afterLabel}
        </span>
      </div>

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
      >
        <div className="absolute inset-0">
          <DemoImage src={before.src} alt={before.alt} fallbackGradient={beforeGradient} />
          <span className="absolute left-5 top-5 label-technical text-xs text-off-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
            {beforeLabel}
          </span>
        </div>
      </div>

      <div
        className="pointer-events-none absolute top-0 bottom-0 w-0.5 bg-off-white"
        style={{ left: `${value}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-off-white text-graphite shadow-lg">
          <MoveHorizontal size={18} aria-hidden />
        </div>
      </div>

      <label htmlFor={id} className="sr-only">
        Vorher/Nachher Vergleich – Regler bewegen
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        aria-valuetext={`${value}% Nachher sichtbar`}
      />
    </div>
  );
}
