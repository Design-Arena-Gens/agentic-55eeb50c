"use client";

import type { SecurityMetric } from "@/lib/data/types";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const STATUS_COLORS: Record<SecurityMetric["status"], string> = {
  ok: "#3b965f",
  warn: "#c49427",
  critical: "#c25a69"
};

export function SecurityOverviewCard({ metrics }: { metrics: SecurityMetric[] }) {
  const donutData = Object.entries(
    metrics.reduce<Record<string, number>>((acc, metric) => {
      acc[metric.status] = (acc[metric.status] ?? 0) + 1;
      return acc;
    }, {})
  ).map(([status, value]) => ({ status, value }));

  return (
    <div className="rounded-[12px] border border-border/60 bg-neutral-2/70 p-4">
      <h4 className="text-[14px] font-semibold text-foreground">Security posture</h4>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <ul className="space-y-2 text-[12px] text-muted">
          {metrics.map((metric) => (
            <li key={metric.id} className="flex items-center justify-between rounded-[10px] border border-border/60 bg-neutral-3/60 px-3 py-2">
              <div>
                <p className="text-[13px] text-foreground">{metric.label}</p>
                <p>{metric.value} {metric.unit}</p>
              </div>
              <span className="text-[12px] font-semibold" style={{ color: STATUS_COLORS[metric.status] }}>
                {metric.status}
              </span>
            </li>
          ))}
        </ul>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={donutData} dataKey="value" nameKey="status" innerRadius={48} outerRadius={70}>
                {donutData.map((entry) => (
                  <Cell key={entry.status} fill={STATUS_COLORS[entry.status as keyof typeof STATUS_COLORS]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1 text-[11px] text-muted">
            {donutData.map((entry) => (
              <div key={entry.status} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: STATUS_COLORS[entry.status as keyof typeof STATUS_COLORS] }} />
                {entry.status} • {entry.value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
