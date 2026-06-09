import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  type User,
} from "firebase/auth";
import { getFirebaseApp } from "./config";

function getAuthInstance() {
  const app = getFirebaseApp();
  if (!app) {
    throw new Error(
      "Firebase n'est pas configuré. Vérifiez les variables NEXT_PUBLIC_FIREBASE_* dans .env"
    );
  }
  return getAuth(app);
}

export async function signInWithEmail(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(
    getAuthInstance(),
    email.trim(),
    password
  );
  return credential.user;
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  const credential = await signInWithPopup(getAuthInstance(), provider);
  return credential.user;
}

export async function signOutFirebase() {
  const auth = getAuthInstance();
  await signOut(auth);
}

export { getAuthInstance as getClientAuth };
