"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  Globe,
  Bell,
  ShieldCheck,
  Database,
  Mail,
  Save,
  User,
  Lock,
  CheckCircle2,
  Users,
  Trash2,
  Plus,
  Loader2,
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
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth";

const SETTINGS_KEY = "lambdata_settings";

const defaults = {
  platformName: "Lambdata", language: "Français", timezone: "Africa/Dakar (GMT+0)", currency: "XOF (Franc CFA)",
  notifPayments: true, notifFlagged: true, notifExport: true, notifWeekly: false,
  consensus: "0.70", qualityScore: "0.60", minReviews: "3", flagLimit: "2",
  adminName: "Mody Barry", adminEmail: "modybarry50@gmail.com",
  supportEmail: "support@lambdata.ai", discord: "discord.gg/lambdata",
};

export default function ParametresPage() {
  const { user } = useAuth();
  const [settings, setSettings] = useState(defaults);
  const [saved, setSaved] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [pwdError, setPwdError] = useState("");

  // Admin management state
  const [admins, setAdmins] = useState<any[]>([]);
  const [adminsLoading, setAdminsLoading] = useState(true);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminName, setNewAdminName] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminSuccess, setAdminSuccess] = useState("");
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);

  const fetchAdmins = () => {
    setAdminsLoading(true);
    fetch("/api/admins")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setAdmins(json.admins);
        }
        setAdminsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setAdminsLoading(false);
      });
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      const userDefaults = {
        ...defaults,
        adminName: user?.name || defaults.adminName,
        adminEmail: user?.email || defaults.adminEmail,
      };
      if (stored) {
        setSettings({ ...userDefaults, ...JSON.parse(stored) });
      } else {
        setSettings(userDefaults);
      }
    } catch { /* ignore */ }
    fetchAdmins();
  }, [user]);

  const set = (key: keyof typeof defaults, value: string | boolean) =>
    setSettings((s) => ({ ...s, [key]: value }));

  const handleSave = () => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    setShowSaveModal(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePasswordChange = () => {
    if (!pwd.current) { setPwdError("Mot de passe actuel requis"); return; }
    if (pwd.next.length < 8 || !/[A-Z]/.test(pwd.next) || !/[0-9]/.test(pwd.next)) {
      setPwdError("8 caractères min, 1 majuscule, 1 chiffre"); return;
    }
    if (pwd.next !== pwd.confirm) { setPwdError("Les mots de passe ne correspondent pas"); return; }
    setPwdError("");
    setShowPasswordModal(false);
    setPwd({ current: "", next: "", confirm: "" });
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError("");
    setAdminSuccess("");

    if (!newAdminEmail.trim()) {
      setAdminError("L'adresse email est requise");
      return;
    }

    setIsAddingAdmin(true);
    try {
      const res = await fetch("/api/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newAdminEmail.trim(), name: newAdminName.trim() }),
      });
      const json = await res.json();
      if (json.success) {
        setAdminSuccess("Administrateur ajouté avec succès");
        setNewAdminEmail("");
        setNewAdminName("");
        fetchAdmins();
      } else {
        setAdminError(json.error || "Une erreur est survenue");
      }
    } catch (err) {
      console.error(err);
      setAdminError("Impossible de se connecter au serveur");
    } finally {
      setIsAddingAdmin(false);
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    setAdminError("");
    setAdminSuccess("");
    try {
      const res = await fetch(`/api/admins?id=${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setAdminSuccess("Administrateur retiré avec succès");
        fetchAdmins();
      } else {
        setAdminError(json.error || "Une erreur est survenue");
      }
    } catch (err) {
      console.error(err);
      setAdminError("Impossible de se connecter au serveur");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <Settings className="h-6 w-6 text-emerald-600" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Paramètres</h2>
            <p className="text-sm text-gray-500 mt-1">Configurez les préférences de la plateforme</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="gap-2 text-gray-600" onClick={() => setShowPasswordModal(true)}>
            <Lock className="h-4 w-4" /> Changer le Mot de Passe
          </Button>
          <Button className={`gap-2 text-white ${saved ? "bg-emerald-700" : "bg-emerald-500 hover:bg-emerald-600"}`} onClick={() => setShowSaveModal(true)}>
            <Save className="h-4 w-4" /> {saved ? "Enregistré ✓" : "Enregistrer"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - General */}
        <div className="lg:col-span-2 space-y-6">
          {/* General */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-4 w-4 text-emerald-600" />
              <h3 className="text-base font-semibold text-gray-800">Général</h3>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Nom de la Plateforme</label>
                  <input value={settings.platformName} onChange={(e) => set("platformName", e.target.value)} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Langue par Défaut</label>
                  <select value={settings.language} onChange={(e) => set("language", e.target.value)} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>Français</option><option>English</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Fuseau Horaire</label>
                  <select value={settings.timezone} onChange={(e) => set("timezone", e.target.value)} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>Africa/Dakar (GMT+0)</option><option>Africa/Bamako (GMT+0)</option><option>Africa/Abidjan (GMT+0)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Devise</label>
                  <input value={settings.currency} onChange={(e) => set("currency", e.target.value)} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-4 w-4 text-emerald-600" />
              <h3 className="text-base font-semibold text-gray-800">Notifications</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: "Nouvelles demandes de paiement", desc: "Recevoir une alerte quand un contributeur demande un retrait", key: "notifPayments" as const },
                { label: "Contributions signalées", desc: "Notification lorsqu'une contribution est marquée comme signalée", key: "notifFlagged" as const },
                { label: "Export terminé", desc: "Alerter quand un export de corpus est prêt", key: "notifExport" as const },
                { label: "Rapport hebdomadaire", desc: "Recevoir un récapitulatif chaque lundi", key: "notifWeekly" as const },
              ].map((n) => (
                <div key={n.key} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{n.label}</p>
                    <p className="text-xs text-gray-500">{n.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={settings[n.key] as boolean} onChange={(e) => set(n.key, e.target.checked)} className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <h3 className="text-base font-semibold text-gray-800">Sécurité & Modération</h3>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Seuil de Consensus</label>
                  <input value={settings.consensus} onChange={(e) => set("consensus", e.target.value)} type="number" step="0.05" className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  <p className="text-[10px] text-gray-400 mt-1">Pourcentage minimum de votes positifs pour valider</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Score Qualité Minimum</label>
                  <input value={settings.qualityScore} onChange={(e) => set("qualityScore", e.target.value)} type="number" step="0.05" className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  <p className="text-[10px] text-gray-400 mt-1">Score en dessous duquel une contribution est signalée</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Nombre Minimum de Reviews</label>
                  <input value={settings.minReviews} onChange={(e) => set("minReviews", e.target.value)} type="number" className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  <p className="text-[10px] text-gray-400 mt-1">Reviews communautaires avant décision</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Limite de Signalement</label>
                  <input value={settings.flagLimit} onChange={(e) => set("flagLimit", e.target.value)} type="number" className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  <p className="text-[10px] text-gray-400 mt-1">Signalements avant flag automatique</p>
                </div>
              </div>
            </div>
          </div>

          {/* Gestion des Administrateurs */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-4 w-4 text-emerald-600" />
              <h3 className="text-base font-semibold text-gray-800">Gestion des Administrateurs</h3>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Ajoutez ou supprimez des adresses emails autorisées à se connecter au dashboard d'administration.
            </p>

            {adminError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-600 mb-4">
                {adminError}
              </div>
            )}
            {adminSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-600 mb-4">
                {adminSuccess}
              </div>
            )}

            {/* Formulaire d'ajout */}
            <form onSubmit={handleAddAdmin} className="space-y-4 mb-6 bg-gray-50 border border-gray-150 rounded-lg p-4">
              <div className="text-xs font-semibold text-gray-700 mb-2">Ajouter un nouvel administrateur</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-semibold text-gray-500 uppercase block mb-1">Nom Complet</label>
                  <input
                    type="text"
                    placeholder="Ex: Mohamed Traoré"
                    value={newAdminName}
                    onChange={(e) => setNewAdminName(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    disabled={isAddingAdmin}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-gray-500 uppercase block mb-1">Adresse Email</label>
                  <input
                    type="email"
                    placeholder="Ex: admin@lambdata.ai"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                    disabled={isAddingAdmin}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-3">
                <Button
                  type="submit"
                  disabled={isAddingAdmin}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs gap-1.5 px-3 py-1.5 h-8"
                >
                  {isAddingAdmin ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Ajout...
                    </>
                  ) : (
                    <>
                      <Plus className="h-3.5 w-3.5" />
                      Ajouter l'administrateur
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Liste des administrateurs */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-gray-700">Administrateurs Autorisés</div>
              
              {adminsLoading ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
                </div>
              ) : admins.length === 0 ? (
                <div className="text-center py-4 text-xs text-gray-500 border border-dashed border-gray-200 rounded-lg">
                  Aucun administrateur configuré.
                </div>
              ) : (
                <div className="border border-gray-200 rounded-lg divide-y divide-gray-150 overflow-hidden">
                  {admins.map((admin) => {
                    const isSelf = admin.email.toLowerCase() === user?.email?.toLowerCase();
                    const initials = (admin.name || "AD")
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2);

                    return (
                      <div key={admin.id} className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-emerald-50 rounded-full flex items-center justify-center text-xs font-bold text-emerald-700">
                            {initials}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-gray-800 flex items-center gap-1.5">
                              {admin.name || "Sans nom"}
                              {isSelf && (
                                <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.5 rounded font-medium">
                                  Vous
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-gray-500">{admin.email}</div>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteAdmin(admin.id)}
                          disabled={isSelf}
                          title={isSelf ? "Vous ne pouvez pas supprimer votre propre compte" : "Retirer cet administrateur"}
                          className={`h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg ${isSelf ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Profile */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-4 w-4 text-emerald-600" />
              <h3 className="text-base font-semibold text-gray-800">Profil Admin</h3>
            </div>
             <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold">
                {user?.avatar || "AD"}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{user?.name || "Administrateur"}</p>
                <p className="text-xs text-gray-500">{user?.email || "admin@lambdata.ai"}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Nom Complet</label>
                <input value={settings.adminName} onChange={(e) => set("adminName", e.target.value)} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Email</label>
                <input value={settings.adminEmail} onChange={(e) => set("adminEmail", e.target.value)} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
            </div>
          </div>

          {/* Data */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Database className="h-4 w-4 text-emerald-600" />
              <h3 className="text-base font-semibold text-gray-800">Données</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total Contributions</span>
                <span className="font-semibold text-gray-800">45,832</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Stockage Utilisé</span>
                <span className="font-semibold text-gray-800">12.4 GB</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Dernière Sauvegarde</span>
                <span className="font-medium text-emerald-600">Mai 15, 03:00</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: "62%" }} />
              </div>
              <p className="text-[10px] text-gray-400">62% du stockage utilisé</p>
              <Button variant="outline" size="sm" className="w-full text-xs mt-2 gap-1.5">
                <Database className="h-3.5 w-3.5" /> Sauvegarder Maintenant
              </Button>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-4 w-4 text-emerald-600" />
              <h3 className="text-base font-semibold text-gray-800">Contact Support</h3>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Email</label>
                <input value={settings.supportEmail} onChange={(e) => set("supportEmail", e.target.value)} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Serveur Discord</label>
                <input value={settings.discord} onChange={(e) => set("discord", e.target.value)} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
            </div>
          </div>

          {/* Save */}
          <Button className={`w-full gap-2 text-white ${saved ? "bg-emerald-700" : "bg-emerald-500 hover:bg-emerald-600"}`} onClick={() => setShowSaveModal(true)}>
            <Save className="h-4 w-4" /> {saved ? "Enregistré ✓" : "Enregistrer les Modifications"}
          </Button>
        </div>
      </div>

      {/* Modal: Confirmation Sauvegarde */}
      <Dialog open={showSaveModal} onOpenChange={setShowSaveModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <DialogTitle>Confirmer les Modifications</DialogTitle>
            </div>
            <DialogDescription>Voulez-vous enregistrer ces changements ?</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
              <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-emerald-800">Les paramètres suivants seront mis à jour :</p>
              <ul className="text-xs text-emerald-600 mt-2 space-y-1 text-left max-w-xs mx-auto">
                <li>• Paramètres généraux (nom, langue, fuseau)</li>
                <li>• Préférences de notification</li>
                <li>• Seuils de sécurité et modération</li>
                <li>• Informations de contact</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveModal(false)}>Annuler</Button>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white gap-1.5" onClick={handleSave}>
              <Save className="h-4 w-4" /> Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Changer Mot de Passe */}
      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-emerald-600" />
              <DialogTitle>Changer le Mot de Passe</DialogTitle>
            </div>
            <DialogDescription>Mettez à jour votre mot de passe administrateur</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Mot de Passe Actuel</label>
              <input type="password" placeholder="••••••••" value={pwd.current} onChange={(e) => setPwd(p => ({ ...p, current: e.target.value }))} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Nouveau Mot de Passe</label>
              <input type="password" placeholder="••••••••" value={pwd.next} onChange={(e) => setPwd(p => ({ ...p, next: e.target.value }))} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              <p className="text-[10px] text-gray-400 mt-1">Minimum 8 caractères, 1 majuscule, 1 chiffre</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Confirmer le Mot de Passe</label>
              <input type="password" placeholder="••••••••" value={pwd.confirm} onChange={(e) => setPwd(p => ({ ...p, confirm: e.target.value }))} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            {pwdError && <p className="text-xs text-red-600 font-medium">{pwdError}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowPasswordModal(false); setPwdError(""); }}>Annuler</Button>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white gap-1.5" onClick={handlePasswordChange}>
              <Lock className="h-4 w-4" /> Mettre à Jour
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
