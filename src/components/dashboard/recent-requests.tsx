"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const requests = [
  {
    id: "PAY-2024-0189",
    status: "En Attente",
    statusColor: "bg-yellow-100 text-yellow-700",
    name: "Fatou Ndiaye",
    role: "Contributeur Niveau 3",
    amount: "15,000 XOF",
    date: "Mai 15, 2024",
    operator: "Wave",
    avatar: "FN",
    avatarColor: "bg-blue-100 text-blue-700",
  },
  {
    id: "PAY-2024-0188",
    status: "En Attente",
    statusColor: "bg-yellow-100 text-yellow-700",
    name: "Moussa Traoré",
    role: "Contributeur Niveau 2",
    amount: "8,500 XOF",
    date: "Mai 15, 2024",
    operator: "Orange Money",
    avatar: "MT",
    avatarColor: "bg-orange-100 text-orange-700",
  },
  {
    id: "PAY-2024-0187",
    status: "Payé",
    statusColor: "bg-emerald-100 text-emerald-700",
    name: "Aissatou Ba",
    role: "Contributeur Niveau 4",
    amount: "22,000 XOF",
    date: "Mai 14, 2024",
    operator: "MTN",
    avatar: "AB",
    avatarColor: "bg-purple-100 text-purple-700",
  },
  {
    id: "PAY-2024-0186",
    status: "Rejeté",
    statusColor: "bg-red-100 text-red-700",
    name: "Ibrahim Coulibaly",
    role: "Contributeur Niveau 1",
    amount: "3,200 XOF",
    date: "Mai 14, 2024",
    operator: "Free Money",
    avatar: "IC",
    avatarColor: "bg-red-100 text-red-700",
  },
  {
    id: "PAY-2024-0185",
    status: "En Attente",
    statusColor: "bg-yellow-100 text-yellow-700",
    name: "Mariam Sow",
    role: "Contributeur Niveau 3",
    amount: "12,750 XOF",
    date: "Mai 14, 2024",
    operator: "Wave",
    avatar: "MS",
    avatarColor: "bg-pink-100 text-pink-700",
  },
];

export function RecentRequests() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-800">
          Demandes de Paiement
        </h3>
        <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
          Voir Tout
        </button>
      </div>
      <div className="space-y-0">
        {requests.map((req, index) => (
          <div
            key={req.id}
            className={`flex items-start gap-3 py-3 ${
              index < requests.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <Avatar className="h-8 w-8 mt-0.5">
              <AvatarFallback
                className={`${req.avatarColor} text-[10px] font-semibold`}
              >
                {req.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-medium text-emerald-600">
                  {req.id}
                </span>
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${req.statusColor}`}
                >
                  {req.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {req.name}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {req.role} · {req.operator}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">
                    {req.amount}
                  </p>
                  <p className="text-[11px] text-gray-400">{req.date}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
