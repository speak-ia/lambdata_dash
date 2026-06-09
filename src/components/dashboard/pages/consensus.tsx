"use client";

import { useState } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  XCircle,
  Minus,
  Gavel,
  MessageSquare,
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

const initialReviews = [
  { id: "CONT-4880", contributor: "Fatou Ndiaye", type: "Audio", language: "Wolof", yesVotes: 8, noVotes: 1, totalVotes: 9, consensus: "Approuvé", consensusColor: "bg-emerald-100 text-emerald-700", avatar: "FN", avatarColor: "bg-blue-100 text-blue-700", phrase: "Naka nga def sa alal?", comments: ["Bonne prononciation", "Audio clair", "Phrase correcte"] },
  { id: "CONT-4879", contributor: "Moussa Traoré", type: "Traduction", language: "Bambara", yesVotes: 5, noVotes: 5, totalVotes: 10, consensus: "Partagé", consensusColor: "bg-yellow-100 text-yellow-700", avatar: "MT", avatarColor: "bg-orange-100 text-orange-700", phrase: "I cɛ la bɛnɛ n'o tɔgɔ?", comments: ["Traduction partielle", "Manque de contexte", "Sens ambigu"] },
  { id: "CONT-4878", contributor: "Aissatou Ba", type: "Image", language: "Dioula", yesVotes: 2, noVotes: 7, totalVotes: 9, consensus: "Rejeté", consensusColor: "bg-red-100 text-red-700", avatar: "AB", avatarColor: "bg-purple-100 text-purple-700", phrase: "Image du marché", comments: ["Annotation incorrecte", "Tags non pertinents", "Qualité médiocre"] },
  { id: "CONT-4877", contributor: "Ibrahim Coulibaly", type: "Audio", language: "Pulaar", yesVotes: 6, noVotes: 2, totalVotes: 8, consensus: "Approuvé", consensusColor: "bg-emerald-100 text-emerald-700", avatar: "IC", avatarColor: "bg-red-100 text-red-700", phrase: "Miɗɗo heɓɓay ngam nyaamo?", comments: ["Prononciation naturelle", "Bonne qualité audio"] },
  { id: "CONT-4876", contributor: "Mariam Sow", type: "Traduction", language: "Wolof", yesVotes: 4, noVotes: 4, totalVotes: 8, consensus: "Partagé", consensusColor: "bg-yellow-100 text-yellow-700", avatar: "MS", avatarColor: "bg-pink-100 text-pink-700", phrase: "Alhamdulillah, naka la waɗɓe?", comments: ["Traduction littérale", "Perte de nuance", "Contexte manquant"] },
  { id: "CONT-4875", contributor: "Omar Diallo", type: "Audio", language: "Bambara", yesVotes: 9, noVotes: 0, totalVotes: 9, consensus: "Approuvé", consensusColor: "bg-emerald-100 text-emerald-700", avatar: "OD", avatarColor: "bg-green-100 text-green-700", phrase: "Mɔgɔw be timinɛ kɛ?", comments: ["Excellent", "Parfaitement naturel", "Très bonne qualité"] },
  { id: "CONT-4874", contributor: "Amadou Bamba", type: "Audio", language: "Wolof", yesVotes: 9, noVotes: 0, totalVotes: 9, consensus: "Approuvé", consensusColor: "bg-emerald-100 text-emerald-700", avatar: "AB", avatarColor: "bg-teal-100 text-teal-700", phrase: "Jàng naa te xam naa ñaari lès", comments: ["Voix très claire", "Enregistrement impeccable", "Prononciation impeccable"] },
  { id: "CONT-4873", contributor: "Khady Sène", type: "Traduction", language: "Soninké", yesVotes: 3, noVotes: 6, totalVotes: 9, consensus: "Rejeté", consensusColor: "bg-red-100 text-red-700", avatar: "KS", avatarColor: "bg-rose-100 text-rose-700", phrase: "N ti dà tàgà yì nǹù", comments: ["Traduction erronée", "Faux sens sur le verbe", "Grammaire incorrecte"] },
  { id: "CONT-4872", contributor: "Boubacar Diallo", type: "Image", language: "Pulaar", yesVotes: 7, noVotes: 2, totalVotes: 9, consensus: "Approuvé", consensusColor: "bg-emerald-100 text-emerald-700", avatar: "BD", avatarColor: "bg-indigo-100 text-indigo-700", phrase: "Ɓiɗɗo gorko on mari haŋke", comments: ["Bonne annotation", "Image nette", "Labels corrects"] },
  { id: "CONT-4871", contributor: "Aminata Touré", type: "Audio", language: "Bambara", yesVotes: 5, noVotes: 5, totalVotes: 10, consensus: "Partagé", consensusColor: "bg-yellow-100 text-yellow-700", avatar: "AT", avatarColor: "bg-cyan-100 text-cyan-700", phrase: "À nùmùn kɛ tùn yè", comments: ["Bruits de fond", "Intonation discutable", "Vitesse trop rapide"] },
  { id: "CONT-4870", contributor: "Mamadou Konaté", type: "Traduction", language: "Malinké", yesVotes: 8, noVotes: 1, totalVotes: 9, consensus: "Approuvé", consensusColor: "bg-emerald-100 text-emerald-700", avatar: "MK", avatarColor: "bg-amber-100 text-amber-700", phrase: "I bɛ fɔlɔ kɛ nɛnɛ na", comments: ["Traduction fluide", "Respecte le contexte", "Très fidèle"] },
  { id: "CONT-4869", contributor: "Fatoumata Diarra", type: "Image", language: "Bambara", yesVotes: 1, noVotes: 8, totalVotes: 9, consensus: "Rejeté", consensusColor: "bg-red-100 text-red-700", avatar: "FD", avatarColor: "bg-lime-100 text-lime-700", phrase: "Sòrò dugu ba la", comments: ["Image floue", "Aucun rapport avec le texte", "Résolution trop basse"] },
  { id: "CONT-4868", contributor: "Sekou Coulibaly", type: "Audio", language: "Dioula", yesVotes: 9, noVotes: 0, totalVotes: 9, consensus: "Approuvé", consensusColor: "bg-emerald-100 text-emerald-700", avatar: "SC", avatarColor: "bg-violet-100 text-violet-700", phrase: "A yé wólo dòròn yè", comments: ["Qualité studio", "Parfait", "Rien à redire"] },
  { id: "CONT-4867", contributor: "Oumou Sangaré", type: "Traduction", language: "Soninké", yesVotes: 4, noVotes: 5, totalVotes: 9, consensus: "Rejeté", consensusColor: "bg-red-100 text-red-700", avatar: "OS", avatarColor: "bg-fuchsia-100 text-fuchsia-700", phrase: "N tàxù nà dà yì nǹù", comments: ["Sens inversé", "Mauvaise conjugaison", "Confusion de vocabulaire"] },
  { id: "CONT-4866", contributor: "Adama Sanogo", type: "Audio", language: "Malinké", yesVotes: 6, noVotes: 4, totalVotes: 10, consensus: "Partagé", consensusColor: "bg-yellow-100 text-yellow-700", avatar: "AS", avatarColor: "bg-sky-100 text-sky-700", phrase: "Ì kɛra sìrìkè yè", comments: ["Accent régional marqué", "Compréhensible mais imparfait", "Quelques hésitations"] },
  { id: "CONT-4865", contributor: "Rama Traoré", type: "Image", language: "Wolof", yesVotes: 7, noVotes: 3, totalVotes: 10, consensus: "Approuvé", consensusColor: "bg-emerald-100 text-emerald-700", avatar: "RT", avatarColor: "bg-emerald-100 text-emerald-700", phrase: "Dëkk bi rafet na bëgg ba", comments: ["Bonne qualité d'image", "Annotations précises", "Cadre bien choisi"] },
  { id: "CONT-4864", contributor: "Bakary Cissé", type: "Traduction", language: "Pulaar", yesVotes: 9, noVotes: 0, totalVotes: 9, consensus: "Approuvé", consensusColor: "bg-emerald-100 text-emerald-700", avatar: "BC", avatarColor: "bg-yellow-100 text-yellow-700", phrase: "Miɗɗo yahdu wardi haŋke", comments: ["Traduction parfaite", "Style naturel", "Terminologie exacte"] },
  { id: "CONT-4863", contributor: "Kadiatou Bah", type: "Audio", language: "Dioula", yesVotes: 2, noVotes: 7, totalVotes: 9, consensus: "Rejeté", consensusColor: "bg-red-100 text-red-700", avatar: "KB", avatarColor: "bg-orange-100 text-orange-700", phrase: "I yé kè wàlè yè", comments: ["Volume trop bas", "Prononciation incorrecte", "Écho important", "Inaudible par moments"] },
  { id: "CONT-4862", contributor: "Fatou Ndiaye", type: "Traduction", language: "Wolof", yesVotes: 7, noVotes: 2, totalVotes: 9, consensus: "Approuvé", consensusColor: "bg-emerald-100 text-emerald-700", avatar: "FN", avatarColor: "bg-blue-100 text-blue-700", phrase: "Dama bëgg a dem fan", comments: ["Bonne traduction", "Fidèle au sens", "Style fluide"] },
  { id: "CONT-4861", contributor: "Moussa Traoré", type: "Image", language: "Bambara", yesVotes: 4, noVotes: 4, totalVotes: 8, consensus: "Partagé", consensusColor: "bg-yellow-100 text-yellow-700", avatar: "MT", avatarColor: "bg-orange-100 text-orange-700", phrase: "Dùgu bɛɛ bɛ sɔrɔ", comments: ["Image moyenne", "Cadrage à revoir", "Étiquettes partielles"] },
];

