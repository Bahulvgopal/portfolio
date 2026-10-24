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
    <section className="mt-24 border-t border-stone-200 pt-10">
      <div className="grid gap-6 md:grid-cols-2">
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="group rounded-3xl border border-white/90 bg-white/75 backdrop-blur-2xl p-6 transition-all duration-300 shadow-[0_10px_30px_rgba(234,88,12,0.05),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:border-orange-500/40 hover:shadow-[0_16px_40px_rgba(234,88,12,0.15)] hover:-translate-y-1"
          >
            <p className="mb-2 flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-wider text-stone-500 group-hover:text-orange-600 transition-colors">
              <HiArrowLeft />
              Previous Mission
            </p>

            <h3 className="font-rajdhani text-2xl font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
              {prev.title}
            </h3>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="group rounded-3xl border border-white/90 bg-white/75 backdrop-blur-2xl p-6 text-right transition-all duration-300 shadow-[0_10px_30px_rgba(234,88,12,0.05),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:border-orange-500/40 hover:shadow-[0_16px_40px_rgba(234,88,12,0.15)] hover:-translate-y-1"
          >
            <p className="mb-2 flex items-center justify-end gap-2 font-orbitron text-[10px] font-bold uppercase tracking-wider text-stone-500 group-hover:text-orange-600 transition-colors">
              Next Mission
              <HiArrowRight />
            </p>

            <h3 className="font-rajdhani text-2xl font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
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
