"use client";

import Link from "next/link";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

interface Props {
  prev: any;
  next: any;
}

export default function ProjectNavigation({ prev, next }: Props) {
  if (!prev && !next) return null;

  return (
    <section className="mt-24 border-t border-white/10 pt-10">
      <div className="grid gap-6 md:grid-cols-2">
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-sky-500/40 hover:bg-white/10"
          >
            <p className="mb-2 flex items-center gap-2 text-sm text-neutral-400">
              <HiArrowLeft />
              Previous Project
            </p>

            <h3 className="text-xl font-semibold text-white group-hover:text-sky-400">
              {prev.title}
            </h3>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-right transition hover:border-sky-500/40 hover:bg-white/10"
          >
            <p className="mb-2 flex items-center justify-end gap-2 text-sm text-neutral-400">
              Next Project
              <HiArrowRight />
            </p>

            <h3 className="text-xl font-semibold text-white group-hover:text-sky-400">
              {next.title}
            </h3>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </section>
  );
}