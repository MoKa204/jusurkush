"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheck, AlertCircle, CheckCircle, ArrowLeft, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

function VerifyCodeContent() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  const identifier = searchParams.get("identifier") || "";
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, code }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid verification code");

      setSuccessMsg(language === "ar" ? "تم التثبت من صحة الرمز! جاري التحويل..." : "Code verified! Redirecting...");
      setTimeout(() => {
        router.push(
          `/forgot-password/reset?identifier=${encodeURIComponent(identifier)}&code=${encodeURIComponent(code)}`
        );
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
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">
          {language === "ar" ? "رمز التحقق" : "Verification Code"}
        </h1>
        <p className="text-xs text-slate-500 mt-1">{t("enterCodeSub")}</p>
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

      <form onSubmit={handleVerifyCode} className="space-y-5 text-xs">
        {identifier && (
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-xs flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse font-semibold truncate">
              <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="truncate">{identifier}</span>
            </div>
            <Link
              href="/forgot-password"
              className="text-emerald-700 underline font-bold text-[11px] hover:text-emerald-800 ml-2"
            >
              {language === "ar" ? "تغيير" : "Change"}
            </Link>
          </div>
        )}

        <div>
          <label className="block font-semibold text-slate-700 mb-1">{t("verificationCodeLabel")}</label>
          <input
            type="text"
            maxLength={6}
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-3 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600 font-mono tracking-widest text-center font-bold text-lg"
            placeholder="123456"
          />
        </div>

        <button
          type="submit"
          disabled={loading || code.length !== 6}
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition disabled:opacity-50 shadow text-xs"
        >
          {loading ? t("verifyingCode") : t("verifyCodeBtn")}
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs">
        <Link href="/forgot-password" className="inline-flex items-center space-x-1.5 space-x-reverse text-slate-600 hover:text-emerald-700 font-bold">
          <ArrowLeft className="w-4 h-4 ltr:rotate-180" />
          <span>{language === "ar" ? "إعادة طلب الرمز" : "Request Code Again"}</span>
        </Link>
      </div>
    </div>
  );
}

export default function VerifyCodePage() {
  return (
    <Suspense fallback={<div className="max-w-md mx-auto my-12 p-8 text-center text-slate-500">Loading...</div>}>
      <VerifyCodeContent />
    </Suspense>
  );
}
