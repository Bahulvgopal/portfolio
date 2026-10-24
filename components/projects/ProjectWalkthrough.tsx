"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiComputerDesktop,
  HiDevicePhoneMobile,
  HiDeviceTablet,
  HiChevronLeft,
  HiChevronRight,
  HiXMark,
  HiArrowsPointingOut,
} from "react-icons/hi2";
import type { Project } from "@/types/project";

interface Props {
  project: Project;
}

const deviceIcons = {
  desktop: <HiComputerDesktop className="w-4 h-4" />,
  tablet: <HiDeviceTablet className="w-4 h-4" />,
  mobile: <HiDevicePhoneMobile className="w-4 h-4" />,
};

export default function ProjectWalkthrough({ project }: Props) {
  const walkthrough = [...(project.walkthrough ?? [])].sort(
    (a, b) => a.order - b.order
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  // Keyboard navigation for active step and modal
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setModalOpen(false);
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % walkthrough.length);
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev - 1 + walkthrough.length) % walkthrough.length);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [walkthrough.length]);

  if (walkthrough.length === 0) return null;

  const currentStep = walkthrough[activeIndex] || walkthrough[0];

  return (
    <section className="mb-24 pt-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-orbitron text-[10px] font-bold text-orange-600 tracking-wider uppercase">
              // BUILD MILESTONES // 「設計工程」
            </span>
          </div>

          <h2 className="font-manga text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-wide uppercase leading-none">
            MISSION{" "}
            <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 bg-clip-text text-transparent">
              WALKTHROUGH
            </span>
          </h2>
        </div>

        <p className="font-rajdhani text-sm sm:text-base font-medium text-stone-600 max-w-md">
          Click any milestone thumbnail to focus and grow the visual breakdown, system viewport, and technical notes.
        </p>
      </div>

      {/* Main Interactive Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================================================================= */}
        {/* LEFT: Compact Vertical Thumbnails Strip (4 cols)                  */}
        {/* ================================================================= */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="flex items-center justify-between px-2 mb-1">
            <span className="font-orbitron text-[10px] font-bold text-stone-500 tracking-widest uppercase">
              PHASES ({walkthrough.length})
            </span>
            <span className="font-mono text-[10px] text-orange-600 font-bold">
              0{activeIndex + 1} / 0{walkthrough.length}
            </span>
          </div>

          <div className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 no-scrollbar">
            {walkthrough.map((step, idx) => {
              const isActive = idx === activeIndex;

              return (
                <button
                  key={step.order || idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`
                    group relative text-left rounded-2xl p-2.5 sm:p-3 transition-all duration-300
                    flex items-center gap-3 shrink-0 lg:shrink w-[240px] sm:w-[260px] lg:w-full
                    border cursor-pointer
                    ${
                      isActive
                        ? "bg-white/95 backdrop-blur-2xl border-orange-500 shadow-[0_8px_25px_rgba(234,88,12,0.18)] scale-[1.02] z-10"
                        : "bg-white/60 backdrop-blur-xl border-white/80 hover:border-orange-500/40 hover:bg-white/80 shadow-xs"
                    }
                  `}
                >
                  {/* Left Laser Bar for Active Step */}
                  {isActive && (
                    <motion.div
                      layoutId="activeLaserBar"
                      className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-gradient-to-b from-orange-500 to-amber-500"
                    />
                  )}

                  {/* Thumbnail Image */}
                  <div className="relative w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden bg-stone-900 border border-stone-200/80 shrink-0">
                    {step.image?.url ? (
                      <Image
                        src={step.image.url}
                        alt={step.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-orbitron text-xs font-bold text-stone-500 bg-stone-950">
                        P_0{idx + 1}
                      </div>
                    )}
                  </div>

                  {/* Title & Phase Meta */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className={`font-orbitron text-[9px] font-bold tracking-wider ${isActive ? "text-orange-600" : "text-stone-400"}`}>
                        PHASE_{String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h4 className={`font-rajdhani text-sm sm:text-base font-bold truncate leading-tight ${isActive ? "text-stone-900" : "text-stone-700 group-hover:text-stone-900"}`}>
                      {step.title}
                    </h4>

                    {step.device && (
                      <span className="text-[10px] font-mono text-stone-400 capitalize flex items-center gap-1 mt-0.5">
                        {deviceIcons[step.device as keyof typeof deviceIcons]}
                        <span>{step.device}</span>
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* RIGHT: Focused "Grown In" Visual Showcase (8 cols)                 */}
        {/* ================================================================= */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.order || activeIndex}
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="
                relative overflow-hidden
                rounded-[34px] sm:rounded-[38px]
                p-3 sm:p-4
                bg-white/50 backdrop-blur-2xl
                border border-white/85
                shadow-[0_20px_50px_rgba(0,0,0,0.06),inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(0,0,0,0.04)]
                flex flex-col gap-3
              "
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 z-30 opacity-80" />

              {/* 1. TOP COMPARTMENT (Image Screen with Click to Grow) */}
              <div
                onClick={() => setModalOpen(true)}
                className="
                  group/screen relative w-full aspect-[16/10] overflow-hidden
                  rounded-[24px] sm:rounded-[28px]
                  bg-stone-950 border border-white/70 shadow-inner
                  cursor-zoom-in select-none
                "
              >
                {currentStep.image?.url ? (
                  <>
                    <Image
                      src={currentStep.image.url}
                      alt={currentStep.title}
                      fill
                      className="object-contain transition-transform duration-700 ease-out group-hover/screen:scale-105"
                      sizes="(max-width: 1024px) 100vw, 800px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300" />
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-stone-900 to-stone-950">
                    <span className="font-manga text-4xl text-orange-500 tracking-wider">
                      PHASE 0{activeIndex + 1}
                    </span>
                    <span className="font-rajdhani text-sm text-stone-400 mt-2">
                      No screenshot uploaded for this step
                    </span>
                  </div>
                )}

                {/* Top Overlay Badge */}
                <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-white border border-white/20 font-orbitron text-[10px] font-bold tracking-wider uppercase shadow-xs">
                    STEP {String(activeIndex + 1).padStart(2, "0")} OF {String(walkthrough.length).padStart(2, "0")}
                  </span>
                  {currentStep.device && (
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-stone-800 font-orbitron text-[9px] font-bold tracking-wider uppercase shadow-xs flex items-center gap-1.5">
                      {deviceIcons[currentStep.device as keyof typeof deviceIcons]}
                      <span>{currentStep.device} VIEWPORT</span>
                    </span>
                  )}
                </div>

                {/* Grow In / Expand Button Overlay */}
                <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-stone-800 border border-white/90 font-orbitron text-[10px] font-bold uppercase tracking-wider shadow-md opacity-0 group-hover/screen:opacity-100 transition-opacity duration-200">
                  <HiArrowsPointingOut className="w-3.5 h-3.5 text-orange-600" />
                  <span>CLICK TO EXPAND FULLSCREEN</span>
                </div>
              </div>

              {/* 2. BOTTOM COMPARTMENT (Details & Step Controls) */}
              <div className="
                rounded-[20px] sm:rounded-[24px]
                bg-gradient-to-b from-white/80 via-white/70 to-white/75
                backdrop-blur-xl border border-white/85
                p-5 sm:p-6
                shadow-[inset_0_2px_4px_rgba(255,255,255,0.98)]
              ">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <span className="font-orbitron text-[10px] font-bold text-orange-600 tracking-wider uppercase mb-1 block">
                      // PHASE_0{activeIndex + 1} SPECIFICATIONS
                    </span>

                    <h3 className="font-rajdhani text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                      {currentStep.title}
                    </h3>

                    {currentStep.description && (
                      <p className="mt-3 font-rajdhani text-base font-medium text-stone-600 leading-relaxed">
                        {currentStep.description}
                      </p>
                    )}
                  </div>

                  {/* Previous / Next Phase Control Deck */}
                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 pt-1">
                    <button
                      onClick={() =>
                        setActiveIndex((prev) => (prev - 1 + walkthrough.length) % walkthrough.length)
                      }
                      title="Previous Step"
                      aria-label="Previous Step"
                      className="p-2.5 rounded-xl bg-white/90 border border-stone-200/90 text-stone-700 hover:text-orange-600 hover:border-orange-500 shadow-xs transition-colors"
                    >
                      <HiChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() =>
                        setActiveIndex((prev) => (prev + 1) % walkthrough.length)
                      }
                      title="Next Step"
                      aria-label="Next Step"
                      className="p-2.5 rounded-xl bg-white/90 border border-stone-200/90 text-stone-700 hover:text-orange-600 hover:border-orange-500 shadow-xs transition-colors"
                    >
                      <HiChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 3. FULLSCREEN CINEMATIC GROW-IN MODAL LIGHTBOX                      */}
      {/* =================================================================== */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-xl"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="
                relative max-w-5xl w-full max-h-[92vh] overflow-hidden
                rounded-[32px] sm:rounded-[38px]
                bg-[#121214] border border-white/20
                shadow-2xl flex flex-col
              "
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
                <div className="flex items-center gap-2.5">
                  <span className="font-orbitron text-xs font-bold text-orange-400 tracking-wider">
                    PHASE 0{activeIndex + 1} OF 0{walkthrough.length}
                  </span>
                  <span className="text-stone-600 text-xs">|</span>
                  <span className="font-rajdhani text-sm sm:text-base font-bold text-white truncate max-w-md">
                    {currentStep.title}
                  </span>
                </div>

                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors"
                >
                  <HiXMark className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Full-Screen Image Container */}
              <div className="relative flex-1 min-h-[400px] max-h-[65vh] w-full bg-black flex items-center justify-center p-4">
                {currentStep.image?.url && (
                  <Image
                    src={currentStep.image.url}
                    alt={currentStep.title}
                    width={1800}
                    height={1100}
                    className="max-h-[60vh] w-auto max-w-full object-contain"
                  />
                )}
              </div>

              {/* Modal Bottom Caption */}
              <div className="px-6 py-4 border-t border-white/10 bg-[#17171a] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="font-rajdhani text-sm text-stone-300 leading-relaxed max-w-3xl">
                  {currentStep.description}
                </p>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() =>
                      setActiveIndex((prev) => (prev - 1 + walkthrough.length) % walkthrough.length)
                    }
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <HiChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-orbitron text-xs text-stone-400">
                    0{activeIndex + 1} / 0{walkthrough.length}
                  </span>
                  <button
                    onClick={() =>
                      setActiveIndex((prev) => (prev + 1) % walkthrough.length)
                    }
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <HiChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
