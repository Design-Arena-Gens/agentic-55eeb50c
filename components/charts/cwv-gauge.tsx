import type { CoreWebVitalsGauge } from "@/lib/data/types";
import { cn } from "@/lib/utils";

const statusColor: Record<CoreWebVitalsGauge["status"], string> = {
  good: "from-success-9 to-success-7",
  warn: "from-warning-9 to-warning-7",
  bad: "from-danger-9 to-danger-7"
};

export function CwvGauge({ metric }: { metric: CoreWebVitalsGauge }) {
  const percentage = Math.min(1, metric.target === 0 ? 0 : metric.target / Math.max(metric.value, metric.target));
  const display = metric.metric === "INP" ? `${Math.round(metric.value)} ms` : metric.metric === "LCP" ? `${metric.value.toFixed(2)} s` : metric.value.toFixed(2);

  return (
    <div className="flex flex-col gap-3 rounded-[12px] border border-border/60 bg-neutral-2/70 p-4">
      <div className="text-[12px] font-medium uppercase tracking-wide text-muted">{metric.metric}</div>
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 rounded-full bg-neutral-3/60" />
          <div
            className={cn("absolute inset-1 rounded-full bg-gradient-to-br", statusColor[metric.status])}
            style={{
              mask: `conic-gradient(from 0deg, rgba(0,0,0,1) ${percentage * 360}deg, rgba(0,0,0,0.15) 0)`,
              WebkitMask: `conic-gradient(from 0deg, rgba(0,0,0,1) ${percentage * 360}deg, rgba(0,0,0,0.15) 0)`
            }}
          />
          <div className="absolute inset-[18%] flex items-center justify-center rounded-full bg-neutral-2/90 text-[14px] font-semibold text-foreground">
            {display}
          </div>
        </div>
        <div className="space-y-2 text-[12px] text-muted">
          <div>
            <span className="text-foreground">Status:</span> {metric.status}
          </div>
          <div>
            Target: <span className="text-foreground">{metric.metric === "INP" ? `${metric.target} ms` : metric.metric === "LCP" ? `${metric.target} s` : metric.target}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
