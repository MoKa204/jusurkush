"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, AlertCircle, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function AddProductPage() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const isApproved = user?.sellerProfile?.status === "APPROVED";

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    // Read image locally via FileReader for guaranteed display & upload
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setImages((prev) => [...prev, dataUrl]);
      setUploading(false);

      // Optionally attempt server upload
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "products");

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.url) {
          // Replace latest base64 with uploaded URL if server upload succeeded
          setImages((prev) => prev.map((img, i) => (i === prev.length - 1 ? data.url : img)));
        }
      } catch (err) {
        // Keep dataUrl fallback
      }
    };
    reader.onerror = () => {
      setError("Failed to read image file");
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isApproved) {
      setError(
        language === "ar"
          ? "حسابك قيد التدقيق والمراجعة من قبل الإدارة. يلزم اعتماد حسابك أولاً للبدء بالبيع ونشر المنتجات."
          : "Your seller account is pending admin approval. You cannot publish products yet."
      );
      return;
    }

    if (!category.trim()) {
      setError(language === "ar" ? "يرجى كتابة تصنيف الفئة" : "Please enter a category name");
      return;
    }

    if (images.length === 0) {
      setError(t("uploadAtLeastOneImg"));
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const parsedPrice = parseFloat(price);
      const parsedStock = parseInt(stock, 10);

      if (isNaN(parsedPrice) || parsedPrice <= 0) {
        throw new Error(language === "ar" ? "يرجى إدخال سعر صحيح أكبر من الصفر" : "Please enter a valid price greater than 0");
      }

      if (isNaN(parsedStock) || parsedStock < 0) {
        throw new Error(language === "ar" ? "يرجى إدخال كمية مخزون صحيحة" : "Please enter a valid stock quantity");
      }

      const res = await fetch("/api/seller/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          category: category.trim(),
          description,
          price: parsedPrice,
          stock: parsedStock,
          images,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create product");
      }

      router.push("/seller/products");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-6">
      <h1 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-3">
        {t("addNewProductTitle")}
      </h1>

      {!isApproved && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-start space-x-3 space-x-reverse">
          <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold">
              {language === "ar" ? "الحساب قيد الانتظار والمراجعة" : "Account Pending Admin Approval"}
            </h4>
            <p className="mt-1">
              {language === "ar"
                ? "حساب البائع الخاص بك قيد التدقيق حالياً. يمكنك تجهيز بيانات المنتجات، ولكن لن تتمكن من النشر والبيع حتى تتلقى الموافقة من إدارة جسور كوش."
                : "Your seller account is currently under verification. You cannot publish products live until approved by JusurKush admin."}
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs flex items-center space-x-2 space-x-reverse">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">{t("productTitle")}</label>
          <input
            type="text"
            required
            disabled={!isApproved}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 disabled:bg-slate-100 disabled:cursor-not-allowed"
            placeholder={language === "ar" ? "مثال: هاتف سامسونج جالاكسي S24 ألترا" : "e.g. Ergonomic Wireless Headphones"}
          />
        </div>

        {/* Category Taxonomy - Short Answer Input */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">{t("categoryTaxonomy")}</label>
          <input
            type="text"
            required
            disabled={!isApproved}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white disabled:bg-slate-100 disabled:cursor-not-allowed"
            placeholder={
              language === "ar"
                ? "اكتب الفئة والتصنيف (مثال: إلكترونيات، ملابس، مواد غذائية...)"
                : "Enter category (e.g. Electronics, Clothing, Spices...)"
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              {language === "ar" ? "سعر الوحدة (بالجنيه السوداني ج.س)" : "Unit Price (Sudanese Pound - SDG)"}
            </label>
            <div className="relative">
              <input
                type="number"
                step="1"
                required
                disabled={!isApproved}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full pl-3 pr-14 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 disabled:bg-slate-100 disabled:cursor-not-allowed font-semibold"
                placeholder="25000"
              />
              <span className="absolute right-3 top-2 text-slate-500 text-xs font-bold pointer-events-none">
                {language === "ar" ? "ج.س" : "SDG"}
              </span>
            </div>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">{t("stockUnits")}</label>
            <input
              type="number"
              required
              disabled={!isApproved}
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 disabled:bg-slate-100 disabled:cursor-not-allowed"
              placeholder="25"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">{t("detailedDescription")}</label>
          <textarea
            rows={4}
            required
            disabled={!isApproved}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 disabled:bg-slate-100 disabled:cursor-not-allowed"
            placeholder={
              language === "ar"
                ? "اكتب تفاصيل ومواصفات المنتج، الضمان، ومحتويات العلبة..."
                : "Describe product features, technical specifications, and box contents..."
            }
          />
        </div>

        {/* Image Upload Area */}
        <div>
          <label className="block font-semibold text-slate-700 mb-2">{t("productImages")}</label>
          <div className="flex flex-wrap gap-3 mb-3">
            {images.map((url, idx) => (
              <div key={idx} className="relative w-20 h-20 rounded-lg border border-slate-300 overflow-hidden group">
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 bg-red-600 text-white p-0.5 rounded-full hover:scale-110 transition"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}

            <label
              className={`w-20 h-20 rounded-lg border-2 border-dashed border-slate-300 hover:border-emerald-600 flex flex-col items-center justify-center text-slate-500 hover:text-emerald-600 cursor-pointer transition ${
                !isApproved ? "pointer-events-none opacity-50" : ""
              }`}
            >
              <Upload className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-bold">{uploading ? t("uploading") : t("uploadPassportNow")}</span>
              <input type="file" accept="image/*" disabled={!isApproved} onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting || uploading || !isApproved}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition disabled:opacity-50 text-xs shadow"
        >
          {submitting
            ? t("publishingProduct")
            : !isApproved
            ? language === "ar"
              ? "في انتظار الموافقة على الحساب للبدء بالبيع"
              : "Account Pending Approval to Start Selling"
            : t("publishProductLive")}
        </button>
      </form>
    </div>
  );
}
