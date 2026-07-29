"use client";

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

export default function ProjectRow({ project, onDelete, }: Props) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${project.title}"?`
    );

    if (!confirmed) return;

    try {
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
    }
  }

  return (
    <tr className="border-t border-slate-800 transition-colors hover:bg-slate-900">
      {/* Project */}
      <td className="py-4">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-slate-800">
            {project.image?.url ? (
              <Image
                src={project.image.url}
                alt={project.title}
                fill
                sizes="56px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
                No Image
              </div>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-white">
              {project.title}
            </h3>

            <p className="max-w-md truncate text-sm text-slate-400">
              {project.description}
            </p>
          </div>
        </div>
      </td>

      {/* Status */}
      <td>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            project.status === "published"
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {project.status}
        </span>
      </td>

      {/* Featured */}
      <td>
        {project.featured ? (
          <Star
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />
        ) : (
          "-"
        )}
      </td>

      {/* Actions */}
      <td>
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/projects/${project._id}`}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-blue-400"
          >
            <Pencil size={18} />
          </Link>

          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-red-400"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}