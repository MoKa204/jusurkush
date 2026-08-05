"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  ShoppingBag,
  Search,
  ShoppingCart,
  User as UserIcon,
  Store,
  ShieldCheck,
  Globe,
  LogOut,
  ChevronDown,
  Truck,
  FileCheck,
} from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();
  const { language, setLanguage, t, dir } = useLanguage();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const LANGUAGES = [
    { code: "ar", label: "العربية", flag: "🇸🇩" },
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  ];

  const renderActionButtons = () => (
    <div className="flex items-center space-x-2 sm:space-x-3 space-x-reverse">
      {/* Cart Icon */}
      <Link
        href="/cart"
        className="p-2 sm:p-2.5 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-xl transition relative border border-slate-200"
        title={t("cart")}
      >
        <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
      </Link>

      {/* Account Menu / Login */}
      {user ? (
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center space-x-1.5 sm:space-x-2 space-x-reverse p-1.5 px-2.5 sm:px-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl font-bold text-xs hover:bg-emerald-100 transition shadow-sm"
          >
            <UserIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-700" />
            <span className="max-w-[70px] sm:max-w-[100px] truncate">{user.name}</span>
            <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-700" />
          </button>

          {userMenuOpen && (
            <div className="absolute top-full mt-1 ltr:right-0 rtl:left-0 bg-white text-slate-800 rounded-2xl shadow-xl border border-slate-200 py-2 w-48 z-50 text-xs">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="font-bold text-slate-900">{user.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                <span className="text-[9px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mt-1 inline-block">
                  {user.role}
                </span>
              </div>

              <Link
                href="/profile/orders"
                onClick={() => setUserMenuOpen(false)}
                className="block px-4 py-2 hover:bg-slate-50 text-slate-700 font-semibold"
              >
                {t("myOrders")}
              </Link>

              {user.role === "SELLER" && (
                <Link
                  href="/seller"
                  onClick={() => setUserMenuOpen(false)}
                  className="block px-4 py-2 hover:bg-slate-50 text-slate-700 font-semibold"
                >
                  {t("sellerDashboard")}
                </Link>
              )}

              {user.role === "DELIVERY_OFFICER" && (
                <Link
                  href="/delivery"
                  onClick={() => setUserMenuOpen(false)}
                  className="block px-4 py-2 hover:bg-slate-50 text-slate-700 font-semibold"
                >
                  {language === "ar" ? "لوحة مندوب التوصيل" : "Delivery Portal"}
                </Link>
              )}

              {user.role === "ADMIN" && (
                <Link
                  href="/admin"
                  onClick={() => setUserMenuOpen(false)}
                  className="block px-4 py-2 hover:bg-slate-50 text-slate-700 font-semibold"
                >
                  {t("adminPanel")}
                </Link>
              )}

              <button
                onClick={() => {
                  setUserMenuOpen(false);
                  logout();
                }}
                className="w-full text-right rtl:text-right px-4 py-2 hover:bg-red-50 text-red-600 font-bold flex items-center space-x-2 space-x-reverse border-t border-slate-100 mt-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t("logout")}</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center space-x-1.5 sm:space-x-2 space-x-reverse text-xs font-bold">
          <Link
            href="/login"
            className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-slate-700 hover:text-emerald-700 transition"
          >
            {t("login")}
          </Link>
          <Link
            href="/register"
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm transition whitespace-nowrap"
          >
            {t("register")}
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm" dir={dir}>
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <span>{t("welcomeMsg")}</span>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 font-semibold">{t("support247")}</span>
          </div>

          <div className="flex items-center justify-between w-full md:w-auto space-x-3 space-x-reverse">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center space-x-1.5 space-x-reverse hover:text-white font-medium transition py-0.5 px-2 rounded bg-slate-800/80 border border-slate-700 text-[11px] sm:text-xs"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>{LANGUAGES.find((l) => l.code === language)?.label}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langMenuOpen && (
                <div className="absolute top-full mt-1 ltr:right-0 rtl:left-0 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 py-1 w-36 z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as any);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-right rtl:text-right px-3 py-1.5 text-xs font-semibold hover:bg-emerald-50 flex items-center justify-between ${
                        language === lang.code ? "text-emerald-700 font-bold bg-emerald-50/60" : "text-slate-700"
                      }`}
                    >
                      <span>{lang.label}</span>
                      <span>{lang.flag}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Seller CTA */}
            {(!user || user.role === "BUYER") && (
              <Link
                href="/register-seller"
                className="flex items-center space-x-1 space-x-reverse text-emerald-400 font-semibold hover:text-emerald-300 transition text-[11px] sm:text-xs"
              >
                <Store className="w-3.5 h-3.5" />
                <span>{t("becomeSeller")}</span>
              </Link>
            )}

            {/* Delivery Officer Portal Link */}
            {user && (user.role === "DELIVERY_OFFICER" || user.role === "ADMIN") && (
              <Link
                href="/delivery"
                className="flex items-center space-x-1 space-x-reverse text-emerald-400 font-bold hover:text-emerald-300 transition text-[11px] sm:text-xs"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>{language === "ar" ? "لوحة التوصيل" : "Delivery Portal"}</span>
              </Link>
            )}

            {/* Admin Passport Queue */}
            {user?.role === "ADMIN" && (
              <Link
                href="/admin/passports"
                className="flex items-center space-x-1 space-x-reverse text-amber-400 font-bold hover:text-amber-300 transition text-[11px] sm:text-xs"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>{language === "ar" ? "تدقيق الجوازات" : "Passports Audit"}</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex flex-wrap md:flex-nowrap items-center justify-between gap-2.5 sm:gap-4">
        {/* Top Header Row on Mobile / Logo on Desktop */}
        <div className="flex items-center justify-between w-full md:w-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 space-x-reverse flex-shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-md">
              ج
            </div>
            <div>
              <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight block leading-none">
                جسور كوش
              </span>
              <span className="text-[9px] sm:text-[10px] text-emerald-700 font-bold tracking-widest uppercase">
                JusurKush
              </span>
            </div>
          </Link>

          {/* Action Buttons on Mobile */}
          <div className="md:hidden">
            {renderActionButtons()}
          </div>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="w-full md:flex-1 md:max-w-xl relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-1.5 sm:py-2 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
          />
          <button
            type="submit"
            className="absolute ltr:right-3 rtl:left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

        {/* Action Buttons on Desktop */}
        <div className="hidden md:flex">
          {renderActionButtons()}
        </div>
      </div>
    </header>
  );
}
