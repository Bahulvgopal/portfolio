import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
}: StatCardProps) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border border-white/10
        bg-[#111112]
        p-4 sm:p-6
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-white/20
        hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]
      "
    >
      {/* accent line */}
      <div
        className="
          absolute left-0 top-0 h-[3px] w-full
          bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400
          origin-left scale-x-0
          transition-transform duration-500
          group-hover:scale-x-100
        "
      />

      {/* hover glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at top, rgba(56,189,248,.10), transparent 65%)",
        }}
      />

      <div className="relative z-10">
        <div className="mb-3 sm:mb-4 flex items-center justify-between gap-2">
          <p className="truncate text-xs sm:text-sm text-neutral-400">
            {title}
          </p>

          <div
            className="
              flex h-9 w-9 sm:h-10 sm:w-10 shrink-0
              items-center justify-center
              rounded-xl
              border border-white/10
              bg-blue-600/20
              text-blue-400
              transition-all duration-300
              group-hover:border-white/20
              group-hover:bg-blue-600/25
            "
          >
            <Icon size={18} className="sm:hidden" />
            <Icon size={20} className="hidden sm:block" />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          {value}
        </h2>
      </div>
    </div>
  );
}