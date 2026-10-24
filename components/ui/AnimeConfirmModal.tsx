"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Flame, ShieldAlert, X } from "lucide-react";

export interface ConfirmOptions {
  title?: string;
  subtitle?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
}

interface ConfirmContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export function AnimeConfirmProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback((opts: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
      setOptions(opts);
      setIsOpen(true);
    });
  }, []);

  const handleConfirm = useCallback(() => {
    setIsOpen(false);
    if (resolverRef.current) {
      resolverRef.current(true);
      resolverRef.current = null;
    }
  }, []);

  const handleCancel = useCallback(() => {
    setIsOpen(false);
    if (resolverRef.current) {
      resolverRef.current(false);
      resolverRef.current = null;
    }
  }, []);

  const variant = options?.variant || "danger";
  const isDanger = variant === "danger";

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      <AnimatePresence>
        {isOpen && options && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleCancel}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", damping: 24, stiffness: 320 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-[#0e1424]/95 via-[#0a0f1d]/98 to-[#050811]/98 p-6 sm:p-7 text-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(244,63,94,0.18)] backdrop-blur-2xl"
            >
              {/* Top Accent Energy Blade */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 ${
                  isDanger
                    ? "bg-gradient-to-r from-transparent via-rose-500 to-transparent shadow-[0_0_15px_#f43f5e]"
                    : "bg-gradient-to-r from-transparent via-amber-500 to-transparent shadow-[0_0_15px_#f59e0b]"
                }`}
              />

              {/* Japanese Calligraphy Watermark */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-4 -bottom-6 select-none text-8xl font-black text-white/[0.03]"
                style={{ fontFamily: "'MangaTemple', sans-serif" }}
              >
                {isDanger ? "斬滅" : "警報"}
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={handleCancel}
                className="absolute top-4 right-4 rounded-xl border border-white/10 bg-white/5 p-2 text-stone-400 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <X size={16} />
              </button>

              {/* Tactical Status Tag */}
              <div className="mb-4 flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-orbitron text-[10px] font-bold uppercase tracking-widest ${
                    isDanger
                      ? "border-rose-500/40 bg-rose-500/15 text-rose-300"
                      : "border-amber-500/40 bg-amber-500/15 text-amber-300"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full animate-ping ${
                      isDanger ? "bg-rose-400" : "bg-amber-400"
                    }`}
                  />
                  {options.subtitle || (isDanger ? "TACTICAL PURGE DECREE // 「緊急消去警告」" : "SECURITY PROMPT // 「認証確認」")}
                </span>
              </div>

              {/* Body Layout */}
              <div className="flex gap-4 sm:gap-5">
                {/* Warning Icon Emblem */}
                <div
                  className={`relative flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border ${
                    isDanger
                      ? "border-rose-500/40 bg-rose-500/15 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.25)]"
                      : "border-amber-500/40 bg-amber-500/15 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)]"
                  }`}
                >
                  {isDanger ? (
                    <ShieldAlert size={28} className="stroke-[2.2]" />
                  ) : (
                    <AlertTriangle size={28} className="stroke-[2.2]" />
                  )}
                  <Flame
                    size={14}
                    className={`absolute -top-1.5 -right-1.5 animate-pulse ${
                      isDanger ? "text-rose-500" : "text-amber-500"
                    }`}
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-orbitron text-lg font-bold uppercase tracking-wide text-white">
                    {options.title || (isDanger ? "EXECUTE TARGET DELETION?" : "CONFIRM OPERATION")}
                  </h3>
                  <p className="mt-2 font-rajdhani text-sm font-medium leading-relaxed text-stone-300">
                    {options.message}
                  </p>
                </div>
              </div>

              {/* Hazard Bar */}
              <div className="my-5 h-1 w-full rounded-full overflow-hidden bg-black/60 border border-white/5">
                <div
                  className={`h-full w-full opacity-60 ${
                    isDanger
                      ? "bg-[repeating-linear-gradient(45deg,#f43f5e,#f43f5e_10px,#000_10px,#000_20px)]"
                      : "bg-[repeating-linear-gradient(45deg,#f59e0b,#f59e0b_10px,#000_10px,#000_20px)]"
                  }`}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 font-orbitron text-xs font-bold uppercase tracking-wider text-stone-300 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  {options.cancelText || "ABORT MISSION // 中止"}
                </button>

                <button
                  type="button"
                  onClick={handleConfirm}
                  autoFocus
                  className={`inline-flex items-center justify-center gap-2 rounded-xl border px-6 py-2.5 font-orbitron text-xs font-black uppercase tracking-wider text-white transition-all hover:scale-[1.02] ${
                    isDanger
                      ? "border-rose-400/40 bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 shadow-[0_0_25px_rgba(244,63,94,0.45)] hover:shadow-[0_0_35px_rgba(244,63,94,0.65)]"
                      : "border-amber-400/40 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 shadow-[0_0_25px_rgba(245,158,11,0.45)] hover:shadow-[0_0_35px_rgba(245,158,11,0.65)]"
                  }`}
                >
                  {options.confirmText || (isDanger ? "EXECUTE PURGE // 削除実行" : "PROCEED // 続行")}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ConfirmContext.Provider>
  );
}

export function useAnimeConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) {
    // Graceful fallback to window.confirm in case provider isn't mounted yet
    return async (opts: ConfirmOptions) => {
      if (typeof window !== "undefined") {
        return window.confirm(opts.message);
      }
      return false;
    };
  }
  return ctx.confirm;
}

