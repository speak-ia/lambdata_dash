import { create } from "zustand";
import { signInWithEmail, signInWithGoogle, signOutFirebase } from "./firebase/auth";

interface AuthState {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    role: string;
    avatar: string;
  } | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email: string, password: string) => {
    try {
      const res = await fetch("/api/admins");
      const json = await res.json();
      if (!json.success) return false;
      const whitelist = json.admins.map((a: any) => a.email.toLowerCase());

      if (!whitelist.includes(email.trim().toLowerCase())) {
        console.warn("Utilisateur non autorisé (non-admin).");
        return false;
      }

      const firebaseUser = await signInWithEmail(email, password);

      let dbName = "";
      try {
        const profileRes = await fetch(`/api/profile?email=${encodeURIComponent(firebaseUser.email || email)}`);
        const profileJson = await profileRes.json();
        if (profileJson.success && profileJson.profile) {
          dbName = profileJson.profile.name;
        }
      } catch (e) {
        console.error("Erreur de récupération du profil DB:", e);
      }

      const finalName = dbName || firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Administrateur";
      
      set({
        isAuthenticated: true,
        user: {
          name: finalName,
          email: firebaseUser.email || email,
          role: "Admin Principal",
          avatar: (
            finalName.split(" ").map((w: string) => w[0]).join("") ||
            "AD"
          ).toUpperCase().slice(0, 2),
        },
      });
      return true;
    } catch (error) {
      console.error("Erreur Firebase Login:", error);
      return false;
    }
  },
  loginWithGoogle: async () => {
    try {
      const firebaseUser = await signInWithGoogle();
      const email = firebaseUser.email || "";

      const res = await fetch("/api/admins");
      const json = await res.json();
      if (!json.success) {
        await signOutFirebase();
        return false;
      }
      const whitelist = json.admins.map((a: any) => a.email.toLowerCase());

      if (!email || !whitelist.includes(email.toLowerCase())) {
        console.warn("Utilisateur non autorisé (non-admin) via Google.");
        await signOutFirebase();
        return false;
      }

      let dbName = "";
      try {
        const profileRes = await fetch(`/api/profile?email=${encodeURIComponent(email)}`);
        const profileJson = await profileRes.json();
        if (profileJson.success && profileJson.profile) {
          dbName = profileJson.profile.name;
        }
      } catch (e) {
        console.error("Erreur de récupération du profil DB:", e);
      }

      const finalName = dbName || firebaseUser.displayName || email.split("@")[0] || "Administrateur";

      set({
        isAuthenticated: true,
        user: {
          name: finalName,
          email: email,
          role: "Admin Principal",
          avatar: (
            finalName.split(" ").map((w: string) => w[0]).join("") ||
            "AD"
          ).toUpperCase().slice(0, 2),
        },
      });
      return true;
    } catch (error) {
      console.error("Erreur Firebase Google Login:", error);
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
