"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Landmark, Upload, X, AlertCircle } from "lucide-react";

export default function NewLoanPage() {
  const [requestedAmount, setRequestedAmount] = useState("");
  const [businessRevenue, setBusinessRevenue] = useState("");
  const [revenuePeriod, setRevenuePeriod] = useState("Monthly");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [supportingDocs, setSupportingDocs] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "loan-documents");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "File upload failed");

      setSupportingDocs((prev) => [...prev, data.url]);
    } catch (err: any) {
      setError(err.message || "Failed to upload document");
    } finally {
      setUploading(false);
    }
  };

  const removeDoc = (idx: number) => {
    setSupportingDocs((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (supportingDocs.length === 0) {
      setError("Please upload at least one supporting document (e.g. tax return or bank statement)");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/seller/loans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestedAmount: parseFloat(requestedAmount),
          businessRevenue: parseFloat(businessRevenue),
          revenuePeriod,
          loanPurpose,
          supportingDocs,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Loan submission failed");

      router.push("/seller/loans");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
        <div className="p-3 bg-amber-100 text-amber-600 rounded-full">
          <Landmark className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Business Financing Application</h1>
          <p className="text-xs text-slate-500">
            Submit your loan request. Applications enter PENDING status for manual Admin review.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-600 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Requested Loan Amount ($ USD)</label>
          <input
            type="number"
            step="100"
            required
            value={requestedAmount}
            onChange={(e) => setRequestedAmount(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-amber-500"
            placeholder="10000"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Business Gross Revenue ($ USD)</label>
            <input
              type="number"
              step="100"
              required
              value={businessRevenue}
              onChange={(e) => setBusinessRevenue(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-amber-500"
              placeholder="45000"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Revenue Period</label>
            <select
              value={revenuePeriod}
              onChange={(e) => setRevenuePeriod(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-amber-500 bg-white"
            >
              <option value="Monthly">Monthly Revenue</option>
              <option value="Quarterly">Quarterly Revenue</option>
              <option value="Annual">Annual Revenue</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Purpose of Financing</label>
          <textarea
            rows={3}
            required
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-amber-500"
            placeholder="Explain how funds will be utilized (e.g. bulk raw material purchase, hiring staff, inventory expansion)..."
          />
        </div>

        {/* Supporting Docs */}
        <div>
          <label className="block font-semibold text-slate-700 mb-2">
            Upload Supporting Documents (PDF/Images)
          </label>
          <div className="space-y-2 mb-3">
            {supportingDocs.map((url, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-200">
                <span className="font-semibold text-slate-700 truncate max-w-md">{url}</span>
                <button
                  type="button"
                  onClick={() => removeDoc(idx)}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}

            <label className="inline-flex items-center space-x-2 px-4 py-2 border border-slate-300 hover:border-amber-500 rounded bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-700 font-bold cursor-pointer transition">
              <Upload className="w-4 h-4" />
              <span>{uploading ? "Uploading..." : "Attach Document"}</span>
              <input type="file" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting || uploading}
          className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg transition disabled:opacity-50 text-xs shadow"
        >
          {submitting ? "Submitting Application..." : "Submit Application for Review"}
        </button>
      </form>
    </div>
  );
}
