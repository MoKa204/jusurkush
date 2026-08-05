"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Smartphone,
  Shirt,
  Home as HomeIcon,
  Sparkles,
  Dumbbell,
  BookOpen,
  Baby,
  Grid,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

const ICON_MAP: Record<string, any> = {
  Smartphone,
  Shirt,
  Home: HomeIcon,
  Sparkles,
  Dumbbell,
  BookOpen,
  Baby,
};

const ARABIC_CATEGORY_NAMES: Record<string, string> = {
  electronics: "الإلكترونيات والأجهزة",
  fashion: "الأزياء والملابس",
  "home-living": "المنزل والديكور",
  "health-beauty": "الصحة والجمال",
  "sports-outdoor": "الرياضة والأنشطة الخارجية",
  "books-stationery": "الكتب والأدوات المكتبية",
  "toys-kids-baby": "الألعاب ومستلزمات الأطفال",
};

export default function CategoryNav() {
  const { t, language } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div id="categories" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
      <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-4 flex items-center space-x-2 space-x-reverse">
        <Grid className="w-4 h-4 text-emerald-600" />
        <span>{t("categoriesTitle")}</span>
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
        {categories.map((cat) => {
          const IconComponent = (cat.icon && ICON_MAP[cat.icon]) || Grid;
          const displayName = language === "ar" && ARABIC_CATEGORY_NAMES[cat.slug]
            ? ARABIC_CATEGORY_NAMES[cat.slug]
            : cat.name;

          return (
            <Link
              key={cat.id}
              href={`/search?category=${cat.slug}`}
              className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/40 hover:shadow-md transition text-center group"
            >
              <div className="p-3 bg-slate-100 group-hover:bg-emerald-600 group-hover:text-white text-slate-600 rounded-full mb-2 transition">
                <IconComponent className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-700 group-hover:text-emerald-700 transition line-clamp-2">
                {displayName}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
