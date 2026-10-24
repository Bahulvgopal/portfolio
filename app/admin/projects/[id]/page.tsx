"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import Loader from "@/components/ui/Loader";
import EmptyState from "@/components/ui/EmptyState";
import ProjectForm from "@/components/projects/ProjectForm";
import type { Project } from "@/types/project";

export default function EditProjectPage() {
  const params = useParams();
  const id = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/projects/${id}`);
        const result = await res.json();

        if (!res.ok || !result.success) {
          throw new Error(result.message || "Failed to fetch project.");
        }

        setProject(result.data);
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error ? error.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!project) {
    return (
      <EmptyState
        title="Project Not Found"
        description="The requested project does not exist."
      />
    );
  }

  return <ProjectForm mode="edit" initialData={project} />;
}
