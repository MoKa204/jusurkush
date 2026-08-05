"use client";

import React from "react";
import Link from "next/link";
import { Star, ShoppingCart, Store, CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  stock: number;
  images: string[];
  avgRating?: number;
  reviewCount?: number;
  seller: {
    id: string;
    businessName: string;
    status: string;
  };
}

export default function ProductCard({
  id,
  name,
  price,
  stock,
  images,
  avgRating = 0,
  reviewCount = 0,
  seller,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const primaryImage = images[0] || "/placeholder.jpg";

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col justify-between group">
      <div>
        {/* Product Image */}
        <Link href={`/product/${id}`} className="block relative aspect-square bg-slate-100 overflow-hidden">
          {primaryImage.startsWith("/") || primaryImage.startsWith("http") ? (
            <img
              src={primaryImage}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
              No Image
            </div>
          )}
          {stock <= 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-xs uppercase">
              {t("outOfStock")}
            </div>
          )}
        </Link>

        {/* Info */}
        <div className="p-4">
          {/* Seller Tag */}
          <div className="flex items-center space-x-1 space-x-reverse text-[11px] text-slate-500 mb-1.5">
            <Store className="w-3 h-3 text-emerald-600" />
            <span className="truncate font-semibold text-slate-700">{seller.businessName}</span>
            <CheckCircle className="w-3 h-3 text-emerald-600 flex-shrink-0" />
          </div>

          <Link href={`/product/${id}`} className="block">
            <h4 className="font-semibold text-sm text-slate-800 line-clamp-2 hover:text-emerald-700 transition leading-snug mb-2">
              {name}
            </h4>
          </Link>

          {/* Rating */}
          <div className="flex items-center space-x-1 space-x-reverse text-xs mb-3">
            <div className="flex text-amber-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-3 h-3 ${
                    s <= Math.round(avgRating) ? "fill-amber-400" : "text-slate-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-slate-500 text-[10px]">({reviewCount})</span>
          </div>
        </div>
      </div>

      {/* Price & Add to Cart Action */}
      <div className="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-xs text-emerald-700 font-bold">$</span>
          <span className="text-lg font-black text-emerald-700">
            {price.toFixed(2)}
          </span>
        </div>

        <button
          onClick={() => addToCart(id, 1)}
          disabled={stock <= 0}
          className="p-2 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-lg transition disabled:opacity-40 disabled:hover:bg-emerald-50 disabled:hover:text-emerald-700 border border-emerald-200/60"
          title={t("addToCart")}
        >
          <ShoppingCart className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
