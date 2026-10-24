"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

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
    href === "/admin"
      ? pathname === "/admin"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={clsx(
        "group relative flex items-center gap-3.5 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300 font-rajdhani tracking-wide overflow-hidden",
        active
          ? "text-white bg-white/[0.08] backdrop-blur-xl border border-orange-500/40 shadow-[0_8px_25px_rgba(234,88,12,0.18),inset_0_1px_1px_rgba(255,255,255,0.25)]"
          : "text-stone-400 border border-transparent hover:border-white/[0.14] hover:bg-white/[0.04] hover:text-stone-100 hover:backdrop-blur-lg"
      )}
    >
      {/* Floating diffuse glow dot on active */}
      {active && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.9)] animate-pulse" />
      )}

      <Icon
        size={19}
        className={clsx(
          "transition-colors duration-200 shrink-0",
          active ? "text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]" : "text-stone-500 group-hover:text-orange-400"
        )}
      />
      <span className="truncate text-[15px] font-bold">{label}</span>
    </Link>
  );
}
