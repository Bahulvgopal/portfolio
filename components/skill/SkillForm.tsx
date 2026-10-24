"use client";

import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useAnimeConfirm } from "@/components/ui/AnimeConfirmModal";

import {
  skillSchema,
  type SkillFormData,
} from "@/schemas/skillSchema";
import type { Skill } from "@/types/skill";

import SkillBasic from "./SkillBasic";
import SkillPublishing from "./SkillPublishing";
import FormActions from "@/components/ui/form/FormActions";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE, delay },
});

interface Props {
  mode: "create" | "edit";
  initialData?: Skill;
}

export default function SkillForm({
  mode,
  initialData,
}: Props) {
  const router = useRouter();
  const confirm = useAnimeConfirm();

  const methods = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      category: initialData?.category ?? "Frontend",
      icon: initialData?.icon,
      order: initialData?.order ?? 0,
      status: initialData?.status ?? "published",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  async function onSubmit(data: SkillFormData) {
    try {
      const endpoint =
        mode === "create"
          ? "/api/skills"
          : `/api/skills/${initialData!._id}`;

      const response = await fetch(endpoint, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message);
      }

      toast.success(
        mode === "create"
          ? "Skill indexed successfully."
          : "Skill updated successfully."
      );

      router.push("/admin/skills");
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
      title: "PURGE SKILL PROTOCOL",
      subtitle: "TACTICAL PURGE DECREE // 「緊急消去警告」",
      message: `Permanently delete skill "${initialData.name || "this skill"}"? This Jutsu proficiency will be purged from the stack.`,
      confirmText: "EXECUTE PURGE // 削除実行",
      cancelText: "ABORT // 中止",
      variant: "danger",
    });
    if (!ok) return;

    try {
      const response = await fetch(
        `/api/skills/${initialData._id}`,
        { method: "DELETE" }
      );
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message);
      }

      toast.success("Skill deleted successfully.");
      router.push("/admin/skills");
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
                // ARSENAL STUDIO // 「技術管理」
              </span>
              <span className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-orange-500 to-rose-600 text-white font-orbitron text-[9px] font-black uppercase tracking-wider shadow-[0_2px_10px_rgba(249,115,22,0.4)]">
                {mode === "create" ? "NEW SKILL" : "EDIT SKILL"}
              </span>
            </div>

            <h1 className="font-orbitron text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">
              {mode === "create" ? "INDEX NEW SKILL" : "UPDATE SKILL ATTRIBUTES"}
            </h1>

            <p className="mt-2 font-rajdhani text-sm sm:text-base font-semibold text-stone-300">
              {mode === "create"
                ? "Register a programming language, framework, database, or tool into your arsenal."
                : `Update proficiency and category metadata for ${initialData?.name || "this skill"}.`}
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
          <SkillBasic />
          <SkillPublishing />

          <div className="rounded-[28px] border border-white/20 bg-slate-950/40 backdrop-blur-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.25)]">
            <FormActions
              mode={mode}
              entity="Skill"
              isSubmitting={isSubmitting}
              onDelete={mode === "edit" ? handleDelete : undefined}
            />
          </div>
        </motion.form>
      </FormProvider>
    </div>
  );
}
