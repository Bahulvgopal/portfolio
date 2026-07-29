"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import type { Skill } from "@/types/skill";

export function useSkill() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchSkills() {
    try {
      setLoading(true);

      const response = await fetch("/api/skills");
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message);
      }

      setSkills(result.data);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load skills."
      );
    } finally {
      setLoading(false);
    }
  }

  function addSkill(skill: Skill) {
    setSkills((prev) => [skill, ...prev]);
  }

  function updateSkill(updated: Skill) {
    setSkills((prev) =>
      prev.map((skill) =>
        skill._id === updated._id ? updated : skill
      )
    );
  }

  function removeSkill(id: string) {
    setSkills((prev) =>
      prev.filter((skill) => skill._id !== id)
    );
  }

  useEffect(() => {
    fetchSkills();
  }, []);

  return {
    skills,
    loading,
    fetchSkills,
    addSkill,
    updateSkill,
    removeSkill,
  };
}