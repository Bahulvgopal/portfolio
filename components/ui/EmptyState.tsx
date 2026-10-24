interface Props {
  title: string;
  description: string;
}

export default function EmptyState({
  title,
  description,
}: Props) {
  return (
    <div className="relative overflow-hidden rounded-[30px] border border-white/20 bg-slate-950/40 backdrop-blur-3xl p-10 text-center sm:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.25)]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/15 blur-[90px]"
      />

      <div className="relative z-10 max-w-sm mx-auto">
        <div className="inline-flex items-center px-3 py-1 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 font-orbitron text-[10px] font-bold uppercase tracking-wider mb-3">
          EMPTY REGISTRY
        </div>

        <h2 className="font-orbitron text-xl sm:text-2xl font-black text-white uppercase tracking-wide">
          {title}
        </h2>

        <p className="mt-2 font-rajdhani text-sm sm:text-base font-semibold text-stone-300">
          {description}
        </p>

        <div className="text-stone-500 font-mono tracking-widest text-xs mt-4">
          · · ·
        </div>
      </div>
    </div>
  );
}
