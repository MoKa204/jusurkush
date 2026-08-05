"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Landmark, PlusCircle, Clock, CheckCircle2, XCircle, FileText } from "lucide-react";

export default function SellerLoansPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/seller/loans")
      .then((res) => res.json())
      .then((data) => setApplications(data.applications || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="bg-white p-8 rounded-xl border border-slate-200 animate-pulse h-64" />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
            <Landmark className="w-5 h-5 text-amber-600" />
            <span>Business Financing & Loans</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Apply for growth capital based on your merchant sales history and business revenue.
          </p>
        </div>
        <Link
          href="/seller/loans/new"
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-xs transition flex items-center space-x-1.5 shadow"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Apply for New Loan</span>
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Landmark className="w-12 h-12 text-amber-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Financing Applications Submitted</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            Need capital to buy bulk inventory or upgrade equipment? Submit your first business loan request!
          </p>
          <Link
            href="/seller/loans/new"
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-amber-500 text-white font-bold rounded text-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit Application</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm text-xs">
              {/* Top Banner */}
              <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between font-bold">
                <div className="flex items-center space-x-3">
                  <span className="text-slate-900 text-sm font-extrabold">
                    Requested: ${app.requestedAmount.toLocaleString()} USD
                  </span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-500 font-normal">
                    Submitted: {new Date(app.submittedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {app.status === "PENDING" && (
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-[10px] font-extrabold flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>UNDER ADMIN REVIEW</span>
                    </span>
                  )}
                  {app.status === "APPROVED" && (
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-[10px] font-extrabold flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>FINANCING APPROVED</span>
                    </span>
                  )}
                  {app.status === "REJECTED" && (
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-[10px] font-extrabold flex items-center space-x-1">
                      <XCircle className="w-3 h-3 text-red-600" />
                      <span>APPLICATION REJECTED</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Details & Audit Trail */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-700">
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px]">REVENUE METRICS</span>
                    <p className="font-bold text-slate-900 mt-0.5">
                      ${app.businessRevenue.toLocaleString()} ({app.revenuePeriod})
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px]">PURPOSE OF FINANCING</span>
                    <p className="font-semibold text-slate-800 mt-0.5">{app.loanPurpose}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px]">SUPPORTING DOCUMENTS</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {app.supportingDocs.map((doc: string, idx: number) => (
                        <a
                          key={idx}
                          href={doc}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center space-x-1 px-2 py-0.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded font-semibold text-[10px]"
                        >
                          <FileText className="w-3 h-3 text-amber-600" />
                          <span>Doc #{idx + 1}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Audit Log Box */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-1 text-[11px]">Admin Audit & Review Notes</h4>
                  {app.reviewedAt ? (
                    <div className="space-y-1 text-slate-600">
                      <p className="italic">"{app.reviewerNotes || "No notes provided"}"</p>
                      <p className="text-[10px] text-slate-400 font-semibold pt-1">
                        Reviewed by Admin {app.reviewedBy?.name || "Officer"} on {new Date(app.reviewedAt).toLocaleString()}
                      </p>
                    </div>
                  ) : (
                    <p className="text-slate-400 italic">
                      Pending manual decision. Decision log will be updated once reviewed by the risk assessment team.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
