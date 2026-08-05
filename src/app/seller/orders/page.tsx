"use client";

import React, { useEffect, useState } from "react";
import { ShoppingBag, MapPin, User, FileCheck, CheckCircle2, Eye, Landmark } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function SellerOrdersPage() {
  const { language } = useLanguage();
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewProof, setPreviewProof] = useState<string | null>(null);

  const fetchOrders = () => {
    setLoading(true);
    fetch("/api/seller/orders")
      .then((res) => res.json())
      .then((data) => setOrderItems(data.orderItems || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="bg-white p-8 rounded-2xl border border-slate-200 animate-pulse h-64" />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            {language === "ar" ? "الطلبات الواردة وإشعارات التحويل" : "Orders Received & Payment Receipts"}
          </h1>
          <p className="text-xs text-slate-500">
            {language === "ar"
              ? "راجع طلبات المشتريات وصور إيصالات التحويل البنكي المرفقة"
              : "Inspect buyer orders and verify attached bank transfer receipts"}
          </p>
        </div>
        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
          {orderItems.length} {language === "ar" ? "طلب" : "Items"}
        </span>
      </div>

      {orderItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">
            {language === "ar" ? "لا يوجد طلبات واردة بعد" : "No Orders Received Yet"}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {language === "ar"
              ? "عندما يشتري الزبائن منتجاتك ويرفقون إشعار الدفع، ستظهر البيانات هنا."
              : "When buyers purchase your products and attach bank transfer receipts, details will appear here."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orderItems.map((item) => {
            const addr = item.order.shippingAddress;
            const proofUrl = item.order.paymentProof;
            return (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm text-xs">
                {/* Order Top Bar */}
                <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between font-bold text-slate-800 gap-2">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-emerald-700">
                      {language === "ar" ? "عنصر الطلب #" : "Order Item #"}
                      {item.id.substring(0, 8)}
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="text-slate-500">
                      {language === "ar" ? "رقم الطلب: " : "Order ID: "}
                      {item.order.id.substring(0, 8)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="bg-amber-100 text-amber-900 text-[10px] px-2.5 py-0.5 rounded-md font-black uppercase">
                      {item.order.status}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Product Details */}
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <img
                      src={JSON.parse(item.product.images)[0] || "/placeholder.jpg"}
                      alt=""
                      className="w-16 h-16 object-cover rounded-lg border border-slate-200 flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{item.product.name}</h4>
                      <p className="text-slate-500 mt-1">
                        {language === "ar" ? "الكمية المطلوبة: " : "Quantity: "}
                        <span className="font-bold text-slate-800">{item.quantity}</span>
                      </p>
                      <p className="text-emerald-700 font-bold text-sm mt-1">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Buyer & Auto-Filled Shipping Address */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center space-x-1.5 space-x-reverse font-bold text-slate-800">
                      <User className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{language === "ar" ? "الزبون: " : "Buyer: "}{item.order.buyer?.name}</span>
                    </div>
                    <div className="flex items-start space-x-1.5 space-x-reverse text-slate-600 text-[11px]">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-800">{addr.fullName} ({addr.phone})</p>
                        <p>{addr.street}, {addr.city}, {addr.state} {addr.country}</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Transfer Proof Receipt View */}
                  <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 flex flex-col justify-between space-y-2">
                    <div>
                      <span className="font-bold text-slate-800 text-[11px] flex items-center space-x-1 space-x-reverse mb-1">
                        <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{language === "ar" ? "صورة إشعار التحويل البنكي" : "Bank Transfer Receipt"}</span>
                      </span>
                      {proofUrl ? (
                        <div className="flex items-center space-x-3 space-x-reverse mt-2">
                          <img
                            src={proofUrl}
                            alt="Receipt"
                            className="w-12 h-12 object-cover rounded-lg border border-emerald-400 shadow-sm cursor-pointer hover:scale-105 transition"
                            onClick={() => setPreviewProof(proofUrl)}
                          />
                          <button
                            type="button"
                            onClick={() => setPreviewProof(proofUrl)}
                            className="px-2.5 py-1 bg-white hover:bg-emerald-100 text-emerald-800 font-bold border border-emerald-300 rounded-md text-[10px] flex items-center space-x-1 space-x-reverse shadow-sm"
                          >
                            <Eye className="w-3 h-3 text-emerald-600" />
                            <span>{language === "ar" ? "تكبير الإيصال" : "View Receipt"}</span>
                          </button>
                        </div>
                      ) : (
                        <p className="text-slate-400 italic text-[10px]">
                          {language === "ar" ? "لم يتم إرفاق إيصال بعد" : "No receipt attached"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Proof Preview Modal */}
      {previewProof && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-slate-900 text-sm">
                {language === "ar" ? "معاينة إشعار التحويل البنكي المرفق" : "Attached Bank Transfer Slip"}
              </h3>
              <button
                onClick={() => setPreviewProof(null)}
                className="text-slate-500 hover:text-slate-800 font-bold text-xs"
              >
                ✕
              </button>
            </div>
            <div className="max-h-96 overflow-auto rounded-lg border border-slate-200">
              <img src={previewProof} alt="Full Transfer Receipt" className="w-full h-auto object-contain" />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setPreviewProof(null)}
                className="px-5 py-2 bg-slate-900 text-white font-bold rounded-lg text-xs"
              >
                {language === "ar" ? "إغلاق" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
