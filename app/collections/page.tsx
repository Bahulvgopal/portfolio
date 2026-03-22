import Link from "next/link";

// Replace or move this to @/data/collections.ts when ready
const collections = [
  {
    slug: "treasure-hunt-design",
    title: "Treasure Hunt Design",
    description: "Visual assets and branding created for a treasure hunt event.",
    tag: "Event Design",
    image: "", // add image path when ready e.g. "/images/collections/treasure-hunt.jpg"
  },
  {
    slug: "poster-designs",
    title: "Poster Designs",
    description: "A set of posters designed for college events and competitions.",
    tag: "Print",
    image: "",
  },
  {
    slug: "ui-concepts",
    title: "UI Concepts",
    description: "Exploratory UI mockups and interface experiments.",
    tag: "UI / UX",
    image: "",
  },
];

// Palette per index — cycles if more items added
const accents = [
  "from-blue-50 to-indigo-100 dark:from-blue-950/40 dark:to-indigo-950/40",
  "from-purple-50 to-pink-100 dark:from-purple-950/40 dark:to-pink-950/40",
  "from-emerald-50 to-teal-100 dark:from-emerald-950/40 dark:to-teal-950/40",
];

export default function CollectionsPage() {
  return (
    <main className="min-h-screen pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* ── Header ──────────────────────────────── */}
        <div className="pt-14 sm:pt-20 mb-10 sm:mb-12">
          <p className="text-xs font-bold uppercase tracking-widest
                        text-gray-400 dark:text-gray-600 mb-3">
            Creative work
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight
                         text-gray-900 dark:text-white leading-tight">
            Collections
            <span aria-hidden className="block mt-2 h-1 w-12 rounded-full bg-blue-500" />
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-500 dark:text-gray-400
                        leading-relaxed max-w-lg">
            Design work, visual experiments, and creative projects outside of code.
          </p>
        </div>

        {/* ── Grid ────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {collections.map((item, i) => (
            <Link
              key={item.slug}
              href={`/collections/${item.slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden
                         border border-gray-200 dark:border-gray-800
                         bg-white dark:bg-gray-900/60
                         hover:border-blue-400 dark:hover:border-blue-600
                         hover:shadow-lg hover:shadow-blue-500/10
                         transition-all duration-300"
            >
              {/* Thumbnail or gradient placeholder */}
              <div className={`relative w-full h-44 shrink-0 flex items-center justify-center
                               bg-gradient-to-br ${accents[i % accents.length]}`}>
                {/* Decorative icon */}
                <svg className="w-10 h-10 text-blue-300 dark:text-blue-700
                                group-hover:scale-110 transition-transform duration-300"
                     fill="none" stroke="currentColor" strokeWidth={1.5}
                     viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5M4.5 3h15A1.5 1.5 0 0121 4.5v15a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 19.5v-15A1.5 1.5 0 014.5 3z" />
                </svg>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-4 sm:p-5 gap-2">
                {/* Tag */}
                <span className="text-[10px] font-bold uppercase tracking-widest
                                 text-blue-600 dark:text-blue-400">
                  {item.tag}
                </span>

                <h2 className="text-sm sm:text-base font-bold
                               text-gray-900 dark:text-white leading-snug
                               group-hover:text-blue-600 dark:group-hover:text-blue-400
                               transition-colors duration-150">
                  {item.title}
                </h2>

                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mt-auto">
                  {item.description}
                </p>

                {/* CTA hint */}
                <div className="flex items-center gap-1 mt-2 text-xs font-semibold
                                text-gray-400 dark:text-gray-600
                                group-hover:text-blue-500 dark:group-hover:text-blue-400
                                transition-colors duration-150">
                  View collection
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-150"
                       fill="none" stroke="currentColor" strokeWidth={2}
                       viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}