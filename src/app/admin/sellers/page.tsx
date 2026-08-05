"use client";

import React, { useEffect, useState } from "react";
import { Store, CheckCircle, XCircle, Clock, Building2 } from "lucide-react";

export default function AdminSellersPage() {
  const [sellers, setSellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSellers = () => {
    setLoading(true);
    fetch("/api/admin/sellers")
      .then((res) => res.json())
      .then((data) => setSellers(data.sellers || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/sellers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchSellers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="bg-white p-8 rounded-xl border border-slate-200 animate-pulse h-64" />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Merchant Account Verification</h1>
          <p className="text-xs text-slate-500">Review business registration data and approve/reject sellers</p>
        </div>
        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
          {sellers.length} Total Merchants
        </span>
      </div>

      {sellers.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-xs text-slate-500">
          No seller applications registered yet.
        </div>
      ) : (
        <div className="space-y-4">
          {sellers.map((seller) => (
            <div key={seller.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm text-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-slate-100 text-slate-800 rounded-lg">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{seller.businessName}</h3>
                    <p className="text-slate-500">Owner: {seller.user?.name} ({seller.user?.email})</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {seller.status === "PENDING" && (
                    <span className="bg-amber-100 text-amber-800 font-extrabold px-3 py-1 rounded-full text-[10px] flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>PENDING APPROVAL</span>
                    </span>
                  )}
                  {seller.status === "APPROVED" && (
                    <span className="bg-emerald-100 text-emerald-800 font-extrabold px-3 py-1 rounded-full text-[10px] flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      <span>APPROVED</span>
                    </span>
                  )}
                  {seller.status === "REJECTED" && (
                    <span className="bg-red-100 text-red-800 font-extrabold px-3 py-1 rounded-full text-[10px] flex items-center space-x-1">
                      <XCircle className="w-3 h-3 text-red-600" />
                      <span>REJECTED</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div>
                  <span className="text-slate-400 font-semibold block text-[10px]">REGISTRATION / TAX NUMBER</span>
                  <p className="font-bold text-slate-900 font-mono mt-0.5">{seller.registrationNumber}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block text-[10px]">PHYSICAL ADDRESS</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{seller.businessAddress}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block text-[10px]">CONTACT INFO</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{seller.contactInfo}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-2">
                {seller.status !== "APPROVED" && (
                  <button
                    onClick={() => handleUpdateStatus(seller.id, "APPROVED")}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-xs transition flex items-center space-x-1.5 shadow"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve Seller</span>
                  </button>
                )}
                {seller.status !== "REJECTED" && (
                  <button
                    onClick={() => handleUpdateStatus(seller.id, "REJECTED")}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded text-xs transition flex items-center space-x-1.5 shadow"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject Seller</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
