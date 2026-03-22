export default function GithubStats() {
  const username = "Bahulvgopal";

  const cards = [
    {
      src: `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=00000000&title_color=60a5fa&text_color=94a3b8&icon_color=60a5fa`,
      alt: "GitHub Stats",
      label: "Overview",
    },
    {
      src: `https://streak-stats.demolab.com?user=${username}&theme=tokyonight&hide_border=true&background=00000000&stroke=60a5fa&ring=60a5fa&fire=f59e0b&currStreakLabel=94a3b8&sideLabels=94a3b8&dates=94a3b8&currStreakNum=e2e8f0&sideNums=e2e8f0`,
      alt: "GitHub Streak",
      label: "Streak",
    },
    {
      src: `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=tokyonight&hide_border=true&bg_color=00000000&title_color=60a5fa&text_color=94a3b8`,
      alt: "Top Languages",
      label: "Top Languages",
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl -mt-[9rem] mx-auto">

        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-2">
            Stats
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            GitHub Stats
          </h2>
        </div>

        {/* Cards grid:
            mobile  → 1 col stacked
            sm      → 2 col (stats + streak side by side)
            lg      → all 3 in a row                        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {cards.map(({ src, alt, label }) => (
            <div
              key={label}
              className="group relative flex flex-col rounded-2xl overflow-hidden
                         border border-gray-200 dark:border-gray-800
                         bg-white dark:bg-gray-900/60
                         hover:border-blue-400 dark:hover:border-blue-600
                         hover:shadow-lg hover:shadow-blue-500/10
                         transition-all duration-300"
            >
              {/* Label chip */}
              <div className="px-4 pt-4 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest
                                 text-gray-400 dark:text-gray-600">
                  {label}
                </span>
              </div>

              {/* Image */}
              <div className="flex-1 flex items-center justify-center px-4 pb-4">
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  className="w-full h-auto object-contain
                             transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}