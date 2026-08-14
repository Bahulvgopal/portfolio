"use client";

import { useEffect, useState } from "react";

import { api } from "@/lib/api";
import { Project } from "@/types/project";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const data = await api<Project[]>("/api/projects");
      setProjects(data);
    } finally {
      setLoading(false);
    }
  }

  function removeProject(id: string) {
    setProjects((prev) =>
      prev.filter((project) => project._id !== id)
    );
  }

  return {
    projects,
    loading,
    loadProjects,
    removeProject,
  };
}