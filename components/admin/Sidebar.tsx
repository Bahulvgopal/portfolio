"use client";

import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  GraduationCap,
  Briefcase,
  Award,
  Wrench,
  User,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import SidebarItem from "./SidebarItem";

const menu = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Education", href: "/admin/education", icon: GraduationCap },
  { label: "Experience", href: "/admin/experience", icon: Briefcase },
  { label: "Certificates", href: "/admin/certificates", icon: Award },
  { label: "Skills", href: "/admin/skills", icon: Wrench },
  { label: "Profile", href: "/admin/profile", icon: User },
];

export default function Sidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  const Logo = ({ size = "text-lg sm:text-xl" }) => (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5">
        <span className="font-orbitron text-[9px] font-bold text-orange-400 tracking-widest uppercase">
          · VECTOR CONTROL ·
        </span>
      </div>

      <div className={`font-orbitron font-extrabold text-white flex items-center gap-2.5 ${size}`}>
        <span className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-rose-600 shadow-[0_4px_16px_rgba(249,115,22,0.45)] border border-white/25">
          <Sparkles className="h-4 w-4 text-white" />
        </span>

        <span className="tracking-wide">PORTFOLIO</span>

        <span className="bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 text-white font-black text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-md shadow-[0_2px_10px_rgba(249,115,22,0.4)]">
          CMS
        </span>
      </div>
    </div>
  );

  const SidebarContent = (
    <div className="flex flex-col h-full justify-between">
      <div>
        {/* Header */}
        <div className="mb-6 pb-6 border-b border-white/[0.08]">
          <Logo />

          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="
              mt-5 flex items-center justify-between
              rounded-2xl border border-white/12 bg-white/[0.03] backdrop-blur-xl
              px-3.5 py-2.5
              text-xs font-rajdhani font-bold tracking-wider uppercase text-stone-300
              transition-all duration-300
              hover:border-orange-500/40 hover:bg-white/[0.07] hover:text-orange-400
              shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]
              group
            "
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Site
            </span>
            <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-stone-400 group-hover:text-orange-400" />
          </Link>
        </div>

        {/* Section Label */}
        <div className="mb-3 px-3 flex items-center justify-between text-[10px] font-orbitron font-bold uppercase tracking-widest text-stone-500">
          <span>NAVIGATION</span>
          <span className="text-orange-500 font-mono">· · ·</span>
        </div>

        {/* Navigation Items */}
        <nav
          className="space-y-1.5"
          onClick={() => setIsOpen(false)}
        >
          {menu.map((item) => (
            <SidebarItem key={item.href} {...item} />
          ))}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="pt-6 border-t border-white/[0.08] mt-6">
        <button
          onClick={handleLogout}
          className="
            flex w-full items-center justify-between
            rounded-2xl border border-rose-500/20 bg-rose-500/[0.05] backdrop-blur-xl
            px-4 py-3
            text-sm font-rajdhani font-bold text-rose-300
            transition-all duration-300
            hover:border-rose-500/40 hover:bg-rose-500/[0.12] hover:text-rose-200
            shadow-[inset_0_1px_1px_rgba(244,63,94,0.15)]
            group
          "
        >
          <span className="flex items-center gap-3">
            <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            <span>DISCONNECT SESSION</span>
          </span>
          <span className="text-[10px] font-orbitron text-rose-400 font-mono">
            EXIT
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-[#070b14]/85 backdrop-blur-2xl px-4 py-3.5 lg:hidden">
        <Logo size="text-base" />

        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open navigation menu"
          className="
            flex h-10 w-10 items-center justify-center
            rounded-xl border border-white/15 bg-white/[0.04] backdrop-blur-xl
            text-stone-200
            transition-colors duration-200
            hover:border-orange-500/50 hover:text-white
          "
        >
          <Menu className="h-5 w-5 text-orange-400" />
        </button>
      </div>

      {/* Desktop Sidebar (Fixed Glass Column) */}
      <aside
        className="
          hidden lg:flex lg:flex-col
          w-72 h-screen fixed inset-y-0 left-0
          border-r border-white/10 bg-[#070b14]/75 backdrop-blur-3xl
          p-6 z-40 overflow-y-auto no-scrollbar
          shadow-[20px_0_60px_rgba(0,0,0,0.5),inset_-1px_0_0_rgba(255,255,255,0.06)]
        "
      >
        {SidebarContent}
      </aside>

      {/* Mobile Drawer (Glass Sheet) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md lg:hidden"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="
                fixed inset-y-0 left-0 z-50
                w-[82vw] max-w-72
                overflow-y-auto
                border-r border-white/15
                bg-[#070b14]/90 backdrop-blur-3xl
                p-6
                lg:hidden
                shadow-[25px_0_70px_rgba(0,0,0,0.7)]
              "
            >
              <div className="flex items-center justify-end mb-4">
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="
                    flex h-9 w-9 items-center justify-center
                    rounded-xl border border-white/15 bg-white/[0.04]
                    text-stone-300
                    hover:border-white/30 hover:text-white
                  "
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
