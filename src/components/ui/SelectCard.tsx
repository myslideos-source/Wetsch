"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectCardProps {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

export default function SelectCard({
  label,
  description,
  selected,
  onClick,
  className,
}: SelectCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "relative flex flex-col gap-1 rounded-2xl border px-5 py-4 text-left transition-all",
        selected
          ? "border-accent bg-accent/10 text-graphite"
          : "border-anthracite/15 bg-off-white text-anthracite/80 hover:border-anthracite/30",
        className
      )}
    >
      <span
        className={cn(
          "absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border transition-colors",
          selected ? "border-accent bg-accent text-off-white" : "border-anthracite/20 text-transparent"
        )}
        aria-hidden
      >
        <Check size={12} />
      </span>
      <span className="font-medium pr-6">{label}</span>
      {description && <span className="text-xs text-anthracite/50">{description}</span>}
    </button>
  );
}
