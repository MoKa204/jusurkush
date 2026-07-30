import React from "react";
import { Link } from "react-router";
import { Heart, ArrowRight } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ProductCard } from "../components/ProductCard";
import { useApp } from "../context/AppContext";
import { PRODUCTS } from "../data/products";

export default function Wishlist() {
  const { wishlist } = useApp();
  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F0E8" }}>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="font-black text-2xl mb-2" style={{ color: "#2A4B12" }}>My Wishlist</h1>
        <p className="text-sm mb-6" style={{ color: "#6B7280" }}>{wishlistProducts.length} saved items</p>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={64} style={{ color: "#D4C8B0" }} className="mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2" style={{ color: "#2A4B12" }}>Your wishlist is empty</h3>
            <p className="text-sm mb-6" style={{ color: "#6B7280" }}>Save items you love for later</p>
            <Link to="/products" className="px-6 py-3 rounded-xl font-bold text-sm text-white flex items-center gap-2 mx-auto w-fit" style={{ backgroundColor: "#3D6B1F" }}>
              Browse Products <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
