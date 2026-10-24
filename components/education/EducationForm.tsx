"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useAnimeConfirm } from "@/components/ui/AnimeConfirmModal";

import { educationSchema, type EducationFormData } from "@/schemas/educationSchema";
import type { Education } from "@/types/education";

import EducationBasic from "./EducationBasic";
import EducationTimeline from "./EducationTimeline";
import EducationAcademic from "./EducationAcademic";
import EducationDescription from "./EducationDescription";
import EducationLists from "./EducationLists";
import EducationPublishing from "./EducationPublishing";
import FormActions from "@/components/ui/form/FormActions";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE, delay },
});

interface Props {
  mode: "create" | "edit";
  initialData?: Education;
}

function formatDate(date?: string | Date | null) {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}

export default function EducationForm({ mode, initialData }: Props) {
  const router = useRouter();
  const confirm = useAnimeConfirm();

  const methods = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institution: initialData?.institution ?? "",
      degree: initialData?.degree ?? "",
      fieldOfStudy: initialData?.fieldOfStudy ?? "",
      location: initialData?.location ?? "",
      startDate: formatDate(initialData?.startDate),
      endDate: formatDate(initialData?.endDate),
      currentlyStudying: initialData?.currentlyStudying ?? true,
      grade: initialData?.grade ?? "",
      gradeType: initialData?.gradeType ?? "CGPA",
      logo: initialData?.logo,
      description: initialData?.description ?? "",
      coursework: initialData?.coursework?.map((item) => ({ value: item })) ?? [],
      achievements: initialData?.achievements?.map((item) => ({ value: item })) ?? [],
      website: initialData?.website ?? "",
      order: initialData?.order ?? 0,
      status: initialData?.status ?? "published",
    },
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (watch("currentlyStudying")) {
      setValue("endDate", "");
    }
  }, [watch("currentlyStudying"), setValue]);

  async function onSubmit(data: EducationFormData) {
    try {
      const isEditing = mode === "edit" && initialData;

      const endpoint = isEditing
        ? `/api/education/${initialData._id}`
        : "/api/education";

      const method = isEditing ? "PATCH" : "POST";

      const payload = {
        ...data,
        coursework: data.coursework.map((item) => item.value),
        achievements: data.achievements.map((item) => item.value),
      };

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message);
      }

      toast.success(
        mode === "create"
          ? "Education created successfully."
          : "Education updated successfully."
      );

      router.push("/admin/education");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  async function handleDelete() {
    if (!initialData?._id) return;
    const ok = await confirm({
      title: "PURGE EDUCATION RECORD",
      subtitle: "TACTICAL PURGE DECREE // 「緊急消去警告」",
      message: `Delete education record for "${initialData.degree || "Degree"}" at "${initialData.institution || "Institution"}"? This operation cannot be reversed.`,
      confirmText: "EXECUTE PURGE // 削除実行",
      cancelText: "ABORT // 中止",
      variant: "danger",
    });
    if (!ok) return;

    try {
      const response = await fetch(`/api/education/${initialData._id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message);
      }

      toast.success("Education deleted successfully.");
      router.push("/admin/education");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <div className="space-y-8">
      {/* Header Glass Card */}
      <motion.div
        {...reveal(0)}
        className="relative overflow-hidden rounded-[30px] sm:rounded-[34px] border border-white/20 bg-slate-950/40 backdrop-blur-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.25)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 -left-10 w-36 h-36 rounded-3xl bg-gradient-to-br from-[#FF5E3A]/30 to-[#FF2A54]/25 blur-2xl z-0"
        />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-orbitron text-[9px] font-bold text-orange-400 tracking-widest uppercase">
                // ACADEMIC STUDIO // 「学歴管理」
              </span>
              <span className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-orange-500 to-rose-600 text-white font-orbitron text-[9px] font-black uppercase tracking-wider shadow-[0_2px_10px_rgba(249,115,22,0.4)]">
                {mode === "create" ? "NEW RECORD" : "EDIT ENTRY"}
              </span>
            </div>

            <h1 className="font-orbitron text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">
              {mode === "create" ? "ADD EDUCATION ENTRY" : "UPDATE EDUCATION PARAMETERS"}
            </h1>

            <p className="mt-2 font-rajdhani text-sm sm:text-base font-semibold text-stone-300">
              {mode === "create"
                ? "Document a new degree, university program, GPA, and coursework."
                : `Update academic records and achievements for ${initialData?.institution || "this entry"}.`}
            </p>
          </div>

          <div className="text-stone-500 font-mono text-xs hidden sm:block tracking-widest self-start">
            · · ·
          </div>
        </div>
      </motion.div>

      <FormProvider {...methods}>
        <motion.form
          {...reveal(0.08)}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 sm:space-y-8"
        >
          <EducationBasic />
          <EducationTimeline />
          <EducationAcademic />
          <EducationDescription />
          <EducationLists />
          <EducationPublishing />

          <div className="rounded-[28px] border border-white/20 bg-slate-950/40 backdrop-blur-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.25)]">
            <FormActions
              mode={mode}
              entity="Education"
              isSubmitting={isSubmitting}
              onDelete={mode === "edit" ? handleDelete : undefined}
            />
          </div>
        </motion.form>
      </FormProvider>
    </div>
  );
}
