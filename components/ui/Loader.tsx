export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-orange-500 border-r-rose-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
      </div>
      <span className="font-orbitron text-[10px] font-bold text-orange-400 uppercase tracking-widest animate-pulse">
        LOADING TELEMETRY...
      </span>
    </div>
  );
}
