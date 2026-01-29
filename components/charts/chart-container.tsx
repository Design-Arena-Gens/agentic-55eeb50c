import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function ChartContainer({ title, description, actions, legend, children, className }: { title: string; description?: string; actions?: ReactNode; legend?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex h-full flex-col gap-3 rounded-[12px] border border-border/60 bg-neutral-2/70 p-4 shadow-sm", className)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-[16px] font-semibold text-foreground">{title}</h3>
          {description && <p className="text-[12px] text-muted">{description}</p>}
        </div>
        {actions}
      </div>
      {legend && <div className="flex flex-wrap gap-2">{legend}</div>}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}

export function ChartLegendItem({ label, value, color }: { label: string; value?: string; color: string }) {
  return (
    <Badge className="flex items-center gap-2 bg-neutral-3/70 text-[12px]">
      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
      <span>{label}</span>
      {value && <span className="text-muted">{value}</span>}
    </Badge>
  );
}
