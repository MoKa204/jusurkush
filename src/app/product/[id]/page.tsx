"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
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

  const images: string[] = product.images || [];
  const activeImage = images[selectedImage] || "/placeholder.jpg";

  const handleAddToCart = async () => {
    await addToCart(product.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Top Product Shell */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gallery */}
        <div>
          <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden border border-slate-200 mb-4 relative">
            {activeImage.startsWith("/") || activeImage.startsWith("http") ? (
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
            <div className="flex space-x-3 overflow-x-auto pb-2">
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
        <div className="flex flex-col justify-between">
          <div>
            {/* Category Tag */}
            <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md mb-2 border border-emerald-200/60">
              {product.category?.name}
            </span>

            <h1 className="text-2xl font-bold text-slate-900 leading-snug mb-3">
              {product.name}
            </h1>

            {/* Rating & Stock */}
            <div className="flex items-center space-x-4 text-xs mb-4 pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-1">
                <span className="font-bold text-emerald-700 underline">
                  {product.avgRating.toFixed(1)}
                </span>
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= Math.round(product.avgRating)
                          ? "fill-amber-400"
                          : "text-slate-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600 font-medium">
                {product.reviewCount} Ratings
              </span>
              <span className="text-slate-300">|</span>
              <span
                className={`font-semibold ${
                  product.stock > 0 ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {product.stock > 0 ? `${product.stock} Units Available` : "Out of Stock"}
              </span>
            </div>

            {/* Price Banner */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 flex items-baseline space-x-2">
              <span className="text-slate-500 text-sm font-semibold">Price:</span>
              <span className="text-3xl font-black text-emerald-700">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-xs font-semibold text-slate-700">Quantity:</span>
              <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden text-sm">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 font-bold transition"
                >
                  -
                </button>
                <span className="px-4 py-1 font-bold text-slate-800">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 font-bold transition"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition flex items-center justify-center space-x-2 shadow disabled:opacity-50"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>{added ? "Item Added to Cart!" : "Add to Cart"}</span>
            </button>

            <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Shopee Guarantee: Verified seller & payment protection</span>
            </div>
          </div>
        </div>
      </div>

      {/* Merchant Info Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-emerald-100 text-emerald-700 rounded-full border border-emerald-200">
            <Store className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-slate-800 text-base">
                {product.seller?.businessName}
              </h3>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded flex items-center space-x-1 border border-emerald-200">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                <span>Verified Merchant</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Contact: {product.seller?.contactInfo}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Address: {product.seller?.businessAddress}
            </p>
          </div>
        </div>
      </div>

      {/* Description & Specifications */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 text-base mb-4 pb-2 border-b border-slate-200">
          Product Specifications & Overview
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
          {product.description}
        </p>
      </div>

      {/* Verified Reviews Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 text-base mb-4 pb-2 border-b border-slate-200 flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-emerald-600" />
          <span>Customer Ratings & Verified Purchase Reviews</span>
        </h3>

        {product.reviews.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs text-slate-500">
            No reviews yet for this item. Reviews can only be left by buyers with a verified purchase order.
          </div>
        ) : (
          <div className="space-y-4">
            {product.reviews.map((r: any) => (
              <div key={r.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-xs text-slate-800">
                      {r.buyer?.name || "Verified Buyer"}
                    </span>
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                      Verified Order
                    </span>
                  </div>
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3 h-3 ${
                          s <= r.rating ? "fill-amber-400" : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-700">{r.comment}</p>
                <span className="text-[10px] text-slate-400 mt-2 block">
                  {new Date(r.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
