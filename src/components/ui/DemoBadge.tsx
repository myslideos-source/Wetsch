import { Sparkles } from "lucide-react";

export default function DemoBadge({ label = "Beispielprojekt" }: { label?: string }) {
  return (
    <span className="label-technical inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[10px] text-off-white backdrop-blur-sm">
      <Sparkles size={10} aria-hidden />
      {label}
    </span>
  );
}
