"use client";

import { useState } from "react";
import {
  Upload,
  Search,
  Filter,
  Plus,
  Image as ImageIcon,
  Eye,
  MoreVertical,
  Tag,
  MessageSquare,
  Pencil,
  Trash2,
  Settings2,
  CheckCircle2,
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

const images = [
  { id: "IMG-001", name: "Marché Dakar", tags: ["marché", "commerce", "nourriture"], questions: 3, validations: 45, status: "Active", statusColor: "bg-emerald-100 text-emerald-700", description: "Scène de marché typique à Dakar avec des étals de fruits et légumes.", campaign: "CAMP-006" },
  { id: "IMG-002", name: "Champ Mil Bamako", tags: ["agriculture", "mil", "champ"], questions: 2, validations: 32, status: "Active", statusColor: "bg-emerald-100 text-emerald-700", description: "Champ de mil en saison de culture dans la région de Bamako.", campaign: "CAMP-002" },
  { id: "IMG-003", name: "Clinique Abidjan", tags: ["santé", "clinique", "hôpital"], questions: 4, validations: 28, status: "En Revue", statusColor: "bg-yellow-100 text-yellow-700", description: "Entrée d'une clinique de quartier à Abidjan, Côte d'Ivoire.", campaign: "CAMP-001" },
  { id: "IMG-004", name: "École Primaire Ouaga", tags: ["éducation", "école", "enfants"], questions: 2, validations: 51, status: "Active", statusColor: "bg-emerald-100 text-emerald-700", description: "Classe d'école primaire à Ouagadougou, Burkina Faso.", campaign: "CAMP-004" },
  { id: "IMG-005", name: "Transport Commun", tags: ["transport", "bus", "rue"], questions: 3, validations: 19, status: "Active", statusColor: "bg-emerald-100 text-emerald-700", description: "Arrêt de bus et transport en commun dans une rue animée.", campaign: "CAMP-003" },
  { id: "IMG-006", name: "Atelier Artisanat", tags: ["artisanat", "travail", "bois"], questions: 1, validations: 8, status: "Inactive", statusColor: "bg-gray-100 text-gray-600", description: "Artisan travaillant le bois dans un atelier traditionnel.", campaign: "—" },
  { id: "IMG-007", name: "Rizière Casamance", tags: ["agriculture", "riz", "casamance"], questions: 2, validations: 37, status: "Active", statusColor: "bg-emerald-100 text-emerald-700", description: "Rizière en zone humide de Casamance, Sénégal.", campaign: "CAMP-002" },
  { id: "IMG-008", name: "Gare Routière Bamako", tags: ["transport", "gare", "bus"], questions: 3, validations: 24, status: "Active", statusColor: "bg-emerald-100 text-emerald-700", description: "Gare routière principale de Bamako, Mali.", campaign: "CAMP-003" },
  { id: "IMG-009", name: "Pharmacie Dakar", tags: ["santé", "pharmacie", "médicaments"], questions: 4, validations: 42, status: "Active", statusColor: "bg-emerald-100 text-emerald-700", description: "Pharmacie de quartier à Dakar, Sénégal.", campaign: "CAMP-001" },
  { id: "IMG-010", name: "Marché aux Poissons", tags: ["poisson", "marché", "pêche"], questions: 2, validations: 56, status: "Active", statusColor: "bg-emerald-100 text-emerald-700", description: "Marché aux poissons sur la côte sénégalaise.", campaign: "CAMP-006" },
  { id: "IMG-011", name: "Champs Coton", tags: ["agriculture", "coton", "champ"], questions: 1, validations: 15, status: "En Revue", statusColor: "bg-yellow-100 text-yellow-700", description: "Champ de coton dans la zone cotonnière du Mali.", campaign: "CAMP-002" },
  { id: "IMG-012", name: "École Coranique", tags: ["éducation", "école", "coran"], questions: 3, validations: 33, status: "Active", statusColor: "bg-emerald-100 text-emerald-700", description: "École coranique traditionnelle au Sahel.", campaign: "CAMP-004" },
];

export default function ImagesPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<(typeof images)[0] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const totalPages = Math.ceil(images.length / pageSize);
  const paginatedImages = images.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const openConfig = (img: (typeof images)[0]) => {
    setSelectedImage(img);
    setShowConfigModal(true);
  };

  const openDetail = (img: (typeof images)[0]) => {
    setSelectedImage(img);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Gestion des Images</h2>
          <p className="text-sm text-gray-500 mt-1">Téléversez les images de référence pour les campagnes de labellisation</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="gap-2 text-gray-600" onClick={() => setShowAddModal(true)}>
            <Upload className="h-4 w-4" /> Importer en Masse
          </Button>
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2" onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4" /> Ajouter Image
          </Button>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-400 transition-colors cursor-pointer" onClick={() => setShowAddModal(true)}>
        <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
        <p className="text-sm font-medium text-gray-700 mb-1">Glissez-déposez vos images ici</p>
        <p className="text-xs text-gray-500 mb-3">PNG, JPG, WebP — Max 5 MB par image</p>
        <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-300">Parcourir les fichiers</Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input placeholder="Rechercher une image..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>
        <button className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50"><Filter className="h-3.5 w-3.5" /> Statut</button>
        <button className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50"><Filter className="h-3.5 w-3.5" /> Tags</button>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedImages.map((img) => (
          <div key={img.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative cursor-pointer" onClick={() => openDetail(img)}>
              <ImageIcon className="h-12 w-12 text-gray-300" />
              <span className={`absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full ${img.statusColor}`}>{img.status}</span>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-emerald-600">{img.id}</span>
              </div>
              <h4 className="text-sm font-semibold text-gray-800 mb-2">{img.name}</h4>
              <div className="flex flex-wrap gap-1 mb-3">
                {img.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 flex items-center gap-0.5">
                    <Tag className="h-2.5 w-2.5" />{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {img.questions} questions</span>
                <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {img.validations} validations</span>
              </div>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                <button className="flex-1 text-xs font-medium text-emerald-600 border border-emerald-200 rounded-lg py-1.5 hover:bg-emerald-50" onClick={() => openConfig(img)}>Configurer</button>
                <button className="p-1.5 rounded-lg hover:bg-gray-100" onClick={() => openDetail(img)}><Eye className="h-4 w-4 text-gray-400" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="bg-white border border-gray-200 rounded-xl px-4">
        <DataTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={images.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
          pageSizeOptions={[3, 6, 9, 12]}
          label="images"
        />
      </div>

      {/* Modal: Ajouter Image */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Ajouter une Image</DialogTitle>
            <DialogDescription>Téléversez une image de référence pour la labellisation</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-emerald-400 transition-colors">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700 mb-1">Sélectionnez une image</p>
              <p className="text-xs text-gray-500">PNG, JPG, WebP — Max 5 MB</p>
              <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-300 mt-3">Parcourir</Button>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Nom de l&apos;Image</label>
              <input placeholder="Ex: Marché Dakar" className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Description</label>
              <textarea rows={2} placeholder="Décrivez le contenu de l'image..." className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Langue Cible</label>
                <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option>Wolof</option><option>Bambara</option><option>Dioula</option><option>Pulaar</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Campagne</label>
                <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option>Aucune</option><option>CAMP-001</option><option>CAMP-003</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Tags (séparés par des virgules)</label>
              <input placeholder="marché, commerce, nourriture" className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddModal(false)}>Annuler</Button>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white" onClick={() => setShowAddModal(false)}>Téléverser</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Configurer Image */}
      <Dialog open={showConfigModal} onOpenChange={setShowConfigModal}>
        <DialogContent className="sm:max-w-lg">
          {selectedImage && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <Settings2 className="h-5 w-5 text-emerald-600" />
                  <DialogTitle>Configurer — {selectedImage.name}</DialogTitle>
                </div>
                <DialogDescription>Définissez les questions de labellisation pour cette image</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Image</p>
                  <div className="flex items-center gap-3">
                    <div className="h-16 w-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{selectedImage.name}</p>
                      <p className="text-[10px] text-gray-500">{selectedImage.id} · {selectedImage.validations} validations</p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Questions de Labellisation</label>
                  {["Décrivez ce que vous voyez dans cette image", "Combien de personnes sont présentes ?", "Quels objets sont visibles ?"].map((q, i) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-gray-400 font-mono w-5">{i + 1}.</span>
                      <input defaultValue={q} className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-200 mt-1 gap-1">
                    <Plus className="h-3 w-3" /> Ajouter une Question
                  </Button>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Tags Actuels</label>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedImage.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-medium px-2 py-1 rounded-full bg-blue-50 text-blue-600 flex items-center gap-1">
                        <Tag className="h-2.5 w-2.5" /> {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowConfigModal(false)}>Annuler</Button>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white gap-1.5" onClick={() => setShowConfigModal(false)}>
                  <CheckCircle2 className="h-4 w-4" /> Enregistrer
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal: Détails Image */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="sm:max-w-lg">
          {selectedImage && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedImage.name}</DialogTitle>
                <DialogDescription>{selectedImage.id}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                  <ImageIcon className="h-16 w-16 text-gray-300" />
                </div>
                <p className="text-sm text-gray-600">{selectedImage.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-emerald-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-emerald-700">{selectedImage.questions}</p>
                    <p className="text-[10px] text-emerald-600">Questions</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-blue-700">{selectedImage.validations}</p>
                    <p className="text-[10px] text-blue-600">Validations</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedImage.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-medium px-2 py-1 rounded-full bg-blue-50 text-blue-600 flex items-center gap-1">
                      <Tag className="h-2.5 w-2.5" /> {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
                  <span className="text-gray-500">Statut : <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${selectedImage.statusColor}`}>{selectedImage.status}</span></span>
                  <span className="text-gray-500">Campagne : <strong className="text-emerald-600">{selectedImage.campaign}</strong></span>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="gap-1.5" onClick={() => setShowDetailModal(false)}>
                  <Pencil className="h-3.5 w-3.5" /> Modifier
                </Button>
                <Button className="bg-red-500 hover:bg-red-600 text-white gap-1.5" onClick={() => setShowDetailModal(false)}>
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
