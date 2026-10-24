import type { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  badge?: string;
}

export default function FormSection({
  title,
  description,
  children,
  badge,
}: FormSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] border border-white/20 bg-slate-950/40 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.25)] transition-all duration-300 hover:border-white/25">
      {/* Refracting glowing gradient blob behind top corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -left-10 w-36 h-36 rounded-3xl bg-gradient-to-br from-[#FF5E3A]/25 to-[#FF2A54]/20 blur-2xl z-0"
      />

      {/* Top Glass Glare Line */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-10" />

      {/* Header */}
      <div className="relative z-10 border-b border-white/10 px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-orbitron text-[9px] font-bold text-orange-400 tracking-widest uppercase">
              · PARAMETERS ·
            </span>
            {badge && (
              <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-orange-500 to-rose-600 text-white font-orbitron text-[9px] font-bold uppercase tracking-wider">
                {badge}
              </span>
            )}
          </div>

          <h2 className="font-orbitron text-base sm:text-lg font-black tracking-wide text-white uppercase">
            {title}
          </h2>

          {description && (
            <p className="mt-1 font-rajdhani text-sm font-semibold text-stone-300 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div className="text-stone-500 font-mono text-xs hidden sm:block tracking-widest">
          · · ·
        </div>
      </div>

      {/* Body Inputs */}
      <div className="relative z-10 space-y-6 p-6 sm:p-8">
        {children}
      </div>
    </section>
  );
}
