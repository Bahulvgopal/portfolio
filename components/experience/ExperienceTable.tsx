"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { useExperience } from "@/hooks/useExperience";
import ExperienceRow from "./ExperienceRow";

export default function ExperienceTable() {
  const {
    experiences,
    loading,
    removeExperience,
  } = useExperience();

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
        Loading experiences...
      </div>
    );
  }

  if (experiences.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900 p-12 text-center">
        <h2 className="text-xl font-semibold text-white">
          No Experience Added
        </h2>

        <p className="mt-2 text-slate-400">
          Add your first experience to display it on your portfolio.
        </p>

        <Link
          href="/admin/experience/new"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Experience
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-800 p-5">
        <h2 className="text-lg font-semibold text-white">
          Experience
        </h2>

        <Link
          href="/admin/experience/new"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Experience
        </Link>
      </div>

      <table className="w-full">
        <thead className="bg-slate-950 text-left text-sm text-slate-400">
          <tr>
            <th className="p-4">Experience</th>
            <th>Type</th>
            <th>Duration</th>
            <th>Status</th>
            <th className="w-32">Actions</th>
          </tr>
        </thead>

        <tbody>
          {experiences.map((experience) => (
            <ExperienceRow
              key={experience._id}
              experience={experience}
              onDelete={removeExperience}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}