"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { TrafficSeriesPoint } from "@/lib/data/types";
import { useMemo } from "react";

function formatTime(timestamp: number) {
  const date = new Date(timestamp);
  return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
}

export function TrafficAreaChart({ data, colors }: { data: TrafficSeriesPoint[]; colors: [string, string, string] }) {
  const sliced = useMemo(() => data.slice(-120), [data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={sliced} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
        <defs>
          {colors.map((color, index) => (
            <linearGradient key={color} id={`traffic-${index}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0.05} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
        <XAxis dataKey="timestamp" stroke="rgba(255,255,255,0.35)" tickFormatter={formatTime} fontSize={12} tickMargin={8} />
        <YAxis stroke="rgba(255,255,255,0.35)" fontSize={12} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
        <Tooltip
          contentStyle={{
            background: "rgba(20,22,30,0.92)",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
            fontSize: 12
          }}
          formatter={(value: number, name) => [value.toLocaleString(), name]}
          labelFormatter={(label) => new Date(label).toLocaleTimeString()}
        />
        <Area type="monotone" dataKey="pageviews" stackId="1" stroke={colors[0]} fill="url(#traffic-0)" strokeWidth={2} />
        <Area type="monotone" dataKey="events" stackId="1" stroke={colors[1]} fill="url(#traffic-1)" strokeWidth={2} />
        <Area type="monotone" dataKey="api" stackId="1" stroke={colors[2]} fill="url(#traffic-2)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
