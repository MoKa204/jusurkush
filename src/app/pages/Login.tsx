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
