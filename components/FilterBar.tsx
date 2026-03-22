"use client";

import { useRef } from "react";

type Props = {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
};

export default function FilterBar({ options, selected, onChange }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleToggle = (option: string, e: React.MouseEvent) => {
    onChange(option);
    const target = e.currentTarget as HTMLElement;
    target.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <div className="relative w-full">
      {/* Edge fades — mobile only */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10 sm:hidden" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10 sm:hidden" />

      {/* Scroll container */}
      <div
        ref={scrollRef}
        role="group"
        aria-label="Filter projects by technology"
        className={[
          // Mobile: horizontal scroll, padding clears the fade overlays
          "flex gap-2 overflow-x-auto",
          "px-6 sm:px-0",
          "pb-1 sm:pb-0",
          // sm+: wrap naturally, no scroll
          "sm:flex-wrap sm:overflow-x-visible",
        ].join(" ")}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {options.map((option) => {
          const isActive = selected === option;

          return (
            <button
              key={option}
              onClick={(e) => handleToggle(option, e)}
              aria-pressed={isActive}
              className={[
                // Base shape & typography
                "relative shrink-0 px-4 py-1.5 rounded-full",
                "text-xs font-bold uppercase tracking-widest",
                "border transition-all duration-200 ease-out",
                // Focus ring
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                "dark:focus-visible:ring-offset-gray-950",
                // Press feedback
                "active:scale-95",
                // Active vs idle
                isActive
                  ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/30"
                  : [
                      "bg-white dark:bg-gray-900",
                      "border-gray-200 dark:border-gray-800",
                      "text-gray-500 dark:text-gray-400",
                      "hover:border-blue-400 dark:hover:border-blue-500",
                      "hover:text-blue-600 dark:hover:text-blue-400",
                      "hover:bg-blue-50 dark:hover:bg-blue-950/30",
                    ].join(" "),
              ].join(" ")}
            >
              {option}

              {/* Soft glow underline on active */}
              {isActive && (
                <span
                  aria-hidden
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2
                             w-1/2 h-0.5 rounded-full bg-blue-300 blur-[2px]"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}