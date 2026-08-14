"use client";

import Link from "next/link";
import { Plus, Code2, Loader2 } from "lucide-react";

import { useSkill } from "@/hooks/useSkill";
import SkillRow from "./SkillRow";

export default function SkillTable() {
  const {
    skills,
    loading,
    removeSkill,
  } = useSkill();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-12 text-center">
        <Loader2 className="animate-spin text-sky-400" size={22} />
        <p className="text-sm text-neutral-400">Loading skills...</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] p-5">
        <h2
          className="text-lg font-black tracking-tight text-white"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          Skills
        </h2>

        <Link
          href="/admin/skills/new"
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-[0_0_24px_rgba(255,255,255,0.06)] transition-all duration-200 hover:bg-neutral-100 hover:shadow-[0_0_36px_rgba(255,255,255,0.1)] w-fit"
        >
          <Plus size={17} className="transition-transform duration-200 group-hover:rotate-90" />
          Add Skill
        </Link>
      </div>

      {skills.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 p-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
            <Code2 className="text-neutral-600" size={22} />
          </div>
          <p className="text-sm text-neutral-500">No skills found.</p>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.06] px-2 py-1">
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