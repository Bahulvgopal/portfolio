"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, Eye, X, ExternalLink, Image as ImageIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { UploadedImage } from "./types";

interface Props {
  image: UploadedImage;
  onRemove: () => void;
}

export default function ImagePreview({ image, onRemove }: Props) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="space-y-3">
      {/* Viewfinder Preview Box */}
      <div className="group relative h-64 w-full overflow-hidden rounded-2xl border border-white/20 bg-stone-950 shadow-inner flex items-center justify-center">
        {/* Cyber corner brackets */}
        <div className="pointer-events-none absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-orange-500/70 z-20" />
        <div className="pointer-events-none absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-orange-500/70 z-20" />
        <div className="pointer-events-none absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-orange-500/70 z-20" />
        <div className="pointer-events-none absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-orange-500/70 z-20" />

        {image?.url ? (
          <>
            <Image
              src={image.url}
              alt="Uploaded Preview"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-contain p-2.5 transition-transform duration-300 group-hover:scale-102"
            />

            {/* Quick Actions Hover Overlay */}
            <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-30">
              <button
                type="button"
                onClick={() => setIsFullscreen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-orbitron text-[11px] font-bold uppercase backdrop-blur-md transition-all shadow-md"
              >
                <Eye size={13} />
                <span>Enlarge</span>
              </button>

              {image.url.startsWith("http") && (
                <a
                  href={image.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600/80 hover:bg-orange-600 text-white font-orbitron text-[11px] font-bold uppercase backdrop-blur-md transition-all shadow-md"
                >
                  <ExternalLink size={13} />
                  <span>Open URL</span>
                </a>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-stone-500 text-xs font-mono gap-1.5">
            <ImageIcon size={24} />
            <span>NO PREVIEW AVAILABLE</span>
          </div>
        )}

        {/* Status Pill Top-Right */}
        <div className="absolute top-3 right-3 z-20">
          <span className="px-2 py-0.5 rounded-full bg-stone-900/80 backdrop-blur-md border border-white/15 text-[9px] font-mono text-stone-300 font-bold uppercase">
            READY
          </span>
        </div>
      </div>

      {/* Remove Button */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 backdrop-blur-xl px-4 py-2 font-orbitron text-xs font-bold uppercase tracking-wider text-rose-300 hover:bg-rose-500/20 hover:text-white transition-all shadow-xs"
        >
          <Trash2 size={13} />
          <span>Remove Attachment</span>
        </button>

        <span className="text-[10px] font-mono text-stone-400">
          Click image to inspect
        </span>
      </div>

      {/* Fullscreen Modal Lightbox */}
      <AnimatePresence>
        {isFullscreen && image?.url && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullscreen(false)}
            className="fixed inset-0 z-[999] bg-stone-950/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] w-full rounded-3xl bg-stone-900 border border-white/20 p-4 shadow-2xl flex flex-col items-center"
            >
              <div className="w-full flex justify-between items-center pb-3 border-b border-white/10 mb-3">
                <span className="font-orbitron text-xs font-bold text-orange-400 uppercase tracking-wider">
                  IMAGE INSPECTION PREVIEW
                </span>
                <button
                  type="button"
                  onClick={() => setIsFullscreen(false)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="relative aspect-[16/10] w-full max-h-[70vh] flex items-center justify-center bg-black/60 rounded-2xl overflow-hidden">
                <Image
                  src={image.url}
                  alt="Enlarged Preview"
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
