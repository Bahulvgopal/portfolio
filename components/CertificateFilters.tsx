"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  year: string;
  setYear: (value: string) => void;
  years: string[];
};

type DropdownProps = {
  label: string;
  value: string;
  values: string[];
  onChange: (value: string) => void;
};

/* ── Custom Frosted Dropdown ──────────────────────────────────────────────── */
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
          "w-full flex items-center justify-between gap-3 rounded-[16px] border px-4 py-3 text-xs font-orbitron tracking-wider uppercase text-left transition-all duration-200 shadow-sm",
          open
            ? "border-orange-500 bg-white text-stone-900 shadow-[0_6px_20px_rgba(234,88,12,0.15)]"
            : isFiltered
            ? "border-orange-500/60 bg-orange-50/70 text-orange-600 font-bold"
            : "border-stone-200/90 bg-white/80 backdrop-blur-xl text-stone-700 hover:border-orange-500/40 hover:text-orange-600",
        ].join(" ")}
      >
        <span>
          <span className="text-stone-400 mr-1.5">{label}:</span>
          <span className={isFiltered ? "text-orange-600 font-bold" : ""}>{value}</span>
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="w-3.5 h-3.5 text-stone-500 shrink-0"
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
            className="absolute mt-2 w-full rounded-[18px] border border-white/90 bg-white/95 backdrop-blur-2xl overflow-hidden z-50 shadow-2xl p-1"
          >
            {values.map((item) => {
              const active = item === value;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => { onChange(item); setOpen(false); }}
                  className={[
                    "w-full px-3.5 py-2.5 rounded-xl text-left font-orbitron text-[11px] font-bold tracking-wider transition-colors duration-150 flex items-center justify-between",
                    active
                      ? "text-white bg-gradient-to-r from-orange-600 to-amber-600 shadow-sm"
                      : "text-stone-700 hover:text-orange-600 hover:bg-orange-50/50",
                  ].join(" ")}
                >
                  <span>{item}</span>
                  {active && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
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
  search,
  setSearch,
  year,
  setYear,
  years,
}: Props) {
  const hasActiveFilter =
    search.trim() !== "" ||
    year !== "All";

  return (
    <div className="mb-10 space-y-4">
      {/* Search Bar */}
      <div className="relative group">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none transition-colors duration-200 group-focus-within:text-orange-600"
          fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
        </svg>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search certificates by title or issuer..."
          className="
            w-full pl-11 pr-11 py-3.5 rounded-[18px]
            font-orbitron text-xs sm:text-sm
            bg-white/80 backdrop-blur-xl
            border border-stone-200/90
            text-stone-900 placeholder:text-stone-400
            focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10
            shadow-[0_4px_20px_rgba(234,88,12,0.04)]
            transition-all duration-300
          "
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
              className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Row: dropdown + clear */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="w-full sm:w-56">
          <Dropdown
            label="Filter Year"
            value={year}
            values={years}
            onChange={setYear}
          />
        </div>

        <AnimatePresence>
          {hasActiveFilter && (
            <motion.button
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                setSearch("");
                setYear("All");
              }}
              className="self-end sm:self-center inline-flex items-center gap-1.5 font-orbitron text-[10px] font-bold text-stone-500 hover:text-orange-600 uppercase tracking-wider transition-colors duration-200"
            >
              Reset filters
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
