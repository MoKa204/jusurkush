import React from "react";
import { Link } from "react-router";
import { ArrowRight, Shield, Truck, CreditCard, Star, TrendingUp, Users } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ProductCard } from "../components/ProductCard";
import { PRODUCTS, CATEGORIES, SELLERS } from "../data/products";

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 8);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F0E8" }}>
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #2A4B12 0%, #3D6B1F 50%, #5A8A2E 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: "rgba(245,240,232,0.15)", color: "#F5F0E8", border: "1px solid rgba(245,240,232,0.3)" }}>
              🇸🇩 Sudan's Startup Marketplace
            </div>
            <h1 className="text-white mb-4" style={{ fontSize: "2.5rem", fontWeight: 900, lineHeight: 1.1 }}>
              جسور كوش<br />
              <span style={{ color: "#C5E89A" }}>Jusur Kush</span>
            </h1>
            <p className="mb-6 max-w-lg mx-auto lg:mx-0" style={{ color: "#C5E89A", fontSize: "1.1rem", lineHeight: 1.6 }}>
              Bridging Sudanese startup businesses with customers. Discover authentic handmade goods, traditional crafts, and local products from across Sudan.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                to="/products"
                className="px-8 py-3 rounded-lg font-bold text-sm transition-all hover:scale-105 flex items-center gap-2 justify-center"
                style={{ backgroundColor: "#F5F0E8", color: "#2A4B12" }}
              >
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link
                to="/register?type=seller"
                className="px-8 py-3 rounded-lg font-bold text-sm border-2 transition-all hover:bg-white/10 flex items-center gap-2 justify-center"
                style={{ borderColor: "rgba(255,255,255,0.5)", color: "white" }}
              >
                Start Selling
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start">
              {[{ value: "500+", label: "Sellers" }, { value: "2,000+", label: "Products" }, { value: "15,000+", label: "Customers" }].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="font-black text-white text-xl">{value}</div>
                  <div className="text-xs" style={{ color: "#A7C98A" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-3 max-w-sm lg:max-w-md">
            {PRODUCTS.slice(0, 4).map((p, i) => (
              <Link key={p.id} to={`/product/${p.id}`} className={`block rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform ${i === 0 ? "col-span-2" : ""}`}>
                <img src={p.image} alt={p.name} className="w-full object-cover" style={{ height: i === 0 ? "160px" : "120px" }} />
              </Link>
            ))}
          </div>
        </div>
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: "40px" }}>
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0 40 Q360 0 720 20 Q1080 40 1440 10 L1440 40 Z" fill="#F5F0E8" />
          </svg>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-8 px-4" style={{ backgroundColor: "#EDE8D8", borderBottom: "1px solid #D4C8B0" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Truck size={22} />, title: "Fast Delivery", desc: "Across all Sudan states" },
            { icon: <Shield size={22} />, title: "Buyer Protection", desc: "100% secure payments" },
            { icon: <CreditCard size={22} />, title: "Easy Payments", desc: "SDG, Mobile Money & more" },
            { icon: <Users size={22} />, title: "Local Support", desc: "24/7 Arabic & English" },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3 px-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#3D6B1F", color: "white" }}>
                {icon}
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: "#2A4B12" }}>{title}</p>
                <p className="text-xs" style={{ color: "#6B7280" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-black" style={{ color: "#2A4B12", fontSize: "1.5rem" }}>Shop by Category</h2>
              <p className="text-sm" style={{ color: "#6B7280" }}>Find what you're looking for</p>
            </div>
            <Link to="/products" className="text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all" style={{ color: "#3D6B1F" }}>
              View All <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CATEGORIES.slice(1).map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="flex flex-col items-center gap-2 p-3 rounded-xl border hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer text-center group"
                style={{ backgroundColor: "white", borderColor: "#E8DCC8" }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform" style={{ backgroundColor: "#F0EBD8" }}>
                  {cat.icon}
                </div>
                <span className="text-xs font-semibold leading-tight" style={{ color: "#2A4B12" }}>{cat.name.split("&")[0].trim()}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-10 px-4" style={{ backgroundColor: "#EDE8D8" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-black flex items-center gap-2" style={{ color: "#2A4B12", fontSize: "1.5rem" }}>
                <TrendingUp size={22} style={{ color: "#3D6B1F" }} /> Featured Products
              </h2>
              <p className="text-sm" style={{ color: "#6B7280" }}>Top picks from Sudanese sellers</p>
            </div>
            <Link to="/products" className="text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all" style={{ color: "#3D6B1F" }}>
              View All <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Sellers Section */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-black" style={{ color: "#2A4B12", fontSize: "1.5rem" }}>Top Sellers</h2>
              <p className="text-sm" style={{ color: "#6B7280" }}>Trusted Sudanese businesses</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SELLERS.map((seller) => (
              <Link
                key={seller.id}
                to={`/products?seller=${seller.id}`}
                className="p-4 rounded-xl border hover:shadow-md transition-all hover:-translate-y-0.5 text-center"
                style={{ backgroundColor: "white", borderColor: "#E8DCC8" }}
              >
                <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-3 text-2xl font-black text-white" style={{ backgroundColor: "#3D6B1F" }}>
                  {seller.name[0]}
                </div>
                <p className="text-sm font-bold" style={{ color: "#2A4B12" }}>{seller.name}</p>
                <p className="text-xs mb-2" style={{ color: "#9CA3AF" }}>{seller.location}</p>
                <div className="flex items-center justify-center gap-1">
                  <Star size={12} fill="#5A8A2E" color="#5A8A2E" />
                  <span className="text-xs font-semibold" style={{ color: "#2C2C2C" }}>{seller.rating}</span>
                </div>
                <p className="text-xs mt-1" style={{ color: "#9CA3AF" }}>{seller.products} products</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Business Loan Banner */}
      <section className="px-4 py-10">
        <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #2A4B12 0%, #4A7C23 100%)" }}>
          <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
            <div className="flex-1 text-center md:text-left">
              <div className="text-4xl mb-3">💼</div>
              <h2 className="font-black text-white mb-3" style={{ fontSize: "1.75rem" }}>
                Start Your Business in Sudan
              </h2>
              <p style={{ color: "#C5E89A" }} className="mb-6 text-sm leading-relaxed max-w-md">
                Apply for a micro-loan to launch your business on Jusur Kush. Get up to SDG 50,000 with flexible repayment plans designed for Sudanese entrepreneurs.
              </p>
              <Link
                to="/loan"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-sm transition-all hover:scale-105"
                style={{ backgroundColor: "#F5F0E8", color: "#2A4B12" }}
              >
                Apply for Loan <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "SDG 50,000", label: "Max Loan Amount" },
                { value: "6–24 mo", label: "Repayment Period" },
                { value: "5%", label: "Annual Interest" },
                { value: "48 hrs", label: "Approval Time" },
              ].map(({ value, label }) => (
                <div key={label} className="rounded-xl p-4 text-center" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                  <div className="font-black text-white text-lg">{value}</div>
                  <div className="text-xs" style={{ color: "#A7C98A" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}