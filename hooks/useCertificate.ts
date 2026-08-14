"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import type { Certificate } from "@/types/certificate";

export function useCertificate() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchCertificates() {
    try {
      setLoading(true);

      const response = await fetch("/api/certificates");

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message);
      }

      setCertificates(result.data);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load certificates."
      );
    } finally {
      setLoading(false);
    }
  }

  function removeCertificate(id: string) {
    setCertificates((prev) =>
      prev.filter((certificate) => certificate._id !== id)
    );
  }

  function addCertificate(certificate: Certificate) {
    setCertificates((prev) => [certificate, ...prev]);
  }

  function updateCertificate(updated: Certificate) {
    setCertificates((prev) =>
      prev.map((certificate) =>
        certificate._id === updated._id
          ? updated
          : certificate
      )
    );
  }

  useEffect(() => {
    fetchCertificates();
  }, []);

  return {
    certificates,
    loading,
    fetchCertificates,
    removeCertificate,
    addCertificate,
    updateCertificate,
  };
}