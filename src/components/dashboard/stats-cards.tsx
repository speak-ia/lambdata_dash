"use client";

import {
  Users,
  Mic,
  CheckCircle2,
  Wallet,
  Download,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const stats = [
  {
    title: "Contributeurs Actifs",
    value: "1,247",
    change: "+18% cette semaine",
    trend: "up" as const,
    icon: Users,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    title: "Total Contributions",
    value: "45,832",
    change: "+12% cette semaine",
    trend: "up" as const,
    icon: Mic,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    title: "Taux de Validation",
    value: "87.3%",
    change: "+3% cette semaine",
    trend: "up" as const,
    icon: CheckCircle2,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    title: "Paiements en Attente",
    value: "23",
    change: "+5 nouvelles demandes",
    trend: "up" as const,
    icon: Wallet,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    title: "Corpus Exportés",
    value: "12",
    change: "+2 ce mois",
    trend: "up" as const,
    icon: Download,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`${stat.iconBg} w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0`}
            >
              <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
            </div>
            <span className="text-sm text-gray-500 font-medium">
              {stat.title}
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {stat.value}
          </div>
          <div className="flex items-center gap-1">
            {stat.trend === "up" ? (
              <TrendingUp className="h-3 w-3 text-emerald-500" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-500" />
            )}
            <span
              className={`text-xs font-medium ${
                stat.trend === "up" ? "text-emerald-500" : "text-red-500"
              }`}
            >
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
