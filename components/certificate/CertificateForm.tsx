"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FormProvider,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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

  const methods =
    useForm<CertificateFormData>({
      resolver: zodResolver(
        certificateSchema
      ),

      defaultValues: {
        title:
          initialData?.title ?? "",

        issuer:
          initialData?.issuer ?? "",

        credentialId:
          initialData?.credentialId ??
          "",

        credentialUrl:
          initialData?.credentialUrl ??
          "",

        issueDate: formatDate(
          initialData?.issueDate
        ),

        expiryDate: formatDate(
          initialData?.expiryDate
        ),

        doesNotExpire:
          initialData?.doesNotExpire ??
          true,

        description:
          initialData?.description ??
          "",

        skills:
  initialData?.skills?.map((skill) => ({
    value: skill,
  })) ?? [],

        logo:
          initialData?.logo,

        order:
          initialData?.order ?? 0,

        status:
          initialData?.status ??
          "published",
      },
    });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: {
      isSubmitting,
    },
  } = methods;

  useEffect(() => {
    if (
      watch("doesNotExpire")
    ) {
      setValue("expiryDate", "");
    }
  }, [
    watch("doesNotExpire"),
    setValue,
  ]);

  async function onSubmit(
    data: CertificateFormData
  ) {
    try {
      const endpoint =
        mode === "create"
          ? "/api/certificates"
          : `/api/certificates/${initialData!._id}`;
          
          const payload = {
    ...data,
    skills: data.skills.map((skill) => skill.value),
    };

      const response =
        await fetch(endpoint, {
          method:
            mode === "create"
              ? "POST"
              : "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },


body: JSON.stringify(payload),
        });

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message
        );
      }

      toast.success(
        mode === "create"
          ? "Certificate created."
          : "Certificate updated."
      );

      router.push(
        "/admin/certificates"
      );
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    }
  }

  async function handleDelete() {
    if (!initialData?._id)
      return;

    if (
      !confirm(
        "Delete this certificate?"
      )
    )
      return;

    try {
      const response =
        await fetch(
          `/api/certificates/${initialData._id}`,
          {
            method: "DELETE",
          }
        );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message
        );
      }

      toast.success(
        "Certificate deleted."
      );

      router.push(
        "/admin/certificates"
      );

      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    }
  }

  return (
    <FormProvider
      {...methods}
    >
      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className="space-y-8 rounded-2xl border border-slate-800 bg-slate-950 p-6"
      >
        <CertificateBasic />

        <CertificateDetails />

        <CertificateDescription />

        <CertificateSkills />

        <CertificatePublishing />

        <FormActions
          mode={mode}
          entity="Certificate"
          isSubmitting={
            isSubmitting
          }
          onDelete={
            mode === "edit"
              ? handleDelete
              : undefined
          }
        />
      </form>
    </FormProvider>
  );
}