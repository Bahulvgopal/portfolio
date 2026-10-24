"use client";

import { motion } from "framer-motion";
import {
  HiCalendar,
  HiClock,
  HiUser,
  HiRectangleStack,
  HiCheck,
  HiCpuChip,
} from "react-icons/hi2";
import { FiCpu, FiAlertTriangle, FiCheckCircle, FiBookOpen, FiLayers } from "react-icons/fi";
import type { Project } from "@/types/project";

interface Props {
  project: Project;
}

const stats = (project: Project) => [
  {
    icon: <HiUser className="h-5 w-5" />,
    label: "Role",
    value: project.role || "Full-Stack Dev",
  },
  {
    icon: <HiRectangleStack className="h-5 w-5" />,
    label: "Category",
    value: project.category || "Web",
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
    value: project.year || "2024",
  },
];

export default function ProjectInfo({ project }: Props) {
  return (
    <section className="mb-24 space-y-16">
      {/* =================================================================== */}
      {/* 1. SYSTEM TELEMETRY PODS                                            */}
      {/* =================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <span className="font-orbitron text-[10px] font-bold text-orange-600 tracking-wider uppercase">
            // SYSTEM TELEMETRY //
          </span>
          <span className="font-manga text-2xl sm:text-3xl text-stone-900 tracking-wide uppercase">
            SPECIFICATIONS &amp; CLASSIFICATION
          </span>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-5">
          {stats(project).map((item) => (
            <div
              key={item.label}
              className="
                rounded-[28px] border border-white/90 bg-white/70 backdrop-blur-2xl p-5 sm:p-6
                shadow-[0_10px_30px_rgba(234,88,12,0.05),inset_0_1px_2px_rgba(255,255,255,0.95)]
                transition-all duration-300 hover:border-orange-500/40 hover:shadow-[0_16px_40px_rgba(234,88,12,0.15)] hover:-translate-y-1
                flex flex-col justify-between
              "
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-600 shadow-xs">
                {item.icon}
              </div>

              <div>
                <p className="font-orbitron text-[9px] font-bold uppercase tracking-widest text-stone-500 mb-1">
                  {item.label}
                </p>

                <h3 className="font-rajdhani text-lg sm:text-xl font-bold text-stone-900 leading-tight">
                  {item.value}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* =================================================================== */}
      {/* 2. SYSTEM ARCHITECTURE (If provided)                                */}
      {/* =================================================================== */}
      {project.architecture?.trim() && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="
            rounded-[32px] sm:rounded-[36px]
            p-6 sm:p-8
            bg-white/70 backdrop-blur-2xl
            border border-white/90
            shadow-[0_16px_40px_rgba(234,88,12,0.06),inset_0_2px_4px_rgba(255,255,255,0.95)]
            relative overflow-hidden
          "
        >
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 opacity-80" />

          <div className="flex items-center gap-2 mb-3">
            <span className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-600">
              <FiCpu className="w-4 h-4" />
            </span>
            <span className="font-orbitron text-[10px] font-bold tracking-widest text-orange-600 uppercase">
              // ARCHITECTURE // 「設計構成」
            </span>
          </div>

          <h2 className="font-manga text-2xl sm:text-3xl text-stone-900 tracking-wide uppercase mb-4">
            SYSTEM ARCHITECTURE &amp; DESIGN
          </h2>

          <p className="font-rajdhani text-base sm:text-lg font-medium text-stone-700 leading-relaxed">
            {project.architecture}
          </p>
        </motion.div>
      )}

      {/* =================================================================== */}
      {/* 3. THE PROBLEM & THE SOLUTION (Side-by-Side)                         */}
      {/* =================================================================== */}
      {(project.problem?.trim() || project.solution?.trim()) && (
        <div className="grid md:grid-cols-2 gap-6">
          {project.problem?.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="
                rounded-[32px] p-6 sm:p-8
                bg-white/70 backdrop-blur-2xl
                border border-white/90
                shadow-[0_14px_35px_rgba(0,0,0,0.04),inset_0_2px_4px_rgba(255,255,255,0.95)]
              "
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="p-1.5 rounded-lg bg-red-500/10 text-red-600">
                  <FiAlertTriangle className="w-4 h-4" />
                </span>
                <span className="font-orbitron text-[10px] font-bold tracking-widest text-red-600 uppercase">
                  THE CHALLENGE // 「課題」
                </span>
              </div>

              <h3 className="font-manga text-2xl text-stone-900 uppercase mb-3">
                THE PROBLEM
              </h3>

              <p className="font-rajdhani text-base font-medium text-stone-600 leading-relaxed">
                {project.problem}
              </p>
            </motion.div>
          )}

          {project.solution?.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="
                rounded-[32px] p-6 sm:p-8
                bg-white/70 backdrop-blur-2xl
                border border-white/90
                shadow-[0_14px_35px_rgba(0,0,0,0.04),inset_0_2px_4px_rgba(255,255,255,0.95)]
              "
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600">
                  <FiCheckCircle className="w-4 h-4" />
                </span>
                <span className="font-orbitron text-[10px] font-bold tracking-widest text-emerald-600 uppercase">
                  THE RESOLUTION // 「解決策」
                </span>
              </div>

              <h3 className="font-manga text-2xl text-stone-900 uppercase mb-3">
                THE ENGINEERING SOLUTION
              </h3>

              <p className="font-rajdhani text-base font-medium text-stone-600 leading-relaxed">
                {project.solution}
              </p>
            </motion.div>
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* 4. KEY CHALLENGES & LEARNINGS                                       */}
      {/* =================================================================== */}
      {(project.challenges?.trim() || project.learnings?.trim()) && (
        <div className="grid md:grid-cols-2 gap-6">
          {project.challenges?.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="
                rounded-[32px] p-6 sm:p-8
                bg-white/70 backdrop-blur-2xl
                border border-white/90
                shadow-[0_14px_35px_rgba(0,0,0,0.04),inset_0_2px_4px_rgba(255,255,255,0.95)]
              "
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="p-1.5 rounded-lg bg-orange-500/10 text-orange-600">
                  <FiCpu className="w-4 h-4" />
                </span>
                <span className="font-orbitron text-[10px] font-bold tracking-widest text-orange-600 uppercase">
                  HURDLES SOLVED // 「技術的挑戦」
                </span>
              </div>

              <h3 className="font-manga text-2xl text-stone-900 uppercase mb-3">
                KEY TECHNICAL CHALLENGES
              </h3>

              <p className="font-rajdhani text-base font-medium text-stone-600 leading-relaxed">
                {project.challenges}
              </p>
            </motion.div>
          )}

          {project.learnings?.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="
                rounded-[32px] p-6 sm:p-8
                bg-white/70 backdrop-blur-2xl
                border border-white/90
                shadow-[0_14px_35px_rgba(0,0,0,0.04),inset_0_2px_4px_rgba(255,255,255,0.95)]
              "
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600">
                  <FiBookOpen className="w-4 h-4" />
                </span>
                <span className="font-orbitron text-[10px] font-bold tracking-widest text-amber-600 uppercase">
                  TAKEAWAYS // 「学び」
                </span>
              </div>

              <h3 className="font-manga text-2xl text-stone-900 uppercase mb-3">
                KEY LEARNINGS &amp; GROWTH
              </h3>

              <p className="font-rajdhani text-base font-medium text-stone-600 leading-relaxed">
                {project.learnings}
              </p>
            </motion.div>
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* 5. KEY FEATURES CHECKLIST                                           */}
      {/* =================================================================== */}
      {project.features && project.features.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="
            rounded-[32px] sm:rounded-[36px]
            p-6 sm:p-8
            bg-white/70 backdrop-blur-2xl
            border border-white/90
            shadow-[0_16px_40px_rgba(234,88,12,0.05),inset_0_2px_4px_rgba(255,255,255,0.95)]
          "
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-orange-500/10 text-orange-600">
              <FiLayers className="w-4 h-4" />
            </span>
            <span className="font-orbitron text-[10px] font-bold tracking-widest text-orange-600 uppercase">
              CAPABILITIES // 「機能一覧」
            </span>
          </div>

          <h3 className="font-manga text-2xl sm:text-3xl text-stone-900 uppercase mb-6">
            CORE PRODUCT FEATURES
          </h3>

          <div className="grid sm:grid-cols-2 gap-3.5">
            {project.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/80 border border-stone-200/80 shadow-2xs"
              >
                <span className="w-5 h-5 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                  <HiCheck className="w-3.5 h-3.5" />
                </span>
                <span className="font-rajdhani text-base font-semibold text-stone-800">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* =================================================================== */}
      {/* 6. TECH ARSENAL MATRIX                                              */}
      {/* =================================================================== */}
      {project.tech && project.tech.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="
            rounded-[32px] sm:rounded-[36px]
            p-6 sm:p-8
            bg-white/70 backdrop-blur-2xl
            border border-white/90
            shadow-[0_16px_40px_rgba(234,88,12,0.05),inset_0_2px_4px_rgba(255,255,255,0.95)]
          "
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="font-orbitron text-[10px] font-bold tracking-widest text-orange-600 uppercase">
              // ARSENAL // 「技術スタック」
            </span>
          </div>

          <h3 className="font-manga text-2xl sm:text-3xl text-stone-900 uppercase mb-6">
            TECHNOLOGIES EMPLOYED
          </h3>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="
                  px-4 py-2 rounded-xl
                  font-orbitron text-xs font-semibold
                  bg-white/90 backdrop-blur-sm
                  border border-stone-200/90
                  text-stone-800
                  hover:border-orange-500/40 hover:text-orange-600
                  shadow-xs transition-colors
                "
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
