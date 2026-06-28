"use client";

type Props = {
  search: string;
  setSearch: (val: string) => void;
};

export default function ProjectSearch({ search, setSearch }: Props) {
  return (
    <div className="relative group w-full">
      {/* Search icon */}
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 pointer-events-none transition-colors duration-200 group-focus-within:text-sky-400"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
      </svg>

      <input
        type="search"
        placeholder="Search projects..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search projects"
        className="w-full pl-11 pr-11 py-3.5 rounded-[16px] text-sm bg-[#0f0f10] border border-white/[0.07] text-white placeholder:text-neutral-600 focus:outline-none focus:border-sky-500/40 focus:bg-[#111112] transition-all duration-300 font-mono"
      />

      {/* Clear button */}
      {search && (
        <button
          onClick={() => setSearch("")}
          aria-label="Clear search"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white/[0.07] flex items-center justify-center text-neutral-500 hover:text-white hover:bg-white/[0.12] transition-all duration-200"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}