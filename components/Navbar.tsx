"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Users,
  Phone,
  Globe,
  Award,
  FileText,
  Briefcase,
  GraduationCap,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Don't render inside admin or login
  if (pathname.startsWith("/admin") || pathname === "/login") {
    return null;
  }

  // Navbar dock buttons: Home, About, Projects, Certificates (Contact removed from dock)
  const navButtons = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      href: "/",
      isActive: pathname === "/",
    },
    {
      id: "about",
      label: "About",
      icon: Users,
      href: "/about",
      isActive: pathname.startsWith("/about"),
    },
    {
      id: "projects",
      label: "Projects",
      icon: Globe,
      href: "/projects",
      isActive: pathname.startsWith("/projects"),
    },
    {
      id: "certificates",
      label: "Certificates",
      icon: Award,
      href: "/certificates",
      isActive: pathname.startsWith("/certificates"),
    },
  ];

  const menuTiles = [
    {
      href: "/",
      label: "Home",
      subtitle: "Landing page",
      icon: Home,
      iconColor: "text-sky-400",
      badgeBg: "bg-sky-500/15 border-sky-400/25",
      isActive: pathname === "/",
    },
    {
      href: "/about",
      label: "About",
      subtitle: "Bio & values",
      icon: Users,
      iconColor: "text-emerald-400",
      badgeBg: "bg-emerald-500/15 border-emerald-400/25",
      isActive: pathname.startsWith("/about"),
    },
    {
      href: "/projects",
      label: "Projects",
      subtitle: "Full portfolio",
      icon: Globe,
      iconColor: "text-indigo-400",
      badgeBg: "bg-indigo-500/15 border-indigo-400/25",
      isActive: pathname.startsWith("/projects"),
    },
    {
      href: "/experience",
      label: "Experience",
      subtitle: "Work history",
      icon: Briefcase,
      iconColor: "text-amber-400",
      badgeBg: "bg-amber-500/15 border-amber-400/25",
      isActive: pathname.startsWith("/experience"),
    },
    {
      href: "/education",
      label: "Education",
      subtitle: "Degrees & study",
      icon: GraduationCap,
      iconColor: "text-violet-400",
      badgeBg: "bg-violet-500/15 border-violet-400/25",
      isActive: pathname.startsWith("/education"),
    },
    {
      href: "/certificates",
      label: "Certificates",
      subtitle: "Credentials",
      icon: Award,
      iconColor: "text-rose-400",
      badgeBg: "bg-rose-500/15 border-rose-400/25",
      isActive: pathname.startsWith("/certificates"),
    },
  ];

  // Glass Menu Card Content
  const renderMenuCard = () => (
    <div className="relative select-none">
      {/* Top ambient glow ray */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-24 bg-gradient-to-b from-orange-400/20 via-amber-500/10 to-transparent blur-2xl pointer-events-none" />

      {/* 6 Glass Tiles */}
      <div className="relative z-10 grid grid-cols-2 gap-2 sm:gap-2.5">
        {menuTiles.map((tile) => {
          const Icon = tile.icon;
          return (
            <Link
              key={tile.label}
              href={tile.href}
              prefetch={true}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-2xl border backdrop-blur-xl transition-all duration-200 group relative overflow-hidden ${
                tile.isActive
                  ? "bg-orange-50/90 border-orange-500/50 shadow-sm"
                  : "bg-white/50 hover:bg-orange-50/60 border-stone-200/60 hover:border-orange-500/30 shadow-xs hover:scale-[1.02]"
              }`}
            >
              {/* Icon container */}
              <div
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border transition-all duration-200 group-hover:scale-105 shrink-0"
              >
                <div
                  className={`w-full h-full rounded-xl flex items-center justify-center ${
                    tile.isActive
                      ? "bg-orange-500 text-white"
                      : "bg-orange-500/10 text-orange-600 border border-orange-500/20"
                  }`}
                >
                  <Icon size={17} />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-semibold tracking-tight text-stone-900 group-hover:text-orange-600 truncate">
                  {tile.label}
                </p>
                <p className="text-[10px] text-stone-500 group-hover:text-stone-700 truncate">
                  {tile.subtitle}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Action buttons (Contact & Resume) */}
      <div className="relative z-10 mt-3 sm:mt-3.5 pt-3 border-t border-stone-200/60 flex items-center justify-between gap-2.5">
        <Link
          href="/contact"
          prefetch={true}
          onClick={() => setIsMenuOpen(false)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-stone-100/90 hover:bg-orange-50/90 border border-stone-200/80 hover:border-orange-500/30 backdrop-blur-xl text-[11px] font-semibold uppercase tracking-wider text-stone-800 hover:text-orange-600 transition-all shadow-xs active:scale-[0.98]"
        >
          <Phone size={13} className="text-orange-600" />
          <span>Contact</span>
        </Link>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 border border-white/30 backdrop-blur-xl text-[11px] font-semibold uppercase tracking-wider text-white shadow-[0_6px_18px_rgba(234,88,12,0.3)] hover:shadow-[0_8px_24px_rgba(234,88,12,0.45)] transition-all active:scale-[0.98]"
        >
          <FileText size={13} />
          <span>Resume (PDF)</span>
        </a>
      </div>
    </div>
  );

  // Animated Hamburger-to-X Icon Component
  const renderMorphingIcon = () => (
    <div className="relative w-4.5 h-4.5 flex items-center justify-center">
      {/* Top line -> rotates 45 deg */}
      <motion.span
        initial={false}
        animate={
          isMenuOpen
            ? { rotate: 45, y: 0 }
            : { rotate: 0, y: -5.5 }
        }
        transition={{ type: "spring", stiffness: 450, damping: 28 }}
        className={`absolute w-4 h-[2px] rounded-full transition-colors duration-200 ${
          isMenuOpen ? "bg-white shadow-[0_0_6px_rgba(255,255,255,0.7)]" : "bg-stone-800"
        }`}
      />
      {/* Middle line -> fades & scales out */}
      <motion.span
        initial={false}
        animate={
          isMenuOpen
            ? { opacity: 0, scaleX: 0 }
            : { opacity: 1, scaleX: 1 }
        }
        transition={{ duration: 0.16 }}
        className={`absolute w-4 h-[2px] rounded-full transition-colors duration-200 ${
          isMenuOpen ? "bg-white shadow-[0_0_6px_rgba(255,255,255,0.7)]" : "bg-stone-800"
        }`}
      />
      {/* Bottom line -> rotates -45 deg */}
      <motion.span
        initial={false}
        animate={
          isMenuOpen
            ? { rotate: -45, y: 0 }
            : { rotate: 0, y: 5.5 }
        }
        transition={{ type: "spring", stiffness: 450, damping: 28 }}
        className={`absolute w-4 h-[2px] rounded-full transition-colors duration-200 ${
          isMenuOpen ? "bg-white shadow-[0_0_6px_rgba(255,255,255,0.7)]" : "bg-stone-800"
        }`}
      />
    </div>
  );

  return (
    <>
      {/* ── 1. MINIMAL TOP-LEFT BRAND BADGE (Crystal Glassmorphism) ─── */}
      <div className="fixed top-4 left-4 sm:left-6 z-40 pointer-events-auto select-none">
        <Link
          href="/"
          prefetch={true}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/75 backdrop-blur-xl border border-white/85 hover:border-orange-500/40 transition-all duration-200 group shadow-[0_8px_24px_rgba(234,88,12,0.1),0_2px_6px_rgba(0,0,0,0.04),inset_0_1px_1.5px_rgba(255,255,255,0.9)] hover:scale-105 active:scale-95"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-500 via-amber-500 to-red-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            BG
          </div>
          <span className="text-stone-900 text-xs font-semibold tracking-tight hidden sm:inline-block">
            Bahul V Gopal
          </span>
        </Link>
      </div>

      {/* ── 2. FROSTED BACKDROP OVERLAY WHEN MENU IS OPEN ───────────── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 z-40 bg-stone-900/20 backdrop-blur-[2px] pointer-events-auto"
          />
        )}
      </AnimatePresence>

      {/* ── 3. UNIFIED BOTTOM NAVBAR DOCK (DESKTOP & MOBILE) ─────────── */}
      <div className="fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        {/* Navigation Menu Modal: Grows directly from the button at bottom right */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="menu-popover"
              initial={{ opacity: 0, scale: 0.1, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.1, y: 25 }}
              style={{
                transformOrigin: "calc(100% - 30px) calc(100% + 14px)",
              }}
              transition={{
                type: "spring",
                stiffness: 440,
                damping: 30,
                mass: 0.8,
              }}
              className="absolute bottom-[66px] sm:bottom-[72px] right-[-14px] sm:right-0 w-[calc(100vw-2rem)] max-w-[340px] sm:max-w-[450px] pointer-events-auto rounded-[26px] sm:rounded-[28px] bg-white/85 backdrop-blur-3xl border border-white/85 p-4 sm:p-5 shadow-[0_25px_60px_rgba(234,88,12,0.12),0_10px_30px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] text-stone-900 overflow-hidden"
            >
              {renderMenuCard()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Dock */}
        <nav
          aria-label="Navigation Dock"
          className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full bg-white/75 backdrop-blur-2xl border border-white/85 shadow-[0_20px_50px_rgba(234,88,12,0.12),0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] select-none"
        >
          {navButtons.map((btn) => {
            const Icon = btn.icon;
            return (
              <div
                key={btn.id}
                className="relative flex items-center justify-center"
                onMouseEnter={() => setHoveredItem(btn.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Sliding glass bubble around active icon */}
                {btn.isActive && (
                  <motion.div
                    layoutId="navbar-active-bubble"
                    className="absolute inset-0 rounded-full pointer-events-none"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 32,
                    }}
                    style={{
                      background:
                        "linear-gradient(135deg, #EA580C 0%, #C2410C 100%)",
                      boxShadow:
                        "0 6px 18px rgba(234, 88, 12, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.55)",
                      border: "1.2px solid rgba(255, 255, 255, 0.6)",
                    }}
                  >
                    <span className="absolute inset-1 rounded-full bg-white/20 blur-[2px] pointer-events-none" />
                  </motion.div>
                )}

                {/* Inactive item hover ghost sheen */}
                {!btn.isActive && hoveredItem === btn.id && (
                  <motion.div
                    layoutId="hover-sheen"
                    className="absolute inset-0 rounded-full bg-orange-500/10 border border-orange-500/20 pointer-events-none"
                    transition={{ duration: 0.15 }}
                  />
                )}

                <Link
                  href={btn.href}
                  prefetch={true}
                  aria-label={btn.label}
                  className={`relative z-10 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full transition-all duration-200 cursor-pointer ${
                    btn.isActive
                      ? "text-white filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)] scale-105"
                      : "text-stone-600 hover:text-orange-600 hover:scale-105"
                  }`}
                >
                  <Icon size={19} className="sm:w-5 sm:h-5" />
                </Link>

                {/* Desktop Tooltip */}
                <AnimatePresence>
                  {hoveredItem === btn.id && (
                    <motion.span
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: -2 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="hidden sm:inline-block absolute -top-9 px-2.5 py-0.5 rounded-full bg-stone-900/90 text-[11px] font-semibold text-white border border-stone-700/50 shadow-lg pointer-events-none whitespace-nowrap backdrop-blur-md"
                    >
                      {btn.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* 5. Transformed Button: 3-Lines to X Morphing Icon */}
          <div
            className="relative flex items-center justify-center pl-1"
            onMouseEnter={() => setHoveredItem("menu")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="relative z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 group"
              style={{
                background: isMenuOpen
                  ? "linear-gradient(135deg, #EA580C 0%, #C2410C 100%)"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 245, 244, 0.7) 100%)",
                boxShadow: isMenuOpen
                  ? "0 6px 20px rgba(234, 88, 12, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.5)"
                  : "0 4px 14px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.95)",
                border: isMenuOpen
                  ? "1.4px solid rgba(255, 255, 255, 0.6)"
                  : "1.2px solid rgba(255, 255, 255, 0.9)",
              }}
            >
              {renderMorphingIcon()}
            </button>

            {/* Desktop Tooltip */}
            <AnimatePresence>
              {hoveredItem === "menu" && (
                <motion.span
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: -2 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="hidden sm:inline-block absolute -top-9 px-2.5 py-0.5 rounded-full bg-stone-900/90 text-[11px] font-semibold text-white border border-stone-700/50 shadow-lg pointer-events-none whitespace-nowrap backdrop-blur-md"
                >
                  {isMenuOpen ? "Close Menu" : "Menu (All Pages)"}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </div>
    </>
  );
}