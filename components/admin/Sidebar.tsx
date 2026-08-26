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

import SidebarItem from "./SidebarItem";
import { useRouter } from "next/navigation";

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

  const Logo = ({ size = "text-xl sm:text-2xl" }) => (
    <h1
      className={`${size} font-normal text-white flex items-center gap-2`}
      style={{ fontFamily: "'Georgia','Times New Roman',serif" }}
    >
      <span
        className="flex h-8 w-8 items-center justify-center rounded-lg"
        style={{
          background: "linear-gradient(135deg,#38bdf8,#818cf8)",
        }}
      >
        <Sparkles className="h-4 w-4 text-[#0a0a0b]" />
      </span>
      Portfolio{" "}
      <span
        style={{
          background: "linear-gradient(90deg,#38bdf8,#818cf8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        CMS
      </span>
    </h1>
  );

  const SidebarContent = (
    <>
      {/* Header */}
      <div className="mb-8">
        <Logo />

        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="
            mt-4 flex items-center gap-2
            rounded-xl border border-white/10 bg-white/[0.02]
            px-3 py-2.5
            text-sm text-neutral-400
            transition-all duration-300
            hover:border-sky-400/30 hover:bg-white/[0.05] hover:text-sky-400
            group
          "
        >
          <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          View Portfolio
        </Link>
      </div>

      {/* Nav */}
      <div className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-600">
        Menu
      </div>
      <nav
        className="space-y-1.5 sm:space-y-2"
        onClick={() => setIsOpen(false)}
      >
        {menu.map((item) => (
          <SidebarItem key={item.href} {...item} />
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-10 border-t border-white/10 pt-6">
        <button
          onClick={handleLogout}
          className="
            flex w-full items-center gap-3
            rounded-xl border border-transparent
            px-4 py-3
            text-neutral-300
            transition-all duration-300
            hover:border-red-500/20 hover:bg-red-500/[0.06] hover:text-red-400
          "
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-[#0a0a0b]/95 backdrop-blur-md px-4 py-4 lg:hidden">
        <Logo size="text-lg" />

        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          className="
            flex h-10 w-10 items-center justify-center
            rounded-xl border border-white/10 bg-white/[0.03]
            text-neutral-300
            transition-colors duration-200
            hover:border-sky-400/30 hover:text-white
          "
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside
        className="
          hidden lg:flex lg:flex-col
          w-72 shrink-0 h-screen sticky top-0
          border-r border-white/10 bg-[#0a0a0b]
          p-6
        "
        style={{
          boxShadow: "inset -1px 0 0 rgba(255,255,255,0.03)",
        }}
      >
        {SidebarContent}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="
                fixed inset-y-0 left-0 z-50
                w-[80vw] max-w-72
                overflow-y-auto
                border-r border-white/10
                bg-[#0a0a0b]
                p-6
                lg:hidden
              "
              style={{
                boxShadow: "20px 0 60px rgba(0,0,0,0.5)",
              }}
            >
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="
                  mb-6 flex h-9 w-9 items-center justify-center
                  rounded-xl border border-white/10 bg-white/[0.03]
                  text-neutral-300
                  transition-colors duration-200
                  hover:border-white/20 hover:text-white
                "
              >
                <X className="h-5 w-5" />
              </button>

              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}