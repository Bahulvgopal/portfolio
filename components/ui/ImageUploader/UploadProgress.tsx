"use client";

interface Props {
  uploading: boolean;
}

export default function UploadProgress({
  uploading,
}: Props) {
  if (!uploading) return null;

  return (
    <div className="rounded-xl border border-blue-700 bg-blue-950 p-4">
      <p className="text-sm text-blue-300">
        Uploading image...
      </p>

      <div className="mt-3 h-2 w-full overflow-hidden rounded bg-slate-700">
        <div className="h-full w-full animate-pulse bg-blue-500" />
      </div>
    </div>
  );
}