"use client";

import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import type { ErrorBreakdown } from "@/lib/data/types";

export function ErrorsBreakdownChart({ data }: { data: ErrorBreakdown[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ left: 10, right: 10, top: 12, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis dataKey="type" stroke="rgba(255,255,255,0.35)" fontSize={12} />
        <YAxis stroke="rgba(255,255,255,0.35)" fontSize={12} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            background: "rgba(20,22,30,0.92)",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.12)",
            fontSize: 12
          }}
        />
        <Bar dataKey="count" fill="#c25a69" radius={[8, 8, 8, 8]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
