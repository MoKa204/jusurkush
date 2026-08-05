"use client";

import React from "react";
import Link from "next/link";
import { PackageOpen, Store } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionText?: string;
  actionHref?: string;
}

export default function EmptyState({
  title,
  message,
  actionText,
  actionHref = "/register-seller",
}: EmptyStateProps) {
  const { t } = useLanguage();

  const finalTitle = title || t("emptyTitle");
  const finalMessage = message || t("emptyDesc");
  const finalActionText = actionText || t("regSellerBtn");

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-6 max-w-xl mx-auto shadow-sm">
      <div className="inline-flex p-4 bg-emerald-50 text-emerald-600 rounded-full mb-4 border border-emerald-100">
        <PackageOpen className="w-10 h-10" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{finalTitle}</h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-6">{finalMessage}</p>
      {finalActionText && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center space-x-2 space-x-reverse bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition shadow"
        >
          <Store className="w-4 h-4" />
          <span>{finalActionText}</span>
        </Link>
      )}
    </div>
  );
}
