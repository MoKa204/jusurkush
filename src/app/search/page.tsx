"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import EmptyState from "@/components/common/EmptyState";
import { Search, Filter } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

function SearchContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const categorySlug = searchParams.get("category") || "";

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (categorySlug) params.set("category", categorySlug);

    fetch(`/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [query, categorySlug]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center space-x-2 space-x-reverse">
            <Search className="w-5 h-5 text-emerald-600" />
            <span>
              {query
                ? language === "ar"
                  ? `نتائج البحث عن: "${query}"`
                  : `Search results for: "${query}"`
                : categorySlug
                ? language === "ar"
                  ? `المنتجات المتاحة في القسم`
                  : `Category Catalog`
                : language === "ar"
                ? "دليل الكتالوج والمنتجات"
                : "Product Search & Catalog"}
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {language === "ar"
              ? "تسوق مباشرة من التُجّار المستقلين المعتمدين"
              : "Shop directly from verified independent merchants"}
          </p>
        </div>

        <div className="flex items-center space-x-2 space-x-reverse text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          <Filter className="w-4 h-4 text-emerald-600" />
          <span>
            {products.length} {t("productsLive")}
          </span>
        </div>
      </div>

      {/* Catalog Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-white rounded-xl p-4 border border-slate-200 animate-pulse h-64" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <EmptyState
          title={
            language === "ar"
              ? "لم نجد أي منتجات تطابق البحث"
              : "No Products Found Matching Query"
          }
          message={
            language === "ar"
              ? "جرب البحث عن كلمات أخرى، أو تصفح باقي الفئات. يمكن للتُجّار التسجيل لإضافة المنتجات مجاناً!"
              : "Try searching with different keywords. Sellers can register to list products!"
          }
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="bg-white p-8 rounded-2xl animate-pulse h-64" />}>
      <SearchContent />
    </Suspense>
  );
}
