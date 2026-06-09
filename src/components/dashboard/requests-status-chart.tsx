"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Wolof", value: 12840, color: "#10B981" },
  { name: "Bambara", value: 9650, color: "#F59E0B" },
  { name: "Dioula", value: 7230, color: "#14B8A6" },
  { name: "Pulaar", value: 5890, color: "#8B5CF6" },
  { name: "Autres", value: 3120, color: "#EF4444" },
];

const legendItems = [
  { label: "Wolof", value: 12840, percent: 35, color: "#10B981" },
  { label: "Bambara", value: 9650, percent: 26, color: "#F59E0B" },
  { label: "Dioula", value: 7230, percent: 20, color: "#14B8A6" },
  { label: "Pulaar", value: 5890, percent: 10, color: "#8B5CF6" },
  { label: "Autres", value: 3120, percent: 9, color: "#EF4444" },
];

export function RequestsStatusChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="text-base font-semibold text-gray-800 mb-5">
        Distribution Linguistique
      </h3>
      <div className="flex flex-col items-center gap-4">
        {/* Donut Chart */}
        <div className="relative w-36 h-36 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-gray-800">38.7K</span>
            <span className="text-xs text-gray-500">Phrases</span>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full space-y-2">
          {legendItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-800">
                  {item.value.toLocaleString()}
                </span>
                <span className="text-xs text-gray-400">
                  ({item.percent}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
