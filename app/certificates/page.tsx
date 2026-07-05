"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { certificates } from "@/data/certificates";
import CertificateFilters from "@/components/CertificateFilters";
import CertificateImageModal from "@/components/CertificateImageModal";
import CertificateCard from "@/components/CertificateCard";

/* =========================================================================
   ANIMATION HELPERS (matches hero/skills/education pages)
   ========================================================================= */
const reveal = (delay = 0, y = 28) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay },
});


const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/* =========================================================================
   PAGE
   ========================================================================= */
export default function CertificatesPage() {
  const sortedCertificates = useMemo(() => {
  return [...certificates].sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
  );
}, []);
  const [search, setSearch] = useState("");

  const [year, setYear] = useState("All");

  const [category, setCategory] = useState("All");
  const years = useMemo(() => {
  return [...new Set(sortedCertificates.map((c) => c.date.slice(0, 4)))];
}, [sortedCertificates]);
const categories = useMemo(() => {
  return [...new Set(sortedCertificates.map((c) => c.category))];
}, [sortedCertificates]);
const filteredCertificates = sortedCertificates.filter((cert) => {

  const matchesSearch =
    cert.title.toLowerCase().includes(search.toLowerCase()) ||
    cert.issuer.toLowerCase().includes(search.toLowerCase());

  const matchesYear =
    year === "All" || cert.date.startsWith(year);

  const matchesCategory =
    category === "All" || cert.category === category;

  return matchesSearch && matchesYear && matchesCategory;
});
const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
const groupedCertificates = useMemo(() => {
  return filteredCertificates.reduce((groups, cert) => {
    const year = cert.date.slice(0, 4);

    if (!groups[year]) {
      groups[year] = [];
    }

    groups[year].push(cert);

    return groups;
  }, {} as Record<string, typeof filteredCertificates>);
}, [filteredCertificates]);
  return (
    <main className="relative -mt-[5rem] min-h-screen bg-[#0a0a0b] pb-28 pt-28 sm:pt-32 px-5 sm:px-8 lg:px-0 overflow-hidden">

      {/* grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{ backgroundImage: GRAIN_URL, backgroundRepeat: "repeat", backgroundSize: "128px" }}
      />

      {/* blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full bg-violet-600/[0.07] blur-[150px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-blue-600/[0.06] blur-[140px]" />

      {/* decorative oversized word */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[3%] top-[4%] text-[13vw] font-black leading-none select-none text-white/[0.025] tracking-tighter hidden lg:block"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        Certs
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Header ───────────────────────────────────────────────── */}
        <motion.div {...reveal(0.05)} className="mb-12 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-6 border border-sky-400/20 bg-sky-400/[0.04] text-sky-400 font-mono text-[10px] font-medium tracking-[0.15em] uppercase">
            <span className="w-[5px] h-[5px] rounded-full bg-sky-400 animate-pulse" />
            Credentials
          </span>

          <h1
            className="text-[clamp(2.4rem,6.5vw,4.2rem)] font-normal tracking-tight leading-[1.05] text-white"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Courses &{" "}
            <em
              className="italic"
              style={{
                background: "linear-gradient(90deg, #38bdf8, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              certificates
            </em>
          </h1>

          <p className="mt-5 text-sm sm:text-[15px] text-neutral-500 max-w-md leading-[1.75]">
            Programs I&apos;ve completed to sharpen my skills and stay current with the stack.
          </p>
        </motion.div>

        {/* gradient rule + count */}
        <motion.div {...reveal(0.1)} className="flex items-center gap-4 mb-10">
          <div
            className="h-px flex-1"
            style={{
              background: "linear-gradient(90deg, rgba(56,189,248,0.18), rgba(129,140,248,0.1) 60%, transparent)",
            }}
          />
          <span className="font-mono text-[10px] font-medium tracking-[0.12em] uppercase text-neutral-600 shrink-0">
            {filteredCertificates.length}{" "}
{filteredCertificates.length === 1 ? "Certificate" : "Certificates"}
          </span>
        </motion.div>
        <CertificateFilters
          search={search}
          setSearch={setSearch}
          year={year}
          setYear={setYear}
          category={category}
          setCategory={setCategory}
          years={years}
          categories={categories}
        />
        {/* ── Grid ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
  {filteredCertificates.map((cert, i) => (
    <CertificateCard
      key={`${cert.title}-${cert.date}`}
      certificate={cert}
      index={i}
      latest={i === 0}
      onClick={() => setSelectedIndex(i)}
    />
  ))}
</div>

      </div>
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
    </main>
  );
}