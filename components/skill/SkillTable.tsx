"use client";

import Link from "next/link";
import { Plus, Code2 } from "lucide-react";

import { useSkill } from "@/hooks/useSkill";
import SkillRow from "./SkillRow";
import Loader from "@/components/ui/Loader";

export default function SkillTable() {
  const { skills, loading, removeSkill } = useSkill();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] border border-white/20 bg-slate-950/40 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.25)]">
      {/* Top Glass Glare Line */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-10" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 p-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-orbitron text-[10px] font-bold text-orange-400 tracking-widest uppercase">
              // ARSENAL CAPABILITIES // 「技能」
            </span>
            <span className="text-stone-500 font-mono text-xs hidden sm:inline">· · ·</span>
          </div>
          <h2 className="font-orbitron text-lg sm:text-xl font-black text-white uppercase tracking-wide">
            TECHNICAL SKILLS
          </h2>
          <p className="mt-0.5 font-rajdhani text-xs sm:text-sm font-semibold text-stone-400">
            {skills.length} competencies indexed across categories
          </p>
        </div>

        <Link
          href="/admin/skills/new"
          className="inline-flex items-center justify-center gap-2 self-start rounded-2xl bg-gradient-to-r from-orange-600 via-amber-500 to-rose-600 px-5 py-3 font-orbitron text-xs font-black uppercase tracking-wider text-white shadow-[0_4px_20px_rgba(249,115,22,0.4)] transition-all duration-300 hover:scale-105 border border-white/25 w-fit"
        >
          <Plus size={16} />
          ADD SKILL
        </Link>
      </div>

      {skills.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 p-14 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04]">
            <Code2 className="text-orange-400" size={26} />
          </div>
          <h3 className="font-orbitron text-base font-bold text-white uppercase">
            No Skills Indexed
          </h3>
          <p className="font-rajdhani text-sm font-semibold text-stone-400 max-w-sm">
            Add frontend, backend, devops, and language tools to your skillset.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.08] p-3 sm:p-4">
          {skills.map((skill) => (
            <SkillRow
              key={skill._id}
              skill={skill}
              onDelete={removeSkill}
            />
          ))}
        </div>
      )}
    </div>
  );
}
