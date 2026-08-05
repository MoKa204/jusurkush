"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Search, Store, ShieldCheck, User, LogOut, Package, Landmark, Globe, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useLanguage, Language } from "@/context/LanguageContext";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "ar", label: "العربية (Arabic)", flag: "🇸🇩" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
];

export default function Header() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const activeLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <header className="bg-gradient-to-r from-[#047857] via-[#059669] to-[#0d9488] text-white shadow-md">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex justify-between items-center text-xs border-b border-white/15">
        <div className="flex items-center space-x-4 space-x-reverse">
          <Link href="/seller" className="flex items-center space-x-1 space-x-reverse hover:text-white/80 transition font-medium">
            <Store className="w-3.5 h-3.5" />
            <span>{t("sellerCentre")}</span>
          </Link>
          <span className="text-white/40">|</span>
          <Link href="/register-seller" className="hover:text-white/80 transition font-medium">
            {t("startSelling")}
          </Link>
          {user?.role === "ADMIN" && (
            <>
              <span className="text-white/40">|</span>
              <Link href="/admin" className="flex items-center space-x-1 space-x-reverse text-emerald-200 hover:text-emerald-100 font-bold transition">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t("adminPanel")}</span>
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center space-x-4 space-x-reverse">
          {/* Language Selector Dropdown */}
          <div className="relative group py-1 cursor-pointer">
            <div className="flex items-center space-x-1 space-x-reverse font-semibold hover:text-white/90 transition text-xs">
              <Globe className="w-3.5 h-3.5" />
              <span>{activeLang.flag} {activeLang.label.split(" ")[0]}</span>
              <ChevronDown className="w-3 h-3 text-white/70" />
            </div>

            {/* Language Options Dropdown Menu */}
            <div className="absolute left-0 ltr:right-0 ltr:left-auto top-full hidden group-hover:block bg-white text-slate-800 rounded-lg shadow-xl py-1.5 w-44 z-50 border border-slate-100">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`w-full flex items-center space-x-2 space-x-reverse px-3 py-2 text-xs text-right font-medium hover:bg-emerald-50 transition ${
                    language === lang.code ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-700"
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>

          <span className="text-white/40">|</span>

          {user ? (
            <div className="relative group flex items-center space-x-2 space-x-reverse cursor-pointer py-1">
              <User className="w-3.5 h-3.5" />
              <span className="font-medium">{user.name}</span>
              {user.role === "SELLER" && (
                <span className="bg-emerald-300 text-emerald-950 text-[10px] font-bold px-1.5 py-0.5 rounded">
                  SELLER
                </span>
              )}
              {/* Dropdown Menu */}
              <div className="absolute left-0 ltr:right-0 ltr:left-auto top-full hidden group-hover:block bg-white text-slate-800 rounded-lg shadow-xl py-2 w-48 z-50 border border-slate-100">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{user.name}</p>
                  <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                </div>
                <Link href="/profile/orders" className="flex items-center space-x-2 space-x-reverse px-4 py-2 text-xs hover:bg-emerald-50 hover:text-emerald-700 font-medium">
                  <Package className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t("myOrders")}</span>
                </Link>
                {user.role === "SELLER" && (
                  <>
                    <Link href="/seller" className="flex items-center space-x-2 space-x-reverse px-4 py-2 text-xs hover:bg-emerald-50 hover:text-emerald-700 font-medium">
                      <Store className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t("sellerDashboard")}</span>
                    </Link>
                    <Link href="/seller/loans" className="flex items-center space-x-2 space-x-reverse px-4 py-2 text-xs hover:bg-emerald-50 hover:text-emerald-700 font-medium">
                      <Landmark className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t("businessLoans")}</span>
                    </Link>
                  </>
                )}
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-2 space-x-reverse px-4 py-2 text-xs text-red-600 hover:bg-red-50 text-right font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t("logout")}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3 space-x-reverse font-medium">
              <Link href="/register" className="hover:text-white/80 transition">
                {t("signUp")}
              </Link>
              <span className="text-white/40">|</span>
              <Link href="/login" className="hover:text-white/80 transition">
                {t("login")}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2 space-x-reverse">
          <div className="bg-white text-emerald-700 rounded-xl px-3 py-1 font-black text-2xl tracking-tight shadow-md border border-white/20">
            Jusur<span className="text-slate-800">Kush</span>
          </div>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative">
          <div className="flex bg-white rounded-lg shadow-inner overflow-hidden p-1 border border-emerald-900/20">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full px-4 py-2 text-slate-800 text-sm focus:outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md font-semibold flex items-center justify-center transition shadow-sm"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Cart Icon */}
        <Link href="/cart" className="relative p-2 hover:opacity-90 transition">
          <ShoppingCart className="w-8 h-8 text-white drop-shadow-sm" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-emerald-700 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-emerald-700 shadow">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
