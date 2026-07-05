"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Certificate } from "@/data/certificates";

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
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (selectedIndex === null) return;

      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, onClose, onPrev, onNext]);

  if (selectedIndex === null) return null;

  const cert = certificates[selectedIndex];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] bg-black/85 backdrop-blur-md flex items-center justify-center p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: .92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: .92, opacity: 0 }}
          transition={{ duration: .25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-6xl w-full"
        >
          {/* Close */}

          <button
            onClick={onClose}
            className="absolute -top-14 right-0 text-white hover:text-sky-400 transition"
          >
            ✕
          </button>

          {/* Previous */}

          {certificates.length > 1 && (
            <button
              onClick={onPrev}
              className="absolute left-0 top-1/2 -translate-x-16 -translate-y-1/2 text-white text-3xl"
            >
              ‹
            </button>
          )}

          {/* Next */}

          {certificates.length > 1 && (
            <button
              onClick={onNext}
              className="absolute right-0 top-1/2 translate-x-16 -translate-y-1/2 text-white text-3xl"
            >
              ›
            </button>
          )}

          <div className="overflow-hidden rounded-2xl bg-[#111] border border-white/10">

            {cert.image ? (
              <div className="relative aspect-[1.414/1] w-full">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            ) : (
              <div className="h-[600px] flex items-center justify-center text-neutral-500">
                No Preview Available
              </div>
            )}

          </div>

          <div className="mt-5 text-center">

            <h2
              className="text-2xl text-white"
              style={{
                fontFamily: "'Georgia','Times New Roman',serif",
              }}
            >
              {cert.title}
            </h2>

            <p className="text-neutral-400 mt-2">
              {cert.issuer}
            </p>

            <p className="text-neutral-500 text-sm mt-1">
              {cert.displayDate}
            </p>

          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}