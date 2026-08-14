"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface SidebarItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

export default function SidebarItem({
  href,
  icon: Icon,
  label,
}: SidebarItemProps) {
  const pathname = usePathname();

  const active =
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={clsx(
        "group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
        active
          ? "text-white bg-gradient-to-r from-sky-500/15 via-blue-500/10 to-transparent border border-sky-500/20 shadow-[0_0_20px_rgba(56,189,248,0.08)]"
          : "text-neutral-400 border border-transparent hover:border-white/[0.08] hover:bg-white/[0.03] hover:text-white"
      )}
    >
      {/* active indicator bar */}
      {active && (
        <motion.span
          layoutId="sidebar-active-bar"
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-full bg-gradient-to-b from-sky-400 to-indigo-400"
        />
      )}

      <Icon
        size={19}
        className={clsx(
          "transition-colors duration-200 shrink-0",
          active ? "text-sky-400" : "text-neutral-500 group-hover:text-sky-400"
        )}
      />
      <span className="truncate">{label}</span>
    </Link>
  );
}