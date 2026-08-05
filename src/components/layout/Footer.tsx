"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Truck, Headphones, Store } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 mt-16 border-t border-slate-800">
      {/* Guarantees & Features Banner */}
      <div className="max-w-7xl mx-auto px-4 py-8 border-b border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-right rtl:sm:text-right ltr:sm:text-left">
          <div className="flex items-center space-x-3 space-x-reverse justify-center sm:justify-start">
            <div className="p-3 bg-emerald-950 text-emerald-400 rounded-full border border-emerald-800/40">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-xs">{t("support247Title")}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{t("support247Desc")}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 space-x-reverse justify-center sm:justify-start">
            <div className="p-3 bg-emerald-950 text-emerald-400 rounded-full border border-emerald-800/40">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-xs">{t("buyerProtectionTitle")}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{t("buyerProtectionDesc")}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 space-x-reverse justify-center sm:justify-start">
            <div className="p-3 bg-emerald-950 text-emerald-400 rounded-full border border-emerald-800/40">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-xs">{t("fastShippingTitle")}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{t("fastShippingDesc")}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 space-x-reverse justify-center sm:justify-start">
            <div className="p-3 bg-emerald-950 text-emerald-400 rounded-full border border-emerald-800/40">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-xs">{t("verifiedSellersTitle")}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{t("verifiedSellersDesc")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
        {/* Brand Info */}
        <div className="space-y-3">
          <div className="bg-white text-emerald-700 rounded-xl px-3 py-1 font-black text-2xl tracking-tight inline-block shadow">
            Jusur<span className="text-slate-800">Kush</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            {language === "ar"
              ? "منصة التجارة الإلكترونية متعددة التُجّار والشركات التي تتيح تسوق المنتجات الحقيقية مباشرة من البائعين المستقلين مع تقديم خيارات تمويل الأعمال المباشرة."
              : "Direct Multi-Vendor E-Commerce platform connecting buyers with verified independent merchants and business financing."}
          </p>
        </div>

        {/* For Sellers */}
        <div>
          <h4 className="font-bold text-slate-100 text-sm mb-3 border-b border-slate-800 pb-1.5">
            {t("forSellersTitle")}
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <Link href="/register-seller" className="hover:text-emerald-400 transition">
                {t("startSelling")}
              </Link>
            </li>
            <li>
              <Link href="/seller" className="hover:text-emerald-400 transition">
                {t("sellerEducation")}
              </Link>
            </li>
            <li>
              <Link href="/seller/loans" className="hover:text-emerald-400 transition">
                {t("applyForLoansFooter")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="font-bold text-slate-100 text-sm mb-3 border-b border-slate-800 pb-1.5">
            {t("customerCare")}
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <Link href="/profile/orders" className="hover:text-emerald-400 transition">
                {t("myOrders")}
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-emerald-400 transition">
                {t("helpCenter")}
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-emerald-400 transition">
                {t("buyerProtectionTitle")}
              </Link>
            </li>
          </ul>
        </div>

        {/* About & Corporate */}
        <div>
          <h4 className="font-bold text-slate-100 text-sm mb-3 border-b border-slate-800 pb-1.5">
            {t("aboutJusurKush")}
          </h4>
          <p className="text-slate-400 leading-relaxed text-[11px] mb-3">
            {language === "ar"
              ? "جسور كوش تضمن شفافية العمليات وتوفر بيئة آمنة للبائعين والمشتريين مع توثيق السجلات والتحقق المباشر من الحسابات البنكية."
              : "JusurKush ensures operation transparency and safe business environments with strict merchant auditing and bank transfer verification."}
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-slate-950 py-4 border-t border-slate-800/80 text-center text-[11px] text-slate-500">
        <p>© {new Date().getFullYear()} {t("allRightsReserved")}</p>
      </div>
    </footer>
  );
}
