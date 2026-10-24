"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import CertificateCard from "./CertificateCard";
import CertificateImageModal from "./CertificateImageModal";
import { MangaSpeechBubble } from "./AnimeStickers";
import type { Certificate } from "@/types/certificate";

type Props = {
  certificates: Certificate[];
};

export default function CertificatesPreview({ certificates }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const preview = [...certificates]
    .sort(
      (a, b) =>
        new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
    )
    .slice(0, 3);

  return (
    <section className="relative py-12 px-5 sm:px-8 lg:px-0 bg-[#FAF8F5] overflow-hidden">
      {/* Ambient Blobs */}
      <div className="pointer-events-none absolute top-0 right-1/4 w-[500px] h-[400px] rounded-full bg-orange-500/[0.04] blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-500/[0.04] blur-[130px]" />

      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* -- Header -------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/25 bg-orange-500/10 text-orange-600 font-orbitron text-[10px] font-bold tracking-[0.18em] uppercase shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
                VERIFIED CREDENTIALS // 「資格認定」
              </span>
              <MangaSpeechBubble text="CERTIFIED PRO 📜" className="hidden sm:inline-block" />
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-manga tracking-wide leading-none text-stone-900 uppercase">
              MY{" "}
              <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 bg-clip-text text-transparent">
                CERTIFICATES
              </span>
            </h2>

            <p className="mt-3.5 font-rajdhani text-sm sm:text-base font-medium text-stone-600 tracking-wide leading-relaxed max-w-xl">
              Industry certifications, licenses, and verified skill badges validating technical
              mastery across engineering domains.
            </p>
          </div>

          <Link
            href="/certificates"
            className="
              group inline-flex items-center gap-2.5 self-start lg:self-end shrink-0
              px-6 py-3 rounded-full
              bg-white/80 backdrop-blur-xl border border-stone-200/90
              text-stone-800 font-orbitron text-xs font-bold tracking-wider uppercase
              hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50/40
              hover:shadow-[0_12px_28px_rgba(234,88,12,0.18)]
              shadow-[0_4px_16px_rgba(0,0,0,0.04)]
              transition-all duration-300
            "
          >
            <span>View all certificates</span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 text-orange-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {/* -- Katana Energy Rule -- */}
        <div
          className="h-px mb-12"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(234,88,12,0.3) 30%, rgba(245,158,11,0.3) 70%, transparent)",
          }}
        />

        {/* -- Cards Grid -- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {preview.map((cert, index) => (
            <CertificateCard
              key={cert._id}
              certificate={cert}
              index={index}
              latest={index === 0}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Cyber Lightbox Image Preview Modal */}
      <CertificateImageModal
        certificates={preview}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onPrev={() =>
          setSelectedIndex((prev) =>
            prev === null ? 0 : (prev - 1 + preview.length) % preview.length
          )
        }
        onNext={() =>
          setSelectedIndex((prev) =>
            prev === null ? 0 : (prev + 1) % preview.length
          )
        }
      />
    </section>
  );
}
