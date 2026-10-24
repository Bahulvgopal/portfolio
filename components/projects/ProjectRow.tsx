"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2, Star, Video } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAnimeConfirm } from "@/components/ui/AnimeConfirmModal";

import { Project } from "@/types/project";

interface Props {
  project: Project;
  onDelete: (id: string) => void;
}

export default function ProjectRow({ project, onDelete }: Props) {
  const router = useRouter();
  const confirm = useAnimeConfirm();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = await confirm({
      title: "PURGE PROJECT RECORD",
      subtitle: "TACTICAL PURGE DECREE // 「緊急消去警告」",
      message: `Permanently delete "${project.title}"? This mission record cannot be recovered.`,
      confirmText: "EXECUTE PURGE // 削除実行",
      cancelText: "ABORT // 中止",
      variant: "danger",
    });
    if (!confirmed) return;

    try {
      setDeleting(true);
      const res = await fetch(`/api/projects/${project._id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to delete project.");
      }
      toast.success("Project mission deleted successfully!");
      onDelete(project._id);
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setDeleting(false);
    }
  }

  const isPublished = project.status === "published";

  return (
    <tr className="border-b border-white/[0.08] transition-colors duration-200 last:border-b-0 hover:bg-white/[0.05]">
      {/* Project */}
      <td className="p-4 sm:p-5">
        <div className="flex items-center gap-3.5">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/15 bg-stone-900 shadow-inner">
            {project.image?.url ? (
              <Image
                src={project.image.url}
                alt={project.title}
                fill
                sizes="56px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-orbitron text-[9px] font-bold text-stone-500 uppercase">
                NO IMG
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-rajdhani text-base font-bold text-white">
                {project.title}
              </h3>
              {project.videoUrl && (
                <span className="p-1 rounded-md bg-orange-500/15 border border-orange-500/30 text-orange-400" title="Includes Video Demo">
                  <Video size={12} />
                </span>
              )}
            </div>

            <p className="max-w-md truncate font-rajdhani text-xs sm:text-sm font-medium text-stone-400 mt-0.5">
              {project.tagline || project.description}
            </p>
          </div>
        </div>
      </td>

      {/* Category / Type */}
      <td className="p-4 sm:p-5 hidden md:table-cell">
        <span className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/[0.04] font-orbitron text-[10px] font-bold text-stone-300 uppercase">
          {project.category || "Web"}
        </span>
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
          {project.status}
        </span>
      </td>

      {/* Featured */}
      <td className="p-4 sm:p-5 text-center">
        {project.featured ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-amber-500/40 bg-amber-500/15 text-amber-300 text-[10px] font-orbitron font-bold">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            <span>FEATURED</span>
          </span>
        ) : (
          <span className="text-stone-600 font-mono text-xs">—</span>
        )}
      </td>

      {/* Actions */}
      <td className="p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/projects/${project._id}`}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-stone-300 transition-all duration-200 hover:border-orange-500/50 hover:bg-orange-500/15 hover:text-orange-300 hover:scale-105"
            aria-label={`Edit ${project.title}`}
          >
            <Pencil size={15} />
          </Link>

          <button
            type="button"
            disabled={deleting}
            onClick={handleDelete}
            aria-label={`Delete ${project.title}`}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-stone-400 transition-all duration-200 hover:border-rose-500/50 hover:bg-rose-500/15 hover:text-rose-300 hover:scale-105 disabled:opacity-50"
          >
            <Trash2 size={15} className={deleting ? "animate-pulse" : ""} />
          </button>
        </div>
      </td>
    </tr>
  );
}