export default function ConsensusPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showArbitrateModal, setShowArbitrateModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<(typeof initialReviews)[0] | null>(null);
  const [arbitrateDecision, setArbitrateDecision] = useState<"Approuver" | "Rejeter" | null>(null);
  const [justification, setJustification] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalPages = Math.ceil(reviews.length / pageSize);
  const paginatedReviews = reviews.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const openDetail = (r: (typeof initialReviews)[0]) => {
    setSelectedReview(r);
    setShowDetailModal(true);
  };

  const openArbitrate = (r: (typeof initialReviews)[0]) => {
    setSelectedReview(r);
    setArbitrateDecision(null);
    setJustification("");
    setShowArbitrateModal(true);
  };

  const handleArbitrate = () => {
    if (!selectedReview || !arbitrateDecision) return;
    setReviews((prev) =>
      prev.map((r) =>
        r.id === selectedReview.id
          ? {
              ...r,
              consensus: arbitrateDecision === "Approuver" ? "Approuvé" : "Rejeté",
              consensusColor:
                arbitrateDecision === "Approuver"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700",
            }
          : r
      )
    );
    setShowArbitrateModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ThumbsUp className="h-6 w-6 text-emerald-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Consensus de Validation</h2>
          <p className="text-sm text-gray-500 mt-1">Suivez les votes communautaires et les accords de validation</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-4">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          <div><p className="text-2xl font-bold text-emerald-700">{reviews.filter(r => r.consensus === "Approuvé").length}</p><p className="text-xs text-emerald-600">Approuvées par Consensus</p></div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-4">
          <XCircle className="h-8 w-8 text-red-500" />
          <div><p className="text-2xl font-bold text-red-700">{reviews.filter(r => r.consensus === "Rejeté").length}</p><p className="text-xs text-red-600">Rejetées par Consensus</p></div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-4">
          <Minus className="h-8 w-8 text-yellow-600" />
          <div><p className="text-2xl font-bold text-yellow-700">{reviews.filter(r => r.consensus === "Partagé").length}</p><p className="text-xs text-yellow-600">Votes Partagés</p></div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-4">
          <ThumbsUp className="h-8 w-8 text-blue-600" />
          <div><p className="text-2xl font-bold text-blue-700">87.3%</p><p className="text-xs text-blue-600">Taux d&apos;Accord Moyen</p></div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input placeholder="Rechercher par ID ou contributeur..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>
        <button className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50"><Filter className="h-3.5 w-3.5" /> Consensus</button>
        <button className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50"><Filter className="h-3.5 w-3.5" /> Type</button>
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
              <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Votes Pour</th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Votes Contre</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Consensus</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedReviews.map((r) => (
              <tr key={r.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 text-sm font-medium text-emerald-600">{r.id}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7"><AvatarFallback className={`${r.avatarColor} text-[10px] font-semibold`}>{r.avatar}</AvatarFallback></Avatar>
                    <span className="text-sm text-gray-800 font-medium">{r.contributor}</span>
                  </div>
                </td>
                <td className="py-3 px-4"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${r.type === "Audio" ? "bg-blue-100 text-blue-700" : r.type === "Traduction" ? "bg-purple-100 text-purple-700" : "bg-amber-100 text-amber-700"}`}>{r.type}</span></td>
                <td className="py-3 px-4 text-sm text-gray-600">{r.language}</td>
                <td className="py-3 px-4 text-center">
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600"><ThumbsUp className="h-3.5 w-3.5" /> {r.yesVotes}</span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-red-500"><ThumbsDown className="h-3.5 w-3.5" /> {r.noVotes}</span>
                </td>
                <td className="py-3 px-4"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${r.consensusColor}`}>{r.consensus}</span></td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <button className="p-1 rounded hover:bg-gray-100" onClick={() => openDetail(r)}><Eye className="h-4 w-4 text-gray-400" /></button>
                    {r.consensus === "Partagé" && (
                      <button className="px-2 py-1 text-[10px] font-medium text-amber-700 border border-amber-200 rounded hover:bg-amber-50" onClick={() => openArbitrate(r)}>
                        <Gavel className="h-3 w-3 inline mr-0.5" /> Arbitrer
                      </button>
                    )}
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
          totalItems={reviews.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
          pageSizeOptions={[5, 10, 20, 50]}
          label="votes"
        />
      </div>

      {/* Modal: Détails Consensus */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="sm:max-w-xl">
          {selectedReview && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle>Détails du Vote</DialogTitle>
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${selectedReview.consensusColor}`}>
                    {selectedReview.consensus}
                  </span>
                </div>
                <DialogDescription>{selectedReview.id} — {selectedReview.contributor}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10"><AvatarFallback className={`${selectedReview.avatarColor} text-xs font-semibold`}>{selectedReview.avatar}</AvatarFallback></Avatar>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{selectedReview.contributor}</p>
                    <p className="text-xs text-gray-500">{selectedReview.type} · {selectedReview.language}</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Phrase Source</p>
                  <p className="text-sm text-gray-800 font-medium">{selectedReview.phrase}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                    <ThumbsUp className="h-6 w-6 text-emerald-600 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-emerald-700">{selectedReview.yesVotes}</p>
                    <p className="text-xs text-emerald-600">Votes Pour</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                    <ThumbsDown className="h-6 w-6 text-red-500 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-red-700">{selectedReview.noVotes}</p>
                    <p className="text-xs text-red-600">Votes Contre</p>
                  </div>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(selectedReview.yesVotes / selectedReview.totalVotes) * 100}%` }} />
                </div>
                <p className="text-xs text-center text-gray-500">
                  {Math.round((selectedReview.yesVotes / selectedReview.totalVotes) * 100)}% de votes positifs ({selectedReview.totalVotes} votes au total)
                </p>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Commentaires des Réviseurs</p>
                  <div className="space-y-1.5">
                    {selectedReview.comments.map((comment, i) => (
                      <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                        <MessageSquare className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                        <p className="text-xs text-gray-700">{comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDetailModal(false)}>Fermer</Button>
                {selectedReview.consensus === "Partagé" && (
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white gap-1.5" onClick={() => { setShowDetailModal(false); openArbitrate(selectedReview); }}>
                    <Gavel className="h-4 w-4" /> Arbitrer
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal: Arbitrer */}
      <Dialog open={showArbitrateModal} onOpenChange={setShowArbitrateModal}>
        <DialogContent className="sm:max-w-md">
          {selectedReview && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <Gavel className="h-5 w-5 text-amber-600" />
                  <DialogTitle>Arbitrage — {selectedReview.id}</DialogTitle>
                </div>
                <DialogDescription>Les votes sont partagés ({selectedReview.yesVotes} pour, {selectedReview.noVotes} contre). Prenez une décision finale.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                  <Gavel className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-amber-800">Décision de l&apos;Administrateur Requise</p>
                  <p className="text-xs text-amber-600 mt-1">Votre décision est finale et ne peut être modifiée</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Votre Décision</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setArbitrateDecision("Approuver")} className={`border-2 rounded-lg p-4 text-center transition-colors group ${arbitrateDecision === "Approuver" ? "border-emerald-500 bg-emerald-50" : "border-emerald-200 hover:bg-emerald-50"}`}>
                      <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                      <p className="text-sm font-semibold text-emerald-700">Approuver</p>
                      <p className="text-[10px] text-emerald-600">Valider la contribution</p>
                    </button>
                    <button onClick={() => setArbitrateDecision("Rejeter")} className={`border-2 rounded-lg p-4 text-center transition-colors group ${arbitrateDecision === "Rejeter" ? "border-red-500 bg-red-50" : "border-red-200 hover:bg-red-50"}`}>
                      <XCircle className="h-8 w-8 text-red-500 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                      <p className="text-sm font-semibold text-red-700">Rejeter</p>
                      <p className="text-[10px] text-red-600">Invalider la contribution</p>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Justification</label>
                  <Textarea rows={3} placeholder="Expliquez votre décision..." className="resize-none" value={justification} onChange={(e) => setJustification(e.target.value)} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowArbitrateModal(false)}>Annuler</Button>
                <Button className="bg-amber-500 hover:bg-amber-600 text-white gap-1.5" disabled={!arbitrateDecision} onClick={handleArbitrate}>
                  <Gavel className="h-4 w-4" /> Confirmer la Décision
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
