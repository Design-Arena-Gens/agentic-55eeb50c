import type { AgentKPI } from "@/lib/data/types";
import { KpiDeltaChip } from "./kpi-delta-chip";

export function AgentKpiGrid({ kpis }: { kpis: AgentKPI[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-4">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="rounded-[12px] border border-border/60 bg-neutral-2/70 p-4">
          <div className="text-[12px] uppercase tracking-wide text-muted">{kpi.label}</div>
          <div className="mt-2 flex items-baseline gap-2 text-[18px] font-semibold text-foreground">
            {kpi.unit === "percent"
              ? `${(kpi.value * 100).toFixed(1)}%`
              : kpi.label.toLowerCase().includes("tokens")
              ? `${Math.round(kpi.value / 1000)}k`
              : kpi.label.toLowerCase().includes("cost")
              ? `$${kpi.value.toFixed(2)}`
              : kpi.label.toLowerCase().includes("latency")
              ? `${kpi.value.toFixed(1)} s`
              : typeof kpi.value === "number" && kpi.value > 100
              ? kpi.value.toLocaleString()
              : kpi.value}
            <KpiDeltaChip value={kpi.delta} />
          </div>
        </div>
      ))}
    </div>
  );
}
