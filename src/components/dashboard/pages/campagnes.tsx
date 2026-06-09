"use client";

import { useState } from "react";
import {
  Megaphone,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Calendar,
  Users,
  FileText,
  Pause,
  Play,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DataTablePagination } from "@/components/dashboard/data-table-pagination";

const campaigns = [
  {
    id: "CAMP-001",
    name: "Collecte Vocale Wolof - Santé",
    type: "Audio",
    language: "Wolof",
    theme: "Santé",
    status: "Active",
    statusColor: "bg-emerald-100 text-emerald-700",
    contributors: 89,
    phrases: 450,
    progress: 72,
    startDate: "01 Mai 2024",
    endDate: "30 Juin 2024",
    description:
      "Campagne de collecte audio pour des phrases médicales en Wolof. Les contributeurs enregistrent des phrases liées à la santé, aux symptômes et aux traitements.",
  },
  {
    id: "CAMP-002",
    name: "Traduction Bambara - Agriculture",
    type: "Traduction",
    language: "Bambara",
    theme: "Agriculture",
    status: "Active",
    statusColor: "bg-emerald-100 text-emerald-700",
    contributors: 56,
    phrases: 320,
    progress: 58,
    startDate: "15 Avril 2024",
    endDate: "15 Juin 2024",
    description:
      "Traduction de phrases agricoles en Bambara. Focus sur les techniques de culture, les saisons et les récoltes.",
  },
  {
    id: "CAMP-003",
    name: "Labellisation Images Dioula",
    type: "Image",
    language: "Dioula",
    theme: "Vie Quotidienne",
    status: "En Pause",
    statusColor: "bg-yellow-100 text-yellow-700",
    contributors: 34,
    phrases: 200,
    progress: 45,
    startDate: "01 Mars 2024",
    endDate: "31 Mai 2024",
    description:
      "Labellisation d'images de la vie quotidienne en Dioula. Les contributeurs décrivent et annotent des images.",
  },
  {
    id: "CAMP-004",
    name: "Collecte Vocale Pulaar - Éducation",
    type: "Audio",
    language: "Pulaar",
    theme: "Éducation",
    status: "Active",
    statusColor: "bg-emerald-100 text-emerald-700",
    contributors: 42,
    phrases: 280,
    progress: 31,
    startDate: "10 Mai 2024",
    endDate: "10 Juillet 2024",
    description:
      "Collecte vocale pour des phrases éducatives en Pulaar. Scolarité, formation et enseignement.",
  },
  {
    id: "CAMP-005",
    name: "Traduction Wolof - Finance",
    type: "Traduction",
    language: "Wolof",
    theme: "Finance",
    status: "Terminée",
    statusColor: "bg-gray-100 text-gray-600",
    contributors: 112,
    phrases: 600,
    progress: 100,
    startDate: "01 Janvier 2024",
    endDate: "31 Mars 2024",
    description:
      "Traduction de phrases financières en Wolof. Banque, épargne, microcrédit et Mobile Money.",
  },
  {
    id: "CAMP-006",
    name: "Collecte Vocale Bambara - Commerce",
    type: "Audio",
    language: "Bambara",
    theme: "Commerce",
    status: "Active",
    statusColor: "bg-emerald-100 text-emerald-700",
    contributors: 67,
    phrases: 380,
    progress: 84,
    startDate: "01 Février 2024",
    endDate: "31 Mai 2024",
    description:
      "Collecte audio pour des phrases commerciales en Bambara. Marchés, prix, négociations.",
  },
  {
    id: "CAMP-007",
    name: "Collecte Vocale Soninké - Commerce",
    type: "Audio",
    language: "Soninké",
    theme: "Commerce",
    status: "Active",
    statusColor: "bg-emerald-100 text-emerald-700",
    contributors: 38,
    phrases: 250,
    progress: 55,
    startDate: "20 Mars 2024",
    endDate: "20 Juin 2024",
    description:
      "Collecte vocale de phrases commerciales en Soninké. Échanges transfrontaliers, prix et négoce dans les marchés locaux.",
  },
  {
    id: "CAMP-008",
    name: "Traduction Malinké - Éducation",
    type: "Traduction",
    language: "Malinké",
    theme: "Éducation",
    status: "Active",
    statusColor: "bg-emerald-100 text-emerald-700",
    contributors: 29,
    phrases: 180,
    progress: 22,
    startDate: "05 Juin 2024",
    endDate: "05 Septembre 2024",
    description:
      "Traduction de phrases éducatives en Malinké. Alphabétisation, scolarisation et contenu pédagogique pour les jeunes apprenants.",
  },
  {
    id: "CAMP-009",
    name: "Labellisation Images Wolof - Santé",
    type: "Image",
    language: "Wolof",
    theme: "Santé",
    status: "En Pause",
    statusColor: "bg-yellow-100 text-yellow-700",
    contributors: 15,
    phrases: 120,
    progress: 60,
    startDate: "10 Février 2024",
    endDate: "10 Mai 2024",
    description:
      "Labellisation d'images médicales en Wolof. Identification visuelle de symptômes, équipements et pratiques de santé.",
  },
  {
    id: "CAMP-010",
    name: "Collecte Vocale Dioula - Finance",
    type: "Audio",
    language: "Dioula",
    theme: "Finance",
    status: "Active",
    statusColor: "bg-emerald-100 text-emerald-700",
    contributors: 51,
    phrases: 310,
    progress: 47,
    startDate: "15 Avril 2024",
    endDate: "15 Juillet 2024",
    description:
      "Collecte audio de phrases financières en Dioula. Services bancaires, épargne communautaire et transactions mobiles.",
  },
  {
    id: "CAMP-011",
    name: "Traduction Pulaar - Vie Quotidienne",
    type: "Traduction",
    language: "Pulaar",
    theme: "Vie Quotidienne",
    status: "Terminée",
    statusColor: "bg-gray-100 text-gray-600",
    contributors: 95,
    phrases: 550,
    progress: 100,
    startDate: "01 Décembre 2023",
    endDate: "28 Février 2024",
    description:
      "Traduction de phrases de la vie quotidienne en Pulaar. Activités domestiques, relations sociales et culture locale.",
  },
  {
    id: "CAMP-012",
    name: "Labellisation Images Bambara - Agriculture",
    type: "Image",
    language: "Bambara",
    theme: "Agriculture",
    status: "Active",
    statusColor: "bg-emerald-100 text-emerald-700",
    contributors: 44,
    phrases: 290,
    progress: 38,
    startDate: "01 Mai 2024",
    endDate: "01 Août 2024",
    description:
      "Labellisation d'images agricoles en Bambara. Cultures, outils, irrigation et pratiques agricoles traditionnelles.",
  },
];

