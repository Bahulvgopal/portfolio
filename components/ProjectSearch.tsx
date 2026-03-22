"use client";

type Props = {
  search: string;
  setSearch: (val: string) => void;
};

export default function ProjectSearch({ search, setSearch }: Props) {
  return (
    <div className="relative w-full">
      {/* Search icon */}
      <svg
        className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4
                   text-gray-400 dark:text-gray-600 pointer-events-none"
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
        className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm
                   bg-white dark:bg-gray-900
                   border border-gray-200 dark:border-gray-700
                   text-gray-900 dark:text-white
                   placeholder:text-gray-400 dark:placeholder:text-gray-600
                   focus:outline-none focus:ring-2 focus:ring-blue-500/50
                   focus:border-blue-400 dark:focus:border-blue-500
                   transition-colors duration-150"
      />

      {/* Clear button — only visible when there's input */}
      {search && (
        <button
          onClick={() => setSearch("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2
                     text-gray-400 dark:text-gray-600
                     hover:text-gray-700 dark:hover:text-gray-300
                     transition-colors duration-150"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor"
               strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}