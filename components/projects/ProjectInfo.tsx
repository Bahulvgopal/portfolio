"use client";

import { motion } from "framer-motion";
import {
  HiCalendar,
  HiClock,
  HiUser,
  HiCollection,
} from "react-icons/hi";
import type { Project } from "@/types/project";

interface Props {
  project: Project;
}

const stats = (project: Project) => [
  {
    icon: <HiUser className="h-5 w-5" />,
    label: "Role",
    value: project.role || "Not specified",
  },
  {
    icon: <HiCollection className="h-5 w-5" />,
    label: "Category",
    value: project.category || "Other",
  },
  {
    icon: <HiUser className="h-5 w-5" />,
    label: "Project Type",
    value: project.projectType || "Individual",
  },
  {
    icon: <HiClock className="h-5 w-5" />,
    label: "Duration",
    value: project.duration || "—",
  },
  {
    icon: <HiCalendar className="h-5 w-5" />,
    label: "Year",
    value: project.year || "—",
  },
];

export default function ProjectInfo({ project }: Props) {
  return (
    <section className="mb-24">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-8 text-3xl font-bold text-white">
          Project Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {stats(project).map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-300 hover:border-sky-500/40 hover:bg-white/[0.05]"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400">
                {item.icon}
              </div>

              <p className="text-sm uppercase tracking-widest text-neutral-500">
                {item.label}
              </p>

              <h3 className="mt-2 text-lg font-semibold text-white">
                {item.value}
              </h3>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}