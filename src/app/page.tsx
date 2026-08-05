"use client";

import React, { useEffect, useState } from "react";
import BannerCarousel from "@/components/home/BannerCarousel";
import CategoryNav from "@/components/home/CategoryNav";
import ProductCard from "@/components/products/ProductCard";
import EmptyState from "@/components/common/EmptyState";
import { ShoppingBag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch((err) => console.error("Error loading products:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Banner Carousel */}
      <BannerCarousel />

      {/* Categories */}
      <CategoryNav />

      {/* Live Product Catalog Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="p-2 bg-emerald-600 text-white rounded-lg shadow-sm">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                {t("dailyDiscoveries")}
              </h2>
              <p className="text-xs text-slate-500">{t("dailySub")}</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            {products.length} {t("productsLive")}
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="bg-white rounded-xl p-4 border border-slate-200 animate-pulse h-64" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
