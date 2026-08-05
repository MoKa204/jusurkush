"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ShieldCheck, Zap, Landmark } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function BannerCarousel() {
  const { t, language } = useLanguage();
  const [current, setCurrent] = useState(0);

  const BANNERS = [
    {
      id: 1,
      title: t("bannerTitle1"),
      subtitle: t("bannerSub1"),
      cta: t("applyLoanBtn"),
      href: "/seller/loans",
      bg: "from-emerald-700 via-teal-700 to-emerald-900",
      icon: Landmark,
    },
    {
      id: 2,
      title: language === "ar" ? "تُجّار موثوقون ومعتمدون فقط" : "Verified Authentic Merchants Only",
      subtitle: language === "ar" ? "تسوق مباشرة من شركات خضعت للتدقيق التام مع حماية متكاملة للمشتري" : "Shop directly from audited businesses with complete buyer protection",
      cta: language === "ar" ? "استكشف الفئات" : "Explore Categories",
      href: "#categories",
      bg: "from-slate-900 via-emerald-950 to-slate-800",
      icon: ShieldCheck,
    },
    {
      id: 3,
      title: language === "ar" ? "عمولة صفرية للبائعين المحليين" : "Zero Middleman Fees for Local Vendors",
      subtitle: language === "ar" ? "طوّر متجرك الإلكتروني وزد من مبيعاتك دون رسوم خفية" : "Grow your online presence and scale your product inventory effortlessly",
      cta: t("startSelling"),
      href: "/register-seller",
      bg: "from-teal-600 via-emerald-600 to-emerald-800",
      icon: Zap,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [language]);

  const banner = BANNERS[current];
  const Icon = banner.icon;

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg mb-8 text-white border border-emerald-900/20">
      <div className={`bg-gradient-to-r ${banner.bg} p-8 md:p-12 transition-all duration-700 min-h-[220px] flex flex-col justify-between`}>
        <div className="flex items-start justify-between">
          <div className="max-w-xl">
            <span className="inline-block bg-white/20 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md mb-3 backdrop-blur-md border border-white/20">
              {language === "ar" ? "ميزة المنصة الأساسية" : "Featured Platform Advantage"}
            </span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
              {banner.title}
            </h2>
            <p className="text-sm text-white/90 font-medium">{banner.subtitle}</p>
          </div>
          <Icon className="w-16 h-16 opacity-25 hidden sm:block" />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Link
            href={banner.href}
            className="bg-white text-emerald-900 font-bold px-6 py-2.5 rounded-lg text-xs hover:bg-emerald-50 hover:text-emerald-700 transition shadow"
          >
            {banner.cta}
          </Link>

          {/* Dots Indicator */}
          <div className="flex space-x-2 space-x-reverse">
            {BANNERS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === current ? "bg-white w-6" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Nav Controls */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + BANNERS.length) % BANNERS.length)}
        className="absolute left-2 ltr:right-auto ltr:left-2 rtl:left-2 rtl:right-auto top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition backdrop-blur-sm"
      >
        <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % BANNERS.length)}
        className="absolute right-2 ltr:left-auto ltr:right-2 rtl:right-2 rtl:left-auto top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition backdrop-blur-sm"
      >
        <ChevronRight className="w-5 h-5 rtl:rotate-180" />
      </button>
    </div>
  );
}
