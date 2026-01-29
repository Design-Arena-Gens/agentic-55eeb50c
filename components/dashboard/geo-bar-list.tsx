import type { GeoSource } from "@/lib/data/types";

export function GeoBarList({ sources }: { sources: GeoSource[] }) {
  const max = Math.max(...sources.map((item) => item.value));
  return (
    <div className="space-y-2">
      {sources.map((source) => (
        <div key={source.country} className="rounded-[10px] border border-border/60 bg-neutral-3/60 px-3 py-2 text-[12px] text-muted">
          <div className="flex items-center justify-between text-foreground">
            <span>{source.country}</span>
            <span>{source.value}</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-neutral-4">
            <div className="h-full rounded-full bg-brand-8" style={{ width: `${(source.value / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
