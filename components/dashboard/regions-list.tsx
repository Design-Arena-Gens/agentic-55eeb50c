import type { RegionStat } from "@/lib/data/types";
import { Badge } from "@/components/ui/badge";

export function RegionsList({ regions }: { regions: RegionStat[] }) {
  return (
    <div className="rounded-[12px] border border-border/60 bg-neutral-2/70 p-4">
      <h4 className="text-[14px] font-semibold text-foreground">Regions</h4>
      <div className="mt-2 space-y-2 text-[12px] text-muted">
        {regions.map((region) => (
          <div key={region.region} className="flex items-center justify-between rounded-[10px] border border-border/60 bg-neutral-3/60 px-3 py-2">
            <div>
              <p className="text-[13px] font-medium text-foreground">{region.region}</p>
              <p className="text-muted">Latency {region.latency} ms</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={region.errorRate > 1 ? "danger" : region.errorRate > 0.5 ? "warning" : "success"}>
                {region.errorRate.toFixed(2)}% err
              </Badge>
              <div className="h-2 w-20 rounded-full bg-neutral-4">
                <div className="h-full rounded-full bg-brand-8" style={{ width: `${region.load}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
