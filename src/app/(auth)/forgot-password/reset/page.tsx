"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, KeyRound, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

function ResetPasswordContent() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  const identifier = searchParams.get("identifier") || "";
  const code = searchParams.get("code") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (newPassword !== confirmPassword) {
      setError(t("passwordsDoNotMatch"));
      return;
    }

    if (newPassword.length < 6) {
      setError(language === "ar" ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل" : "Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier,
          code,
          newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update password");

      setSuccessMsg(t("passwordResetSuccessAlert"));
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
      <div className="text-center mb-6">
        <div className="inline-flex p-3 bg-emerald-100 text-emerald-700 rounded-full mb-3">
          <KeyRound className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">{t("resetPasswordTitle")}</h1>
        <p className="text-xs text-slate-500 mt-1">{t("resetPasswordSub")}</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs flex items-center space-x-2 space-x-reverse">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-xs flex items-center space-x-2 space-x-reverse font-semibold">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleResetPassword} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">{t("newPasswordLabel")}</label>
          <div className="relative">
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full pl-3 pr-9 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600"
              placeholder={t("passPlaceholder")}
            />
            <Lock className="w-4 h-4 text-slate-400 absolute right-3 ltr:left-3 ltr:right-auto top-3" />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">{t("confirmPasswordLabel")}</label>
          <div className="relative">
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-3 pr-9 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600"
              placeholder={t("passPlaceholder")}
            />
            <Lock className="w-4 h-4 text-slate-400 absolute right-3 ltr:left-3 ltr:right-auto top-3" />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !newPassword || !confirmPassword}
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition disabled:opacity-50 shadow text-xs"
        >
          {loading ? t("updatingPassword") : t("resetPasswordSuccessBtn")}
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs">
        <Link href="/login" className="inline-flex items-center space-x-1.5 space-x-reverse text-slate-600 hover:text-emerald-700 font-bold">
          <ArrowLeft className="w-4 h-4 ltr:rotate-180" />
          <span>{t("welcomeBack")} / {t("login")}</span>
        </Link>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="max-w-md mx-auto my-12 p-8 text-center text-slate-500">Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
