import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { Filter, SlidersHorizontal, Grid, List, X, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

const categories = ['All', 'Handicrafts', 'Textiles', 'Food & Spices', 'Jewelry', 'Home & Décor', 'Fashion', 'Agriculture'];
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Best Rated' },
  { value: 'reviews', label: 'Most Reviews' },
];

export function Shop() {
  const { products } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [gridView, setGridView] = useState<'grid' | 'list'>('grid');

  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(
    categories.includes(categoryParam) ? categoryParam : 'All'
  );

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (queryParam) {
      const q = queryParam.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.seller.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'reviews': result.sort((a, b) => b.reviews - a.reviews); break;
      default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [products, queryParam, selectedCategory, priceRange, sortBy]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    const params = new URLSearchParams(searchParams);
    if (cat === 'All') params.delete('category');
    else params.set('category', cat);
    setSearchParams(params);
  };

  const formatPrice = (p: number) => new Intl.NumberFormat('en-US').format(p);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-bold text-gray-800 text-xl">
            {queryParam ? `Results for "${queryParam}"` : selectedCategory === 'All' ? 'All Products' : selectedCategory}
          </h1>
          <p className="text-sm text-gray-500">{filteredProducts.length} products found</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-gray-200 text-sm bg-white text-gray-700 outline-none focus:border-green-400 cursor-pointer"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          {/* View toggle */}
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setGridView('grid')}
              className={`p-2 ${gridView === 'grid' ? 'bg-green-700 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridView('list')}
              className={`p-2 ${gridView === 'list' ? 'bg-green-700 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          {/* Filter toggle (mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm bg-white text-gray-700 hover:bg-gray-50 lg:hidden"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-56 flex-shrink-0`}>
          <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800 text-sm">Filters</h3>
              <button onClick={() => { setSelectedCategory('All'); setPriceRange([0, 100000]); }} className="text-xs hover:underline" style={{ color: '#2D5A27' }}>
                Clear All
              </button>
            </div>

            {/* Categories */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Category</h4>
              <div className="space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      selectedCategory === cat
                        ? 'text-white font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    style={selectedCategory === cat ? { backgroundColor: '#2D5A27' } : {}}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Price Range (SDG)</h4>
              <div className="space-y-2">
                {[
                  [0, 5000], [5000, 15000], [15000, 30000], [30000, 50000], [50000, 100000]
                ].map(([min, max]) => (
                  <button
                    key={`${min}-${max}`}
                    onClick={() => setPriceRange([min, max])}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      priceRange[0] === min && priceRange[1] === max
                        ? 'text-white font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    style={priceRange[0] === min && priceRange[1] === max ? { backgroundColor: '#2D5A27' } : {}}
                  >
                    {formatPrice(min)} – {formatPrice(max)}
                  </button>
                ))}
                <button
                  onClick={() => setPriceRange([0, 100000])}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    priceRange[0] === 0 && priceRange[1] === 100000
                      ? 'text-white font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  style={priceRange[0] === 0 && priceRange[1] === 100000 ? { backgroundColor: '#2D5A27' } : {}}
                >
                  All Prices
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1 min-w-0">
          {/* Active filters */}
          {(selectedCategory !== 'All' || queryParam) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCategory !== 'All' && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: '#2D5A27' }}>
                  {selectedCategory}
                  <button onClick={() => handleCategoryChange('All')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {queryParam && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: '#2D5A27' }}>
                  "{queryParam}"
                  <button onClick={() => { const p = new URLSearchParams(searchParams); p.delete('q'); setSearchParams(p); }}><X className="w-3 h-3" /></button>
                </span>
              )}
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <h3 className="font-bold text-gray-700 mb-2">No products found</h3>
              <p className="text-sm text-gray-500">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className={
              gridView === 'grid'
                ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4'
                : 'flex flex-col gap-4'
            }>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
