"use client";

import { useState, useRef } from "react";
import {
  Upload,
  Search,
  Filter,
  Plus,
  FileText,
  ChevronDown,
  MoreVertical,
  Eye,
  Trash2,
  Pencil,
  Play,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DataTablePagination } from "@/components/dashboard/data-table-pagination";

const initialPhrases = [
  { id: "PHR-00456", text: "Naka nga def sa alal?", translation: "Comment vas-tu ce matin?", language: "Wolof", type: "Audio", theme: "Santé", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 23, avatar: "WO", createdDate: "Mai 10, 2024", campaign: "CAMP-001" },
  { id: "PHR-00455", text: "I cɛ la bɛnɛ n'o tɔgɔ?", translation: "Comment t'appelles-tu?", language: "Bambara", type: "Traduction", theme: "Agriculture", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 18, avatar: "BA", createdDate: "Mai 09, 2024", campaign: "CAMP-002" },
  { id: "PHR-00454", text: "A yɛ kɛɛ i wuliɛ?", translation: "Qu'est-ce que tu fais?", language: "Dioula", type: "Audio", theme: "Vie Quotidienne", status: "Inactif", statusColor: "bg-gray-100 text-gray-600", submissions: 12, avatar: "DI", createdDate: "Mai 08, 2024", campaign: "CAMP-003" },
  { id: "PHR-00453", text: "Miɗɗo heɓɓay ngam nyaamo?", translation: "Où puis-je trouver à manger?", language: "Pulaar", type: "Traduction", theme: "Éducation", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 9, avatar: "PU", createdDate: "Mai 07, 2024", campaign: "CAMP-004" },
  { id: "PHR-00452", text: "Alhamdulillah, naka la waɗɓe?", translation: "Merci à Dieu, comment vont les choses?", language: "Wolof", type: "Audio", theme: "Commerce", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 31, avatar: "WO", createdDate: "Mai 06, 2024", campaign: "CAMP-006" },
  { id: "PHR-00451", text: "Mɔgɔw be timinɛ kɛ?", translation: "Que font les gens?", language: "Bambara", type: "Traduction", theme: "Finance", status: "Inactif", statusColor: "bg-gray-100 text-gray-600", submissions: 5, avatar: "BA", createdDate: "Mai 05, 2024", campaign: "CAMP-005" },
  { id: "PHR-00450", text: "N be se ka wele ka bɔ?", translation: "Je ne peux pas sortir?", language: "Dioula", type: "Audio", theme: "Santé", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 27, avatar: "DI", createdDate: "Mai 04, 2024", campaign: "CAMP-001" },
  { id: "PHR-00449", text: "Min nda ballal e ndiyam?", translation: "Où puis-je trouver de l'eau?", language: "Pulaar", type: "Traduction", theme: "Agriculture", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 14, avatar: "PU", createdDate: "Mai 03, 2024", campaign: "CAMP-002" },
  { id: "PHR-00448", text: "Naka nga wàcc fa seen alal?", translation: "Comment dépensez-vous votre richesse?", language: "Wolof", type: "Traduction", theme: "Commerce", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 42, avatar: "WO", createdDate: "Avr 28, 2024", campaign: "CAMP-006" },
  { id: "PHR-00447", text: "U ka bɔrɔ la nɛnɛkɛrɛ?", translation: "Où est le marché?", language: "Bambara", type: "Audio", theme: "Commerce", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 36, avatar: "BA", createdDate: "Avr 27, 2024", campaign: "CAMP-006" },
  { id: "PHR-00446", text: "I diɛɛ n'a sɔrɔ ka nyɛ?", translation: "As-tu bien dormi?", language: "Dioula", type: "Traduction", theme: "Vie Quotidienne", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 8, avatar: "DI", createdDate: "Avr 26, 2024", campaign: "CAMP-003" },
  { id: "PHR-00445", text: "Miɗɗo yahda janngude?", translation: "Je veux aller étudier", language: "Pulaar", type: "Audio", theme: "Éducation", status: "Inactif", statusColor: "bg-gray-100 text-gray-600", submissions: 3, avatar: "PU", createdDate: "Avr 25, 2024", campaign: "CAMP-004" },
  { id: "PHR-00444", text: "Dama koo jënd luy lekk?", translation: "Je veux acheter à manger", language: "Wolof", type: "Audio", theme: "Vie Quotidienne", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 19, avatar: "WO", createdDate: "Avr 24, 2024", campaign: "CAMP-001" },
  { id: "PHR-00443", text: "A bɛ tɔɔrɔ ka ɲɛ?", translation: "Le champ est beau", language: "Bambara", type: "Traduction", theme: "Agriculture", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 11, avatar: "BA", createdDate: "Avr 23, 2024", campaign: "CAMP-002" },
  { id: "PHR-00442", text: "N ka sɔrɔ ka minan wolo?", translation: "Je n'ai pas trouvé l'argent", language: "Dioula", type: "Audio", theme: "Finance", status: "Inactif", statusColor: "bg-gray-100 text-gray-600", submissions: 6, avatar: "DI", createdDate: "Avr 22, 2024", campaign: "CAMP-005" },
  { id: "PHR-00441", text: "Gorko aɗa waɗugo nyawɗo?", translation: "Le médecin peut-il soigner?", language: "Pulaar", type: "Traduction", theme: "Santé", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 29, avatar: "PU", createdDate: "Avr 21, 2024", campaign: "CAMP-001" },
  { id: "PHR-00440", text: "Xarit ba la xaar ci biir?", translation: "Mon ami attend à l'intérieur", language: "Wolof", type: "Traduction", theme: "Vie Quotidienne", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 15, avatar: "WO", createdDate: "Avr 20, 2024", campaign: "CAMP-003" },
  { id: "PHR-00439", text: "A ka wuli ka dɔgɔ ka ɲɛ?", translation: "Il faut semer tôt pour bien récolter", language: "Bambara", type: "Audio", theme: "Agriculture", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 22, avatar: "BA", createdDate: "Avr 19, 2024", campaign: "CAMP-002" },
  { id: "PHR-00438", text: "A yɛ sɔrɔla ka ɲagami?", translation: "Combien ça coûte?", language: "Dioula", type: "Traduction", theme: "Commerce", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 44, avatar: "DI", createdDate: "Avr 18, 2024", campaign: "CAMP-006" },
  { id: "PHR-00437", text: "Ɓe njanngii e janngirde?", translation: "Ils ont étudié à l'école", language: "Pulaar", type: "Audio", theme: "Éducation", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 7, avatar: "PU", createdDate: "Avr 17, 2024", campaign: "CAMP-004" },
  { id: "PHR-00436", text: "Dama bëgg a jàng waa gan?", translation: "Je veux apprendre une nouvelle langue", language: "Wolof", type: "Traduction", theme: "Éducation", status: "Inactif", statusColor: "bg-gray-100 text-gray-600", submissions: 2, avatar: "WO", createdDate: "Avr 16, 2024", campaign: "CAMP-004" },
  { id: "PHR-00435", text: "N ka se ka wele dɔgɔtɔrɔ?", translation: "Il faut appeler le médecin", language: "Bambara", type: "Audio", theme: "Santé", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 38, avatar: "BA", createdDate: "Avr 15, 2024", campaign: "CAMP-001" },
  { id: "PHR-00434", text: "N fa wolo bɛnɛ ka bɔ?", translation: "Mon argent ne suffit pas", language: "Dioula", type: "Traduction", theme: "Finance", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 16, avatar: "DI", createdDate: "Avr 14, 2024", campaign: "CAMP-005" },
  { id: "PHR-00433", text: "Yaaye yahii ka lekk kaari?", translation: "Ma mère est allée préparer le repas", language: "Soninké", type: "Audio", theme: "Vie Quotidienne", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 10, avatar: "SO", createdDate: "Avr 13, 2024", campaign: "CAMP-003" },
  { id: "PHR-00432", text: "N kɛnɛ bɛ la ka janɛ?", translation: "Je suis heureux de te voir", language: "Malinké", type: "Traduction", theme: "Vie Quotidienne", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 25, avatar: "ML", createdDate: "Avr 12, 2024", campaign: "CAMP-003" },
  { id: "PHR-00431", text: "Saax mooy fenn ba xam?", translation: "Le médecin connaît la maladie", language: "Wolof", type: "Audio", theme: "Santé", status: "Inactif", statusColor: "bg-gray-100 text-gray-600", submissions: 4, avatar: "WO", createdDate: "Avr 11, 2024", campaign: "CAMP-001" },
  { id: "PHR-00430", text: "U ka sɔrɔ wolo ja bɛnɛ?", translation: "Où peut-on trouver du crédit?", language: "Bambara", type: "Traduction", theme: "Finance", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 33, avatar: "BA", createdDate: "Avr 10, 2024", campaign: "CAMP-005" },
  { id: "PHR-00429", text: "N be fa ka sigi ka bɔ?", translation: "Je veux m'asseoir ici", language: "Dioula", type: "Audio", theme: "Vie Quotidienne", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 13, avatar: "DI", createdDate: "Avr 09, 2024", campaign: "CAMP-003" },
  { id: "PHR-00428", text: "Hiɗɗo faama ka nyaɓɓa?", translation: "Le chef a donné sa permission", language: "Soninké", type: "Traduction", theme: "Éducation", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 20, avatar: "SO", createdDate: "Avr 08, 2024", campaign: "CAMP-004" },
  { id: "PHR-00427", text: "A bɛ wuli ka ɲɛ ka kɛnɛ?", translation: "Le soleil se lève brillant", language: "Malinké", type: "Audio", theme: "Agriculture", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 17, avatar: "ML", createdDate: "Avr 07, 2024", campaign: "CAMP-002" },
  { id: "PHR-00426", text: "Dama xam ne dama méppé?", translation: "Je sais que j'ai raison", language: "Wolof", type: "Traduction", theme: "Éducation", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 1, avatar: "WO", createdDate: "Avr 06, 2024", campaign: "CAMP-004" },
  { id: "PHR-00425", text: "Mɔgɔw be wuli ka nyɛ?", translation: "Les gens se lèvent tôt", language: "Bambara", type: "Audio", theme: "Agriculture", status: "Inactif", statusColor: "bg-gray-100 text-gray-600", submissions: 9, avatar: "BA", createdDate: "Avr 05, 2024", campaign: "CAMP-002" },
  { id: "PHR-00424", text: "N fa wolo ka sɔrɔ bɛnɛ?", translation: "Je n'ai pas assez d'argent", language: "Dioula", type: "Traduction", theme: "Commerce", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 50, avatar: "DI", createdDate: "Avr 04, 2024", campaign: "CAMP-006" },
  { id: "PHR-00423", text: "Ɓe njahi ka lekk nyama?", translation: "Ils sont allés chasser", language: "Pulaar", type: "Audio", theme: "Vie Quotidienne", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 21, avatar: "PU", createdDate: "Avr 03, 2024", campaign: "CAMP-003" },
  { id: "PHR-00422", text: "Yaa nɛɛ ma yɛlɛ maŋɛ?", translation: "Qui t'a enseigné cela?", language: "Soninké", type: "Traduction", theme: "Éducation", status: "Inactif", statusColor: "bg-gray-100 text-gray-600", submissions: 7, avatar: "SO", createdDate: "Avr 02, 2024", campaign: "CAMP-004" },
  { id: "PHR-00421", text: "N kɛnɛ bɛ ka janɛ dɔgɔtɔrɔ?", translation: "Le médecin est très compétent", language: "Malinké", type: "Audio", theme: "Santé", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700", submissions: 34, avatar: "ML", createdDate: "Avr 01, 2024", campaign: "CAMP-001" },
];

type Phrase = (typeof initialPhrases)[0];

export default function PhrasesPage() {
  const [phrases, setPhrases] = useState<Phrase[]>(initialPhrases);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPhrase, setSelectedPhrase] = useState<Phrase | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Add form state
  const [newPhrase, setNewPhrase] = useState({ text: "", translation: "", language: "Wolof", type: "Audio", theme: "Santé", campaign: "Aucune" });

  // Import state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importPreview, setImportPreview] = useState<{ count: number; error?: string } | null>(null);
  const [importCampaign, setImportCampaign] = useState("Aucune");

  const totalPages = Math.ceil(phrases.length / pageSize);
  const paginatedPhrases = phrases.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const openDetail = (p: Phrase) => {
    setSelectedPhrase(p);
    setShowDetailModal(true);
  };

  const handleAddPhrase = () => {
    if (!newPhrase.text.trim()) return;
    const id = `PHR-${String(Math.max(...phrases.map(p => parseInt(p.id.split("-")[1]))) + 1).padStart(5, "0")}`;
    const langAbbr: Record<string, string> = { Wolof: "WO", Bambara: "BA", Dioula: "DI", Pulaar: "PU", Soninké: "SO", Malinké: "ML" };
    setPhrases((prev) => [{
      id,
      text: newPhrase.text,
      translation: newPhrase.translation,
      language: newPhrase.language,
      type: newPhrase.type,
      theme: newPhrase.theme,
      status: "Actif",
      statusColor: "bg-emerald-100 text-emerald-700",
      submissions: 0,
      avatar: langAbbr[newPhrase.language] ?? newPhrase.language.slice(0, 2).toUpperCase(),
      createdDate: new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "short", day: "numeric" }),
      campaign: newPhrase.campaign === "Aucune" ? "—" : newPhrase.campaign,
    }, ...prev]);
    setNewPhrase({ text: "", translation: "", language: "Wolof", type: "Audio", theme: "Santé", campaign: "Aucune" });
    setShowAddModal(false);
  };

  const handleDeletePhrase = (id: string) => {
    setPhrases((prev) => prev.filter((p) => p.id !== id));
    setShowDetailModal(false);
  };

  const parseCSV = (text: string): Record<string, string>[] => {
    const lines = text.split(/\r?\n/).filter((l) => l.trim());
    if (lines.length < 2) return [];
    const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, "").toLowerCase());
    return lines.slice(1).map((line) => {
      const values = line.split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
      return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? ""]));
    });
  };

  const handleFileChange = (file: File) => {
    setImportFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      try {
        const rows = file.name.endsWith(".json") ? JSON.parse(text) : parseCSV(text);
        setImportPreview({ count: Array.isArray(rows) ? rows.length : 0 });
      } catch {
        setImportPreview({ count: 0, error: "Fichier invalide ou mal formaté" });
      }
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    if (!importFile) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      try {
        const rows: Record<string, string>[] = importFile.name.endsWith(".json") ? JSON.parse(text) : parseCSV(text);
        const langAbbr: Record<string, string> = { Wolof: "WO", Bambara: "BA", Dioula: "DI", Pulaar: "PU", Soninké: "SO", Malinké: "ML" };
        const base = Math.max(...phrases.map((p) => parseInt(p.id.split("-")[1])));
        const imported: Phrase[] = rows.map((row, i) => {
          const lang = row.langue ?? row.language ?? "Wolof";
          return {
            id: `PHR-${String(base + i + 1).padStart(5, "0")}`,
            text: row.phrase ?? row.text ?? "",
            translation: row.traduction ?? row.translation ?? "",
            language: lang,
            type: (row.type ?? "Audio") as "Audio" | "Traduction",
            theme: row.thematique ?? row.theme ?? "Santé",
            status: "Actif",
            statusColor: "bg-emerald-100 text-emerald-700",
            submissions: 0,
            avatar: langAbbr[lang] ?? lang.slice(0, 2).toUpperCase(),
            createdDate: new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "short", day: "numeric" }),
            campaign: importCampaign === "Aucune" ? "—" : importCampaign,
          };
        });
        setPhrases((prev) => [...imported, ...prev]);
        setImportFile(null);
        setImportPreview(null);
        setShowImportModal(false);
      } catch {
        setImportPreview({ count: 0, error: "Erreur lors de l'import" });
      }
    };
    reader.readAsText(importFile);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Phrases Sources</h2>
          <p className="text-sm text-gray-500 mt-1">Importez et gérez les phrases pour la collecte vocale et la traduction</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="gap-2 text-gray-600" onClick={() => setShowImportModal(true)}>
            <Upload className="h-4 w-4" /> Importer CSV/JSON
          </Button>
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2" onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4" /> Ajouter Phrase
          </Button>
        </div>
      </div>

      {/* Import Zone */}
      <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-8 text-center hover:border-emerald-400 transition-colors cursor-pointer" onClick={() => setShowImportModal(true)}>
        <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
        <p className="text-sm font-medium text-gray-700 mb-1">Glissez-déposez votre fichier CSV ou JSON ici</p>
        <p className="text-xs text-gray-500 mb-3">Format attendu : colonnes phrase, langue, thématique, type</p>
        <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-300">
          Parcourir les fichiers
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input placeholder="Rechercher une phrase..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>
        <button className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50"><Filter className="h-3.5 w-3.5" /> Langue <ChevronDown className="h-3 w-3" /></button>
        <button className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50"><Filter className="h-3.5 w-3.5" /> Thématique <ChevronDown className="h-3 w-3" /></button>
        <button className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50"><Filter className="h-3.5 w-3.5" /> Statut <ChevronDown className="h-3 w-3" /></button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">ID</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Phrase</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Langue</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Type</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Thématique</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Soumissions</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Statut</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPhrases.map((p) => (
              <tr key={p.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 text-sm font-medium text-emerald-600">{p.id}</td>
                <td className="py-3 px-4 text-sm text-gray-800 max-w-xs truncate">{p.text}</td>
                <td className="py-3 px-4">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{p.language}</span>
                </td>
                <td className="py-3 px-4">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${p.type === "Audio" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>{p.type}</span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{p.theme}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-gray-400" />
                    <span className="text-sm text-gray-700">{p.submissions}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${p.statusColor}`}>{p.status}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <button className="p-1 rounded hover:bg-gray-100" onClick={() => openDetail(p)}><Eye className="h-4 w-4 text-gray-400" /></button>
                    <button className="p-1 rounded hover:bg-gray-100"><Pencil className="h-4 w-4 text-gray-400" /></button>
                    <button className="p-1 rounded hover:bg-gray-100" onClick={() => handleDeletePhrase(p.id)}><Trash2 className="h-4 w-4 text-red-400" /></button>
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
          totalItems={phrases.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
          pageSizeOptions={[5, 10, 20, 50]}
          label="phrases"
        />
      </div>

      {/* Modal: Ajouter Phrase */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Ajouter une Phrase</DialogTitle>
            <DialogDescription>Ajoutez une nouvelle phrase source pour la collecte</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Phrase Originale</label>
              <textarea rows={3} placeholder="Entrez la phrase dans la langue source..." className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" value={newPhrase.text} onChange={(e) => setNewPhrase(p => ({ ...p, text: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Traduction Française</label>
              <input placeholder="Traduction en français..." className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" value={newPhrase.translation} onChange={(e) => setNewPhrase(p => ({ ...p, translation: e.target.value }))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Langue</label>
                <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" value={newPhrase.language} onChange={(e) => setNewPhrase(p => ({ ...p, language: e.target.value }))}>
                  <option>Wolof</option><option>Bambara</option><option>Dioula</option><option>Pulaar</option><option>Soninké</option><option>Malinké</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Type de Collecte</label>
                <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" value={newPhrase.type} onChange={(e) => setNewPhrase(p => ({ ...p, type: e.target.value }))}>
                  <option>Audio</option><option>Traduction</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Thématique</label>
                <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" value={newPhrase.theme} onChange={(e) => setNewPhrase(p => ({ ...p, theme: e.target.value }))}>
                  <option>Santé</option><option>Agriculture</option><option>Éducation</option><option>Finance</option><option>Commerce</option><option>Vie Quotidienne</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Campagne Associée</label>
                <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" value={newPhrase.campaign} onChange={(e) => setNewPhrase(p => ({ ...p, campaign: e.target.value }))}>
                  <option>Aucune</option><option>CAMP-001</option><option>CAMP-002</option><option>CAMP-003</option><option>CAMP-004</option><option>CAMP-005</option><option>CAMP-006</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddModal(false)}>Annuler</Button>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white" disabled={!newPhrase.text.trim()} onClick={handleAddPhrase}>Ajouter la Phrase</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Importer CSV/JSON */}
      <Dialog open={showImportModal} onOpenChange={setShowImportModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Importer des Phrases</DialogTitle>
            <DialogDescription>Importez un fichier CSV ou JSON contenant vos phrases sources</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <input ref={fileInputRef} type="file" accept=".csv,.json" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileChange(f); }} />
            <div
              className={`bg-white border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${importFile ? "border-emerald-400 bg-emerald-50" : "border-gray-300 hover:border-emerald-400"}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFileChange(f); }}
            >
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              {importFile ? (
                <p className="text-sm font-medium text-emerald-700">{importFile.name}</p>
              ) : (
                <>
                  <p className="text-sm font-medium text-gray-700 mb-1">Glissez-déposez votre fichier ici</p>
                  <p className="text-xs text-gray-500">CSV ou JSON — Max 10 MB</p>
                </>
              )}
              <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-300 mt-3" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>Parcourir</Button>
            </div>
            {importPreview && (
              <div className={`rounded-lg p-3 border text-sm ${importPreview.error ? "bg-red-50 border-red-200 text-red-700" : "bg-emerald-50 border-emerald-200 text-emerald-700"}`}>
                {importPreview.error ? `⚠ ${importPreview.error}` : `✓ ${importPreview.count} phrase(s) détectée(s) — prêtes à importer`}
              </div>
            )}
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <p className="text-xs font-semibold text-gray-700 mb-1.5">Format attendu :</p>
              <p className="text-[11px] text-gray-500 mb-1"><strong>CSV :</strong> colonnes — phrase, traduction, langue, thématique, type</p>
              <p className="text-[11px] text-gray-500"><strong>JSON :</strong> tableau d&apos;objets avec les mêmes clés</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Campagne Destination</label>
              <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" value={importCampaign} onChange={(e) => setImportCampaign(e.target.value)}>
                <option value="Aucune">Aucune (phrases orphelines)</option><option>CAMP-001</option><option>CAMP-002</option><option>CAMP-003</option><option>CAMP-004</option><option>CAMP-005</option><option>CAMP-006</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowImportModal(false); setImportFile(null); setImportPreview(null); }}>Annuler</Button>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2" disabled={!importFile || !!importPreview?.error} onClick={handleImport}>
              <Upload className="h-4 w-4" /> Lancer l&apos;Import
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Détails Phrase */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="sm:max-w-lg">
          {selectedPhrase && (
            <>
              <DialogHeader>
                <DialogTitle>Détails de la Phrase</DialogTitle>
                <DialogDescription>{selectedPhrase.id}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Phrase Originale</p>
                  <p className="text-base font-medium text-gray-800">{selectedPhrase.text}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <p className="text-xs font-semibold text-blue-500 uppercase mb-1">Traduction Française</p>
                  <p className="text-sm text-blue-800">{selectedPhrase.translation}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">Langue :</span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{selectedPhrase.language}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">Type :</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${selectedPhrase.type === "Audio" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>{selectedPhrase.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">Thème :</span>
                    <span className="font-medium text-gray-800">{selectedPhrase.theme}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">Statut :</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${selectedPhrase.statusColor}`}>{selectedPhrase.status}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
                  <span className="text-gray-500">Soumissions : <strong className="text-gray-800">{selectedPhrase.submissions}</strong></span>
                  <span className="text-gray-500">Campagne : <strong className="text-emerald-600">{selectedPhrase.campaign}</strong></span>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="gap-1.5" onClick={() => setShowDetailModal(false)}>
                  <Pencil className="h-3.5 w-3.5" /> Modifier
                </Button>
                <Button className="bg-red-500 hover:bg-red-600 text-white gap-1.5" onClick={() => selectedPhrase && handleDeletePhrase(selectedPhrase.id)}>
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
