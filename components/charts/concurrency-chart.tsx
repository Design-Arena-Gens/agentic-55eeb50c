"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function ConcurrencyChart({ data }: { data: { timestamp: number; concurrency: number; queue: number }[] }) {
  const recent = data.slice(-120);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={recent} margin={{ left: 0, right: 16, top: 12, bottom: 0 }}>
        <defs>
          <linearGradient id="concurrency" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#6173ef" stopOpacity={0.6} />
            <stop offset="95%" stopColor="#6173ef" stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="queue" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#c25a69" stopOpacity={0.6} />
            <stop offset="95%" stopColor="#c25a69" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" vertical={false} />
        <XAxis dataKey="timestamp" stroke="rgba(255,255,255,0.35)" fontSize={12} tickFormatter={(value) => new Date(value).toLocaleTimeString()} />
        <YAxis stroke="rgba(255,255,255,0.35)" fontSize={12} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            background: "rgba(20,22,30,0.92)",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
            fontSize: 12
          }}
        />
        <Area type="monotone" dataKey="concurrency" stroke="#6173ef" fill="url(#concurrency)" strokeWidth={2} />
        <Area type="monotone" dataKey="queue" stroke="#c25a69" fill="url(#queue)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
