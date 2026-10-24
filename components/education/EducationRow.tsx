"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Education } from "@/types/education";
import { useAnimeConfirm } from "@/components/ui/AnimeConfirmModal";

interface Props {
  education: Education;
  onDelete: (id: string) => void;
}

function formatDate(date?: string | Date) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function EducationRow({
  education,
  onDelete,
}: Props) {
  const confirm = useAnimeConfirm();
  const [deleting, setDeleting] = useState(false);
  const published = education.status === "published";

  async function handleDelete() {
    const confirmed = await confirm({
      title: "PURGE ACADEMIC RECORD",
      subtitle: "TACTICAL PURGE DECREE // 「緊急消去警告」",
      message: `Delete "${education.degree}" at "${education.institution}"? This record cannot be undone.`,
      confirmText: "EXECUTE PURGE // 削除実行",
      cancelText: "ABORT // 中止",
      variant: "danger",
    });
    if (!confirmed) return;

    try {
      setDeleting(true);
      const res = await fetch(`/api/education/${education._id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message);
      }
      toast.success("Education record deleted successfully.");
      onDelete(education._id);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <tr className="border-b border-white/[0.08] transition-colors duration-200 last:border-b-0 hover:bg-white/[0.05]">
      {/* Degree & Major */}
      <td className="p-4 sm:p-5">
        <div className="flex items-center gap-3.5">
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-white/[0.04] shadow-inner">
            {education.logo?.url ? (
              <Image
                src={education.logo.url}
                alt={education.institution}
                fill
                sizes="48px"
                className="object-cover"
              />
            ) : (
              <GraduationCap size={20} className="text-orange-400" />
            )}
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-rajdhani text-base font-bold text-white">
              {education.degree}
            </h3>
            <p className="font-rajdhani text-xs sm:text-sm font-semibold text-stone-300">
              {education.institution}
            </p>
          </div>
        </div>
      </td>

      {/* Field of Study */}
      <td className="p-4 sm:p-5 font-rajdhani text-sm font-semibold text-stone-300 hidden md:table-cell">
        <span className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/[0.03]">
          {education.fieldOfStudy || "Engineering"}
        </span>
      </td>

      {/* Timeline */}
      <td className="p-4 sm:p-5 font-mono text-xs text-stone-400">
        {formatDate(education.startDate)} — {education.currentlyStudying ? "Present" : formatDate(education.endDate)}
      </td>

      {/* Status */}
      <td className="p-4 sm:p-5">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-orbitron text-[10px] font-bold uppercase tracking-wider ${
            published
              ? "border-emerald-500/30 bg-emerald-500/[0.12] text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
              : "border-amber-500/30 bg-amber-500/[0.12] text-amber-300"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              published ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
            }`}
          />
          {education.status}
        </span>
      </td>

      {/* Actions */}
      <td className="p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/education/${education._id}`}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-stone-300 transition-all duration-200 hover:border-orange-500/50 hover:bg-orange-500/15 hover:text-orange-300 hover:scale-105"
            aria-label={`Edit ${education.degree}`}
          >
            <Pencil size={15} />
          </Link>

          <button
            disabled={deleting}
            onClick={handleDelete}
            aria-label={`Delete ${education.degree}`}
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
