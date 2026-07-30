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
