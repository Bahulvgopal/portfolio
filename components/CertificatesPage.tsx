"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import type { Certificate } from "@/types/certificate";
import CertificateCard from "@/components/CertificateCard";
import CertificateFilters from "@/components/CertificateFilters";
import CertificateImageModal from "@/components/CertificateImageModal";
import { MangaSpeechBubble } from "@/components/AnimeStickers";

type Props = {
  certificates: Certificate[];
};

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.65,
    ease: [0.16, 1, 0.3, 1] as const,
    delay,
  },
});

export default function CertificatesPage({ certificates }: Props) {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  /* Years */
  const years = useMemo(() => {
    const list = certificates
      .map((item) => new Date(item.issueDate).getFullYear().toString())
      .filter(Boolean);

    return ["All", ...Array.from(new Set(list)).sort().reverse()];
  }, [certificates]);

  /* Filtered */
  const filteredCertificates = useMemo(() => {
    return certificates.filter((item) => {
      const q = search.toLowerCase();

      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.issuer.toLowerCase().includes(q);

      const matchesYear =
        year === "All" ||
        new Date(item.issueDate).getFullYear().toString() === year;

      return matchesSearch && matchesYear;
    });
  }, [certificates, search, year]);

  /* Grouped */
  const groupedCertificates = useMemo(() => {
    return filteredCertificates.reduce((groups, cert) => {
      const groupYear = new Date(cert.issueDate).getFullYear();

      if (!groups[groupYear]) {
        groups[groupYear] = [];
      }

      groups[groupYear].push(cert);
      return groups;
    }, {} as Record<string, Certificate[]>);
  }, [filteredCertificates]);

  return (
    <>
      <main className="relative min-h-screen bg-[#FAF8F5] pb-28 pt-28 sm:pt-36 px-5 sm:px-8 lg:px-0 overflow-hidden">
        {/* Grain */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 opacity-[0.025] z-0"
          style={{
            backgroundImage: GRAIN_URL,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />

        {/* Ambient Blobs */}
        <div
          aria-hidden
          className="pointer-events-none fixed -top-40 -right-32 w-[540px] h-[540px] rounded-full bg-orange-500/[0.04] blur-[150px] z-0"
        />
        <div
          aria-hidden
          className="pointer-events-none fixed bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-amber-500/[0.04] blur-[140px] z-0"
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* -- Header Section -- */}
          <section className="mb-12">
            <motion.div {...reveal(0.05)}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5 border border-orange-500/25 bg-orange-500/10 text-orange-600 font-orbitron text-[10px] font-bold tracking-[0.18em] uppercase shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
                VERIFIED CREDENTIALS // 「資格認定」
              </span>
            </motion.div>

            <motion.div {...reveal(0.1)} className="flex flex-wrap items-center gap-4 mb-4">
              <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-manga tracking-wide leading-none text-stone-900 uppercase">
                COURSES &{" "}
                <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 bg-clip-text text-transparent">
                  CERTIFICATES
                </span>
              </h1>
              <MangaSpeechBubble text="CERTIFIED PRO 📜" className="hidden sm:inline-block" />
            </motion.div>

            <motion.p {...reveal(0.15)} className="max-w-2xl font-rajdhani text-sm sm:text-base font-medium text-stone-600 tracking-wide leading-relaxed">
              Programs, professional certifications, and technical licenses that validate my hands-on
              competencies across modern software engineering.
            </motion.p>
          </section>

          {/* Katana Energy Line */}
          <div
            className="h-px mb-10"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(234,88,12,0.3) 30%, rgba(245,158,11,0.3) 70%, transparent)",
            }}
          />

          {/* Record Count */}
          <div className="flex items-center justify-between mb-8">
            <span className="font-orbitron text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-stone-500">
              // ARCHIVE RECORDS // {filteredCertificates.length}{" "}
              {filteredCertificates.length === 1 ? "CERTIFICATE" : "CERTIFICATES"} FOUND
            </span>
          </div>

          {/* Filter Bar */}
          <CertificateFilters
            search={search}
            setSearch={setSearch}
            year={year}
            setYear={setYear}
            years={years}
          />

          {/* Timeline of Years */}
          <div className="space-y-14">
            {Object.entries(groupedCertificates)
              .sort((a, b) => Number(b[0]) - Number(a[0]))
              .map(([yearLabel, certs]) => (
                <section key={yearLabel}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-3.5 h-3.5 rounded-full bg-orange-600 shadow-[0_0_15px_rgba(234,88,12,0.6)]" />

                    <h2 className="font-manga text-3xl sm:text-4xl text-stone-900 uppercase tracking-wide">
                      {yearLabel} // 「年次」
                    </h2>

                    <div className="flex-1 h-px bg-gradient-to-r from-stone-200 to-transparent" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certs.map((cert) => {
                      const globalIndex = filteredCertificates.findIndex(
                        (c) => c._id === cert._id
                      );

                      return (
                        <CertificateCard
                          key={cert._id}
                          certificate={cert}
                          index={globalIndex}
                          latest={globalIndex === 0}
                          onClick={() => setSelectedIndex(globalIndex)}
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
              className="py-24 px-6 rounded-[34px] border border-white/90 bg-white/70 backdrop-blur-2xl text-center shadow-[0_12px_40px_rgba(234,88,12,0.06)]"
            >
              <div className="mx-auto w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-5">
                <svg
                  className="w-8 h-8 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <h3 className="font-manga text-2xl text-stone-900 uppercase mb-2">
                NO CERTIFICATES FOUND // 該当なし
              </h3>

              <p className="font-rajdhani text-sm text-stone-500 max-w-md mx-auto mb-6">
                No verified records match &ldquo;{search}&rdquo; in year {year}.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setYear("All");
                }}
                className="px-6 py-2.5 rounded-full border border-orange-500/40 bg-white font-orbitron text-[10px] font-bold text-stone-800 hover:border-orange-500 hover:text-orange-600 shadow-sm transition tracking-wider uppercase"
              >
                Clear all filters
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
              : (prev - 1 + filteredCertificates.length) % filteredCertificates.length
          )
        }
        onNext={() =>
          setSelectedIndex((prev) =>
            prev === null
              ? 0
              : (prev + 1) % filteredCertificates.length
          )
        }
      />
    </>
  );
}
