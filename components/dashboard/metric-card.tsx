"use client";

import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import type { KPI } from "@/lib/data/types";
import { KpiDeltaChip } from "./kpi-delta-chip";

const statusColors: Record<KPI["status"], string> = {
  good: "bg-success-9/50",
  warn: "bg-warning-9/50",
  bad: "bg-danger-9/50",
  neutral: "bg-neutral-6/50"
};

const areaColors: Record<KPI["status"], string> = {
  good: "#49af71",
  warn: "#c49427",
  bad: "#c25a69",
  neutral: "#737a95"
};

export function MetricCard({ metric }: { metric: KPI }) {
  return (
    <div className="relative flex flex-col gap-2 rounded-[12px] border border-border/60 bg-neutral-2/70 p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[12px] uppercase tracking-wider text-muted">
            <span className={cn("h-2 w-2 rounded-full", statusColors[metric.status])} aria-hidden />
            {metric.label}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[18px] font-semibold text-foreground">{metric.value}</span>
            <KpiDeltaChip value={metric.delta} />
          </div>
        </div>
        <div className="h-12 w-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metric.trend}>
              <defs>
                <linearGradient id={`spark-${metric.id}`} x1="0" x2="0" y1="0" y2="1">
                  <stop stopColor={areaColors[metric.status]} stopOpacity={0.8} />
                  <stop offset="1" stopColor={areaColors[metric.status]} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={areaColors[metric.status]}
                strokeWidth={2}
                fill={`url(#spark-${metric.id})`}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
