"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { DataTablePagination } from "@/components/dashboard/data-table-pagination";

const initialContributions = [
  { id: "CONT-4872", contributor: "Fatou Ndiaye", type: "Audio", language: "Wolof", date: "Mai 15, 2024", status: "Signalé", statusColor: "bg-red-100 text-red-700", score: 0.65, flagReason: "Qualité audio médiocre", avatar: "FN", avatarColor: "bg-blue-100 text-blue-700", detail: "Enregistrement avec beaucoup de bruit de fond. La phrase est partiellement audible." },
  { id: "CONT-4871", contributor: "Moussa Traoré", type: "Traduction", language: "Bambara", date: "Mai 15, 2024", status: "En Revue", statusColor: "bg-yellow-100 text-yellow-700", score: 0.72, flagReason: "Traduction approximative", avatar: "MT", avatarColor: "bg-orange-100 text-orange-700", detail: "La traduction ne capture pas complètement le sens de la phrase source." },
  { id: "CONT-4870", contributor: "Aissatou Ba", type: "Image", language: "Dioula", date: "Mai 14, 2024", status: "Signalé", statusColor: "bg-red-100 text-red-700", score: 0.58, flagReason: "Annotation incorrecte", avatar: "AB", avatarColor: "bg-purple-100 text-purple-700", detail: "Les étiquettes appliquées à l'image ne correspondent pas au contenu visible." },
  { id: "CONT-4869", contributor: "Ibrahim Coulibaly", type: "Audio", language: "Pulaar", date: "Mai 14, 2024", status: "En Revue", statusColor: "bg-yellow-100 text-yellow-700", score: 0.81, flagReason: "Possible triche", avatar: "IC", avatarColor: "bg-red-100 text-red-700", detail: "L'audio semble être une lecture mécanique plutôt qu'une pronunciation naturelle." },
  { id: "CONT-4868", contributor: "Mariam Sow", type: "Traduction", language: "Wolof", date: "Mai 14, 2024", status: "Signalé", statusColor: "bg-red-100 text-red-700", score: 0.44, flagReason: "Contenu offensant", avatar: "MS", avatarColor: "bg-pink-100 text-pink-700", detail: "La traduction contient du langage inapproprié ou offensant." },
  { id: "CONT-4867", contributor: "Omar Diallo", type: "Audio", language: "Bambara", date: "Mai 13, 2024", status: "En Revue", statusColor: "bg-yellow-100 text-yellow-700", score: 0.77, flagReason: "Doublon détecté", avatar: "OD", avatarColor: "bg-green-100 text-green-700", detail: "Cet audio semble être une copie d'une soumission précédente du même contributeur." },
  { id: "CONT-4866", contributor: "Awa Keita", type: "Image", language: "Dioula", date: "Mai 13, 2024", status: "Signalé", statusColor: "bg-red-100 text-red-700", score: 0.52, flagReason: "Image floue", avatar: "AK", avatarColor: "bg-teal-100 text-teal-700", detail: "L'image est trop floue pour permettre une annotation fiable." },
  { id: "CONT-4865", contributor: "Amadou Bamba", type: "Audio", language: "Wolof", date: "Mai 13, 2024", status: "Signalé", statusColor: "bg-red-100 text-red-700", score: 0.38, flagReason: "Prononciation incorrecte", avatar: "AB", avatarColor: "bg-amber-100 text-amber-700", detail: "La prononciation ne correspond pas aux standards attendus pour cette langue." },
  { id: "CONT-4864", contributor: "Khady Sène", type: "Traduction", language: "Soninké", date: "Mai 12, 2024", status: "En Revue", statusColor: "bg-yellow-100 text-yellow-700", score: 0.70, flagReason: "Traduction hors contexte", avatar: "KS", avatarColor: "bg-blue-100 text-blue-700", detail: "La traduction ne tient pas compte du contexte culturel spécifique de la phrase." },
  { id: "CONT-4863", contributor: "Boubacar Diallo", type: "Audio", language: "Pulaar", date: "Mai 12, 2024", status: "Signalé", statusColor: "bg-red-100 text-red-700", score: 0.47, flagReason: "Audio trop court", avatar: "BD", avatarColor: "bg-orange-100 text-orange-700", detail: "L'enregistrement est trop court pour être exploitable, il manque une partie de la phrase." },
  { id: "CONT-4862", contributor: "Aminata Touré", type: "Image", language: "Bambara", date: "Mai 12, 2024", status: "Signalé", statusColor: "bg-red-100 text-red-700", score: 0.55, flagReason: "Annotation incomplète", avatar: "AT", avatarColor: "bg-purple-100 text-purple-700", detail: "Plusieurs éléments de l'image n'ont pas été annotés correctement." },
  { id: "CONT-4861", contributor: "Mamadou Konaté", type: "Audio", language: "Malinké", date: "Mai 11, 2024", status: "En Revue", statusColor: "bg-yellow-100 text-yellow-700", score: 0.83, flagReason: "Répétition excessive", avatar: "MK", avatarColor: "bg-red-100 text-red-700", detail: "L'audio contient des répétitions non nécessaires qui affectent la qualité." },
  { id: "CONT-4860", contributor: "Fatoumata Diarra", type: "Traduction", language: "Bambara", date: "Mai 11, 2024", status: "Signalé", statusColor: "bg-red-100 text-red-700", score: 0.41, flagReason: "Traduction approximative", avatar: "FD", avatarColor: "bg-pink-100 text-pink-700", detail: "La traduction comporte des erreurs significatives qui altèrent le sens." },
  { id: "CONT-4859", contributor: "Sekou Coulibaly", type: "Audio", language: "Dioula", date: "Mai 11, 2024", status: "En Revue", statusColor: "bg-yellow-100 text-yellow-700", score: 0.74, flagReason: "Qualité audio médiocre", avatar: "SC", avatarColor: "bg-green-100 text-green-700", detail: "Bruit de fond important rendant certaines portions inaudibles." },
  { id: "CONT-4858", contributor: "Oumou Sangaré", type: "Traduction", language: "Soninké", date: "Mai 11, 2024", status: "Signalé", statusColor: "bg-red-100 text-red-700", score: 0.33, flagReason: "Contenu hors sujet", avatar: "OS", avatarColor: "bg-teal-100 text-teal-700", detail: "La traduction ne correspond pas au texte source et semble traiter d'un autre sujet." },
  { id: "CONT-4857", contributor: "Adama Sanogo", type: "Image", language: "Wolof", date: "Mai 10, 2024", status: "Signalé", statusColor: "bg-red-100 text-red-700", score: 0.50, flagReason: "Image floue", avatar: "AS", avatarColor: "bg-amber-100 text-amber-700", detail: "L'image soumise est floue et ne permet pas une annotation correcte." },
  { id: "CONT-4856", contributor: "Rama Traoré", type: "Audio", language: "Bambara", date: "Mai 10, 2024", status: "En Revue", statusColor: "bg-yellow-100 text-yellow-700", score: 0.88, flagReason: "Possible triche", avatar: "RT", avatarColor: "bg-blue-100 text-blue-700", detail: "L'audio présente des caractéristiques suspectes suggérant un enregistrement artificiel." },
  { id: "CONT-4855", contributor: "Bakary Cissé", type: "Traduction", language: "Pulaar", date: "Mai 10, 2024", status: "Signalé", statusColor: "bg-red-100 text-red-700", score: 0.39, flagReason: "Langue incorrecte", avatar: "BC", avatarColor: "bg-orange-100 text-orange-700", detail: "La traduction utilise une langue différente de celle attendue pour cette tâche." },
  { id: "CONT-4854", contributor: "Kadiatou Bah", type: "Audio", language: "Malinké", date: "Mai 10, 2024", status: "Signalé", statusColor: "bg-red-100 text-red-700", score: 0.45, flagReason: "Audio tronqué", avatar: "KB", avatarColor: "bg-purple-100 text-purple-700", detail: "L'enregistrement est tronqué et manque la fin de la phrase attendue." },
  { id: "CONT-4853", contributor: "Moussa Keita", type: "Image", language: "Dioula", date: "Mai 10, 2024", status: "En Revue", statusColor: "bg-yellow-100 text-yellow-700", score: 0.79, flagReason: "Annotation incorrecte", avatar: "MK", avatarColor: "bg-red-100 text-red-700", detail: "Certaines annotations sur l'image sont incorrectes ou mal positionnées." },
  { id: "CONT-4852", contributor: "Aissata Camara", type: "Traduction", language: "Wolof", date: "Mai 10, 2024", status: "Signalé", statusColor: "bg-red-100 text-red-700", score: 0.30, flagReason: "Contenu offensant", avatar: "AC", avatarColor: "bg-pink-100 text-pink-700", detail: "La traduction contient des propos inappropriés et offensants." },
  { id: "CONT-4851", contributor: "Lamine Diabaté", type: "Audio", language: "Soninké", date: "Mai 10, 2024", status: "Signalé", statusColor: "bg-red-100 text-red-700", score: 0.56, flagReason: "Répétition excessive", avatar: "LD", avatarColor: "bg-green-100 text-green-700", detail: "L'audio contient des répétitions excessives qui nuisent à la compréhension." },
  { id: "CONT-4850", contributor: "Mariatou Soulama", type: "Traduction", language: "Bambara", date: "Mai 10, 2024", status: "En Revue", statusColor: "bg-yellow-100 text-yellow-700", score: 0.85, flagReason: "Traduction hors contexte", avatar: "MS", avatarColor: "bg-teal-100 text-teal-700", detail: "La traduction est grammaticalement correcte mais ne respecte pas le contexte d'origine." },
  { id: "CONT-4849", contributor: "Djibril Sylla", type: "Audio", language: "Wolof", date: "Mai 10, 2024", status: "Signalé", statusColor: "bg-red-100 text-red-700", score: 0.42, flagReason: "Prononciation incorrecte", avatar: "DS", avatarColor: "bg-amber-100 text-amber-700", detail: "La prononciation comporte des erreurs significatives par rapport à la norme." },
  { id: "CONT-4848", contributor: "Hawa Dembélé", type: "Image", language: "Pulaar", date: "Mai 10, 2024", status: "Signalé", statusColor: "bg-red-100 text-red-700", score: 0.35, flagReason: "Doublon détecté", avatar: "HD", avatarColor: "bg-blue-100 text-blue-700", detail: "L'image soumise est identique à une contribution précédemment validée." },
];

