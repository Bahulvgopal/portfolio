"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// Shimmer highlight effect for skeleton items
const ShimmerOverlay = () => (
  <motion.div
    initial={{ x: "-100%" }}
    animate={{ x: "200%" }}
    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none"
  />
);

export default function AnimeClickLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Immediately exit on admin and login routes so they never get blocked or frozen!
  if (pathname.startsWith("/admin") || pathname === "/login") {
    return null;
  }

  const [isLoading, setIsLoading] = useState(false);

  const prevPathRef = useRef(pathname);
  const safetyTimerRef = useRef<NodeJS.Timeout | null>(null);

  // When the background page completes loading, pathname updates!
  // The secondary loader ends immediately when the page loads, so its speed depends on the page loading.
  useEffect(() => {
    if (isLoading) {
      // Fade out immediately to reveal the new page
      const dismissTimer = setTimeout(() => {
        setIsLoading(false);
      }, 160);

      return () => clearTimeout(dismissTimer);
    }
    prevPathRef.current = pathname;
  }, [pathname, searchParams]);

  // Global click listener: launches full-screen skeleton when an internal link is clicked
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore external links, mailto, tel, downloads, or anchor hash jumps
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        target.getAttribute("target") === "_blank" ||
        target.hasAttribute("download")
      ) {
        return;
      }

      // Ignore click on current URL
      const currentUrl = window.location.pathname + window.location.search;
      if (href === currentUrl || href === window.location.pathname) {
        return;
      }

      // Launch Full Screen Anime Skeleton Loader!
      setIsLoading(true);

      // Safety fallback: auto-dismiss if route does not change after 6 seconds
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 6000);
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="anime-fullscreen-skeleton-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.22, ease: "easeOut" } }}
          className="fixed inset-0 z-[99990] bg-[#FAF8F5] overflow-y-auto select-none pointer-events-none"
        >
          {/* Subtle Grain Background */}
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 opacity-[0.025] z-0"
            style={{ backgroundImage: GRAIN_URL, backgroundSize: "128px" }}
          />

          {/* Ambient Lighting Orbs */}
          <div className="pointer-events-none fixed -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-orange-500/[0.05] blur-[150px] z-0" />
          <div className="pointer-events-none fixed bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-amber-500/[0.05] blur-[140px] z-0" />

          {/* ── FULL SCREEN SKELETON CONTENT STRUCTURE ─────────────── */}
          <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pt-28 sm:pt-36 pb-32">
            {/* Header Skeleton Block */}
            <div className="mb-10 sm:mb-12 space-y-4">
              {/* Badge Skeleton */}
              <div className="relative h-6 sm:h-7 w-44 rounded-full bg-stone-200/85 border border-stone-300/40 overflow-hidden shadow-xs">
                <ShimmerOverlay />
              </div>

              {/* Title Skeleton */}
              <div className="relative h-12 sm:h-16 w-3/4 max-w-lg rounded-2xl bg-stone-200/90 border border-stone-300/40 overflow-hidden shadow-xs">
                <ShimmerOverlay />
              </div>

              {/* Subtitle Lines Skeleton */}
              <div className="space-y-2 pt-2">
                <div className="relative h-4 w-full max-w-md rounded-lg bg-stone-200/70 border border-stone-300/30 overflow-hidden">
                  <ShimmerOverlay />
                </div>
                <div className="relative h-4 w-2/3 max-w-sm rounded-lg bg-stone-200/60 border border-stone-300/30 overflow-hidden">
                  <ShimmerOverlay />
                </div>
              </div>
            </div>

            {/* Filter & Search Bar Skeleton Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-stone-200/70">
              <div className="relative h-11 w-full sm:w-80 rounded-2xl bg-stone-200/75 border border-stone-300/40 overflow-hidden shadow-xs">
                <ShimmerOverlay />
              </div>

              <div className="flex items-center gap-2.5 overflow-x-hidden">
                {[18, 24, 20, 22].map((w, idx) => (
                  <div
                    key={idx}
                    className="relative h-9 rounded-xl bg-stone-200/70 border border-stone-300/30 overflow-hidden shadow-xs"
                    style={{ width: `${w * 4}px` }}
                  >
                    <ShimmerOverlay />
                  </div>
                ))}
              </div>
            </div>

            {/* 3-Card Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[1, 2, 3].map((cardId) => (
                <div
                  key={cardId}
                  className="rounded-3xl border border-stone-200/90 bg-white/70 backdrop-blur-md p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.03)] space-y-4"
                >
                  {/* Card Thumbnail Image Skeleton */}
                  <div className="relative h-48 sm:h-52 w-full rounded-2xl bg-stone-200/80 border border-stone-300/40 overflow-hidden shadow-inner">
                    <ShimmerOverlay />
                  </div>

                  {/* Card Meta Tag */}
                  <div className="relative h-5 w-24 rounded-full bg-orange-500/10 border border-orange-500/20 overflow-hidden">
                    <ShimmerOverlay />
                  </div>

                  {/* Card Title */}
                  <div className="relative h-6 w-4/5 rounded-lg bg-stone-200/80 border border-stone-300/30 overflow-hidden">
                    <ShimmerOverlay />
                  </div>

                  {/* Card Description */}
                  <div className="space-y-1.5">
                    <div className="relative h-3.5 w-full rounded-md bg-stone-200/60 overflow-hidden">
                      <ShimmerOverlay />
                    </div>
                    <div className="relative h-3.5 w-3/4 rounded-md bg-stone-200/60 overflow-hidden">
                      <ShimmerOverlay />
                    </div>
                  </div>

                  {/* Card Tags Row */}
                  <div className="flex items-center gap-2 pt-2 border-t border-stone-200/60">
                    <div className="relative h-6 w-16 rounded-lg bg-stone-200/60 overflow-hidden">
                      <ShimmerOverlay />
                    </div>
                    <div className="relative h-6 w-14 rounded-lg bg-stone-200/60 overflow-hidden">
                      <ShimmerOverlay />
                    </div>
                    <div className="relative h-6 w-16 rounded-lg bg-stone-200/60 overflow-hidden">
                      <ShimmerOverlay />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
