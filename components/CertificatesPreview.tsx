import Image from "next/image";
import Link from "next/link";
import { certificates } from "@/data/certificates";

export default function CertificatesPreview() {
const preview = [...certificates]
  .sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  .slice(0, 1);
  return (
    <section className="relative py-10 px-5  sm:px-8 lg:px-0 bg-[#0a0a0b] overflow-hidden">

      {/* blobs */}
      <div className="pointer-events-none absolute top-0 right-1/4 w-[500px] h-[400px] rounded-full bg-emerald-600/5 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-sky-600/5 blur-[130px]" />

      {/* grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* -- Header -- */}
        <div className="mb-5">
          <span className="
            inline-flex items-center gap-1.5
            px-3 py-1 rounded-full mb-5
            border border-emerald-400/20 bg-emerald-400/[0.04]
            text-emerald-400 font-mono text-[10px] font-medium tracking-[0.15em] uppercase
          ">
            <span className="w-[5px] h-[5px] rounded-full bg-emerald-400 animate-pulse" />
            Credentials
          </span>

          <div className="flex items-end justify-between gap-6">
            <h2
              className="text-4xl sm:text-5xl font-normal tracking-tight leading-[1.08] text-white"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              My{" "}
              <em
                className="italic"
                style={{
                  background: "linear-gradient(90deg, #34d399, #38bdf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                certificates
              </em>
            </h2>

            <Link
              href="/certificates"
              className="
                group shrink-0 self-end mb-1
                inline-flex items-center gap-2
                px-5 py-2.5 rounded-full
                border border-white/[0.08] bg-white/[0.03]
                text-neutral-400 font-semibold text-[11px] tracking-[0.06em] uppercase
                hover:border-emerald-400/30 hover:bg-emerald-400/[0.06] hover:text-emerald-400
                transition-all duration-300
              "
            >
              View all
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* gradient rule */}
        <div
          className="h-px mb-12"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.18) 35%, rgba(56,189,248,0.12) 65%, transparent)",
          }}
        />

        {/* -- Cards grid -- */}
            <div className="grid grid-cols-1">
            {preview.map((cert, i) => (
            <article
              key={i}
              className="
                group relative overflow-hidden
                rounded-[22px] bg-[#0f0f10]
                border border-white/[0.06]
                hover:border-emerald-500/20
                hover:-translate-y-1
                hover:shadow-[0_24px_60px_rgba(0,0,0,0.5)]
                transition-all duration-500
              "
            >
              {/* top accent bar */}
              <div className="
                absolute top-0 left-0 right-0 h-[2px] z-10
                bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400
                scale-x-0 origin-left
                group-hover:scale-x-100
                transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
              " />

              {/* image area */}
              {cert.image ? (
                <div className="relative w-full h-44 overflow-hidden">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    loading="lazy"
                  />
                  {/* image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f10]/80 via-transparent to-transparent" />
                </div>
              ) : (
                <div className="
                  w-full h-44
                  flex items-center justify-center
                  bg-gradient-to-br from-emerald-950/30 to-sky-950/30
                  border-b border-white/[0.04]
                ">
                  {/* certificate icon placeholder */}
                  <div className="
                    w-14 h-14 rounded-2xl
                    border border-white/[0.08] bg-white/[0.03]
                    flex items-center justify-center
                  ">
                    <svg className="w-7 h-7 text-emerald-500/60" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              )}

              {/* body */}
              <div className="relative p-5">

                {/* ambient glow */}
                <div className="
                  absolute inset-0 pointer-events-none
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500
                  bg-[radial-gradient(circle_at_50%_0%,rgba(52,211,153,0.04)_0%,transparent_70%)]
                " />

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3
                        className="text-[1.05rem] font-normal text-white tracking-tight leading-snug truncate"
                        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                      >
                        {cert.title}
                      </h3>
                      <p className="text-[12px] text-neutral-500 mt-0.5">
                        {cert.issuer}
                        <span
                         className="
                            ml-2 pl-2
                            border-l border-white/[0.08]
                            text-neutral-600
                          "
                        >
                          {cert.displayDate}
                        </span>
                        
                      </p>
                    </div>

                    {/* verified badge */}
                    <span className="
                      shrink-0
                      inline-flex items-center gap-1
                      px-2.5 py-1 rounded-full
                      border border-emerald-500/25 bg-emerald-500/[0.06]
                      text-emerald-400 font-mono text-[9px] font-medium tracking-[0.1em] uppercase
                      whitespace-nowrap
                    ">
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* bottom shimmer */}
              <div className="
                absolute bottom-0 left-0 right-0 h-px
                bg-gradient-to-r from-transparent via-white/[0.08] to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-500
              " />
            </article>
          ))}
        </div>

        {/* archive hint */}
        {certificates.length > 1 && (
  <p className="mt-10 text-center text-[11px] font-mono text-neutral-700 tracking-[0.1em] uppercase">
    {certificates.length - 1} more{" "}
    {certificates.length - 1 === 1
      ? "certificate"
      : "certificates"}{" "}
    in the full archive
  </p>
)}

      </div>
    </section>
  );
}