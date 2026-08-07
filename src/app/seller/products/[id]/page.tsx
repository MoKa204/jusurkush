"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Upload, X, AlertCircle } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

export default function EditProductPage() {
  const { t, language } = useLanguage();
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`/api/seller/products/${id}`).then((res) => res.json()),
      fetch("/api/categories").then((res) => res.json()),
    ])
      .then(([prodData, catData]) => {
        setCategories(catData.categories || []);
        if (prodData.product) {
          const p = prodData.product;
          setName(p.name);
          setCategoryId(p.categoryId);
          setDescription(p.description);
          setPrice(p.price.toString());
          setStock(p.stock.toString());
          setImages(p.images || []);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "products");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setImages((prev) => [...prev, data.url]);
    } catch (err: any) {
      setError(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      setError("At least one product image is required");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const res = await fetch(`/api/seller/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          categoryId,
          description,
          price: parseFloat(price),
          stock: parseInt(stock, 10),
          images,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update product");

      router.push("/seller/products");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="bg-white p-8 rounded-xl border border-slate-200 animate-pulse h-96" />;
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-6">
      <h1 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-3">
        Edit Product Details
      </h1>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-600 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Product Title</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#ee4d2d]"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#ee4d2d] bg-white"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">{t("unitPriceUSD")}</label>
            <div className="relative">
              <input
                type="number"
                step="1"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full pl-3 pr-14 py-2 border border-slate-300 rounded focus:outline-none focus:border-emerald-600 font-semibold"
              />
              <span className="absolute right-3 top-2 text-slate-500 text-xs font-bold pointer-events-none">
                {language === "ar" ? "ج.س" : "SDG"}
              </span>
            </div>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Available Stock Units</label>
            <input
              type="number"
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#ee4d2d]"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Description</label>
          <textarea
            rows={4}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#ee4d2d]"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-2">Product Images</label>
          <div className="flex flex-wrap gap-3 mb-3">
            {images.map((url, idx) => (
              <div key={idx} className="relative w-20 h-20 rounded border border-slate-300 overflow-hidden group">
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

            <label className="w-20 h-20 rounded border-2 border-dashed border-slate-300 hover:border-[#ee4d2d] flex flex-col items-center justify-center text-slate-500 hover:text-[#ee4d2d] cursor-pointer transition">
              <Upload className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-bold">{uploading ? "Uploading..." : "Upload"}</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting || uploading}
          className="w-full py-3 bg-[#ee4d2d] hover:bg-[#d73211] text-white font-bold rounded-lg transition disabled:opacity-50 text-xs"
        >
          {submitting ? "Saving Changes..." : "Save Product Changes"}
        </button>
      </form>
    </div>
  );
}
