"use client";

import Link from "next/link";
import { Plus, Award } from "lucide-react";

import { useCertificate } from "@/hooks/useCertificate";
import CertificateRow from "./CertificateRow";

export default function CertificateTable() {
  const {
    certificates,
    loading,
    removeCertificate,
  } = useCertificate();

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
        <div className="mb-6 h-6 w-40 animate-pulse rounded-md bg-white/[0.06]" />
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
            >
              <div className="h-12 w-12 shrink-0 animate-pulse rounded-lg bg-white/[0.06]" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 w-1/3 animate-pulse rounded bg-white/[0.06]" />
                <div className="h-3 w-1/4 animate-pulse rounded bg-white/[0.04]" />
              </div>
              <div className="hidden h-6 w-20 animate-pulse rounded-full bg-white/[0.06] sm:block" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.02] p-10 text-center sm:p-14">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/[0.08] blur-[100px]"
        />

        <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04]">
          <Award size={24} className="text-sky-400" />
        </div>

        <h2
          className="relative text-xl font-semibold text-white"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          No certificates yet
        </h2>

        <p className="relative mx-auto mt-2 max-w-sm text-sm leading-relaxed text-neutral-400">
          Add your first certificate to display it on your portfolio.
        </p>

        <Link
          href="/admin/certificates/new"
          className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-neutral-900 shadow-[0_0_32px_rgba(255,255,255,0.08)] transition-all duration-200 hover:bg-neutral-100"
        >
          <Plus size={18} />
          Add Certificate
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02]">
      <div className="flex flex-col gap-4 border-b border-white/[0.08] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2
            className="text-lg font-semibold text-white"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Certificates
          </h2>
          <p className="mt-0.5 text-xs text-neutral-500">
            {certificates.length}{" "}
            {certificates.length === 1 ? "certificate" : "certificates"} on your
            portfolio
          </p>
        </div>

        <Link
          href="/admin/certificates/new"
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-[0_0_24px_rgba(255,255,255,0.06)] transition-all duration-200 hover:bg-neutral-100 sm:self-auto"
        >
          <Plus size={18} />
          Add Certificate
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-white/[0.06] text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
              <th className="p-4 font-medium">Certificate</th>
              <th className="p-4 font-medium">Issuer</th>
              <th className="p-4 font-medium">Issued</th>
              <th className="p-4 font-medium">Status</th>
              <th className="w-28 p-4 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
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