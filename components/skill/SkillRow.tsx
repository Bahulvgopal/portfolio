"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2, Code2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import type { Skill } from "@/types/skill";
import { useAnimeConfirm } from "@/components/ui/AnimeConfirmModal";

interface Props {
  skill: Skill;
  onDelete(id: string): void;
}

export default function SkillRow({
  skill,
  onDelete,
}: Props) {
  const confirm = useAnimeConfirm();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const ok = await confirm({
      title: "PURGE SKILL PROTOCOL",
      subtitle: "TACTICAL PURGE DECREE // 「緊急消去警告」",
      message: `Permanently delete skill "${skill.name}"? This Jutsu proficiency will be purged from the stack.`,
      confirmText: "EXECUTE PURGE // 削除実行",
      cancelText: "ABORT // 中止",
      variant: "danger",
    });
    if (!ok) return;

    try {
      setDeleting(true);
      const res = await fetch(`/api/skills/${skill._id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to delete skill.");
      }
      toast.success("Skill deleted successfully.");
      onDelete(skill._id);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border border-transparent hover:border-white/15 hover:bg-white/[0.04] backdrop-blur-xl transition-all duration-300">
      <div className="flex items-center gap-4 min-w-0">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] overflow-hidden shadow-inner">
          {skill.icon?.url ? (
            <Image
              src={skill.icon.url}
              alt={skill.name}
              fill
              className="object-contain p-2"
            />
          ) : (
            <Code2 className="text-orange-400" size={24} />
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-rajdhani text-lg font-bold text-white">
              {skill.name}
            </h3>
            <span className="px-2.5 py-0.5 rounded-md border border-white/10 bg-white/[0.03] font-orbitron text-[10px] font-bold text-stone-300 uppercase">
              {skill.category}
            </span>
          </div>

          <div className="flex items-center gap-2.5 mt-1.5">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-orbitron text-[9px] font-bold uppercase tracking-wider ${
                skill.status === "published"
                  ? "border-emerald-500/30 bg-emerald-500/[0.12] text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                  : "border-amber-500/30 bg-amber-500/[0.12] text-amber-300"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  skill.status === "published" ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                }`}
              />
              {skill.status}
            </span>

            <span className="font-mono text-[11px] text-stone-500">
              PRIORITY: 0{skill.order}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto">
        <Link
          href={`/admin/skills/${skill._id}`}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-stone-300 transition-all duration-200 hover:border-orange-500/50 hover:bg-orange-500/15 hover:text-orange-300 hover:scale-105"
          aria-label={`Edit ${skill.name}`}
        >
          <Pencil size={15} />
        </Link>

        <button
          type="button"
          disabled={deleting}
          onClick={handleDelete}
          aria-label={`Delete ${skill.name}`}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-stone-400 transition-all duration-200 hover:border-rose-500/50 hover:bg-rose-500/15 hover:text-rose-300 hover:scale-105 disabled:opacity-50"
        >
          {deleting ? (
            <Loader2 size={15} className="animate-spin text-rose-400" />
          ) : (
            <Trash2 size={15} />
          )}
        </button>
      </div>
    </div>
  );
}
