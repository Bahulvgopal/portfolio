"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const FULL_NAME = "BAHUL V GOPAL";
const JAP_NAME = "バフル・V・ゴパル // 居合斬り・紙裂";

// Precise interlocking jagged horizontal torn paper coordinates along y = 50%
const TOP_TORN_CLIP =
  "polygon(0% 0%, 100% 0%, 100% 50%, 94% 49.2%, 88% 51.1%, 81% 48.6%, 73% 51.3%, 65% 48.8%, 57% 51.4%, 50% 48.5%, 43% 51.5%, 35% 48.7%, 27% 51.2%, 19% 48.8%, 12% 51.0%, 5% 49.1%, 0% 50%)";

const BOTTOM_TORN_CLIP =
  "polygon(0% 50%, 5% 49.1%, 12% 51.0%, 19% 48.8%, 27% 51.2%, 35% 48.7%, 43% 51.5%, 50% 48.5%, 57% 51.4%, 65% 48.8%, 73% 51.3%, 81% 48.6%, 88% 51.1%, 94% 49.2%, 100% 50%, 100% 100%, 0% 100%)";

// In-memory session tracker
let hasPlayedInSession = false;

export default function AnimeInitialLoader() {
  const pathname = usePathname();

  // Immediately exit on admin and login routes so they never get blocked or frozen!
  if (pathname.startsWith("/admin") || pathname === "/login") {
    return null;
  }

  // Initialize visibility: true on opening, false if already played
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    return !hasPlayedInSession;
  });

  const [typedLetters, setTypedLetters] = useState(0);
  const [showSubtext, setShowSubtext] = useState(false);
  const [phase, setPhase] = useState<"writing" | "freeze" | "slash" | "tear" | "done">("writing");

  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const addTimer = (fn: () => void, delay: number) => {
    const t = setTimeout(fn, delay);
    timersRef.current.push(t);
    return t;
  };

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  // Prevent background scrolling while loader is active
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  // Expose replay function for dev testing
  useEffect(() => {
    (window as any).replayAnimeLoader = () => {
      hasPlayedInSession = false;
      clearAllTimers();
      setTypedLetters(0);
      setShowSubtext(false);
      setPhase("writing");
      setIsVisible(true);
    };
  }, []);

  // Main Anime Animation Timeline: Writing -> Freeze -> Left-to-Right Slash -> Horizontal Paper Tear
  useEffect(() => {
    if (!isVisible) return;

    // 1. Name Calligraphy Writing: Reveal letter by letter
    let count = 0;
    const typeInterval = setInterval(() => {
      count++;
      setTypedLetters(count);

      if (count >= FULL_NAME.length) {
        clearInterval(typeInterval);
        setShowSubtext(true);

        // 2. Dramatic Tension Freeze (350ms) - Screen is still 100% solid & uncracked
        addTimer(() => {
          setPhase("freeze");

          // 3. Horizontal Katana Sword Slash (Left to Right)! - Cracking starts HERE
          addTimer(() => {
            setPhase("slash");

            // 4. Horizontal Paper Tearing Apart (Top tears Up, Bottom tears Down)!
            addTimer(() => {
              setPhase("tear");

              // 5. Light Burst & Seamless Dismissal
              addTimer(() => {
                setPhase("done");
                hasPlayedInSession = true;
                addTimer(() => {
                  setIsVisible(false);
                }, 380);
              }, 850);
            }, 220);
          }, 350);
        }, 150);
      }
    }, 60);

    return () => {
      clearInterval(typeInterval);
      clearAllTimers();
    };
  }, [isVisible]);

  // Fast skip on demand or on Escape key
  const handleSkip = () => {
    clearAllTimers();
    setPhase("done");
    hasPlayedInSession = true;
    setTimeout(() => {
      setIsVisible(false);
    }, 180);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible]);

  if (!isVisible) return null;

  // The centered name display content
  const renderCanvasContent = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none px-6">
      {/* Background Anime Manga Watermark */}
      <div className="absolute font-manga text-[16vw] font-black text-white/[0.03] uppercase tracking-widest pointer-events-none select-none">
        神速横断
      </div>

      {/* Main Name Writing Display - Exactly on the vertical midpoint y=50% */}
      <div className="relative flex items-center justify-center">
        <h1 className="font-manga text-[clamp(2.6rem,7.8vw,6.8rem)] font-black tracking-wider uppercase leading-none text-white filter drop-shadow-[0_2px_18px_rgba(234,88,12,0.4)]">
          {FULL_NAME.slice(0, typedLetters)}
        </h1>

        {/* Pulsing Glowing Calligraphy Brush Tip Cursor */}
        {typedLetters < FULL_NAME.length && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.22, repeat: Infinity }}
            className="inline-block w-2 sm:w-3.5 h-8 sm:h-14 ml-1.5 sm:ml-2.5 bg-gradient-to-b from-amber-300 via-orange-500 to-rose-600 rounded-xs shadow-[0_0_18px_rgba(234,88,12,0.95)]"
          />
        )}
      </div>

      {/* Japanese Subtitle Lore */}
      <div className="h-6 mt-3 sm:mt-4 flex items-center justify-center">
        {showSubtext && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="font-rajdhani text-xs sm:text-sm font-bold text-stone-400 tracking-[0.22em] uppercase"
          >
            {JAP_NAME}
          </motion.p>
        )}
      </div>

      {/* Horizontal Aiming Reticle / Slash Pre-indicator (Flashes during freeze) */}
      {phase === "freeze" && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0.3 }}
          animate={{ opacity: [0, 1, 0.5], scaleX: 1 }}
          transition={{ duration: 0.28 }}
          className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-red-500/80 shadow-[0_0_12px_#ef4444] -translate-y-1/2"
        />
      )}
    </div>
  );

  const isTorn = phase === "slash" || phase === "tear" || phase === "done";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="anime-horizontal-slash-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className="fixed inset-0 z-[99999] select-none overflow-hidden bg-[#04060d]"
        >
          {/* ── 0. BEHIND-THE-PAPER REVEAL RIFT (Only renders when cut/torn!) ── */}
          {isTorn && (
            <div className="absolute inset-0 bg-gradient-to-b from-orange-600 via-amber-300 to-white flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ scale: 0.1, opacity: 0 }}
                animate={
                  phase === "tear" || phase === "done"
                    ? { scale: [0.8, 3.2], opacity: [0.7, 1] }
                    : { opacity: 0 }
                }
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="w-[125vw] h-[125vh] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,1)_0%,rgba(245,158,11,0.85)_40%,rgba(234,88,12,0.95)_75%)]"
              />
            </div>
          )}

          {/* ── 1. SOLID UNCRACKED SURFACE (While name is writing & freeze) ── */}
          {!isTorn ? (
            <div className="absolute inset-0 w-full h-full bg-[#050811] z-20">
              {/* Paper Parchment Noise Texture */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 50% 50%, rgba(234,88,12,0.18) 0%, transparent 60%), repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 2px, transparent 2px, transparent 8px)",
                }}
              />
              {renderCanvasContent()}
            </div>
          ) : (
            /* ── 2. TORN PAPER SHEETS & SCREEN SHAKE (Activates on sword cut) ── */
            <motion.div
              animate={
                phase === "slash"
                  ? {
                      x: [-14, 14, -9, 9, -4, 0],
                      y: [-16, 16, -10, 8, -4, 0],
                    }
                  : { x: 0, y: 0 }
              }
              transition={{ duration: 0.28 }}
              className="absolute inset-0 w-full h-full"
            >
              {/* ── TOP TORN PAPER SHEET (Tears & Lifts UPWARD) ───────────── */}
              <motion.div
                animate={
                  phase === "tear" || phase === "done"
                    ? {
                        y: "-108vh",
                        rotate: -3.5,
                        x: 18,
                        opacity: [1, 1, 0],
                      }
                    : { y: 0, rotate: 0, x: 0, opacity: 1 }
                }
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                style={{ clipPath: TOP_TORN_CLIP }}
                className="absolute inset-0 w-full h-full bg-[#050811] shadow-[0_20px_45px_rgba(0,0,0,0.95)] z-20"
              >
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 40% 30%, rgba(234,88,12,0.2) 0%, transparent 60%), repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 2px, transparent 2px, transparent 8px)",
                  }}
                />
                {renderCanvasContent()}

                {/* Glowing Charred Torn Ember Seam on Bottom Edge */}
                <div
                  className="absolute inset-0 pointer-events-none z-30"
                  style={{
                    boxShadow: "inset 0 -4px 25px rgba(249,115,22,0.95), inset 0 -2px 6px #fff",
                  }}
                />
              </motion.div>

              {/* ── BOTTOM TORN PAPER SHEET (Tears & Drops DOWNWARD) ───────── */}
              <motion.div
                animate={
                  phase === "tear" || phase === "done"
                    ? {
                        y: "108vh",
                        rotate: 3.5,
                        x: -18,
                        opacity: [1, 1, 0],
                      }
                    : { y: 0, rotate: 0, x: 0, opacity: 1 }
                }
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                style={{ clipPath: BOTTOM_TORN_CLIP }}
                className="absolute inset-0 w-full h-full bg-[#050811] shadow-[0_-20px_45px_rgba(0,0,0,0.95)] z-20"
              >
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 60% 70%, rgba(225,29,72,0.2) 0%, transparent 60%), repeating-linear-gradient(-45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 2px, transparent 2px, transparent 8px)",
                  }}
                />
                {renderCanvasContent()}

                {/* Glowing Charred Torn Ember Seam on Top Edge */}
                <div
                  className="absolute inset-0 pointer-events-none z-30"
                  style={{
                    boxShadow: "inset 0 4px 25px rgba(249,115,22,0.95), inset 0 2px 6px #fff",
                  }}
                />
              </motion.div>

              {/* ── 3. HORIZONTAL KATANA SWORD SLASH IMPACT (Left to Right) ── */}
              {phase === "slash" && (
                <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
                  {/* Katana Blade Streaking Horizontally from Left to Right */}
                  <motion.div
                    initial={{ x: "-100%", y: "-50%" }}
                    animate={{ x: "120%", y: "-50%" }}
                    transition={{ duration: 0.22, ease: "linear" }}
                    className="absolute top-1/2 left-0 right-0 h-4 flex items-center -translate-y-1/2"
                  >
                    <div className="h-2 w-72 bg-gradient-to-r from-white via-cyan-200 to-amber-300 rounded-full shadow-[0_0_25px_#fff,0_0_55px_#ea580c]" />
                  </motion.div>

                  {/* Searing Horizontal Slash Beam of Energy */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 0.26, ease: "easeOut" }}
                    style={{ transformOrigin: "left" }}
                    className="absolute top-1/2 left-0 right-0 h-1.5 sm:h-2.5 bg-white shadow-[0_0_25px_#fff,0_0_50px_#f97316,0_0_90px_#ef4444] -translate-y-1/2"
                  />

                  {/* Katana Slash Impact Text Kanji */}
                  <motion.div
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: [0.4, 1.25, 1], opacity: [0, 1, 0] }}
                    transition={{ duration: 0.32 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-manga text-5xl sm:text-7xl font-black text-amber-300 filter drop-shadow-[0_0_20px_#ea580c] z-50 pointer-events-none"
                  >
                    一閃！！
                  </motion.div>

                  {/* Flying Sword Sparks along the horizontal cut line */}
                  {[...Array(16)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{
                        x: `${6 + i * 5.8}vw`,
                        y: "50vh",
                        scale: 1,
                        opacity: 1,
                      }}
                      animate={{
                        x: `${6 + i * 5.8 + (i % 2 === 0 ? 12 : -12)}vw`,
                        y: `${50 + (i % 2 === 0 ? 1 : -1) * (14 + (i % 5) * 5)}vh`,
                        scale: 0,
                        opacity: 0,
                      }}
                      transition={{ duration: 0.48, ease: "easeOut" }}
                      className="absolute w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#f59e0b]"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
