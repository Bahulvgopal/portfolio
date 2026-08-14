"use client";

import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Experience } from "@/types/experience";

interface Props {
  experience: Experience;
  onDelete: (id: string) => void;
}

export default function ExperienceRow({
  experience,
  onDelete,
}: Props) {
  async function handleDelete() {
    if (
      !window.confirm(
        `Delete "${experience.role}" at "${experience.company}"?`
      )
    ) {
      return;
    }

    try {
      const res = await fetch(
        `/api/experience/${experience._id}`,
        {
          method: "DELETE",
        }
      );

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message);
      }

      toast.success("Experience deleted.");

      onDelete(experience._id);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    }
  }

  return (
    <tr className="border-t border-slate-800 hover:bg-slate-900">
      <td className="py-4">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-slate-800">
            {experience.logo?.url ? (
              <Image
                src={experience.logo.url}
                alt={experience.company}
                fill
                sizes="56px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
                Logo
              </div>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-white">
              {experience.role}
            </h3>

            <p className="text-sm text-slate-400">
              {experience.company}
            </p>
          </div>
        </div>
      </td>

      <td>{experience.employmentType}</td>

      <td>
        {experience.currentlyWorking
          ? "Present"
          : experience.endDate
          ? new Date(experience.endDate).getFullYear()
          : "-"}
      </td>

      <td>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            experience.status === "published"
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {experience.status}
        </span>
      </td>

      <td>
        <div className="flex gap-3">
          <Link
            href={`/admin/experience/${experience._id}`}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-blue-400"
          >
            <Pencil size={18} />
          </Link>

          <button
            onClick={handleDelete}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-red-400"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}