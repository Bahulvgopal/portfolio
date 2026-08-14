"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2, Star } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Project } from "@/types/project";

interface Props {
  project: Project;
  onDelete: (id: string) => void;
}

export default function ProjectRow({ project, onDelete }: Props) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${project.title}"? This can't be undone.`
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      const res = await fetch(`/api/projects/${project._id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(
          result.message || "Failed to delete project."
        );
      }

      toast.success("Project deleted successfully!");

      onDelete(project._id);
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setDeleting(false);
    }
  }

  const isPublished = project.status === "published";

  return (
    <tr className="border-b border-white/[0.05] transition-colors duration-150 last:border-b-0 hover:bg-white/[0.025]">
      {/* Project */}
      <td className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.04]">
            {project.image?.url ? (
              <Image
                src={project.image.url}
                alt={project.title}
                fill
                sizes="48px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[10px] text-neutral-600">
                No Image
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-medium text-white">
              {project.title}
            </h3>

            <p className="max-w-md truncate text-sm text-neutral-400">
              {project.description}
            </p>
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="p-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
            isPublished
              ? "border-emerald-500/20 bg-emerald-400/10 text-emerald-400"
              : "border-amber-500/20 bg-amber-400/10 text-amber-400"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isPublished ? "bg-emerald-400" : "bg-amber-400"
            }`}
          />
          {project.status}
        </span>
      </td>

      {/* Featured */}
      <td className="p-4">
        {project.featured ? (
          <Star size={18} className="fill-sky-400 text-sky-400" />
        ) : (
          <span className="text-neutral-600">—</span>
        )}
      </td>

      {/* Actions */}
      <td className="p-4">
        <div className="flex items-center gap-1">
          <Link
            href={`/admin/projects/${project._id}`}
            className="rounded-lg p-2 text-neutral-400 transition-colors duration-150 hover:bg-white/[0.06] hover:text-sky-400"
            aria-label={`Edit ${project.title}`}
          >
            <Pencil size={16} />
          </Link>

          <button
            type="button"
            disabled={deleting}
            onClick={handleDelete}
            aria-label={`Delete ${project.title}`}
            className="rounded-lg p-2 text-neutral-400 transition-colors duration-150 hover:bg-white/[0.06] hover:text-rose-400 disabled:opacity-50"
          >
            <Trash2 size={16} className={deleting ? "animate-pulse" : ""} />
          </button>
        </div>
      </td>
    </tr>
  );
}