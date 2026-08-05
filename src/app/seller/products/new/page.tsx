"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, AlertCircle } from "lucide-react";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories || []);
        if (data.categories?.length > 0) {
          setCategoryId(data.categories[0].id);
        }
      })
      .catch((err) => console.error(err));
  }, []);

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
      if (!res.ok) throw new Error(data.error || "Image upload failed");

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
      setError("Please upload at least one product image");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/seller/products", {
        method: "POST",
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
        Add New Merchant Product
      </h1>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs flex items-center space-x-2">
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
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
            placeholder="e.g. Ergonomic Bluetooth Wireless Headphones"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Category Taxonomy</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
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
            <label className="block font-semibold text-slate-700 mb-1">Unit Price ($ USD)</label>
            <input
              type="number"
              step="0.01"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
              placeholder="49.99"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Available Stock Units</label>
            <input
              type="number"
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
              placeholder="25"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Detailed Description</label>
          <textarea
            rows={4}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
            placeholder="Describe product features, technical specifications, and box contents..."
          />
        </div>

        {/* Image Upload Area */}
        <div>
          <label className="block font-semibold text-slate-700 mb-2">Product Images</label>
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

            <label className="w-20 h-20 rounded-lg border-2 border-dashed border-slate-300 hover:border-emerald-600 flex flex-col items-center justify-center text-slate-500 hover:text-emerald-600 cursor-pointer transition">
              <Upload className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-bold">{uploading ? "Uploading..." : "Upload"}</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
          <p className="text-[10px] text-slate-400">
            Files are saved through the StorageService interface.
          </p>
        </div>

        <button
          type="submit"
          disabled={submitting || uploading}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition disabled:opacity-50 text-xs shadow"
        >
          {submitting ? "Publishing Product..." : "Publish Product Live"}
        </button>
      </form>
    </div>
  );
}
