"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, Maximize2 } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    setZoomLevel(1);
  }, [activeIndex]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (activeIndex === null) return;
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev === null ? 0 : (prev - 1 + images.length) % images.length));
      }
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % images.length));
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Visual Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img: string, i: number) => (
          <div
            key={i}
            onClick={() => setActiveIndex(i)}
            className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-stone-900 border border-white/20 shadow-md cursor-pointer hover:border-orange-500/50 hover:shadow-xl transition-all duration-300"
          >
            <Image
              src={img}
              alt={`Gallery Image ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-108"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 transform scale-90 group-hover:scale-100 transition-transform">
                <Maximize2 size={16} />
              </span>
            </div>
            <div className="absolute bottom-2 left-2 z-10 px-2 py-0.5 rounded-full bg-stone-900/80 backdrop-blur-md text-[9px] font-mono text-stone-300 border border-white/10">
              0{i + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Cyber Lightbox Modal */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
            className="fixed inset-0 z-[999] bg-stone-950/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 select-none"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full flex flex-col rounded-[32px] bg-stone-900/95 border border-white/20 shadow-2xl overflow-hidden"
            >
              {/* Top Accent Blade */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-amber-400 to-red-500 z-30" />

              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 font-orbitron text-[10px] font-bold uppercase tracking-wider">
                    GALLERY PREVIEW // 0{activeIndex + 1} OF 0{images.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10">
                    <button
                      type="button"
                      onClick={() => setZoomLevel((prev) => Math.max(1, prev - 0.25))}
                      disabled={zoomLevel <= 1}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-white disabled:opacity-30 transition-colors"
                    >
                      <ZoomOut size={15} />
                    </button>
                    <span className="px-2 font-mono text-[11px] font-bold text-stone-300">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      type="button"
                      onClick={() => setZoomLevel((prev) => Math.min(2.5, prev + 0.25))}
                      disabled={zoomLevel >= 2.5}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-white disabled:opacity-30 transition-colors"
                    >
                      <ZoomIn size={15} />
                    </button>
                    {zoomLevel > 1 && (
                      <button
                        type="button"
                        onClick={() => setZoomLevel(1)}
                        className="p-1.5 rounded-lg text-amber-400 hover:text-white transition-colors ml-1 border-l border-white/10"
                      >
                        <RotateCcw size={14} />
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveIndex(null)}
                    className="p-2 rounded-full bg-white/10 hover:bg-orange-600 text-stone-300 hover:text-white transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Viewport */}
              <div className="relative aspect-[16/10] max-h-[65vh] w-full bg-stone-950 flex items-center justify-center p-4 overflow-hidden">
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((prev) =>
                        prev === null ? 0 : (prev - 1 + images.length) % images.length
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-orange-600 text-white border border-white/20 backdrop-blur-md transition-all active:scale-90"
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}

                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((prev) =>
                        prev === null ? 0 : (prev + 1) % images.length
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-orange-600 text-white border border-white/20 backdrop-blur-md transition-all active:scale-90"
                  >
                    <ChevronRight size={20} />
                  </button>
                )}

                <div
                  className="relative w-full h-full flex items-center justify-center transition-transform duration-200"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  <Image
                    src={images[activeIndex]}
                    alt={`Preview ${activeIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>
              </div>

              {/* Bottom Thumbnail Strip */}
              {images.length > 1 && (
                <div className="p-3 bg-stone-950/80 border-t border-white/10 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
                  {images.map((thumb, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`relative w-14 h-9 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                        idx === activeIndex
                          ? "border-orange-500 scale-105 shadow-md shadow-orange-500/30"
                          : "border-white/20 opacity-50 hover:opacity-100"
                      }`}
                    >
                      <Image src={thumb} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
