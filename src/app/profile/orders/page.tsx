"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Star, Store, CheckCircle } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";

export default function BuyerOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Review Modal State
  const [activeItem, setActiveItem] = useState<any | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState("");

  const fetchOrders = () => {
    setLoading(true);
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeItem) return;
    setSubmitting(true);
    setReviewError("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderItemId: activeItem.id,
          productId: activeItem.productId,
          rating,
          comment,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Review submission failed");
      }

      setActiveItem(null);
      setComment("");
      fetchOrders();
    } catch (err: any) {
      setReviewError(err.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto my-8 space-y-4">
        {[1, 2].map((n) => (
          <div key={n} className="bg-white p-6 rounded-2xl border border-slate-200 animate-pulse h-40" />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No Orders Found"
        message="You haven't placed any purchase orders yet. Start exploring verified merchant products!"
        actionText="Browse Products"
        actionHref="/"
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
          <Package className="w-5 h-5 text-emerald-600" />
          <span>My Purchase History</span>
        </h1>
        <span className="text-xs font-semibold text-slate-500">{orders.length} Total Orders</span>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between text-xs gap-2">
              <div className="flex items-center space-x-3">
                <span className="font-bold text-slate-900">Order #{order.id.substring(0, 8)}</span>
                <span className="text-slate-400">|</span>
                <span className="text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                  {order.status}
                </span>
                <span className="font-bold text-slate-900 text-sm">${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Line Items */}
            <div className="p-6 divide-y divide-slate-100">
              {order.items.map((item: any) => (
                <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-1 text-[11px] text-slate-500 mb-1">
                      <Store className="w-3 h-3 text-emerald-600" />
                      <span>{item.seller?.businessName}</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-800">{item.product.name}</h4>
                    <p className="text-xs text-slate-500">
                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    {item.review ? (
                      <span className="text-xs text-emerald-700 font-semibold flex items-center space-x-1 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Reviewed ({item.review.rating} ★)</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          setActiveItem(item);
                          setRating(5);
                          setComment("");
                        }}
                        className="px-4 py-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-lg text-xs font-bold transition border border-emerald-200"
                      >
                        Write Verified Review
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {activeItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-lg text-slate-900 border-b border-slate-100 pb-2">
              Write Verified Review
            </h3>
            <p className="text-xs text-slate-600 font-semibold">{activeItem.product.name}</p>

            {reviewError && (
              <div className="p-2 bg-red-50 text-red-600 text-xs rounded-lg border border-red-200">
                {reviewError}
              </div>
            )}

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Rating</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className="p-1 hover:scale-110 transition"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          s <= rating ? "fill-amber-400 text-amber-400" : "text-slate-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Review Comment</label>
                <textarea
                  rows={3}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                  placeholder="Share details about product quality, shipping speed, and seller service..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg disabled:opacity-50 shadow"
                >
                  {submitting ? "Submitting..." : "Post Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
