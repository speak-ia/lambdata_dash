"use client";

import { useState } from "react";
import {
  Download,
  FileJson,
  FileArchive,
  FileSpreadsheet,
  Play,
  Settings2,
  CheckCircle2,
  XCircle,
  Loader2,
  Eye,
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

const initialExports = [
  { id: "EXP-012", type: "Audio", format: "ZIP + JSON", language: "Wolof", records: 12840, score: "> 0.8", date: "Mai 14, 2024", size: "2.4 GB", status: "Terminé", statusColor: "bg-emerald-100 text-emerald-700", duration: "12 min" },
  { id: "EXP-011", type: "Traduction", format: "CSV", language: "Bambara", records: 9650, score: "> 0.7", date: "Mai 12, 2024", size: "45 MB", status: "Terminé", statusColor: "bg-emerald-100 text-emerald-700", duration: "3 min" },
  { id: "EXP-010", type: "Image", format: "ZIP + JSON", language: "Dioula", records: 7230, score: "> 0.75", date: "Mai 10, 2024", size: "5.1 GB", status: "Terminé", statusColor: "bg-emerald-100 text-emerald-700", duration: "25 min" },
  { id: "EXP-009", type: "Audio", format: "ZIP + JSON", language: "Pulaar", records: 5890, score: "> 0.8", date: "Mai 08, 2024", size: "1.8 GB", status: "Échoué", statusColor: "bg-red-100 text-red-700", duration: "—", error: "Espace disque insuffisant" },
  { id: "EXP-008", type: "Traduction", format: "JSON", language: "Soninké", records: 14200, score: "> 0.9", date: "Mai 07, 2024", size: "62 MB", status: "Terminé", statusColor: "bg-emerald-100 text-emerald-700", duration: "8 min" },
  { id: "EXP-007", type: "Image", format: "ZIP + JSON", language: "Malinké", records: 4350, score: "> 0.6", date: "Mai 06, 2024", size: "8.2 GB", status: "En Cours", statusColor: "bg-blue-100 text-blue-700", duration: "—" },
  { id: "EXP-006", type: "Audio", format: "ZIP + JSON", language: "Wolof", records: 10200, score: "> 0.7", date: "Mai 05, 2024", size: "3.6 GB", status: "Terminé", statusColor: "bg-emerald-100 text-emerald-700", duration: "18 min" },
  { id: "EXP-005", type: "Traduction", format: "CSV", language: "Bambara", records: 3100, score: "> 0.5", date: "Mai 04, 2024", size: "15 MB", status: "Terminé", statusColor: "bg-emerald-100 text-emerald-700", duration: "2 min" },
  { id: "EXP-004", type: "Image", format: "ZIP + JSON", language: "Dioula", records: 6780, score: "> 0.8", date: "Mai 03, 2024", size: "4.7 GB", status: "Terminé", statusColor: "bg-emerald-100 text-emerald-700", duration: "22 min" },
  { id: "EXP-003", type: "Audio", format: "ZIP + JSON", language: "Pulaar", records: 8940, score: "> 0.6", date: "Mai 02, 2024", size: "2.9 GB", status: "Terminé", statusColor: "bg-emerald-100 text-emerald-700", duration: "14 min" },
  { id: "EXP-002", type: "Traduction", format: "JSON", language: "Soninké", records: 2000, score: "> 0.9", date: "Mai 01, 2024", size: "28 MB", status: "Terminé", statusColor: "bg-emerald-100 text-emerald-700", duration: "5 min" },
  { id: "EXP-001", type: "Image", format: "ZIP + JSON", language: "Malinké", records: 15000, score: "> 0.5", date: "Mai 01, 2024", size: "6.3 GB", status: "Terminé", statusColor: "bg-emerald-100 text-emerald-700", duration: "35 min" },
];

type ExportEntry = (typeof initialExports)[0] & { blob?: string };

export default function ExportPage() {
  const [exports, setExports] = useState<ExportEntry[]>(initialExports);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedExport, setSelectedExport] = useState<ExportEntry | null>(null);
  const [exportConfig, setExportConfig] = useState({ type: "Tous les Types", language: "Toutes les Langues", score: "> 0.5", format: "JSON" });
  const [exportName, setExportName] = useState(`lambdata-export-${new Date().toISOString().slice(0, 10)}`);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalPages = Math.ceil(exports.length / pageSize);
  const paginatedExports = exports.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const openDetail = (e: ExportEntry) => {
    setSelectedExport(e);
    setShowDetailModal(true);
  };

  const startExport = () => {
    setShowExportModal(true);
  };

  const handleExport = () => {
    // Sample corpus data (represents validated contributions)
    const sampleData = Array.from({ length: 42 }, (_, i) => ({
      id: `CONT-${5000 + i}`,
      phrase: `Phrase exemple ${i + 1}`,
      traduction: `Traduction exemple ${i + 1}`,
      langue: exportConfig.language === "Toutes les Langues" ? ["Wolof", "Bambara", "Dioula", "Pulaar"][i % 4] : exportConfig.language,
      type: exportConfig.type === "Tous les Types" ? ["Audio", "Traduction", "Image"][i % 3] : exportConfig.type,
      score_qualite: (0.75 + Math.random() * 0.25).toFixed(2),
      statut: "Validé",
      date_validation: new Date(Date.now() - i * 86400000).toISOString().slice(0, 10),
    }));

    let content: string;
    let mimeType: string;
    let ext: string;

    if (exportConfig.format === "CSV") {
      const headers = Object.keys(sampleData[0]).join(",");
      const rows = sampleData.map((r) => Object.values(r).join(","));
      content = [headers, ...rows].join("\n");
      mimeType = "text/csv";
      ext = "csv";
    } else {
      content = JSON.stringify(sampleData, null, 2);
      mimeType = "application/json";
      ext = "json";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${exportName}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);

    const newEntry: ExportEntry = {
      id: `EXP-${String(exports.length + 1).padStart(3, "0")}`,
      type: exportConfig.type === "Tous les Types" ? "Tous" : exportConfig.type,
      format: exportConfig.format,
      language: exportConfig.language === "Toutes les Langues" ? "Toutes" : exportConfig.language,
      records: sampleData.length,
      score: exportConfig.score,
      date: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }),
      size: `${(content.length / 1024).toFixed(0)} KB`,
      status: "Terminé",
      statusColor: "bg-emerald-100 text-emerald-700",
      duration: "< 1 s",
      blob: content,
    };
    setExports((prev) => [newEntry, ...prev]);
    setShowExportModal(false);
  };

  const handleDownload = (entry: ExportEntry) => {
    if (!entry.blob) return;
    const ext = entry.format === "CSV" ? "csv" : "json";
    const mimeType = entry.format === "CSV" ? "text/csv" : "application/json";
    const blob = new Blob([entry.blob], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${entry.id}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Download className="h-6 w-6 text-emerald-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Export Corpus de Données IA</h2>
          <p className="text-sm text-gray-500 mt-1">Extrayez les jeux de données validés dans des formats standards</p>
        </div>
      </div>

      {/* Export Engine */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <Settings2 className="h-5 w-5 text-emerald-600" />
          <h3 className="text-base font-semibold text-gray-800">Moteur d&apos;Exportation</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Type de Contribution</label>
            <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" value={exportConfig.type} onChange={(e) => setExportConfig(c => ({ ...c, type: e.target.value }))}>
              <option>Tous les Types</option><option>Audio</option><option>Traduction</option><option>Image</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Langue Cible</label>
            <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" value={exportConfig.language} onChange={(e) => setExportConfig(c => ({ ...c, language: e.target.value }))}>
              <option>Toutes les Langues</option><option>Wolof</option><option>Bambara</option><option>Dioula</option><option>Pulaar</option><option>Soninké</option><option>Malinké</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Score Qualité Min.</label>
            <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" value={exportConfig.score} onChange={(e) => setExportConfig(c => ({ ...c, score: e.target.value }))}>
              <option>{"> 0.5"}</option><option>{"> 0.6"}</option><option>{"> 0.7"}</option><option>{"> 0.8"}</option><option>{"> 0.9"}</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Format d&apos;Export</label>
            <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" value={exportConfig.format} onChange={(e) => setExportConfig(c => ({ ...c, format: e.target.value }))}>
              <option>CSV</option><option>JSON</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <div className="flex items-center gap-2 mb-1.5">
              <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
              <span className="text-xs font-semibold text-gray-700">Textes / Traductions</span>
            </div>
            <p className="text-[11px] text-gray-500">Fichiers CSV ou JSON structurés avec métadonnées de validation</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <div className="flex items-center gap-2 mb-1.5">
              <FileArchive className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-semibold text-gray-700">Audio</span>
            </div>
            <p className="text-[11px] text-gray-500">Archive ZIP (.webm/.wav) + fichier d&apos;indexation JSON</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <div className="flex items-center gap-2 mb-1.5">
              <FileJson className="h-4 w-4 text-purple-600" />
              <span className="text-xs font-semibold text-gray-700">Images</span>
            </div>
            <p className="text-[11px] text-gray-500">ZIP des images labellisées + métadonnées d&apos;annotation JSON</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-xs text-gray-500">
            <span className="font-semibold text-gray-700">38,730</span> contributions éligibles après filtrage
          </div>
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2" onClick={startExport}>
            <Play className="h-4 w-4" /> Lancer l&apos;Export
          </Button>
        </div>
      </div>

      {/* Recent Exports */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-base font-semibold text-gray-800 mb-4">Exports Récents</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase">ID</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase">Format</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase">Langue</th>
                <th className="text-right py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase">Enregistrements</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase">Score Min.</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="text-right py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase">Taille</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase">Statut</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedExports.map((e) => (
                <tr key={e.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="py-3 px-3 text-sm font-medium text-emerald-600">{e.id}</td>
                  <td className="py-3 px-3"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${e.type === "Audio" ? "bg-blue-100 text-blue-700" : e.type === "Traduction" ? "bg-purple-100 text-purple-700" : "bg-amber-100 text-amber-700"}`}>{e.type}</span></td>
                  <td className="py-3 px-3 text-sm text-gray-600">{e.format}</td>
                  <td className="py-3 px-3 text-sm text-gray-600">{e.language}</td>
                  <td className="py-3 px-3 text-right text-sm font-medium text-gray-800">{e.records.toLocaleString()}</td>
                  <td className="py-3 px-3 text-sm text-gray-500">{e.score}</td>
                  <td className="py-3 px-3 text-sm text-gray-500">{e.date}</td>
                  <td className="py-3 px-3 text-right text-sm text-gray-700 font-medium">{e.size}</td>
                  <td className="py-3 px-3"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${e.statusColor}`}>{e.status}</span></td>
                  <td className="py-3 px-3">
                    <button className="p-1 rounded hover:bg-gray-100" onClick={() => openDetail(e)}><Eye className="h-4 w-4 text-gray-400" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DataTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={exports.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
          pageSizeOptions={[5, 10, 20]}
          label="exports"
        />
      </div>

      {/* Modal: Confirmation Export */}
      <Dialog open={showExportModal} onOpenChange={setShowExportModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5 text-emerald-600" />
              <DialogTitle>Confirmer l&apos;Export</DialogTitle>
            </div>
            <DialogDescription>Vérifiez les paramètres avant de lancer l&apos;export</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Type</span>
                <span className="font-medium text-gray-800">{exportConfig.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Langue</span>
                <span className="font-medium text-gray-800">{exportConfig.language}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Score Minimum</span>
                <span className="font-medium text-gray-800">{exportConfig.score}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Format</span>
                <span className="font-medium text-gray-800">{exportConfig.format}</span>
              </div>
              <div className="border-t border-gray-200 pt-2.5 flex justify-between text-sm">
                <span className="font-semibold text-gray-700">Contributions éligibles</span>
                <span className="font-bold text-emerald-600">42</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Nom de l&apos;Export</label>
              <input value={exportName} onChange={(e) => setExportName(e.target.value)} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportModal(false)}>Annuler</Button>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white gap-1.5" onClick={handleExport}>
              <Play className="h-4 w-4" /> Lancer l&apos;Export
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Détails Export */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="sm:max-w-lg">
          {selectedExport && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle>Détails de l&apos;Export</DialogTitle>
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${selectedExport.statusColor}`}>
                    {selectedExport.status}
                  </span>
                </div>
                <DialogDescription>{selectedExport.id}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <p className="text-sm font-bold text-blue-700">{selectedExport.type}</p>
                    <p className="text-[10px] text-blue-600">Type</p>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-3 text-center">
                    <p className="text-sm font-bold text-emerald-700">{selectedExport.language}</p>
                    <p className="text-[10px] text-emerald-600">Langue</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <p className="text-sm font-bold text-purple-700">{selectedExport.format}</p>
                    <p className="text-[10px] text-purple-600">Format</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Enregistrements</span>
                    <span className="font-semibold">{selectedExport.records.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Score Minimum</span>
                    <span className="font-medium">{selectedExport.score}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Taille</span>
                    <span className="font-semibold">{selectedExport.size}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Durée</span>
                    <span className="font-medium">{selectedExport.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Date</span>
                    <span className="font-medium">{selectedExport.date}</span>
                  </div>
                </div>
                {"error" in selectedExport && selectedExport.error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <p className="text-xs font-semibold text-red-700">Erreur : {selectedExport.error}</p>
                    </div>
                  </div>
                )}
                {selectedExport.status === "Terminé" && (
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white gap-2" disabled={"blob" in selectedExport ? !selectedExport.blob : true} onClick={() => handleDownload(selectedExport)}>
                    <Download className="h-4 w-4" /> Télécharger le Fichier
                  </Button>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDetailModal(false)}>Fermer</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
