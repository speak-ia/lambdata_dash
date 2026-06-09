"use client";

import { useState } from "react";
import {
  Wallet,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Phone,
  AlertTriangle,
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

const payments = [
  { id: "PAY-0189", name: "Fatou Ndiaye", amount: "15,000 XOF", amountNum: 15000, operator: "Wave", phone: "+221 77 123 4567", date: "Mai 15, 2024", status: "En Attente", statusColor: "bg-yellow-100 text-yellow-700", level: 3, avatar: "FN", avatarColor: "bg-blue-100 text-blue-700" },
  { id: "PAY-0188", name: "Moussa Traoré", amount: "8,500 XOF", amountNum: 8500, operator: "Orange Money", phone: "+223 76 987 6543", date: "Mai 15, 2024", status: "En Attente", statusColor: "bg-yellow-100 text-yellow-700", level: 2, avatar: "MT", avatarColor: "bg-orange-100 text-orange-700" },
  { id: "PAY-0187", name: "Aissatou Ba", amount: "22,000 XOF", amountNum: 22000, operator: "MTN", phone: "+225 07 456 7890", date: "Mai 14, 2024", status: "Payé", statusColor: "bg-emerald-100 text-emerald-700", level: 4, avatar: "AB", avatarColor: "bg-purple-100 text-purple-700" },
  { id: "PAY-0186", name: "Ibrahim Coulibaly", amount: "3,200 XOF", amountNum: 3200, operator: "Free Money", phone: "+221 78 111 2222", date: "Mai 14, 2024", status: "Rejeté", statusColor: "bg-red-100 text-red-700", level: 1, avatar: "IC", avatarColor: "bg-red-100 text-red-700", rejectReason: "Fraude détectée" },
  { id: "PAY-0185", name: "Mariam Sow", amount: "12,750 XOF", amountNum: 12750, operator: "Wave", phone: "+221 76 333 4444", date: "Mai 14, 2024", status: "En Attente", statusColor: "bg-yellow-100 text-yellow-700", level: 3, avatar: "MS", avatarColor: "bg-pink-100 text-pink-700" },
  { id: "PAY-0184", name: "Omar Diallo", amount: "6,000 XOF", amountNum: 6000, operator: "Orange Money", phone: "+223 75 555 6666", date: "Mai 13, 2024", status: "Payé", statusColor: "bg-emerald-100 text-emerald-700", level: 2, avatar: "OD", avatarColor: "bg-green-100 text-green-700" },
  { id: "PAY-0183", name: "Awa Keita", amount: "35,000 XOF", amountNum: 35000, operator: "MTN", phone: "+225 05 777 8888", date: "Mai 13, 2024", status: "Payé", statusColor: "bg-emerald-100 text-emerald-700", level: 5, avatar: "AK", avatarColor: "bg-teal-100 text-teal-700" },
  { id: "PAY-0182", name: "Lamine Diabaté", amount: "4,700 XOF", amountNum: 4700, operator: "Free Money", phone: "+221 76 456 7890", date: "Mai 12, 2024", status: "Payé", statusColor: "bg-emerald-100 text-emerald-700", level: 1, avatar: "LD", avatarColor: "bg-cyan-100 text-cyan-700" },
  { id: "PAY-0181", name: "Kadiatou Bah", amount: "28,500 XOF", amountNum: 28500, operator: "Free Money", phone: "+221 76 345 6789", date: "Mai 12, 2024", status: "Rejeté", statusColor: "bg-red-100 text-red-700", level: 4, avatar: "KB", avatarColor: "bg-amber-100 text-amber-700", rejectReason: "Fraude détectée" },
  { id: "PAY-0180", name: "Bakary Cissé", amount: "9,400 XOF", amountNum: 9400, operator: "MTN", phone: "+225 07 234 5678", date: "Mai 13, 2024", status: "Payé", statusColor: "bg-emerald-100 text-emerald-700", level: 2, avatar: "BC", avatarColor: "bg-indigo-100 text-indigo-700" },
  { id: "PAY-0179", name: "Rama Traoré", amount: "18,600 XOF", amountNum: 18600, operator: "Orange Money", phone: "+223 76 123 4567", date: "Mai 13, 2024", status: "En Attente", statusColor: "bg-yellow-100 text-yellow-700", level: 3, avatar: "RT", avatarColor: "bg-rose-100 text-rose-700" },
  { id: "PAY-0178", name: "Adama Sanogo", amount: "3,200 XOF", amountNum: 3200, operator: "Wave", phone: "+221 78 012 3456", date: "Mai 13, 2024", status: "Rejeté", statusColor: "bg-red-100 text-red-700", level: 1, avatar: "AS", avatarColor: "bg-violet-100 text-violet-700", rejectReason: "Doublon de demande" },
  { id: "PAY-0177", name: "Oumou Sangaré", amount: "42,000 XOF", amountNum: 42000, operator: "Free Money", phone: "+221 77 901 2345", date: "Mai 14, 2024", status: "Payé", statusColor: "bg-emerald-100 text-emerald-700", level: 5, avatar: "OS", avatarColor: "bg-fuchsia-100 text-fuchsia-700" },
  { id: "PAY-0176", name: "Sekou Coulibaly", amount: "7,800 XOF", amountNum: 7800, operator: "MTN", phone: "+225 05 890 1234", date: "Mai 14, 2024", status: "Rejeté", statusColor: "bg-red-100 text-red-700", level: 2, avatar: "SC", avatarColor: "bg-lime-100 text-lime-700", rejectReason: "Montant incorrect" },
  { id: "PAY-0175", name: "Fatoumata Diarra", amount: "12,300 XOF", amountNum: 12300, operator: "Orange Money", phone: "+223 75 789 0123", date: "Mai 14, 2024", status: "Payé", statusColor: "bg-emerald-100 text-emerald-700", level: 3, avatar: "FD", avatarColor: "bg-sky-100 text-sky-700" },
  { id: "PAY-0174", name: "Mamadou Konaté", amount: "35,000 XOF", amountNum: 35000, operator: "Wave", phone: "+221 76 678 9012", date: "Mai 15, 2024", status: "En Attente", statusColor: "bg-yellow-100 text-yellow-700", level: 5, avatar: "MK", avatarColor: "bg-emerald-100 text-emerald-700" },
  { id: "PAY-0173", name: "Aminata Touré", amount: "5,500 XOF", amountNum: 5500, operator: "Free Money", phone: "+221 78 567 8901", date: "Mai 15, 2024", status: "Rejeté", statusColor: "bg-red-100 text-red-700", level: 1, avatar: "AT", avatarColor: "bg-yellow-100 text-yellow-700", rejectReason: "Compte Mobile Money invalide" },
  { id: "PAY-0172", name: "Boubacar Diallo", amount: "25,000 XOF", amountNum: 25000, operator: "MTN", phone: "+225 07 456 7891", date: "Mai 15, 2024", status: "Payé", statusColor: "bg-emerald-100 text-emerald-700", level: 4, avatar: "BD", avatarColor: "bg-orange-100 text-orange-700" },
  { id: "PAY-0171", name: "Khady Sène", amount: "8,200 XOF", amountNum: 8200, operator: "Orange Money", phone: "+223 76 345 6789", date: "Mai 16, 2024", status: "En Attente", statusColor: "bg-yellow-100 text-yellow-700", level: 2, avatar: "KS", avatarColor: "bg-pink-100 text-pink-700" },
  { id: "PAY-0170", name: "Amadou Bamba", amount: "15,000 XOF", amountNum: 15000, operator: "Wave", phone: "+221 77 234 5678", date: "Mai 16, 2024", status: "En Attente", statusColor: "bg-yellow-100 text-yellow-700", level: 3, avatar: "AB", avatarColor: "bg-blue-100 text-blue-700" },
];

const statusIcon: Record<string, typeof Clock> = {
  "En Attente": Clock,
  "Payé": CheckCircle2,
  "Rejeté": XCircle,
};

export default function PaiementsPage() {
  const [showValidateModal, setShowValidateModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<(typeof payments)[0] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalPages = Math.ceil(payments.length / pageSize);
  const paginatedPayments = payments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const openValidate = (p: (typeof payments)[0]) => {
    setSelectedPayment(p);
    setShowValidateModal(true);
  };

  const openReject = (p: (typeof payments)[0]) => {
    setSelectedPayment(p);
    setShowRejectModal(true);
  };

  const openDetail = (p: (typeof payments)[0]) => {
    setSelectedPayment(p);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <Wallet className="h-6 w-6 text-emerald-600" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Paiements Mobile Money</h2>
            <p className="text-sm text-gray-500 mt-1">Validez et traitez les demandes de retrait des contributeurs</p>
          </div>
        </div>
        <Button variant="outline" className="gap-2 text-gray-600">
          <Download className="h-4 w-4" /> Exporter
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-4">
          <Clock className="h-8 w-8 text-yellow-600" />
          <div><p className="text-2xl font-bold text-yellow-700">23</p><p className="text-xs text-yellow-600">En Attente</p></div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-4">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          <div><p className="text-2xl font-bold text-emerald-700">1,892</p><p className="text-xs text-emerald-600">Payés</p></div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-4">
          <XCircle className="h-8 w-8 text-red-500" />
          <div><p className="text-2xl font-bold text-red-700">47</p><p className="text-xs text-red-600">Rejetés</p></div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-4">
          <Wallet className="h-8 w-8 text-blue-600" />
          <div><p className="text-2xl font-bold text-blue-700">4.2M XOF</p><p className="text-xs text-blue-600">Total Traité</p></div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input placeholder="Rechercher par nom, ID ou téléphone..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>
        <button className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50"><Filter className="h-3.5 w-3.5" /> Statut</button>
        <button className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50"><Filter className="h-3.5 w-3.5" /> Opérateur</button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">ID</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Contributeur</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Montant</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Opérateur</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Téléphone</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Statut</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPayments.map((p) => {
              const Icon = statusIcon[p.status] || Clock;
              return (
                <tr key={p.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm font-medium text-emerald-600">{p.id}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7"><AvatarFallback className={`${p.avatarColor} text-[10px] font-semibold`}>{p.avatar}</AvatarFallback></Avatar>
                      <div>
                        <span className="text-sm text-gray-800 font-medium">{p.name}</span>
                        <p className="text-[10px] text-gray-400">Niveau {p.level}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold text-gray-800">{p.amount}</td>
                  <td className="py-3 px-4"><span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{p.operator}</span></td>
                  <td className="py-3 px-4 text-sm text-gray-600 font-mono">{p.phone}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{p.date}</td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${p.statusColor} inline-flex items-center gap-1`}>
                      <Icon className="h-3 w-3" /> {p.status}
                    </span>
                    {"rejectReason" in p && p.rejectReason && <p className="text-[10px] text-red-500 mt-0.5">{p.rejectReason}</p>}
                  </td>
                  <td className="py-3 px-4">
                    {p.status === "En Attente" ? (
                      <div className="flex items-center gap-1">
                        <button className="px-2 py-1 text-[10px] font-medium text-red-600 border border-red-200 rounded hover:bg-red-50" onClick={() => openReject(p)}>Rejeter</button>
                        <button className="px-2 py-1 text-[10px] font-medium text-white bg-emerald-500 rounded hover:bg-emerald-600" onClick={() => openValidate(p)}>Valider</button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <button className="p-1 rounded hover:bg-gray-100" onClick={() => openDetail(p)}><Eye className="h-4 w-4 text-gray-400" /></button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        <DataTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={payments.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
          pageSizeOptions={[5, 10, 20, 50]}
          label="paiements"
        />
      </div>

      {/* Modal: Valider Paiement */}
      <Dialog open={showValidateModal} onOpenChange={setShowValidateModal}>
        <DialogContent className="sm:max-w-md">
          {selectedPayment && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <DialogTitle>Valider le Paiement</DialogTitle>
                </div>
                <DialogDescription>Confirmez le paiement de {selectedPayment.id}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-emerald-700">{selectedPayment.amount}</p>
                  <p className="text-sm text-emerald-600 mt-1">sera envoyé à {selectedPayment.name}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Bénéficiaire</span>
                    <span className="font-medium">{selectedPayment.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Opérateur</span>
                    <span className="font-medium">{selectedPayment.operator}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Téléphone</span>
                    <span className="font-mono font-medium">{selectedPayment.phone}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Niveau</span>
                    <span className="font-medium">Niveau {selectedPayment.level}</span>
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-amber-700">Vérifiez que le numéro de téléphone est correct avant de confirmer. Le paiement est irréversible.</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowValidateModal(false)}>Annuler</Button>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white gap-1.5" onClick={() => setShowValidateModal(false)}>
                  <CheckCircle2 className="h-4 w-4" /> Confirmer le Paiement
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal: Rejeter Paiement */}
      <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
        <DialogContent className="sm:max-w-md">
          {selectedPayment && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <DialogTitle>Rejeter le Paiement</DialogTitle>
                </div>
                <DialogDescription>Rejeter la demande de {selectedPayment.id}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-red-700">{selectedPayment.amount}</p>
                  <p className="text-sm text-red-600 mt-1">ne sera pas envoyé à {selectedPayment.name}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Raison du Rejet</label>
                  <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>Compte Mobile Money invalide</option>
                    <option>Fraude détectée</option>
                    <option>Montant incorrect</option>
                    <option>Doublon de demande</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Commentaire</label>
                  <Textarea rows={3} placeholder="Expliquez la raison du rejet au contributeur..." className="resize-none" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowRejectModal(false)}>Annuler</Button>
                <Button className="bg-red-500 hover:bg-red-600 text-white gap-1.5" onClick={() => setShowRejectModal(false)}>
                  <XCircle className="h-4 w-4" /> Confirmer le Rejet
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal: Détails Paiement */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="sm:max-w-lg">
          {selectedPayment && (() => {
            const Icon = statusIcon[selectedPayment.status] || Clock;
            return (
              <>
                <DialogHeader>
                  <div className="flex items-center justify-between">
                    <DialogTitle>Détails du Paiement</DialogTitle>
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${selectedPayment.statusColor} inline-flex items-center gap-1`}>
                      <Icon className="h-3 w-3" /> {selectedPayment.status}
                    </span>
                  </div>
                  <DialogDescription>{selectedPayment.id}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12"><AvatarFallback className={`${selectedPayment.avatarColor} text-sm font-semibold`}>{selectedPayment.avatar}</AvatarFallback></Avatar>
                    <div>
                      <p className="text-base font-bold text-gray-800">{selectedPayment.name}</p>
                      <p className="text-xs text-gray-500">Contributeur Niveau {selectedPayment.level}</p>
                    </div>
                  </div>
                  <div className="text-center bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <p className="text-3xl font-bold text-gray-800">{selectedPayment.amount}</p>
                    <p className="text-xs text-gray-500 mt-1">Montant de la Demande</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Wallet className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-500">Opérateur :</span>
                      <span className="font-medium">{selectedPayment.operator}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-500">Tél :</span>
                      <span className="font-mono font-medium">{selectedPayment.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-500">Date :</span>
                      <span className="font-medium">{selectedPayment.date}</span>
                    </div>
                  </div>
                  {"rejectReason" in selectedPayment && selectedPayment.rejectReason && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-xs font-semibold text-red-700">Raison du rejet : {selectedPayment.rejectReason}</p>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowDetailModal(false)}>Fermer</Button>
                </DialogFooter>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
