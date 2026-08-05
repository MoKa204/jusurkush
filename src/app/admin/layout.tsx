"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  ShieldCheck,
  LayoutDashboard,
  Users,
  Landmark,
  FileCheck,
  AlertTriangle,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const { language } = useLanguage();
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="p-8 text-center text-xs text-slate-500">
        Authenticating admin session...
      </div>
    );
  }

  if (!user || user.role !== "ADMIN") {
    return (
      <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">
          {language === "ar" ? "وصول الإدارة مقيد" : "Admin Panel Restrict Access"}
        </h2>
        <p className="text-xs text-slate-500">
          {language === "ar"
            ? "يتطلب الوصول إلى هذا القسم امتيازات حساب المسؤول (ADMIN)."
            : "Super-admin privileges required to enter this section."}
        </p>
        <Link href="/" className="inline-block px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold">
          {language === "ar" ? "العودة للرئيسية" : "Back to Home"}
        </Link>
      </div>
    );
  }

  const NAV_ITEMS = [
    {
      name: language === "ar" ? "نظرة عامة" : "Overview",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: language === "ar" ? "التُجّار والشركات" : "Sellers",
      href: "/admin/sellers",
      icon: Users,
    },
    {
      name: language === "ar" ? "تدقيق جوازات السفر" : "Passport KYC",
      href: "/admin/passports",
      icon: FileCheck,
    },
    {
      name: language === "ar" ? "طلبات التمويل" : "Loans",
      href: "/admin/loans",
      icon: Landmark,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-md flex items-center justify-between">
        <div className="flex items-center space-x-2 space-x-reverse">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          <div>
            <h2 className="font-bold text-sm">
              {language === "ar" ? "لوحة الإدارة والإشراف العام" : "Platform Executive Control Panel"}
            </h2>
            <p className="text-[10px] text-slate-400">
              {language === "ar"
                ? "إدارة التُجّار، تدقيق الهوية وجوازات السفر، والموافقة على تمويل الأعمال"
                : "Manage merchants, audit passport KYC, and approve business financing"}
            </p>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Nav */}
        <div className="md:col-span-1 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm h-fit space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2.5 space-x-reverse px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className="w-4 h-4 text-emerald-600" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">{children}</div>
      </div>
    </div>
  );
}
