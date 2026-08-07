"use client";

import React, { useEffect, useState } from "react";
import {
  Landmark,
  Clock,
  CheckCircle,
  AlertTriangle,
  Upload,
  DollarSign,
  ShieldCheck,
  Building2,
  FileCheck,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function SellerCommissionPage() {
  const { t, language } = useLanguage();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentProof, setPaymentProof] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const fetchCommissionData = () => {
    setLoading(true);
    fetch("/api/seller/commission")
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        if (resData.unpaidCommission) {
          setPaymentAmount(resData.unpaidCommission.toString());
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCommissionData();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "payments");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Upload failed");

      setPaymentProof(resData.url);
    } catch (err: any) {
      setError(err.message || "Failed to upload receipt image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentProof) {
      setError(language === "ar" ? "يرجى رفع إشعار التحويل البنكي" : "Please upload payment proof receipt");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/seller/commission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(paymentAmount),
          paymentProof,
        }),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Failed to submit payment proof");

      setSuccessMsg(t("paymentSubmittedPendingAudit"));
      setPaymentProof("");
      fetchCommissionData();
    } catch (err: any) {
      setError(err.message || "Failed to submit payment proof");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="bg-white p-8 rounded-2xl border border-slate-200 animate-pulse h-96" />;
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">{t("commissionBannerTitle")}</h1>
          <p className="text-xs text-slate-500 mt-1">
            {language === "ar"
              ? "متابعة فترة التجربة المجانية (الشهرين)، العمولات المستحقة، وسداد الفواتير عبر البنك"
              : "Track your 2-month free trial, unpaid sales commission, and bank transfer receipts"}
          </p>
        </div>
        <div className="p-3 bg-emerald-100 text-emerald-800 rounded-full">
          <Landmark className="w-6 h-6" />
        </div>
      </div>

      {/* Seller Status & Suspension Banners */}
      {data?.isSuspendedForFee && (
        <div className="bg-red-50 border-2 border-red-300 p-4 rounded-2xl flex items-start space-x-3 space-x-reverse text-xs text-red-900 shadow-sm">
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-extrabold text-sm text-red-950">{t("suspendedStatusLabel")}</h3>
            <p className="mt-1 leading-relaxed font-semibold">{t("sellerSuspendedNotice")}</p>
          </div>
        </div>
      )}

      {/* Free Trial Banner */}
      {data?.isFreeTrial ? (
        <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl flex items-center justify-between text-xs text-emerald-900 shadow-sm">
          <div className="flex items-center space-x-3 space-x-reverse">
            <ShieldCheck className="w-8 h-8 text-emerald-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-sm text-emerald-950">{t("freeTrialActive")}</h3>
              <p className="mt-0.5 text-emerald-800">{t("freeTrialDesc")}</p>
            </div>
          </div>
          <div className="text-center bg-white px-4 py-2 rounded-xl border border-emerald-300 font-extrabold text-emerald-800 shadow-xs">
            <span className="text-xl font-black block text-emerald-600">{data.trialDaysRemaining}</span>
            <span className="text-[10px] block uppercase">{t("trialRemainingDays")}</span>
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center justify-between text-xs text-amber-900 shadow-sm">
          <div className="flex items-center space-x-3 space-x-reverse">
            <Clock className="w-6 h-6 text-amber-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-slate-900">{t("gracePeriodNotice")}</h3>
              <p className="mt-0.5">{t("overdueSuspensionWarning")}</p>
            </div>
          </div>
          {data?.unpaidCommission > 0 && (
            <div className="bg-amber-200/60 px-3 py-1.5 rounded-lg text-amber-950 font-bold text-[11px]">
              {data.graceDaysRemaining} {language === "ar" ? "أيام متبقية للسداد" : "Days remaining to pay"}
            </div>
          )}
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-semibold block mb-1">{t("unpaidCommissionBalance")}</span>
          <span className="text-2xl font-black text-slate-900">${data?.unpaidCommission?.toFixed(2) || "0.00"}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-semibold block mb-1">{t("commissionRateLabel")}</span>
          <span className="text-2xl font-black text-emerald-600">{(data?.commissionRate * 100).toFixed(0)}%</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-semibold block mb-1">
            {language === "ar" ? "حالة المتجر والتنشيط" : "Store Active Status"}
          </span>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
              data?.status === "APPROVED"
                ? "bg-emerald-100 text-emerald-800"
                : data?.status === "SUSPENDED"
                ? "bg-red-100 text-red-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {data?.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Default Platform Bank Details Box */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-4 shadow-sm">
          <div className="flex items-center space-x-3 space-x-reverse border-b border-slate-800 pb-3">
            <Building2 className="w-6 h-6 text-emerald-400" />
            <div>
              <h3 className="font-bold text-sm text-emerald-400">{t("defaultPlatformBankDetails")}</h3>
              <p className="text-[11px] text-slate-400">
                {language === "ar"
                  ? "يرجى تحويل مبلغ العمولة إلى الحساب الرسمي المعتمد للمنصة"
                  : "Transfer your overdue platform commission to this official platform bank account"}
              </p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs font-mono">
            <div className="flex justify-between bg-slate-800/70 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 font-sans">{t("platformBankName")}</span>
              <span className="font-bold text-white">{data?.platformBankAccount?.bankName}</span>
            </div>
            <div className="flex justify-between bg-slate-800/70 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 font-sans">{t("platformAccountHolder")}</span>
              <span className="font-bold text-emerald-400">{data?.platformBankAccount?.accountHolder}</span>
            </div>
            <div className="flex justify-between bg-slate-800/70 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 font-sans">{t("platformAccountNumber")}</span>
              <span className="font-bold text-amber-400">{data?.platformBankAccount?.accountNumber}</span>
            </div>
            <div className="flex justify-between bg-slate-800/70 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 font-sans">{t("platformIBAN")}</span>
              <span className="font-bold text-slate-300">{data?.platformBankAccount?.iban}</span>
            </div>
          </div>
        </div>

        {/* Upload Receipt Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-3 flex items-center space-x-2 space-x-reverse">
            <FileCheck className="w-5 h-5 text-emerald-600" />
            <span>{t("uploadCommissionProof")}</span>
          </h3>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center space-x-2 space-x-reverse">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 font-semibold flex items-center space-x-2 space-x-reverse">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmitProof} className="space-y-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === "ar" ? "مبلغ التحويل البنكي ($ USD)" : "Transfer Amount ($ USD)"}
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  required
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 font-bold"
                  placeholder="0.00"
                />
                <DollarSign className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-2">
                {language === "ar" ? "صورة إشعار أو وصل التحويل البنكي" : "Upload Bank Transfer Receipt"}
              </label>

              <div className="flex items-center gap-4">
                {paymentProof ? (
                  <div className="relative w-28 h-20 rounded-lg overflow-hidden border-2 border-emerald-500 shadow-sm flex-shrink-0">
                    <img src={paymentProof} alt="Receipt" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-1 bg-emerald-600 text-white text-[9px] px-1 py-0.5 rounded font-bold">
                      ✓ {t("uploaded")}
                    </span>
                  </div>
                ) : (
                  <div className="w-28 h-20 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 text-[10px] gap-1 flex-shrink-0">
                    <Upload className="w-5 h-5 text-slate-400" />
                    <span>{t("uploading")}</span>
                  </div>
                )}

                <label className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl cursor-pointer transition border border-slate-300 text-xs inline-flex items-center space-x-2 space-x-reverse shadow-xs">
                  <Upload className="w-4 h-4" />
                  <span>{uploading ? t("uploading") : t("uploadCommissionProof")}</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || uploading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition disabled:opacity-50 text-xs shadow"
            >
              {submitting ? t("submittingRegistration") : t("submitPaymentProofBtn")}
            </button>
          </form>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-800">
          {language === "ar" ? "سجل التحويلات وإشعارات الدفع المقدمة" : "Submitted Commission Payment Logs"}
        </div>
        {data?.payments?.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            {language === "ar" ? "لا توجد أي عمليات سداد سابقة" : "No previous commission payments recorded"}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {data?.payments?.map((pm: any) => (
              <div key={pm.id} className="p-4 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-slate-900">${pm.amount.toFixed(2)}</span>
                  <span className="text-slate-400 text-[10px] block mt-0.5">
                    {new Date(pm.createdAt).toLocaleString()}
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-extrabold ${
                    pm.status === "VERIFIED"
                      ? "bg-emerald-100 text-emerald-800"
                      : pm.status === "REJECTED"
                      ? "bg-red-100 text-red-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {pm.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
