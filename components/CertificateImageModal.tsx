"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Award,
} from "lucide-react";
import type { Certificate } from "@/types/certificate";

type Props = {
  certificates: Certificate[];
  selectedIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function CertificateImageModal({
  certificates,
  selectedIndex,
  onClose,
  onPrev,
  onNext,
}: Props) {
  const [zoomLevel, setZoomLevel] = useState(1);

  // Reset zoom when switching certificates
  useEffect(() => {
    setZoomLevel(1);
  }, [selectedIndex]);

  // Keyboard navigation & zoom
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (selectedIndex === null) return;

      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "+" || e.key === "=") {
        setZoomLevel((prev) => Math.min(2.5, prev + 0.25));
      }
      if (e.key === "-") {
        setZoomLevel((prev) => Math.max(1, prev - 0.25));
      }
      if (e.key === "0") {
        setZoomLevel(1);
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, onClose, onPrev, onNext]);

  if (selectedIndex === null || !certificates[selectedIndex]) return null;

  const cert = certificates[selectedIndex];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] bg-stone-950/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 select-none overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      >
        {/* Ambient atmospheric glows */}
        <div className="pointer-events-none fixed top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-orange-600/[0.08] blur-[150px]" />
        <div className="pointer-events-none fixed bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-amber-500/[0.08] blur-[140px]" />

        {/* Modal Window Container */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 15 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-5xl w-full flex flex-col my-auto rounded-[32px] sm:rounded-[38px] bg-stone-900/90 border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.6),0_0_40px_rgba(234,88,12,0.15)] overflow-hidden"
        >
          {/* Top Radiant Katana Energy Blade */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-amber-400 to-red-500 z-30 shadow-[0_0_12px_rgba(234,88,12,0.8)]" />

          {/* =============================================================== */}
          {/* 1. MODAL HEADER & CONTROLS TOOLBAR                              */}
          {/* =============================================================== */}
          <div className="relative z-20 flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-black/40 backdrop-blur-xl">
            {/* Left: Credential Telemetry Badge */}
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 font-orbitron text-[10px] font-bold tracking-wider uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                <span>CREDENTIAL PREVIEW // 「公式認定証」</span>
              </span>
              <span className="hidden sm:inline-block font-mono text-xs font-bold text-stone-400">
                0{selectedIndex + 1} / 0{certificates.length}
              </span>
            </div>

            {/* Right: Zoom & Close Controls Deck */}
            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10">
                <button
                  type="button"
                  onClick={() => setZoomLevel((prev) => Math.max(1, prev - 0.25))}
                  disabled={zoomLevel <= 1}
                  title="Zoom Out (-)"
                  aria-label="Zoom Out"
                  className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="px-2 font-mono text-[11px] font-bold text-stone-300">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((prev) => Math.min(2.5, prev + 0.25))}
                  disabled={zoomLevel >= 2.5}
                  title="Zoom In (+)"
                  aria-label="Zoom In"
                  className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                {zoomLevel > 1 && (
                  <button
                    type="button"
                    onClick={() => setZoomLevel(1)}
                    title="Reset Zoom (0)"
                    aria-label="Reset Zoom"
                    className="p-1.5 rounded-lg text-amber-400 hover:text-amber-300 hover:bg-white/10 transition-colors ml-1 border-l border-white/10"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                title="Close (Esc)"
                aria-label="Close Preview"
                className="p-2 rounded-full bg-white/10 hover:bg-orange-600 hover:text-white text-stone-300 border border-white/10 transition-all duration-200 active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* =============================================================== */}
          {/* 2. MAIN IMAGE VIEWPORT AREA                                     */}
          {/* =============================================================== */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[1.5/1] max-h-[62vh] bg-stone-950 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
            {/* Cyber Corner Viewfinder Brackets */}
            <div className="pointer-events-none absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-orange-500/60 z-20" />
            <div className="pointer-events-none absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-orange-500/60 z-20" />
            <div className="pointer-events-none absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-orange-500/60 z-20" />
            <div className="pointer-events-none absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-orange-500/60 z-20" />

            {/* Previous Arrow */}
            {certificates.length > 1 && (
              <button
                type="button"
                onClick={onPrev}
                title="Previous (Left Arrow)"
                aria-label="Previous Certificate"
                className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-orange-600/90 text-white border border-white/20 backdrop-blur-md shadow-lg transition-all active:scale-90 hover:scale-105"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Next Arrow */}
            {certificates.length > 1 && (
              <button
                type="button"
                onClick={onNext}
                title="Next (Right Arrow)"
                aria-label="Next Certificate"
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-orange-600/90 text-white border border-white/20 backdrop-blur-md shadow-lg transition-all active:scale-90 hover:scale-105"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

            {/* Certificate Visual Image */}
            {cert.logo?.url ? (
              <div
                className="relative w-full h-full flex items-center justify-center transition-transform duration-200"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <Image
                  src={cert.logo.url}
                  alt={cert.title}
                  fill
                  className="object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-stone-500 font-mono text-sm gap-2">
                <Award className="w-12 h-12 text-stone-600" />
                <p>NO PREVIEW IMAGE AVAILABLE</p>
              </div>
            )}
          </div>

          {/* =============================================================== */}
          {/* 3. RICH METADATA & VERIFICATION FOOTER                          */}
          {/* =============================================================== */}
          <div className="relative z-20 px-5 sm:px-8 py-5 border-t border-white/10 bg-stone-900/95 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                {/* Issuer Badge & Date */}
                <div className="flex flex-wrap items-center gap-3 mb-1.5">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-orange-400 border border-orange-500/30 font-orbitron text-[10px] font-bold uppercase tracking-wider">
                    {cert.issuer}
                  </span>

                  <span className="flex items-center gap-1.5 text-stone-400 font-mono text-xs font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-stone-500" />
                    {new Date(cert.issueDate).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Certificate Title */}
                <h3 className="text-xl sm:text-2xl font-rajdhani font-bold text-white tracking-wide leading-snug">
                  {cert.title}
                </h3>
              </div>

              {/* Action Buttons: Verification URL or Direct Link */}
              <div className="flex items-center gap-2.5 shrink-0">
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-orbitron text-xs font-bold uppercase tracking-wider hover:shadow-[0_8px_20px_rgba(234,88,12,0.35)] transition-all active:scale-95"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
