import type { TrafficHeatmapCell } from "@/lib/data/types";
import { cn } from "@/lib/utils";

export function HeatmapGrid({ cells }: { cells: TrafficHeatmapCell[] }) {
  const days = Array.from(new Set(cells.map((cell) => cell.day)));
  const hours = Array.from({ length: 24 }).map((_, idx) => idx);
  const max = Math.max(...cells.map((cell) => cell.value));

  return (
    <div className="overflow-auto">
      <div className="inline-grid grid-cols-[80px_repeat(24,minmax(32px,1fr))] gap-1 text-[11px] text-muted">
        <div />
        {hours.map((hour) => (
          <div key={hour} className="text-center">{hour}</div>
        ))}
        {days.map((day) => (
          <div key={day} className="contents">
            <div className="flex items-center justify-end pr-2 text-muted">{day}</div>
            {hours.map((hour) => {
              const cell = cells.find((c) => c.day === day && c.hour === hour);
              const intensity = cell ? cell.value / max : 0;
              return (
                <div
                  key={`${day}-${hour}`}
                  className={cn("h-8 rounded-[6px] border border-border/40 bg-brand-8/10")}
                  style={{
                    background: `linear-gradient(180deg, rgba(97,115,239,${0.2 + intensity * 0.6}) 0%, rgba(41,165,194,${0.1 + intensity * 0.4}) 100%)`
                  }}
                  title={`${day} ${hour}:00 • ${cell?.value ?? 0} sessions`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
