"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Mic,
  CheckCircle2,
  Wallet,
  Download,
  TrendingUp,
} from "lucide-react";

export function StatsCards() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setData(json);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const stats = [
    {
      title: "Contributeurs Actifs",
      value: data ? data.totalUsers.toLocaleString() : "...",
      change: "Inscriptions réelles",
      icon: Users,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      title: "Total Contributions",
      value: data ? data.totalContributions.toLocaleString() : "...",
      change: "Voix, textes & images",
      icon: Mic,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      title: "En attente de Modération",
      value: data ? data.pendingContributions.toLocaleString() : "...",
      change: "Contributions à valider",
      icon: CheckCircle2,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      title: "Paiements en Attente",
      value: data ? `${data.totalPendingXOF.toLocaleString()} XOF` : "...",
      change: "Demandes Mobile Money",
      icon: Wallet,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      title: "Paiements Validés",
      value: data ? `${data.totalPaidXOF.toLocaleString()} XOF` : "...",
      change: "Montant total versé",
      icon: Download,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
  ];

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
            <TrendingUp className="h-3 w-3 text-emerald-500" />
            <span className="text-xs font-medium text-emerald-500">
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
