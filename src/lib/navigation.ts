import { create } from "zustand";

export type PageKey =
  | "dashboard"
  | "campagnes"
  | "phrases"
  | "images"
  | "moderation"
  | "consensus"
  | "recompenses"
  | "paiements"
  | "export"
  | "parametres";

interface NavigationState {
  activePage: PageKey;
  setActivePage: (page: PageKey) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export const useNavigation = create<NavigationState>((set) => ({
  activePage: "dashboard",
  setActivePage: (page) => set({ activePage: page, sidebarOpen: false }),
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
}));
