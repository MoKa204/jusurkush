import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "JusurKush | جسور كوش - منصة التجارة الإلكترونية وتمويل الأعمال",
  description: "تسوق من التُجّار المستقلين المعتمدين وقدم على تمويل الأعمال والتمويل الأصغر Direct Multi-Vendor E-Commerce & Business Loans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen flex flex-col antialiased bg-slate-50">
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <Header />
              <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
                {children}
              </main>
              <Footer />
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
