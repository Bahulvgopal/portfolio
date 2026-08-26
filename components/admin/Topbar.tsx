"use client";

import { Bell } from "lucide-react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default function Topbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative flex h-16 sm:h-20 items-center justify-between overflow-hidden border-b border-white/[0.08] bg-[#0a0a0b] px-4 sm:px-6 lg:px-8"
    >
      {/* grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
        style={{ backgroundImage: GRAIN_URL, backgroundRepeat: "repeat", backgroundSize: "128px" }}
      />

      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/3 h-[220px] w-[220px] rounded-full bg-blue-600/[0.08] blur-[100px]"
      />

      {/* LEFT — title */}
      <div className="relative z-10 min-w-0">
        <h2
          className="truncate text-lg sm:text-xl font-black tracking-tight text-white"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          Dashboard
        </h2>
        <p className="hidden sm:block text-xs sm:text-sm text-neutral-400 truncate">
          Welcome back, Bahul 👋
        </p>
      </div>

      {/* RIGHT — actions */}
      <div className="relative z-10 flex items-center gap-2 sm:gap-4 lg:gap-5">
        {/* notification button */}
        {/* <button
          aria-label="Notifications"
          className="relative rounded-xl p-2 text-neutral-400 border border-transparent transition-all duration-200 hover:border-white/[0.08] hover:bg-white/[0.03] hover:text-sky-400"
        >
          <Bell size={19} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-gradient-to-br from-rose-400 to-red-500 ring-2 ring-[#0a0a0b]" />
        </button> */}

        {/* divider — hidden on mobile */}
        <div className="hidden sm:block h-8 w-px bg-white/[0.08]" />

        {/* profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500 font-black text-white shadow-[0_0_20px_rgba(56,189,248,0.25)]">
            B
          </div>

          {/* name/role — hidden below md, shown from md up */}
          <div className="hidden md:flex flex-col leading-tight">
            <p className="text-sm font-semibold text-white truncate max-w-[140px] lg:max-w-none">
              Bahul V Gopal
            </p>
            <span className="inline-flex w-fit items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium tracking-wider text-sky-400 font-mono uppercase">
              Administrator
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}