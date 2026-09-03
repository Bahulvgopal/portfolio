"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Pencil,
  Trash2,
  Code2,
} from "lucide-react";

import { toast } from "sonner";

import type { Skill } from "@/types/skill";

interface Props {
  skill: Skill;
  onDelete(id: string): void;
}

export default function SkillRow({
  skill,
  onDelete,
}: Props) {
  async function handleDelete() {
    if (!confirm("Delete this skill?"))
      return;

    const res = await fetch(
      `/api/skills/${skill._id}`,
      {
        method: "DELETE",
      }
    );

    const result = await res.json();

    if (!res.ok) {
      toast.error(result.message);
      return;
    }

    toast.success("Skill deleted.");

    onDelete(skill._id);
  }

  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-xl border border-transparent hover:border-white/[0.08] hover:bg-white/[0.03] transition-all duration-200">
      <div className="flex items-center gap-4 min-w-0">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] overflow-hidden">
          {skill.icon?.url ? (
            <Image
              src={skill.icon.url}
              alt={skill.name}
              fill
              className="object-cover"
            />
          ) : (
            <Code2 className="text-neutral-600" size={22} />
          )}
        </div>

        <div className="min-w-0">
          <h3 className="font-semibold text-white truncate">
            {skill.name}
          </h3>

          <p className="text-sm text-neutral-500">
            {skill.category}
          </p>

          
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-2 pl-[72px] sm:pl-0">
        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium font-mono uppercase tracking-wide ${
            skill.status === "published"
              ? "border-emerald-500/20 bg-emerald-500/[0.08] text-emerald-400"
              : "border-amber-500/20 bg-amber-500/[0.08] text-amber-400"
          }`}
        >
          {skill.status}
        </span>

        <div className="flex items-center gap-1">
          <Link
            href={`/admin/skills/${skill._id}`}
            className="rounded-lg p-2 text-neutral-400 border border-transparent hover:border-white/[0.08] hover:bg-white/[0.03] hover:text-sky-400 transition-all duration-200"
          >
            <Pencil size={17} />
          </Link>

          <button
            onClick={handleDelete}
            className="rounded-lg p-2 text-neutral-400 border border-transparent hover:border-rose-500/20 hover:bg-rose-500/[0.08] hover:text-rose-400 transition-all duration-200"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}