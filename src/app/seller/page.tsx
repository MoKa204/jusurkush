"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Banknote, ShoppingBag, Landmark, PlusCircle, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function SellerOverviewPage() {
  const { t, language } = useLanguage();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    loanStatus: "NONE",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/seller/products").then((r) => r.json()),
      fetch("/api/seller/orders").then((r) => r.json()),
      fetch("/api/seller/loans").then((r) => r.json()),
    ])
      .then(([productsRes, ordersRes, loansRes]) => {
        const productsList = productsRes.products || [];
        const ordersList = ordersRes.orderItems || [];
        const loansList = loansRes.loans || [];

        const revenue = ordersList.reduce(
          (acc: number, item: any) => acc + (item.price || 0) * (item.quantity || 1),
          0
        );

        const latestLoan = loansList[0];

        setStats({
          totalProducts: productsList.length,
          totalOrders: ordersList.length,
          totalRevenue: revenue,
          loanStatus: latestLoan ? latestLoan.status : "NONE",
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="bg-white p-8 rounded-2xl border border-slate-200 animate-pulse h-64" />;
  }

  return (
    <div className="space-y-6 text-xs">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">{t("sellerPerfOverview")}</h1>
          <p className="text-xs text-slate-500 mt-0.5">{t("sellerPerfSub")}</p>
        </div>

        <Link
          href="/seller/products/new"
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition flex items-center space-x-1.5 space-x-reverse shadow"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t("addProduct")}</span>
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Sales Revenue Card */}
        <Link
          href="/seller/commission"
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-500 hover:shadow-md transition group block"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-semibold group-hover:text-emerald-700 transition">
              {t("totalSalesRevenue")}
            </span>
            <Banknote className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-xl font-black text-slate-900 font-mono block">
            {language === "ar" ? "ج.س " : "SDG "}
            {stats.totalRevenue.toLocaleString()}
          </span>
        </Link>

        {/* Incoming Orders Card -> Link to /seller/orders */}
        <Link
          href="/seller/orders"
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-500 hover:shadow-md transition group block relative"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-semibold group-hover:text-emerald-700 transition">
              {t("ordersReceivedCount")}
            </span>
            <ShoppingBag className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-slate-900 font-mono">{stats.totalOrders}</span>
            <span className="text-[10px] text-emerald-700 font-bold flex items-center space-x-0.5 space-x-reverse group-hover:underline">
              <span>{language === "ar" ? "عرض الطلبات" : "View Orders"}</span>
              <ArrowLeft className="w-3 h-3 rtl:rotate-0 rotate-180" />
            </span>
          </div>
        </Link>

        {/* Active Products Card -> Link to /seller/products */}
        <Link
          href="/seller/products"
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-500 hover:shadow-md transition group block"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-semibold group-hover:text-emerald-700 transition">
              {t("activeListingsCount")}
            </span>
            <Package className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-2xl font-black text-slate-900 font-mono">{stats.totalProducts}</span>
        </Link>

        {/* Loan Request Status Card -> Link to /seller/loans */}
        <Link
          href="/seller/loans"
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-500 hover:shadow-md transition group block"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-semibold group-hover:text-emerald-700 transition">
              {t("loanStatus")}
            </span>
            <Landmark className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 inline-block uppercase">
            {stats.loanStatus}
          </span>
        </Link>
      </div>
    </div>
  );
}
