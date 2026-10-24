"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Experience } from "@/types/experience";
import { useAnimeConfirm } from "@/components/ui/AnimeConfirmModal";

interface Props {
  experience: Experience;
  onDelete: (id: string) => void;
}

function formatDate(date?: string | Date) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function ExperienceRow({
  experience,
  onDelete,
}: Props) {
  const confirm = useAnimeConfirm();
  const [deleting, setDeleting] = useState(false);
  const isPublished = experience.status === "published";

  async function handleDelete() {
    const ok = await confirm({
      title: "PURGE EXPERIENCE RECORD",
      subtitle: "TACTICAL PURGE DECREE // 「緊急消去警告」",
      message: `Delete "${experience.role}" at "${experience.company}"? This career mission cannot be recovered.`,
      confirmText: "EXECUTE PURGE // 削除実行",
      cancelText: "ABORT // 中止",
      variant: "danger",
    });
    if (!ok) return;

    try {
      setDeleting(true);
      const res = await fetch(`/api/experience/${experience._id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message);
      }
      toast.success("Experience record deleted successfully.");
      onDelete(experience._id);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <tr className="border-b border-white/[0.08] transition-colors duration-200 last:border-b-0 hover:bg-white/[0.05]">
      {/* Role & Company */}
      <td className="p-4 sm:p-5">
        <div className="flex items-center gap-3.5">
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-white/[0.04] shadow-inner">
            {experience.logo?.url ? (
              <Image
                src={experience.logo.url}
                alt={experience.company}
                fill
                sizes="48px"
                className="object-cover"
              />
            ) : (
              <Briefcase size={20} className="text-orange-400" />
            )}
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-rajdhani text-base font-bold text-white">
              {experience.role}
            </h3>
            <p className="font-rajdhani text-xs sm:text-sm font-semibold text-stone-300">
              {experience.company}
            </p>
          </div>
        </div>
      </td>

      {/* Type */}
      <td className="p-4 sm:p-5 hidden md:table-cell">
        <span className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/[0.03] font-orbitron text-[10px] font-bold text-stone-300 uppercase">
          {experience.employmentType}
        </span>
      </td>

      {/* Timeline */}
      <td className="p-4 sm:p-5 font-mono text-xs text-stone-400">
        {formatDate(experience.startDate)} — {experience.currentlyWorking ? "Present" : formatDate(experience.endDate)}
      </td>

      {/* Status */}
      <td className="p-4 sm:p-5">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-orbitron text-[10px] font-bold uppercase tracking-wider ${
            isPublished
              ? "border-emerald-500/30 bg-emerald-500/[0.12] text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
              : "border-amber-500/30 bg-amber-500/[0.12] text-amber-300"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isPublished ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
            }`}
          />
          {experience.status}
        </span>
      </td>

      {/* Actions */}
      <td className="p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/experience/${experience._id}`}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-stone-300 transition-all duration-200 hover:border-orange-500/50 hover:bg-orange-500/15 hover:text-orange-300 hover:scale-105"
            aria-label={`Edit ${experience.role}`}
          >
            <Pencil size={15} />
          </Link>

          <button
            disabled={deleting}
            onClick={handleDelete}
            aria-label={`Delete ${experience.role}`}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-stone-400 transition-all duration-200 hover:border-rose-500/50 hover:bg-rose-500/15 hover:text-rose-300 hover:scale-105 disabled:opacity-50"
          >
            {deleting ? (
              <Loader2 size={15} className="animate-spin text-rose-400" />
            ) : (
              <Trash2 size={15} />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
}
