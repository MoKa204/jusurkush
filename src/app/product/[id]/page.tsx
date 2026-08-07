"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  Star,
  Store,
  ShoppingCart,
  ShieldCheck,
  CheckCircle,
  MessageSquare,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { addToCart } = useCart();
  const { language } = useLanguage();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product || null);
      })
      .catch((err) => console.error("Error loading product detail:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto my-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-200 animate-pulse h-96" />
    );
  }

  if (!product) {
    return (
      <div className="max-w-xl mx-auto my-12 bg-white p-8 rounded-2xl text-center border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800">Product Not Found</h2>
        <p className="text-xs text-slate-500 mt-2">
          The requested product does not exist or has been removed by the merchant.
        </p>
      </div>
    );
  }

  const images: string[] = Array.isArray(product.images) ? product.images : [product.images];
  const activeImage = images[selectedImage] || "/placeholder.jpg";

  const isValidImage = activeImage && (
    activeImage.startsWith("/") ||
    activeImage.startsWith("http") ||
    activeImage.startsWith("data:")
  );

  const stockNumber = typeof product.stock === "number" ? product.stock : parseInt(String(product.stock || 99), 10) || 99;

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(stockNumber > 0 ? stockNumber : 99, prev + 1));
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleAddToCart = async () => {
    await addToCart(product.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto my-6 text-xs">
      {/* Top Product Shell */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gallery */}
        <div>
          <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden border border-slate-200 mb-4 relative">
            {isValidImage ? (
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                No Image Available
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex space-x-3 space-x-reverse overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-16 rounded-lg border-2 overflow-hidden flex-shrink-0 transition ${
                    idx === selectedImage ? "border-emerald-600" : "border-slate-200"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-4 flex flex-col justify-between">
          <div>
            {/* Category Tag */}
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md mb-2 inline-block">
              {product.category?.name || "General"}
            </span>

            <h1 className="text-xl font-black text-slate-900 leading-snug">{product.name}</h1>

            {/* Seller info */}
            <div className="flex items-center space-x-2 space-x-reverse mt-2 text-slate-600 font-semibold text-xs">
              <Store className="w-4 h-4 text-emerald-600" />
              <span>{product.seller?.businessName || "Verified Merchant"}</span>
              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            </div>

            {/* Rating summary */}
            <div className="flex items-center space-x-2 space-x-reverse mt-3">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${
                      s <= Math.round(product.avgRating || 0)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-300"
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-slate-700">{product.avgRating?.toFixed(1) || "0.0"}</span>
              <span className="text-slate-400 text-xs">({product.reviewCount || 0} Ratings)</span>
            </div>

            {/* Stock Tag */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Availability:</span>
              <span
                className={`font-bold px-2.5 py-0.5 rounded-full ${
                  stockNumber > 0
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {stockNumber > 0 ? `Units ${stockNumber} Available` : "Out of Stock"}
              </span>
            </div>

            {/* Price Card */}
            <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <span className="text-slate-500 font-bold">Price:</span>
              <div className="text-emerald-700 font-black text-2xl font-mono">
                {language === "ar" ? "ج.س " : "SDG "}
                {(product.price || 0).toLocaleString()}
              </div>
            </div>

            <p className="mt-4 text-slate-600 text-xs leading-relaxed border-t border-slate-100 pt-4">
              {product.description}
            </p>
          </div>

          {/* Add to Cart Footer Actions */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white shadow-xs">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm select-none transition"
                >
                  -
                </button>
                <span className="px-4 py-2 font-bold text-slate-900 text-sm select-none min-w-[2.5rem] text-center font-mono">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm select-none transition"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={stockNumber <= 0}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition flex items-center justify-center space-x-2 space-x-reverse shadow disabled:opacity-50"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{added ? (language === "ar" ? "تمت الإضافة للسلة!" : "Added to Cart!") : "Add to Shopping Cart"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
