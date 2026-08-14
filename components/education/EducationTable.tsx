"use client";

import Link from "next/link";
import { Plus, GraduationCap, Loader2 } from "lucide-react";

import { useEducation } from "@/hooks/useEducation";
import EducationRow from "./EducationRow";

export default function EducationTable() {
  const {
    educations,
    loading,
    removeEducation,
  } = useEducation();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-12 text-center">
        <Loader2 className="animate-spin text-sky-400" size={22} />
        <p className="text-sm text-neutral-400">Loading education...</p>
      </div>
    );
  }

  if (educations.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.02] p-10 sm:p-12 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
          <GraduationCap className="text-neutral-600" size={24} />
        </div>

        <h2
          className="text-xl font-black tracking-tight text-white"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          No Education Added
        </h2>

        <p className="mt-2 text-sm text-neutral-400 max-w-sm mx-auto">
          Add your first education record to display it on your portfolio.
        </p>

        <Link
          href="/admin/education/new"
          className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-neutral-900 shadow-[0_0_24px_rgba(255,255,255,0.06)] transition-all duration-200 hover:bg-neutral-100 hover:shadow-[0_0_36px_rgba(255,255,255,0.1)]"
        >
          <Plus size={17} className="transition-transform duration-200 group-hover:rotate-90" />
          Add Education
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] p-5">
        <h2
          className="text-lg font-black tracking-tight text-white"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          Education
        </h2>

        <Link
          href="/admin/education/new"
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-[0_0_24px_rgba(255,255,255,0.06)] transition-all duration-200 hover:bg-neutral-100 hover:shadow-[0_0_36px_rgba(255,255,255,0.1)] w-fit"
        >
          <Plus size={17} className="transition-transform duration-200 group-hover:rotate-90" />
          Add Education
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="text-left text-xs font-mono uppercase tracking-wider text-neutral-500 border-b border-white/[0.08]">
            <tr>
              <th className="p-4 font-medium">Institution</th>
              <th className="font-medium">Degree</th>
              <th className="font-medium">Duration</th>
              <th className="font-medium">Status</th>
              <th className="w-32 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/[0.06]">
            {educations.map((education) => (
              <EducationRow
                key={education._id}
                education={education}
                onDelete={removeEducation}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}