"use client";

interface Props {
  uploading: boolean;
}

export default function UploadProgress({
  uploading,
}: Props) {
  if (!uploading) return null;

  return (
    <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 backdrop-blur-xl p-4 shadow-lg">
      <div className="flex items-center justify-between text-xs font-orbitron font-bold text-orange-300 uppercase tracking-wider mb-2">
        <span>UPLOADING ARTIFACT TO CLOUD...</span>
        <span className="font-mono animate-pulse">ENCODING</span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-full animate-pulse bg-gradient-to-r from-orange-500 to-rose-500 rounded-full" />
      </div>
    </div>
  );
}
