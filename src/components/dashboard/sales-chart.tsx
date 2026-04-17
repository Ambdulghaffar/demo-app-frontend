"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Jan", total: Math.floor(Math.random() * 2000) + 500 },
  { name: "Fév", total: Math.floor(Math.random() * 2000) + 500 },
  { name: "Mar", total: Math.floor(Math.random() * 2000) + 500 },
  { name: "Avr", total: Math.floor(Math.random() * 2000) + 500 },
  { name: "Mai", total: Math.floor(Math.random() * 2000) + 500 },
  { name: "Juin", total: Math.floor(Math.random() * 2000) + 500 },
  { name: "Juil", total: Math.floor(Math.random() * 2000) + 500 },
  { name: "Aoû", total: Math.floor(Math.random() * 2000) + 500 },
  { name: "Sep", total: Math.floor(Math.random() * 2000) + 500 },
  { name: "Oct", total: Math.floor(Math.random() * 2000) + 500 },
  { name: "Nov", total: Math.floor(Math.random() * 2000) + 500 },
  { name: "Déc", total: Math.floor(Math.random() * 2000) + 500 },
];

export function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          cursor={{ fill: "transparent" }}
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            border: "1px solid #ccc",
            borderRadius: "0.5rem",
          }}
        />
        <Legend iconType="circle" />
        <Bar dataKey="total" fill="#ec4899" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
