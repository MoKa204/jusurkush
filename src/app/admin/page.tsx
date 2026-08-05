"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Store, Package, ShoppingBag, DollarSign, Landmark, ArrowRight } from "lucide-react";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data.stats || null))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="bg-white p-8 rounded-xl border border-slate-200 animate-pulse h-64" />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800">Platform Real Metrics Overview</h2>
        <p className="text-xs text-slate-500 mt-1">
          Live aggregations directly queried from PostgreSQL database.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold">Total Platform Users</span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{stats?.totalUsers || 0}</h3>
          </div>
          <div className="p-3 bg-slate-100 text-slate-700 rounded-full">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold">Registered Merchants</span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{stats?.totalSellers || 0}</h3>
            {stats?.pendingSellers > 0 && (
              <span className="text-[10px] font-bold text-amber-600">
                {stats.pendingSellers} Pending Approval
              </span>
            )}
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-full">
            <Store className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold">Live Listed Products</span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{stats?.totalProducts || 0}</h3>
          </div>
          <div className="p-3 bg-orange-50 text-[#ee4d2d] rounded-full">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold">Total Completed Orders</span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{stats?.totalOrders || 0}</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold">Gross Order Revenue</span>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">
              ${(stats?.totalRevenue || 0).toFixed(2)}
            </h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold">Pending Loan Requests</span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{stats?.pendingLoans || 0}</h3>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full">
            <Landmark className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Action Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/sellers"
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-slate-400 transition flex items-center justify-between group"
        >
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Review Seller Applications</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Verify merchant business registration numbers and physical addresses.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition" />
        </Link>

        <Link
          href="/admin/loans"
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-slate-400 transition flex items-center justify-between group"
        >
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Review Financing Applications</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Assess merchant revenue metrics and add reviewer audit notes.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition" />
        </Link>
      </div>
    </div>
  );
}
