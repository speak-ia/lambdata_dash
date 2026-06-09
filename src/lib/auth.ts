import { create } from "zustand";
import { signInWithEmail, signOutFirebase } from "./firebase/auth";

interface AuthState {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    role: string;
    avatar: string;
  } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email: string, password: string) => {
    try {
      const whitelist = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
        .split(",")
        .map((e) => e.trim().toLowerCase());

      if (!whitelist.includes(email.trim().toLowerCase())) {
        console.warn("Utilisateur non autorisé (non-admin).");
        return false;
      }

      const firebaseUser = await signInWithEmail(email, password);
      
      set({
        isAuthenticated: true,
        user: {
          name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Administrateur",
          email: firebaseUser.email || email,
          role: "Admin Principal",
          avatar: (
            firebaseUser.displayName?.split(" ").map(w => w[0]).join("") ||
            firebaseUser.email?.slice(0, 2) ||
            "AD"
          ).toUpperCase(),
        },
      });
      return true;
    } catch (error) {
      console.error("Erreur Firebase Login:", error);
      return false;
    }
  },
  logout: async () => {
    try {
      await signOutFirebase();
    } catch (e) {
      console.error(e);
    }
    set({ isAuthenticated: false, user: null });
  },
}));
