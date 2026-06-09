"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";

const data = [
  { date: "Jan 01", contributions: 1200 },
  { date: "Jan 15", contributions: 2850 },
  { date: "Fév 01", contributions: 3200 },
  { date: "Fév 15", contributions: 4100 },
  { date: "Mar 01", contributions: 3800 },
  { date: "Mar 15", contributions: 5200 },
  { date: "Avr 01", contributions: 4900 },
  { date: "Avr 15", contributions: 6100 },
  { date: "Mai 01", contributions: 5800 },
];

export function ExpenseOverviewChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-gray-800">
          Évolution des Contributions
        </h3>
        <button className="flex items-center gap-1 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors">
          Ce Trimestre
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#6B7280" }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#6B7280" }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={false}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #10B981",
                borderRadius: "8px",
                fontSize: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
              formatter={(value: number) => [
                `${value.toLocaleString()} contributions`,
                "Total",
              ]}
              labelStyle={{ color: "#374151", fontWeight: 600 }}
            />
            <Line
              type="monotone"
              dataKey="contributions"
              stroke="#10B981"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#10B981", strokeWidth: 2, stroke: "white" }}
              activeDot={{
                r: 6,
                fill: "#10B981",
                strokeWidth: 2,
                stroke: "white",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
