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
  /*const tax = Math.round(subtotal * 0.05);*/
  const total = subtotal + selectedDelivery.price;

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
