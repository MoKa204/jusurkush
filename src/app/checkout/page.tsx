"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Landmark, MapPin, AlertCircle, Upload, CheckCircle2, FileCheck, X, Sparkles } from "lucide-react";

export default function CheckoutPage() {
  const { items, subtotal, itemCount } = useCart();
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const router = useRouter();

  // Auto-populate location from customer user profile
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    street: user?.street || "",
    city: user?.city || "",
    state: user?.state || "",
    postalCode: "",
    country: user?.country || "Sudan",
    paymentMethod: "bank_transfer",
  });

  const [paymentProof, setPaymentProof] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Sync profile data when user is loaded
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name || "",
        phone: prev.phone || user.phone || "",
        street: prev.street || user.street || "",
        city: prev.city || user.city || "",
        state: prev.state || user.state || "",
        country: prev.country || user.country || "Sudan",
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProofUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("folder", "payment-proofs");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload payment proof");

      setPaymentProof(data.url);
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/login?redirect=/checkout");
      return;
    }

    if (!paymentProof) {
      setError(
        language === "ar"
          ? "يرجى إرفاق صورة إيصال التحويل البنكي لإتمام الطلب"
          : "Please upload a photo/screenshot of your bank transfer proof"
      );
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          paymentProof,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Checkout failed");
      }

      router.push(`/orders/${data.orderId}`);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto my-12 bg-white p-8 rounded-2xl text-center border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800">
          {language === "ar" ? "سلة التسوق فارغة" : "Your Cart is Empty"}
        </h2>
        <p className="text-xs text-slate-500 mt-2">
          {language === "ar" ? "أضف منتجات إلى السلة قبل المتابعة للشراء." : "Add items to cart before proceeding to checkout."}
        </p>
      </div>
    );
  }

  // Extract unique sellers in cart for bank details
  const uniqueSellersMap: Record<string, any> = {};
  items.forEach((item) => {
    const s = item.product.seller;
    if (!uniqueSellersMap[s.id]) {
      uniqueSellersMap[s.id] = s;
    }
  });

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left: Auto-Filled Shipping & Bank Transfer Payment Proof */}
      <div className="lg:col-span-2 space-y-6">
        {/* Shipping Address */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h2 className="text-base font-bold text-slate-800 flex items-center space-x-2 space-x-reverse">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <span>{language === "ar" ? "عنوان التوصيل والشحن" : "Shipping Destination"}</span>
            </h2>
            {user?.street && (
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-200 flex items-center space-x-1 space-x-reverse">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>{language === "ar" ? "مكتمل تلقائياً من ملفك" : "Auto-filled from profile"}</span>
              </span>
            )}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs flex items-center space-x-2 space-x-reverse">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === "ar" ? "اسم المستلم الكامل" : "Recipient Full Name"}
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                  placeholder="محمد خالد"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === "ar" ? "رقم الهاتف للتواصل" : "Contact Phone"}
                </label>
                <input
                  type="text"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                  placeholder="+249 912345678"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === "ar" ? "اسم الشارع والحي / السكن" : "Street Address / Neighborhood"}
              </label>
              <input
                type="text"
                name="street"
                required
                value={formData.street}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                placeholder="حي الخرطوم 2، شارع النيل"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === "ar" ? "المدينة" : "City"}
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                  placeholder="الخرطوم"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === "ar" ? "الولاية / المنطقة" : "State"}
                </label>
                <input
                  type="text"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                  placeholder="ولاية الخرطوم"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === "ar" ? "الدولة" : "Country"}
                </label>
                <input
                  type="text"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                  placeholder="السودان"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Bank Transfer Details & Payment Proof Upload */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-800 flex items-center space-x-2 space-x-reverse border-b border-slate-100 pb-3">
            <Landmark className="w-5 h-5 text-emerald-600" />
            <span>
              {language === "ar" ? "الدفع عبر التحويل البنكي المباشر للحساب" : "Direct Bank Transfer Payment"}
            </span>
          </h2>

          {/* Seller Bank Details Card */}
          <div className="space-y-3">
            <p className="text-xs text-slate-600 font-semibold">
              {language === "ar"
                ? "يرجى تحويل المبلغ الإجمالي إلى الحساب البنكي للبائع الموضح أدناه:"
                : "Please transfer the total amount to the merchant's bank account specified below:"}
            </p>

            {Object.values(uniqueSellersMap).map((seller: any) => (
              <div key={seller.id} className="bg-slate-50 p-4 rounded-xl border border-emerald-200 text-xs space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-900">{seller.businessName}</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    {language === "ar" ? "حساب تاجر معتمد" : "Verified Bank Account"}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                  <div>
                    <span className="text-slate-400 font-semibold text-[10px] block">
                      {language === "ar" ? "اسم البنك" : "Bank Name"}
                    </span>
                    <span className="font-bold text-slate-900">
                      {seller.bankName || "بنك الخرطوم / بنك الراجحي"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold text-[10px] block">
                      {language === "ar" ? "اسم صاحب الحساب" : "Account Name"}
                    </span>
                    <span className="font-bold text-slate-900">
                      {seller.bankAccountName || `${seller.businessName} Account`}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold text-[10px] block">
                      {language === "ar" ? "رقم الحساب" : "Account Number"}
                    </span>
                    <span className="font-mono font-bold text-emerald-800 text-sm">
                      {seller.bankAccountNumber || "1002-3849-5882"}
                    </span>
                  </div>
                  {seller.bankIBAN && (
                    <div>
                      <span className="text-slate-400 font-semibold text-[10px] block">IBAN / الآيبان</span>
                      <span className="font-mono font-bold text-slate-900">{seller.bankIBAN}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Payment Proof Photo Attachment */}
          <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-200/80 space-y-3">
            <h3 className="font-bold text-slate-800 text-xs flex items-center space-x-2 space-x-reverse">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>
                {language === "ar" ? "إرفاق صورة إيصال التحويل (إثبات الدفع)" : "Attach Photo of Payment Proof"}
              </span>
            </h3>
            <p className="text-[11px] text-slate-600">
              {language === "ar"
                ? "قم بالتقاط صورة أو إرفاق لقطة شاشة لإشعار التحويل البنكي ليتم مراجعته وتأكيده من البائع."
                : "Attach a screenshot or photo of your bank transfer receipt so the merchant can verify payment."}
            </p>

            {paymentProof ? (
              <div className="relative w-40 h-28 rounded-lg overflow-hidden border-2 border-emerald-600 shadow group">
                <img src={paymentProof} alt="Payment Proof Slip" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setPaymentProof("")}
                  className="absolute top-1.5 right-1.5 bg-red-600 text-white p-1 rounded-full hover:scale-110 transition"
                  title="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <div className="absolute bottom-0 inset-x-0 bg-emerald-700 text-white text-[9px] font-bold text-center py-0.5">
                  {language === "ar" ? "تم إرفاق الإيصال بنجاح" : "Receipt Attached"}
                </div>
              </div>
            ) : (
              <label className="inline-flex items-center space-x-2 space-x-reverse px-5 py-2.5 bg-white hover:bg-emerald-50 text-emerald-700 font-bold border border-emerald-300 rounded-lg cursor-pointer transition shadow-sm text-xs">
                <Upload className="w-4 h-4 text-emerald-600" />
                <span>
                  {uploading
                    ? language === "ar" ? "جاري رفع الصورة..." : "Uploading..."
                    : language === "ar" ? "إرفاق صورة الإشعار" : "Upload Transfer Receipt"}
                </span>
                <input type="file" accept="image/*" onChange={handleProofUpload} className="hidden" />
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Right: Order Summary Sidebar */}
      <div className="space-y-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-6">
          <h3 className="font-bold text-slate-800 text-base mb-4 pb-2 border-b border-slate-100">
            {language === "ar" ? "ملخص الطلب" : "Order Summary"}
          </h3>

          {/* Item List */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1 mb-4 text-xs">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-slate-700">
                <div className="truncate pr-2">
                  <span className="font-semibold text-slate-900">{item.product.name}</span>
                  <span className="text-slate-400 block text-[10px]">
                    {item.quantity} × ${item.product.price.toFixed(2)}
                  </span>
                </div>
                <span className="font-bold text-slate-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>{t("subtotal")} ({itemCount} {language === "ar" ? "منتج" : "items"})</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>{language === "ar" ? "رسوم الشحن" : "Shipping"}</span>
              <span className="text-emerald-600 font-bold">{language === "ar" ? "مجاني" : "FREE"}</span>
            </div>
            <div className="flex justify-between text-slate-900 font-bold text-base pt-2 border-t border-slate-100">
              <span>{language === "ar" ? "إجمالي المبلغ المطلوب" : "Total Payable"}</span>
              <span className="text-emerald-700">${subtotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            form="checkout-form"
            disabled={loading || uploading || !paymentProof}
            className="w-full mt-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition flex items-center justify-center space-x-2 space-x-reverse shadow disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {loading
                ? language === "ar" ? "جاري إرسال الطلب..." : "Submitting Order..."
                : language === "ar" ? "تاكيد وإرسال إثبات الدفع" : "Submit Order & Payment Proof"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
