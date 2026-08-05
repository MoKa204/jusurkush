"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle, Edit3, Trash2, Package } from "lucide-react";

export default function SellerProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    setLoading(true);
    fetch("/api/seller/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      const res = await fetch(`/api/seller/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">My Product Catalog</h1>
          <p className="text-xs text-slate-500">Manage stock, prices, and product details</p>
        </div>
        <Link
          href="/seller/products/new"
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition flex items-center space-x-1.5 shadow"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Product</span>
        </Link>
      </div>

      {loading ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 animate-pulse h-64" />
      ) : products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Products Listed Yet</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            You haven't listed any products. Click below to add your first product!
          </p>
          <Link
            href="/seller/products/new"
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg text-xs shadow"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create First Product</span>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold uppercase text-[10px] text-slate-500">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition">
                    <td className="p-4 flex items-center space-x-3">
                      <img
                        src={p.images[0] || "/placeholder.jpg"}
                        alt=""
                        className="w-12 h-12 object-cover rounded-lg border border-slate-200 flex-shrink-0"
                      />
                      <div>
                        <Link
                          href={`/product/${p.id}`}
                          className="font-bold text-slate-800 hover:text-emerald-700 transition line-clamp-1"
                        >
                          {p.name}
                        </Link>
                        <span className="text-[10px] text-slate-400">ID: {p.id.substring(0, 8)}</span>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-slate-600">{p.category?.name}</td>
                    <td className="p-4 font-bold text-emerald-700">${p.price.toFixed(2)}</td>
                    <td className="p-4">
                      <span
                        className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                          p.stock > 0
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {p.stock} units
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/seller/products/${p.id}`}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit Product"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
