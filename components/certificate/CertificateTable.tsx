"use client";

import Link from "next/link";
import { Plus, Award } from "lucide-react";

import { useCertificate } from "@/hooks/useCertificate";
import CertificateRow from "./CertificateRow";
import Loader from "@/components/ui/Loader";

export default function CertificateTable() {
  const { certificates, loading, removeCertificate } = useCertificate();

  if (loading) {
    return <Loader />;
  }

  if (certificates.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-[32px] border border-white/20 bg-slate-950/40 backdrop-blur-3xl p-10 text-center sm:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.25)]">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/15 blur-[100px]"
        />

        <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.05] shadow-[0_4px_20px_rgba(249,115,22,0.3)]">
          <Award size={28} className="text-orange-400" />
        </div>

        <h2 className="relative font-orbitron text-xl sm:text-2xl font-black text-white uppercase tracking-wide">
          NO CERTIFICATES REGISTERED
        </h2>

        <p className="relative mx-auto mt-2 max-w-sm font-rajdhani text-sm sm:text-base font-semibold text-stone-300">
          Add your professional certifications, cloud accreditations, and achievements.
        </p>

        <Link
          href="/admin/certificates/new"
          className="relative mt-7 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-500 to-rose-600 px-6 py-3.5 font-orbitron text-xs font-black uppercase tracking-wider text-white shadow-[0_4px_24px_rgba(249,115,22,0.45)] transition-all duration-300 hover:scale-105 border border-white/25"
        >
          <Plus size={16} />
          ADD CERTIFICATE
        </Link>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] border border-white/20 bg-slate-950/40 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.25)]">
      {/* Top Glass Glare Line */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-10" />

      {/* Header Bar */}
      <div className="flex flex-col gap-4 border-b border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-orbitron text-[10px] font-bold text-orange-400 tracking-widest uppercase">
              // CREDENTIAL REGISTRY // 「認定」
            </span>
            <span className="text-stone-500 font-mono text-xs hidden sm:inline">· · ·</span>
          </div>
          <h2 className="font-orbitron text-lg sm:text-xl font-black text-white uppercase tracking-wide">
            CERTIFICATES
          </h2>
          <p className="mt-0.5 font-rajdhani text-xs sm:text-sm font-semibold text-stone-400">
            {certificates.length} credentials currently showcased on your portfolio
          </p>
        </div>

        <Link
          href="/admin/certificates/new"
          className="inline-flex items-center justify-center gap-2 self-start rounded-2xl bg-gradient-to-r from-orange-600 via-amber-500 to-rose-600 px-5 py-3 font-orbitron text-xs font-black uppercase tracking-wider text-white shadow-[0_4px_20px_rgba(249,115,22,0.4)] transition-all duration-300 hover:scale-105 border border-white/25 sm:self-auto"
        >
          <Plus size={16} />
          ADD CERTIFICATE
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-left font-orbitron text-[10px] font-bold uppercase tracking-wider text-stone-400">
              <th className="p-4 sm:p-5 font-bold">Certificate</th>
              <th className="p-4 sm:p-5 font-bold">Issuer</th>
              <th className="p-4 sm:p-5 font-bold">Issued</th>
              <th className="p-4 sm:p-5 font-bold">Status</th>
              <th className="w-28 p-4 sm:p-5 font-bold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/[0.08]">
            {certificates.map((certificate) => (
              <CertificateRow
                key={certificate._id}
                certificate={certificate}
                onDelete={removeCertificate}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
