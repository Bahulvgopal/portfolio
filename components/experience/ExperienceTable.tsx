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
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 text-center text-neutral-400">
        Loading experiences...
      </div>
    );
  }

  if (experiences.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.02] p-12 text-center">
        <h2
          className="text-xl font-semibold text-white"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          No experience added
        </h2>

        <p className="mt-2 text-neutral-400">
          Add your first experience to display it on your portfolio.
        </p>

        <Link
          href="/admin/experience/new"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-neutral-900 shadow-[0_0_32px_rgba(255,255,255,0.08)] transition-all duration-200 hover:bg-neutral-100"
        >
          <Plus size={18} />
          Add Experience
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02]">
      <div className="flex items-center justify-between border-b border-white/[0.08] p-5">
        <h2
          className="text-lg font-semibold text-white"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          Experience
        </h2>

        <Link
          href="/admin/experience/new"
          className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-[0_0_24px_rgba(255,255,255,0.06)] transition-all duration-200 hover:bg-neutral-100"
        >
          <Plus size={18} />
          Add Experience
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-white/[0.06] text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
              <th className="p-4 font-medium">Experience</th>
              <th className="p-4 font-medium">Type</th>
              <th className="p-4 font-medium">Duration</th>
              <th className="p-4 font-medium">Status</th>
              <th className="w-32 p-4 font-medium">Actions</th>
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
    </div>
  );
}