import type { FunnelStep } from "@/lib/data/types";

export function FunnelBar({ steps }: { steps: FunnelStep[] }) {
  return (
    <div className="flex flex-col gap-3 rounded-[12px] border border-border/60 bg-neutral-2/70 p-4">
      <h4 className="text-[14px] font-semibold text-foreground">Funnel performance</h4>
      <div className="space-y-3 text-[12px]">
        {steps.map((step, idx) => (
          <div key={step.step} className="space-y-1">
            <div className="flex items-center justify-between text-muted">
              <span>{idx + 1}. {step.step}</span>
              <span className="text-foreground">{Math.round(step.rate * 100)}%</span>
            </div>
            <div className="h-2 rounded-full bg-neutral-4">
              <div className="h-full rounded-full bg-brand-8" style={{ width: `${step.rate * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
