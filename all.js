// File: src/main.tsx

  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(<App />);
  

// File: src/app/App.tsx
import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AppProvider } from "./context/AppContext";

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

// File: src/app/routes.tsx
import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Loan from "./pages/Loan";
import Wishlist from "./pages/Wishlist";

export const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/products", Component: Products },
  { path: "/product/:id", Component: ProductDetail },
  { path: "/cart", Component: Cart },
  { path: "/checkout", Component: Checkout },
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  { path: "/loan", Component: Loan },
  { path: "/wishlist", Component: Wishlist },
]);

// File: src/app/components/Footer.tsx
import React from "react";
import { Link } from "react-router";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#2A4B12", color: "#F5F0E8" }} className="mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#F5F0E8" }}>
                <span className="text-xl font-black" style={{ color: "#3D6B1F" }}>J</span>
              </div>
              <div>
                <div className="text-white font-black text-xl leading-none">Jusur Kush</div>
                <div className="text-xs" style={{ color: "#C5E89A" }}>جسور كوش</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#A7C98A" }}>
              Connecting Sudanese startup businesses with customers across Sudan and the world. Supporting local entrepreneurs since 2024.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity" style={{ backgroundColor: "#3D6B1F" }}>
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity" style={{ backgroundColor: "#3D6B1F" }}>
                <Instagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity" style={{ backgroundColor: "#3D6B1F" }}>
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/products", label: "All Products" },
                { to: "/register?type=seller", label: "Become a Seller" },
                { to: "/loan", label: "Business Loan" },
                { to: "/login", label: "Sign In" },
                { to: "/register", label: "Register" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm hover:text-white transition-colors" style={{ color: "#A7C98A" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">Categories</h4>
            <ul className="space-y-2">
              {["Textiles & Fabrics", "Food & Spices", "Pottery & Ceramics", "Jewelry", "Handmade Crafts", "Leather Goods", "Woven Baskets"].map((cat) => (
                <li key={cat}>
                  <Link to={`/products?category=${cat.toLowerCase().replace(/\s+/g, "-")}`} className="text-sm hover:text-white transition-colors" style={{ color: "#A7C98A" }}>
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm" style={{ color: "#A7C98A" }}>
                <MapPin size={15} className="mt-0.5 flex-shrink-0" />
                <span>Khartoum, Al-Gamhoria Street, Building 14, Sudan</span>
              </li>
              <li className="flex items-center gap-2 text-sm" style={{ color: "#A7C98A" }}>
                <Phone size={15} className="flex-shrink-0" />
                <a href="tel:+249123456789" className="hover:text-white transition-colors">+249 123 456 789</a>
              </li>
              <li className="flex items-center gap-2 text-sm" style={{ color: "#A7C98A" }}>
                <Mail size={15} className="flex-shrink-0" />
                <a href="mailto:info@jusur-kush.sd" className="hover:text-white transition-colors">info@jusur-kush.sd</a>
              </li>
            </ul>
            <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: "#3D6B1F" }}>
              <p className="text-xs font-semibold text-white mb-1">Business Hours</p>
              <p className="text-xs" style={{ color: "#A7C98A" }}>Sun–Thu: 8:00 AM – 6:00 PM</p>
              <p className="text-xs" style={{ color: "#A7C98A" }}>Fri–Sat: 10:00 AM – 4:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: "#1A3309", borderTop: "1px solid #3D6B1F" }} className="px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: "#6B8B4A" }}>
            © 2024 Jusur Kush جسور كوش. All rights reserved. Made with ❤️ for Sudan.
          </p>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Service", "Seller Agreement"].map((item) => (
              <a key={item} href="#" className="text-xs hover:text-white transition-colors" style={{ color: "#6B8B4A" }}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// File: src/app/components/Header.tsx
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

// File: src/app/components/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAF8F2' }}>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// File: src/app/components/ProductCard.tsx
import React from "react";
import { Link } from "react-router";
import { Heart, Star, ShoppingCart, MapPin } from "lucide-react";
import { Product } from "../context/AppContext";
import { useApp } from "../context/AppContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const isWishlisted = wishlist.includes(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-200" style={{ backgroundColor: "#FFFFFF", borderColor: "#E8DCC8" }}>
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden" style={{ paddingBottom: "70%" }}>
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-bold" style={{ backgroundColor: "#3D6B1F", color: "white" }}>
            {product.badge}
          </div>
        )}
        {/* Discount */}
        {discount > 0 && (
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-xs font-bold" style={{ backgroundColor: "#DC2626", color: "white" }}>
            -{discount}%
          </div>
        )}
        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200"
          style={{ backgroundColor: isWishlisted ? "#DC2626" : "white" }}
        >
          <Heart size={14} fill={isWishlisted ? "white" : "none"} color={isWishlisted ? "white" : "#6B7280"} />
        </button>
      </Link>

      {/* Content */}
      <div className="p-3">
        <Link to={`/product/${product.id}`}>
          <p className="text-xs mb-1" style={{ color: "#6B7280" }}>{product.seller}</p>
          <h3 className="text-sm font-semibold line-clamp-2 mb-2 hover:text-green-700 transition-colors" style={{ color: "#2C2C2C" }}>
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={11}
                fill={i < Math.floor(product.rating) ? "#F5C842" : "none"}
                color={i < Math.floor(product.rating) ? "#F5C842" : "#D1D5DB"}
              />
            ))}
          </div>
          <span className="text-xs" style={{ color: "#6B7280" }}>({product.reviews})</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 mb-3">
          <MapPin size={11} style={{ color: "#9CA3AF" }} />
          <span className="text-xs" style={{ color: "#9CA3AF" }}>{product.location}</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-base" style={{ color: "#2A4B12" }}>
              SDG {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs line-through ml-1.5" style={{ color: "#9CA3AF" }}>
                SDG {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
            style={{ backgroundColor: "#3D6B1F", color: "white" }}
            title="Add to cart"
          >
            <ShoppingCart size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

// File: src/app/components/figma/ImageWithFallback.tsx
import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, className, ...rest } = props

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  )
}

// File: src/app/components/ui/accordion.tsx
"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "./utils";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

// File: src/app/components/ui/alert-dialog.tsx
"use client";

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "./utils";
import { buttonVariants } from "./button";

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  );
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants(), className)}
      {...props}
    />
  );
}

function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: "outline" }), className)}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};

// File: src/app/components/ui/alert.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };

// File: src/app/components/ui/aspect-ratio.tsx
"use client";

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
}

export { AspectRatio };

// File: src/app/components/ui/avatar.tsx
"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "./utils";

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };

// File: src/app/components/ui/badge.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };

// File: src/app/components/ui/breadcrumb.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "./utils";

function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className,
      )}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  );
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};

// File: src/app/components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

// File: src/app/components/ui/calendar.tsx
"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "./utils";
import { buttonVariants } from "./button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md",
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100",
        ),
        day_range_start:
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_range_end:
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };

// File: src/app/components/ui/card.tsx
import * as React from "react";

import { cn } from "./utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <h4
      data-slot="card-title"
      className={cn("leading-none", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 [&:last-child]:pb-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 pb-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};

// File: src/app/components/ui/carousel.tsx
"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "./utils";
import { Button } from "./button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};

// File: src/app/components/ui/chart.tsx
"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "./utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color,
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<"div"> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    labelKey?: string;
  }) {
  const { config } = useChart();

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }

    const [item] = payload;
    const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value =
      !labelKey && typeof label === "string"
        ? config[label as keyof typeof config]?.label || label
        : itemConfig?.label;

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      );
    }

    if (!value) {
      return null;
    }

    return <div className={cn("font-medium", labelClassName)}>{value}</div>;
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ]);

  if (!active || !payload?.length) {
    return null;
  }

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div
      className={cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className,
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item.payload.fill || item.color;

          return (
            <div
              key={item.dataKey}
              className={cn(
                "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                indicator === "dot" && "items-center",
              )}
            >
              {formatter && item?.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, index, item.payload)
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <div
                        className={cn(
                          "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                          {
                            "h-2.5 w-2.5": indicator === "dot",
                            "w-1": indicator === "line",
                            "w-0 border-[1.5px] border-dashed bg-transparent":
                              indicator === "dashed",
                            "my-0.5": nestLabel && indicator === "dashed",
                          },
                        )}
                        style={
                          {
                            "--color-bg": indicatorColor,
                            "--color-border": indicatorColor,
                          } as React.CSSProperties
                        }
                      />
                    )
                  )}
                  <div
                    className={cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center",
                    )}
                  >
                    <div className="grid gap-1.5">
                      {nestLabel ? tooltipLabel : null}
                      <span className="text-muted-foreground">
                        {itemConfig?.label || item.name}
                      </span>
                    </div>
                    {item.value && (
                      <span className="text-foreground font-mono font-medium tabular-nums">
                        {item.value.toLocaleString()}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ChartLegend = RechartsPrimitive.Legend;

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> &
  Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
    hideIcon?: boolean;
    nameKey?: string;
  }) {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className,
      )}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <div
            key={item.value}
            className={cn(
              "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3",
            )}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
}

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string;
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};

// File: src/app/components/ui/checkbox.tsx
"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "./utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border bg-input-background dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };

// File: src/app/components/ui/collapsible.tsx
"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

// File: src/app/components/ui/command.tsx
"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon } from "lucide-react";

