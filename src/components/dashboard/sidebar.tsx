"use client";

import NextImage from "next/image";
import {
  LayoutDashboard,
  Megaphone,
  FileText,
  Image,
  ShieldCheck,
  ThumbsUp,
  Gift,
  Wallet,
  Download,
  Settings,
  HelpCircle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigation, type PageKey } from "@/lib/navigation";

const navItems: { icon: typeof LayoutDashboard; label: string; key: PageKey }[] = [
  { icon: LayoutDashboard, label: "Tableau de Bord", key: "dashboard" },
  { icon: Megaphone, label: "Campagnes", key: "campagnes" },
  { icon: FileText, label: "Phrases Sources", key: "phrases" },
  { icon: Image, label: "Images", key: "images" },
  { icon: ShieldCheck, label: "Modération", key: "moderation" },
  { icon: ThumbsUp, label: "Consensus", key: "consensus" },
  { icon: Gift, label: "Récompenses", key: "recompenses" },
  { icon: Wallet, label: "Paiements", key: "paiements" },
  { icon: Download, label: "Export Corpus", key: "export" },
  { icon: Settings, label: "Paramètres", key: "parametres" },
];

export function Sidebar() {
  const { activePage, setActivePage, sidebarOpen, setSidebarOpen } =
    useNavigation();

  const navContent = (
    <>
      {/* Logo */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <NextImage
            src="/brand/lambdata.png"
            alt="Lambdata"
            width={120}
            height={48}
            className="h-8 w-auto object-contain object-left"
            priority
          />
        </div>
        {/* Close button - mobile only */}
        <button
          className="lg:hidden p-1 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-3 overflow-y-auto">
        <div className="space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActivePage(item.key)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                activePage === item.key
                  ? "bg-emerald-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Help Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-3.5">
          <div className="flex items-center gap-2 mb-1">
            <HelpCircle className="h-4 w-4 text-gray-700" />
            <span className="text-sm font-semibold text-gray-800">
              Besoin d&apos;aide ?
            </span>
          </div>
          <p className="text-xs text-gray-500 mb-3">
            Consultez la documentation ou contactez le support.
          </p>
          <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs h-8">
            Centre d&apos;Aide
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar - drawer from left */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-60 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out lg:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {navContent}
      </aside>

      {/* Desktop sidebar - always visible */}
      <aside className="hidden lg:flex w-60 min-w-60 bg-white border-r border-gray-200 flex-col h-full">
        {navContent}
      </aside>
    </>
  );
}
