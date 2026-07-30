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
