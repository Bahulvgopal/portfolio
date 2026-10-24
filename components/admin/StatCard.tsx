import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  accentGradient?: string;
  badgeLabel?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  accentGradient = "from-[#FF5E3A] to-[#FF2A54]",
  badgeLabel,
}: StatCardProps) {
  return (
    <div className="group relative">
      {/* 1. Behind-the-card floating glowing gradient square (matching the reference image) */}
      <div
        aria-hidden
        className={`
          absolute -top-3 -left-3 w-28 h-28 sm:w-32 sm:h-32
          rounded-[26px] bg-gradient-to-br ${accentGradient}
          opacity-90 blur-[1px]
          shadow-[0_8px_30px_rgba(255,61,0,0.45)]
          transition-transform duration-500 ease-out
          group-hover:scale-105 group-hover:-translate-x-1 group-hover:-translate-y-1
          z-0
        `}
      />

      {/* 2. Glassmorphism Card Face */}
      <div
        className="
          relative z-10 overflow-hidden
          rounded-[30px] sm:rounded-[34px]
          border border-white/20
          bg-slate-950/40 backdrop-blur-3xl
          p-6 sm:p-7
          transition-all duration-500 ease-out
          shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.4)]
          hover:-translate-y-1.5 hover:border-white/30 hover:shadow-[0_25px_60px_rgba(0,0,0,0.7),inset_0_1px_3px_rgba(255,255,255,0.4)]
          flex flex-col justify-between min-h-[220px]
        "
      >
        {/* Ambient Glass Highlight Line */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        {/* Top Header / Badges */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="font-orbitron text-[9px] font-bold text-stone-400 tracking-widest uppercase block mb-2">
              · VECTOR CMS ·
            </span>

            {/* Glowing Gradient Badge Pill (like GLASS in the image) */}
            <div className={`inline-flex items-center px-3.5 py-1 rounded-xl bg-gradient-to-r ${accentGradient} text-white font-orbitron text-[11px] font-black uppercase tracking-widest shadow-[0_4px_16px_rgba(255,42,84,0.4)] border border-white/20`}>
              {badgeLabel || title}
            </div>
          </div>

          {/* Frosted Glass Icon Pod */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.06] backdrop-blur-xl text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] transition-transform duration-300 group-hover:scale-110 group-hover:border-orange-400/50">
            <Icon size={20} className="text-orange-300" />
          </div>
        </div>

        {/* Center / Bottom: Value & Micro Dots */}
        <div className="mt-6 flex items-end justify-between">
          <div>
            <div className="font-orbitron text-4xl sm:text-5xl font-black text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
              {String(value).padStart(2, "0")}
            </div>
            <p className="font-rajdhani text-sm sm:text-base font-semibold text-stone-300 tracking-wide mt-1">
              Active {title} Records
            </p>
          </div>

          {/* Micro dots · · · from the image */}
          <div className="text-stone-400 font-mono tracking-widest text-sm opacity-60 group-hover:opacity-100 group-hover:text-orange-400 transition-opacity">
            · · ·
          </div>
        </div>
      </div>
    </div>
  );
}