import { cn } from "./utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        className,
      )}
      {...props}
    />
  );
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string;
  description?: string;
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-9 items-center gap-2 border-b px-3"
    >
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className,
      )}
      {...props}
    />
  );
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm"
      {...props}
    />
  );
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className,
      )}
      {...props}
    />
  );
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("bg-border -mx-1 h-px", className)}
      {...props}
    />
  );
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};

// File: src/app/components/ui/context-menu.tsx
"use client";

import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

import { cn } from "./utils";

function ContextMenu({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

function ContextMenuTrigger({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
  return (
    <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
  );
}

function ContextMenuGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  );
}

function ContextMenuPortal({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  );
}

function ContextMenuSub({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />;
}

function ContextMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  );
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </ContextMenuPrimitive.SubTrigger>
  );
}

function ContextMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
  return (
    <ContextMenuPrimitive.SubContent
      data-slot="context-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-slot="context-menu-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className,
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

function ContextMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        "text-foreground px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};

// File: src/app/components/ui/dialog.tsx
"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { cn } from "./utils";

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};

// File: src/app/components/ui/drawer.tsx
"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "./utils";

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className,
        )}
        {...props}
      >
        <div className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};

// File: src/app/components/ui/dropdown-menu.tsx
"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

import { cn } from "./utils";

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className,
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};

// File: src/app/components/ui/form.tsx
"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { cn } from "./utils";
import { Label } from "./label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {body}
    </p>
  );
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};

// File: src/app/components/ui/hover-card.tsx
"use client";

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "./utils";

function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;
}

function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  );
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className,
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };

// File: src/app/components/ui/input-otp.tsx
"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";

import { cn } from "./utils";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm bg-input-background transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };

// File: src/app/components/ui/input.tsx
import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };

// File: src/app/components/ui/label.tsx
"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "./utils";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Label };

// File: src/app/components/ui/menubar.tsx
"use client";

import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

import { cn } from "./utils";

function Menubar({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      className={cn(
        "bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs",
        className,
      )}
      {...props}
    />
  );
}

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />;
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />;
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />;
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return (
    <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
  );
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none",
        className,
      )}
      {...props}
    />
  );
}

function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-md",
          className,
        )}
        {...props}
      />
    </MenubarPortal>
  );
}

function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  );
}

function MenubarRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  );
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className,
      )}
      {...props}
    />
  );
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  );
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className,
      )}
      {...props}
    />
  );
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
};

// File: src/app/components/ui/navigation-menu.tsx
import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "./utils";

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean;
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1",
);

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
        "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div
      className={cn(
        "absolute top-full left-0 isolate z-50 flex justify-center",
      )}
    >
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        className,
      )}
      {...props}
    >
      <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
};

// File: src/app/components/ui/pagination.tsx
import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "./utils";
import { Button, buttonVariants } from "./button";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};

// File: src/app/components/ui/popover.tsx
"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "./utils";

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };

// File: src/app/components/ui/progress.tsx
"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "./utils";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };

// File: src/app/components/ui/radio-group.tsx
"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";

import { cn } from "./utils";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };

// File: src/app/components/ui/resizable.tsx
"use client";

import * as React from "react";
import { GripVerticalIcon } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "./utils";

function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className,
      )}
      {...props}
    />
  );
}

function ResizablePanel({
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };

// File: src/app/components/ui/scroll-area.tsx
"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "./utils";

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent",
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };

// File: src/app/components/ui/select.tsx
"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";

import { cn } from "./utils";

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default";
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-full items-center justify-between gap-2 rounded-md border bg-input-background px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};

// File: src/app/components/ui/separator.tsx
"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "./utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };

// File: src/app/components/ui/sheet.tsx
"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { cn } from "./utils";

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left";
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className,
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};

// File: src/app/components/ui/sidebar.tsx
"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { PanelLeftIcon } from "lucide-react";

import { useIsMobile } from "./use-mobile";
import { cn } from "./utils";
import { Button } from "./button";
import { Input } from "./input";
import { Separator } from "./separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./sheet";
import { Skeleton } from "./skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open],
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className,
      )}
      {...props}
    />
  );
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "bg-background relative flex w-full flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className,
      )}
      {...props}
    />
  );
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("bg-background h-8 w-full shadow-none", className)}
      {...props}
    />
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("bg-sidebar-border mx-2 w-auto", className)}
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  );
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  );
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  );
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
  showOnHover?: boolean;
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean;
}) {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  );
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  );
}

function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
  size?: "sm" | "md";
  isActive?: boolean;
}) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};

// File: src/app/components/ui/skeleton.tsx
import { cn } from "./utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };

// File: src/app/components/ui/slider.tsx
"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "./utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-4 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };

// File: src/app/components/ui/sonner.tsx
"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };

// File: src/app/components/ui/switch.tsx
"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "./utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-switch-background focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-card dark:data-[state=unchecked]:bg-card-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };

// File: src/app/components/ui/table.tsx
"use client";

import * as React from "react";

import { cn } from "./utils";

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};

// File: src/app/components/ui/tabs.tsx
"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "./utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px] flex",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-card dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };

// File: src/app/components/ui/textarea.tsx
import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-input-background px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };

// File: src/app/components/ui/toggle-group.tsx
"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";

import { cn } from "./utils";
import { toggleVariants } from "./toggle";

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
});

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(
        "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };

// File: src/app/components/ui/toggle.tsx
"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };

// File: src/app/components/ui/tooltip.tsx
"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "./utils";

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

// File: src/app/components/ui/use-mobile.ts
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

// File: src/app/components/ui/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// File: src/app/context/AppContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  seller: string;
  sellerId: string;
  location: string;
  rating: number;
  reviews: number;
  description: string;
  stock: number;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "customer" | "seller";
  avatar?: string;
}

