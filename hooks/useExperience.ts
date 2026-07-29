"use client";

import { useEffect, useState } from "react";

import { api } from "@/lib/api";
import { Experience } from "@/types/experience";

export function useExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExperiences();
  }, []);

  async function loadExperiences() {
    try {
      const data = await api<Experience[]>("/api/experience");
      setExperiences(data);
    } finally {
      setLoading(false);
    }
  }

  function removeExperience(id: string) {
    setExperiences((prev) =>
      prev.filter((experience) => experience._id !== id)
    );
  }

  return {
    experiences,
    loading,
    loadExperiences,
    removeExperience,
  };
}