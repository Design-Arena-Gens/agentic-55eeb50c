"use client";

import { LineChart, ResponsiveContainer, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceDot } from "recharts";
import type { CwvTrendPoint } from "@/lib/data/types";

export function WebsiteCwvTrend({ data }: { data: CwvTrendPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ left: 16, right: 16, top: 12, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis dataKey="timestamp" stroke="rgba(255,255,255,0.35)" fontSize={12} tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} />
        <YAxis stroke="rgba(255,255,255,0.35)" fontSize={12} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          contentStyle={{
            background: "rgba(20,22,30,0.92)",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
            fontSize: 12
          }}
          labelFormatter={(label) => new Date(label).toLocaleString()}
        />
        <Line type="monotone" dataKey="lcp" stroke="#6173ef" strokeWidth={2} dot={false} name="LCP (s)" />
        <Line type="monotone" dataKey="inp" stroke="#4bbdd6" strokeWidth={2} dot={false} name="INP (ms)" />
        <Line type="monotone" dataKey="cls" stroke="#c25a69" strokeWidth={2} dot={false} name="CLS" />
        {data
          .filter((point) => point.deploy)
          .map((point) => (
            <ReferenceDot key={point.timestamp} x={point.timestamp} y={point.lcp} r={5} fill="#a57e1d" stroke="none" label="Deploy" />
          ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
