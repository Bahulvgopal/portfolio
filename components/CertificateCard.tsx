"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Certificate } from "@/types/certificate";

type Props = {
  certificate: Certificate;
  index: number;
  latest?: boolean;
  onClick: () => void;
};

const revealInView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: {
    duration: 0.65,
    ease: [0.16, 1, 0.3, 1] as const,
    delay,
  },
});

export default function CertificateCard({
  certificate,
  index,
  latest = false,
  onClick,
}: Props) {
  return (
    <motion.article
      {...revealInView(0.04 * (index % 6))}
      onClick={onClick}
      className="
        group relative overflow-hidden
        rounded-[34px] sm:rounded-[38px]
        p-2.5 sm:p-3.5
        bg-white/45 backdrop-blur-2xl
        border border-white/80
        shadow-[0_20px_50px_rgba(0,0,0,0.06),inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(0,0,0,0.04),inset_0_0_20px_rgba(255,255,255,0.3)]
        hover:shadow-[0_28px_65px_rgba(234,88,12,0.18)]
        hover:border-orange-500/40
        hover:-translate-y-1.5
        transition-all duration-300
        flex flex-col gap-2.5 sm:gap-3
        h-full justify-between
        cursor-pointer
      "
    >
      {/* Top Radiant Energy Blade */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 z-30 opacity-70 group-hover:opacity-100 transition-opacity" />

      {/* 1. TOP COMPARTMENT (Image & Credential Title) */}
      <div
        className="
          relative z-10 overflow-hidden
          rounded-[26px] sm:rounded-[28px]
          bg-gradient-to-b from-white/75 via-white/60 to-white/70
          backdrop-blur-xl
          border border-white/85
          p-4 sm:p-5
          shadow-[inset_0_2px_4px_rgba(255,255,255,0.98),inset_0_-1.5px_3px_rgba(0,0,0,0.04),0_6px_20px_rgba(0,0,0,0.02)]
          flex-1 flex flex-col justify-between
        "
      >
        <div>
          {/* Certificate Image Window */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] mb-4 border border-white/80 bg-stone-100/80 shadow-inner group/media">
            {certificate.logo?.url ? (
              <>
                <Image
                  src={certificate.logo.url}
                  alt={certificate.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-850 to-orange-950 flex flex-col items-center justify-center p-6 select-none">
                <span className="font-manga text-3xl font-bold text-orange-500 tracking-wider">
                  CERT // 認定証
                </span>
              </div>
            )}

            {/* Badges on preview */}
            <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5">
              <span className="px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-white border border-white/20 font-orbitron text-[9px] font-bold tracking-wider uppercase shadow-sm flex items-center gap-1">
                <svg className="w-2.5 h-2.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                VERIFIED
              </span>
              {latest && (
                <span className="px-2 py-0.5 rounded-full bg-orange-600/90 backdrop-blur-md text-white font-orbitron text-[9px] font-extrabold tracking-wider uppercase shadow-sm border border-orange-400/40">
                  ★ LATEST
                </span>
              )}
            </div>
          </div>

          {/* Credential Meta Index */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-orbitron text-[10px] font-bold text-orange-600 tracking-wider">
              // CREDENTIAL_{String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-stone-300 text-xs">|</span>
            <span className="font-manga text-[11px] text-stone-500 tracking-wider">
              「資格認定」
            </span>
          </div>

          {/* Title */}
          <h3 className="font-rajdhani text-2xl font-bold tracking-tight text-stone-900 group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
            {certificate.title}
          </h3>

          {/* Issuer */}
          <p className="font-rajdhani text-sm font-semibold text-stone-600 mt-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            {certificate.issuer}
          </p>
        </div>
      </div>

      {/* 2. BOTTOM COMPARTMENT (Action Tray) */}
      <div
        className="
          relative z-10 overflow-hidden
          rounded-[20px] sm:rounded-[22px]
          bg-gradient-to-b from-white/80 via-white/70 to-white/75
          backdrop-blur-xl
          border border-white/85
          px-4 sm:px-5 py-3
          shadow-[inset_0_2px_4px_rgba(255,255,255,0.98),inset_0_-1.5px_3px_rgba(0,0,0,0.04),0_4px_14px_rgba(0,0,0,0.02)]
          flex items-center justify-between
          group-hover:bg-white/85
          transition-all duration-300
        "
      >
        <span className="inline-flex items-center gap-1.5 font-orbitron text-xs font-bold text-stone-900 group-hover:text-orange-600 transition-colors uppercase tracking-wider">
          <span>VIEW CREDENTIAL</span>
          <svg className="w-3.5 h-3.5 text-orange-600 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>

        <span className="font-orbitron text-[10px] font-bold text-stone-500 tracking-wider">
          {new Date(certificate.issueDate).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </motion.article>
  );
}
