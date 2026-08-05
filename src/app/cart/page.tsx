"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import EmptyState from "@/components/common/EmptyState";
import { Trash2, Store, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, subtotal, itemCount } = useCart();
  const { t, language } = useLanguage();

  if (items.length === 0) {
    return (
      <EmptyState
        title={t("emptyCartTitle")}
        message={t("emptyCartMsg")}
        actionText={t("browseProducts")}
        actionHref="/"
      />
    );
  }

  // Group items by Seller Store
  const groupedBySeller = items.reduce((acc, item) => {
    const sellerId = item.product.seller.id;
    if (!acc[sellerId]) {
      acc[sellerId] = {
        seller: item.product.seller,
        items: [],
      };
    }
    acc[sellerId].items.push(item);
    return acc;
  }, {} as Record<string, { seller: any; items: typeof items }>);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800 flex items-center space-x-2 space-x-reverse">
          <ShoppingBag className="w-5 h-5 text-emerald-600" />
          <span>{t("shoppingCart")}</span>
        </h1>

        <div className="flex items-center space-x-3 space-x-reverse">
          <span className="text-xs font-semibold text-slate-500">
            {itemCount} {language === "ar" ? "منتجات بالسلة" : "items"}
          </span>
          <button
            onClick={clearCart}
            className="text-xs text-red-600 hover:text-red-700 font-semibold hover:underline"
          >
            {language === "ar" ? "تفريغ السلة بالكامل" : "Clear Cart"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Line Items grouped by merchant store */}
        <div className="lg:col-span-2 space-y-4">
          {Object.values(groupedBySeller).map(({ seller, items: sellerItems }) => (
            <div key={seller.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              {/* Store Name Header */}
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center space-x-2 space-x-reverse text-xs">
                <Store className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-slate-800">{seller.businessName}</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  {t("verifiedMerchant")}
                </span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-slate-100 p-4">
                {sellerItems.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                    <div className="flex items-center space-x-3 space-x-reverse flex-1">
                      <img
                        src={item.product.images[0] || "/placeholder.jpg"}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg border border-slate-200 flex-shrink-0"
                      />
                      <div>
                        <Link
                          href={`/product/${item.product.id}`}
                          className="font-bold text-slate-800 hover:text-emerald-700 transition text-xs line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        <span className="text-emerald-700 font-extrabold text-sm block mt-1">
                          ${item.product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Quantity & Delete Actions */}
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden text-xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 font-bold transition"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-bold text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 font-bold transition"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 transition"
                        title={language === "ar" ? "حذف المنتج" : "Remove item"}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-6">
            <h3 className="font-bold text-slate-800 text-base mb-4 pb-2 border-b border-slate-100">
              {t("orderSummaryTitle")}
            </h3>

            <div className="space-y-3 text-xs mb-6">
              <div className="flex justify-between text-slate-600">
                <span>{t("subtotal")} ({itemCount} {language === "ar" ? "منتج" : "items"})</span>
                <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{t("shippingFee")}</span>
                <span className="text-emerald-600 font-bold">{t("freeShipping")}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-bold text-base pt-3 border-t border-slate-100">
                <span>{t("totalPayable")}</span>
                <span className="text-emerald-700">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition flex items-center justify-center space-x-2 space-x-reverse shadow"
            >
              <span>{t("proceedCheckout")}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
