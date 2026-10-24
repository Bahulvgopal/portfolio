"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useAnimeConfirm } from "@/components/ui/AnimeConfirmModal";

import {
  experienceSchema,
  type ExperienceFormData,
} from "@/schemas/experienceSchema";
import type { Experience } from "@/types/experience";

import ExperienceBasic from "./ExperienceBasic";
import ExperienceTimeline from "./ExperienceTimeline";
import ExperienceDescription from "./ExperienceDescription";
import ExperienceLists from "./ExperienceLists";
import ExperiencePublishing from "./ExperiencePublishing";
import FormActions from "@/components/ui/form/FormActions";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE, delay },
});

interface Props {
  mode: "create" | "edit";
  initialData?: Experience;
}

function formatDate(date?: string | Date | null) {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}

export default function ExperienceForm({
  mode,
  initialData,
}: Props) {
  const router = useRouter();
  const confirm = useAnimeConfirm();

  const methods = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: initialData?.company ?? "",
      role: initialData?.role ?? "",
      employmentType: initialData?.employmentType ?? "leadership",
      location: initialData?.location ?? "",
      startDate: formatDate(initialData?.startDate),
      endDate: formatDate(initialData?.endDate),
      currentlyWorking: initialData?.currentlyWorking ?? true,
      logo: initialData?.logo,
      description: initialData?.description ?? "",
      responsibilities:
        initialData?.responsibilities?.map((item) => ({
          value: item,
        })) ?? [],
      skills:
        initialData?.skills?.map((item) => ({
          value: item,
        })) ?? [],
      achievements:
        initialData?.achievements?.map((item) => ({
          value: item,
        })) ?? [],
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
    if (watch("currentlyWorking")) {
      setValue("endDate", "");
    }
  }, [watch("currentlyWorking"), setValue]);

  async function onSubmit(data: ExperienceFormData) {
    try {
      const endpoint =
        mode === "create"
          ? "/api/experience"
          : `/api/experience/${initialData!._id}`;

      const payload = {
        ...data,
        responsibilities: data.responsibilities.map((r) => r.value),
        skills: data.skills.map((s) => s.value),
        achievements: data.achievements.map((a) => a.value),
      };

      const response = await fetch(endpoint, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message);
      }

      toast.success(
        mode === "create"
          ? "Experience created successfully."
          : "Experience updated successfully."
      );

      router.push("/admin/experience");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
  }

  async function handleDelete() {
    if (!initialData?._id) return;
    const ok = await confirm({
      title: "PURGE EXPERIENCE RECORD",
      subtitle: "TACTICAL PURGE DECREE // 「緊急消去警告」",
      message: `Delete career record for "${initialData.role || "Role"}" at "${initialData.company || "Company"}"? This career mission cannot be recovered.`,
      confirmText: "EXECUTE PURGE // 削除実行",
      cancelText: "ABORT // 中止",
      variant: "danger",
    });
    if (!ok) return;

    try {
      const response = await fetch(
        `/api/experience/${initialData._id}`,
        { method: "DELETE" }
      );
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message);
      }

      toast.success("Experience deleted successfully.");
      router.push("/admin/experience");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      );
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
                // CAREER LOG STUDIO // 「職歴管理」
              </span>
              <span className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-orange-500 to-rose-600 text-white font-orbitron text-[9px] font-black uppercase tracking-wider shadow-[0_2px_10px_rgba(249,115,22,0.4)]">
                {mode === "create" ? "NEW POSITION" : "EDIT POSITION"}
              </span>
            </div>

            <h1 className="font-orbitron text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">
              {mode === "create" ? "ADD WORK EXPERIENCE" : "UPDATE EXPERIENCE PARAMETERS"}
            </h1>

            <p className="mt-2 font-rajdhani text-sm sm:text-base font-semibold text-stone-300">
              {mode === "create"
                ? "Document a company role, leadership tenure, and engineering achievements."
                : `Update job milestones and responsibilities for ${initialData?.role || "this position"}.`}
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
          <ExperienceBasic />
          <ExperienceTimeline />
          <ExperienceDescription />
          <ExperienceLists />
          <ExperiencePublishing />

          <div className="rounded-[28px] border border-white/20 bg-slate-950/40 backdrop-blur-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.25)]">
            <FormActions
              mode={mode}
              entity="Experience"
              isSubmitting={isSubmitting}
              onDelete={mode === "edit" ? handleDelete : undefined}
            />
          </div>
        </motion.form>
      </FormProvider>
    </div>
  );
}
