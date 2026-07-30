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
