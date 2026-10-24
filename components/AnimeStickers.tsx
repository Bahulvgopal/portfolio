"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * 1. Chibi Developer Hero Anime Die-Cut Sticker
 */
export function ChibiHeroSticker({
  className = "",
  size = 110,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.15, rotate: 6 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        y: [0, -7, 0],
      }}
      transition={{
        y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
        scale: { type: "spring", stiffness: 400, damping: 20 },
      }}
      className={`relative select-none cursor-pointer filter drop-shadow-[0_12px_24px_rgba(234,88,12,0.28)] ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/stickers/chibi_dev.png"
        alt="Anime Chibi Developer Sticker"
        fill
        className="object-contain"
        sizes={`${size}px`}
        priority
      />
    </motion.div>
  );
}

/**
 * 2. Anime Shonen Chakra Flame / Nine-Tails Fire Energy Sticker
 */
export function AnimeChakraSticker({
  className = "",
  size = 90,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.15, rotate: 180 }}
      animate={{
        rotate: 360,
        y: [0, -5, 0],
      }}
      transition={{
        rotate: { duration: 30, repeat: Infinity, ease: "linear" },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        scale: { type: "spring", stiffness: 350, damping: 20 },
      }}
      className={`relative select-none cursor-pointer filter drop-shadow-[0_10px_22px_rgba(234,88,12,0.32)] ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/stickers/chakra_flame.png"
        alt="Chakra Flame Anime Sticker"
        fill
        className="object-contain"
        sizes={`${size}px`}
      />
    </motion.div>
  );
}

/**
 * 3. Retro Manga S-Rank Action Stamp Sticker
 */
export function MangaActionBadge({
  className = "",
  size = 95,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.12, rotate: -4 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        y: [0, -4, 0],
      }}
      transition={{
        y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
        scale: { type: "spring", stiffness: 380, damping: 22 },
      }}
      className={`relative select-none cursor-pointer filter drop-shadow-[0_10px_22px_rgba(234,88,12,0.26)] ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/stickers/s_rank_badge.png"
        alt="S-Rank Manga Sticker"
        fill
        className="object-contain rotate-[-4deg] hover:rotate-[0deg] transition-transform duration-200"
        sizes={`${size}px`}
      />
    </motion.div>
  );
}

/**
 * 4. Manga Comic Speech / Emotion Bubble Sticker
 */
export function MangaSpeechBubble({
  className = "",
  text = "LEVEL UP! ⚡",
}: {
  className?: string;
  text?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.08, rotate: 2 }}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className={`relative inline-block select-none filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.08)] ${className}`}
    >
      <div className="relative px-3.5 py-1.5 rounded-2xl bg-white border-2 border-stone-900 text-stone-900 font-manga text-xs sm:text-sm font-bold tracking-wide uppercase flex items-center gap-1.5 shadow-xs">
        <span>{text}</span>
        {/* Comic Tail */}
        <div className="absolute -bottom-2 left-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-stone-900" />
        <div className="absolute -bottom-1.5 left-4.5 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-white" />
      </div>
    </motion.div>
  );
}

/**
 * 5. Experience / Quest Complete Holographic Stamp
 */
export function QuestCompleteSticker({
  className = "",
}: {
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 3 }}
      className={`inline-block select-none cursor-pointer filter drop-shadow-[0_6px_16px_rgba(234,88,12,0.2)] ${className}`}
    >
      <div className="relative p-1 rounded-2xl bg-white border-2 border-white rotate-[2.5deg] hover:rotate-[0deg] transition-transform duration-200">
        <div className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white flex items-center gap-2 border border-white/30 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <div className="flex flex-col">
            <span className="font-manga text-xs sm:text-sm font-bold text-white tracking-wider">
              QUEST CLEARED //
            </span>
            <span className="font-orbitron text-[8px] font-bold text-amber-100 tracking-widest uppercase">
              EXP +99999 「任務完了」
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