export default function CampagnesPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<
    (typeof campaigns)[0] | null
  >(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const totalPages = Math.ceil(campaigns.length / pageSize);
  const paginatedCampaigns = campaigns.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const openDetail = (c: (typeof campaigns)[0]) => {
    setSelectedCampaign(c);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Gestion des Campagnes
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Créez et gérez les campagnes de collecte de données linguistiques
          </p>
        </div>
        <Button
          className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus className="h-4 w-4" /> Nouvelle Campagne
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Campagnes Actives",
            value: String(campaigns.filter((c) => c.status === "Active").length),
            icon: Megaphone,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Total Contributeurs",
            value: campaigns
              .reduce((sum, c) => sum + c.contributors, 0)
              .toLocaleString(),
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Phrases En Cours",
            value: campaigns
              .reduce((sum, c) => sum + c.phrases, 0)
              .toLocaleString(),
            icon: FileText,
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
          {
            label: "Thématiques",
            value: String(new Set(campaigns.map((c) => c.theme)).size),
            icon: Filter,
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
        ].map((s) => (
          <div
            key={s.label}
            className={`${s.bg} border border-gray-100 rounded-xl p-4 flex items-center gap-4`}
          >
            <div className={s.color}>
              <s.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            placeholder="Rechercher une campagne..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <button className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50">
          <Filter className="h-3.5 w-3.5" /> Statut
        </button>
        <button className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50">
          <Filter className="h-3.5 w-3.5" /> Langue
        </button>
        <button className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50">
          <Filter className="h-3.5 w-3.5" /> Thématique
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedCampaigns.map((c) => (
          <div
            key={c.id}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-emerald-600">
                {c.id}
              </span>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.statusColor}`}
              >
                {c.status}
              </span>
            </div>
            <h4 className="text-sm font-semibold text-gray-800 mb-2">
              {c.name}
            </h4>
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  c.type === "Audio"
                    ? "bg-blue-100 text-blue-700"
                    : c.type === "Traduction"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-amber-100 text-amber-700"
                }`}
              >
                {c.type}
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {c.language}
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {c.theme}
              </span>
            </div>
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-500">Progression</span>
                <span className="font-semibold text-gray-800">
                  {c.progress}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${c.progress === 100 ? "bg-gray-400" : "bg-emerald-500"}`}
                  style={{ width: `${c.progress}%` }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" /> {c.contributors}
              </span>
              <span className="flex items-center gap-1">
                <FileText className="h-3 w-3" /> {c.phrases}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {c.endDate}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
              <button
                className="flex-1 text-xs font-medium text-emerald-600 border border-emerald-200 rounded-lg py-1.5 hover:bg-emerald-50 transition-colors"
                onClick={() => openDetail(c)}
              >
                <Eye className="h-3 w-3 inline mr-1" /> Détails
              </button>
              <button className="p-1.5 rounded-lg hover:bg-gray-100">
                <MoreVertical className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl px-4">
        <DataTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={campaigns.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
          pageSizeOptions={[3, 6, 9, 12]}
          label="campagnes"
        />
      </div>

      {/* Modal: Nouvelle Campagne */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Nouvelle Campagne</DialogTitle>
            <DialogDescription>
              Créez une nouvelle campagne de collecte de données linguistiques
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">
                Nom de la Campagne
              </label>
              <input
                placeholder="Ex: Collecte Vocale Wolof - Éducation"
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">
                  Type de Collecte
                </label>
                <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option>Audio</option>
                  <option>Traduction</option>
                  <option>Image</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">
                  Langue Cible
                </label>
                <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option>Wolof</option>
                  <option>Bambara</option>
                  <option>Dioula</option>
                  <option>Pulaar</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">
                  Thématique
                </label>
                <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option>Santé</option>
                  <option>Agriculture</option>
                  <option>Éducation</option>
                  <option>Finance</option>
                  <option>Commerce</option>
                  <option>Vie Quotidienne</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">
                  Récompense par Phrase
                </label>
                <input
                  type="number"
                  defaultValue="50"
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <p className="text-[10px] text-gray-400 mt-1">En XOF</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">
                  Date de Début
                </label>
                <input
                  type="date"
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">
                  Date de Fin
                </label>
                <input
                  type="date"
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Décrivez l'objectif de cette campagne..."
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCreateModal(false)}
            >
              Annuler
            </Button>
            <Button
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
              onClick={() => setShowCreateModal(false)}
            >
              Créer la Campagne
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Détails Campagne */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="sm:max-w-xl">
          {selectedCampaign && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <DialogTitle>{selectedCampaign.name}</DialogTitle>
                    <DialogDescription>
                      {selectedCampaign.id}
                    </DialogDescription>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${selectedCampaign.statusColor}`}
                  >
                    {selectedCampaign.status}
                  </span>
                </div>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <p className="text-sm text-gray-600">
                  {selectedCampaign.description}
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-blue-700">
                      {selectedCampaign.type}
                    </p>
                    <p className="text-[10px] text-blue-600">Type</p>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-emerald-700">
                      {selectedCampaign.language}
                    </p>
                    <p className="text-[10px] text-emerald-600">Langue</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-amber-700">
                      {selectedCampaign.theme}
                    </p>
                    <p className="text-[10px] text-amber-600">Thématique</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-gray-500">Progression</span>
                    <span className="font-bold text-gray-800">
                      {selectedCampaign.progress}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${selectedCampaign.progress === 100 ? "bg-gray-400" : "bg-emerald-500"}`}
                      style={{ width: `${selectedCampaign.progress}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Contributeurs :</span>
                    <span className="font-semibold">
                      {selectedCampaign.contributors}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Phrases :</span>
                    <span className="font-semibold">
                      {selectedCampaign.phrases}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Début :</span>
                    <span className="font-semibold">
                      {selectedCampaign.startDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Fin :</span>
                    <span className="font-semibold">
                      {selectedCampaign.endDate}
                    </span>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  className="gap-1.5"
                  onClick={() => setShowDetailModal(false)}
                >
                  <Pause className="h-3.5 w-3.5" /> Mettre en Pause
                </Button>
                <Button
                  variant="outline"
                  className="gap-1.5"
                  onClick={() => setShowDetailModal(false)}
                >
                  <Pencil className="h-3.5 w-3.5" /> Modifier
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white gap-1.5"
                  onClick={() => setShowDetailModal(false)}
                >
                  <Trash2 className="h-3.5 w-3.5" /> Supprimer
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
