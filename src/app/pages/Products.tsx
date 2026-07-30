import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ProductCard } from "../components/ProductCard";
import { PRODUCTS, CATEGORIES } from "../data/products";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categoryParam = searchParams.get("category") || "";
  const searchParam = searchParams.get("search") || "";
  const sellerParam = searchParams.get("seller") || "";

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];

    if (categoryParam && categoryParam !== "all") {
      list = list.filter((p) => p.category === categoryParam);
    }
    if (searchParam) {
      const q = searchParam.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.seller.toLowerCase().includes(q)
      );
    }
    if (sellerParam) {
      list = list.filter((p) => p.sellerId === sellerParam);
    }
    if (selectedCategories.length > 0) {
      list = list.filter((p) => selectedCategories.includes(p.category));
    }
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "reviews": list.sort((a, b) => b.reviews - a.reviews); break;
    }
    return list;
  }, [categoryParam, searchParam, sellerParam, selectedCategories, priceRange, sortBy]);

  const toggleCategory = (catId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(catId) ? prev.filter((c) => c !== catId) : [...prev, catId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 10000]);
    setSortBy("default");
    setSearchParams({});
  };

  const activeCategoryLabel = CATEGORIES.find((c) => c.id === categoryParam)?.name || "All Products";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F0E8" }}>
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb + Title */}
        <div className="mb-5">
          <p className="text-xs mb-1" style={{ color: "#9CA3AF" }}>
            Home / {activeCategoryLabel}
            {searchParam && ` / Search: "${searchParam}"`}
          </p>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h1 className="font-black text-2xl" style={{ color: "#2A4B12" }}>
              {searchParam ? `Results for "${searchParam}"` : activeCategoryLabel}
            </h1>
            <span className="text-sm" style={{ color: "#6B7280" }}>{filtered.length} products found</span>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-colors"
              style={{ backgroundColor: filtersOpen ? "#3D6B1F" : "white", color: filtersOpen ? "white" : "#2C2C2C", borderColor: filtersOpen ? "#3D6B1F" : "#D4C8B0" }}
            >
              <SlidersHorizontal size={15} /> Filters
            </button>
            {(selectedCategories.length > 0 || searchParam || categoryParam) && (
              <button onClick={clearFilters} className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors border border-red-200">
                <X size={14} /> Clear All
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: "#6B7280" }}>Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-3 pr-8 py-2 rounded-lg border text-sm appearance-none cursor-pointer"
                style={{ backgroundColor: "white", borderColor: "#D4C8B0", color: "#2C2C2C" }}
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#6B7280" }} />
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          {filtersOpen && (
            <aside className="w-56 flex-shrink-0">
              <div className="rounded-xl border p-4 sticky top-24" style={{ backgroundColor: "white", borderColor: "#E8DCC8" }}>
                <h3 className="font-bold mb-4 text-sm" style={{ color: "#2A4B12" }}>Filter by Category</h3>
                <div className="space-y-2 mb-6">
                  {CATEGORIES.slice(1).map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.id)}
                        onChange={() => toggleCategory(cat.id)}
                        className="w-4 h-4 rounded accent-green-700"
                      />
                      <span className="text-sm group-hover:text-green-700 transition-colors" style={{ color: "#4B5563" }}>
                        {cat.icon} {cat.name}
                      </span>
                    </label>
                  ))}
                </div>

                <h3 className="font-bold mb-3 text-sm" style={{ color: "#2A4B12" }}>Price Range (SDG)</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min={0}
                    max={10000}
                    step={100}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-green-700"
                  />
                  <div className="flex justify-between text-xs" style={{ color: "#6B7280" }}>
                    <span>SDG 0</span>
                    <span>SDG {priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Product grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-bold text-lg mb-2" style={{ color: "#2A4B12" }}>No products found</h3>
                <p className="text-sm" style={{ color: "#6B7280" }}>Try adjusting your search or filters</p>
                <button onClick={clearFilters} className="mt-4 px-6 py-2 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: "#3D6B1F" }}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
