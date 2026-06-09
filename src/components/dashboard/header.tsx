"use client";

import { useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Shield,
  HelpCircle,
  Menu,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/lib/navigation";
import { useAuth } from "@/lib/auth";

export function Header() {
  const { setActivePage, toggleSidebar } = useNavigation();
  const { logout } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-3 sm:px-6 py-3 flex items-center justify-between gap-3">
        {/* Left - Hamburger + Title */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Hamburger - mobile only */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
          <div className="min-w-0">
            <h1 className="text-base sm:text-xl font-semibold text-gray-800 truncate">
              Dashboard Administrateur
            </h1>
            <p className="text-[11px] sm:text-[13px] text-gray-500 hidden sm:block">
              Bienvenue, Mody Barry 👋
            </p>
          </div>
        </div>

        {/* Right - Search, Notification, Profile */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          {/* Search - hidden on very small screens, compact on medium */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher campagnes, contributeurs, langues..."
              className="pl-9 w-64 lg:w-80 h-9 text-sm bg-gray-50 border-gray-200"
            />
          </div>

          {/* Mobile search button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Search className="h-5 w-5 text-gray-600" />
          </button>

          {/* Notification */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-emerald-500 rounded-full text-[10px] text-white font-bold flex items-center justify-center">
              5
            </span>
          </button>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1.5 sm:gap-2.5 pl-2 border-l border-gray-200 ml-1 hover:bg-gray-50 rounded-lg px-2 py-1.5 transition-colors">
                <Avatar className="h-8 w-8 sm:h-9 sm:w-9 ring-2 ring-emerald-100">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mody" />
                  <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs font-semibold">
                    MB
                  </AvatarFallback>
                </Avatar>
                <div className="flex-col items-start hidden sm:flex">
                  <span className="text-sm font-medium text-gray-800 leading-tight">
                    Mody Barry
                  </span>
                  <span className="text-[11px] text-emerald-600 font-medium leading-tight flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Admin Principal
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400 hidden sm:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end" forceMount>
              {/* Profile Summary */}
              <DropdownMenuLabel>
                <div className="flex items-center gap-3 py-1">
                  <Avatar className="h-10 w-10 ring-2 ring-emerald-200">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mody" />
                    <AvatarFallback className="bg-emerald-100 text-emerald-700 text-sm font-semibold">
                      MB
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-800">
                      Mody Barry
                    </span>
                    <span className="text-xs text-gray-500">
                      modybarry50@gmail.com
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Status */}
              <div className="px-2 py-1.5">
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                  <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-emerald-700">
                    En ligne — Admin Principal
                  </span>
                </div>
              </div>
              <DropdownMenuSeparator />

              {/* Menu Items */}
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer py-2"
                  onClick={() => setShowProfileModal(true)}
                >
                  <User className="h-4 w-4 text-gray-500" />
                  <span>Mon Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer py-2"
                  onClick={() => setActivePage("parametres")}
                >
                  <Settings className="h-4 w-4 text-gray-500" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer py-2">
                  <HelpCircle className="h-4 w-4 text-gray-500" />
                  <span>Aide & Support</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              {/* Logout */}
              <DropdownMenuItem
                className="cursor-pointer py-2 text-red-600 focus:text-red-600 focus:bg-red-50"
                onClick={() => setShowLogoutModal(true)}
              >
                <LogOut className="h-4 w-4 text-red-500" />
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Modal: Mon Profil */}
      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Mon Profil</DialogTitle>
            <DialogDescription>
              Gérez vos informations personnelles
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5 py-2">
            {/* Avatar & Name */}
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 ring-4 ring-emerald-100">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mody" />
                <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xl font-semibold">
                  MB
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Mody Barry
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <Shield className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-600">
                    Admin Principal
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  Membre depuis Janvier 2024
                </p>
              </div>
            </div>

            {/* Info Fields */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">
                    Prénom
                  </label>
                  <input
                    defaultValue="Amadou"
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">
                    Nom
                  </label>
                  <input
                    defaultValue="Diallo"
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">
                  Email
                </label>
                <input
                  defaultValue="modybarry50@gmail.com"
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">
                  Téléphone
                </label>
                <input
                  defaultValue="+221 77 888 9900"
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <p className="text-[10px] text-gray-400 mt-1">
                  Utilisé pour les notifications Mobile Money
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-emerald-50 rounded-lg p-3 text-center border border-emerald-100">
                <p className="text-lg font-bold text-emerald-700">156</p>
                <p className="text-[10px] text-emerald-600">Actions ce mois</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-100">
                <p className="text-lg font-bold text-blue-700">23</p>
                <p className="text-[10px] text-blue-600">Sessions</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 text-center border border-purple-100">
                <p className="text-lg font-bold text-purple-700">4.8h</p>
                <p className="text-[10px] text-purple-600">Temps moy./jour</p>
              </div>
            </div>

            {/* Permissions */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                Permissions
              </p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Gestion Campagnes",
                  "Modération",
                  "Paiements",
                  "Export",
                  "Configuration",
                  "Utilisateurs",
                ].map((perm) => (
                  <span
                    key={perm}
                    className="text-[10px] font-medium px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"
                  >
                    {perm}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowProfileModal(false)}
            >
              Annuler
            </Button>
            <Button
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
              onClick={() => setShowProfileModal(false)}
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Déconnexion */}
      <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Déconnexion</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir vous déconnecter ?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
              <LogOut className="h-8 w-8 text-amber-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-amber-800">
                Vous serez déconnecté de votre session
              </p>
              <p className="text-xs text-amber-600 mt-1">
                Les modifications non enregistrées seront perdues
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowLogoutModal(false)}
            >
              Annuler
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white gap-1.5"
              onClick={() => {
                setShowLogoutModal(false);
                logout();
              }}
            >
              <LogOut className="h-4 w-4" /> Se Déconnecter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
