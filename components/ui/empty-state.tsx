import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EmptyState({ icon, title, description, action, className }: { icon?: ReactNode; title: string; description?: string; action?: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 rounded-[12px] border border-dashed border-border/60 bg-neutral-2/50 p-6 text-center text-muted", className)}>
      {icon && <div className="text-brand-9">{icon}</div>}
      <div className="text-[14px] font-medium text-foreground">{title}</div>
      {description && <p className="max-w-sm text-[12px] text-muted">{description}</p>}
      {action}
    </div>
  );
}
