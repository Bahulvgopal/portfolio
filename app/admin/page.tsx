import Link from "next/link";
import {
  FolderKanban,
  Award,
  GraduationCap,
  Briefcase,
  Wrench,
  Plus,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import StatCard from "@/components/admin/StatCard";
import { getDashboardStats } from "@/lib/api/dashboard";
import { auth } from "@/lib/auth/auth";

export default async function DashboardPage() {
  const { isAuthenticated, admin } = await auth();

  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      {/* 1. Header Hero Card with Glassmorphism */}
      <div className="relative overflow-hidden rounded-[32px] border border-white/20 bg-slate-950/40 backdrop-blur-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.25)]">
        {/* Glow Accent Blob */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-gradient-to-br from-orange-500/25 via-rose-500/20 to-transparent blur-3xl"
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-orbitron text-[10px] font-bold text-orange-400 tracking-widest uppercase">
                // SYSTEM OVERVIEW // 「統制室」
              </span>
              <span className="text-stone-500 font-mono text-xs">· · ·</span>
            </div>

            <h1 className="font-orbitron text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-wide uppercase">
              STUDIO{" "}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-rose-400 bg-clip-text text-transparent">
                DASHBOARD
              </span>
            </h1>

            <p className="mt-2 font-rajdhani text-sm sm:text-base font-semibold text-stone-300 max-w-xl">
              Real-time telemetry and management portal for projects, certifications, engineering work, and system configurations.
            </p>
          </div>

          {/* Quick Action Button */}
          <Link
            href="/admin/projects/new"
            className="
              inline-flex items-center gap-2.5 rounded-2xl
              bg-gradient-to-r from-orange-600 via-amber-500 to-rose-600
              px-6 py-3.5
              font-orbitron text-xs font-black uppercase tracking-wider text-white
              shadow-[0_4px_24px_rgba(249,115,22,0.45)]
              hover:shadow-[0_8px_32px_rgba(249,115,22,0.65)]
              transition-all duration-300 hover:scale-[1.02]
              border border-white/25 shrink-0 self-start md:self-auto
            "
          >
            <Plus className="w-4 h-4" />
            <span>DEPLOY MISSION</span>
          </Link>
        </div>
      </div>

      {/* 2. Glassmorphism Stats Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-5 px-1">
          <span className="font-orbitron text-[11px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
            LIVE TELEMETRY PODS
          </span>
          <span className="text-xs font-mono text-orange-400 font-bold">5 MODULES ACTIVE</span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-2">
          <StatCard
            title="Projects"
            value={stats.projects}
            icon={FolderKanban}
            accentGradient="from-[#FF5E3A] to-[#FF2A54]"
            badgeLabel="PROJECTS"
          />

          <StatCard
            title="Certificates"
            value={stats.certificates}
            icon={Award}
            accentGradient="from-[#FF8C00] to-[#EA580C]"
            badgeLabel="CREDENTIALS"
          />

          <StatCard
            title="Experience"
            value={stats.experience}
            icon={Briefcase}
            accentGradient="from-[#FF4B2B] to-[#FF416C]"
            badgeLabel="EXP LORE"
          />

          <StatCard
            title="Education"
            value={stats.education}
            icon={GraduationCap}
            accentGradient="from-[#F59E0B] to-[#D97706]"
            badgeLabel="ACADEMIC"
          />

          <StatCard
            title="Skills"
            value={stats.skills}
            icon={Wrench}
            accentGradient="from-[#FB7185] to-[#E11D48]"
            badgeLabel="ARSENAL"
          />
        </div>
      </div>

      {/* 3. Quick Navigation Glass Dock */}
      <div className="rounded-[30px] border border-white/15 bg-white/[0.03] backdrop-blur-2xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)]">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-orbitron text-sm sm:text-base font-bold text-white uppercase tracking-wider">
              COMMAND SHORTCUTS // 「操作」
            </h3>
            <p className="font-rajdhani text-xs sm:text-sm text-stone-400 font-medium">
              Direct access links to populate, update, or configure modules.
            </p>
          </div>
          <Sparkles className="w-5 h-5 text-orange-400" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {[
            { label: "New Project", href: "/admin/projects/new" },
            { label: "Add Certificate", href: "/admin/certificates/new" },
            { label: "Add Experience", href: "/admin/experience/new" },
            { label: "Add Education", href: "/admin/education/new" },
            { label: "New Skill", href: "/admin/skills/new" },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="
                group flex items-center justify-between
                rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl
                p-3.5 sm:p-4
                font-rajdhani text-sm font-bold text-stone-200
                transition-all duration-300
                hover:border-orange-500/40 hover:bg-white/[0.07] hover:text-orange-300
                hover:scale-[1.02] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]
              "
            >
              <span>{action.label}</span>
              <ArrowUpRight className="w-4 h-4 text-stone-500 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orange-400" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
