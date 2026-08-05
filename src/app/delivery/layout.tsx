"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Truck, AlertTriangle, ShieldCheck } from "lucide-react";

export default function DeliveryLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const { language } = useLanguage();

  if (loading) {
    return (
      <div className="p-8 text-center text-xs text-slate-500">
        Authenticating delivery officer session...
      </div>
    );
  }

  // Security & Access Isolation: Only DELIVERY_OFFICER or ADMIN can access
  if (!user || (user.role !== "DELIVERY_OFFICER" && user.role !== "ADMIN")) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">
          {language === "ar" ? "وصول مسؤول التوصيل مقيد" : "Delivery Officer Portal Access Restricted"}
        </h2>
        <p className="text-xs text-slate-500">
          {language === "ar"
            ? "هذه اللوحة خاصة بضباط ومناديب التوصيل المعتمدين فقط."
            : "This portal is strictly restricted to authorized delivery officers."}
        </p>
        <Link href="/" className="inline-block px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold">
          {language === "ar" ? "العودة للرئيسية" : "Back to Home"}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Delivery Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-4 rounded-2xl shadow-md flex items-center justify-between">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="p-2.5 bg-white/10 rounded-xl border border-white/20">
            <Truck className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <h2 className="font-bold text-base">
              {language === "ar" ? "لوحة ضابط ومندوب التوصيل" : "Delivery Officer Dispatch Dashboard"}
            </h2>
            <p className="text-xs text-emerald-200">
              {language === "ar"
                ? `مرحباً، ${user.name} — متابعة الشحنات وتسليم المنتجات للزبائن`
                : `Welcome, ${user.name} — Manage active package dispatches and doorstep proof`}
            </p>
          </div>
        </div>

        <span className="bg-emerald-400 text-emerald-950 text-[10px] font-black px-2.5 py-1 rounded-md uppercase">
          {user.role}
        </span>
      </div>

      <div>{children}</div>
    </div>
  );
}
