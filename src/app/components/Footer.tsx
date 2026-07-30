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
