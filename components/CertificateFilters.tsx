"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  year: string;
  setYear: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  years: string[];
  categories: string[];
};

type DropdownProps = {
  label: string;
  value: string;
  values: string[];
  onChange: (value: string) => void;
};

/* ── Custom Dropdown ─────────────────────────────────────────────────────── */
function Dropdown({ label, value, values, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener("mousedown", handle);
    return () => window.removeEventListener("mousedown", handle);
  }, []);

  const isFiltered = value !== "All";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={[
          "w-full flex items-center justify-between gap-3 rounded-[14px] border px-4 py-3 text-sm font-mono tracking-wide text-left transition-all duration-200",
          open
            ? "border-sky-500/40 bg-[#111112] text-white"
            : isFiltered
            ? "border-sky-500/30 bg-sky-500/[0.04] text-white"
            : "border-white/[0.07] bg-[#0f0f10] text-neutral-400 hover:border-white/[0.14] hover:text-neutral-300",
        ].join(" ")}
      >
        <span>
          <span className="text-neutral-600 mr-1.5">{label}:</span>
          <span className={isFiltered ? "text-sky-400" : ""}>{value}</span>
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="w-3.5 h-3.5 text-neutral-600 shrink-0"
          fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -4, scaleY: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute mt-2 w-full rounded-[14px] border border-white/[0.08] bg-[#111112] overflow-hidden z-50 shadow-[0_16px_48px_rgba(0,0,0,0.6)]"
          >
            {values.map((item) => {
              const active = item === value;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => { onChange(item); setOpen(false); }}
                  className={[
                    "w-full px-4 py-2.5 text-left font-mono text-[12px] tracking-wide transition-colors duration-150 flex items-center justify-between",
                    active
                      ? "text-sky-400 bg-sky-500/[0.08]"
                      : "text-neutral-500 hover:text-neutral-200 hover:bg-white/[0.04]",
                  ].join(" ")}
                >
                  {item}
                  {active && (
                    <svg className="w-3 h-3 text-sky-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────────────────────── */
export default function CertificateFilters({
  search, setSearch,
  year, setYear,
  category, setCategory,
  years, categories,
}: Props) {
  const hasActiveFilter = search.trim() !== "" || year !== "All" || category !== "All";

  return (
    <div className="mb-10 space-y-4">

      {/* Search */}
      <div className="relative group">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 pointer-events-none transition-colors duration-200 group-focus-within:text-sky-400"
          fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
        </svg>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search certificates..."
          className="w-full pl-11 pr-11 py-3.5 rounded-[14px] text-sm bg-[#0f0f10] border border-white/[0.07] text-white placeholder:text-neutral-600 outline-none focus:border-sky-500/40 focus:bg-[#111112] transition-all duration-200 font-mono"
        />

        <AnimatePresence>
          {search && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-4 top-3 -translate-y-1/2 w-5 h-5 rounded-full bg-white/[0.07] flex items-center justify-center text-neutral-500 hover:text-white hover:bg-white/[0.12] transition-all duration-200"
            >
              <svg className="w-3 h-3 "  fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Dropdown
          label="Year"
          value={year}
          values={["All", ...years]}
          onChange={setYear}
        />
        <Dropdown
          label="Category"
          value={category}
          values={["All", ...categories]}
          onChange={setCategory}
        />
      </div>

      {/* Active filter strip */}
      <AnimatePresence>
        {hasActiveFilter && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-between"
          >
            <div className="flex flex-wrap gap-2">
              {search.trim() && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] text-sky-400 border border-sky-500/25 bg-sky-500/[0.06]">
                  &ldquo;{search}&rdquo;
                </span>
              )}
              {year !== "All" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] text-violet-400 border border-violet-500/25 bg-violet-500/[0.06]">
                  {year}
                </span>
              )}
              {category !== "All" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] text-emerald-400 border border-emerald-500/25 bg-emerald-500/[0.06]">
                  {category}
                </span>
              )}
            </div>

            <button
              onClick={() => { setSearch(""); setYear("All"); setCategory("All"); }}
              className="inline-flex items-center gap-1.5 font-mono text-[10px] text-neutral-600 hover:text-neutral-300 tracking-[0.1em] uppercase transition-colors duration-200 shrink-0 ml-4"
            >
              Clear all
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}