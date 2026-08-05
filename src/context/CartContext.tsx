"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

export interface CartItemType {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    images: string;
    stock: Int32Array | number;
    seller: {
      id: string;
      businessName: string;
    };
  };
}

interface CartContextType {
  items: CartItemType[];
  itemCount: number;
  subtotal: number;
  loading: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  items: [],
  itemCount: 0,
  subtotal: 0,
  loading: true,
  addToCart: async () => {},
  updateQuantity: async () => {},
  removeFromCart: async () => {},
  clearCart: async () => {},
  refetchCart: async () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/cart");
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch (err) {
      console.error("Fetch cart error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (productId: string, quantity = 1) => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });
      if (res.ok) {
        await fetchCart();
      }
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      return removeFromCart(cartItemId);
    }
    try {
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemId, quantity }),
      });
      if (res.ok) {
        await fetchCart();
      }
    } catch (err) {
      console.error("Update quantity error:", err);
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      const res = await fetch(`/api/cart?cartItemId=${cartItemId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchCart();
      }
    } catch (err) {
      console.error("Remove cart item error:", err);
    }
  };

  const clearCart = async () => {
    try {
      const res = await fetch("/api/cart?all=true", { method: "DELETE" });
      if (res.ok) {
        setItems([]);
      }
    } catch (err) {
      console.error("Clear cart error:", err);
    }
  };

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refetchCart: fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
