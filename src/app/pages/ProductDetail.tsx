import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Heart, ShoppingCart, Star, MapPin, Shield, Truck, ArrowLeft, Plus, Minus, Store } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ProductCard } from "../components/ProductCard";
import { PRODUCTS } from "../data/products";
import { useApp } from "../context/AppContext";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");

  const product = PRODUCTS.find((p) => p.id === id);
  const related = PRODUCTS.filter((p) => p.id !== id && p.category === product?.category).slice(0, 4);
  const isWishlisted = wishlist.includes(product?.id || "");

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: "#F5F0E8" }}>
        <Header />
        <div className="text-center py-20">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="font-bold text-xl mb-2" style={{ color: "#2A4B12" }}>Product not found</h2>
          <Link to="/products" className="text-sm font-semibold" style={{ color: "#3D6B1F" }}>← Back to products</Link>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F0E8" }}>
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs mb-5" style={{ color: "#9CA3AF" }}>
          <Link to="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:underline">Products</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`} className="hover:underline capitalize">{product.category}</Link>
          <span>/</span>
          <span style={{ color: "#2A4B12" }} className="font-medium truncate max-w-xs">{product.name}</span>
        </div>

        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm mb-5 hover:gap-2 transition-all" style={{ color: "#3D6B1F" }}>
          <ArrowLeft size={15} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden border relative" style={{ borderColor: "#E8DCC8" }}>
            <img src={product.image} alt={product.name} className="w-full object-cover" style={{ maxHeight: "480px" }} />
            {product.badge && (
              <div className="absolute top-4 left-4 px-3 py-1 rounded-lg text-sm font-bold" style={{ backgroundColor: "#3D6B1F", color: "white" }}>
                {product.badge}
              </div>
            )}
            {discount > 0 && (
              <div className="absolute top-4 right-4 px-3 py-1 rounded-lg text-sm font-bold" style={{ backgroundColor: "#DC2626", color: "white" }}>
                -{discount}% OFF
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            <div>
              <Link to={`/products?seller=${product.sellerId}`} className="text-sm font-semibold hover:underline" style={{ color: "#3D6B1F" }}>
                {product.seller}
              </Link>
              <h1 className="mt-1 font-black" style={{ color: "#2C2C2C", fontSize: "1.5rem", lineHeight: 1.2 }}>{product.name}</h1>
              <p className="text-sm mt-1" style={{ color: "#9CA3AF" }}>{product.nameAr}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "#F5C842" : "none"} color={i < Math.floor(product.rating) ? "#F5C842" : "#D1D5DB"} />
                ))}
              </div>
              <span className="text-sm font-bold" style={{ color: "#2C2C2C" }}>{product.rating}</span>
              <span className="text-sm" style={{ color: "#9CA3AF" }}>({product.reviews} reviews)</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-sm" style={{ color: "#6B7280" }}>
              <MapPin size={14} />
              <span>{product.location}, Sudan</span>
            </div>

            {/* Price */}
            <div className="p-4 rounded-xl" style={{ backgroundColor: "#EDE8D8", border: "1px solid #D4C8B0" }}>
              <div className="flex items-baseline gap-3">
                <span className="font-black" style={{ color: "#2A4B12", fontSize: "2rem" }}>
                  SDG {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg line-through" style={{ color: "#9CA3AF" }}>
                    SDG {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <p className="text-sm font-semibold mt-1" style={{ color: "#DC2626" }}>
                  You save SDG {(product.originalPrice! - product.price).toLocaleString()} ({discount}%)
                </p>
              )}
              <p className="text-xs mt-2" style={{ color: "#6B7280" }}>
                {product.stock > 10 ? `✓ In Stock (${product.stock} available)` : product.stock > 0 ? `⚠️ Only ${product.stock} left!` : "❌ Out of Stock"}
              </p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold" style={{ color: "#2C2C2C" }}>Quantity:</span>
              <div className="flex items-center rounded-lg overflow-hidden border" style={{ borderColor: "#D4C8B0" }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors" style={{ color: "#2C2C2C" }}>
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm font-bold" style={{ color: "#2C2C2C" }}>{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors" style={{ color: "#2C2C2C" }}>
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm border-2 transition-all hover:bg-opacity-10"
                style={{ borderColor: "#3D6B1F", color: "#3D6B1F", backgroundColor: "transparent" }}
              >
                <ShoppingCart size={17} /> Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "#3D6B1F", color: "white" }}
              >
                Buy Now
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all"
                style={{ borderColor: isWishlisted ? "#DC2626" : "#D4C8B0", backgroundColor: isWishlisted ? "#FEF2F2" : "white" }}
              >
                <Heart size={18} fill={isWishlisted ? "#DC2626" : "none"} color={isWishlisted ? "#DC2626" : "#9CA3AF"} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: <Shield size={14} />, text: "Buyer Protection Guaranteed" },
                { icon: <Truck size={14} />, text: "Fast Delivery Across Sudan" },
                { icon: <Store size={14} />, text: "Verified Local Seller" },
                { icon: <Star size={14} />, text: "Quality Assurance Check" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs p-2 rounded-lg" style={{ backgroundColor: "#F0EBD8", color: "#5A6B4A" }}>
                  <span style={{ color: "#3D6B1F" }}>{icon}</span> {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="rounded-2xl border overflow-hidden mb-10" style={{ backgroundColor: "white", borderColor: "#E8DCC8" }}>
          <div className="flex border-b" style={{ borderColor: "#E8DCC8" }}>
            {(["description", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-3 text-sm font-semibold capitalize transition-colors"
                style={{
                  color: activeTab === tab ? "#2A4B12" : "#9CA3AF",
                  borderBottom: activeTab === tab ? "2px solid #3D6B1F" : "2px solid transparent",
                  backgroundColor: "transparent",
                }}
              >
                {tab === "reviews" ? `Reviews (${product.reviews})` : "Description"}
              </button>
            ))}
          </div>
          <div className="p-6">
            {activeTab === "description" ? (
              <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>{product.description}</p>
            ) : (
              <div className="space-y-4">
                {[
                  { name: "Fatima Al-Hassan", rating: 5, comment: "Excellent quality! Exactly as described. Fast delivery to Khartoum.", date: "2 days ago" },
                  { name: "Mohamed Ibrahim", rating: 4, comment: "Great product, very authentic. Will order again for sure.", date: "1 week ago" },
                  { name: "Aisha Osman", rating: 5, comment: "Perfect gift for my sister's wedding. Beautiful craftsmanship!", date: "2 weeks ago" },
                ].map(({ name, rating, comment, date }) => (
                  <div key={name} className="pb-4 border-b last:border-0" style={{ borderColor: "#F0EBD8" }}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: "#3D6B1F" }}>
                        {name[0]}
                      </div>
                      <span className="text-sm font-semibold" style={{ color: "#2C2C2C" }}>{name}</span>
                      <span className="text-xs" style={{ color: "#9CA3AF" }}>{date}</span>
                    </div>
                    <div className="flex mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} fill={i < rating ? "#F5C842" : "none"} color={i < rating ? "#F5C842" : "#D1D5DB"} />
                      ))}
                    </div>
                    <p className="text-sm" style={{ color: "#4B5563" }}>{comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-black text-xl mb-5" style={{ color: "#2A4B12" }}>Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
