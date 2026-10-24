"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import SamuraiCanvas, { GameControls } from "./SamuraiCanvas";
import { Volume2, VolumeX, Play, RotateCcw, Sparkles } from "lucide-react";

interface HandheldConsoleProps {
  onScoreChange?: (
    score: number,
    highscore: number,
    distance: number,
    powers: number,
    powerTimer: number,
    level: number,
    levelName: string,
    speed: number,
    lives: number,
    levelProgress: number,
    isVictory: boolean
  ) => void;
}

export default function HandheldConsole({ onScoreChange }: HandheldConsoleProps) {
  // Game controls state passed to canvas
  const [controls, setControls] = useState<GameControls>({
    jump: false,
    slide: false,
    left: false,
    right: false,
    power: false,
    slash: false,
  });

  // Active button press states for visual feedback on console buttons
  const [activeButtons, setActiveButtons] = useState<Record<string, boolean>>({});

  // Console state
  const [isPoweredOn, setIsPoweredOn] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Stats for console HUD display
  const [stats, setStats] = useState({
    score: 0,
    highscore: 0,
    distance: 0,
    powers: 2,
    powerTimer: 0,
    level: 1,
    levelName: "NOVICE",
    speed: 2.4,
    lives: 3,
    levelProgress: 0,
    isVictory: false,
  });

  // Helper to trigger action with momentary button depression
  const pressButton = useCallback((action: keyof GameControls, buttonKey: string) => {
    setControls((prev) => ({ ...prev, [action]: true }));
    setActiveButtons((prev) => ({ ...prev, [buttonKey]: true }));

    setTimeout(() => {
      setControls((prev) => ({ ...prev, [action]: false }));
      setActiveButtons((prev) => ({ ...prev, [buttonKey]: false }));
    }, 120);
  }, []);

  // Keyboard mapping to light up console buttons
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "KeyW", "Space"].includes(e.code)) {
        setActiveButtons((prev) => ({ ...prev, a: true, up: true }));
      }
      if (["ArrowDown", "KeyS"].includes(e.code)) {
        setActiveButtons((prev) => ({ ...prev, b: true, down: true }));
      }
      if (["ArrowLeft", "KeyA"].includes(e.code)) {
        setActiveButtons((prev) => ({ ...prev, left: true }));
      }
      if (["ArrowRight", "KeyD"].includes(e.code)) {
        setActiveButtons((prev) => ({ ...prev, right: true }));
      }
      if (["KeyX", "KeyE", "ShiftLeft", "ShiftRight"].includes(e.code)) {
        setActiveButtons((prev) => ({ ...prev, x: true }));
      }
      if (["KeyZ", "KeyJ", "Enter"].includes(e.code)) {
        setActiveButtons((prev) => ({ ...prev, y: true }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (["ArrowUp", "KeyW", "Space"].includes(e.code)) {
        setActiveButtons((prev) => ({ ...prev, a: false, up: false }));
      }
      if (["ArrowDown", "KeyS"].includes(e.code)) {
        setActiveButtons((prev) => ({ ...prev, b: false, down: false }));
      }
      if (["ArrowLeft", "KeyA"].includes(e.code)) {
        setActiveButtons((prev) => ({ ...prev, left: false }));
      }
      if (["ArrowRight", "KeyD"].includes(e.code)) {
        setActiveButtons((prev) => ({ ...prev, right: false }));
      }
      if (["KeyX", "KeyE", "ShiftLeft", "ShiftRight"].includes(e.code)) {
        setActiveButtons((prev) => ({ ...prev, x: false }));
      }
      if (["KeyZ", "KeyJ", "Enter"].includes(e.code)) {
        setActiveButtons((prev) => ({ ...prev, y: false }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleScoreUpdate = useCallback(
    (
      score: number,
      highscore: number,
      distance: number,
      powers: number,
      powerTimer: number,
      level: number,
      levelName: string,
      speed: number,
      lives: number,
      levelProgress: number,
      isVictory: boolean
    ) => {
      setStats({
        score,
        highscore,
        distance,
        powers,
        powerTimer,
        level,
        levelName,
        speed,
        lives,
        levelProgress,
        isVictory,
      });
      if (onScoreChange) {
        onScoreChange(
          score,
          highscore,
          distance,
          powers,
          powerTimer,
          level,
          levelName,
          speed,
          lives,
          levelProgress,
          isVictory
        );
      }
    },
    [onScoreChange]
  );

  return (
    <div className="relative mx-auto flex flex-col items-center select-none w-full max-w-[420px] sm:max-w-[440px]">
      {/* Shoulder Bumpers at Top (L1 / R1) */}
      <div className="w-[88%] flex justify-between px-6 -mb-2 z-0">
        <button
          type="button"
          aria-label="L1 Shoulder Button"
          className="w-16 h-4 bg-stone-900 border border-purple-500/30 rounded-t-lg shadow-inner hover:bg-stone-800 active:translate-y-0.5 transition-transform"
        />
        <button
          type="button"
          aria-label="R1 Shoulder Button"
          className="w-16 h-4 bg-stone-900 border border-purple-500/30 rounded-t-lg shadow-inner hover:bg-stone-800 active:translate-y-0.5 transition-transform"
        />
      </div>

      {/* Main Handheld Console Body: Atomic Purple Translucent Shell */}
      <div
        className="relative z-10 w-full rounded-[44px] sm:rounded-[48px] p-4 sm:p-5 shadow-[0_25px_60px_-15px_rgba(88,28,135,0.45),0_0_30px_rgba(147,51,234,0.2)] border border-purple-400/40 backdrop-blur-xl transition-all duration-300"
        style={{
          background:
            "linear-gradient(170deg, rgba(76, 29, 149, 0.88) 0%, rgba(59, 7, 100, 0.92) 50%, rgba(30, 8, 54, 0.96) 100%)",
        }}
      >
        {/* Faint Internal PCB Circuit Board Overlay (Atomic Purple effect) */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[44px] sm:rounded-[48px] opacity-25 overflow-hidden"
          style={{
            backgroundImage: `radial-gradient(circle at 80% 20%, rgba(216, 180, 254, 0.3) 0%, transparent 60%),
              radial-gradient(circle at 20% 80%, rgba(192, 132, 252, 0.25) 0%, transparent 50%)`,
          }}
        >
          {/* Subtle PCB track lines */}
          <svg className="w-full h-full stroke-purple-300/25 fill-none" viewBox="0 0 400 600">
            <path d="M 40,320 L 70,350 L 70,480" strokeWidth="1.5" />
            <path d="M 360,320 L 330,350 L 330,480" strokeWidth="1.5" />
            <path d="M 160,540 L 180,560 L 220,560 L 240,540" strokeWidth="1.5" />
            <circle cx="70" cy="350" r="3" fill="rgba(216, 180, 254, 0.4)" />
            <circle cx="330" cy="350" r="3" fill="rgba(216, 180, 254, 0.4)" />
            <circle cx="200" cy="560" r="4" fill="rgba(216, 180, 254, 0.4)" />
          </svg>
        </div>

        {/* Console Header Bar (Brand & Power LED) */}
        <div className="flex items-center justify-between px-3 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="font-orbitron text-[10px] tracking-[0.2em] font-extrabold text-purple-200/90 uppercase drop-shadow-sm">
              SHONEN KAIJU 64
            </span>
          </div>

          {/* Glowing Status LED */}
          <div className="flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded-full border border-purple-400/20">
            <span
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isPoweredOn
                  ? stats.powerTimer > 0
                    ? "bg-amber-400 shadow-[0_0_8px_#F59E0B] animate-ping"
                    : "bg-emerald-400 shadow-[0_0_8px_#34D399]"
                  : "bg-stone-600"
              }`}
            />
            <span className="text-[9px] font-mono text-purple-200/70 font-semibold uppercase">
              {stats.powerTimer > 0 ? "SURGE" : isPoweredOn ? "READY" : "OFF"}
            </span>
          </div>
        </div>

        {/* 1. SCREEN HOUSING (Top Half) */}
        <div className="relative rounded-[20px] bg-black p-2.5 sm:p-3 shadow-[inset_0_4px_12px_rgba(0,0,0,0.8),0_2px_4px_rgba(255,255,255,0.08)] border border-purple-300/20 overflow-hidden">
          {/* Glass Diagonal Sheen reflection */}
          <div className="pointer-events-none absolute -top-24 -left-20 w-80 h-80 bg-gradient-to-br from-white/10 via-transparent to-transparent rotate-45 z-20" />

          {/* Inner Screen Display Border */}
          <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-stone-950 flex items-center justify-center border border-white/5">
            {isPoweredOn ? (
              <SamuraiCanvas
                externalControls={controls}
                isMuted={isMuted}
                isPaused={isPaused}
                onScoreUpdate={handleScoreUpdate}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-black/95 text-stone-600 font-mono text-xs">
                <p>SYSTEM POWERED OFF</p>
                <button
                  onClick={() => setIsPoweredOn(true)}
                  className="mt-3 px-3 py-1 bg-purple-600/30 text-purple-300 border border-purple-500/40 rounded text-xs hover:bg-purple-600/50"
                >
                  PRESS POWER
                </button>
              </div>
            )}
          </div>

          {/* CRT Scanline effect subtle overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-40 z-10"
          />
        </div>

        {/* 2. CONTROLS DECK (Bottom Half) */}
        <div className="mt-4 px-2">
          {/* Center Speaker Grille (Inspired directly by reference image) */}
          <div className="flex flex-col items-center justify-center mb-3">
            <div className="flex items-center gap-1.5 opacity-60">
              <span className="w-1 h-3 rounded-full bg-purple-900/90 border border-purple-400/30" />
              <span className="w-1 h-4 rounded-full bg-purple-900/90 border border-purple-400/30" />
              <span className="w-1.5 h-5 rounded-full bg-purple-900/90 border border-purple-400/40" />
              <span className="w-2 h-2 rounded-full bg-black/80 border border-purple-400/30" />
              <span className="w-1.5 h-5 rounded-full bg-purple-900/90 border border-purple-400/40" />
              <span className="w-1 h-4 rounded-full bg-purple-900/90 border border-purple-400/30" />
              <span className="w-1 h-3 rounded-full bg-purple-900/90 border border-purple-400/30" />
            </div>
            <span className="text-[8px] font-mono tracking-[0.25em] text-purple-300/40 mt-1 uppercase">
              HIGH FIDELITY AUDIO
            </span>
          </div>

          {/* Main Controls Row: D-Pad (Left), Center Buttons, ABXY Cluster (Right) */}
          <div className="grid grid-cols-3 items-center gap-2">
            {/* LEFT: Retro Cross D-Pad */}
            <div className="flex justify-center items-center">
              <div className="relative w-28 h-28 flex items-center justify-center">
                {/* D-Pad Cross Body */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                  {/* Up */}
                  <button
                    type="button"
                    aria-label="Up / Jump"
                    onPointerDown={() => pressButton("jump", "up")}
                    className={`absolute top-0 w-8 h-8 rounded-t-md bg-stone-900 border-t border-x border-stone-700/80 shadow-md flex items-center justify-center text-stone-400 hover:text-white transition-all active:bg-stone-800 ${
                      activeButtons.up ? "bg-stone-700 scale-95 shadow-inner" : ""
                    }`}
                  >
                    <span className="text-xs">▲</span>
                  </button>

                  {/* Down */}
                  <button
                    type="button"
                    aria-label="Down / Slide"
                    onPointerDown={() => pressButton("slide", "down")}
                    className={`absolute bottom-0 w-8 h-8 rounded-b-md bg-stone-900 border-b border-x border-stone-700/80 shadow-md flex items-center justify-center text-stone-400 hover:text-white transition-all active:bg-stone-800 ${
                      activeButtons.down ? "bg-stone-700 scale-95 shadow-inner" : ""
                    }`}
                  >
                    <span className="text-xs">▼</span>
                  </button>

                  {/* Left */}
                  <button
                    type="button"
                    aria-label="Move Left / Backwards"
                    onPointerDown={() => {
                      setControls((prev) => ({ ...prev, left: true }));
                      setActiveButtons((prev) => ({ ...prev, left: true }));
                    }}
                    onPointerUp={() => {
                      setControls((prev) => ({ ...prev, left: false }));
                      setActiveButtons((prev) => ({ ...prev, left: false }));
                    }}
                    onPointerLeave={() => {
                      setControls((prev) => ({ ...prev, left: false }));
                      setActiveButtons((prev) => ({ ...prev, left: false }));
                    }}
                    className={`absolute left-0 w-8 h-8 rounded-l-md bg-stone-900 border-l border-y border-stone-700/80 shadow-md flex items-center justify-center text-stone-400 hover:text-white transition-all active:bg-stone-800 ${
                      activeButtons.left ? "bg-stone-700 scale-95 shadow-inner" : ""
                    }`}
                  >
                    <span className="text-xs">◀</span>
                  </button>

                  {/* Right */}
                  <button
                    type="button"
                    aria-label="Move Right / Forwards"
                    onPointerDown={() => {
                      setControls((prev) => ({ ...prev, right: true }));
                      setActiveButtons((prev) => ({ ...prev, right: true }));
                    }}
                    onPointerUp={() => {
                      setControls((prev) => ({ ...prev, right: false }));
                      setActiveButtons((prev) => ({ ...prev, right: false }));
                    }}
                    onPointerLeave={() => {
                      setControls((prev) => ({ ...prev, right: false }));
                      setActiveButtons((prev) => ({ ...prev, right: false }));
                    }}
                    className={`absolute right-0 w-8 h-8 rounded-r-md bg-stone-900 border-r border-y border-stone-700/80 shadow-md flex items-center justify-center text-stone-400 hover:text-white transition-all active:bg-stone-800 ${
                      activeButtons.right ? "bg-stone-700 scale-95 shadow-inner" : ""
                    }`}
                  >
                    <span className="text-xs">▶</span>
                  </button>

                  {/* Center Pivot */}
                  <div className="w-8 h-8 bg-stone-900 border border-stone-800/80 flex items-center justify-center pointer-events-none">
                    <div className="w-3.5 h-3.5 rounded-full bg-stone-950/80 shadow-inner" />
                  </div>
                </div>
              </div>
            </div>

            {/* CENTER: Select, Home & Start Pill Buttons */}
            <div className="flex flex-col items-center justify-center gap-3">
              {/* Function / Power Reset button */}
              <button
                type="button"
                onClick={() => setIsPoweredOn((prev) => !prev)}
                title="Power On / Off"
                className="w-5 h-5 rounded-full bg-purple-900/90 border border-purple-400/50 shadow-inner flex items-center justify-center text-[9px] text-purple-200 hover:scale-105 active:scale-90 transition-transform"
              >
                F
              </button>

              <div className="flex items-center gap-3 mt-1">
                {/* SELECT (Audio Mute Toggle) */}
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => setIsMuted((prev) => !prev)}
                    className="w-8 h-3 rounded-full bg-stone-900 border border-stone-700 shadow hover:bg-stone-800 active:scale-95 transition-all rotate-[-25deg]"
                  />
                  <span className="text-[8px] font-mono text-purple-300/70 mt-1 uppercase font-semibold">
                    {isMuted ? "MUTED" : "SELECT"}
                  </span>
                </div>

                {/* START (Run / Pause) */}
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => {
                      pressButton("jump", "start");
                    }}
                    className="w-8 h-3 rounded-full bg-stone-900 border border-stone-700 shadow hover:bg-stone-800 active:scale-95 transition-all rotate-[-25deg]"
                  />
                  <span className="text-[8px] font-mono text-purple-300/70 mt-1 uppercase font-semibold">
                    START
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: ABXY Action Buttons Cluster */}
            <div className="flex justify-center items-center">
              <div className="relative w-28 h-28 flex items-center justify-center">
                {/* X BUTTON (TOP) -> 5-SECOND INVINCIBILITY POWER ACTIVATION */}
                <button
                  type="button"
                  aria-label="X - Unleash 5s Invincibility Chakra"
                  onPointerDown={() => pressButton("power", "x")}
                  className={`absolute top-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-lg transition-all active:scale-90 ${
                    stats.powers > 0
                      ? "bg-gradient-to-br from-amber-400 to-orange-500 text-stone-950 border border-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.6)] animate-pulse"
                      : "bg-purple-900/80 text-purple-200 border border-purple-400/40"
                  } ${activeButtons.x ? "scale-90 brightness-125" : ""}`}
                >
                  X
                </button>

                {/* Y BUTTON (LEFT) -> KATANA SLASH */}
                <button
                  type="button"
                  aria-label="Y - Katana Slash"
                  onPointerDown={() => pressButton("slash", "y")}
                  className={`absolute left-0 w-8 h-8 rounded-full bg-purple-900/80 text-purple-200 border border-purple-400/40 flex items-center justify-center font-bold text-xs shadow-lg hover:border-purple-300 transition-all active:scale-90 ${
                    activeButtons.y ? "scale-90 bg-sky-600 text-white" : ""
                  }`}
                >
                  Y
                </button>

                {/* A BUTTON (RIGHT) -> JUMP */}
                <button
                  type="button"
                  aria-label="A - Jump"
                  onPointerDown={() => pressButton("jump", "a")}
                  className={`absolute right-0 w-8 h-8 rounded-full bg-purple-900/80 text-purple-200 border border-purple-400/40 flex items-center justify-center font-bold text-xs shadow-lg hover:border-purple-300 transition-all active:scale-90 ${
                    activeButtons.a ? "scale-90 bg-emerald-600 text-white" : ""
                  }`}
                >
                  A
                </button>

                {/* B BUTTON (BOTTOM) -> DODGE / SLIDE */}
                <button
                  type="button"
                  aria-label="B - Slide / Dodge"
                  onPointerDown={() => pressButton("slide", "b")}
                  className={`absolute bottom-0 w-8 h-8 rounded-full bg-purple-900/80 text-purple-200 border border-purple-400/40 flex items-center justify-center font-bold text-xs shadow-lg hover:border-purple-300 transition-all active:scale-90 ${
                    activeButtons.b ? "scale-90 bg-purple-600 text-white" : ""
                  }`}
                >
                  B
                </button>
              </div>
            </div>
          </div>

          {/* DUAL ANALOG STICKS (Lower Section, exactly like reference image) */}
          <div className="flex justify-between items-center px-4 mt-2">
            {/* Left Analog Thumbstick */}
            <div className="relative w-14 h-14 rounded-full bg-stone-950/90 border-2 border-purple-500/30 shadow-inner flex items-center justify-center">
              <button
                type="button"
                aria-label="Left Analog Stick"
                onPointerDown={() => pressButton("left", "stickL")}
                className="w-10 h-10 rounded-full bg-gradient-to-b from-stone-800 to-stone-900 border border-stone-600 shadow-md flex items-center justify-center cursor-pointer active:translate-x-1 active:translate-y-0.5 transition-transform"
              >
                <div className="w-6 h-6 rounded-full bg-stone-950/80 border border-stone-700/50 shadow-inner" />
              </button>
            </div>

            {/* Mini Legend / Power-up instructions badge */}
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-950/60 border border-purple-400/30">
                <Sparkles className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: "3s" }} />
                <span className="font-mono text-[9px] text-amber-300 font-bold uppercase">
                  [X] 5s INVINCIBILITY
                </span>
              </div>
            </div>

            {/* Right Analog Thumbstick */}
            <div className="relative w-14 h-14 rounded-full bg-stone-950/90 border-2 border-purple-500/30 shadow-inner flex items-center justify-center">
              <button
                type="button"
                aria-label="Right Analog Stick"
                onPointerDown={() => pressButton("right", "stickR")}
                className="w-10 h-10 rounded-full bg-gradient-to-b from-stone-800 to-stone-900 border border-stone-600 shadow-md flex items-center justify-center cursor-pointer active:-translate-x-1 active:translate-y-0.5 transition-transform"
              >
                <div className="w-6 h-6 rounded-full bg-stone-950/80 border border-stone-700/50 shadow-inner" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

