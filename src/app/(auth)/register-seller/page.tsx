"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Store, Mail, Lock, User, FileText, Phone, MapPin, Landmark, AlertCircle, ShieldCheck, Upload } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function RegisterSellerPage() {
  const { t, language } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  // Passport KYC State
  const [passportPhoto, setPassportPhoto] = useState("");
  const [uploadingPassport, setUploadingPassport] = useState(false);
  
  // Bank Account Fields
  const [bankName, setBankName] = useState("Bank of Khartoum / Al Rajhi");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankIBAN, setBankIBAN] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { refetchUser } = useAuth();
  const router = useRouter();

  const handlePassportUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPassport(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "passports");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setPassportPhoto(data.url);
    } catch (err: any) {
      setError(err.message || "Failed to upload passport photo");
    } finally {
      setUploadingPassport(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register-seller", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          businessName,
          registrationNumber,
          businessAddress,
          contactInfo,
          passportPhoto: passportPhoto || undefined,
          bankName,
          bankAccountName: bankAccountName || `${businessName} Account`,
          bankAccountNumber,
          bankIBAN,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Seller registration failed");
      }

      await refetchUser();
      router.push("/seller");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
      <div className="text-center mb-6">
        <div className="inline-flex p-3 bg-emerald-100 text-emerald-700 rounded-full mb-3">
          <Store className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">{t("sellerRegTitle")}</h1>
        <p className="text-xs text-slate-500 mt-1 max-w-lg mx-auto">{t("sellerRegSub")}</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs flex items-center space-x-2 space-x-reverse">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Account Credentials */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
          <h3 className="font-bold text-slate-800 text-xs border-b border-slate-200 pb-2">
            1. {t("accountCredentials")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t("fullName")}</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-3 pr-9 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
                  placeholder={language === "ar" ? "مثال: طارق علي" : "e.g. Sarah Smith"}
                />
                <User className="w-4 h-4 text-slate-400 absolute right-3 ltr:left-3 ltr:right-auto top-2.5" />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t("emailAddress")}</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-3 pr-9 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
                  placeholder="seller@business.com"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute right-3 ltr:left-3 ltr:right-auto top-2.5" />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">{t("password")}</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-3 pr-9 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
                placeholder={t("passPlaceholder")}
              />
              <Lock className="w-4 h-4 text-slate-400 absolute right-3 ltr:left-3 ltr:right-auto top-2.5" />
            </div>
          </div>
        </div>

        {/* Business Details */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
          <h3 className="font-bold text-slate-800 text-xs border-b border-slate-200 pb-2">
            2. {t("businessDetails")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t("businessName")}</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full pl-3 pr-9 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
                  placeholder={language === "ar" ? "مثال: متجر النيل للإلكترونيات" : "e.g. Nile Tech Store"}
                />
                <Store className="w-4 h-4 text-slate-400 absolute right-3 ltr:left-3 ltr:right-auto top-2.5" />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t("regTaxNumber")}</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  className="w-full pl-3 pr-9 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
                  placeholder="REG-8849201"
                />
                <FileText className="w-4 h-4 text-slate-400 absolute right-3 ltr:left-3 ltr:right-auto top-2.5" />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">{t("businessAddress")}</label>
            <div className="relative">
              <input
                type="text"
                required
                value={businessAddress}
                onChange={(e) => setBusinessAddress(e.target.value)}
                className="w-full pl-3 pr-9 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
                placeholder={language === "ar" ? "الخرطوم، شارع القصر، برج الأعمال" : "Khartoum, Al Qasr Street"}
              />
              <MapPin className="w-4 h-4 text-slate-400 absolute right-3 ltr:left-3 ltr:right-auto top-2.5" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">{t("contactInfo")}</label>
            <div className="relative">
              <input
                type="text"
                required
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                className="w-full pl-3 pr-9 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
                placeholder="+249 912345678 / support@niletech.com"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute right-3 ltr:left-3 ltr:right-auto top-2.5" />
            </div>
          </div>
        </div>

        {/* Passport KYC Upload Section */}
        <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 space-y-3">
          <h3 className="font-bold text-slate-800 text-xs border-b border-amber-200 pb-2 flex items-center space-x-2 space-x-reverse">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>3. {t("identityVerificationStep")}</span>
          </h3>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {passportPhoto ? (
              <div className="relative w-36 h-24 rounded-xl overflow-hidden border-2 border-emerald-400 shadow-sm flex-shrink-0">
                <img src={passportPhoto} alt="Passport Preview" className="w-full h-full object-cover" />
                <span className="absolute bottom-1 right-1 bg-emerald-600 text-white text-[9px] px-1.5 py-0.5 rounded font-bold shadow">
                  ✓ {t("uploaded")}
                </span>
              </div>
            ) : (
              <div className="w-36 h-24 bg-white rounded-xl border-2 border-dashed border-amber-300 flex flex-col items-center justify-center text-amber-600 text-[10px] gap-1 flex-shrink-0">
                <Upload className="w-5 h-5 text-amber-500" />
                <span>{t("uploadPassportNow")}</span>
              </div>
            )}

            <div className="flex-1 space-y-1 text-center sm:text-right rtl:sm:text-right">
              <label className="block font-bold text-slate-800 text-xs">
                {t("identityVerificationStep")}
              </label>
              <p className="text-[11px] text-slate-500">
                {t("passportUploadHelp")}
              </p>
              <label className="inline-flex items-center space-x-2 space-x-reverse px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl cursor-pointer text-xs transition mt-2 shadow-sm">
                <Upload className="w-3.5 h-3.5" />
                <span>
                  {uploadingPassport
                    ? t("uploading")
                    : passportPhoto
                    ? t("changePassportPhoto")
                    : t("uploadPassportNow")}
                </span>
                <input type="file" accept="image/*" onChange={handlePassportUpload} className="hidden" />
              </label>
            </div>
          </div>
        </div>

        {/* Seller Bank Details */}
        <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 space-y-4">
          <h3 className="font-bold text-slate-800 text-xs border-b border-emerald-200 pb-2 flex items-center space-x-2 space-x-reverse">
            <Landmark className="w-4 h-4 text-emerald-600" />
            <span>4. {t("bankDetailsTitle")}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t("bankName")}</label>
              <input
                type="text"
                required
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
                placeholder="Bank of Khartoum / Al Rajhi Bank"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t("bankAccountName")}</label>
              <input
                type="text"
                value={bankAccountName}
                onChange={(e) => setBankAccountName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
                placeholder={businessName || "Nile Tech Merchant Account"}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t("bankAccountNumber")}</label>
              <input
                type="text"
                required
                value={bankAccountNumber}
                onChange={(e) => setBankAccountNumber(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white font-mono font-bold text-emerald-900"
                placeholder="1002-3849-5882"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t("bankIBAN")}</label>
              <input
                type="text"
                value={bankIBAN}
                onChange={(e) => setBankIBAN(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white font-mono"
                placeholder="SD12340000100238495882"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || uploadingPassport}
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition disabled:opacity-50 shadow text-xs"
        >
          {loading
            ? language === "ar" ? "جاري إرسال البيانات..." : "Submitting Registration..."
            : t("submitSellerApp")}
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs">
        <p className="text-slate-600">
          {t("alreadyHaveAccount")}{" "}
          <Link href="/login" className="text-emerald-700 font-bold hover:underline">
            {t("login")}
          </Link>
        </p>
      </div>
    </div>
  );
}
