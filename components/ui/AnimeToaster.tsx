"use client";

import { Toaster as SonnerToaster } from "sonner";
import { CheckCircle2, AlertTriangle, XCircle, Info, Loader2 } from "lucide-react";

export default function AnimeToaster() {
  return (
    <SonnerToaster
      position="top-right"
      expand={true}
      richColors={false}
      gap={12}
      toastOptions={{
        duration: 4200,
        className: "anime-cyber-toast group",
        style: {
          background: "linear-gradient(135deg, rgba(10, 15, 29, 0.96) 0%, rgba(15, 23, 42, 0.94) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          color: "#FAF8F5",
          borderRadius: "16px",
          padding: "16px 18px",
          boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.12)",
        },
        classNames: {
          toast: "font-rajdhani relative overflow-hidden transition-all duration-300",
          title: "font-orbitron text-xs font-bold tracking-wider text-stone-100 uppercase",
          description: "text-stone-300 text-xs font-medium tracking-normal mt-0.5 leading-relaxed",
          actionButton: "bg-gradient-to-r from-orange-600 to-amber-500 text-white font-orbitron text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-md hover:brightness-110",
          cancelButton: "bg-white/10 text-stone-300 font-orbitron text-[11px] font-medium px-3 py-1.5 rounded-lg hover:bg-white/15",
          closeButton: "border-white/20 bg-black/40 text-stone-400 hover:text-white hover:bg-black/70",
          success: "border-emerald-500/40 hover:border-emerald-500/70 shadow-[0_0_24px_rgba(16,185,129,0.25)]",
          error: "border-rose-500/50 hover:border-rose-500/80 shadow-[0_0_24px_rgba(244,63,94,0.3)]",
          warning: "border-amber-500/40 hover:border-amber-500/70 shadow-[0_0_24px_rgba(245,158,11,0.25)]",
          info: "border-cyan-500/40 hover:border-cyan-500/70 shadow-[0_0_24px_rgba(6,182,212,0.25)]",
        },
      }}
      icons={{
        success: (
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/15 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
            <CheckCircle2 size={18} className="stroke-[2.5]" />
            <span className="absolute -bottom-1 -right-1 rounded bg-emerald-500/80 px-1 py-0.2 text-[8px] font-black text-black">
              成
            </span>
          </div>
        ),
        error: (
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-rose-500/40 bg-rose-500/15 text-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.35)]">
            <XCircle size={18} className="stroke-[2.5]" />
            <span className="absolute -bottom-1 -right-1 rounded bg-rose-500/80 px-1 py-0.2 text-[8px] font-black text-black">
              滅
            </span>
          </div>
        ),
        warning: (
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-amber-500/40 bg-amber-500/15 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.3)]">
            <AlertTriangle size={18} className="stroke-[2.5]" />
            <span className="absolute -bottom-1 -right-1 rounded bg-amber-500/80 px-1 py-0.2 text-[8px] font-black text-black">
              警
            </span>
          </div>
        ),
        info: (
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-500/15 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
            <Info size={18} className="stroke-[2.5]" />
            <span className="absolute -bottom-1 -right-1 rounded bg-cyan-500/80 px-1 py-0.2 text-[8px] font-black text-black">
              知
            </span>
          </div>
        ),
        loading: (
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-orange-500/40 bg-orange-500/15 text-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.3)]">
            <Loader2 size={18} className="animate-spin stroke-[2.5]" />
            <span className="absolute -bottom-1 -right-1 rounded bg-orange-500/80 px-1 py-0.2 text-[8px] font-black text-black">
              動
            </span>
          </div>
        ),
      }}
    />
  );
}

