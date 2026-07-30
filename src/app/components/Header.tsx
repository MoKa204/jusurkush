import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  ShoppingCart,
  Search,
  User,
  Heart,
  Menu,
  X,
  ChevronDown,
  Store,
  LogOut,
  Package,
  MapPin,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { CATEGORIES } from "../data/products";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export const Header = ({ onSearch }: HeaderProps) => {
  const { cartCount, user, logout, wishlist } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      if (onSearch) onSearch(searchQuery.trim());
    }
  };

  return (
    <header className="w-full sticky top-0 z-50 shadow-md">
      {/* Top bar */}
      <div style={{ backgroundColor: "#2A4B12" }} className="text-white py-1.5 px-4 text-xs flex justify-between items-center">
        <div className="flex items-center gap-1">
          <MapPin size={11} />
          <span>Delivering across Sudan · Khartoum, Omdurman, Port Sudan & more</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <Link to="/loan" className="hover:underline">Apply for Business Loan</Link>
          <Link to="/register?type=seller" className="hover:underline">Sell on Jusur Kush</Link>
        </div>
      </div>

      {/* Main header */}
      <div style={{ backgroundColor: "#3D6B1F" }} className="px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: "#F5F0E8" }}>
              <span className="text-lg font-black" style={{ color: "#3D6B1F" }}>J</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-black text-xl leading-none tracking-tight">Jusur</div>
              <div className="text-xs leading-none" style={{ color: "#C5E89A" }}>كوش · KUSH</div>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, sellers, categories..."
              className="flex-1 px-4 py-2.5 text-sm outline-none rounded-l-lg"
              style={{ backgroundColor: "#F5F0E8", color: "#2C2C2C" }}
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-r-lg font-semibold text-sm transition-colors hover:opacity-90"
              style={{ backgroundColor: "#F5C842", color: "#2C2C2C" }}
            >
              <Search size={18} />
            </button>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Wishlist */}
            <Link to="/wishlist" className="relative hidden sm:flex flex-col items-center text-white hover:opacity-80 transition-opacity">
              <Heart size={22} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold" style={{ backgroundColor: "#F5C842", color: "#2C2C2C" }}>
                  {wishlist.length}
                </span>
              )}
              <span className="text-xs hidden lg:block" style={{ color: "#C5E89A" }}>Wishlist</span>
            </Link>

            {/* User */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex flex-col items-center text-white hover:opacity-80 transition-opacity"
              >
                <User size={22} />
                <span className="text-xs hidden lg:flex items-center gap-0.5" style={{ color: "#C5E89A" }}>
                  {user ? user.name.split(" ")[0] : "Sign In"} <ChevronDown size={10} />
                </span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-lg shadow-xl border z-50 overflow-hidden" style={{ backgroundColor: "#F5F0E8", borderColor: "#D4C8B0" }}>
                  {user ? (
                    <>
                      <div className="px-4 py-3 border-b" style={{ borderColor: "#D4C8B0" }}>
                        <p className="text-sm font-semibold" style={{ color: "#2A4B12" }}>{user.name}</p>
                        <p className="text-xs" style={{ color: "#6B7280" }}>{user.email}</p>
                      </div>
                      <Link to="/account" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-white transition-colors" style={{ color: "#2C2C2C" }}>
                        <Package size={15} /> My Orders
                      </Link>
                      {user.type === "seller" && (
                        <Link to="/seller-dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-white transition-colors" style={{ color: "#2C2C2C" }}>
                          <Store size={15} /> Seller Dashboard
                        </Link>
                      )}
                      <button onClick={() => { logout(); setUserMenuOpen(false); navigate("/"); }} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-white transition-colors" style={{ color: "#DC2626" }}>
                        <LogOut size={15} /> Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm font-semibold hover:bg-white transition-colors" style={{ color: "#2A4B12" }}>
                        <User size={15} /> Sign In
                      </Link>
                      <Link to="/register" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-white transition-colors" style={{ color: "#2C2C2C" }}>
                        New customer? Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative flex flex-col items-center text-white hover:opacity-80 transition-opacity">
              <div className="relative">
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold" style={{ backgroundColor: "#F5C842", color: "#2C2C2C" }}>
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs hidden lg:block" style={{ color: "#C5E89A" }}>Cart</span>
            </Link>

            {/* Mobile menu */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden text-white">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Category nav */}
      <div style={{ backgroundColor: "#4A7C23" }} className="hidden sm:block px-4 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-0">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white hover:bg-black/10 whitespace-nowrap transition-colors"
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden" style={{ backgroundColor: "#F5F0E8" }}>
          <div className="px-4 py-3 space-y-2">
            {CATEGORIES.map((cat) => (
              <Link key={cat.id} to={`/products?category=${cat.id}`} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 py-2 text-sm border-b" style={{ color: "#2C2C2C", borderColor: "#D4C8B0" }}>
                <span>{cat.icon}</span> {cat.name}
              </Link>
            ))}
            <Link to="/loan" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-semibold" style={{ color: "#3D6B1F" }}>Apply for Business Loan</Link>
            <Link to="/register?type=seller" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-semibold" style={{ color: "#3D6B1F" }}>Sell on Jusur Kush</Link>
          </div>
        </div>
      )}
    </header>
  );
};
