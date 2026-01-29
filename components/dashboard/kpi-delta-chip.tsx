import { cn } from "@/lib/utils";

export function KpiDeltaChip({ value }: { value: number }) {
  const formatted = `${value >= 0 ? "+" : ""}${(value * 100).toFixed(1)}%`;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
        value >= 0 ? "bg-success-8/30 text-success-11" : "bg-danger-8/30 text-danger-11"
      )}
    >
      {formatted}
    </span>
  );
}
