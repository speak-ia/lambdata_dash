"use client";

import {
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Flag,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const tableData = [
  {
    id: "CONT-2024-4872",
    contributor: "Fatou Ndiaye",
    type: "Audio",
    language: "Wolof",
    date: "Mai 15, 2024",
    status: "Signalé",
    statusColor: "bg-red-100 text-red-700",
    score: "0.65",
    avatar: "FN",
    avatarColor: "bg-blue-100 text-blue-700",
  },
  {
    id: "CONT-2024-4871",
    contributor: "Moussa Traoré",
    type: "Traduction",
    language: "Bambara",
    date: "Mai 15, 2024",
    status: "En Revue",
    statusColor: "bg-yellow-100 text-yellow-700",
    score: "0.72",
    avatar: "MT",
    avatarColor: "bg-orange-100 text-orange-700",
  },
  {
    id: "CONT-2024-4870",
    contributor: "Aissatou Ba",
    type: "Image",
    language: "Dioula",
    date: "Mai 14, 2024",
    status: "Signalé",
    statusColor: "bg-red-100 text-red-700",
    score: "0.58",
    avatar: "AB",
    avatarColor: "bg-purple-100 text-purple-700",
  },
  {
    id: "CONT-2024-4869",
    contributor: "Ibrahim Coulibaly",
    type: "Audio",
    language: "Pulaar",
    date: "Mai 14, 2024",
    status: "En Revue",
    statusColor: "bg-yellow-100 text-yellow-700",
    score: "0.81",
    avatar: "IC",
    avatarColor: "bg-red-100 text-red-700",
  },
  {
    id: "CONT-2024-4868",
    contributor: "Mariam Sow",
    type: "Traduction",
    language: "Wolof",
    date: "Mai 14, 2024",
    status: "Signalé",
    statusColor: "bg-red-100 text-red-700",
    score: "0.44",
    avatar: "MS",
    avatarColor: "bg-pink-100 text-pink-700",
  },
];

export function PendingApprovalsTable() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-800">
          <div className="flex items-center gap-2">
            <Flag className="h-4 w-4 text-red-500" />
            File de Modération
          </div>
        </h3>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors">
            Tous Types
            <ChevronDownIcon />
          </button>
          <button className="flex items-center gap-1 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors">
            Toutes Langues
            <ChevronDownIcon />
          </button>
          <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <svg
              className="h-4 w-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                ID Contribution
              </th>
              <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Contributeur
              </th>
              <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Langue
              </th>
              <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Score Qualité
              </th>
              <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-3 text-sm font-medium text-emerald-600">
                  {row.id}
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback
                        className={`${row.avatarColor} text-[10px] font-semibold`}
                      >
                        {row.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-800 font-medium">
                      {row.contributor}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      row.type === "Audio"
                        ? "bg-blue-100 text-blue-700"
                        : row.type === "Traduction"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {row.type}
                  </span>
                </td>
                <td className="py-3 px-3 text-sm text-gray-600">
                  {row.language}
                </td>
                <td className="py-3 px-3 text-sm text-gray-600">
                  {row.date}
                </td>
                <td className="py-3 px-3">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${row.statusColor}`}
                  >
                    {row.status === "Signalé" && (
                      <AlertTriangle className="h-3 w-3 inline mr-1" />
                    )}
                    {row.status}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          parseFloat(row.score) >= 0.8
                            ? "bg-emerald-500"
                            : parseFloat(row.score) >= 0.6
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{
                          width: `${parseFloat(row.score) * 100}%`,
                        }}
                      />
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        parseFloat(row.score) >= 0.8
                          ? "text-emerald-600"
                          : parseFloat(row.score) >= 0.6
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {row.score}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1">
                    <button className="p-1 rounded hover:bg-gray-100 transition-colors">
                      <Eye className="h-4 w-4 text-gray-400" />
                    </button>
                    <button className="p-1 rounded hover:bg-gray-100 transition-colors">
                      <MoreVertical className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <span className="text-sm text-gray-500">
          Affichage de 1 à 5 sur 47 résultats
        </span>
        <div className="flex items-center gap-1">
          <button className="p-1 rounded hover:bg-gray-100 transition-colors">
            <ChevronLeft className="h-4 w-4 text-gray-400" />
          </button>
          {[1, 2, 3, "...", 10].map((page, i) => (
            <button
              key={i}
              className={`w-7 h-7 rounded text-xs font-medium transition-colors ${
                page === 1
                  ? "bg-emerald-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="p-1 rounded hover:bg-gray-100 transition-colors">
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}
