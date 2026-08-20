import AnimatedNumber from "@/components/ui/AnimatedNumber";
import { STATS } from "@/lib/constants";

export default function Stats() {
  return (
    <section className="bg-graphite px-5 py-16 text-off-white md:px-10 md:py-20">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-8 md:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="min-w-0 text-center md:text-left">
            <p className="break-words font-display text-4xl font-extrabold text-accent-vivid md:text-6xl">
              {stat.isNumber ? (
                <AnimatedNumber value={Number(stat.value)} suffix={stat.suffix} />
              ) : (
                <>
                  {stat.value}
                  {stat.suffix}
                </>
              )}
            </p>
            <p className="mt-2 text-sm text-off-white/60 md:text-base">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
