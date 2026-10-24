"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, X, Mail, ChevronLeft } from "lucide-react";
import {
  SiGithub,
  SiInstagram,
  SiX,
  SiDiscord,
  SiYoutube,
} from "react-icons/si";
import { FaLinkedin, FaGlobe, FaWhatsapp } from "react-icons/fa";
import { Profile } from "@/types/profile";

interface SocialDialProps {
  profile?: Profile;
}

interface SocialItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  accentColor: string;
  glowColor: string;
  bgGradient: string;
  borderActive: string;
}

export default function SocialDial({ profile }: SocialDialProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSlidIn, setIsSlidIn] = useState(false); // Slid into right edge
  const [activeIndex, setActiveIndex] = useState(3); // Default Instagram
  const [dragOffset, setDragOffset] = useState(0);

  const dialRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Swipe gesture tracking
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const hasMovedRef = useRef(false);

  // 5-second Auto-hide into the side edge when idle
  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (!isOpen) {
      idleTimerRef.current = setTimeout(() => {
        setIsSlidIn(true);
      }, 5000); // 5 seconds
    }
  }, [isOpen]);

  // Restart timer on mount and when isOpen or isSlidIn changes
  useEffect(() => {
    if (!isSlidIn && !isOpen) {
      resetIdleTimer();
    }
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [resetIdleTimer, isOpen, isSlidIn]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        resetIdleTimer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [resetIdleTimer]);

  // 9 Social Items
  const socials: SocialItem[] = [
    {
      id: "github",
      label: "GitHub",
      href: profile?.socials?.github || "https://github.com/Bahulvgopal",
      icon: SiGithub,
      accentColor: "#0f172a",
      glowColor: "rgba(15, 23, 42, 0.4)",
      bgGradient:
        "radial-gradient(circle at 35% 30%, #334155 0%, #1e293b 55%, #0f172a 100%)",
      borderActive: "rgba(255, 255, 255, 0.85)",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href:
        profile?.socials?.linkedin ||
        "https://www.linkedin.com/in/bahul-v-gopal-b7493b280",
      icon: FaLinkedin,
      accentColor: "#0284c7",
      glowColor: "rgba(2, 132, 199, 0.5)",
      bgGradient:
        "radial-gradient(circle at 35% 30%, #0284c7 0%, #0369a1 55%, #082f49 100%)",
      borderActive: "rgba(56, 189, 248, 0.85)",
    },
    {
      id: "discord",
      label: "Discord",
      href: "https://discord.com",
      icon: SiDiscord,
      accentColor: "#6366f1",
      glowColor: "rgba(99, 102, 241, 0.5)",
      bgGradient:
        "radial-gradient(circle at 35% 30%, #6366f1 0%, #4f46e5 55%, #1e1b4b 100%)",
      borderActive: "rgba(129, 140, 248, 0.85)",
    },
    {
      id: "instagram",
      label: "Instagram",
      href: profile?.socials?.instagram || "https://www.instagram.com/_.bahul_",
      icon: SiInstagram,
      accentColor: "#e11d48",
      glowColor: "rgba(225, 29, 72, 0.5)",
      bgGradient:
        "radial-gradient(circle at 35% 30%, #fb7185 0%, #c026d3 50%, #4a044e 100%)",
      borderActive: "rgba(244, 63, 94, 0.9)",
    },
    {
      id: "x",
      label: "X (Twitter)",
      href: profile?.socials?.twitter || "https://x.com/bahulvgopal",
      icon: SiX,
      accentColor: "#0f172a",
      glowColor: "rgba(15, 23, 42, 0.4)",
      bgGradient:
        "radial-gradient(circle at 35% 30%, #334155 0%, #1e293b 55%, #020617 100%)",
      borderActive: "rgba(255, 255, 255, 0.85)",
    },
    {
      id: "youtube",
      label: "YouTube",
      href: profile?.socials?.youtube || "https://youtube.com",
      icon: SiYoutube,
      accentColor: "#ef4444",
      glowColor: "rgba(239, 68, 68, 0.7)",
      bgGradient:
        "radial-gradient(circle at 35% 30%, #ef4444 0%, #991b1b 55%, #450a0a 100%)",
      borderActive: "rgba(239, 68, 68, 0.85)",
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: "https://wa.me/918075298373",
      icon: FaWhatsapp,
      accentColor: "#22c55e",
      glowColor: "rgba(34, 197, 94, 0.7)",
      bgGradient:
        "radial-gradient(circle at 35% 30%, #22c55e 0%, #15803d 55%, #052e16 100%)",
      borderActive: "rgba(34, 197, 94, 0.85)",
    },
    {
      id: "email",
      label: "Email",
      href: profile?.email ? `mailto:${profile.email}` : "mailto:bahulvgopal@gmail.com",
      icon: Mail,
      accentColor: "#14b8a6",
      glowColor: "rgba(20, 184, 166, 0.7)",
      bgGradient:
        "radial-gradient(circle at 35% 30%, #14b8a6 0%, #0f766e 55%, #134e4a 100%)",
      borderActive: "rgba(20, 184, 166, 0.85)",
    },
    {
      id: "website",
      label: "Portfolio",
      href:
        profile?.socials?.website ||
        profile?.socials?.portfolio ||
        "https://www.bahulvgopal.me",
      icon: FaGlobe,
      accentColor: "#ea580c",
      glowColor: "rgba(234, 88, 12, 0.7)",
      bgGradient:
        "radial-gradient(circle at 35% 30%, #ea580c 0%, #c2410c 55%, #431407 100%)",
      borderActive: "rgba(234, 88, 12, 0.85)",
    },
  ];

  const totalItems = socials.length;
  // 360 deg / 9 items = 40 deg exact uniform spacing between every icon
  const STEP_DEG = 40;
  const APEX_DEG = 180; // 180 deg points directly left into the viewport
  const TRACK_RADIUS = 104;

  // 1. Lock document body scroll when dial is open so website does NOT scroll
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
    };
  }, [isOpen]);

  // 2. Non-passive wheel handler: intercepts wheel event, prevents page scroll, rolls only the dial
  useEffect(() => {
    const el = dialRef.current;
    if (!el || !isOpen) return;

    const handleWheelNative = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.deltaY > 0) {
        setActiveIndex((prev) => (prev + 1) % totalItems);
      } else if (e.deltaY < 0) {
        setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
      }
    };

    const handleTouchMoveNative = (e: TouchEvent) => {
      e.preventDefault();
    };

    el.addEventListener("wheel", handleWheelNative, { passive: false });
    el.addEventListener("touchmove", handleTouchMoveNative, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheelNative);
      el.removeEventListener("touchmove", handleTouchMoveNative);
    };
  }, [isOpen, totalItems]);

  // Swipe / Drag gesture handlers with smooth snapping
  const handlePointerDown = (e: React.PointerEvent) => {
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // fallback
    }
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startYRef.current = e.clientY;
    setDragOffset(0);
    resetIdleTimer();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaY = e.clientY - startYRef.current;
    if (Math.abs(deltaY) > 5) {
      hasMovedRef.current = true;
    }
    setDragOffset(deltaY * 0.35);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      if ((e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      }
    } catch {
      // fallback
    }

    if (hasMovedRef.current) {
      const shift = Math.round(dragOffset / STEP_DEG);
      setActiveIndex((prev) => (prev + shift + totalItems * 100) % totalItems);
    }
    setDragOffset(0);
    resetIdleTimer();
  };

  // Click on the floating button / peeking tab
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // If it was slid into the side, clicking it slides it OUT
    if (isSlidIn) {
      setIsSlidIn(false);
      resetIdleTimer();
      return;
    }

    // If already slid out, toggle dial open/close
    setIsOpen((prev) => !prev);
    resetIdleTimer();
  };

  const targetRotation = APEX_DEG - activeIndex * STEP_DEG;
  // Dragging down (deltaY > 0, dragOffset > 0) decreases angle, moving items visually DOWN on screen
  const effectiveRotation = targetRotation - dragOffset;

  return (
    <>
      {/* Dimmed backdrop when dial is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => {
              setIsOpen(false);
              resetIdleTimer();
            }}
            className="fixed inset-0 z-35 bg-stone-900/20 backdrop-blur-[2px] pointer-events-auto"
          />
        )}
      </AnimatePresence>

      {/* Floating Dial Widget Anchor (Fixed at Right Edge) */}
      <div
        ref={dialRef}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 select-none pointer-events-none"
      >
        {/* Origin point (0, 0) centered on the button at right: 26px */}
        <div
          className="absolute"
          style={{
            right: "26px",
            top: "0px",
          }}
        >
          {/* Semicircular Glass HUD Dial */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.2 }}
                transition={{
                  type: "spring",
                  stiffness: 440,
                  damping: 30,
                  mass: 0.8,
                }}
                className="absolute left-0 top-0 w-0 h-0 pointer-events-auto cursor-grab active:cursor-grabbing touch-none"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
              >
                {/* Full Semicircle Drag / Swipe Touch Hit Surface */}
                <div
                  className="absolute cursor-grab active:cursor-grabbing touch-none"
                  style={{
                    width: "172px",
                    height: "300px",
                    right: "-26px",
                    top: "-150px",
                    borderRadius: "150px 0 0 150px",
                  }}
                />
                {/* Semicircular Glass Plate (Center of all concentric arcs is at 0, 0) */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    width: "172px",
                    height: "300px",
                    right: "-26px", // Extends flush to screen right edge (x = 26)
                    top: "-150px",
                  }}
                >
                  <svg
                    width="172"
                    height="300"
                    viewBox="-146 -150 172 300"
                    fill="none"
                    className="overflow-visible drop-shadow-[0_15px_45px_rgba(234,88,12,0.14)]"
                  >
                    <defs>
                      <linearGradient id="hudGlassBg" x1="26" y1="0" x2="-146" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
                        <stop offset="55%" stopColor="#faf8f5" stopOpacity="0.88" />
                        <stop offset="100%" stopColor="#ffedd5" stopOpacity="0.82" />
                      </linearGradient>
                    </defs>

                    {/* Outer Semicircular Plate (flat diameter at x = 26, flush with screen edge) */}
                    <path
                      d="M 26 -142.6 A 145 145 0 0 0 -145 0 A 145 145 0 0 0 26 142.6 Z"
                      fill="url(#hudGlassBg)"
                      stroke="rgba(255, 255, 255, 0.95)"
                      strokeWidth="1.5"
                      className="filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                    />

                    {/* Inner Concentric Channel Arc (radius 104 centered at 0, 0) */}
                    <path
                      d="M 26 -100.7 A 104 104 0 0 0 -104 0 A 104 104 0 0 0 26 100.7"
                      fill="none"
                      stroke="rgba(234, 88, 12, 0.25)"
                      strokeWidth="1.2"
                      strokeDasharray="3 4"
                    />

                    {/* Inner Cradle Ring Arc (radius 38 centered at 0, 0, wrapping the 52px button) */}
                    <path
                      d="M 26 -27.7 A 38 38 0 0 0 -38 0 A 38 38 0 0 0 26 27.7"
                      fill="none"
                      stroke="rgba(234, 88, 12, 0.35)"
                      strokeWidth="1.4"
                    />

                    {/* Flat straight edge right at screen edge (x = 26) */}
                    <line
                      x1="26"
                      y1="-142.6"
                      x2="26"
                      y2="142.6"
                      stroke="rgba(255, 255, 255, 0.95)"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>

                {/* 9 Social Bubbles along the Arc (Evenly spaced at 40 deg intervals) */}
                {socials.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = idx === activeIndex;

                  // Normalize angle to [0, 360)
                  const rawAngle = (idx * STEP_DEG + effectiveRotation) % 360;
                  const itemAngle = rawAngle < 0 ? rawAngle + 360 : rawAngle;
                  const rad = (itemAngle * Math.PI) / 180;

                  const x = TRACK_RADIUS * Math.cos(rad);
                  const y = TRACK_RADIUS * Math.sin(rad);

                  const angleFromApex = Math.abs(itemAngle - APEX_DEG);
                  const isVisible = angleFromApex < 85;

                  const opacity = isVisible
                    ? Math.max(0.35, 1 - angleFromApex / 90)
                    : 0;

                  if (!isVisible) return null;

                  return (
                    <motion.div
                      key={item.id}
                      className="absolute"
                      style={{
                        left: `${x}px`,
                        top: `${y}px`,
                        transform: "translate(-50%, -50%)",
                        zIndex: isActive ? 30 : 15,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 28,
                      }}
                    >
                      {isActive ? (
                        /* ── ACTIVE / ENLARGED BUBBLE (Pure glass, no top white glint, no text badge) ── */
                        <div className="relative group flex items-center justify-center">
                          {/* Teardrop needle pointing directly towards (0, 0) */}
                          <div
                            className="absolute pointer-events-none"
                            style={{
                              right: "-11px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              width: 0,
                              height: 0,
                              borderTop: "7px solid transparent",
                              borderBottom: "7px solid transparent",
                              borderLeft: `12px solid ${item.borderActive}`,
                              filter: `drop-shadow(0 0 6px ${item.glowColor})`,
                            }}
                          />

                          {/* Enlarged Glowing Balloon Bubble (pure smooth radial gradient) */}
                          <motion.a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={item.label}
                            onClick={(e) => {
                              if (hasMovedRef.current) e.preventDefault();
                            }}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
                            style={{
                              background: item.bgGradient,
                              border: `2px solid ${item.borderActive}`,
                              boxShadow: `0 12px 32px rgba(234, 88, 12, 0.35), 0 4px 12px rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.45), 0 0 22px ${item.glowColor}`,
                            }}
                          >
                            {/* Bold glowing brand icon */}
                            <Icon
                              size={26}
                              className="text-white filter drop-shadow-[0_0_10px_rgba(255,255,255,0.95)]"
                            />
                          </motion.a>
                        </div>
                      ) : (
                        /* ── INACTIVE CHANNEL BUBBLES (Crystal Glassmorphism) ── */
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!hasMovedRef.current) {
                              setActiveIndex(idx);
                            }
                          }}
                          aria-label={`Select ${item.label}`}
                          className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-115 active:scale-95 group"
                          style={{
                            opacity,
                            background:
                              "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 248, 245, 0.88) 60%, rgba(245, 240, 232, 0.82) 100%)",
                            backdropFilter: "blur(16px)",
                            boxShadow: `0 4px 14px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(234, 88, 12, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.95), 0 0 10px ${item.glowColor}`,
                            border: `1.5px solid rgba(255, 255, 255, 0.95)`,
                          }}
                        >
                          <Icon
                            size={16}
                            style={{ color: item.accentColor }}
                            className="transition-transform duration-200 group-hover:scale-110 filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                          />
                        </button>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Center Floating Lens Button: Centered 100% DEAD-CENTER at (0, 0) */}
          <motion.button
            type="button"
            onClick={handleButtonClick}
            aria-label={
              isSlidIn
                ? "Slide out social menu"
                : isOpen
                ? "Close social dial"
                : "Open social dial"
            }
            animate={{
              x: !isOpen && isSlidIn ? "40px" : "0px",
              opacity: 1,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="absolute -left-[26px] -top-[26px] pointer-events-auto w-[52px] h-[52px] rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 group shadow-2xl"
            style={{
              background: isOpen
                ? "linear-gradient(135deg, #EA580C 0%, #C2410C 100%)"
                : "linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.6) 55%, rgba(255, 237, 213, 0.7) 100%)",
              backdropFilter: "blur(24px)",
              boxShadow: isOpen
                ? "0 12px 35px rgba(234, 88, 12, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.55)"
                : "0 10px 30px rgba(234, 88, 12, 0.22), 0 4px 12px rgba(0, 0, 0, 0.06), inset 0 1px 2px rgba(255, 255, 255, 0.95)",
              border: isOpen
                ? "1.6px solid rgba(255, 255, 255, 0.65)"
                : "1.5px solid rgba(255, 255, 255, 0.95)",
            }}
          >
            {/* Peeking Tab Handle Icon when slid into the edge */}
            {!isOpen && isSlidIn ? (
              <div className="absolute left-1.5 flex items-center justify-center text-[#EA580C] animate-pulse">
                <ChevronLeft size={18} className="drop-shadow-[0_0_6px_rgba(234,88,12,0.6)]" />
              </div>
            ) : (
              <>
                {/* Pulsing ambient ring when closed and slid out */}
                {!isOpen && (
                  <span className="absolute -inset-1 rounded-full border border-orange-500/35 animate-pulse pointer-events-none" />
                )}

                {/* Morphing Icon between Share & X */}
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.div
                        key="dial-x-icon"
                        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        transition={{ type: "spring", stiffness: 450, damping: 28 }}
                        className="flex items-center justify-center"
                      >
                        <X
                          size={20}
                          className="text-white filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="dial-share-icon"
                        initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        transition={{ type: "spring", stiffness: 450, damping: 28 }}
                        className="flex items-center justify-center"
                      >
                        <Share2
                          size={19}
                          className="text-[#EA580C] group-hover:scale-105 transition-transform filter drop-shadow-[0_1px_3px_rgba(234,88,12,0.3)]"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </>
  );
}