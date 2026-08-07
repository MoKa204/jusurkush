"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Phone, KeyRound, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ForgotPasswordPage() {
  const { t, language } = useLanguage();
  const router = useRouter();

  const [method, setMethod] = useState<"email" | "phone">("email");
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, method }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send reset code");

      setSuccessMsg(t("codeSentSuccessAlert"));
      setTimeout(() => {
        router.push(`/forgot-password/verify?identifier=${encodeURIComponent(identifier)}`);
      }, 1000);
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
        <h1 className="text-2xl font-bold text-slate-800">{t("forgotPasswordTitle")}</h1>
        <p className="text-xs text-slate-500 mt-1">{t("forgotPasswordSub")}</p>
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

      <form onSubmit={handleRequestCode} className="space-y-5 text-xs">
        {/* Method Selection */}
        <div>
          <label className="block font-semibold text-slate-700 mb-2">{t("resetMethodLabel")}</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMethod("email")}
              className={`py-2.5 px-3 rounded-xl border flex items-center justify-center space-x-2 space-x-reverse font-bold text-xs transition ${
                method === "email"
                  ? "border-emerald-600 bg-emerald-50 text-emerald-800 shadow-xs"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>{t("viaEmail")}</span>
            </button>

            <button
              type="button"
              onClick={() => setMethod("phone")}
              className={`py-2.5 px-3 rounded-xl border flex items-center justify-center space-x-2 space-x-reverse font-bold text-xs transition ${
                method === "phone"
                  ? "border-emerald-600 bg-emerald-50 text-emerald-800 shadow-xs"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>{t("viaPhone")}</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            {method === "email" ? t("enterResetEmail") : t("enterResetPhone")}
          </label>
          <div className="relative">
            <input
              type={method === "email" ? "email" : "text"}
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full pl-3 pr-9 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600"
              placeholder={
                method === "email"
                  ? "user@example.com"
                  : language === "ar"
                  ? "+249 912345678"
                  : "+1234567890"
              }
            />
            {method === "email" ? (
              <Mail className="w-4 h-4 text-slate-400 absolute right-3 ltr:left-3 ltr:right-auto top-3" />
            ) : (
              <Phone className="w-4 h-4 text-slate-400 absolute right-3 ltr:left-3 ltr:right-auto top-3" />
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !identifier}
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition disabled:opacity-50 shadow text-xs"
        >
          {loading ? t("sendingCode") : t("sendResetCodeBtn")}
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
