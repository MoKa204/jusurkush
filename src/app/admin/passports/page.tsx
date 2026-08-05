"use client";

import React, { useEffect, useState } from "react";
import { ShieldCheck, UserCheck, Eye, CheckCircle2, XCircle, FileText, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminPassportsPage() {
  const { language } = useLanguage();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  const fetchPassports = () => {
    setLoading(true);
    fetch("/api/admin/passports")
      .then((res) => res.json())
      .then((data) => setUsers(data.users || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPassports();
  }, []);

  const handleAction = async (userId: string, status: "VERIFIED" | "REJECTED") => {
    try {
      const res = await fetch(`/api/admin/passports/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        fetchPassports();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="bg-white p-8 rounded-2xl border border-slate-200 animate-pulse h-64" />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center space-x-2 space-x-reverse">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>
              {language === "ar"
                ? "تدقيق ومراجعة جوازات السفر (KYC)"
                : "Passport & Identity Verification Queue"}
            </span>
          </h1>
          <p className="text-xs text-slate-500">
            {language === "ar"
              ? "مراجعة وثائق جواز السفر المقدمة من قبل الزبائن والتُجّار وتدقيق أصالتها"
              : "Audit passport documents submitted by buyers & sellers for authentication"}
          </p>
        </div>
        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
          {users.length} {language === "ar" ? "وثيقة" : "Documents"}
        </span>
      </div>

      {users.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <UserCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">
            {language === "ar" ? "لا توجد جوازات سفر قيد الانتظار" : "No Passports Pending Review"}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {language === "ar" ? "سيظهر أي إثبات هويّة أو جواز سفر مرفق هنا فور رفعه." : "Submitted passports will appear here for review."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold uppercase text-[10px] text-slate-500">
                <tr>
                  <th className="p-4">{language === "ar" ? "المستخدم" : "User"}</th>
                  <th className="p-4">{language === "ar" ? "نوع الحساب" : "Role"}</th>
                  <th className="p-4">{language === "ar" ? "حالة التحقق" : "Status"}</th>
                  <th className="p-4">{language === "ar" ? "صورة الجواز" : "Passport Document"}</th>
                  <th className="p-4 text-right rtl:text-left">{language === "ar" ? "الإجراءات" : "Actions"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/60 transition">
                    <td className="p-4 font-semibold">
                      <p className="font-bold text-slate-900">{u.name}</p>
                      <p className="text-[10px] text-slate-400">{u.email}</p>
                      {u.sellerProfile && (
                        <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">
                          {u.sellerProfile.businessName} (Reg: {u.sellerProfile.registrationNumber})
                        </span>
                      )}
                    </td>
                    <td className="p-4 font-bold text-slate-800">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px]">
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`font-black text-[10px] px-2 py-0.5 rounded uppercase ${
                          u.verificationStatus === "VERIFIED"
                            ? "bg-emerald-100 text-emerald-800"
                            : u.verificationStatus === "REJECTED"
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-900"
                        }`}
                      >
                        {u.verificationStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      {u.passportPhoto ? (
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <img
                            src={u.passportPhoto}
                            alt="Passport"
                            className="w-12 h-10 object-cover rounded border border-slate-300 shadow-sm cursor-pointer hover:scale-105 transition"
                            onClick={() => setPreviewPhoto(u.passportPhoto)}
                          />
                          <button
                            type="button"
                            onClick={() => setPreviewPhoto(u.passportPhoto)}
                            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded text-[10px] flex items-center space-x-1 space-x-reverse"
                          >
                            <Eye className="w-3 h-3 text-emerald-600" />
                            <span>{language === "ar" ? "معاينة" : "Inspect"}</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic text-[10px]">No document</span>
                      )}
                    </td>
                    <td className="p-4 text-right rtl:text-left">
                      <div className="flex items-center justify-end space-x-2 space-x-reverse">
                        <button
                          onClick={() => handleAction(u.id, "VERIFIED")}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-[10px] flex items-center space-x-1 space-x-reverse transition shadow-sm"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{language === "ar" ? "تأكيد الأصالة" : "Verify & Approve"}</span>
                        </button>
                        <button
                          onClick={() => handleAction(u.id, "REJECTED")}
                          className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded text-[10px] flex items-center space-x-1 space-x-reverse transition border border-red-200"
                        >
                          <XCircle className="w-3 h-3" />
                          <span>{language === "ar" ? "رفض الجواز" : "Reject"}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Passport Preview Modal */}
      {previewPhoto && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-slate-900 text-sm">
                {language === "ar" ? "معاينة وثيقة جواز السفر (KYC)" : "Passport Document Inspection"}
              </h3>
              <button
                onClick={() => setPreviewPhoto(null)}
                className="text-slate-500 hover:text-slate-800 font-bold text-xs"
              >
                ✕
              </button>
            </div>
            <div className="max-h-96 overflow-auto rounded-lg border border-slate-200">
              <img src={previewPhoto} alt="Full Passport" className="w-full h-auto object-contain" />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setPreviewPhoto(null)}
                className="px-5 py-2 bg-slate-900 text-white font-bold rounded-lg text-xs"
              >
                {language === "ar" ? "إغلاق" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
