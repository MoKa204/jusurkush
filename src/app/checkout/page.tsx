"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  CreditCard,
  Building2,
  Upload,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Sparkles,
  ShieldAlert,
  Banknote,
} from "lucide-react";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Address
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("Sudan");

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<"bank_transfer" | "cod">("bank_transfer");
  const [paymentProof, setPaymentProof] = useState<string>("");
  const [uploadingProof, setUploadingProof] = useState(false);

  // Passport Upload State for Checkout Verification Modal
  const [passportPhoto, setPassportPhoto] = useState<string>("");
  const [uploadingPassport, setUploadingPassport] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.name) setFullName(user.name);
      if (user.phone) setPhone(user.phone);
      if (user.street) setStreet(user.street);
      if (user.city) setCity(user.city);
      if (user.state) setState(user.state);
      if (user.country) setCountry(user.country);
    }
  }, [user]);

  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setCartItems(data.items || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingProof(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setPaymentProof(dataUrl);
      setUploadingProof(false);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "payment-proofs");

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.url) {
          setPaymentProof(data.url);
        }
      } catch (err) {
        // Keep dataUrl fallback
      }
    };
    reader.onerror = () => {
      setError(language === "ar" ? "فشل قراءة صورة الإيصال" : "Failed to read receipt image");
      setUploadingProof(false);
    };
    reader.readAsDataURL(file);
  };

  const handlePassportUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPassport(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setPassportPhoto(dataUrl);
      setUploadingPassport(false);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "passports");

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.url) {
          setPassportPhoto(data.url);
        }

        await fetch("/api/profile/passport", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ passportPhoto: data.url || dataUrl }),
        });
      } catch (err) {
        // Keep dataUrl fallback
      }
    };
    reader.onerror = () => {
      setError(language === "ar" ? "فشل قراءة صورة الجواز" : "Failed to read passport image");
      setUploadingPassport(false);
    };
    reader.readAsDataURL(file);
  };

  const isVerified = user?.verificationStatus === "VERIFIED";

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === "bank_transfer" && !isVerified) {
      setError(
        language === "ar"
          ? "يتطلب الدفع المصرفي إجراء التحقق من جواز السفر أولاً. يمكنك رفع جوازك أو اختيار الدفع عند الاستلام."
          : "Bank Transfer payment requires Passport Verification. Please upload your passport or select Cash on Delivery."
      );
      return;
    }

    if (paymentMethod === "bank_transfer" && !paymentProof) {
      setError(
        language === "ar"
          ? "يرجى رفع صورة إيصال التحويل المصرفي لإتمام الطلب"
          : "Please upload bank transfer receipt proof to complete order"
      );
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          street,
          city,
          state,
          country,
          paymentMethod,
          paymentProof: paymentMethod === "bank_transfer" ? paymentProof : null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order placement failed");

      router.push(`/orders/${data.orderId || data.order?.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="bg-white p-8 rounded-2xl border border-slate-200 animate-pulse h-64" />;
  }

  const items = cartItems;
  const totalAmount = items.reduce((acc: number, it: any) => acc + (it.product?.price || 0) * it.quantity, 0);
  const sampleSeller = items[0]?.product?.seller;

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-xs">
      <h1 className="text-xl font-bold text-slate-800">
        {language === "ar" ? "إتمام عملية الشراء والسداد" : "Checkout & Order Confirmation"}
      </h1>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl font-medium flex items-center space-x-2 space-x-reverse">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-bold text-slate-800 text-sm flex items-center space-x-2 space-x-reverse">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>{language === "ar" ? "عنوان وموقع التوصيل" : "Delivery Destination Address"}</span>
              </h2>
              {user?.city && (
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full border border-emerald-200 flex items-center space-x-1 space-x-reverse">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>{language === "ar" ? "مكتمل تلقائياً من ملفك" : "Auto-filled from Profile"}</span>
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  {language === "ar" ? "الاسم الكامل *" : "Full Name *"}
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  {language === "ar" ? "رقم الهاتف *" : "Phone Number *"}
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-slate-600 font-semibold mb-1">
                  {language === "ar" ? "اسم الشارع والحي *" : "Street & Neighborhood *"}
                </label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  {language === "ar" ? "المدينة *" : "City *"}
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  {language === "ar" ? "الولاية / المنطقة *" : "State / Region *"}
                </label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-3 flex items-center space-x-2 space-x-reverse">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>{language === "ar" ? "وسيلة وطريقة الدفع" : "Payment Options"}</span>
            </h2>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("bank_transfer")}
                className={`p-4 rounded-xl border text-right rtl:text-right font-bold transition flex items-center justify-between ${
                  paymentMethod === "bank_transfer"
                    ? "border-emerald-600 bg-emerald-50/50 text-emerald-950"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div>
                  <span className="block text-xs">{language === "ar" ? "تحويل مصرفي مباشر" : "Bank Transfer"}</span>
                  <span className="text-[10px] text-slate-500 font-normal">
                    {language === "ar" ? "يتطلب إرفاق الإيصال وجواز سفر موثق" : "Requires receipt & verified passport"}
                  </span>
                </div>
                <Building2 className="w-5 h-5 text-emerald-600" />
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`p-4 rounded-xl border text-right rtl:text-right font-bold transition flex items-center justify-between ${
                  paymentMethod === "cod"
                    ? "border-emerald-600 bg-emerald-50/50 text-emerald-950"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div>
                  <span className="block text-xs">{language === "ar" ? "الدفع عند الاستلام" : "Cash on Delivery"}</span>
                  <span className="text-[10px] text-slate-500 font-normal">
                    {language === "ar" ? "متاح لجميع العملاء" : "Available for all customers"}
                  </span>
                </div>
                <Banknote className="w-5 h-5 text-emerald-600" />
              </button>
            </div>

            {/* Verification Status Warning for Non-COD */}
            {paymentMethod === "bank_transfer" && !isVerified && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                <div className="flex items-center space-x-2 space-x-reverse text-amber-900 font-bold">
                  <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span>
                    {language === "ar"
                      ? "الدفع المصرفي يتطلب توثيق جواز السفر"
                      : "Passport Verification Required for Bank Transfer"}
                  </span>
                </div>
                <p className="text-[11px] text-amber-800">
                  {language === "ar"
                    ? "لحماية التعاملات المالية، يرجى رفع صورة جواز السفر أدناه أو اختيار الدفع عند الاستلام (COD)."
                    : "To secure digital transactions, please upload your passport image below or choose Cash on Delivery."}
                </p>
                <div className="pt-2">
                  <label className="inline-flex items-center space-x-2 space-x-reverse px-3 py-1.5 bg-amber-600 text-white rounded-lg font-bold cursor-pointer text-xs shadow-sm hover:bg-amber-700">
                    <Upload className="w-3.5 h-3.5" />
                    <span>
                      {uploadingPassport
                        ? language === "ar" ? "جاري الرفع..." : "Uploading..."
                        : language === "ar" ? "رفع صورة جواز السفر" : "Upload Passport Image"}
                    </span>
                    <input type="file" accept="image/*" onChange={handlePassportUpload} className="hidden" />
                  </label>
                  {passportPhoto && (
                    <span className="text-[10px] text-emerald-800 font-bold block mt-1">
                      {language === "ar" ? "✓ تم رفع الجواز وهو قيد التوثيق" : "✓ Passport uploaded & pending audit"}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Bank Transfer Details & Receipt Upload */}
            {paymentMethod === "bank_transfer" && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <span className="font-bold text-slate-800 block">
                  {language === "ar" ? "بيانات الحساب المصرفي للبائع / المنصة:" : "Merchant Bank Account Details:"}
                </span>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-slate-400 block">{language === "ar" ? "اسم البنك:" : "Bank Name:"}</span>
                    <span className="font-bold text-slate-800">{sampleSeller?.bankName || "Bank of Khartoum / Al Rajhi"}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-slate-400 block">{language === "ar" ? "اسم الحساب:" : "Account Name:"}</span>
                    <span className="font-bold text-slate-800">{sampleSeller?.bankAccountName || "JusurKush Merchant"}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 col-span-2">
                    <span className="text-slate-400 block">{language === "ar" ? "رقم الحساب:" : "Account Number:"}</span>
                    <span className="font-bold text-emerald-700 tracking-wider">
                      {sampleSeller?.bankAccountNumber || "1002-3849-5882"}
                    </span>
                  </div>
                </div>

                {/* Upload Transfer Receipt */}
                <div className="pt-2 border-t border-slate-200">
                  <label className="block font-bold text-slate-700 mb-1">
                    {language === "ar" ? "إرفاق إيصال تحويل المبلغ *" : "Attach Bank Transfer Slip Photo *"}
                  </label>
                  <label className="flex items-center justify-center space-x-2 space-x-reverse p-3 bg-white border border-dashed border-emerald-400 hover:bg-emerald-50/50 rounded-xl cursor-pointer font-bold text-emerald-700 text-xs shadow-sm transition">
                    <Upload className="w-4 h-4 text-emerald-600" />
                    <span>
                      {uploadingProof
                        ? language === "ar" ? "جاري رفع صورة الإيصال..." : "Uploading Receipt..."
                        : language === "ar" ? "اضغط لرفع صورة الإيصال" : "Click to Upload Transfer Proof"}
                    </span>
                    <input type="file" accept="image/*" onChange={handleProofUpload} className="hidden" />
                  </label>

                  {paymentProof && (
                    <div className="mt-2 flex items-center space-x-2 space-x-reverse">
                      <img src={paymentProof} alt="Proof" className="w-12 h-12 object-cover rounded-lg border border-emerald-500 shadow" />
                      <span className="text-[10px] text-emerald-800 font-bold flex items-center space-x-1 space-x-reverse">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{language === "ar" ? "تم إرفاق الإيصال بنجاح" : "Receipt Proof Attached"}</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit space-y-4">
          <h2 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-3">
            {language === "ar" ? "ملخص الطلب والمبلغ" : "Order Summary"}
          </h2>

          <div className="divide-y divide-slate-100">
            {items.map((it: any) => (
              <div key={it.id} className="py-2 flex items-center justify-between text-[11px]">
                <span className="font-medium text-slate-700 truncate max-w-[140px]">
                  {it.product?.name} (x{it.quantity})
                </span>
                <span className="font-bold text-slate-900 font-mono">
                  {language === "ar" ? "ج.س " : "SDG "}
                  {((it.product?.price || 0) * it.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-1">
            <div className="flex justify-between font-bold text-slate-800 text-sm">
              <span>{language === "ar" ? "المجموع الكلي:" : "Total Amount:"}</span>
              <span className="text-emerald-700 font-mono">
                {language === "ar" ? "ج.س " : "SDG "}
                {totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || items.length === 0}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition disabled:opacity-50"
          >
            {submitting
              ? language === "ar" ? "جاري معالجة الطلب..." : "Processing Order..."
              : language === "ar" ? "تأكيد وإرسال الطلب" : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
}
