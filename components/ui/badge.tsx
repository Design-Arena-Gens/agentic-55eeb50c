import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "neutral" | "brand" | "success" | "warning" | "danger" | "outline";

const variantClasses: Record<BadgeVariant, string> = {
  neutral: "bg-neutral-4/80 text-foreground",
  brand: "bg-brand-8/80 text-foreground",
  success: "bg-success-8/80 text-foreground",
  warning: "bg-warning-8/80 text-neutral-12",
  danger: "bg-danger-8/80 text-foreground",
  outline: "border border-border/60 text-muted"
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "neutral", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
);
Badge.displayName = "Badge";
