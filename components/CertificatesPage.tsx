"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Certificate } from "@/types/certificate";

import CertificateCard from "@/components/CertificateCard";
import CertificateFilters from "@/components/CertificateFilters";
import CertificateImageModal from "@/components/CertificateImageModal";

/* =========================================================================
   ANIMATION
========================================================================= */

const reveal = (delay = 0, y = 28) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.9,
    ease: [0.16, 1, 0.3, 1] as const,
    delay,
  },
});

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/* =========================================================================
   TYPES
========================================================================= */

type Props = {
  certificates: Certificate[];
};

/* =========================================================================
   COMPONENT
========================================================================= */

export default function CertificatesPage({
  certificates,
}: Props) {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("All");

  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null);

  /* --------------------------------------------------------------------- */
  /* Sort newest first                                                     */
  /* --------------------------------------------------------------------- */

  const sortedCertificates = useMemo(() => {
    return [...certificates].sort(
      (a, b) =>
        new Date(b.issueDate).getTime() -
        new Date(a.issueDate).getTime()
    );
  }, [certificates]);

  /* --------------------------------------------------------------------- */
  /* Years                                                                 */
  /* --------------------------------------------------------------------- */

  const years = useMemo(() => {
    return [
      ...new Set(
        sortedCertificates.map((cert) =>
          new Date(cert.issueDate)
            .getFullYear()
            .toString()
        )
      ),
    ];
  }, [sortedCertificates]);

  /* --------------------------------------------------------------------- */
  /* Filter                                                                 */
  /* --------------------------------------------------------------------- */

  const filteredCertificates = useMemo(() => {
    return sortedCertificates.filter((cert) => {
      const matchesSearch =
        cert.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        cert.issuer
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesYear =
        year === "All" ||
        new Date(cert.issueDate)
          .getFullYear()
          .toString() === year;

      return matchesSearch && matchesYear;
    });
  }, [sortedCertificates, search, year]);

  /* --------------------------------------------------------------------- */
  /* Group by year                                                         */
  /* --------------------------------------------------------------------- */

  const groupedCertificates = useMemo(() => {
    return filteredCertificates.reduce(
      (groups, cert) => {
        const groupYear = new Date(cert.issueDate)
          .getFullYear()
          .toString();

        if (!groups[groupYear]) {
          groups[groupYear] = [];
        }

        groups[groupYear].push(cert);

        return groups;
      },
      {} as Record<string, Certificate[]>
    );
  }, [filteredCertificates]);
    return (
    <>
      <main className="relative -mt-[5rem] min-h-screen bg-[#0a0a0b] pb-28 pt-28 sm:pt-32 px-5 sm:px-8 lg:px-0 overflow-hidden">
        {/* Grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: GRAIN_URL,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />

        {/* Background Blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full bg-violet-600/[0.07] blur-[150px]"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-blue-600/[0.06] blur-[140px]"
        />

        {/* Background Text */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-[3%] top-[4%] text-[13vw] font-black leading-none select-none text-white/[0.025] tracking-tighter hidden lg:block"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Certs
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">

          {/* Header */}
          <motion.div {...reveal(0.05)} className="mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-400/20 bg-sky-400/[0.04] text-sky-400 font-mono text-[10px] uppercase tracking-[0.15em]">
              <span className="w-[5px] h-[5px] rounded-full bg-sky-400 animate-pulse" />
              Credentials
            </span>

            <h1
              className="mt-6 text-[clamp(2.5rem,6vw,4.5rem)] leading-none text-white"
              style={{
                fontFamily: "'Georgia','Times New Roman',serif",
              }}
            >
              Courses &{" "}
              <em
                className="italic"
                style={{
                  background:
                    "linear-gradient(90deg,#38bdf8,#818cf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Certificates
              </em>
            </h1>

            <p className="mt-5 max-w-lg text-neutral-500 leading-7">
              Programs, certifications and learning experiences that
              helped strengthen my software development skills.
            </p>
          </motion.div>

          {/* Count */}
          <motion.div
            {...reveal(0.1)}
            className="flex items-center gap-4 mb-10"
          >
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(90deg,rgba(56,189,248,.18),rgba(129,140,248,.1),transparent)",
              }}
            />

            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-600">
              {filteredCertificates.length}{" "}
              {filteredCertificates.length === 1
                ? "Certificate"
                : "Certificates"}
            </span>
          </motion.div>

          {/* Filters */}
          <CertificateFilters
            search={search}
            setSearch={setSearch}
            year={year}
            setYear={setYear}
            years={years}
          />

          {/* Timeline */}
          <div className="space-y-14">
            {Object.entries(groupedCertificates)
              .sort((a, b) => Number(b[0]) - Number(a[0]))
              .map(([yearLabel, certs]) => (
                <section key={yearLabel}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-3 h-3 rounded-full bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,.5)]" />

                    <h2
                      className="text-3xl text-white"
                      style={{
                        fontFamily:
                          "'Georgia','Times New Roman',serif",
                      }}
                    >
                      {yearLabel}
                    </h2>

                    <div className="flex-1 h-px bg-white/[0.06]" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certs.map((cert) => {
                      const globalIndex =
                        filteredCertificates.findIndex(
                          (c) => c._id === cert._id
                        );

                      return (
                        <CertificateCard
                          key={cert._id}
                          certificate={cert}
                          index={globalIndex}
                          latest={globalIndex === 0}
                          onClick={() =>
                            setSelectedIndex(globalIndex)
                          }
                        />
                      );
                    })}
                  </div>
                </section>
              ))}
          </div>
                    {/* Empty State */}
          {filteredCertificates.length === 0 && (
            <motion.div
              {...reveal(0.15)}
              className="py-24 text-center"
            >
              <div className="mx-auto w-20 h-20 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-neutral-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h3
                className="mt-8 text-2xl text-white"
                style={{
                  fontFamily:
                    "'Georgia','Times New Roman',serif",
                }}
              >
                No certificates found
              </h3>

              <p className="mt-3 text-neutral-500 max-w-md mx-auto">
                Try changing the search keyword or year filter.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setYear("All");
                }}
                className="mt-8 rounded-xl border border-sky-500/20 bg-sky-500/10 px-5 py-3 text-sm text-sky-400 hover:bg-sky-500/15 transition"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </main>

      <CertificateImageModal
        certificates={filteredCertificates}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onPrev={() =>
          setSelectedIndex((prev) =>
            prev === null
              ? 0
              : (prev - 1 + filteredCertificates.length) %
                filteredCertificates.length
          )
        }
        onNext={() =>
          setSelectedIndex((prev) =>
            prev === null
              ? 0
              : (prev + 1) %
                filteredCertificates.length
          )
        }
      />
    </>
  );
}