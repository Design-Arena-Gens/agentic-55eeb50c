import type { MemoryStat } from "@/lib/data/types";

export function MemoryUsageCard({ data }: { data: MemoryStat[] }) {
  return (
    <div className="rounded-[12px] border border-border/60 bg-neutral-2/70 p-4">
      <h4 className="text-[14px] font-semibold text-foreground">Memory usage</h4>
      <div className="mt-4 space-y-3 text-[12px] text-muted">
        {data.map((stat) => {
          const total = stat.hits + stat.misses;
          const ratio = total === 0 ? 0 : (stat.hits / total) * 100;
          return (
            <div key={stat.label}>
              <div className="flex items-center justify-between text-foreground">
                <span>{stat.label}</span>
                <span>{ratio.toFixed(1)}% hit</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-neutral-4">
                <div className="h-full rounded-full bg-brand-8" style={{ width: `${ratio}%` }} />
              </div>
              <div className="mt-1 text-[11px] text-muted">{stat.hits} hits • {stat.misses} misses</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
