"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheck, Users, Landmark, BarChart3, AlertTriangle } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  if (loading) {
    return <div className="p-8 text-center text-xs text-slate-500">Checking admin session...</div>;
  }

  if (!user || user.role !== "ADMIN") {
    return (
      <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-lg shadow-sm border border-slate-200 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">Admin Access Required</h2>
        <p className="text-xs text-slate-500">
          This portal requires administrator privileges.
        </p>
        <Link href="/login" className="inline-block px-6 py-2 bg-slate-900 text-white rounded text-xs font-bold">
          Login as Admin
        </Link>
      </div>
    );
  }

  const NAV = [
    { name: "Platform Overview", href: "/admin", icon: BarChart3 },
    { name: "Seller Verification", href: "/admin/sellers", icon: Users },
    { name: "Loan Applications", href: "/admin/loans", icon: Landmark },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white p-4 rounded-xl shadow-md flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-400 text-slate-900 rounded-lg">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-base">JusurKush Administration Portal</h1>
            <p className="text-xs text-slate-400">Signed in as {user.name} ({user.email})</p>
          </div>
        </div>
        <span className="bg-amber-400 text-slate-950 font-bold text-[10px] px-3 py-1 rounded-full uppercase">
          SUPER ADMIN
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1 h-fit">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="md:col-span-3">{children}</div>
      </div>
    </div>
  );
}
