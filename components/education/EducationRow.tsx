"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { Education } from "@/types/education";

interface Props {
  education: Education;
  onDelete: (id: string) => void;
}

function formatDate(date?: string | Date) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function EducationRow({
  education,
  onDelete,
}: Props) {
  const [deleting, setDeleting] = useState(false);

  const published = education.status === "published";

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${education.degree}" at "${education.institution}"?`
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      const res = await fetch(
        `/api/education/${education._id}`,
        {
          method: "DELETE",
        }
      );

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message);
      }

      toast.success("Education deleted successfully.");

      onDelete(education._id);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <tr className="border-t border-slate-800 transition hover:bg-slate-900/60">
      <td className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-800">
            {education.logo?.url ? (
              <Image
                src={education.logo.url}
                alt={education.institution}
                fill
                sizes="56px"
                className="object-cover"
              />
            ) : (
              <GraduationCap
                size={22}
                className="text-slate-500"
              />
            )}
          </div>

          <div>
            <h3 className="font-semibold text-white">
              {education.degree}
            </h3>

            <p className="text-sm text-slate-400">
              {education.institution}
            </p>

            {education.fieldOfStudy && (
              <p className="text-xs text-slate-500">
                {education.fieldOfStudy}
              </p>
            )}
          </div>
        </div>
      </td>

      <td className="text-sm text-slate-300">
        {education.grade
          ? `${education.grade}${
              education.gradeType
                ? ` ${education.gradeType}`
                : ""
            }`
          : "N/A"}
      </td>

      <td className="text-sm text-slate-300">
        <div className="flex flex-col">
          <span>
            {formatDate(education.startDate)} —{" "}
            {education.currentlyStudying
              ? "Present"
              : formatDate(education.endDate)}
          </span>

          <span className="mt-1 text-xs text-slate-500">
            {education.currentlyStudying
              ? "Currently Studying"
              : "Completed"}
          </span>
        </div>
      </td>

      <td>
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            published
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {education.status}
        </span>
      </td>

      <td>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/education/${education._id}`}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-blue-400"
            title="Edit"
          >
            <Pencil size={18} />
          </Link>

          <button
            onClick={handleDelete}
            disabled={deleting}
            title="Delete"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting ? (
              <Loader2
                size={18}
                className="animate-spin"
              />
            ) : (
              <Trash2 size={18} />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
}