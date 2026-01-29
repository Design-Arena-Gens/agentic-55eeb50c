import type { AgentQueueHealth } from "@/lib/data/types";

export function AgentQueueCard({ queue }: { queue: AgentQueueHealth }) {
  return (
    <div className="rounded-[12px] border border-border/60 bg-neutral-2/70 p-4">
      <h4 className="text-[14px] font-semibold text-foreground">Agent queue</h4>
      <div className="mt-4 grid grid-cols-2 gap-3 text-[12px] text-muted">
        <div>
          <p>Queue depth</p>
          <p className="text-[16px] font-semibold text-foreground">{queue.queueDepth}</p>
        </div>
        <div>
          <p>Retries last min</p>
          <p className="text-[16px] font-semibold text-foreground">{queue.retries}</p>
        </div>
        <div>
          <p>Concurrency</p>
          <p className="text-[16px] font-semibold text-foreground">{queue.concurrency}</p>
        </div>
        <div>
          <p>Utilization</p>
          <p className="text-[16px] font-semibold text-foreground">{Math.round(queue.utilization * 100)}%</p>
        </div>
      </div>
      <div className="mt-4 h-1.5 rounded-full bg-neutral-4">
        <div className="h-full rounded-full bg-brand-8" style={{ width: `${Math.round(queue.utilization * 100)}%` }} />
      </div>
    </div>
  );
}
