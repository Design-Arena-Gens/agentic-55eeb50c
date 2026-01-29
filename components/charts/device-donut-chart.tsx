"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { DeviceShare } from "@/lib/data/types";

const COLORS = ["#6173ef", "#4bbdd6", "#c25a69"];

export function DeviceDonutChart({ data }: { data: DeviceShare[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} innerRadius={48} outerRadius={72} paddingAngle={6} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "rgba(20,22,30,0.92)",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.12)",
            fontSize: 12
          }}
          formatter={(value: number, name) => [`${value}%`, name]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
