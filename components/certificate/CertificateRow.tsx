"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import type { Certificate } from "@/types/certificate";

interface Props {
  certificate: Certificate;
  onDelete: (id: string) => void;
}

function formatDate(date?: string | Date) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function CertificateRow({
  certificate,
  onDelete,
}: Props) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (
      !window.confirm(
        `Delete "${certificate.title}"? This can't be undone.`
      )
    ) {
      return;
    }

    try {
      setDeleting(true);

      const response = await fetch(
        `/api/certificates/${certificate._id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message);
      }

      toast.success("Certificate deleted.");

      onDelete(certificate._id);
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

  const isPublished = certificate.status === "published";

  return (
    <tr className="border-b border-white/[0.05] transition-colors duration-150 last:border-b-0 hover:bg-white/[0.025]">
      <td className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.04]">
            {certificate.logo?.url ? (
              <Image
                src={certificate.logo.url}
                alt={certificate.title}
                fill
                sizes="48px"
                className="object-cover"
              />
            ) : (
              <Award
                size={20}
                className="text-neutral-500"
              />
            )}
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-medium text-white">
              {certificate.title}
            </h3>

            {certificate.credentialId && (
              <p className="mt-0.5 truncate text-xs text-neutral-500">
                ID: {certificate.credentialId}
              </p>
            )}
          </div>
        </div>
      </td>

      <td className="p-4 text-sm text-neutral-300">
        {certificate.issuer}
      </td>

      <td className="p-4 text-sm text-neutral-400">
        {formatDate(certificate.issueDate)}
      </td>

      <td className="p-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
            isPublished
              ? "border-emerald-500/20 bg-emerald-400/10 text-emerald-400"
              : "border-amber-500/20 bg-amber-400/10 text-amber-400"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isPublished ? "bg-emerald-400" : "bg-amber-400"
            }`}
          />
          {certificate.status}
        </span>
      </td>

      <td className="p-4">
        <div className="flex items-center gap-1">
          <Link
            href={`/admin/certificates/${certificate._id}`}
            className="rounded-lg p-2 text-neutral-400 transition-colors duration-150 hover:bg-white/[0.06] hover:text-sky-400"
            aria-label={`Edit ${certificate.title}`}
          >
            <Pencil size={16} />
          </Link>

          <button
            disabled={deleting}
            onClick={handleDelete}
            aria-label={`Delete ${certificate.title}`}
            className="rounded-lg p-2 text-neutral-400 transition-colors duration-150 hover:bg-white/[0.06] hover:text-rose-400 disabled:opacity-50"
          >
            {deleting ? (
              <Loader2
                size={16}
                className="animate-spin"
              />
            ) : (
              <Trash2 size={16} />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
}