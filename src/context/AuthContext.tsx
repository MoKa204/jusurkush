"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: "BUYER" | "SELLER" | "ADMIN" | "DELIVERY_OFFICER" | string;
  phone?: string | null;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  passportPhoto?: string | null;
  verificationStatus: "NONE" | "PENDING" | "VERIFIED" | "REJECTED" | string;
  sellerProfile?: {
    id: string;
    businessName: string;
    registrationNumber: string;
    status: "PENDING" | "APPROVED" | "REJECTED" | string;
    passportPhoto?: string | null;
    bankName?: string;
    bankAccountName?: string;
    bankAccountNumber?: string;
    bankIBAN?: string | null;
  } | null;
}

interface AuthContextType {
  user: UserSession | null;
  loading: boolean;
  refetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refetchUser: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      setUser(data.user || null);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      window.location.href = "/login";
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, refetchUser: fetchUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
