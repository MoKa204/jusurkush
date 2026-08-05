"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Package, MapPin, Store, ArrowRight, FileCheck, Landmark } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function OrderConfirmationPage() {
  const params = useParams();
  const id = params.id as string;
  const { t, language } = useLanguage();

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        const found = (data.orders || []).find((o: any) => o.id === id);
        setOrder(found || null);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="max-w-3xl mx-auto my-8 bg-white p-8 rounded-2xl border border-slate-200 animate-pulse h-96" />;
  }

  if (!order) {
    return (
      <div className="max-w-xl mx-auto my-12 bg-white p-8 rounded-2xl text-center border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800">
          {language === "ar" ? "الطلب غير موجود" : "Order Not Found"}
        </h2>
        <p className="text-xs text-slate-500 mt-2">
          {language === "ar" ? "تعذر العثور على طلب الشراء المحدد." : "The requested order could not be found."}
        </p>
      </div>
    );
  }

  const shipping = order.shippingAddress || {};

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Banner */}
      <div className="bg-emerald-600 text-white p-8 rounded-2xl shadow-md text-center space-y-3">
        <CheckCircle2 className="w-16 h-16 mx-auto text-emerald-200 drop-shadow" />
        <h1 className="text-2xl font-black tracking-tight">
          {language === "ar" ? "تم إرسال الطلب وإثبات الدفع بنجاح!" : "Order & Payment Proof Submitted!"}
        </h1>
        <p className="text-xs text-emerald-100 max-w-md mx-auto leading-relaxed">
          {language === "ar"
            ? "شكراً لتسوقك من جسور كوش. تم استلام إشعار التحويل البنكي وهو قيد المراجعة من البائع لتجهيز الشحنة."
            : "Thank you for shopping on JusurKush. Your bank transfer receipt has been attached and is being verified by the merchant."}
        </p>
        <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
          {language === "ar" ? "رقم الطلب: " : "Order ID: "}#{order.id.substring(0, 8)}
        </span>
      </div>

      {/* Details Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-xs">
        {/* Status Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-slate-400 font-semibold block">{language === "ar" ? "حالة الدفع والطلب" : "Order Payment Status"}</span>
            <span className="bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-md text-[10px] uppercase mt-1 inline-block">
              {order.status}
            </span>
          </div>
          <div className="text-right rtl:text-left">
            <span className="text-slate-400 font-semibold block">{language === "ar" ? "طريقة الدفع" : "Payment Method"}</span>
            <span className="font-bold text-slate-800 flex items-center space-x-1 space-x-reverse justify-end">
              <Landmark className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === "ar" ? "تحويل بنكي مباشر" : "Direct Bank Transfer"}</span>
            </span>
          </div>
        </div>

        {/* Shipping Location */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
          <h3 className="font-bold text-slate-800 flex items-center space-x-1.5 space-x-reverse mb-1">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{language === "ar" ? "عنوان التوصيل" : "Delivery Destination"}</span>
          </h3>
          <p className="font-semibold text-slate-800">{shipping.fullName} ({shipping.phone})</p>
          <p className="text-slate-600">{shipping.street}, {shipping.city}, {shipping.state} {shipping.country}</p>
        </div>

        {/* Line Items */}
        <div>
          <h3 className="font-bold text-slate-800 mb-3 flex items-center space-x-1.5 space-x-reverse">
            <Package className="w-4 h-4 text-emerald-600" />
            <span>{language === "ar" ? "عناصر الشحنة" : "Order Items"}</span>
          </h3>
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
            {order.items.map((item: any) => (
              <div key={item.id} className="p-3 bg-white flex items-center justify-between">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <img
                    src={item.product.images ? JSON.parse(item.product.images)[0] : "/placeholder.jpg"}
                    alt=""
                    className="w-12 h-12 object-cover rounded-lg border border-slate-200"
                  />
                  <div>
                    <h4 className="font-bold text-slate-800">{item.product.name}</h4>
                    <span className="text-slate-500 text-[10px]">
                      {language === "ar" ? "التاجر: " : "Merchant: "}{item.seller?.businessName}
                    </span>
                  </div>
                </div>
                <div className="text-right rtl:text-left">
                  <span className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                  <span className="text-slate-400 block text-[10px]">{item.quantity} × ${item.price.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Proof Slip View */}
        {order.paymentProof && (
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <FileCheck className="w-5 h-5 text-emerald-600" />
              <div>
                <span className="font-bold text-slate-800 block">{language === "ar" ? "إشعار الدفع المرفق" : "Attached Payment Proof"}</span>
                <span className="text-emerald-700 text-[10px]">{language === "ar" ? "تم رفع إيصال التحويل بنجاح" : "Transfer receipt uploaded"}</span>
              </div>
            </div>
            <a
              href={order.paymentProof}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 bg-white hover:bg-emerald-100 text-emerald-800 font-bold border border-emerald-300 rounded-md text-[10px]"
            >
              {language === "ar" ? "معاينة الإيصال" : "View Receipt"}
            </a>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2 flex justify-center">
          <Link
            href="/profile/orders"
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow flex items-center space-x-2 space-x-reverse"
          >
            <span>{t("myOrders")}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
