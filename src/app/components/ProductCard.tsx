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
