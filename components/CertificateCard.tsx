"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Certificate } from "@/data/certificates";

type Props = {
  certificate: Certificate;
  index: number;
  latest?: boolean;
  onClick: () => void;
};

const revealInView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: {
    duration: 0.7,
    ease: [0.16, 1, 0.3, 1] as const,
    delay,
  },
});

export default function CertificateCard({
  certificate,
  index,
  latest = false,
  onClick,
}: Props) {
  return (
    <motion.article
      {...revealInView(0.04 * (index % 6))}
      onClick={onClick}
      className="
        group
        relative
        overflow-hidden
        rounded-[24px]
        bg-[#0f0f10]
        border
        border-white/[0.06]
        hover:border-sky-500/30
        hover:-translate-y-2
        hover:shadow-[0_30px_80px_rgba(0,0,0,.55)]
        transition-all
        duration-500
        cursor-pointer
      "
    >
      {/* Hover Glow */}
      <div
        className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
          bg-[radial-gradient(circle_at_top,rgba(56,189,248,.08),transparent_70%)]
        "
      />

      {/* Top Accent */}
      <div
        className="
          absolute
          top-0
          left-0
          right-0
          h-[2px]
          bg-gradient-to-r
          from-sky-400
          via-indigo-400
          to-violet-500
          scale-x-0
          origin-left
          group-hover:scale-x-100
          transition-transform
          duration-500
        "
      />

      {/* Image */}

      <div className="relative h-48 overflow-hidden">

        {certificate.image ? (
          <>
            <Image
              src={certificate.image}
              alt={certificate.title}
              fill
              className="
                object-cover
                group-hover:scale-105
                transition-transform
                duration-700
              "
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f10] via-transparent to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/[0.02]">

            <svg
              className="w-10 h-10 text-neutral-700"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                d="M9 12.75L11.25 15 15 9.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

          </div>
        )}

        {/* Latest Badge */}

        {latest && (
          <div
            className="
              absolute
              top-4
              left-4
              rounded-full
              bg-sky-500
              px-3
              py-1
              text-[10px]
              font-semibold
              uppercase
              tracking-wider
              text-white
            "
          >
            Latest
          </div>
        )}

      </div>

      {/* Body */}

      <div className="p-6">

        <div className="flex justify-between items-start gap-3">

          <h3
            className="text-xl text-white leading-snug"
            style={{
              fontFamily: "'Georgia','Times New Roman',serif",
            }}
          >
            {certificate.title}
          </h3>

          <span
            className="
              rounded-full
              px-3
              py-1
              bg-sky-500/10
              border
              border-sky-500/20
              text-sky-400
              text-[10px]
              uppercase
              font-semibold
              tracking-wider
            "
          >
            {certificate.category}
          </span>

        </div>

        <div className="mt-5 h-px bg-white/[0.05]" />

        <div className="mt-5 space-y-2">

          <p className="text-neutral-400 text-sm">
            {certificate.issuer}
          </p>

          <p className="text-neutral-600 text-sm">
            {certificate.displayDate}
          </p>

        </div>

        <div
          className="
            mt-6
            flex
            items-center
            justify-between
          "
        >

          <span
            className="
              text-sky-400
              text-sm
              font-medium
            "
          >
            Click to preview
          </span>

          <svg
            className="
              w-5
              h-5
              text-sky-400
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              d="M9 5l7 7-7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

        </div>

      </div>

    </motion.article>
  );
}