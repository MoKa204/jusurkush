"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Package, DollarSign, ShoppingBag, Landmark, PlusCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function SellerOverviewPage() {
  const { t } = useLanguage();
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
          (acc: number, item: any) => acc + item.price * item.quantity,
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
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">{t("sellerPerfOverview")}</h1>
          <p className="text-xs text-slate-500 mt-0.5">{t("sellerPerfSub")}</p>
        </div>

        <Link
          href="/seller/products/new"
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition flex items-center space-x-1.5 space-x-reverse shadow"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t("addProduct")}</span>
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-semibold">{t("totalSalesRevenue")}</span>
            <DollarSign className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-2xl font-black text-slate-900">${stats.totalRevenue.toFixed(2)}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-semibold">{t("ordersReceivedCount")}</span>
            <ShoppingBag className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-2xl font-black text-slate-900">{stats.totalOrders}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-semibold">{t("activeListingsCount")}</span>
            <Package className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-2xl font-black text-slate-900">{stats.totalProducts}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-semibold">{t("loanStatus")}</span>
            <Landmark className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-sm font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 inline-block uppercase">
            {stats.loanStatus}
          </span>
        </div>
      </div>
    </div>
  );
}
