"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

export interface GameControls {
  jump: boolean;
  slide: boolean;
  left: boolean;
  right: boolean;
  power: boolean;
  slash: boolean;
}

interface SamuraiCanvasProps {
  externalControls?: GameControls;
  isMuted?: boolean;
  isPaused?: boolean;
  onScoreUpdate?: (
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
  onGameOver?: (finalScore: number, isNewHigh: boolean) => void;
}

// Particle interface
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  text?: string;
}

// Obstacle interface
interface Obstacle {
  id: number;
  type: "low" | "high" | "barrier";
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  passed: boolean;
  destroyed: boolean;
  rotation: number;
}

// Collectible Power Scroll / Health Item
interface CollectibleItem {
  id: number;
  type: "scroll" | "heart";
  x: number;
  y: number;
  width: number;
  height: number;
  collected: boolean;
  pulse: number;
}

// 10 Distinct Levels Configuration: Each level increases speed after completion!
export const LEVEL_CONFIGS = [
  { level: 1, name: "NOVICE", speed: 2.4, minGap: 560, maxGap: 720, highRatio: 0, bonus: 200 },
  { level: 2, name: "APPRENTICE", speed: 2.7, minGap: 520, maxGap: 680, highRatio: 0.18, bonus: 300 },
  { level: 3, name: "BAMBOO RUNNER", speed: 3.0, minGap: 480, maxGap: 640, highRatio: 0.25, bonus: 400 },
  { level: 4, name: "SHADOW BLADE", speed: 3.3, minGap: 450, maxGap: 600, highRatio: 0.32, bonus: 500 },
  { level: 5, name: "CYBER TORII", speed: 3.6, minGap: 420, maxGap: 560, highRatio: 0.38, bonus: 600 },
  { level: 6, name: "ONI SLAYER", speed: 3.9, minGap: 390, maxGap: 530, highRatio: 0.44, bonus: 700 },
  { level: 7, name: "WIND WALKER", speed: 4.2, minGap: 370, maxGap: 500, highRatio: 0.48, bonus: 800 },
  { level: 8, name: "DRAGON SPIRIT", speed: 4.5, minGap: 350, maxGap: 470, highRatio: 0.52, bonus: 900 },
  { level: 9, name: "VOID STRIKER", speed: 4.9, minGap: 330, maxGap: 440, highRatio: 0.55, bonus: 1000 },
  { level: 10, name: "SUPREME KENSEI", speed: 5.4, minGap: 310, maxGap: 410, highRatio: 0.58, bonus: 2500 },
];

export const METERS_PER_LEVEL = 45; // 45 meters to complete each level!

