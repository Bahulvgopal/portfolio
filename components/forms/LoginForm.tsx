"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  ShieldAlert,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

import { loginSchema } from "@/validations/auth";
import type { LoginDTO } from "@/types/auth";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const reveal = (delay = 0, y = 20) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: EASE, delay },
});

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginDTO>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginDTO) {
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMsg = result.message || "Invalid administrative credentials";
        setError(errorMsg);
        toast.error("AUTHENTICATION FAILED", {
          description: errorMsg,
          className: "!bg-stone-950/95 !border-red-500/40 !text-white",
        });
        return;
      }

      setLoginSuccess(true);
      toast.success("AUTHORIZATION GRANTED", {
        description: "Welcome to Vector Command Center, Administrator.",
        className: "!bg-stone-950/95 !border-emerald-500/40 !text-white",
      });

      setTimeout(() => {
        router.push("/admin");
      }, 400);
    } catch {
      const networkError = "Network error encountered during authentication handshake.";
      setError(networkError);
      toast.error("CONNECTION ERROR", {
        description: networkError,
      });
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#070a13] px-5 sm:px-8 py-12 select-none">
      {/* Noise Grain Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
        style={{ backgroundImage: GRAIN_URL, backgroundRepeat: "repeat", backgroundSize: "128px" }}
      />

      {/* Atmospheric Ambient Glow Orbs */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-orange-600/20 blur-[150px]"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-rose-600/15 blur-[160px]"
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Glowing Gradient Accent Behind Card */}
        <div
          aria-hidden
          className="
            pointer-events-none absolute -top-5 -left-5 w-40 h-40 sm:w-48 sm:h-48
            rounded-[36px] bg-gradient-to-br from-[#FF5E3A] via-[#FF3D00] to-[#FF2A54]
            opacity-90 blur-[2px]
            shadow-[0_12px_45px_rgba(255,61,0,0.55)]
            z-0
          "
        />

        {/* The Frosted Glass Card Face */}
        <motion.div
          {...reveal(0.05, 30)}
          className="
            relative z-10 overflow-hidden
            rounded-[36px] sm:rounded-[42px]
            border border-white/20
            bg-slate-950/50 backdrop-blur-3xl
            p-8 sm:p-10
            shadow-[0_25px_65px_rgba(0,0,0,0.75),inset_0_1.5px_2px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.5)]
          "
        >
          {/* Top Katana Radiant Energy Blade Accent */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-amber-400 to-rose-600 z-30 shadow-[0_0_12px_rgba(234,88,12,0.8)]" />

          {/* Header Badges */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="font-orbitron text-[10px] font-extrabold text-orange-400 tracking-[0.2em] uppercase">
                SECURITY PROTOCOL // 「管理者認証」
              </span>
            </div>

            {/* Glowing Gradient Badge Pill */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-[#FF5E3A] via-[#FF3D00] to-[#FF2A54] text-white font-orbitron text-[11px] font-black uppercase tracking-widest shadow-[0_4px_18px_rgba(255,42,84,0.45)] border border-white/20 mb-3">
              <KeyRound size={12} />
              <span>TERMINAL ACCESS</span>
            </div>

            <h1 className="font-manga text-3xl sm:text-4xl font-black text-white uppercase tracking-wider leading-none">
              ADMIN LOGIN
            </h1>

            <p className="font-rajdhani text-sm font-semibold text-stone-300 mt-2">
              Authenticate credentials to access portfolio telemetry & content controls
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* EMAIL FIELD */}
            <motion.div {...reveal(0.12)}>
              <label className="mb-2 flex items-center justify-between font-rajdhani text-sm font-bold text-stone-200">
                <span>ADMIN EMAIL</span>
                <span className="font-mono text-[10px] text-stone-400 uppercase">IDENTIFIER</span>
              </label>

              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-orange-400"
                  size={17}
                />
                <input
                  type="email"
                  {...register("email")}
                  placeholder="admin@example.com"
                  autoComplete="email"
                  className="w-full rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-stone-500 outline-none transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] hover:border-white/25 hover:bg-white/[0.06] focus:border-orange-500 focus:bg-white/[0.08] focus:ring-2 focus:ring-orange-500/25"
                />
              </div>

              {errors.email && (
                <p className="mt-1.5 font-rajdhani text-xs font-bold text-rose-400 flex items-center gap-1">
                  <span>⚠</span> {errors.email.message}
                </p>
              )}
            </motion.div>

            {/* PASSWORD FIELD WITH SHOW / HIDE TOGGLE */}
            <motion.div {...reveal(0.18)}>
              <label className="mb-2 flex items-center justify-between font-rajdhani text-sm font-bold text-stone-200">
                <span>SECRET PASSCODE</span>
                <span className="font-mono text-[10px] text-stone-400 uppercase">ENCRYPTED</span>
              </label>

              <div className="relative">
                <Lock
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-orange-400"
                  size={17}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-xl py-3.5 pl-11 pr-12 text-sm text-white placeholder:text-stone-500 outline-none transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] hover:border-white/25 hover:bg-white/[0.06] focus:border-orange-500 focus:bg-white/[0.08] focus:ring-2 focus:ring-orange-500/25"
                />

                {/* SHOW / HIDE PASSWORD BUTTON */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  title={showPassword ? "Hide password" : "Show password"}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-orange-400" />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1.5 font-rajdhani text-xs font-bold text-rose-400 flex items-center gap-1">
                  <span>⚠</span> {errors.password.message}
                </p>
              )}
            </motion.div>

            {/* REDESIGNED ANIME WARNING / ERROR PROMPT */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.95 }}
                  className="rounded-2xl border border-rose-500/40 bg-gradient-to-r from-rose-950/60 via-red-950/40 to-rose-950/60 backdrop-blur-xl p-3.5 shadow-lg shadow-rose-950/50 flex items-start gap-3"
                >
                  <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-orbitron text-[10px] font-black text-rose-300 tracking-wider uppercase block">
                      // ACCESS DENIED // 認証失敗
                    </span>
                    <p className="font-rajdhani text-xs font-semibold text-rose-200 mt-0.5 leading-relaxed">
                      {error}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SUBMIT BUTTON */}
            <motion.button
              {...reveal(0.24)}
              type="submit"
              disabled={isSubmitting || loginSuccess}
              className="
                group relative flex w-full items-center justify-center gap-2.5
                rounded-2xl border border-white/25
                bg-gradient-to-r from-orange-600 via-amber-500 to-rose-600
                py-4
                font-orbitron text-xs font-black uppercase tracking-wider text-white
                shadow-[0_4px_24px_rgba(249,115,22,0.45)]
                transition-all duration-300
                hover:shadow-[0_8px_32px_rgba(249,115,22,0.65)] hover:scale-[1.02]
                disabled:opacity-50 disabled:cursor-not-allowed
                mt-3
              "
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  <span>AUTHENTICATING PROTOCOL...</span>
                </>
              ) : loginSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>ACCESS AUTHORIZED</span>
                </>
              ) : (
                <>
                  <span>INITIALIZE SESSION // ログイン</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </motion.button>
          </form>

          {/* FOOTER: RETURN TO HOMEPAGE LINK */}
          <div className="mt-8 pt-5 border-t border-white/10 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-orbitron text-[11px] font-bold text-stone-400 hover:text-orange-400 transition-colors uppercase tracking-wider"
            >
              <ArrowLeft size={13} />
              <span>RETURN TO MAIN PORTFOLIO // 「帰還」</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