interface AppContextType {
  cart: CartItem[];
  user: User | null;
  wishlist: string[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  login: (user: User) => void;
  logout: () => void;
  toggleWishlist: (productId: string) => void;
  cartTotal: number;
  cartCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("jusur-cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem("jusur-user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("jusur-wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("jusur-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) localStorage.setItem("jusur-user", JSON.stringify(user));
    else localStorage.removeItem("jusur-user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("jusur-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setCart([]);

  const login = (userData: User) => setUser(userData);
  const logout = () => {
    setUser(null);
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const cartTotal = cart.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        cart,
        user,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        login,
        logout,
        toggleWishlist,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// File: src/app/data/products.ts
import { Product } from "../context/AppContext";

export const CATEGORIES = [
  { id: "all", name: "All Categories", nameAr: "جميع الفئات", icon: "🛍️" },
  { id: "textiles", name: "Textiles & Fabrics", nameAr: "نسيج وأقمشة", icon: "🧵" },
  { id: "food", name: "Food & Spices", nameAr: "طعام وتوابل", icon: "🌿" },
  { id: "pottery", name: "Pottery & Ceramics", nameAr: "فخار وسيراميك", icon: "🏺" },
  { id: "jewelry", name: "Jewelry & Accessories", nameAr: "مجوهرات وإكسسوار", icon: "💍" },
  { id: "crafts", name: "Handmade Crafts", nameAr: "مشغولات يدوية", icon: "🎨" },
  { id: "leather", name: "Leather Goods", nameAr: "منتجات جلدية", icon: "👜" },
  { id: "baskets", name: "Woven Baskets", nameAr: "سلال منسوجة", icon: "🧺" },
];

export const SELLERS = [
  { id: "s1", name: "Amira Handicrafts", location: "Khartoum", rating: 4.9, products: 24 },
  { id: "s2", name: "Nile Spices Co.", location: "Omdurman", rating: 4.7, products: 18 },
  { id: "s3", name: "Nubian Pottery", location: "Dongola", rating: 4.8, products: 31 },
  { id: "s4", name: "Gold Desert Jewelry", location: "Port Sudan", rating: 4.6, products: 15 },
  { id: "s5", name: "Kush Leather Works", location: "Kassala", rating: 4.9, products: 22 },
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Traditional Sudanese Thobe Fabric",
    nameAr: "قماش الثوب السوداني التقليدي",
    price: 2500,
    originalPrice: 3200,
    image: "https://images.unsplash.com/photo-1768212566108-4ce4f329e4d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjB0ZXh0aWxlcyUyMGZhYnJpY3xlbnwxfHx8fDE3NzYxNTk1NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "textiles",
    seller: "Amira Handicrafts",
    sellerId: "s1",
    location: "Khartoum",
    rating: 4.8,
    reviews: 142,
    description: "Premium quality traditional Sudanese thobe fabric with authentic embroidery. Handwoven by skilled artisans in Khartoum. Perfect for special occasions and weddings.",
    stock: 15,
    badge: "Best Seller",
  },
  {
    id: "p2",
    name: "Sudanese Mixed Spice Blend",
    nameAr: "خلطة بهارات سودانية مشكلة",
    price: 450,
    originalPrice: 600,
    image: "https://images.unsplash.com/photo-1760297516529-94efc9e5bc2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwc3BpY2VzJTIwZm9vZCUyMG1hcmtldHxlbnwxfHx8fDE3NzYxNTk1NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "food",
    seller: "Nile Spices Co.",
    sellerId: "s2",
    location: "Omdurman",
    rating: 4.9,
    reviews: 287,
    description: "Authentic Sudanese spice blend made from premium quality local herbs and spices. Ideal for traditional dishes like Mullah and Asida. 500g pack.",
    stock: 50,
    badge: "Top Rated",
  },
  {
    id: "p3",
    name: "Hand-Painted Nubian Clay Pot",
    nameAr: "قدر طيني نوبي مرسوم يدوياً",
    price: 1800,
    image: "https://images.unsplash.com/photo-1682668701024-b6508708a764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBvdHRlcnklMjBjZXJhbWljcyUyMEFmcmljYXxlbnwxfHx8fDE3NzYxNTk1NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "pottery",
    seller: "Nubian Pottery",
    sellerId: "s3",
    location: "Dongola",
    rating: 4.7,
    reviews: 98,
    description: "Beautiful hand-painted Nubian clay pot with traditional geometric patterns. Each piece is unique and crafted by master potters from Dongola. Perfect for home décor.",
    stock: 8,
    badge: "Handmade",
  },
  {
    id: "p4",
    name: "Gold-Plated Nubian Necklace",
    nameAr: "قلادة نوبية مطلية بالذهب",
    price: 3500,
    originalPrice: 4200,
    image: "https://images.unsplash.com/photo-1767249630751-5d8f13cfdb04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwamV3ZWxyeSUyMGdvbGQlMjBhY2Nlc3Nvcmllc3xlbnwxfHx8fDE3NzYxNTk1NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "jewelry",
    seller: "Gold Desert Jewelry",
    sellerId: "s4",
    location: "Port Sudan",
    rating: 4.6,
    reviews: 64,
    description: "Elegant gold-plated necklace inspired by ancient Nubian jewelry designs. Made with high-quality materials and handcrafted by expert jewelers from Port Sudan.",
    stock: 5,
    badge: "Limited",
  },
  {
    id: "p5",
    name: "Carved Wooden African Art Piece",
    nameAr: "قطعة فنية أفريقية منحوتة من الخشب",
    price: 2200,
    image: "https://images.unsplash.com/photo-1760681556100-3d829726b7c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwd29vZGVuJTIwY3JhZnRzJTIwY2FydmluZ3xlbnwxfHx8fDE3NzYxNTk1ODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "crafts",
    seller: "Amira Handicrafts",
    sellerId: "s1",
    location: "Khartoum",
    rating: 4.8,
    reviews: 76,
    description: "Unique hand-carved wooden art piece featuring traditional African motifs. Made from sustainable local ebony wood. A perfect gift and home decoration.",
    stock: 12,
  },
  {
    id: "p6",
    name: "Handcrafted Leather Shoulder Bag",
    nameAr: "حقيبة كتف جلدية مصنوعة يدوياً",
    price: 4800,
    originalPrice: 5500,
    image: "https://images.unsplash.com/photo-1763475945655-49b36200f20a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwYmFncyUyMGhhbmRtYWRlJTIwbWFya2V0fGVufDF8fHx8MTc3NjE1OTU4MXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "leather",
    seller: "Kush Leather Works",
    sellerId: "s5",
    location: "Kassala",
    rating: 4.9,
    reviews: 203,
    description: "Premium quality genuine leather shoulder bag handcrafted in Kassala. Features traditional Sudanese stitching patterns and durable brass hardware. Available in brown and black.",
    stock: 20,
    badge: "Premium",
  },
  {
    id: "p7",
    name: "Traditional Woven Straw Basket",
    nameAr: "سلة قش منسوجة تقليدية",
    price: 650,
    image: "https://images.unsplash.com/photo-1760727467662-5f0943d196a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwd292ZW4lMjBiYXNrZXRzJTIwc2hvcHxlbnwxfHx8fDE3NzYxNTk1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "baskets",
    seller: "Amira Handicrafts",
    sellerId: "s1",
    location: "Khartoum",
    rating: 4.5,
    reviews: 119,
    description: "Beautiful hand-woven straw basket with colorful traditional Sudanese patterns. Functional and decorative. Ideal for storage or as a unique home accent piece.",
    stock: 30,
  },
  {
    id: "p8",
    name: "Premium Hibiscus (Karkade) Tea",
    nameAr: "شاي الكركديه الممتاز",
    price: 380,
    originalPrice: 480,
    image: "https://images.unsplash.com/photo-1732845691564-f7cb4132a89e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTdWRhbiUyME5pbGUlMjByaXZlciUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzYxNTk1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "food",
    seller: "Nile Spices Co.",
    sellerId: "s2",
    location: "Omdurman",
    rating: 4.9,
    reviews: 431,
    description: "Premium dried Hibiscus flowers (Karkade) for making the famous Sudanese tea. Sourced directly from organic farms in Sudan. 250g pack. Rich in antioxidants.",
    stock: 100,
    badge: "Organic",
  },
];

// File: src/app/pages/Auth.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router';
import { Eye, EyeOff, User, Mail, Phone, MapPin, Store, ShoppingBag, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const SUDAN_CITIES = [
  'Khartoum', 'Omdurman', 'Khartoum North', 'Port Sudan', 'Kassala',
  'El Obeid', 'Wad Madani', 'Dongola', 'Al Fashir', 'Nyala',
  'Malakal', 'Atbara', 'Sennar', 'Ed Damazin',
];

export function Auth() {
  const { user, setUser } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<'login' | 'register'>(
    searchParams.get('mode') === 'register' ? 'register' : 'login'
  );
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    password: '',
    confirmPassword: '',
    role: 'buyer' as 'buyer' | 'seller',
  });

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  const updateForm = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Simulate login — in production, use real auth
    setTimeout(() => {
      if (!form.email || !form.password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }
      if (form.password.length < 6) {
        setError('Invalid credentials. Please try again.');
        setLoading(false);
        return;
      }
      // Mock user from email
      setUser({
        id: Math.random().toString(36).substring(2),
        name: form.email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        email: form.email,
        phone: '+249 912 345 678',
        city: 'Khartoum',
        role: 'buyer',
      });
      navigate('/');
      setLoading(false);
    }, 800);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (!form.name || !form.email || !form.phone || !form.city || !form.password) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }
      if (form.password !== form.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }
      if (form.password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }
      setUser({
        id: Math.random().toString(36).substring(2),
        name: form.name,
        email: form.email,
        phone: form.phone,
        city: form.city,
        role: form.role,
      });
      navigate('/');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#FAF8F2' }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-96 p-10 text-white" style={{ backgroundColor: '#2D5A27' }}>
        <div>
          <div className="mb-8">
            <h1 className="text-white font-black text-3xl">JUSUR</h1>
            <p style={{ color: '#D4AF37' }} className="font-bold tracking-widest">كوش KUSH</p>
          </div>
          <h2 className="text-2xl font-bold mb-4">Sudan's Premier Marketplace</h2>
          <p className="text-green-200 leading-relaxed">
            Connect with local Sudanese businesses, discover handcrafted goods, and support the local economy.
          </p>
        </div>
        <div className="space-y-4">
          {[
            { icon: '🏺', text: '2,400+ unique products from local artisans' },
            { icon: '🚚', text: 'Delivery to all 18 states of Sudan' },
            { icon: '💼', text: 'Startup business loans available' },
            { icon: '🏪', text: 'Free store setup for sellers' },
          ].map(item => (
            <div key={item.text} className="flex items-start gap-3">
              <span className="text-xl">{item.icon}</span>
              <p className="text-sm text-green-200">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="text-green-300 text-xs">جسور كوش — Bridging Business, Culture & Commerce in Sudan</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mode toggle */}
          <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-8 bg-white">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                mode === 'login' ? 'text-white' : 'text-gray-500 hover:bg-gray-50'
              }`}
              style={mode === 'login' ? { backgroundColor: '#2D5A27' } : {}}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                mode === 'register' ? 'text-white' : 'text-gray-500 hover:bg-gray-50'
              }`}
              style={mode === 'register' ? { backgroundColor: '#2D5A27' } : {}}
            >
              Create Account
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="font-bold text-gray-800 text-xl mb-1">
              {mode === 'login' ? 'Welcome Back!' : 'Join Jusur Kush'}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {mode === 'login'
                ? 'Sign in to your account to continue shopping'
                : 'Create your account to start buying or selling'
              }
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-lg text-sm text-red-600 bg-red-50 border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={mode === 'login' ? handleLogin : handleRegister}>
              {/* Register role selection */}
              {mode === 'register' && (
                <div className="mb-5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2 block">I want to</label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => updateForm('role', 'buyer')}
                      className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        form.role === 'buyer' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <ShoppingBag className="w-6 h-6" style={{ color: form.role === 'buyer' ? '#2D5A27' : '#9ca3af' }} />
                      <span className="text-sm font-medium text-gray-700">Buy Products</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => updateForm('role', 'seller')}
                      className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        form.role === 'seller' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Store className="w-6 h-6" style={{ color: form.role === 'seller' ? '#2D5A27' : '#9ca3af' }} />
                      <span className="text-sm font-medium text-gray-700">Sell Products</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Name (register only) */}
              {mode === 'register' && (
                <div className="mb-4">
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => updateForm('name', e.target.value)}
                      placeholder="Ahmed Mohamed"
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-400"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="mb-4">
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => updateForm('email', e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-400"
                  />
                </div>
              </div>

              {/* Phone & City (register only) */}
              {mode === 'register' && (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Phone *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={e => updateForm('phone', e.target.value)}
                        placeholder="+249..."
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">City *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      <select
                        value={form.city}
                        onChange={e => updateForm('city', e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-400 bg-white"
                      >
                        <option value="">Select</option>
                        {SUDAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Password */}
              <div className="mb-4">
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Password *</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => updateForm('password', e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password (register only) */}
              {mode === 'register' && (
                <div className="mb-4">
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Confirm Password *</label>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={e => updateForm('confirmPassword', e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full pl-4 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-400"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: '#2D5A27' }}
                className="w-full py-3 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? '...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            {mode === 'login' && (
              <p className="text-center text-sm text-gray-500 mt-4">
                Don't have an account?{' '}
                <button onClick={() => setMode('register')} style={{ color: '#2D5A27' }} className="font-semibold hover:underline">
                  Register free
                </button>
              </p>
            )}
            {mode === 'register' && (
              <p className="text-center text-sm text-gray-500 mt-4">
                Already have an account?{' '}
                <button onClick={() => setMode('login')} style={{ color: '#2D5A27' }} className="font-semibold hover:underline">
                  Sign in
                </button>
              </p>
            )}

            {mode === 'register' && (
              <p className="text-center text-xs text-gray-400 mt-3">
                By registering, you agree to our{' '}
                <a href="#" style={{ color: '#2D5A27' }} className="hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" style={{ color: '#2D5A27' }} className="hover:underline">Privacy Policy</a>
              </p>
            )}
          </div>

          {/* Loan CTA */}
          <div className="mt-4 p-4 rounded-xl text-center" style={{ backgroundColor: '#E8F5E1', borderColor: '#2D5A27' }}>
            <p className="text-sm text-gray-700">
              🏪 Want to start a business? <Link to="/loan-request" style={{ color: '#2D5A27' }} className="font-semibold hover:underline">Apply for a startup loan →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// File: src/app/pages/Cart.tsx
import React from "react";
import { Link, useNavigate } from "react-router";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useApp } from "../context/AppContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart, user } = useApp();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate("/login?redirect=/checkout");
    } else {
      navigate("/checkout");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#F5F0E8" }}>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
          <ShoppingBag size={72} style={{ color: "#D4C8B0" }} className="mb-4" />
          <h2 className="font-black text-2xl mb-2" style={{ color: "#2A4B12" }}>Your cart is empty</h2>
          <p className="text-sm mb-8" style={{ color: "#6B7280" }}>Looks like you haven't added any items yet.</p>
          <Link to="/products" className="px-8 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 flex items-center gap-2" style={{ backgroundColor: "#3D6B1F" }}>
            Start Shopping <ArrowRight size={16} />
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F0E8" }}>
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm mb-5 hover:gap-2 transition-all" style={{ color: "#3D6B1F" }}>
          <ArrowLeft size={15} /> Continue Shopping
        </button>

        <h1 className="font-black text-2xl mb-6" style={{ color: "#2A4B12" }}>
          Shopping Cart ({cart.length} {cart.length === 1 ? "item" : "items"})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 p-4 rounded-xl border" style={{ backgroundColor: "white", borderColor: "#E8DCC8" }}>
                <Link to={`/product/${product.id}`} className="flex-shrink-0">
                  <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-sm font-semibold line-clamp-2 hover:text-green-700 transition-colors" style={{ color: "#2C2C2C" }}>
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{product.seller} · {product.location}</p>
                  <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                    <div>
                      <span className="font-black text-base" style={{ color: "#2A4B12" }}>
                        SDG {(product.price * quantity).toLocaleString()}
                      </span>
                      <span className="text-xs ml-1.5" style={{ color: "#9CA3AF" }}>
                        SDG {product.price.toLocaleString()} each
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Quantity */}
                      <div className="flex items-center rounded-lg overflow-hidden border" style={{ borderColor: "#D4C8B0" }}>
                        <button onClick={() => updateQuantity(product.id, quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors">
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold" style={{ color: "#2C2C2C" }}>{quantity}</span>
                        <button onClick={() => updateQuantity(product.id, quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors">
                          <Plus size={12} />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(product.id)} className="text-red-500 hover:text-red-700 transition-colors p-1">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-2">
              <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-700 transition-colors flex items-center gap-1">
                <Trash2 size={14} /> Clear Cart
              </button>
              <Link to="/products" className="text-sm font-semibold" style={{ color: "#3D6B1F" }}>
                + Add More Items
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border p-5 sticky top-24" style={{ backgroundColor: "white", borderColor: "#E8DCC8" }}>
              <h2 className="font-black text-lg mb-4" style={{ color: "#2A4B12" }}>Order Summary</h2>

              <div className="space-y-2 mb-4 pb-4 border-b" style={{ borderColor: "#E8DCC8" }}>
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between text-sm">
                    <span className="truncate max-w-xs" style={{ color: "#4B5563" }}>{product.name.slice(0, 25)}... ×{quantity}</span>
                    <span className="font-medium" style={{ color: "#2C2C2C" }}>SDG {(product.price * quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-4 pb-4 border-b" style={{ borderColor: "#E8DCC8" }}>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#6B7280" }}>Subtotal</span>
                  <span style={{ color: "#2C2C2C" }}>SDG {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#6B7280" }}>Delivery</span>
                  <span className="font-semibold" style={{ color: "#3D6B1F" }}>To be selected</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#6B7280" }}>Tax (5%)</span>
                  <span style={{ color: "#2C2C2C" }}>SDG {Math.round(cartTotal * 0.05).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between mb-5">
                <span className="font-black" style={{ color: "#2A4B12" }}>Total (excl. delivery)</span>
                <span className="font-black text-lg" style={{ color: "#2A4B12" }}>
                  SDG {Math.round(cartTotal * 1.05).toLocaleString()}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 flex items-center justify-center gap-2"
                style={{ backgroundColor: "#3D6B1F" }}
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>

              {!user && (
                <p className="text-xs text-center mt-3" style={{ color: "#9CA3AF" }}>
                  You'll need to <Link to="/login?redirect=/checkout" className="underline" style={{ color: "#3D6B1F" }}>sign in</Link> to checkout
                </p>
              )}

              <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: "#F0EBD8" }}>
                <p className="text-xs font-semibold mb-1" style={{ color: "#2A4B12" }}>🛡️ Secure Checkout</p>
                <p className="text-xs" style={{ color: "#6B7280" }}>Your payment information is protected with 256-bit SSL encryption.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// File: src/app/pages/Checkout.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Truck, Package, MapPin, CheckCircle, ArrowLeft, CreditCard, Smartphone } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useApp } from "../context/AppContext";

type DeliveryMethod = "standard" | "express" | "pickup";
type PaymentMethod = "cash" | "mobile" | "card";
type Step = 1 | 2 | 3;

const SUDAN_STATES = [
  "Khartoum", "Omdurman", "Kassala", "Port Sudan", "Atbara",
  "El Obeid", "Wad Madani", "Gedaref", "Dongola", "El Fasher",
  "Nyala", "El Daein", "Sennar", "Kosti", "Rabak",
];

export default function Checkout() {
  const { cart, cartTotal, clearCart, user } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>(1);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("standard");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [address, setAddress] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    state: "",
    city: "",
    street: "",
    notes: "",
  });

  const deliveryOptions = [
    {
      id: "standard" as DeliveryMethod,
      name: "Standard Delivery",
      nameAr: "توصيل عادي",
      desc: "5–7 business days",
      price: 150,
      icon: <Truck size={20} />,
    },
    {
      id: "express" as DeliveryMethod,
      name: "Express Delivery",
      nameAr: "توصيل سريع",
      desc: "1–2 business days",
      price: 350,
      icon: <Package size={20} />,
    },
    {
      id: "pickup" as DeliveryMethod,
      name: "Pickup from Store",
      nameAr: "استلام من المتجر",
      desc: "Free · Ready in 24 hrs",
      price: 0,
      icon: <MapPin size={20} />,
    },
  ];

  const paymentOptions = [
    { id: "cash" as PaymentMethod, name: "Cash on Delivery", desc: "Pay when your order arrives", icon: <Package size={18} /> },
    { id: "mobile" as PaymentMethod, name: "Mobile Money", desc: "Zain Cash, MTN Mobile Money", icon: <Smartphone size={18} /> },
    { id: "card" as PaymentMethod, name: "Bank Card", desc: "Visa / MasterCard", icon: <CreditCard size={18} /> },
  ];

  const selectedDelivery = deliveryOptions.find((d) => d.id === deliveryMethod)!;
  const subtotal = cartTotal;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax + selectedDelivery.price;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (!user) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#F5F0E8" }}>
        <Header />
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="font-black text-xl mb-2" style={{ color: "#2A4B12" }}>Sign in to checkout</h2>
          <p className="text-sm mb-6" style={{ color: "#6B7280" }}>You need to be signed in to complete your purchase.</p>
          <Link to="/login?redirect=/checkout" className="px-8 py-3 rounded-xl font-bold text-sm text-white inline-block" style={{ backgroundColor: "#3D6B1F" }}>
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#F5F0E8" }}>
        <Header />
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: "#DCFCE7" }}>
            <CheckCircle size={40} style={{ color: "#3D6B1F" }} />
          </div>
          <h2 className="font-black text-2xl mb-2" style={{ color: "#2A4B12" }}>Order Placed!</h2>
          <p className="text-sm mb-1" style={{ color: "#6B7280" }}>Thank you for shopping with Jusur Kush!</p>
          <p className="text-sm mb-2" style={{ color: "#6B7280" }}>Your order <span className="font-bold" style={{ color: "#2A4B12" }}>#JK-{Math.floor(100000 + Math.random() * 900000)}</span> has been confirmed.</p>
          <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
            Delivery via <span className="font-semibold">{selectedDelivery.name}</span> · {selectedDelivery.desc}
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/products" className="px-6 py-2.5 rounded-xl font-bold text-sm text-white" style={{ backgroundColor: "#3D6B1F" }}>
              Continue Shopping
            </Link>
            <Link to="/" className="px-6 py-2.5 rounded-xl font-bold text-sm border-2" style={{ borderColor: "#3D6B1F", color: "#3D6B1F" }}>
              Go Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (cart.length === 0 && !orderPlaced) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F0E8" }}>
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-6">
        <button onClick={() => (step === 1 ? navigate("/cart") : setStep((s) => (s - 1) as Step))} className="flex items-center gap-1 text-sm mb-5 hover:gap-2 transition-all" style={{ color: "#3D6B1F" }}>
          <ArrowLeft size={15} /> {step === 1 ? "Back to Cart" : "Previous Step"}
        </button>

        <h1 className="font-black text-2xl mb-6" style={{ color: "#2A4B12" }}>Checkout</h1>

        {/* Step Indicators */}
        <div className="flex items-center gap-2 mb-8">
          {[
            { n: 1, label: "Delivery Address" },
            { n: 2, label: "Delivery Method" },
            { n: 3, label: "Payment" },
          ].map(({ n, label }) => (
            <React.Fragment key={n}>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors"
                  style={{
                    backgroundColor: step >= n ? "#3D6B1F" : "#E8DCC8",
                    color: step >= n ? "white" : "#9CA3AF",
                  }}
                >
                  {step > n ? "✓" : n}
                </div>
                <span className="text-xs font-medium hidden sm:block" style={{ color: step >= n ? "#2A4B12" : "#9CA3AF" }}>{label}</span>
              </div>
              {n < 3 && <div className="flex-1 h-0.5 rounded" style={{ backgroundColor: step > n ? "#3D6B1F" : "#E8DCC8" }} />}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Delivery Address */}
            {step === 1 && (
              <div className="rounded-xl border p-6" style={{ backgroundColor: "white", borderColor: "#E8DCC8" }}>
                <h2 className="font-bold text-lg mb-5" style={{ color: "#2A4B12" }}>Delivery Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: "fullName", label: "Full Name", placeholder: "Your full name", colSpan: false },
                    { key: "phone", label: "Phone Number", placeholder: "+249 __ ___ ____", colSpan: false },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key}>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4B5563" }}>{label} *</label>
                      <input
                        type="text"
                        value={address[key as keyof typeof address]}
                        onChange={(e) => setAddress((a) => ({ ...a, [key]: e.target.value }))}
                        placeholder={placeholder}
                        className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none focus:border-green-600 transition-colors"
                        style={{ borderColor: "#D4C8B0", backgroundColor: "#FAFAF7" }}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4B5563" }}>State *</label>
                    <select
                      value={address.state}
                      onChange={(e) => setAddress((a) => ({ ...a, state: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none focus:border-green-600 transition-colors"
                      style={{ borderColor: "#D4C8B0", backgroundColor: "#FAFAF7" }}
                    >
                      <option value="">Select State</option>
                      {SUDAN_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4B5563" }}>City / Locality *</label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))}
                      placeholder="City or area"
                      className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none focus:border-green-600 transition-colors"
                      style={{ borderColor: "#D4C8B0", backgroundColor: "#FAFAF7" }}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4B5563" }}>Street Address *</label>
                    <input
                      type="text"
                      value={address.street}
                      onChange={(e) => setAddress((a) => ({ ...a, street: e.target.value }))}
                      placeholder="Block, street number, building name..."
                      className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none focus:border-green-600 transition-colors"
                      style={{ borderColor: "#D4C8B0", backgroundColor: "#FAFAF7" }}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4B5563" }}>Delivery Notes (optional)</label>
                    <textarea
                      value={address.notes}
                      onChange={(e) => setAddress((a) => ({ ...a, notes: e.target.value }))}
                      placeholder="Additional instructions for the delivery person..."
                      rows={2}
                      className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none focus:border-green-600 transition-colors resize-none"
                      style={{ borderColor: "#D4C8B0", backgroundColor: "#FAFAF7" }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (address.fullName && address.phone && address.state && address.city && address.street) {
                      setStep(2);
                    }
                  }}
                  className="mt-6 w-full py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#3D6B1F" }}
                >
                  Continue to Delivery Method →
                </button>
              </div>
            )}

            {/* Step 2: Delivery Method */}
            {step === 2 && (
              <div className="rounded-xl border p-6" style={{ backgroundColor: "white", borderColor: "#E8DCC8" }}>
                <h2 className="font-bold text-lg mb-5" style={{ color: "#2A4B12" }}>Choose Delivery Method</h2>
                <div className="space-y-3 mb-6">
                  {deliveryOptions.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all"
                      style={{
                        borderColor: deliveryMethod === option.id ? "#3D6B1F" : "#E8DCC8",
                        backgroundColor: deliveryMethod === option.id ? "#F0F7E8" : "white",
                      }}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        value={option.id}
                        checked={deliveryMethod === option.id}
                        onChange={() => setDeliveryMethod(option.id)}
                        className="sr-only"
                      />
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: deliveryMethod === option.id ? "#3D6B1F" : "#F0EBD8", color: deliveryMethod === option.id ? "white" : "#3D6B1F" }}>
                        {option.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-sm" style={{ color: "#2C2C2C" }}>{option.name}</p>
                          <span className="text-xs" style={{ color: "#9CA3AF" }}>{option.nameAr}</span>
                        </div>
                        <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{option.desc}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-sm" style={{ color: option.price === 0 ? "#3D6B1F" : "#2C2C2C" }}>
                          {option.price === 0 ? "FREE" : `SDG ${option.price}`}
                        </p>
                      </div>
                      {deliveryMethod === option.id && (
                        <CheckCircle size={18} style={{ color: "#3D6B1F" }} className="flex-shrink-0" />
                      )}
                    </label>
                  ))}
                </div>

                <button
                  onClick={() => setStep(3)}
                  className="w-full py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#3D6B1F" }}
                >
                  Continue to Payment →
                </button>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="rounded-xl border p-6" style={{ backgroundColor: "white", borderColor: "#E8DCC8" }}>
                <h2 className="font-bold text-lg mb-5" style={{ color: "#2A4B12" }}>Payment Method</h2>
                <div className="space-y-3 mb-6">
                  {paymentOptions.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all"
                      style={{
                        borderColor: paymentMethod === option.id ? "#3D6B1F" : "#E8DCC8",
                        backgroundColor: paymentMethod === option.id ? "#F0F7E8" : "white",
                      }}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={option.id}
                        checked={paymentMethod === option.id}
                        onChange={() => setPaymentMethod(option.id)}
                        className="sr-only"
                      />
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: paymentMethod === option.id ? "#3D6B1F" : "#F0EBD8", color: paymentMethod === option.id ? "white" : "#3D6B1F" }}>
                        {option.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm" style={{ color: "#2C2C2C" }}>{option.name}</p>
                        <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{option.desc}</p>
                      </div>
                      {paymentMethod === option.id && (
                        <CheckCircle size={18} style={{ color: "#3D6B1F" }} className="flex-shrink-0" />
                      )}
                    </label>
                  ))}
                </div>

                {paymentMethod === "mobile" && (
                  <div className="p-4 rounded-xl mb-5" style={{ backgroundColor: "#F0EBD8" }}>
                    <p className="text-sm font-semibold mb-2" style={{ color: "#2A4B12" }}>Mobile Money Payment</p>
                    <input type="text" placeholder="Your mobile number (+249...)" className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style={{ borderColor: "#D4C8B0" }} />
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="p-4 rounded-xl mb-5 space-y-3" style={{ backgroundColor: "#F0EBD8" }}>
                    <p className="text-sm font-semibold mb-1" style={{ color: "#2A4B12" }}>Card Details</p>
                    <input type="text" placeholder="Card Number" className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style={{ borderColor: "#D4C8B0" }} />
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="MM / YY" className="px-3 py-2.5 rounded-lg border text-sm outline-none" style={{ borderColor: "#D4C8B0" }} />
                      <input type="text" placeholder="CVV" className="px-3 py-2.5 rounded-lg border text-sm outline-none" style={{ borderColor: "#D4C8B0" }} />
                    </div>
                  </div>
                )}

                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-3.5 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#3D6B1F" }}
                >
                  Place Order · SDG {total.toLocaleString()}
                </button>
                <p className="text-xs text-center mt-3" style={{ color: "#9CA3AF" }}>
                  By placing this order, you agree to our <a href="#" className="underline">Terms & Conditions</a>
                </p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div className="rounded-xl border p-5 sticky top-24" style={{ backgroundColor: "white", borderColor: "#E8DCC8" }}>
              <h2 className="font-bold text-base mb-4" style={{ color: "#2A4B12" }}>Order Summary</h2>
              <div className="space-y-2 mb-4 pb-4 border-b" style={{ borderColor: "#E8DCC8" }}>
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-2">
                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs truncate font-medium" style={{ color: "#2C2C2C" }}>{product.name}</p>
                      <p className="text-xs" style={{ color: "#9CA3AF" }}>×{quantity}</p>
                    </div>
                    <p className="text-xs font-bold flex-shrink-0" style={{ color: "#2A4B12" }}>SDG {(product.price * quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm pb-4 border-b mb-3" style={{ borderColor: "#E8DCC8" }}>
                <div className="flex justify-between">
                  <span style={{ color: "#6B7280" }}>Subtotal</span>
                  <span>SDG {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#6B7280" }}>Delivery ({selectedDelivery.name})</span>
                  <span style={{ color: selectedDelivery.price === 0 ? "#3D6B1F" : "#2C2C2C" }}>
                    {selectedDelivery.price === 0 ? "FREE" : `SDG ${selectedDelivery.price}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#6B7280" }}>Tax (5%)</span>
                  <span>SDG {tax.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between font-black">
                <span style={{ color: "#2A4B12" }}>Total</span>
                <span style={{ color: "#2A4B12" }}>SDG {total.toLocaleString()}</span>
              </div>

              {step >= 1 && address.state && (
                <div className="mt-3 p-2 rounded-lg text-xs" style={{ backgroundColor: "#F0EBD8", color: "#5A6B4A" }}>
                  📍 Delivering to: {address.state}{address.city ? `, ${address.city}` : ""}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// File: src/app/pages/Home.tsx
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

// File: src/app/pages/Loan.tsx
import React, { useState } from "react";
import { Link } from "react-router";
import {
  CheckCircle,
  ArrowLeft,
  DollarSign,
  Clock,
  FileText,
  Shield,
  Users,
  TrendingUp,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const LOAN_AMOUNTS = [5000, 10000, 20000, 30000, 50000];
const REPAYMENT_PERIODS = [6, 12, 18, 24];
const BUSINESS_TYPES = [
  "Handicrafts & Artisan", "Food & Beverages", "Textiles & Fashion",
  "Jewelry & Accessories", "Home & Decor", "Electronics & Technology",
  "Beauty & Health", "Agriculture & Farming", "Education & Training",
  "Transport & Logistics", "Other",
];
const SUDAN_STATES = [
  "Khartoum", "Omdurman", "Kassala", "Port Sudan", "Atbara",
  "El Obeid", "Wad Madani", "Gedaref", "Dongola", "El Fasher", "Nyala",
];

const FAQ_ITEMS = [
  {
    q: "Who is eligible for a Jusur Kush business loan?",
    a: "Any Sudanese citizen aged 18+ with a business idea or existing startup can apply. We especially support women entrepreneurs and businesses in underserved regions of Sudan.",
  },
  {
    q: "How long does the approval process take?",
    a: "Our team reviews applications within 48 hours. Once approved, funds are disbursed within 3–5 business days via mobile money or bank transfer.",
  },
  {
    q: "What documents are required?",
    a: "You'll need a valid Sudanese National ID, proof of address, and a brief business plan. Existing businesses may also provide recent financial records.",
  },
  {
    q: "What is the interest rate?",
    a: "We offer competitive rates starting from 5% annually, adjusted based on loan amount and repayment period. There are no hidden fees.",
  },
  {
    q: "Do I need collateral for the loan?",
    a: "Loans up to SDG 10,000 do not require collateral. For larger amounts, we may require a guarantor or simple asset documentation.",
  },
];

export default function Loan() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    nationalId: "",
    state: "",
    businessName: "",
    businessType: "",
    businessAge: "",
    loanAmount: 10000,
    repaymentPeriod: 12,
    loanPurpose: "",
    businessDescription: "",
    monthlyRevenue: "",
    hasExistingLoan: "no",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const annualInterestRate = 0.05;
  const monthlyInterest = annualInterestRate / 12;
  const monthlyPayment =
    (form.loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, form.repaymentPeriod)) /
    (Math.pow(1 + monthlyInterest, form.repaymentPeriod) - 1);
  const totalRepayment = monthlyPayment * form.repaymentPeriod;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (!form.phone) e.phone = "Required";
    if (!form.nationalId) e.nationalId = "Required";
    if (!form.state) e.state = "Required";
    if (!form.businessName.trim()) e.businessName = "Required";
    if (!form.businessType) e.businessType = "Required";
    if (!form.loanPurpose.trim()) e.loanPurpose = "Required";
    if (!form.businessDescription.trim()) e.businessDescription = "Required";
    if (!form.agreeTerms) e.agreeTerms = "You must agree to terms";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#F5F0E8" }}>
        <Header />
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "#DCFCE7" }}>
            <CheckCircle size={48} style={{ color: "#3D6B1F" }} />
          </div>
          <h2 className="font-black text-2xl mb-3" style={{ color: "#2A4B12" }}>Application Submitted!</h2>
          <p className="mb-2" style={{ color: "#6B7280" }}>
            Thank you, <strong>{form.fullName}</strong>! Your loan application for{" "}
            <strong style={{ color: "#2A4B12" }}>SDG {form.loanAmount.toLocaleString()}</strong> has been received.
          </p>
          <p className="text-sm mb-2" style={{ color: "#6B7280" }}>Reference: <span className="font-bold" style={{ color: "#2A4B12" }}>#LN-{Date.now().toString().slice(-8)}</span></p>
          <p className="text-sm mb-8" style={{ color: "#6B7280" }}>
            Our team will review your application within 48 hours and contact you at <strong>{form.phone}</strong>.
          </p>
          <div className="rounded-2xl p-5 mb-8 text-left" style={{ backgroundColor: "white", border: "1px solid #E8DCC8" }}>
            <p className="text-sm font-bold mb-3" style={{ color: "#2A4B12" }}>Application Summary</p>
            {[
              { label: "Loan Amount", value: `SDG ${form.loanAmount.toLocaleString()}` },
              { label: "Repayment Period", value: `${form.repaymentPeriod} months` },
              { label: "Est. Monthly Payment", value: `SDG ${Math.round(monthlyPayment).toLocaleString()}` },
              { label: "Total Repayment", value: `SDG ${Math.round(totalRepayment).toLocaleString()}` },
              { label: "Business", value: form.businessName },
              { label: "Location", value: form.state },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between py-1.5 border-b last:border-0 text-sm" style={{ borderColor: "#F0EBD8" }}>
                <span style={{ color: "#6B7280" }}>{label}</span>
                <span className="font-semibold" style={{ color: "#2C2C2C" }}>{value}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3 justify-center">
            <Link to="/" className="px-6 py-2.5 rounded-xl font-bold text-white text-sm" style={{ backgroundColor: "#3D6B1F" }}>
              Back to Home
            </Link>
            <Link to="/products" className="px-6 py-2.5 rounded-xl font-bold text-sm border-2" style={{ borderColor: "#3D6B1F", color: "#3D6B1F" }}>
              Browse Products
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F0E8" }}>
      <Header />

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #2A4B12 0%, #4A7C23 100%)" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block text-4xl mb-3">💼</div>
          <h1 className="text-white font-black mb-3" style={{ fontSize: "2rem" }}>
            Business Loan Application
          </h1>
          <p style={{ color: "#C5E89A" }} className="text-sm max-w-xl mx-auto leading-relaxed mb-6">
            Apply for a micro-loan to launch or grow your business on Jusur Kush. We support Sudanese entrepreneurs with flexible and affordable financing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: <DollarSign size={16} />, label: "Up to SDG 50,000" },
              { icon: <Clock size={16} />, label: "48-hr Approval" },
              { icon: <TrendingUp size={16} />, label: "5% Annual Rate" },
              { icon: <Shield size={16} />, label: "No Hidden Fees" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "white" }}>
                {icon} {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: "white", borderColor: "#E8DCC8" }}>
              <div className="p-5 border-b" style={{ backgroundColor: "#F0EBD8", borderColor: "#E8DCC8" }}>
                <h2 className="font-black text-lg" style={{ color: "#2A4B12" }}>Loan Application Form</h2>
                <p className="text-xs mt-1" style={{ color: "#6B7280" }}>All fields marked with * are required</p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Personal Info */}
                <div>
                  <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "#2A4B12" }}>
                    <Users size={16} /> Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { key: "fullName", label: "Full Name", placeholder: "Your full name", type: "text" },
                      { key: "email", label: "Email Address", placeholder: "you@example.com", type: "email" },
                      { key: "phone", label: "Phone Number", placeholder: "+249 __ ___ ____", type: "tel" },
                      { key: "nationalId", label: "National ID Number", placeholder: "12345678", type: "text" },
                    ].map(({ key, label, placeholder, type }) => (
                      <div key={key}>
                        <label className="block text-xs font-semibold mb-1" style={{ color: "#4B5563" }}>{label} *</label>
                        <input
                          type={type}
                          value={form[key as keyof typeof form] as string}
                          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                          placeholder={placeholder}
                          className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
                          style={{ borderColor: errors[key] ? "#DC2626" : "#D4C8B0" }}
                        />
                        {errors[key] && <p className="text-xs mt-1" style={{ color: "#DC2626" }}>{errors[key]}</p>}
                      </div>
                    ))}

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold mb-1" style={{ color: "#4B5563" }}>State *</label>
                      <select
                        value={form.state}
                        onChange={(e) => setForm({ ...form, state: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
                        style={{ borderColor: errors.state ? "#DC2626" : "#D4C8B0" }}
                      >
                        <option value="">Select your state...</option>
                        {SUDAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.state && <p className="text-xs mt-1" style={{ color: "#DC2626" }}>{errors.state}</p>}
                    </div>
                  </div>
                </div>

                <hr style={{ borderColor: "#E8DCC8" }} />

                {/* Business Info */}
                <div>
                  <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "#2A4B12" }}>
                    <FileText size={16} /> Business Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: "#4B5563" }}>Business Name *</label>
                      <input
                        type="text"
                        value={form.businessName}
                        onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                        placeholder="Your business name"
                        className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
                        style={{ borderColor: errors.businessName ? "#DC2626" : "#D4C8B0" }}
                      />
                      {errors.businessName && <p className="text-xs mt-1" style={{ color: "#DC2626" }}>{errors.businessName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: "#4B5563" }}>Business Type *</label>
                      <select
                        value={form.businessType}
                        onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
                        style={{ borderColor: errors.businessType ? "#DC2626" : "#D4C8B0" }}
                      >
                        <option value="">Select type...</option>
                        {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {errors.businessType && <p className="text-xs mt-1" style={{ color: "#DC2626" }}>{errors.businessType}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: "#4B5563" }}>Business Age</label>
                      <select
                        value={form.businessAge}
                        onChange={(e) => setForm({ ...form, businessAge: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
                        style={{ borderColor: "#D4C8B0" }}
                      >
                        <option value="">Select...</option>
                        <option value="new">New / Starting up</option>
                        <option value="<1">Less than 1 year</option>
                        <option value="1-3">1–3 years</option>
                        <option value="3+">More than 3 years</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: "#4B5563" }}>Monthly Revenue (SDG)</label>
                      <input
                        type="number"
                        value={form.monthlyRevenue}
                        onChange={(e) => setForm({ ...form, monthlyRevenue: e.target.value })}
                        placeholder="0 if not started yet"
                        className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
                        style={{ borderColor: "#D4C8B0" }}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold mb-1" style={{ color: "#4B5563" }}>Business Description *</label>
                      <textarea
                        value={form.businessDescription}
                        onChange={(e) => setForm({ ...form, businessDescription: e.target.value })}
                        placeholder="Describe your business, products/services, and target customers..."
                        rows={3}
                        className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none resize-none"
                        style={{ borderColor: errors.businessDescription ? "#DC2626" : "#D4C8B0" }}
                      />
                      {errors.businessDescription && <p className="text-xs mt-1" style={{ color: "#DC2626" }}>{errors.businessDescription}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: "#4B5563" }}>Do you have an existing loan?</label>
                      <select
                        value={form.hasExistingLoan}
                        onChange={(e) => setForm({ ...form, hasExistingLoan: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
                        style={{ borderColor: "#D4C8B0" }}
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                  </div>
                </div>

                <hr style={{ borderColor: "#E8DCC8" }} />

                {/* Loan Details */}
                <div>
                  <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "#2A4B12" }}>
                    <DollarSign size={16} /> Loan Details
                  </h3>

                  <div className="mb-4">
                    <label className="block text-xs font-semibold mb-2" style={{ color: "#4B5563" }}>Loan Amount (SDG) *</label>
                    <div className="flex flex-wrap gap-2">
                      {LOAN_AMOUNTS.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => setForm({ ...form, loanAmount: amount })}
                          className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors border-2"
                          style={{
                            borderColor: form.loanAmount === amount ? "#3D6B1F" : "#D4C8B0",
                            backgroundColor: form.loanAmount === amount ? "#3D6B1F" : "white",
                            color: form.loanAmount === amount ? "white" : "#2C2C2C",
                          }}
                        >
                          SDG {amount.toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-xs font-semibold mb-2" style={{ color: "#4B5563" }}>Repayment Period *</label>
                    <div className="flex flex-wrap gap-2">
                      {REPAYMENT_PERIODS.map((period) => (
                        <button
                          key={period}
                          type="button"
                          onClick={() => setForm({ ...form, repaymentPeriod: period })}
                          className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors border-2"
                          style={{
                            borderColor: form.repaymentPeriod === period ? "#3D6B1F" : "#D4C8B0",
                            backgroundColor: form.repaymentPeriod === period ? "#3D6B1F" : "white",
                            color: form.repaymentPeriod === period ? "white" : "#2C2C2C",
                          }}
                        >
                          {period} months
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: "#4B5563" }}>Loan Purpose *</label>
                    <textarea
                      value={form.loanPurpose}
                      onChange={(e) => setForm({ ...form, loanPurpose: e.target.value })}
                      placeholder="How will you use the loan? (e.g., buy equipment, stock inventory, rent space...)"
                      rows={3}
                      className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none resize-none"
                      style={{ borderColor: errors.loanPurpose ? "#DC2626" : "#D4C8B0" }}
                    />
                    {errors.loanPurpose && <p className="text-xs mt-1" style={{ color: "#DC2626" }}>{errors.loanPurpose}</p>}
                  </div>
                </div>

                {/* Terms */}
                <div>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.agreeTerms}
                      onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
                      className="mt-0.5 w-4 h-4 accent-green-700"
                    />
                    <span className="text-xs" style={{ color: "#4B5563" }}>
                      I confirm that all information provided is accurate. I agree to the{" "}
                      <a href="#" className="underline" style={{ color: "#3D6B1F" }}>Loan Terms & Conditions</a>{" "}
                      and consent to a credit check.
                    </span>
                  </label>
                  {errors.agreeTerms && <p className="text-xs mt-1" style={{ color: "#DC2626" }}>{errors.agreeTerms}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#3D6B1F" }}
                >
                  {loading ? "Submitting Application..." : "Submit Loan Application"}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Loan Calculator */}
            <div className="rounded-xl border p-5 sticky top-24" style={{ backgroundColor: "white", borderColor: "#E8DCC8" }}>
              <h3 className="font-bold text-sm mb-4" style={{ color: "#2A4B12" }}>📊 Loan Calculator</h3>
              <div className="space-y-3">
                {[
                  { label: "Loan Amount", value: `SDG ${form.loanAmount.toLocaleString()}` },
                  { label: "Interest Rate", value: "5% / year" },
                  { label: "Repayment Period", value: `${form.repaymentPeriod} months` },
                  { label: "Monthly Payment", value: `SDG ${Math.round(monthlyPayment).toLocaleString()}`, highlight: true },
                  { label: "Total Repayment", value: `SDG ${Math.round(totalRepayment).toLocaleString()}` },
                  { label: "Total Interest", value: `SDG ${Math.round(totalRepayment - form.loanAmount).toLocaleString()}` },
                ].map(({ label, value, highlight }) => (
                  <div key={label} className={`flex justify-between py-2 border-b last:border-0 text-sm ${highlight ? "rounded-lg px-2 -mx-2" : ""}`} style={{ borderColor: "#F0EBD8", backgroundColor: highlight ? "#F0F7E8" : "transparent" }}>
                    <span style={{ color: "#6B7280" }}>{label}</span>
                    <span className="font-bold" style={{ color: highlight ? "#2A4B12" : "#2C2C2C" }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How it works */}
            <div className="rounded-xl border p-5" style={{ backgroundColor: "white", borderColor: "#E8DCC8" }}>
              <h3 className="font-bold text-sm mb-4" style={{ color: "#2A4B12" }}>How It Works</h3>
              {[
                { step: 1, label: "Submit Application", desc: "Fill out the form with your business details" },
                { step: 2, label: "Review (48 hrs)", desc: "Our team reviews your application" },
                { step: 3, label: "Approval & Disbursement", desc: "Receive funds via mobile money or bank" },
                { step: 4, label: "Grow Your Business", desc: "Sell on Jusur Kush and repay monthly" },
              ].map(({ step, label, desc }) => (
                <div key={step} className="flex gap-3 mb-3 last:mb-0">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0" style={{ backgroundColor: "#3D6B1F" }}>{step}</div>
                  <div>
                    <p className="text-xs font-bold" style={{ color: "#2C2C2C" }}>{label}</p>
                    <p className="text-xs" style={{ color: "#6B7280" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-10">
          <h2 className="font-black text-xl mb-5" style={{ color: "#2A4B12" }}>Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map(({ q, a }, i) => (
              <div key={i} className="rounded-xl border overflow-hidden" style={{ backgroundColor: "white", borderColor: "#E8DCC8" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold" style={{ color: "#2C2C2C" }}>{q}</span>
                  {openFaq === i ? <ChevronUp size={16} style={{ color: "#3D6B1F" }} /> : <ChevronDown size={16} style={{ color: "#9CA3AF" }} />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "#4B5563", borderTop: "1px solid #F0EBD8" }}>
                    <p className="pt-3">{a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// File: src/app/pages/Login.tsx
import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 800));

    if (form.email && form.password.length >= 6) {
      login({
        id: "u-" + Date.now(),
        name: form.email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        email: form.email,
        phone: "+249 123 456 789",
        type: "customer",
      });
      navigate(redirect);
    } else {
      setError("Invalid email or password. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F5F0E8" }}>
      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-12 relative" style={{ background: "linear-gradient(135deg, #2A4B12 0%, #4A7C23 100%)" }}>
        <Link to="/" className="absolute top-6 left-6 flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors">
          <ArrowLeft size={15} /> Back to Home
        </Link>
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6 text-4xl font-black" style={{ backgroundColor: "#F5F0E8", color: "#3D6B1F" }}>
            J
          </div>
          <h1 className="text-white font-black text-3xl mb-2">Jusur Kush</h1>
          <p className="text-lg font-semibold mb-4" style={{ color: "#C5E89A" }}>جسور كوش</p>
          <p style={{ color: "#A7C98A" }} className="text-sm leading-relaxed mb-8">
            Sudan's marketplace for startup businesses. Discover authentic handmade goods and support local entrepreneurs.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[{ v: "500+", l: "Sellers" }, { v: "2K+", l: "Products" }, { v: "15K+", l: "Customers" }].map(({ v, l }) => (
              <div key={l} className="rounded-xl p-3" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                <p className="font-black text-white">{v}</p>
                <p className="text-xs" style={{ color: "#A7C98A" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:max-w-md">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: "#3D6B1F", color: "white" }}>
                <span className="font-black">J</span>
              </div>
              <span className="font-black" style={{ color: "#2A4B12" }}>Jusur Kush</span>
            </Link>
            <Link to="/" className="text-sm" style={{ color: "#3D6B1F" }}>← Home</Link>
          </div>

          <h2 className="font-black text-2xl mb-1" style={{ color: "#2A4B12" }}>Welcome back</h2>
          <p className="text-sm mb-8" style={{ color: "#6B7280" }}>
            Sign in to your account to continue shopping
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4B5563" }}>Email Address</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 transition-all"
                style={{ borderColor: "#D4C8B0", backgroundColor: "white" }}
              />
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-xs font-semibold" style={{ color: "#4B5563" }}>Password</label>
                <a href="#" className="text-xs hover:underline" style={{ color: "#3D6B1F" }}>Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none pr-11 transition-all"
                  style={{ borderColor: "#D4C8B0", backgroundColor: "white" }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "#3D6B1F" }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: "#6B7280" }}>
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold hover:underline" style={{ color: "#3D6B1F" }}>
                Register for free
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm" style={{ color: "#6B7280" }}>
              Want to sell?{" "}
              <Link to="/register?type=seller" className="font-semibold hover:underline" style={{ color: "#3D6B1F" }}>
                Register as a Seller
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// File: src/app/pages/ProductDetail.tsx
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

// File: src/app/pages/Products.tsx
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

// File: src/app/pages/Register.tsx
import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { Eye, EyeOff, CheckCircle, User, Store } from "lucide-react";
import { useApp } from "../context/AppContext";

type UserType = "customer" | "seller";

export default function Register() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultType = (searchParams.get("type") as UserType) || "customer";

  const [userType, setUserType] = useState<UserType>(defaultType);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    businessType: "",
    state: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.includes("@")) e.email = "Valid email is required";
    if (!form.phone) e.phone = "Phone number is required";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    if (userType === "seller" && !form.businessName) e.businessName = "Business name is required";
    if (!form.agreeTerms) e.agreeTerms = "You must agree to the terms";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    login({
      id: "u-" + Date.now(),
      name: form.fullName,
      email: form.email,
      phone: form.phone,
      type: userType,
    });
    setSuccess(true);
    setTimeout(() => navigate("/"), 2000);
    setLoading(false);
  };

  const SUDAN_STATES = ["Khartoum", "Omdurman", "Kassala", "Port Sudan", "Atbara", "El Obeid", "Wad Madani", "Gedaref", "Dongola", "El Fasher", "Nyala"];
  const BUSINESS_TYPES = ["Handicrafts", "Food & Beverages", "Textiles & Fashion", "Jewelry", "Home & Decor", "Electronics", "Beauty & Health", "Agriculture", "Other"];

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="text-center p-8">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#DCFCE7" }}>
            <CheckCircle size={40} style={{ color: "#3D6B1F" }} />
          </div>
          <h2 className="font-black text-2xl mb-2" style={{ color: "#2A4B12" }}>Account Created!</h2>
          <p className="text-sm" style={{ color: "#6B7280" }}>Welcome to Jusur Kush. Redirecting you to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F0E8" }}>
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white" style={{ backgroundColor: "#3D6B1F" }}>J</div>
            <span className="font-black text-xl" style={{ color: "#2A4B12" }}>Jusur Kush</span>
          </Link>
          <h1 className="font-black text-2xl" style={{ color: "#2A4B12" }}>Create Your Account</h1>
          <p className="text-sm mt-1" style={{ color: "#6B7280" }}>Join Sudan's startup marketplace</p>
        </div>

        {/* Account Type Toggle */}
        <div className="flex rounded-xl overflow-hidden border mb-6" style={{ borderColor: "#D4C8B0" }}>
          {([
            { type: "customer" as UserType, label: "I'm a Customer", icon: <User size={16} /> },
            { type: "seller" as UserType, label: "I'm a Seller", icon: <Store size={16} /> },
          ]).map(({ type, label, icon }) => (
            <button
              key={type}
              onClick={() => setUserType(type)}
              className="flex-1 py-3 flex items-center justify-center gap-2 text-sm font-semibold transition-colors"
              style={{
                backgroundColor: userType === type ? "#3D6B1F" : "white",
                color: userType === type ? "white" : "#4B5563",
              }}
            >
              {icon} {label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border p-6 sm:p-8" style={{ backgroundColor: "white", borderColor: "#E8DCC8" }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4B5563" }}>Full Name *</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="Your full name"
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors"
                  style={{ borderColor: errors.fullName ? "#DC2626" : "#D4C8B0" }}
                />
                {errors.fullName && <p className="text-xs mt-1" style={{ color: "#DC2626" }}>{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4B5563" }}>Email Address *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors"
                  style={{ borderColor: errors.email ? "#DC2626" : "#D4C8B0" }}
                />
                {errors.email && <p className="text-xs mt-1" style={{ color: "#DC2626" }}>{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4B5563" }}>Phone Number *</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+249 __ ___ ____"
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors"
                  style={{ borderColor: errors.phone ? "#DC2626" : "#D4C8B0" }}
                />
                {errors.phone && <p className="text-xs mt-1" style={{ color: "#DC2626" }}>{errors.phone}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4B5563" }}>Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Min. 6 characters"
                    className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none pr-10 transition-colors"
                    style={{ borderColor: errors.password ? "#DC2626" : "#D4C8B0" }}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs mt-1" style={{ color: "#DC2626" }}>{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4B5563" }}>Confirm Password *</label>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder="Re-enter password"
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors"
                  style={{ borderColor: errors.confirmPassword ? "#DC2626" : "#D4C8B0" }}
                />
                {errors.confirmPassword && <p className="text-xs mt-1" style={{ color: "#DC2626" }}>{errors.confirmPassword}</p>}
              </div>

              {/* Seller-specific fields */}
              {userType === "seller" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4B5563" }}>Business Name *</label>
                    <input
                      type="text"
                      value={form.businessName}
                      onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                      placeholder="Your business name"
                      className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors"
                      style={{ borderColor: errors.businessName ? "#DC2626" : "#D4C8B0" }}
                    />
                    {errors.businessName && <p className="text-xs mt-1" style={{ color: "#DC2626" }}>{errors.businessName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4B5563" }}>Business Type</label>
                    <select
                      value={form.businessType}
                      onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors"
                      style={{ borderColor: "#D4C8B0" }}
                    >
                      <option value="">Select type...</option>
                      {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4B5563" }}>State / Location</label>
                    <select
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors"
                      style={{ borderColor: "#D4C8B0" }}
                    >
                      <option value="">Select state...</option>
                      {SUDAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </>
              )}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
                  className="mt-0.5 w-4 h-4 accent-green-700"
                />
                <span className="text-xs" style={{ color: "#4B5563" }}>
                  I agree to the{" "}
                  <a href="#" className="underline" style={{ color: "#3D6B1F" }}>Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="underline" style={{ color: "#3D6B1F" }}>Privacy Policy</a>
                  {" "}of Jusur Kush
                </span>
              </label>
              {errors.agreeTerms && <p className="text-xs mt-1" style={{ color: "#DC2626" }}>{errors.agreeTerms}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "#3D6B1F" }}
            >
              {loading ? "Creating Account..." : `Create ${userType === "seller" ? "Seller" : ""} Account`}
            </button>
          </form>

          <p className="text-center text-sm mt-5" style={{ color: "#6B7280" }}>
            Already have an account?{" "}
            <Link to="/login" className="font-semibold hover:underline" style={{ color: "#3D6B1F" }}>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// File: src/app/pages/Shop.tsx
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

// File: src/app/pages/Wishlist.tsx
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

// File: vite.config.ts
import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})

// File: postcss.config.mjs
/**
 * PostCSS Configuration
 *
 * Tailwind CSS v4 (via @tailwindcss/vite) automatically sets up all required
 * PostCSS plugins — you do NOT need to include `tailwindcss` or `autoprefixer` here.
 *
 * This file only exists for adding additional PostCSS plugins, if needed.
 * For example:
 *
 * import postcssNested from 'postcss-nested'
 * export default { plugins: [postcssNested()] }
 *
 * Otherwise, you can leave this file empty.
 */
export default {}

