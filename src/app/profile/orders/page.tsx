"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Clock, CheckCircle2, RotateCcw, Upload, Video, Image as ImageIcon, AlertCircle, FileText, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const RETURN_REASONS_AR = [
  "منتج تالف أو مكسور",
  "وصل منتج مختلف عن المطلق",
  "أجزاء أو ملحقات مفقودة",
  "معيب أو لا يعمل بشكل صحيح",
  "المقاس أو المواصفات غير مطابقة",
  "سبب آخر (شكوى مخصصة)",
];

const RETURN_REASONS_EN = [
  "Damaged or Broken Item",
  "Different Item Delivered",
  "Missing Parts or Accessories",
  "Defective or Not Working",
  "Size / Specification Mismatch",
  "Other Custom Issue",
];

export default function CustomerOrdersPage() {
  const { language } = useLanguage();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Return Modal State
  const [returnOrderId, setReturnOrderId] = useState<string | null>(null);
  const [selectedReason, setSelectedReason] = useState<string>(RETURN_REASONS_AR[0]);
  const [customComplaint, setCustomComplaint] = useState<string>("");
  const [returnPhotos, setReturnPhotos] = useState<string[]>([]);
  const [returnVideo, setReturnVideo] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [submittingReturn, setSubmittingReturn] = useState(false);
  const [returnError, setReturnError] = useState<string | null>(null);

  const fetchOrders = () => {
    setLoading(true);
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setReturnError(null);
    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        formData.append("folder", "return-evidence");

        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (res.ok && data.url) {
          uploadedUrls.push(data.url);
        }
      }
      setReturnPhotos((prev) => [...prev, ...uploadedUrls]);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setReturnError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "return-videos");

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok && data.url) {
        setReturnVideo(data.url);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmitReturn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!returnOrderId) return;

    if (!returnVideo && returnPhotos.length < 6) {
      setReturnError(
        language === "ar"
          ? "يجب إرفاق فيديو أو رفع 6 صور على الأقل للمنتج لتقديم طلب الإرجاع"
          : "You must attach a video OR at least 6 product photos to submit a return."
      );
      return;
    }

    setSubmittingReturn(true);
    setReturnError(null);
    try {
      const res = await fetch("/api/orders/return", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: returnOrderId,
          reason: selectedReason,
          customComplaint,
          returnPhotos,
          returnVideo,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit return");

      setReturnOrderId(null);
      setReturnPhotos([]);
      setReturnVideo("");
      setCustomComplaint("");
      fetchOrders();
    } catch (err: any) {
      setReturnError(err.message);
    } finally {
      setSubmittingReturn(false);
    }
  };

  if (loading) {
    return <div className="bg-white p-8 rounded-2xl border border-slate-200 animate-pulse h-64" />;
  }

  const returnReasons = language === "ar" ? RETURN_REASONS_AR : RETURN_REASONS_EN;

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-xs">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center space-x-2 space-x-reverse">
            <Package className="w-5 h-5 text-emerald-600" />
            <span>{language === "ar" ? "طلباتي المكتملة والسابقة" : "My Orders & Purchases"}</span>
          </h1>
          <p className="text-xs text-slate-500">
            {language === "ar"
              ? "استعرض حالة الشحنات، تفاصيل المشتريات، وإرجاع المنتجات المستلمة"
              : "Track order status, delivery progress, and request returns for delivered items"}
          </p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">
            {language === "ar" ? "لا توجد لديك طلبات سابقة" : "No Orders Yet"}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {language === "ar" ? "عند إتمام أي عملية شراء، ستظهر جميع تفاصيل شحناتك هنا." : "Purchased items will appear here."}
          </p>
          <Link href="/" className="inline-block mt-4 px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl shadow-sm">
            {language === "ar" ? "تصفح المنتجات الآن" : "Browse Products"}
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => {
            const isDelivered = o.status === "DELIVERED";
            const returnRequested = o.returnStatus === "REQUESTED";
            return (
              <div key={o.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between font-bold text-slate-800">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span>#{o.id.substring(0, 8)}</span>
                    <span className="text-slate-300">|</span>
                    <span className="text-slate-500">{new Date(o.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase ${
                        isDelivered ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-900"
                      }`}
                    >
                      {o.status}
                    </span>
                    {returnRequested && (
                      <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {language === "ar" ? "طلب إرجاع قيد المراجعة" : "Return Requested"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="divide-y divide-slate-100">
                    {o.items.map((it: any) => (
                      <div key={it.id} className="py-2.5 flex items-center justify-between">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-500 text-xs">
                            x{it.quantity}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{it.product.name}</p>
                            <p className="text-[10px] text-slate-400">Seller: {it.seller?.businessName}</p>
                          </div>
                        </div>
                        <span className="font-bold text-emerald-700">${(it.price * it.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-slate-500 text-[11px] block">{language === "ar" ? "المجموع الكلي:" : "Total Paid:"}</span>
                      <span className="text-base font-black text-slate-900">${o.totalAmount.toFixed(2)}</span>
                    </div>

                    {/* Return Action Button: Only visible if order is DELIVERED */}
                    {isDelivered && !returnRequested && (
                      <button
                        onClick={() => {
                          setReturnOrderId(o.id);
                          setReturnPhotos([]);
                          setReturnVideo("");
                          setReturnError(null);
                        }}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center space-x-1.5 space-x-reverse transition border border-slate-300"
                      >
                        <RotateCcw className="w-4 h-4 text-emerald-600" />
                        <span>{language === "ar" ? "طلب إرجاع المنتج" : "Request Return"}</span>
                      </button>
                    )}

                    {!isDelivered && (
                      <span className="text-[10px] text-slate-400 italic">
                        {language === "ar"
                          ? "يمكنك طلب إرجاع المنتج فقط بعد استلام الشحنة وتوصيلها."
                          : "Returns can only be requested after the item has been delivered."}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Return Request Modal */}
      {returnOrderId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2 space-x-reverse">
                <RotateCcw className="w-4 h-4 text-emerald-600" />
                <span>{language === "ar" ? "تقديم طلب إرجاع المنتج" : "Submit Product Return Request"}</span>
              </h3>
              <button onClick={() => setReturnOrderId(null)} className="text-slate-400 hover:text-slate-700 font-bold text-xs">
                ✕
              </button>
            </div>

            {returnError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center space-x-2 space-x-reverse">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{returnError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitReturn} className="space-y-4">
              {/* 1. Multiple Choice Reason */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {language === "ar" ? "حدد سبب الإرجاع الرئيسي *" : "Select Reason for Return *"}
                </label>
                <select
                  value={selectedReason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  {returnReasons.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Custom Complaint Detail */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {language === "ar" ? "شرح الشكوى والمشكلة التفصيلية (اختياري)" : "Detailed Explanation / Custom Complaint"}
                </label>
                <textarea
                  rows={3}
                  value={customComplaint}
                  onChange={(e) => setCustomComplaint(e.target.value)}
                  placeholder={language === "ar" ? "اكتب تفاصيل مشكلة المنتج بالتفصيل هنا..." : "Describe what was wrong with the product..."}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* 3. Photo & Video Upload (Min 6 photos OR 1 video required) */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <span className="block font-bold text-slate-800 text-xs">
                  {language === "ar"
                    ? "إرفاق الأدلة والبراهم: فيديو أو 6 صور للمنتج على الأقل *"
                    : "Evidence Attachment: Video OR at least 6 Photos required *"}
                </span>

                <div className="grid grid-cols-2 gap-3">
                  {/* Upload Photos */}
                  <div>
                    <label className="flex items-center justify-center space-x-1.5 space-x-reverse px-3 py-2 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl cursor-pointer font-bold text-slate-700 shadow-sm text-xs">
                      <ImageIcon className="w-4 h-4 text-emerald-600" />
                      <span>{language === "ar" ? "رفع صور المنتج" : "Upload Photos"}</span>
                      <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
                    </label>
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      {language === "ar"
                        ? `تم رفع ${returnPhotos.length} / 6 صور كحد أدنى`
                        : `${returnPhotos.length} / 6 photos uploaded`}
                    </span>
                  </div>

                  {/* Upload Video */}
                  <div>
                    <label className="flex items-center justify-center space-x-1.5 space-x-reverse px-3 py-2 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl cursor-pointer font-bold text-slate-700 shadow-sm text-xs">
                      <Video className="w-4 h-4 text-purple-600" />
                      <span>{language === "ar" ? "رفع فيديو للمشكلة" : "Upload Video"}</span>
                      <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                    </label>
                    {returnVideo && (
                      <span className="text-[10px] text-purple-700 font-bold mt-1 block">
                        {language === "ar" ? "✓ تم إرفاق الفيديو" : "✓ Video Attached"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Uploaded Photos Grid Preview */}
                {returnPhotos.length > 0 && (
                  <div className="grid grid-cols-6 gap-2 pt-2 border-t border-slate-200">
                    {returnPhotos.map((url, idx) => (
                      <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-slate-300">
                        <img src={url} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setReturnPhotos((prev) => prev.filter((_, i) => i !== idx))}
                          className="absolute top-0.5 right-0.5 bg-red-600 text-white rounded-full p-0.5 text-[8px]"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-3 space-x-reverse pt-2">
                <button
                  type="button"
                  onClick={() => setReturnOrderId(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  {language === "ar" ? "إلغاء" : "Cancel"}
                </button>
                <button
                  type="submit"
                  disabled={submittingReturn || uploading}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md disabled:opacity-50"
                >
                  {submittingReturn
                    ? language === "ar" ? "جاري التقديم..." : "Submitting..."
                    : language === "ar" ? "إرسال طلب الإرجاع" : "Submit Return Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
