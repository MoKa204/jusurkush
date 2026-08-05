"use client";

import React, { useEffect, useState } from "react";
import { Landmark, Clock, CheckCircle2, XCircle, FileText, MessageSquare } from "lucide-react";

export default function AdminLoansPage() {
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Review Modal State
  const [activeLoan, setActiveLoan] = useState<any | null>(null);
  const [reviewerNotes, setReviewerNotes] = useState("");
  const [actionStatus, setActionStatus] = useState<"APPROVED" | "REJECTED">("APPROVED");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchLoans = () => {
    setLoading(true);
    fetch("/api/admin/loans")
      .then((res) => res.json())
      .then((data) => setLoans(data.loans || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeLoan) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/loans/${activeLoan.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: actionStatus,
          reviewerNotes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Review failed");

      setActiveLoan(null);
      setReviewerNotes("");
      fetchLoans();
    } catch (err: any) {
      setError(err.message || "Failed to submit decision");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="bg-white p-8 rounded-xl border border-slate-200 animate-pulse h-64" />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Business Loan & Micro-Financing Review</h1>
          <p className="text-xs text-slate-500">
            Evaluate merchant revenue history, attached documents, and record audit decisions.
          </p>
        </div>
        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
          {loans.length} Total Applications
        </span>
      </div>

      {loans.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-xs text-slate-500">
          No business loan applications submitted yet.
        </div>
      ) : (
        <div className="space-y-4">
          {loans.map((loan) => (
            <div key={loan.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm text-xs space-y-4">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-slate-900 text-base">
                      {loan.seller?.businessName}
                    </h3>
                    <span className="text-slate-400">|</span>
                    <span className="font-mono text-slate-600 font-bold text-xs">
                      Reg: {loan.seller?.registrationNumber}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Applicant: {loan.seller?.user?.name} ({loan.seller?.user?.email})
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  {loan.status === "PENDING" && (
                    <span className="bg-amber-100 text-amber-800 font-extrabold px-3 py-1 rounded-full text-[10px] flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>PENDING AUDIT</span>
                    </span>
                  )}
                  {loan.status === "APPROVED" && (
                    <span className="bg-emerald-100 text-emerald-800 font-extrabold px-3 py-1 rounded-full text-[10px] flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>APPROVED</span>
                    </span>
                  )}
                  {loan.status === "REJECTED" && (
                    <span className="bg-red-100 text-red-800 font-extrabold px-3 py-1 rounded-full text-[10px] flex items-center space-x-1">
                      <XCircle className="w-3 h-3 text-red-600" />
                      <span>REJECTED</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Loan Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200 text-slate-700">
                <div>
                  <span className="text-slate-400 font-semibold block text-[10px]">REQUESTED FINANCING</span>
                  <p className="font-black text-slate-900 text-base mt-0.5">
                    ${loan.requestedAmount.toLocaleString()} USD
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block text-[10px]">REPORTED REVENUE</span>
                  <p className="font-bold text-slate-800 mt-0.5">
                    ${loan.businessRevenue.toLocaleString()} ({loan.revenuePeriod})
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block text-[10px]">PURPOSE</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{loan.loanPurpose}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block text-[10px]">ATTACHED DOCUMENTS</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {loan.supportingDocs.map((doc: string, idx: number) => (
                      <a
                        key={idx}
                        href={doc}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1 px-2 py-0.5 bg-white border border-slate-300 hover:border-amber-500 text-slate-700 rounded font-semibold text-[10px]"
                      >
                        <FileText className="w-3 h-3 text-amber-600" />
                        <span>Doc #{idx + 1}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Audit History Log */}
              {loan.reviewedAt && (
                <div className="p-3 bg-amber-50/60 rounded border border-amber-200 text-[11px] text-amber-900 space-y-1">
                  <span className="font-bold flex items-center space-x-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Audit Decision Log</span>
                  </span>
                  <p className="italic">"{loan.reviewerNotes}"</p>
                  <p className="text-[10px] text-amber-700 font-semibold">
                    Reviewed by Admin {loan.reviewedBy?.name || "Officer"} on {new Date(loan.reviewedAt).toLocaleString()}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    setActiveLoan(loan);
                    setActionStatus("APPROVED");
                    setReviewerNotes("");
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded text-xs transition shadow flex items-center space-x-1.5"
                >
                  <Landmark className="w-4 h-4" />
                  <span>Review & Act on Loan</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {activeLoan && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-xs">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
              Review Business Loan Application
            </h3>
            <p className="text-slate-600 font-semibold">
              {activeLoan.seller?.businessName} — Requested: ${activeLoan.requestedAmount.toLocaleString()} USD
            </p>

            {error && (
              <div className="p-2 bg-red-50 text-red-600 rounded border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Decision Action</label>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setActionStatus("APPROVED")}
                    className={`flex-1 py-2 font-bold rounded border transition ${
                      actionStatus === "APPROVED"
                        ? "bg-emerald-600 text-white border-emerald-600 shadow"
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    Approve Loan
                  </button>
                  <button
                    type="button"
                    onClick={() => setActionStatus("REJECTED")}
                    className={`flex-1 py-2 font-bold rounded border transition ${
                      actionStatus === "REJECTED"
                        ? "bg-red-600 text-white border-red-600 shadow"
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    Reject Loan
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Mandatory Reviewer Notes (Audit Trail)
                </label>
                <textarea
                  rows={3}
                  required
                  value={reviewerNotes}
                  onChange={(e) => setReviewerNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-slate-800"
                  placeholder="Record financial risk evaluation notes, credit checks, or rejection reasons..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveLoan(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded shadow disabled:opacity-50"
                >
                  {submitting ? "Saving Decision..." : "Submit Audit Decision"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
