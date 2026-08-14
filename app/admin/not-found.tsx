import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">404</h1>

      <p className="text-slate-400">
        The page you are looking for doesn't exist.
      </p>

      <Link
        href="/admin"
        className="rounded-lg bg-blue-600 px-4 py-2 text-white"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}