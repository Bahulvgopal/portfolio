"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAnimeConfirm } from "@/components/ui/AnimeConfirmModal";

import {
  certificateSchema,
  type CertificateFormData,
} from "@/schemas/certificateSchema";
import type { Certificate } from "@/types/certificate";

import CertificateBasic from "./CertificateBasic";
import CertificateDetails from "./CertificateDetails";
import CertificateDescription from "./CertificateDescription";
import CertificateSkills from "./CertificateSkills";
import CertificatePublishing from "./CertificatePublishing";
import FormActions from "@/components/ui/form/FormActions";

interface Props {
  mode: "create" | "edit";
  initialData?: Certificate;
}

function formatDate(date?: string | Date | null) {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}

export default function CertificateForm({
  mode,
  initialData,
}: Props) {
  const router = useRouter();
  const confirm = useAnimeConfirm();

  const methods = useForm<CertificateFormData>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      issuer: initialData?.issuer ?? "",
      credentialId: initialData?.credentialId ?? "",
      credentialUrl: initialData?.credentialUrl ?? "",
      issueDate: formatDate(initialData?.issueDate),
      expiryDate: formatDate(initialData?.expiryDate),
      doesNotExpire: initialData?.doesNotExpire ?? true,
      description: initialData?.description ?? "",
      skills:
        initialData?.skills?.map((skill) => ({
          value: skill,
        })) ?? [],
      logo: initialData?.logo,
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
    if (watch("doesNotExpire")) {
      setValue("expiryDate", "");
    }
  }, [watch("doesNotExpire"), setValue]);

  async function onSubmit(data: CertificateFormData) {
    try {
      const endpoint =
        mode === "create"
          ? "/api/certificates"
          : `/api/certificates/${initialData!._id}`;

      const payload = {
        ...data,
        skills: data.skills.map((skill) => skill.value),
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
          ? "Certificate registered successfully."
          : "Certificate updated successfully."
      );

      router.push("/admin/certificates");
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
      title: "PURGE CERTIFICATE RECORD",
      subtitle: "TACTICAL PURGE DECREE // 「緊急消去警告」",
      message: `Permanently delete "${initialData.title || "this certificate"}"? This credential will be removed from your public portfolio.`,
      confirmText: "EXECUTE PURGE // 削除実行",
      cancelText: "ABORT // 中止",
      variant: "danger",
    });
    if (!ok) return;

    try {
      const response = await fetch(
        `/api/certificates/${initialData._id}`,
        { method: "DELETE" }
      );
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message);
      }

      toast.success("Certificate deleted successfully.");
      router.push("/admin/certificates");
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
      <div className="relative overflow-hidden rounded-[30px] sm:rounded-[34px] border border-white/20 bg-slate-950/40 backdrop-blur-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.25)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 -left-10 w-36 h-36 rounded-3xl bg-gradient-to-br from-[#FF5E3A]/30 to-[#FF2A54]/25 blur-2xl z-0"
        />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-orbitron text-[9px] font-bold text-orange-400 tracking-widest uppercase">
                // CREDENTIAL STUDIO // 「認定管理」
              </span>
              <span className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-orange-500 to-rose-600 text-white font-orbitron text-[9px] font-black uppercase tracking-wider shadow-[0_2px_10px_rgba(249,115,22,0.4)]">
                {mode === "create" ? "NEW CREDENTIAL" : "EDIT CREDENTIAL"}
              </span>
            </div>

            <h1 className="font-orbitron text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">
              {mode === "create" ? "REGISTER CERTIFICATE" : "UPDATE CERTIFICATE DETAILS"}
            </h1>

            <p className="mt-2 font-rajdhani text-sm sm:text-base font-semibold text-stone-300">
              {mode === "create"
                ? "Register a new certification, exam credential, or professional license."
                : `Update certification parameters and metadata for ${initialData?.title || "this credential"}.`}
            </p>
          </div>

          <div className="text-stone-500 font-mono text-xs hidden sm:block tracking-widest self-start">
            · · ·
          </div>
        </div>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 sm:space-y-8"
        >
          <CertificateBasic />
          <CertificateDetails />
          <CertificateDescription />
          <CertificateSkills />
          <CertificatePublishing />

          <div className="rounded-[28px] border border-white/20 bg-slate-950/40 backdrop-blur-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.25)]">
            <FormActions
              mode={mode}
              entity="Certificate"
              isSubmitting={isSubmitting}
              onDelete={mode === "edit" ? handleDelete : undefined}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
