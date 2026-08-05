"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  Landmark,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="p-8 text-center text-xs text-slate-500">
        Authenticating seller session...
      </div>
    );
  }

  if (!user || user.role !== "SELLER" || !user.sellerProfile) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">Seller Center Access Restricted</h2>
        <p className="text-xs text-slate-500">
          You must be logged in as a registered business seller to access this area.
        </p>
        <div className="flex justify-center space-x-3 text-xs font-bold pt-2">
          <Link href="/register-seller" className="px-4 py-2 bg-emerald-600 text-white rounded-lg">
            Register Seller
          </Link>
          <Link href="/login" className="px-4 py-2 bg-slate-100 text-slate-800 rounded-lg">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  const sellerStatus = user.sellerProfile.status;

  const NAV_ITEMS = [
    { name: "Overview", href: "/seller", icon: LayoutDashboard },
    { name: "My Products", href: "/seller/products", icon: Package },
    { name: "Add Product", href: "/seller/products/new", icon: PlusCircle },
    { name: "Orders Received", href: "/seller/orders", icon: ShoppingBag },
    { name: "Business Financing", href: "/seller/loans", icon: Landmark },
  ];

  return (
    <div className="space-y-6">
      {/* Seller Verification Banner */}
      {sellerStatus === "PENDING" && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start space-x-3 text-xs text-amber-800">
          <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-amber-900">Your Business Registration is Pending Verification</h4>
            <p className="mt-0.5">
              Your business account (<strong>{user.sellerProfile.businessName}</strong>, Reg: {user.sellerProfile.registrationNumber}) has been submitted to Admin review. Product listings will go live on the homepage once verified.
            </p>
          </div>
        </div>
      )}

      {sellerStatus === "APPROVED" && (
        <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center justify-between text-xs text-emerald-800">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              <strong>{user.sellerProfile.businessName}</strong> is verified & active on JusurKush.
            </span>
          </div>
          <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
            APPROVED MERCHANT
          </span>
        </div>
      )}

      {/* Main Seller Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Nav */}
        <div className="md:col-span-1 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm h-fit space-y-1">
          <div className="px-3 py-2 mb-2 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 text-sm">{user.sellerProfile.businessName}</h3>
            <span className="text-[10px] text-emerald-700 font-semibold">Seller Center</span>
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Content Pane */}
        <div className="md:col-span-3">{children}</div>
      </div>
    </div>
  );
}
