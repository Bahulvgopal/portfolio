"use client";

interface ErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function Error({
  error,
  reset,
}: ErrorProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">
        Something went wrong
      </h2>

      <p className="text-slate-500">
        {error.message}
      </p>

      <button
        onClick={() => reset()}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white"
      >
        Try Again
      </button>
    </div>
  );
}