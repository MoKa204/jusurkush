"use client";

import React, { useEffect, useState } from "react";
import { Truck, MapPin, Phone, User, Upload, CheckCircle2, FileCheck, Package, Clock, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function DeliveryDashboardPage() {
  const { language } = useLanguage();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeProofUpload, setActiveProofUpload] = useState<string | null>(null);
  const [proofPhoto, setProofPhoto] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = () => {
    setLoading(true);
    fetch("/api/delivery/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "delivery-proofs");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setProofPhoto(data.url);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleMarkDelivered = async (orderId: string) => {
    if (!proofPhoto) {
      alert(
        language === "ar"
          ? "يرجى التقاط وإرفاق صورة إثبات التسليم للزبون أولاً"
          : "Please attach evidence photo of delivery first"
      );
      return;
    }

    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/delivery/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "DELIVERED",
          deliveryProofPhoto: proofPhoto,
        }),
      });

      if (res.ok) {
        setActiveProofUpload(null);
        setProofPhoto("");
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return <div className="bg-white p-8 rounded-2xl border border-slate-200 animate-pulse h-64" />;
  }

  return (
    <div className="space-y-6 text-xs">
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            {language === "ar" ? "قائمة طلبات التوصيل الميدانية" : "Active Dispatch & Doorstep Deliveries"}
          </h1>
          <p className="text-xs text-slate-500">
            {language === "ar"
              ? "استعرض تفاصيل الشحنات، تواصل مع الزبون، وارفع إثبات تسليم الشحنة"
              : "Review delivery destinations, contact recipients directly, and upload delivery proof photo"}
          </p>
        </div>
        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
          {orders.length} {language === "ar" ? "شحنة" : "Packages"}
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Truck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">
            {language === "ar" ? "لا يوجد طلبات توصيل حالياً" : "No Delivery Orders Pending"}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {language === "ar" ? "سيتم إدراج الشحنات الجديدة فور تجهيزها." : "New delivery dispatches will appear here."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => {
            const addr = o.shippingAddress;
            const isDelivered = o.status === "DELIVERED";
            return (
              <div key={o.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                {/* Header */}
                <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between font-bold text-slate-800 gap-2">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-emerald-700">
                      {language === "ar" ? "شحنة رقم #" : "Order #"}
                      {o.id.substring(0, 8)}
                    </span>
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
                  </div>
                </div>

                {/* Details Grid */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Recipient Info & Location */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="font-bold text-slate-900 flex items-center space-x-1.5 space-x-reverse">
                        <User className="w-4 h-4 text-emerald-600" />
                        <span>{addr.fullName || o.buyer?.name}</span>
                      </span>
                    </div>

                    <div className="flex items-start space-x-1.5 space-x-reverse text-slate-700">
                      <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">{addr.street}</p>
                        <p className="text-slate-500">{addr.city}, {addr.state} {addr.country}</p>
                      </div>
                    </div>

                    {/* Direct Contact Phone Action */}
                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                      <div className="flex items-center space-x-1 space-x-reverse text-slate-800 font-bold">
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{addr.phone || o.buyer?.phone || "N/A"}</span>
                      </div>
                      {(addr.phone || o.buyer?.phone) && (
                        <a
                          href={`tel:${addr.phone || o.buyer?.phone}`}
                          className="px-3 py-1 bg-emerald-600 text-white rounded-lg font-bold text-[10px] hover:bg-emerald-700 transition shadow-sm"
                        >
                          {language === "ar" ? "الاتصال بالزبون" : "Call Customer"}
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-2">
                    <span className="font-bold text-slate-800 block text-[11px]">
                      {language === "ar" ? "محتويات الشحنة" : "Package Content"}
                    </span>
                    <div className="space-y-1.5 max-h-36 overflow-y-auto">
                      {o.items.map((it: any) => (
                        <div key={it.id} className="p-2 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                          <span className="font-semibold text-slate-800 truncate max-w-[150px]">
                            {it.product.name}
                          </span>
                          <span className="font-bold text-slate-600 text-[10px]">Qty: {it.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Evidence Upload & Delivered Action */}
                  <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="font-bold text-slate-800 text-[11px] flex items-center space-x-1 space-x-reverse mb-1">
                        <FileCheck className="w-4 h-4 text-emerald-600" />
                        <span>{language === "ar" ? "إثبات التوصيل والتسليم" : "Doorstep Delivery Evidence"}</span>
                      </span>

                      {o.deliveryProofPhoto ? (
                        <div className="mt-2 flex items-center space-x-2 space-x-reverse">
                          <img
                            src={o.deliveryProofPhoto}
                            alt="Delivery Proof"
                            className="w-14 h-14 object-cover rounded-lg border border-emerald-500 shadow"
                          />
                          <span className="text-emerald-800 font-bold text-[10px] flex items-center space-x-1 space-x-reverse">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{language === "ar" ? "تم التسليم بنجاح" : "Evidence Recorded"}</span>
                          </span>
                        </div>
                      ) : (
                        <div className="mt-2">
                          {activeProofUpload === o.id ? (
                            <div className="space-y-2">
                              {proofPhoto ? (
                                <div className="relative w-24 h-16 rounded-lg overflow-hidden border-2 border-emerald-600">
                                  <img src={proofPhoto} alt="" className="w-full h-full object-cover" />
                                  <button
                                    type="button"
                                    onClick={() => setProofPhoto("")}
                                    className="absolute top-0.5 right-0.5 bg-red-600 text-white p-0.5 rounded-full"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              ) : (
                                <label className="inline-flex items-center space-x-1.5 space-x-reverse px-3 py-1.5 bg-white text-emerald-700 font-bold border border-emerald-300 rounded-lg cursor-pointer text-[10px]">
                                  <Upload className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>
                                    {uploading
                                      ? language === "ar" ? "جاري الرفع..." : "Uploading..."
                                      : language === "ar" ? "التقاط صورة التسليم" : "Attach Doorstep Photo"}
                                  </span>
                                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                                </label>
                              )}
                              <button
                                onClick={() => handleMarkDelivered(o.id)}
                                disabled={updatingId === o.id || !proofPhoto}
                                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px] disabled:opacity-50 shadow"
                              >
                                {language === "ar" ? "تأكيد وتسليم الشحنة للزبون" : "Confirm Delivery"}
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setActiveProofUpload(o.id);
                                setProofPhoto("");
                              }}
                              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition shadow flex items-center justify-center space-x-1 space-x-reverse"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>{language === "ar" ? "تسليم الشحنة وإرفاق الإثبات" : "Mark as Delivered"}</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
