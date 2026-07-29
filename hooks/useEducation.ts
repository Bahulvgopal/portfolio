"use client";

import { useEffect, useState } from "react";

import { api } from "@/lib/api";
import { Education } from "@/types/education";

export function useEducation() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEducations();
  }, []);

  async function loadEducations() {
    try {
      const data = await api<Education[]>("/api/education");
      setEducations(data);
    } finally {
      setLoading(false);
    }
  }

  function removeEducation(id: string) {
    setEducations((prev) =>
      prev.filter((education) => education._id !== id)
    );
  }

  return {
    educations,
    loading,
    loadEducations,
    removeEducation,
  };
}