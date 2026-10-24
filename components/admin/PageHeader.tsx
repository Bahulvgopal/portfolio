import Link from "next/link";
import { LucideIcon, Plus } from "lucide-react";

interface ActionProps {
  label: string;
  href: string;
  icon?: LucideIcon;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  action?: ActionProps;
}

export default function PageHeader({
  title,
  description,
  badge = "MODULE CONTROLLER",
  action,
}: PageHeaderProps) {
  const ActionIcon = action?.icon || Plus;

  return (
    <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] border border-white/20 bg-slate-950/40 backdrop-blur-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.25)] mb-8">
      {/* Background Refraction Blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-12 -left-12 w-36 h-36 rounded-3xl bg-gradient-to-br from-orange-500/20 to-rose-600/15 blur-2xl z-0"
      />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-orbitron text-[9px] font-bold text-orange-400 tracking-widest uppercase">
              // {badge} // 「統制」
            </span>
            <span className="text-stone-500 font-mono text-xs">· · ·</span>
          </div>

          <h1 className="font-orbitron text-2xl sm:text-3xl font-black text-white tracking-wide uppercase">
            {title}
          </h1>

          {description && (
            <p className="mt-1 font-rajdhani text-sm sm:text-base font-semibold text-stone-300">
              {description}
            </p>
          )}
        </div>

        {action && (
          <Link
            href={action.href}
            className="
              inline-flex items-center gap-2 rounded-2xl
              bg-gradient-to-r from-orange-600 via-amber-500 to-rose-600
              px-6 py-3.5
              font-orbitron text-xs font-black uppercase tracking-wider text-white
              shadow-[0_4px_20px_rgba(249,115,22,0.45)]
              hover:shadow-[0_8px_30px_rgba(249,115,22,0.65)]
              transition-all duration-300 hover:scale-[1.02]
              border border-white/25 self-start sm:self-auto shrink-0
            "
          >
            <ActionIcon className="w-4 h-4" />
            <span>{action.label}</span>
          </Link>
        )}
      </div>
    </div>
  );
}

