import type { AlertEvent } from "@/lib/data/types";
import { Badge } from "@/components/ui/badge";

const severityVariant = {
  info: "neutral" as const,
  warning: "warning" as const,
  critical: "danger" as const
};

export function AlertsFeed({ alerts }: { alerts: AlertEvent[] }) {
  return (
    <div className="flex flex-col gap-3">
      {alerts.map((alert) => (
        <div key={alert.id} className="rounded-[12px] border border-border/60 bg-neutral-3/60 p-3 text-[12px] text-muted">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-muted">
            <span>{alert.type}</span>
            <Badge variant={severityVariant[alert.severity]}>{alert.severity}</Badge>
          </div>
          <p className="mt-2 text-[13px] text-foreground">{alert.message}</p>
          <p className="mt-2 text-[11px] text-muted">{new Date(alert.timestamp).toLocaleTimeString()}</p>
        </div>
      ))}
    </div>
  );
}
