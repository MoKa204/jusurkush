"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function LoginPage() {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { refetchUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      await refetchUser();
      router.push("/");
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
          <LogIn className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">{t("welcomeBack")}</h1>
        <p className="text-xs text-slate-500 mt-1">{t("loginSub")}</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs flex items-center space-x-2 space-x-reverse">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">{t("emailAddress")}</label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-3 pr-9 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
              placeholder="user@example.com"
            />
            <Mail className="w-4 h-4 text-slate-400 absolute right-3 ltr:left-3 ltr:right-auto top-2.5" />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">{t("password")}</label>
          <div className="relative">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-3 pr-9 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
              placeholder="••••••••"
            />
            <Lock className="w-4 h-4 text-slate-400 absolute right-3 ltr:left-3 ltr:right-auto top-2.5" />
          </div>
          <div className="flex justify-end pt-1.5">
            <Link
              href="/forgot-password"
              className="text-xs text-emerald-700 hover:text-emerald-800 font-extrabold hover:underline inline-flex items-center space-x-1 space-x-reverse"
            >
              <span>🔑 {t("forgotPasswordLink")}</span>
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition disabled:opacity-50 shadow"
        >
          {loading
            ? language === "ar" ? "جاري تسجيل الدخول..." : "Authenticating..."
            : t("login")}
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs space-y-3">
        <p className="text-slate-600">
          {t("newToJusurKush")}{" "}
          <Link href="/register" className="text-emerald-700 font-bold hover:underline">
            {t("signUp")}
          </Link>
        </p>
        <p className="text-slate-600">
          {t("wantToSell")}{" "}
          <Link href="/register-seller" className="text-emerald-700 font-bold hover:underline">
            {t("startSelling")}
          </Link>
        </p>
      </div>
    </div>
  );
}
