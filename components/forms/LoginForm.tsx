"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2 } from "lucide-react";

import { loginSchema } from "@/validations/auth";
import type { LoginDTO } from "@/types/auth";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const reveal = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
});

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default function LoginForm() {
  const router = useRouter();

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginDTO>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginDTO) {
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.message);
      return;
    }

    router.push("/admin");
    // router.refresh();
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0b] px-5 sm:px-8">
      {/* grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
        style={{ backgroundImage: GRAIN_URL, backgroundRepeat: "repeat", backgroundSize: "128px" }}
      />

      {/* blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-blue-600/[0.08] blur-[160px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 w-[380px] h-[380px] rounded-full bg-violet-600/[0.06] blur-[140px]" />

      {/* top rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
        style={{ transformOrigin: "left" }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <motion.div
        {...reveal(0.05, 32)}
        className="relative z-10 w-full max-w-md rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-8 sm:p-10 shadow-[0_0_60px_rgba(0,0,0,0.4)]"
      >
        <motion.h1
          {...reveal(0.12)}
          className="mb-2 text-center text-[clamp(1.8rem,5vw,2.5rem)] font-black tracking-tight text-white"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          Admin{" "}
          <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Login
          </span>
        </motion.h1>

        <motion.p {...reveal(0.16)} className="mb-8 text-center text-sm text-neutral-400">
          Sign in to access your dashboard
        </motion.p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <motion.div {...reveal(0.2)}>
            <label className="mb-2 block text-sm font-medium text-neutral-300">
              Email
            </label>

            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" size={17} />
              <input
                type="email"
                {...register("email")}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-white placeholder:text-neutral-600 outline-none transition-all duration-200 focus:border-sky-500/40 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(56,189,248,0.08)]"
              />
            </div>

            {errors.email && (
              <p className="mt-1.5 text-xs text-rose-400">
                {errors.email.message}
              </p>
            )}
          </motion.div>

          <motion.div {...reveal(0.26)}>
            <label className="mb-2 block text-sm font-medium text-neutral-300">
              Password
            </label>

            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" size={17} />
              <input
                type="password"
                {...register("password")}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-white placeholder:text-neutral-600 outline-none transition-all duration-200 focus:border-sky-500/40 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(56,189,248,0.08)]"
              />
            </div>

            {errors.password && (
              <p className="mt-1.5 text-xs text-rose-400">
                {errors.password.message}
              </p>
            )}
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-rose-500/20 bg-rose-500/[0.06] px-3 py-2 text-sm text-rose-400"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            {...reveal(0.32)}
            type="submit"
            disabled={isSubmitting}
            className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 text-sm font-semibold text-neutral-900 shadow-[0_0_32px_rgba(255,255,255,0.08)] transition-all duration-200 hover:bg-neutral-100 hover:shadow-[0_0_48px_rgba(255,255,255,0.14)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Signing In...
              </>
            ) : (
              <>
                Login
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}