export default function SamuraiCanvas({
  externalControls,
  isMuted = false,
  isPaused = false,
  onScoreUpdate,
  onGameOver,
}: SamuraiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // High score & UI state
  const [highScore, setHighScore] = useState<number>(0);
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [powersStored, setPowersStored] = useState<number>(2);
  const [invincibleTimer, setInvincibleTimer] = useState<number>(0);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [levelName, setLevelName] = useState<string>("NOVICE");
  const [lives, setLives] = useState<number>(3);
  const [isVictory, setIsVictory] = useState<boolean>(false);

  // Audio Context ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Internal state refs to avoid closure stalls in RAF
  const stateRef = useRef({
    gameState: "idle" as "idle" | "playing" | "gameover",
    score: 0,
    highScore: 0,
    distance: 0,
    powersStored: 2,
    invincibleTimer: 0,
    lives: 3,
    mercyTimer: 0,
    currentLevel: 1,
    levelName: "NOVICE",
    levelProgress: 0,
    isVictory: false,
    bannerTitle: "",
    bannerSubtitle: "",
    bannerTimer: 0,
    // Samurai physics
    samurai: {
      x: 100,
      y: 310,
      width: 44,
      height: 64,
      vx: 0,
      vy: 0,
      isGrounded: true,
      isSliding: false,
      slideTimer: 0,
      isSlashing: false,
      slashTimer: 0,
      runFrame: 0,
    },
    obstacles: [] as Obstacle[],
    collectibles: [] as CollectibleItem[],
    particles: [] as Particle[],
    // Background parallax offsets
    bgMoonOffset: 0,
    bgMountainsOffset: 0,
    bgToriiOffset: 0,
    bgGroundOffset: 0,
    // Spawners & progressive gentle intensity
    nextObstacleDist: 480,
    nextItemDist: 180,
    gameSpeed: 2.4, // Level 1 speed
    lastTime: 0,
  });

  // Sound Synthesizer via Web Audio API
  const playSound = useCallback(
    (type: "jump" | "slide" | "power" | "invincible" | "hit" | "slash" | "pickup" | "levelup" | "heal" | "victory" | "gameover") => {
      if (isMuted) return;
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          if (AudioContextClass) {
            audioCtxRef.current = new AudioContextClass();
          }
        }
        const ctx = audioCtxRef.current;
        if (!ctx) return;
        if (ctx.state === "suspended") {
          ctx.resume();
        }

        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === "jump") {
          osc.type = "sine";
          osc.frequency.setValueAtTime(260, now);
          osc.frequency.exponentialRampToValueAtTime(750, now + 0.16);
          gain.gain.setValueAtTime(0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);
          osc.start(now);
          osc.stop(now + 0.16);
        } else if (type === "slide") {
          osc.type = "triangle";
          osc.frequency.setValueAtTime(320, now);
          osc.frequency.exponentialRampToValueAtTime(140, now + 0.22);
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
          osc.start(now);
          osc.stop(now + 0.22);
        } else if (type === "pickup") {
          osc.type = "sine";
          osc.frequency.setValueAtTime(523.25, now);
          osc.frequency.setValueAtTime(659.25, now + 0.07);
          osc.frequency.setValueAtTime(783.99, now + 0.14);
          osc.frequency.setValueAtTime(1046.5, now + 0.21);
          gain.gain.setValueAtTime(0.3, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
          osc.start(now);
          osc.stop(now + 0.35);
        } else if (type === "heal") {
          osc.type = "sine";
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.setValueAtTime(554.37, now + 0.08);
          osc.frequency.setValueAtTime(880, now + 0.16);
          gain.gain.setValueAtTime(0.3, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
          osc.start(now);
          osc.stop(now + 0.35);
        } else if (type === "levelup") {
          // Triumphant Level-Complete Arpeggio
          const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
          notes.forEach((f, idx) => {
            const lOsc = ctx.createOscillator();
            const lGain = ctx.createGain();
            lOsc.type = "sine";
            lOsc.frequency.setValueAtTime(f, now + idx * 0.07);
            lGain.gain.setValueAtTime(0.22, now + idx * 0.07);
            lGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.32);
            lOsc.connect(lGain);
            lGain.connect(ctx.destination);
            lOsc.start(now + idx * 0.07);
            lOsc.stop(now + idx * 0.07 + 0.32);
          });
        } else if (type === "victory") {
          // Epic 10-level completion fanfare
          const vNotes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
          vNotes.forEach((f, idx) => {
            const vOsc = ctx.createOscillator();
            const vGain = ctx.createGain();
            vOsc.type = "sawtooth";
            vOsc.frequency.setValueAtTime(f, now + idx * 0.09);
            vGain.gain.setValueAtTime(0.2, now + idx * 0.09);
            vGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.5);
            vOsc.connect(vGain);
            vGain.connect(ctx.destination);
            vOsc.start(now + idx * 0.09);
            vOsc.stop(now + idx * 0.09 + 0.5);
          });
        } else if (type === "invincible") {
          const notes = [440, 554.37, 659.25, 880];
          notes.forEach((freq, i) => {
            const chordOsc = ctx.createOscillator();
            const chordGain = ctx.createGain();
            chordOsc.type = "sawtooth";
            chordOsc.frequency.setValueAtTime(freq, now + i * 0.05);
            chordGain.gain.setValueAtTime(0.15, now + i * 0.05);
            chordGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
            chordOsc.connect(chordGain);
            chordGain.connect(ctx.destination);
            chordOsc.start(now + i * 0.05);
            chordOsc.stop(now + 0.6);
          });
        } else if (type === "slash") {
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(800, now);
          osc.frequency.exponentialRampToValueAtTime(200, now + 0.12);
          gain.gain.setValueAtTime(0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
          osc.start(now);
          osc.stop(now + 0.12);
        } else if (type === "hit") {
          osc.type = "square";
          osc.frequency.setValueAtTime(160, now);
          osc.frequency.exponentialRampToValueAtTime(50, now + 0.2);
          gain.gain.setValueAtTime(0.35, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
          osc.start(now);
          osc.stop(now + 0.2);
        } else if (type === "gameover") {
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(300, now);
          osc.frequency.linearRampToValueAtTime(200, now + 0.2);
          osc.frequency.linearRampToValueAtTime(100, now + 0.5);
          gain.gain.setValueAtTime(0.35, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
          osc.start(now);
          osc.stop(now + 0.6);
        }
      } catch {
        // AudioContext ignored if blocked
      }
    },
    [isMuted]
  );

  // Initialize highscore
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("samurai_runner_highscore");
      if (saved) {
        const val = parseInt(saved, 10) || 0;
        setHighScore(val);
        stateRef.current.highScore = val;
      }
    }
  }, []);

  // Jump with floaty, forgiving arc
  const triggerJump = useCallback(() => {
    const s = stateRef.current;
    if (s.gameState !== "playing") return;
    if (s.samurai.isGrounded && !s.samurai.isSliding) {
      s.samurai.vy = -13.5;
      s.samurai.isGrounded = false;
      playSound("jump");
      for (let i = 0; i < 6; i++) {
        s.particles.push({
          x: s.samurai.x + 10,
          y: s.samurai.y + s.samurai.height,
          vx: (Math.random() - 0.7) * 3,
          vy: -Math.random() * 3,
          size: Math.random() * 4 + 2,
          color: "#E2E8F0",
          alpha: 0.8,
          life: 0,
          maxLife: 20,
        });
      }
    }
  }, [playSound]);

  // Slide with longer duration
  const triggerSlide = useCallback(() => {
    const s = stateRef.current;
    if (s.gameState !== "playing") return;
    if (s.samurai.isGrounded && !s.samurai.isSliding) {
      s.samurai.isSliding = true;
      s.samurai.slideTimer = 34;
      playSound("slide");
      for (let i = 0; i < 8; i++) {
        s.particles.push({
          x: s.samurai.x + 5,
          y: s.samurai.y + s.samurai.height - 2,
          vx: -(Math.random() * 5 + 3),
          vy: -Math.random() * 2,
          size: Math.random() * 3 + 2,
          color: "#CBD5E1",
          alpha: 0.8,
          life: 0,
          maxLife: 22,
        });
      }
    }
  }, [playSound]);

  // Wide Katana Slash
  const triggerSlash = useCallback(() => {
    const s = stateRef.current;
    if (s.gameState !== "playing") return;
    if (!s.samurai.isSlashing) {
      s.samurai.isSlashing = true;
      s.samurai.slashTimer = 18;
      playSound("slash");
      const swordRange = 110;
      s.obstacles.forEach((obs) => {
        if (!obs.destroyed && obs.x > s.samurai.x - 10 && obs.x < s.samurai.x + s.samurai.width + swordRange) {
          obs.destroyed = true;
          s.score += 150;
          for (let i = 0; i < 15; i++) {
            s.particles.push({
              x: obs.x + obs.width / 2,
              y: obs.y + obs.height / 2,
              vx: (Math.random() - 0.5) * 8,
              vy: (Math.random() - 0.5) * 8,
              size: Math.random() * 4 + 2,
              color: "#38BDF8",
              alpha: 1,
              life: 0,
              maxLife: 25,
            });
          }
          s.particles.push({
            x: obs.x,
            y: obs.y - 15,
            vx: 0,
            vy: -1.5,
            size: 14,
            color: "#38BDF8",
            alpha: 1,
            life: 0,
            maxLife: 35,
            text: "+150 SLASH!",
          });
        }
      });
    }
  }, [playSound]);

  // Activate 5-second Invincibility Power
  const triggerPowerUp = useCallback(() => {
    const s = stateRef.current;
    if (s.gameState !== "playing") return;
    if (s.powersStored > 0) {
      s.powersStored -= 1;
      s.invincibleTimer = 5000;
      setPowersStored(s.powersStored);
      setInvincibleTimer(5000);
      playSound("invincible");

      for (let i = 0; i < 35; i++) {
        const angle = (Math.PI * 2 * i) / 35;
        const speed = Math.random() * 6 + 4;
        s.particles.push({
          x: s.samurai.x + s.samurai.width / 2,
          y: s.samurai.y + s.samurai.height / 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 5 + 3,
          color: i % 2 === 0 ? "#F59E0B" : "#EC4899",
          alpha: 1,
          life: 0,
          maxLife: 35,
        });
      }

      s.particles.push({
        x: s.samurai.x - 20,
        y: s.samurai.y - 30,
        vx: 0,
        vy: -2,
        size: 16,
        color: "#FBBF24",
        alpha: 1,
        life: 0,
        maxLife: 45,
        text: "⚡ 5s INVINCIBLE! ⚡",
      });
    }
  }, [playSound]);

  // Start or Restart Game
  const startGame = useCallback(() => {
    const s = stateRef.current;
    s.gameState = "playing";
    s.score = 0;
    s.distance = 0;
    s.powersStored = 2; // 2 initial free power scrolls
    s.lives = 3;        // 3 Full Hearts
    s.mercyTimer = 0;
    s.invincibleTimer = 0;
    s.currentLevel = 1;
    s.levelName = LEVEL_CONFIGS[0].name;
    s.levelProgress = 0;
    s.isVictory = false;
    s.bannerTitle = "★ LEVEL 1: NOVICE ★";
    s.bannerSubtitle = "SPEED: 2.4x • COMPLETE 45M TO LEVEL UP!";
    s.bannerTimer = 90;
    s.samurai.x = 120;
    s.samurai.y = 310;
    s.samurai.vy = 0;
    s.samurai.vx = 0;
    s.samurai.isGrounded = true;
    s.samurai.isSliding = false;
    s.samurai.isSlashing = false;
    s.obstacles = [];
    s.collectibles = [];
    s.particles = [];
    s.nextObstacleDist = 480;
    s.nextItemDist = 180;
    s.gameSpeed = LEVEL_CONFIGS[0].speed;
    s.lastTime = performance.now();

    setGameState("playing");
    setCurrentScore(0);
    setPowersStored(2);
    setLives(3);
    setInvincibleTimer(0);
    setCurrentLevel(1);
    setLevelName(LEVEL_CONFIGS[0].name);
    setIsVictory(false);
  }, []);

  // Keyboard controls listener
  useEffect(() => {
    const keysDown = new Set<string>();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space", "KeyW", "KeyS", "KeyA", "KeyD"].includes(
          e.code
        )
      ) {
        if (stateRef.current.gameState === "playing") {
          e.preventDefault();
        }
      }

      if (e.code === "ArrowUp" || e.code === "KeyW" || e.code === "Space") {
        if (stateRef.current.gameState === "idle" || stateRef.current.gameState === "gameover") {
          startGame();
        } else {
          triggerJump();
        }
      } else if (e.code === "ArrowDown" || e.code === "KeyS") {
        triggerSlide();
      } else if (e.code === "KeyX" || e.code === "KeyE" || e.code === "ShiftLeft" || e.code === "ShiftRight") {
        triggerPowerUp();
      } else if (e.code === "KeyZ" || e.code === "KeyJ" || e.code === "Enter") {
        triggerSlash();
      }

      keysDown.add(e.code);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysDown.delete(e.code);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const interval = setInterval(() => {
      const s = stateRef.current;
      if (s.gameState !== "playing") return;

      const moveLeft = keysDown.has("ArrowLeft") || keysDown.has("KeyA") || externalControls?.left;
      const moveRight = keysDown.has("ArrowRight") || keysDown.has("KeyD") || externalControls?.right;

      if (moveLeft) {
        s.samurai.x = Math.max(50, s.samurai.x - 4.5);
      }
      if (moveRight) {
        s.samurai.x = Math.min(360, s.samurai.x + 4.5);
      }
    }, 1000 / 60);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      clearInterval(interval);
    };
  }, [startGame, triggerJump, triggerSlide, triggerPowerUp, triggerSlash, externalControls]);

  // Handle external controls triggered from HandheldConsole buttons
  useEffect(() => {
    if (!externalControls) return;
    if (externalControls.jump) {
      if (stateRef.current.gameState !== "playing") {
        startGame();
      } else {
        triggerJump();
      }
    }
    if (externalControls.slide) {
      triggerSlide();
    }
    if (externalControls.power) {
      triggerPowerUp();
    }
    if (externalControls.slash) {
      triggerSlash();
    }
  }, [externalControls, startGame, triggerJump, triggerSlide, triggerPowerUp, triggerSlash]);

  // Main Canvas Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const render = (time: number) => {
      const s = stateRef.current;
      if (!s.lastTime) s.lastTime = time;
      const dt = Math.min(32, time - s.lastTime);
      s.lastTime = time;

      if (!isPaused && s.gameState === "playing") {
        // 1. Invincibility & Mercy Recovery Timers
        if (s.invincibleTimer > 0) {
          s.invincibleTimer -= dt;
          if (s.invincibleTimer < 0) s.invincibleTimer = 0;
          setInvincibleTimer(s.invincibleTimer);
        }

        if (s.mercyTimer > 0) {
          s.mercyTimer -= dt;
          if (s.mercyTimer < 0) s.mercyTimer = 0;
        }

        // 2. Distance in meters
        s.distance += (s.gameSpeed * dt) / 16;
        const meters = Math.floor(s.distance / 10);

        // =========================================================================
        // 10-LEVEL PROGRESSION SYSTEM: After completing each level, the speed increases!
        // =========================================================================
        // Determine current level based on completed meters (45m per level)
        const computedLevelIndex = Math.min(
          LEVEL_CONFIGS.length - 1,
          Math.floor(meters / METERS_PER_LEVEL)
        );
        const calculatedLevel = computedLevelIndex + 1; // 1 to 10
        const activeConfig = LEVEL_CONFIGS[computedLevelIndex];

        // Progress percentage within the current level (0 to 100%)
        const metersInLevel = meters % METERS_PER_LEVEL;
        const levelPct = Math.min(100, Math.floor((metersInLevel / METERS_PER_LEVEL) * 100));
        s.levelProgress = computedLevelIndex === 9 && meters >= 450 ? 100 : levelPct;

        // Has player completed a level and promoted?
        if (calculatedLevel > s.currentLevel) {
          const completedLevel = s.currentLevel;
          s.currentLevel = calculatedLevel;
          s.levelName = activeConfig.name;
          s.gameSpeed = activeConfig.speed; // Speed increases upon completing level!
          s.score += activeConfig.bonus;     // Level clear score bonus

          setCurrentLevel(calculatedLevel);
          setLevelName(activeConfig.name);

          // Level-up celebratory announcement banner
          s.bannerTitle = `★ LEVEL ${completedLevel} COMPLETED! (+${activeConfig.bonus} PTS) ★`;
          s.bannerSubtitle = `⚡ LEVEL ${calculatedLevel}: ${activeConfig.name} • SPEED -> ${activeConfig.speed.toFixed(1)}x! ⚡`;
          s.bannerTimer = 130;
          playSound("levelup");

          // Confetti celebration particles
          for (let sp = 0; sp < 35; sp++) {
            s.particles.push({
              x: 340 + (Math.random() - 0.5) * 320,
              y: 120 + (Math.random() - 0.5) * 60,
              vx: (Math.random() - 0.5) * 9,
              vy: (Math.random() - 0.5) * 8 - 2,
              size: Math.random() * 5 + 2,
              color: ["#F59E0B", "#38BDF8", "#EC4899", "#22C55E", "#FDE047"][sp % 5],
              alpha: 1,
              life: 0,
              maxLife: 45,
            });
          }
        }

        // Victory check: Completed all 10 levels (450 meters)
        if (meters >= 450 && !s.isVictory) {
          s.isVictory = true;
          setIsVictory(true);
          s.score += 5000;
          s.bannerTitle = "🏆 ALL 10 LEVELS CLEARED! 🏆";
          s.bannerSubtitle = "👑 SSS-RANK SUPREME RONIN MASTER (+5000 BONUS) 👑";
          s.bannerTimer = 180;
          playSound("victory");

          for (let vp = 0; vp < 50; vp++) {
            s.particles.push({
              x: 340 + (Math.random() - 0.5) * 400,
              y: 100 + (Math.random() - 0.5) * 80,
              vx: (Math.random() - 0.5) * 12,
              vy: (Math.random() - 0.5) * 10 - 3,
              size: Math.random() * 6 + 3,
              color: "#FBBF24",
              alpha: 1,
              life: 0,
              maxLife: 55,
            });
          }
        }

        // Speed is locked to the current level's speed
        s.gameSpeed = activeConfig.speed;

        // Score ticks with level multiplier
        const scoreMultiplier = 1 + (s.currentLevel - 1) * 0.2;
        s.score += Math.floor((dt / 35) * scoreMultiplier);
        setCurrentScore(s.score);

        if (s.bannerTimer > 0) {
          s.bannerTimer -= 1;
        }

        // 3. Samurai physics (Floaty & forgiving)
        const groundY = 310;
        if (!s.samurai.isGrounded) {
          s.samurai.vy += 0.58;
          s.samurai.y += s.samurai.vy;
          if (s.samurai.y >= groundY) {
            s.samurai.y = groundY;
            s.samurai.vy = 0;
            s.samurai.isGrounded = true;
          }
        }

        if (s.samurai.isSliding) {
          s.samurai.slideTimer -= 1;
          if (s.samurai.slideTimer <= 0) {
            s.samurai.isSliding = false;
          }
        }

        if (s.samurai.isSlashing) {
          s.samurai.slashTimer -= 1;
          if (s.samurai.slashTimer <= 0) {
            s.samurai.isSlashing = false;
          }
        }

        s.samurai.runFrame += s.gameSpeed * 0.08;

        // 4. Parallax Background updates
        s.bgMoonOffset += 0.15;
        s.bgMountainsOffset += s.gameSpeed * 0.15;
        s.bgToriiOffset += s.gameSpeed * 0.45;
        s.bgGroundOffset = (s.bgGroundOffset + s.gameSpeed) % 40;

        // 5. Spawn Obstacles based on current level configuration
        s.nextObstacleDist -= s.gameSpeed;
        if (s.nextObstacleDist <= 0) {
          const isHigh = Math.random() < activeConfig.highRatio;
          const obsType = isHigh ? "high" : "low";

          const newObs: Obstacle = {
            id: Date.now() + Math.random(),
            type: obsType,
            x: 720,
            y: isHigh ? 250 : 332,
            width: isHigh ? 36 : 30,
            height: isHigh ? 36 : 40,
            speed: s.gameSpeed,
            passed: false,
            destroyed: false,
            rotation: 0,
          };
          s.obstacles.push(newObs);

          s.nextObstacleDist = Math.random() * (activeConfig.maxGap - activeConfig.minGap) + activeConfig.minGap;
        }

        // 6. Spawn Collectibles (Chakra Scrolls & Health Recovery Hearts)
        s.nextItemDist -= s.gameSpeed;
        if (s.nextItemDist <= 0) {
          const spawnHeart = s.lives < 3 && Math.random() < 0.35;
          s.collectibles.push({
            id: Date.now() + Math.random(),
            type: spawnHeart ? "heart" : "scroll",
            x: 720,
            y: Math.random() > 0.5 ? 260 : 310,
            width: 28,
            height: 28,
            collected: false,
            pulse: 0,
          });
          s.nextItemDist = Math.random() * 320 + 360;
        }

        // 7. Collision Detection & Lives
        const isInvincible = s.invincibleTimer > 0;
        const isMercy = s.mercyTimer > 0;

        const playerBox = {
          x: s.samurai.x + 12,
          y: s.samurai.isSliding ? s.samurai.y + 40 : s.samurai.y + 12,
          w: s.samurai.width - 24,
          h: s.samurai.isSliding ? 20 : s.samurai.height - 20,
        };

        for (let i = s.obstacles.length - 1; i >= 0; i--) {
          const obs = s.obstacles[i];
          obs.x -= s.gameSpeed;
          obs.rotation += 0.12;

          if (!obs.passed && obs.x + obs.width < s.samurai.x) {
            obs.passed = true;
            s.score += Math.floor(50 * scoreMultiplier);
          }

          if (!obs.destroyed) {
            const obsBox = {
              x: obs.x + 8,
              y: obs.y + 8,
              w: obs.width - 16,
              h: obs.height - 16,
            };

            const hit =
              playerBox.x < obsBox.x + obsBox.w &&
              playerBox.x + playerBox.w > obsBox.x &&
              playerBox.y < obsBox.y + obsBox.h &&
              playerBox.y + playerBox.h > obsBox.y;

            if (hit) {
              if (isInvincible) {
                obs.destroyed = true;
                s.score += Math.floor(250 * scoreMultiplier);
                playSound("hit");

                for (let k = 0; k < 20; k++) {
                  s.particles.push({
                    x: obs.x + obs.width / 2,
                    y: obs.y + obs.height / 2,
                    vx: (Math.random() - 0.5) * 12,
                    vy: (Math.random() - 0.5) * 12,
                    size: Math.random() * 6 + 2,
                    color: k % 2 === 0 ? "#F59E0B" : "#EF4444",
                    alpha: 1,
                    life: 0,
                    maxLife: 30,
                  });
                }
                s.particles.push({
                  x: obs.x,
                  y: obs.y - 15,
                  vx: 0,
                  vy: -2,
                  size: 15,
                  color: "#FBBF24",
                  alpha: 1,
                  life: 0,
                  maxLife: 35,
                  text: `+${Math.floor(250 * scoreMultiplier)} SHATTERED!`,
                });
              } else if (!isMercy) {
                // 3 Hearts Life System
                obs.destroyed = true;
                s.lives -= 1;
                s.mercyTimer = 1800; // 1.8s mercy frames
                setLives(s.lives);
                playSound("hit");

                for (let k = 0; k < 15; k++) {
                  s.particles.push({
                    x: s.samurai.x + s.samurai.width / 2,
                    y: s.samurai.y + s.samurai.height / 2,
                    vx: (Math.random() - 0.5) * 8,
                    vy: (Math.random() - 0.5) * 8,
                    size: Math.random() * 4 + 2,
                    color: "#EF4444",
                    alpha: 1,
                    life: 0,
                    maxLife: 30,
                  });
                }

                s.particles.push({
                  x: s.samurai.x,
                  y: s.samurai.y - 20,
                  vx: 0,
                  vy: -1.8,
                  size: 15,
                  color: "#F87171",
                  alpha: 1,
                  life: 0,
                  maxLife: 40,
                  text: s.lives > 0 ? `💔 -1 LIFE! (${s.lives} REMAINING)` : "💔 OUT OF LIVES!",
                });

                if (s.lives <= 0) {
                  s.gameState = "gameover";
                  setGameState("gameover");
                  playSound("gameover");

                  const isNewHigh = s.score > s.highScore;
                  if (isNewHigh) {
                    s.highScore = s.score;
                    setHighScore(s.score);
                    if (typeof window !== "undefined") {
                      localStorage.setItem("samurai_runner_highscore", s.score.toString());
                    }
                  }

                  if (onGameOver) {
                    onGameOver(s.score, isNewHigh);
                  }
                  break;
                }
              }
            }
          }

          if (obs.x < -100) {
            s.obstacles.splice(i, 1);
          }
        }

        // 8. Update Collectibles
        for (let i = s.collectibles.length - 1; i >= 0; i--) {
          const item = s.collectibles[i];
          item.x -= s.gameSpeed;
          item.pulse += 0.08;

          if (!item.collected) {
            const collected =
              playerBox.x < item.x + item.width + 10 &&
              playerBox.x + playerBox.w > item.x - 10 &&
              playerBox.y < item.y + item.height + 10 &&
              playerBox.y + playerBox.h > item.y - 10;

            if (collected) {
              item.collected = true;

              if (item.type === "heart") {
                s.lives = Math.min(3, s.lives + 1);
                setLives(s.lives);
                playSound("heal");
                s.particles.push({
                  x: item.x,
                  y: item.y - 15,
                  vx: 0,
                  vy: -1.6,
                  size: 15,
                  color: "#EC4899",
                  alpha: 1,
                  life: 0,
                  maxLife: 40,
                  text: "❤️ +1 HEART HEALED!",
                });
              } else {
                s.powersStored = Math.min(5, s.powersStored + 1);
                s.score += Math.floor(150 * scoreMultiplier);
                setPowersStored(s.powersStored);
                playSound("pickup");
                s.particles.push({
                  x: item.x,
                  y: item.y - 15,
                  vx: 0,
                  vy: -1.6,
                  size: 14,
                  color: "#FBBF24",
                  alpha: 1,
                  life: 0,
                  maxLife: 40,
                  text: "+1 CHAKRA SCROLL!",
                });
              }

              for (let p = 0; p < 12; p++) {
                s.particles.push({
                  x: item.x + item.width / 2,
                  y: item.y + item.height / 2,
                  vx: (Math.random() - 0.5) * 6,
                  vy: (Math.random() - 0.5) * 6,
                  size: Math.random() * 4 + 2,
                  color: item.type === "heart" ? "#F43F5E" : "#FCD34D",
                  alpha: 1,
                  life: 0,
                  maxLife: 25,
                });
              }
            }
          }

          if (item.x < -60 || item.collected) {
            s.collectibles.splice(i, 1);
          }
        }

        // 9. Particles
        for (let i = s.particles.length - 1; i >= 0; i--) {
          const p = s.particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life += 1;
          p.alpha = 1 - p.life / p.maxLife;
          if (p.life >= p.maxLife) {
            s.particles.splice(i, 1);
          }
        }

        // Notify parent HUD
        if (onScoreUpdate) {
          onScoreUpdate(
            s.score,
            s.highScore,
            meters,
            s.powersStored,
            s.invincibleTimer,
            s.currentLevel,
            s.levelName,
            s.gameSpeed,
            s.lives,
            s.levelProgress,
            s.isVictory
          );
        }
      }

      // ==========================================
      // DRAW CANVAS FRAME (Width: 680, Height: 440)
      // ==========================================
      ctx.clearRect(0, 0, 680, 440);

      // A. Parallax Night Cyberpunk Sky & Blood Moon
      const gradSky = ctx.createLinearGradient(0, 0, 0, 360);
      gradSky.addColorStop(0, "#0F0B1A");
      gradSky.addColorStop(0.65, "#1E112A");
      gradSky.addColorStop(1, "#3B1238");
      ctx.fillStyle = gradSky;
      ctx.fillRect(0, 0, 680, 440);

      // Distant Stars
      ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
      for (let star = 0; star < 30; star++) {
        const sx = (star * 73 + s.bgMoonOffset * 0.1) % 680;
        const sy = (star * 31) % 200;
        ctx.fillRect(sx, sy, star % 3 === 0 ? 2 : 1, star % 3 === 0 ? 2 : 1);
      }

      // Blood Moon
      ctx.save();
      const moonX = 520;
      const moonY = 100;
      const moonGrad = ctx.createRadialGradient(moonX, moonY, 15, moonX, moonY, 55);
      moonGrad.addColorStop(0, "#FEF08A");
      moonGrad.addColorStop(0.5, "#F87171");
      moonGrad.addColorStop(1, "rgba(220, 38, 38, 0)");
      ctx.fillStyle = moonGrad;
      ctx.beginPath();
      ctx.arc(moonX, moonY, 55, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#F43F5E";
      ctx.beginPath();
      ctx.arc(moonX, moonY, 34, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Mount Fuji Silhouettes
      ctx.save();
      ctx.fillStyle = "#1A0F2B";
      ctx.beginPath();
      ctx.moveTo(0, 360);
      const fujiX = ((300 - s.bgMountainsOffset * 0.25) % 800) - 100;
      ctx.lineTo(fujiX - 160, 360);
      ctx.lineTo(fujiX, 180);
      ctx.lineTo(fujiX + 160, 360);
      ctx.lineTo(680, 360);
      ctx.lineTo(680, 440);
      ctx.lineTo(0, 440);
      ctx.fill();

      // Pagoda silhouette
      const pagodaX = ((550 - s.bgMountainsOffset * 0.5) % 750) - 60;
      ctx.fillStyle = "#2D1537";
      ctx.fillRect(pagodaX + 10, 240, 30, 120);
      ctx.beginPath();
      ctx.moveTo(pagodaX - 10, 260);
      ctx.lineTo(pagodaX + 25, 235);
      ctx.lineTo(pagodaX + 60, 260);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(pagodaX - 5, 290);
      ctx.lineTo(pagodaX + 25, 270);
      ctx.lineTo(pagodaX + 55, 290);
      ctx.fill();
      ctx.restore();

      // Cyber Torii Gates
      ctx.save();
      const toriiShift = s.bgToriiOffset % 540;
      for (let t = -1; t < 2; t++) {
        const tx = 540 * t + 400 - toriiShift;
        if (tx > -100 && tx < 780) {
          ctx.fillStyle = "#991B1B";
          ctx.fillRect(tx, 220, 12, 140);
          ctx.fillRect(tx + 65, 220, 12, 140);
          ctx.fillStyle = "#DC2626";
          ctx.fillRect(tx - 10, 215, 97, 10);
          ctx.fillRect(tx - 4, 230, 85, 6);
          ctx.fillStyle = "#F59E0B";
          ctx.font = "bold 10px monospace";
          ctx.fillText("武士道", tx + 20, 230);
        }
      }
      ctx.restore();

      // B. Ground Path
      const groundGrad = ctx.createLinearGradient(0, 360, 0, 440);
      groundGrad.addColorStop(0, "#18181B");
      groundGrad.addColorStop(0.3, "#27272A");
      groundGrad.addColorStop(1, "#09090B");
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, 360, 680, 80);

      ctx.strokeStyle = "#F97316";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 361);
      ctx.lineTo(680, 361);
      ctx.stroke();

      ctx.strokeStyle = "#A855F7";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 368);
      ctx.lineTo(680, 368);
      ctx.stroke();

      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.lineWidth = 2;
      for (let gx = -s.bgGroundOffset; gx < 680; gx += 40) {
        ctx.beginPath();
        ctx.moveTo(gx, 368);
        ctx.lineTo(gx - 20, 440);
        ctx.stroke();
      }

      // C. Draw Collectibles
      s.collectibles.forEach((item) => {
        if (item.collected) return;
        ctx.save();
        const floatY = item.y + Math.sin(item.pulse) * 5;

        if (item.type === "heart") {
          const haloGrad = ctx.createRadialGradient(
            item.x + item.width / 2,
            floatY + item.height / 2,
            2,
            item.x + item.width / 2,
            floatY + item.height / 2,
            22
          );
          haloGrad.addColorStop(0, "rgba(244, 63, 94, 0.9)");
          haloGrad.addColorStop(0.6, "rgba(236, 72, 153, 0.4)");
          haloGrad.addColorStop(1, "rgba(236, 72, 153, 0)");
          ctx.fillStyle = haloGrad;
          ctx.beginPath();
          ctx.arc(item.x + item.width / 2, floatY + item.height / 2, 22, 0, Math.PI * 2);
          ctx.fill();

          ctx.font = "20px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("❤️", item.x + item.width / 2, floatY + item.height / 2 + 7);
        } else {
          const haloGrad = ctx.createRadialGradient(
            item.x + item.width / 2,
            floatY + item.height / 2,
            2,
            item.x + item.width / 2,
            floatY + item.height / 2,
            22
          );
          haloGrad.addColorStop(0, "rgba(251, 191, 36, 0.9)");
          haloGrad.addColorStop(0.6, "rgba(245, 158, 11, 0.4)");
          haloGrad.addColorStop(1, "rgba(245, 158, 11, 0)");
          ctx.fillStyle = haloGrad;
          ctx.beginPath();
          ctx.arc(item.x + item.width / 2, floatY + item.height / 2, 22, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#FDE68A";
          ctx.fillRect(item.x + 4, floatY + 4, item.width - 8, item.height - 8);
          ctx.fillStyle = "#D97706";
          ctx.fillRect(item.x + 2, floatY + 2, 4, item.height - 4);
          ctx.fillRect(item.x + item.width - 6, floatY + 2, 4, item.height - 4);
          ctx.fillStyle = "#DC2626";
          ctx.font = "bold 12px sans-serif";
          ctx.fillText("巻", item.x + 8, floatY + 18);
        }
        ctx.restore();
      });

      // D. Draw Obstacles
      s.obstacles.forEach((obs) => {
        if (obs.destroyed) return;
        ctx.save();

        if (obs.type === "low") {
          ctx.fillStyle = "#DC2626";
          ctx.beginPath();
          ctx.moveTo(obs.x, 360);
          ctx.lineTo(obs.x + 8, obs.y + 4);
          ctx.lineTo(obs.x + 16, 360);
          ctx.lineTo(obs.x + 24, obs.y);
          ctx.lineTo(obs.x + obs.width, 360);
          ctx.closePath();
          ctx.fill();

          ctx.strokeStyle = "#FCA5A5";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.fillStyle = "#FEF08A";
          ctx.beginPath();
          ctx.arc(obs.x + 16, obs.y + 20, 3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.translate(obs.x + obs.width / 2, obs.y + obs.height / 2);
          ctx.rotate(obs.rotation);

          ctx.fillStyle = "#38BDF8";
          ctx.beginPath();
          for (let p = 0; p < 4; p++) {
            const a = (p * Math.PI) / 2;
            ctx.lineTo(Math.cos(a) * 18, Math.sin(a) * 18);
            ctx.lineTo(Math.cos(a + Math.PI / 4) * 6, Math.sin(a + Math.PI / 4) * 6);
          }
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = "#E0F2FE";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.fillStyle = "#0F172A";
          ctx.beginPath();
          ctx.arc(0, 0, 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // E. Draw Samurai Character
      ctx.save();
      const sam = s.samurai;
      const isInvincibleNow = s.invincibleTimer > 0;
      const isMercyNow = s.mercyTimer > 0;

      if (isMercyNow && Math.floor(time / 100) % 2 === 0) {
        ctx.globalAlpha = 0.4;
      }

      if (isInvincibleNow) {
        const auraTime = time * 0.01;
        const auraPulse = Math.sin(auraTime * 4) * 6;

        const auraGrad = ctx.createRadialGradient(
          sam.x + sam.width / 2,
          sam.y + sam.height / 2,
          10,
          sam.x + sam.width / 2,
          sam.y + sam.height / 2,
          48 + auraPulse
        );
        auraGrad.addColorStop(0, "rgba(251, 191, 36, 0.85)");
        auraGrad.addColorStop(0.5, "rgba(236, 72, 153, 0.55)");
        auraGrad.addColorStop(1, "rgba(168, 85, 247, 0)");
        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(sam.x + sam.width / 2, sam.y + sam.height / 2, 48 + auraPulse, 0, Math.PI * 2);
        ctx.fill();

        for (let clone = 1; clone <= 3; clone++) {
          ctx.fillStyle = `rgba(245, 158, 11, ${0.35 / clone})`;
          ctx.fillRect(
            sam.x - clone * 16,
            sam.y + (sam.isSliding ? 30 : 10),
            sam.width,
            sam.isSliding ? 30 : sam.height
          );
        }
      }

      // 2. Samurai Body
      if (sam.isSliding) {
        const slideY = sam.y + 36;
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.fillRect(sam.x - 25, slideY + 20, 22, 3);

        ctx.fillStyle = isInvincibleNow ? "#F59E0B" : "#1E1B4B";
        ctx.fillRect(sam.x - 4, slideY + 8, 48, 16);

        ctx.fillStyle = "#DC2626";
        ctx.fillRect(sam.x + 12, slideY + 10, 8, 12);

        ctx.fillStyle = "#E0E7FF";
        ctx.beginPath();
        ctx.arc(sam.x + 40, slideY + 12, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#78350F";
        ctx.beginPath();
        ctx.ellipse(sam.x + 40, slideY + 7, 14, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = isInvincibleNow ? "#FDE047" : "#E2E8F0";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(sam.x - 12, slideY + 15);
        ctx.lineTo(sam.x + 12, slideY + 15);
        ctx.stroke();
      } else {
        const legPhase = Math.sin(sam.runFrame);
        const bob = sam.isGrounded ? Math.abs(Math.sin(sam.runFrame * 2)) * 4 : 0;
        const py = sam.y - bob;

        ctx.fillStyle = isInvincibleNow ? "#F59E0B" : "#DC2626";
        ctx.beginPath();
        ctx.moveTo(sam.x + 14, py + 18);
        ctx.quadraticCurveTo(sam.x - 18, py + 22 + legPhase * 4, sam.x - 28, py + 14 - legPhase * 6);
        ctx.lineTo(sam.x - 22, py + 26);
        ctx.lineTo(sam.x + 14, py + 24);
        ctx.fill();

        ctx.strokeStyle = "#0F172A";
        ctx.lineWidth = 5;
        ctx.lineCap = "round";

        if (sam.isGrounded) {
          ctx.beginPath();
          ctx.moveTo(sam.x + 18, py + 42);
          ctx.lineTo(sam.x + 18 + legPhase * 14, py + 54);
          ctx.lineTo(sam.x + 22 + legPhase * 16, py + 64);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(sam.x + 14, py + 42);
          ctx.lineTo(sam.x + 14 - legPhase * 14, py + 54);
          ctx.lineTo(sam.x + 10 - legPhase * 16, py + 64);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.moveTo(sam.x + 16, py + 42);
          ctx.lineTo(sam.x + 8, py + 52);
          ctx.lineTo(sam.x + 24, py + 54);
          ctx.stroke();
        }

        ctx.fillStyle = isInvincibleNow ? "#FDE68A" : "#1E1B4B";
        ctx.fillRect(sam.x + 8, py + 18, 22, 26);

        ctx.fillStyle = "#DC2626";
        ctx.fillRect(sam.x + 6, py + 34, 26, 6);

        ctx.strokeStyle = isInvincibleNow ? "#F59E0B" : "#D4D4D8";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(sam.x - 4, py + 32);
        ctx.lineTo(sam.x + 24, py + 38);
        ctx.stroke();

        if (sam.isSlashing) {
          ctx.strokeStyle = "rgba(56, 189, 248, 0.9)";
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(sam.x + 40, py + 26, 42, -Math.PI / 3, Math.PI / 3);
          ctx.stroke();
        }

        ctx.fillStyle = "#FED7AA";
        ctx.beginPath();
        ctx.arc(sam.x + 19, py + 12, 9, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#0F172A";
        ctx.fillRect(sam.x + 14, py + 10, 10, 4);

        ctx.fillStyle = "#78350F";
        ctx.beginPath();
        ctx.moveTo(sam.x + 2, py + 8);
        ctx.lineTo(sam.x + 19, py - 4);
        ctx.lineTo(sam.x + 36, py + 8);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = "#B45309";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      ctx.restore();

      // F. Particles
      s.particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        if (p.text) {
          ctx.font = `bold ${p.size}px monospace`;
          ctx.fillStyle = p.color;
          ctx.fillText(p.text, p.x, p.y);
        } else {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // G. Top In-Game HUD
      ctx.save();
      // Score pill top-left
      ctx.fillStyle = "rgba(15, 10, 25, 0.75)";
      ctx.fillRect(14, 12, 170, 32);
      ctx.strokeStyle = "rgba(249, 115, 22, 0.4)";
      ctx.strokeRect(14, 12, 170, 32);

      ctx.fillStyle = "#F97316";
      ctx.font = "bold 11px monospace";
      ctx.fillText("SCORE:", 22, 32);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 15px monospace";
      ctx.fillText(`${s.score.toString().padStart(6, "0")}`, 74, 33);

      // High Score & Hearts (Lives) top-right
      ctx.fillStyle = "rgba(15, 10, 25, 0.75)";
      ctx.fillRect(490, 12, 176, 32);
      ctx.strokeStyle = "rgba(168, 85, 247, 0.4)";
      ctx.strokeRect(490, 12, 176, 32);

      ctx.fillStyle = "#A855F7";
      ctx.font = "bold 10px monospace";
      ctx.fillText("HI:", 496, 32);
      ctx.fillStyle = "#FDE047";
      ctx.font = "bold 13px monospace";
      ctx.fillText(`${s.highScore.toString().padStart(5, "0")}`, 516, 33);

      // Lives / Hearts (♥♥♥)
      const heartString = "❤️".repeat(Math.max(0, s.lives)) + "🖤".repeat(Math.max(0, 3 - s.lives));
      ctx.font = "14px sans-serif";
      ctx.fillText(heartString, 584, 33);

      // Power Stock & Active Invincible Timer Bar (Center)
      if (s.invincibleTimer > 0) {
        const remainingSec = (s.invincibleTimer / 1000).toFixed(1);
        const barWidth = (s.invincibleTimer / 5000) * 160;

        ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
        ctx.fillRect(250, 12, 180, 32);
        ctx.strokeStyle = "#F59E0B";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(250, 12, 180, 32);

        ctx.fillStyle = "#F59E0B";
        ctx.fillRect(252, 14, (barWidth / 160) * 176, 28);

        ctx.fillStyle = "#000000";
        ctx.font = "900 12px monospace";
        ctx.fillText(`⚡ INVINCIBLE: ${remainingSec}s`, 266, 33);
      } else {
        ctx.fillStyle = "rgba(15, 10, 25, 0.75)";
        ctx.fillRect(250, 12, 180, 32);
        ctx.strokeStyle = "rgba(251, 191, 36, 0.5)";
        ctx.strokeRect(250, 12, 180, 32);

        ctx.fillStyle = "#FBBF24";
        ctx.font = "bold 10px monospace";
        ctx.fillText("CHAKRA [X]:", 258, 32);

        for (let sc = 0; sc < 5; sc++) {
          const filled = sc < s.powersStored;
          ctx.fillStyle = filled ? "#F59E0B" : "rgba(255, 255, 255, 0.15)";
          ctx.fillRect(345 + sc * 15, 22, 10, 12);
        }
      }

      // CURRENT LEVEL & PROGRESS BAR (Top-center under HUD)
      if (s.gameState === "playing") {
        // Level Pill container
        ctx.fillStyle =
          s.currentLevel <= 3
            ? "rgba(34, 197, 94, 0.9)"
            : s.currentLevel <= 6
            ? "rgba(56, 189, 248, 0.9)"
            : s.currentLevel <= 8
            ? "rgba(245, 158, 11, 0.95)"
            : "rgba(239, 68, 68, 0.95)";
        ctx.fillRect(240, 48, 200, 20);
        ctx.fillStyle = "#000000";
        ctx.font = "900 10px monospace";
        ctx.textAlign = "center";
        ctx.fillText(
          `LVL ${s.currentLevel}/10: ${s.levelName} (${s.gameSpeed.toFixed(1)}x SPEED)`,
          340,
          62
        );

        // Level Completion Progress Sub-bar
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(240, 68, 200, 5);
        ctx.fillStyle = s.currentLevel === 10 ? "#EF4444" : "#FBBF24";
        ctx.fillRect(240, 68, (s.levelProgress / 100) * 200, 5);
        ctx.textAlign = "start";
      }

      // H. Dynamic Level-Up & Level Completion Celebration Banner
      if (s.bannerTimer > 0 && s.gameState === "playing") {
        const bannerAlpha = Math.min(1, s.bannerTimer / 25);
        ctx.save();
        ctx.globalAlpha = bannerAlpha;
        ctx.fillStyle = "rgba(10, 5, 20, 0.92)";
        ctx.fillRect(90, 145, 500, 62);
        ctx.strokeStyle = s.isVictory
          ? "#FBBF24"
          : s.currentLevel <= 3
          ? "#22C55E"
          : s.currentLevel <= 6
          ? "#38BDF8"
          : s.currentLevel <= 8
          ? "#F59E0B"
          : "#EF4444";
        ctx.lineWidth = 2.5;
        ctx.strokeRect(90, 145, 500, 62);

        ctx.textAlign = "center";
        ctx.fillStyle = ctx.strokeStyle;
        ctx.font = "900 16px monospace";
        ctx.fillText(s.bannerTitle, 340, 172);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 12px monospace";
        ctx.fillText(s.bannerSubtitle, 340, 194);
        ctx.restore();
      }

      // I. Overlay Screens: Idle / Game Over
      if (s.gameState === "idle") {
        ctx.save();
        ctx.fillStyle = "rgba(10, 7, 20, 0.75)";
        ctx.fillRect(0, 0, 680, 440);

        ctx.textAlign = "center";
        ctx.fillStyle = "#F97316";
        ctx.font = "900 28px sans-serif";
        ctx.fillText("SHONEN SAMURAI RUNNER", 340, 140);

        ctx.fillStyle = "#FDE047";
        ctx.font = "bold 14px monospace";
        ctx.fillText("「10段階武士道試練・速度上昇電脳遊戯」", 340, 172);

        ctx.fillStyle = "#38BDF8";
        ctx.font = "900 13px monospace";
        ctx.fillText("⚡ 10 DISTINCT LEVELS • SPEED INCREASES AFTER EACH LEVEL! ⚡", 340, 206);

        ctx.fillStyle = "#34D399";
        ctx.font = "bold 12px monospace";
        ctx.fillText("❤️ 3 LIVES / HEARTS  •  COLLECT SCROLLS FOR 5s INVINCIBILITY", 340, 235);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 16px monospace";
        ctx.fillText("▶ PRESS [START] / [A] / [SPACE] TO START LVL 1 ◀", 340, 280);

        ctx.fillStyle = "#94A3B8";
        ctx.font = "12px monospace";
        ctx.fillText("D-PAD / WASD: MOVE  •  [A]/UP: JUMP  •  [B]/DOWN: SLIDE", 340, 318);
        ctx.fillText("[X]/E: 5s INVINCIBILITY  •  [Y]/Z: KATANA SLASH", 340, 338);
        ctx.restore();
      } else if (s.gameState === "gameover") {
        ctx.save();
        ctx.fillStyle = "rgba(15, 5, 20, 0.88)";
        ctx.fillRect(0, 0, 680, 440);

        ctx.textAlign = "center";
        ctx.fillStyle = "#EF4444";
        ctx.font = "900 36px sans-serif";
        ctx.fillText("GAME OVER", 340, 145);

        ctx.fillStyle = "#F59E0B";
        ctx.font = "bold 16px monospace";
        ctx.fillText(`FINAL SCORE: ${s.score}`, 340, 185);

        ctx.fillStyle = "#38BDF8";
        ctx.font = "bold 14px monospace";
        ctx.fillText(`REACHED: LEVEL ${s.currentLevel} / 10 (${s.levelName})`, 340, 215);

        if (s.score >= s.highScore && s.score > 0) {
          ctx.fillStyle = "#22C55E";
          ctx.font = "bold 14px monospace";
          ctx.fillText("★ NEW RECORD UNLOCKED! ★", 340, 245);
        } else {
          ctx.fillStyle = "#94A3B8";
          ctx.font = "13px monospace";
          ctx.fillText(`BEST SCORE: ${s.highScore}`, 340, 245);
        }

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 15px monospace";
        ctx.fillText("▶ PRESS [START] / [A] / [SPACE] TO RESTART ◀", 340, 295);
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPaused, onScoreUpdate, onGameOver, playSound]);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        width={680}
        height={440}
        onClick={() => {
          if (stateRef.current.gameState !== "playing") {
            startGame();
          }
        }}
        className="w-full h-full object-contain cursor-pointer"
        style={{ imageRendering: "auto" }}
      />
    </div>
  );
}
