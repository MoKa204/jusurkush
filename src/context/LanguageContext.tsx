"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "ar" | "en" | "fr" | "tr";

export interface Translations {
  [key: string]: {
    ar: string;
    en: string;
    fr: string;
    tr: string;
  };
}

export const DICTIONARY: Translations = {
  // Navigation & Top Bar
  sellerCentre: {
    ar: "مركز البائعين",
    en: "Seller Centre",
    fr: "Espace Vendeur",
    tr: "Satıcı Merkezi",
  },
  startSelling: {
    ar: "ابدأ البيع الآن",
    en: "Start Selling",
    fr: "Devenir Vendeur",
    tr: "Satışa Başla",
  },
  adminPanel: {
    ar: "لوحة الإدارة",
    en: "Admin Panel",
    fr: "Panneau d'Administration",
    tr: "Yönetici Paneli",
  },
  signUp: {
    ar: "إنشاء حساب جديد",
    en: "Sign Up",
    fr: "S'inscrire",
    tr: "Kayıt Ol",
  },
  login: {
    ar: "تسجيل الدخول",
    en: "Login",
    fr: "Se Connecter",
    tr: "Giriş Yap",
  },
  searchPlaceholder: {
    ar: "ابحث عن المنتجات عبر التُجّار المعتمدين...",
    en: "Search products across verified sellers...",
    fr: "Rechercher des produits parmi les vendeurs vérifiés...",
    tr: "Doğrulanmış satıcılardan ürün arayın...",
  },
  myOrders: {
    ar: "طلباتي وسجل المشتريات",
    en: "My Orders",
    fr: "Mes Commandes",
    tr: "Siparişlerim",
  },
  sellerDashboard: {
    ar: "لوحة التحكم للبائع",
    en: "Seller Dashboard",
    fr: "Tableau de Bord Vendeur",
    tr: "Satıcı Paneli",
  },
  businessLoans: {
    ar: "تمويل الأعمال والتمويل الأصغر",
    en: "Business Loans",
    fr: "Prêts aux Entreprises",
    tr: "İş Kredileri",
  },
  logout: {
    ar: "تسجيل الخروج",
    en: "Logout",
    fr: "Déconnexion",
    tr: "Çıkış Yap",
  },
  welcomeMsg: {
    ar: "مرحباً بكم في منصة جسور كوش للتجارة والتمويل",
    en: "Welcome to JusurKush E-Commerce & Financing",
    fr: "Bienvenue sur JusurKush Commerce & Financement",
    tr: "JusurKush E-Ticaret ve Finansman Platformuna Hoş Geldiniz",
  },
  support247: {
    ar: "دعم 24/7",
    en: "Support 24/7",
    fr: "Support 24/7",
    tr: "7/24 Destek",
  },
  becomeSeller: {
    ar: "سجل كـ بائع",
    en: "Become a Seller",
    fr: "Devenir Vendeur",
    tr: "Satıcı Ol",
  },
  register: {
    ar: "التسجيل",
    en: "Register",
    fr: "S'inscrire",
    tr: "Kayıt Ol",
  },
  cart: {
    ar: "سلة التسوق",
    en: "Shopping Cart",
    fr: "Panier",
    tr: "Sepet",
  },
  shoppingCart: {
    ar: "سلة التسوق",
    en: "Shopping Cart",
    fr: "Panier d'Achat",
    tr: "Alışveriş Sepeti",
  },
  subtotal: {
    ar: "المجموع الفرعي",
    en: "Subtotal",
    fr: "Sous-total",
    tr: "Ara Toplam",
  },
  proceedCheckout: {
    ar: "متابعة لإتمام الشراء",
    en: "Proceed to Checkout",
    fr: "Passer la Commande",
    tr: "Ödemeye Geç",
  },
  verifiedMerchant: {
    ar: "تاجر معتمد",
    en: "Verified Merchant",
    fr: "Commerçant Vérifié",
    tr: "Doğrulanmış Satıcı",
  },
  addToCart: {
    ar: "أضف للسلة",
    en: "Add to Cart",
    fr: "Ajouter au Panier",
    tr: "Sepete Ekle",
  },
  outOfStock: {
    ar: "نفدت الكمية",
    en: "Out of Stock",
    fr: "Rupture de Stock",
    tr: "Stokta Yok",
  },
  emptyTitle: {
    ar: "لا توجد عناصر",
    en: "No Items Found",
    fr: "Aucun Élément Trouvé",
    tr: "Öğe Bulunamadı",
  },
  emptyDesc: {
    ar: "لم يتم العثور على أي نتائج مطابقة",
    en: "No matching results were found",
    fr: "Aucun résultat correspondant",
    tr: "Eşleşen sonuç bulunamadı",
  },
  regSellerBtn: {
    ar: "التسجيل كـ بائع",
    en: "Register as Seller",
    fr: "S'inscrire comme Vendeur",
    tr: "Satıcı Olarak Kaydol",
  },

  // Auth Forms
  welcomeBack: {
    ar: "مرحباً بك مجدداً",
    en: "Welcome Back",
    fr: "Bon Retour",
    tr: "Tekrar Hoş Geldiniz",
  },
  loginSub: {
    ar: "سجل الدخول إلى حسابك في جسور كوش",
    en: "Log in to your JusurKush account",
    fr: "Connectez-vous à votre compte JusurKush",
    tr: "JusurKush hesabınıza giriş yapın",
  },
  fullName: {
    ar: "الاسم الكامل",
    en: "Full Name",
    fr: "Nom Complet",
    tr: "Tam İsim",
  },
  emailAddress: {
    ar: "البريد الإلكتروني",
    en: "Email Address",
    fr: "Adresse E-mail",
    tr: "E-posta Adresi",
  },
  password: {
    ar: "كلمة المرور",
    en: "Password",
    fr: "Mot de Passe",
    tr: "Şifre",
  },
  passPlaceholder: {
    ar: "6 أحرف على الأقل",
    en: "At least 6 characters",
    fr: "Au moins 6 caractères",
    tr: "En az 6 karakter",
  },
  createBuyerAccount: {
    ar: "إنشاء حساب مشتري",
    en: "Create Buyer Account",
    fr: "Créer un Compte Acheteur",
    tr: "Alıcı Hesabı Oluştur",
  },
  buyerRegSub: {
    ar: "انضم إلى منصة جسور كوش للتسوق المباشر من التُجّار المستقلين",
    en: "Join JusurKush to shop from independent sellers",
    fr: "Rejoignez JusurKush pour acheter auprès de vendeurs indépendants",
    tr: "Bağımsız satıcılardan alışveriş yapmak için JusurKush'a katılın",
  },
  sellerRegTitle: {
    ar: "تسجيل التُجّار والشركات",
    en: "Seller & Business Registration",
    fr: "Inscription Vendeur et Entreprise",
    tr: "Satıcı ve İşletme Kaydı",
  },
  sellerRegSub: {
    ar: "سجل متجرك على جسور كوش. تخضع الحسابات لمراجعة الإدارة وتدقيق البيانات قبل نشر المنتجات حية.",
    en: "Register your store on JusurKush. Accounts are submitted for Admin verification before publishing live products.",
    fr: "Inscrivez votre boutique sur JusurKush. Les comptes sont soumis à la vérification avant la publication.",
    tr: "Mağazanızı JusurKush'a kaydettirin. Hesaplar canlı ürün yayınlamadan önce onaylanır.",
  },
  accountCredentials: {
    ar: "بيانات الحساب الأساسية",
    en: "Account Credentials",
    fr: "Identifiants du Compte",
    tr: "Hesap Bilgileri",
  },
  businessDetails: {
    ar: "تفاصيل الشركة والنشاط التجاري",
    en: "Business Details",
    fr: "Détails de l'Entreprise",
    tr: "İşletme Detayları",
  },
  businessName: {
    ar: "اسم الشركة / المتجر",
    en: "Business Name",
    fr: "Nom de l'Entreprise",
    tr: "İşletme Adı",
  },
  regTaxNumber: {
    ar: "رقم السجل التجاري / الرقم الضريبي",
    en: "Registration / Tax ID",
    fr: "Registre du Commerce / N° Fiscal",
    tr: "Sicil / Vergi Numarası",
  },
  businessAddress: {
    ar: "العنوان الفعلي للشركة",
    en: "Business Physical Address",
    fr: "Adresse Physique de l'Entreprise",
    tr: "İşletme Açık Adresi",
  },
  contactInfo: {
    ar: "رقم التواصل / بريد الدعم",
    en: "Contact Phone / Support Email",
    fr: "Téléphone de Contact / E-mail Support",
    tr: "İletişim Telefonu / Destek E-postası",
  },
  bankDetailsTitle: {
    ar: "تفاصيل الحساب البنكي لتحويل المبيعات",
    en: "Bank Account Details for Sales Transfer",
    fr: "Coordonnées Bancaires pour les Ventes",
    tr: "Satış Transferi İçin Banka Hesap Bilgileri",
  },
  bankName: {
    ar: "اسم البنك",
    en: "Bank Name",
    fr: "Nom de la Banque",
    tr: "Banka Adı",
  },
  bankAccountName: {
    ar: "اسم صاحب الحساب البنكي",
    en: "Bank Account Holder Name",
    fr: "Nom du Titulaire du Compte",
    tr: "Hesap Sahibinin Adı",
  },
  bankAccountNumber: {
    ar: "رقم الحساب البنكي",
    en: "Bank Account Number",
    fr: "Numéro de Compte Bancaire",
    tr: "Banka Hesap Numarası",
  },
  bankIBAN: {
    ar: "رقم الآيبان (IBAN) - اختياري",
    en: "IBAN Number (Optional)",
    fr: "Numéro IBAN (Optionnel)",
    tr: "IBAN Numarası (İsteğe Bağlı)",
  },
  submitSellerApp: {
    ar: "تقديم طلب تسجيل المتجر",
    en: "Submit Business Registration",
    fr: "Soumettre l'Inscription",
    tr: "İşletme Kaydını Gönder",
  },
  alreadyHaveAccount: {
    ar: "لديك حساب بالفعل؟",
    en: "Already have an account?",
    fr: "Vous avez déjà un compte ?",
    tr: "Zaten bir hesabınız var mı?",
  },
  newToJusurKush: {
    ar: "جديد في جسور كوش؟",
    en: "New to JusurKush?",
    fr: "Nouveau sur JusurKush ?",
    tr: "JusurKush'ta yeni misiniz?",
  },
  wantToSell: {
    ar: "تريد بيع منتجاتك معنا؟",
    en: "Want to sell your products?",
    fr: "Vous voulez vendre vos produits ?",
    tr: "Ürünlerinizi satmak mı istiyorsunuz?",
  },

  // Home & Catalog
  bannerTitle1: {
    ar: "تمكين التُجّار والشركات الناشئة",
    en: "Empowering Independent Sellers & Businesses",
    fr: "Autonomiser les Vendeurs Indépendants et les Entreprises",
    tr: "Bağımsız Satıcıları ve İşletmeleri Güçlendirme",
  },
  bannerSub1: {
    ar: "منصة تجارة إلكترونية متعددة التُجّار مع تمويل مباشر للأعمال",
    en: "Direct Multi-Vendor E-Commerce with Instant Capital Access",
    fr: "Commerce Électronique Multi-Vendeurs avec Accès Direct au Capital",
    tr: "Anında Sermaye Erişimi ile Doğrudan Çoklu Satıcı E-Ticareti",
  },
  applyLoanBtn: {
    ar: "قدم على تمويل الأعمال",
    en: "Apply for Business Loans",
    fr: "Demander un Prêt d'Entreprise",
    tr: "İş Kredisine Başvur",
  },
  categoriesTitle: {
    ar: "الفئات والأقسام",
    en: "Categories",
    fr: "Catégories",
    tr: "Kategoriler",
  },
  dailyDiscoveries: {
    ar: "الاكتشافات اليومية والمنتجات الحية",
    en: "Daily Discoveries & Live Products",
    fr: "Découvertes Quotidiennes et Produits en Direct",
    tr: "Günlük Keşifler ve Canlı Ürünler",
  },
  dailySub: {
    ar: "منتجات حقيقية معروضة من قبل تجّار مستقلين معتمدين",
    en: "Real items listed by verified independent merchants",
    fr: "Articles réels répertoriés par des commerçants indépendants vérifiés",
    tr: "Doğrulanmış bağımsız satıcılar tarafından listelenen gerçek ürünler",
  },
  productsLive: {
    ar: "منتج متاح حالياً",
    en: "Products Live",
    fr: "Produits en Ligne",
    tr: "Canlı Ürünler",
  },

  // Product Detail Page
  productOverview: {
    ar: "مواصفات المنتجات والنظرة العامة",
    en: "Product Specifications & Overview",
    fr: "Spécifications du Produit et Aperçu",
    tr: "Ürün Özellikleri ve Genel Bakış",
  },
  ratingsReviews: {
    ar: "تقييمات العملاء وآراء المشتريين المعتمدين",
    en: "Customer Ratings & Verified Purchase Reviews",
    fr: "Évaluations des Clients et Avis d'Acheteurs Vérifiés",
    tr: "Müşteri Puanları ve Doğrulanmış Yorumlar",
  },
  noReviewsYet: {
    ar: "لا توجد تقييمات لهذا المنتج بعد. يمكن كتابة التقييمات فقط من قبل المشتريين الذين أتموا طلب شراء مؤكد.",
    en: "No reviews yet for this item. Reviews can only be left by buyers with a verified purchase order.",
    fr: "Aucun avis pour cet article. Les avis ne peuvent être laissés que par les acheteurs ayant une commande vérifiée.",
    tr: "Bu ürün için henüz yorum yok. Yorumlar yalnızca doğrulanmış bir siparişi olan alıcılar tarafından bırakılabilir.",
  },
  unitsAvailable: {
    ar: "وحدة متوفرة بالسطح",
    en: "Units Available",
    fr: "Unités Disponibles",
    tr: "Mevcut Adet",
  },
  verifiedOrder: {
    ar: "طلب شراء مؤكد",
    en: "Verified Order",
    fr: "Commande Vérifiée",
    tr: "Doğrulanmış Sipariş",
  },

  // Cart & Checkout
  emptyCartTitle: {
    ar: "سلة التسوق فارغة حالياً",
    en: "Your Shopping Cart is Empty",
    fr: "Votre Panier d'Achat est Vide",
    tr: "Alışveriş Sepetiniz Boş",
  },
  emptyCartMsg: {
    ar: "لم تقم بإضافة أي منتجات إلى السلة بعد. استكشف المنتجات المتاحة وأضف ما يناسبك!",
    en: "You haven't added any products to your cart yet. Explore available items and start shopping!",
    fr: "Vous n'avez encore ajouté aucun produit à votre panier. Explorez les articles disponibles et commencez vos achats !",
    tr: "Henüz sepetinize ürün eklemediniz. Mevcut ürünleri keşfedin ve alışverişe başlayın!",
  },
  browseProducts: {
    ar: "تصفح المنتجات المتاحة",
    en: "Browse Products",
    fr: "Parcourir les Produits",
    tr: "Ürünlere Göz At",
  },
  orderSummaryTitle: {
    ar: "ملخص طلب الشراء",
    en: "Order Summary",
    fr: "Récapitulatif de la Commande",
    tr: "Sipariş Özeti",
  },
  shippingFee: {
    ar: "رسوم الشحن والتوصيل",
    en: "Shipping Fee",
    fr: "Frais de Livraison",
    tr: "Kargo Ücreti",
  },
  freeShipping: {
    ar: "مجاني بالكامل",
    en: "FREE",
    fr: "GRATUIT",
    tr: "ÜCRETSİZ",
  },
  totalPayable: {
    ar: "إجمالي المبلغ المطلوب للدفع",
    en: "Total Amount Payable",
    fr: "Montant Total À Payer",
    tr: "Toplam Ödenecek Tutar",
  },
  unitPrice: {
    ar: "سعر الوحدة",
    en: "Unit Price",
    fr: "Prix Unitaire",
    tr: "Birim Fiyat",
  },

  // Footer & Features
  support247Title: {
    ar: "دعم فني متواصل 24/7",
    en: "Support 24/7",
    fr: "Support 24/7",
    tr: "7/24 Destek",
  },
  support247Desc: {
    ar: "مساعدة مخصصة للتُجّار والمشترين طوال اليوم",
    en: "Dedicated help for buyers & sellers",
    fr: "Assistance dédiée pour acheteurs et vendeurs",
    tr: "Alıcılar ve satıcılar için özel destek",
  },
  fastShippingTitle: {
    ar: "شحن سريع ومباشر",
    en: "Fast Delivery",
    fr: "Livraison Rapide",
    tr: "Hızlı Teslimat",
  },
  fastShippingDesc: {
    ar: "شحن مباشر من مستودعات التُجّار المعتمدين",
    en: "Direct shipment from merchant stores",
    fr: "Expédition directe depuis les commerçants",
    tr: "Doğrulanmış satıcılardan doğrudan kargo",
  },
  verifiedSellersTitle: {
    ar: "تُجّار معتمدون",
    en: "Verified Merchants",
    fr: "Commerçants Vérifiés",
    tr: "Doğrulanmış Satıcılar",
  },
  verifiedSellersDesc: {
    ar: "تدقيق واختبار صارم من الإدارة",
    en: "Strict admin audit & verification",
    fr: "Audit et vérification stricts par l'administration",
    tr: "Kapsamlı yönetici denetimi ve doğrulaması",
  },
  buyerProtectionTitle: {
    ar: "حماية المشتري",
    en: "Buyer Protection",
    fr: "Protection de l'Acheteur",
    tr: "Alıcı Koruması",
  },
  buyerProtectionDesc: {
    ar: "دفع آمن وضمان استرجاع المنتجات",
    en: "Escrow payments & easy returns",
    fr: "Paiements sécurisés et retours faciles",
    tr: "Güvenli ödeme ve kolay iade",
  },
  forSellersTitle: {
    ar: "للتُجّار والشركات",
    en: "For Merchants & Sellers",
    fr: "Pour les Commerçants et Vendeurs",
    tr: "Satıcılar ve İşletmeler İçin",
  },
  sellerEducation: {
    ar: "دليل ومركز البائعين",
    en: "Seller Hub & Education",
    fr: "Centre et Éducation Vendeur",
    tr: "Satıcı Merkezi ve Rehberi",
  },
  applyForLoansFooter: {
    ar: "تمويل الشركات والأعمال",
    en: "Business Loans & Financing",
    fr: "Financement des Entreprises",
    tr: "İşletme Kredileri ve Finansman",
  },
  aboutJusurKush: {
    ar: "عن جسور كوش",
    en: "About JusurKush",
    fr: "À Propos de JusurKush",
    tr: "JusurKush Hakkında",
  },
  customerCare: {
    ar: "خدمة العملاء والمساندة",
    en: "Customer Care & Support",
    fr: "Service Client et Support",
    tr: "Müşteri Hizmetleri",
  },
  helpCenter: {
    ar: "مركز المساعدة والأسئلة الشائعة",
    en: "Help Center & FAQ",
    fr: "Centre d'Aide et FAQ",
    tr: "Yardım Merkezi ve SSS",
  },
  allRightsReserved: {
    ar: "جميع الحقوق محفوظة لشركة جسور كوش للتجارة الإلكترونية والتمويل",
    en: "All rights reserved. JusurKush Multi-Vendor E-Commerce & Financing",
    fr: "Tous droits réservés. JusurKush Commerce & Financement",
    tr: "Tüm hakları saklıdır. JusurKush E-Ticaret ve Finansman",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "rtl" | "ltr";
}

const LanguageContext = createContext<LanguageContextType>({
  language: "ar",
  setLanguage: () => {},
  t: (key: string) => key,
  dir: "rtl",
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("ar");

  useEffect(() => {
    const saved = localStorage.getItem("jusur_lang") as Language;
    if (saved && ["ar", "en", "fr", "tr"].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("jusur_lang", lang);
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  const t = (key: string): string => {
    if (DICTIONARY[key] && DICTIONARY[key][language]) {
      return DICTIONARY[key][language];
    }
    if (DICTIONARY[key] && DICTIONARY[key]["en"]) {
      return DICTIONARY[key]["en"];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      <div dir={dir} className="contents">{children}</div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
