"use client";

import { Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { AgentCostPoint } from "@/lib/data/types";
import { useMemo } from "react";

export function AgentRunsCostChart({ data, colors }: { data: AgentCostPoint[]; colors: { bar: string; line: string } }) {
  const sliced = useMemo(() => data.slice(-80), [data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={sliced} margin={{ left: 0, right: 16, top: 12, bottom: 0 }}>
        <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
        <XAxis dataKey="timestamp" tickFormatter={(value) => new Date(value).toLocaleTimeString()} stroke="rgba(255,255,255,0.35)" fontSize={12} />
        <YAxis yAxisId="left" stroke="rgba(255,255,255,0.35)" fontSize={12} axisLine={false} tickLine={false} />
        <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.35)" fontSize={12} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
        <Tooltip
          contentStyle={{
            background: "rgba(20,22,30,0.92)",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
            fontSize: 12
          }}
          formatter={(value: number, name) => {
            if (name === "cost") {
              return [`$${value.toFixed(2)}`, "Cost"];
            }
            return [value, "Runs"];
          }}
          labelFormatter={(label) => new Date(label).toLocaleTimeString()}
        />
        <Bar yAxisId="left" dataKey="runs" fill={colors.bar} radius={[8, 8, 8, 8]} opacity={0.8} />
        <Line yAxisId="right" type="monotone" dataKey="cost" stroke={colors.line} strokeWidth={2.5} dot={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
