"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  GraduationCap,
  Briefcase,
  Award,
  Wrench,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import SidebarItem from "./SidebarItem";
import { useRouter } from "next/navigation";

const menu = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
  },
  {
    label: "Education",
    href: "/admin/education",
    icon: GraduationCap,
  },
  {
    label: "Experience",
    href: "/admin/experience",
    icon: Briefcase,
  },
  {
    label: "Certificates",
    href: "/admin/certificates",
    icon: Award,
  },
  {
    label: "Skills",
    href: "/admin/skills",
    icon: Wrench,
  },
  {
    label: "Profile",
    href: "/admin/profile",
    icon: User,
  },
  // {
  //   label: "Settings",
  //   href: "/admin/settings",
  //   icon: Settings,
  // },
];

export default function Sidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    router.replace("/login");
    router.refresh();
  }

  const SidebarContent = (
    <>
      <h1
        className="mb-8 text-xl sm:text-2xl font-normal text-white"
        style={{ fontFamily: "'Georgia','Times New Roman',serif" }}
      >
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

      <nav className="space-y-1.5 sm:space-y-2" onClick={() => setIsOpen(false)}>
        {menu.map((item) => (
          <SidebarItem key={item.href} {...item} />
        ))}
      </nav>

      <div className="mt-10 border-t border-white/10 pt-6">
        <button
          onClick={handleLogout}
          className="
            flex w-full items-center gap-3
            rounded-xl px-4 py-3
            text-neutral-300
            transition-all duration-300
            hover:bg-white/[0.04]
            hover:text-white
            hover:border-white/10
            border border-transparent
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
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-[#0a0a0b] px-4 py-4 lg:hidden">
        <h1
          className="text-lg font-normal text-white"
          style={{ fontFamily: "'Georgia','Times New Roman',serif" }}
        >
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

        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          className="
            flex h-10 w-10 items-center justify-center
            rounded-xl border border-white/10 bg-white/[0.03]
            text-neutral-300
            transition-colors duration-200
            hover:border-white/20 hover:text-white
          "
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 border-r border-white/10 bg-[#0a0a0b] p-6">
        {SidebarContent}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* drawer panel */}
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