export default function ModerationPage() {
  const [contributions, setContributions] = useState(initialContributions);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedContribution, setSelectedContribution] = useState<(typeof initialContributions)[0] | null>(null);
  const [approveComment, setApproveComment] = useState("");
  const [rejectReason, setRejectReason] = useState("Qualité insuffisante");
  const [rejectComment, setRejectComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalPages = Math.ceil(contributions.length / pageSize);
  const paginatedContributions = contributions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const openDetail = (c: (typeof initialContributions)[0]) => {
    setSelectedContribution(c);
    setShowDetailModal(true);
  };

  const openApprove = (c: (typeof initialContributions)[0]) => {
    setSelectedContribution(c);
    setApproveComment("");
    setShowApproveModal(true);
  };

  const openReject = (c: (typeof initialContributions)[0]) => {
    setSelectedContribution(c);
    setRejectReason("Qualité insuffisante");
    setRejectComment("");
    setShowRejectModal(true);
  };

  const handleApprove = () => {
    if (!selectedContribution) return;
    setContributions((prev) =>
      prev.map((c) =>
        c.id === selectedContribution.id
          ? { ...c, status: "Approuvé", statusColor: "bg-emerald-100 text-emerald-700" }
          : c
      )
    );
    setShowApproveModal(false);
  };

  const handleReject = () => {
    if (!selectedContribution) return;
    setContributions((prev) =>
      prev.map((c) =>
        c.id === selectedContribution.id
          ? { ...c, status: "Rejeté", statusColor: "bg-gray-100 text-gray-600" }
          : c
      )
    );
    setShowRejectModal(false);
  };

  const signaleCount = contributions.filter((c) => c.status === "Signalé").length;
  const enRevueCount = contributions.filter((c) => c.status === "En Revue").length;
  const resolusCount = contributions.filter((c) => c.status === "Approuvé" || c.status === "Rejeté").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-emerald-600" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Modération</h2>
            <p className="text-sm text-gray-500 mt-1">Arbitrez les contributions signalées par la communauté</p>
          </div>
        </div>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-4">
          <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center"><AlertTriangle className="h-5 w-5 text-red-500" /></div>
          <div>
            <p className="text-2xl font-bold text-red-700">{signaleCount}</p>
            <p className="text-xs text-red-600">Contributions Signalées</p>
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-4">
          <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center"><Eye className="h-5 w-5 text-yellow-600" /></div>
          <div>
            <p className="text-2xl font-bold text-yellow-700">{enRevueCount}</p>
            <p className="text-xs text-yellow-600">En Attente de Revue</p>
          </div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-4">
          <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center"><ShieldCheck className="h-5 w-5 text-emerald-600" /></div>
          <div>
            <p className="text-2xl font-bold text-emerald-700">{resolusCount}</p>
            <p className="text-xs text-emerald-600">Résolues ce mois</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input placeholder="Rechercher par ID ou contributeur..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>
        <button className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50"><Filter className="h-3.5 w-3.5" /> Statut</button>
        <button className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50"><Filter className="h-3.5 w-3.5" /> Type</button>
        <button className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50"><Filter className="h-3.5 w-3.5" /> Langue</button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">ID</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Contributeur</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Type</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Langue</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Score</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Motif</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Statut</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedContributions.map((c) => (
              <tr key={c.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 text-sm font-medium text-emerald-600">{c.id}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7"><AvatarFallback className={`${c.avatarColor} text-[10px] font-semibold`}>{c.avatar}</AvatarFallback></Avatar>
                    <span className="text-sm text-gray-800 font-medium">{c.contributor}</span>
                  </div>
                </td>
                <td className="py-3 px-4"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.type === "Audio" ? "bg-blue-100 text-blue-700" : c.type === "Traduction" ? "bg-purple-100 text-purple-700" : "bg-amber-100 text-amber-700"}`}>{c.type}</span></td>
                <td className="py-3 px-4 text-sm text-gray-600">{c.language}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${c.score >= 0.8 ? "bg-emerald-500" : c.score >= 0.6 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${c.score * 100}%` }} />
                    </div>
                    <span className={`text-xs font-semibold ${c.score >= 0.8 ? "text-emerald-600" : c.score >= 0.6 ? "text-yellow-600" : "text-red-600"}`}>{c.score.toFixed(2)}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-xs text-red-600 font-medium">{c.flagReason}</td>
                <td className="py-3 px-4"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.statusColor}`}>{c.status === "Signalé" && <AlertTriangle className="h-3 w-3 inline mr-0.5" />}{c.status}</span></td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <button className="p-1 rounded hover:bg-gray-100" onClick={() => openDetail(c)}><Eye className="h-4 w-4 text-gray-400" /></button>
                    <button className="px-2 py-1 text-[10px] font-medium text-red-600 border border-red-200 rounded hover:bg-red-50" onClick={() => openReject(c)}>Rejeter</button>
                    <button className="px-2 py-1 text-[10px] font-medium text-white bg-emerald-500 rounded hover:bg-emerald-600" onClick={() => openApprove(c)}>Approuver</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <DataTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={contributions.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
          pageSizeOptions={[5, 10, 20, 50]}
          label="contributions"
        />
      </div>

      {/* Modal: Détails Contribution */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="sm:max-w-xl">
          {selectedContribution && (
            <>
              <DialogHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <DialogTitle>Détails de la Contribution</DialogTitle>
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${selectedContribution.statusColor}`}>
                    {selectedContribution.status}
                  </span>
                </div>
                <DialogDescription>{selectedContribution.id}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10"><AvatarFallback className={`${selectedContribution.avatarColor} text-xs font-semibold`}>{selectedContribution.avatar}</AvatarFallback></Avatar>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{selectedContribution.contributor}</p>
                    <p className="text-xs text-gray-500">{selectedContribution.date}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <p className="text-sm font-bold text-blue-700">{selectedContribution.type}</p>
                    <p className="text-[10px] text-blue-600">Type</p>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-3 text-center">
                    <p className="text-sm font-bold text-emerald-700">{selectedContribution.language}</p>
                    <p className="text-[10px] text-emerald-600">Langue</p>
                  </div>
                  <div className={`${selectedContribution.score >= 0.8 ? "bg-emerald-50" : selectedContribution.score >= 0.6 ? "bg-yellow-50" : "bg-red-50"} rounded-lg p-3 text-center`}>
                    <p className={`text-sm font-bold ${selectedContribution.score >= 0.8 ? "text-emerald-700" : selectedContribution.score >= 0.6 ? "text-yellow-700" : "text-red-700"}`}>{selectedContribution.score.toFixed(2)}</p>
                    <p className="text-[10px] text-gray-600">Score Qualité</p>
                  </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <p className="text-xs font-semibold text-red-700">Motif du Signalement</p>
                  </div>
                  <p className="text-sm text-red-800">{selectedContribution.flagReason}</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Description</p>
                  <p className="text-sm text-gray-700">{selectedContribution.detail}</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDetailModal(false)}>Fermer</Button>
                <Button className="bg-red-500 hover:bg-red-600 text-white gap-1.5" onClick={() => { setShowDetailModal(false); openReject(selectedContribution); }}>
                  <XCircle className="h-4 w-4" /> Rejeter
                </Button>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white gap-1.5" onClick={() => { setShowDetailModal(false); openApprove(selectedContribution); }}>
                  <CheckCircle2 className="h-4 w-4" /> Approuver
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal: Approuver */}
      <Dialog open={showApproveModal} onOpenChange={setShowApproveModal}>
        <DialogContent className="sm:max-w-md">
          {selectedContribution && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <DialogTitle>Approuver la Contribution</DialogTitle>
                </div>
                <DialogDescription>Confirmez l&apos;approbation de {selectedContribution.id}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-emerald-800">Cette contribution sera validée</p>
                  <p className="text-xs text-emerald-600 mt-1">Le contributeur recevra sa récompense</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Commentaire (optionnel)</label>
                  <Textarea rows={3} placeholder="Ajoutez un commentaire pour le contributeur..." className="resize-none" value={approveComment} onChange={(e) => setApproveComment(e.target.value)} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowApproveModal(false)}>Annuler</Button>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white gap-1.5" onClick={handleApprove}>
                  <CheckCircle2 className="h-4 w-4" /> Confirmer l&apos;Approbation
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal: Rejeter */}
      <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
        <DialogContent className="sm:max-w-md">
          {selectedContribution && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <DialogTitle>Rejeter la Contribution</DialogTitle>
                </div>
                <DialogDescription>Confirmez le rejet de {selectedContribution.id}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-red-800">Cette contribution sera rejetée</p>
                  <p className="text-xs text-red-600 mt-1">Aucune récompense ne sera versée</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Raison du Rejet</label>
                  <select value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>Qualité insuffisante</option>
                    <option>Contenu inapproprié</option>
                    <option>Doublon détecté</option>
                    <option>Triche / Fraude</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Commentaire pour le contributeur</label>
                  <Textarea rows={3} placeholder="Expliquez pourquoi cette contribution est rejetée..." className="resize-none" value={rejectComment} onChange={(e) => setRejectComment(e.target.value)} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowRejectModal(false)}>Annuler</Button>
                <Button className="bg-red-500 hover:bg-red-600 text-white gap-1.5" onClick={handleReject}>
                  <XCircle className="h-4 w-4" /> Confirmer le Rejet
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
