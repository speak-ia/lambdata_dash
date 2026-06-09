"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Globe,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

type View = "login" | "forgot-password" | "reset-sent" | "reset-password" | "reset-success";

export function LoginPage() {
  const { login } = useAuth();
  const [view, setView] = useState<View>("login");

  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  // Reset password state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Veuillez entrer votre adresse email");
      return;
    }
    if (!password.trim()) {
      setError("Veuillez entrer votre mot de passe");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const success = login(email, password);
    if (!success) {
      setError("Identifiants incorrects. Veuillez réessayer.");
    }
    setIsLoading(false);
  };

  // Forgot password handler
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError("");

    if (!forgotEmail.trim()) {
      setForgotError("Veuillez entrer votre adresse email");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      setForgotError("Veuillez entrer une adresse email valide");
      return;
    }

    setForgotLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setForgotLoading(false);
    setView("reset-sent");
  };

  // Reset password handler
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError("");

    if (!newPassword.trim()) {
      setResetError("Veuillez entrer un nouveau mot de passe");
      return;
    }
    if (newPassword.length < 8) {
      setResetError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetError("Les mots de passe ne correspondent pas");
      return;
    }

    setResetLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setResetLoading(false);
    setView("reset-success");
  };

  // Shared background
  const background = (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-100 rounded-full opacity-40 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-200 rounded-full opacity-30 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-50 rounded-full opacity-20 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );

  const footer = (
    <div className="px-8 py-4 bg-gray-50/50 border-t border-gray-100 text-center">
      <p className="text-[11px] text-gray-400">
        © 2026 Lambdata. Plateforme de données linguistiques pour l&apos;IA.
      </p>
    </div>
  );

  const bottomInfo = (
    <div className="mt-6 text-center">
      <div className="inline-flex items-center gap-1.5 text-xs text-gray-400">
        <Globe className="h-3.5 w-3.5" />
        <span>Wolof · Bambara · Dioula · Pulaar · Soninké · Malinké</span>
      </div>
    </div>
  );

  // ==================== LOGIN VIEW ====================
  if (view === "login") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-emerald-50/30 to-gray-100 relative overflow-hidden">
        {background}
        <div className="relative z-10 w-full max-w-md mx-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-200/60 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600" />
            <div className="px-8 pt-8 pb-8">
              {/* Logo & Title */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <Image
                    src="/brand/lambdata.png"
                    alt="Lambdata"
                    width={180}
                    height={72}
                    className="h-12 w-auto object-contain"
                    priority
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1.5">
                  Plateforme de collecte de données linguistiques africaines
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                    Adresse Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                      placeholder="admin@lambdata.com"
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-gray-400"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                    Mot de Passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError(""); }}
                      placeholder="Entrez votre mot de passe"
                      className="w-full pl-10 pr-11 py-2.5 text-sm border border-gray-200 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-gray-400"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-3.5 w-3.5 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                    />
                    <span className="text-xs text-gray-500">Se souvenir de moi</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => { setForgotEmail(email); setForgotError(""); setView("forgot-password"); }}
                    className="text-xs text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-red-500 rounded-full flex-shrink-0" />
                    <span className="text-xs text-red-700 font-medium">{error}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white h-11 rounded-xl font-medium text-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed gap-2"
                >
                  {isLoading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Connexion en cours...</>
                  ) : (
                    <><span>Se Connecter</span><ArrowRight className="h-4 w-4" /></>
                  )}
                </Button>
              </form>

              {/* Separator */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-gray-400">ou continuer avec</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="flex items-center justify-center gap-2 h-10 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Google
                </button>
                <button type="button" className="flex items-center justify-center gap-2 h-10 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </button>
              </div>
            </div>
            {footer}
          </div>
          {bottomInfo}
        </div>
      </div>
    );
  }

  // ==================== FORGOT PASSWORD VIEW ====================
  if (view === "forgot-password") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-emerald-50/30 to-gray-100 relative overflow-hidden">
        {background}
        <div className="relative z-10 w-full max-w-md mx-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-200/60 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600" />
            <div className="px-8 pt-8 pb-8">
              {/* Logo & Title */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-500 rounded-xl shadow-lg shadow-emerald-200 mb-4">
                  <KeyRound className="h-7 w-7 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Mot de passe oublié</h1>
                <p className="text-sm text-gray-500 mt-1.5">
                  Entrez votre email pour recevoir un lien de réinitialisation
                </p>
              </div>

              {/* Info box */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-emerald-800">Réinitialisation sécurisée</p>
                    <p className="text-[11px] text-emerald-600 mt-0.5">
                      Un email avec un lien de réinitialisation sera envoyé à votre adresse. Le lien est valable 24 heures.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                    Adresse Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => { setForgotEmail(e.target.value); setForgotError(""); }}
                      placeholder="votre@email.com"
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-gray-400"
                      autoComplete="email"
                      autoFocus
                    />
                  </div>
                </div>

                {forgotError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-red-500 rounded-full flex-shrink-0" />
                    <span className="text-xs text-red-700 font-medium">{forgotError}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white h-11 rounded-xl font-medium text-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed gap-2"
                >
                  {forgotLoading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Envoi en cours...</>
                  ) : (
                    <><span>Envoyer le lien</span><ArrowRight className="h-4 w-4" /></>
                  )}
                </Button>
              </form>

              {/* Back to login */}
              <button
                type="button"
                onClick={() => { setView("login"); setForgotError(""); }}
                className="w-full flex items-center justify-center gap-2 mt-5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour à la connexion
              </button>
            </div>
            {footer}
          </div>
          {bottomInfo}
        </div>
      </div>
    );
  }

  // ==================== RESET SENT VIEW ====================
  if (view === "reset-sent") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-emerald-50/30 to-gray-100 relative overflow-hidden">
        {background}
        <div className="relative z-10 w-full max-w-md mx-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-200/60 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600" />
            <div className="px-8 pt-8 pb-8">
              {/* Success icon */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Email envoyé !</h1>
                <p className="text-sm text-gray-500 mt-1.5">
                  Vérifiez votre boîte de réception
                </p>
              </div>

              {/* Details */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Email envoyé à</p>
                    <p className="text-sm font-medium text-gray-800">{forgotEmail}</p>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0" />
                    <p className="text-xs text-gray-500">
                      Le lien de réinitialisation est valable pendant <strong className="text-gray-700">24 heures</strong>. 
                      Vérifiez également vos spams.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  onClick={() => { setView("reset-password"); setResetError(""); }}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white h-11 rounded-xl font-medium text-sm transition-all gap-2"
                >
                  <span>J&apos;ai le code — Réinitialiser</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <button
                  type="button"
                  onClick={() => { setForgotLoading(false); setView("forgot-password"); }}
                  className="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors py-2"
                >
                  Renvoyer l&apos;email
                </button>
              </div>

              {/* Back to login */}
              <button
                type="button"
                onClick={() => { setView("login"); setError(""); }}
                className="w-full flex items-center justify-center gap-2 mt-5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour à la connexion
              </button>
            </div>
            {footer}
          </div>
          {bottomInfo}
        </div>
      </div>
    );
  }

  // ==================== RESET PASSWORD VIEW ====================
  if (view === "reset-password") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-emerald-50/30 to-gray-100 relative overflow-hidden">
        {background}
        <div className="relative z-10 w-full max-w-md mx-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-200/60 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600" />
            <div className="px-8 pt-8 pb-8">
              {/* Title */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-500 rounded-xl shadow-lg shadow-emerald-200 mb-4">
                  <Lock className="h-7 w-7 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Nouveau mot de passe</h1>
                <p className="text-sm text-gray-500 mt-1.5">
                  Définissez un nouveau mot de passe sécurisé
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleResetPassword} className="space-y-4">
                {/* New password */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                    Nouveau mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => { setNewPassword(e.target.value); setResetError(""); }}
                      placeholder="Minimum 8 caractères"
                      className="w-full pl-10 pr-11 py-2.5 text-sm border border-gray-200 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-gray-400"
                      autoComplete="new-password"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Password strength indicator */}
                {newPassword.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4].map((level) => {
                        const strength = newPassword.length < 6 ? 1 : newPassword.length < 8 ? 2 : /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword) ? 4 : 3;
                        return (
                          <div
                            key={level}
                            className={`h-1.5 flex-1 rounded-full transition-colors ${
                              level <= strength
                                ? strength <= 1 ? "bg-red-500"
                                : strength <= 2 ? "bg-amber-500"
                                : strength <= 3 ? "bg-emerald-400"
                                : "bg-emerald-500"
                                : "bg-gray-200"
                            }`}
                          />
                        );
                      })}
                    </div>
                    <p className={`text-[11px] font-medium ${
                      newPassword.length < 6 ? "text-red-500"
                      : newPassword.length < 8 ? "text-amber-600"
                      : /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword) ? "text-emerald-600"
                      : "text-emerald-500"
                    }`}>
                      {newPassword.length < 6 ? "⚠ Faible" : newPassword.length < 8 ? "◐ Moyen" : /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword) ? "✓ Très fort" : "✓ Fort"}
                    </p>
                  </div>
                )}

                {/* Confirm password */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value); setResetError(""); }}
                      placeholder="Retapez le mot de passe"
                      className={`w-full pl-10 pr-11 py-2.5 text-sm border rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-gray-400 ${
                        confirmPassword.length > 0 && newPassword !== confirmPassword
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-200"
                      }`}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {confirmPassword.length > 0 && newPassword !== confirmPassword && (
                    <p className="text-[11px] text-red-500 mt-1">Les mots de passe ne correspondent pas</p>
                  )}
                </div>

                {/* Requirements */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                  <p className="text-[11px] font-semibold text-gray-600 mb-2">Exigences du mot de passe :</p>
                  <div className="space-y-1.5">
                    {[
                      { label: "Au moins 8 caractères", met: newPassword.length >= 8 },
                      { label: "Une lettre majuscule", met: /[A-Z]/.test(newPassword) },
                      { label: "Un chiffre", met: /[0-9]/.test(newPassword) },
                      { label: "Un caractère spécial", met: /[^A-Za-z0-9]/.test(newPassword) },
                    ].map((req) => (
                      <div key={req.label} className="flex items-center gap-2">
                        <div className={`h-1.5 w-1.5 rounded-full ${req.met ? "bg-emerald-500" : "bg-gray-300"}`} />
                        <span className={`text-[11px] ${req.met ? "text-emerald-600 font-medium" : "text-gray-400"}`}>
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {resetError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-red-500 rounded-full flex-shrink-0" />
                    <span className="text-xs text-red-700 font-medium">{resetError}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={resetLoading}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white h-11 rounded-xl font-medium text-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed gap-2"
                >
                  {resetLoading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Réinitialisation...</>
                  ) : (
                    <><span>Réinitialiser le mot de passe</span><ArrowRight className="h-4 w-4" /></>
                  )}
                </Button>
              </form>

              {/* Back */}
              <button
                type="button"
                onClick={() => { setView("reset-sent"); }}
                className="w-full flex items-center justify-center gap-2 mt-5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </button>
            </div>
            {footer}
          </div>
          {bottomInfo}
        </div>
      </div>
    );
  }

  // ==================== RESET SUCCESS VIEW ====================
  if (view === "reset-success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-emerald-50/30 to-gray-100 relative overflow-hidden">
        {background}
        <div className="relative z-10 w-full max-w-md mx-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-200/60 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600" />
            <div className="px-8 pt-8 pb-8">
              {/* Success icon */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-5">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Mot de passe mis à jour !</h1>
                <p className="text-sm text-gray-500 mt-1.5">
                  Votre mot de passe a été réinitialisé avec succès
                </p>
              </div>

              {/* Info */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-emerald-800">Sécurité renforcée</p>
                    <p className="text-[11px] text-emerald-600 mt-0.5">
                      Votre nouveau mot de passe est actif. Vous pouvez maintenant vous connecter avec vos nouveaux identifiants.
                    </p>
                  </div>
                </div>
              </div>

              {/* Login button */}
              <Button
                onClick={() => {
                  setView("login");
                  setPassword("");
                  setError("");
                  setNewPassword("");
                  setConfirmPassword("");
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white h-11 rounded-xl font-medium text-sm transition-all gap-2"
              >
                <span>Se connecter maintenant</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            {footer}
          </div>
          {bottomInfo}
        </div>
      </div>
    );
  }

  return null;
}
