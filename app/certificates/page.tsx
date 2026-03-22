import Image from "next/image";
import { certificates } from "@/data/certificates";

export default function CertificatesPage() {
  return (
    <main className="min-h-screen pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* ── Header ──────────────────────────────── */}
        <div className="pt-14 sm:pt-20 mb-10 sm:mb-12">
          <p className="text-xs font-bold uppercase tracking-widest
                        text-gray-400 dark:text-gray-600 mb-3">
            Credentials
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight
                         text-gray-900 dark:text-white leading-tight">
            Certificates
            <span aria-hidden className="block mt-2 h-1 w-12 rounded-full bg-blue-500" />
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-500 dark:text-gray-400
                        leading-relaxed max-w-lg">
            Courses and programs I've completed to sharpen my skills.
          </p>
        </div>

        {/* ── Result count ────────────────────────── */}
        <p className="text-xs font-semibold uppercase tracking-widest
                      text-gray-400 dark:text-gray-600 mb-6">
          {certificates.length} certificate{certificates.length !== 1 ? "s" : ""}
        </p>

        {/* ── Grid ────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {certificates.map((cert, i) => (
            <div
              key={i}
              className="group flex flex-col rounded-2xl overflow-hidden
                         border border-gray-200 dark:border-gray-800
                         bg-white dark:bg-gray-900/60
                         hover:border-blue-400 dark:hover:border-blue-600
                         hover:shadow-lg hover:shadow-blue-500/10
                         transition-all duration-300"
            >
              {/* Image / placeholder */}
              {cert.image ? (
                <div className="relative w-full h-44 overflow-hidden shrink-0">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover group-hover:scale-[1.03]
                               transition-transform duration-500 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="w-full h-44 shrink-0 flex items-center justify-center
                                bg-gradient-to-br from-blue-50 to-indigo-100
                                dark:from-blue-950/40 dark:to-indigo-950/40">
                  <svg className="w-10 h-10 text-blue-300 dark:text-blue-700"
                       fill="none" stroke="currentColor" strokeWidth={1.5}
                       viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}

              {/* Body */}
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h2 className="text-sm sm:text-base font-bold
                                 text-gray-900 dark:text-white leading-snug">
                    {cert.title}
                  </h2>

                  {/* Verified badge */}
                  <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5
                                   rounded-full text-[10px] font-bold uppercase tracking-widest
                                   bg-green-50 dark:bg-green-950/40
                                   text-green-600 dark:text-green-400
                                   border border-green-200 dark:border-green-800">
                    <svg className="w-2.5 h-2.5" fill="currentColor"
                         viewBox="0 0 20 20" aria-hidden>
                      <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd" />
                    </svg>
                    Verified
                  </span>
                </div>

                {/* Issuer + year */}
                <p className="text-xs text-gray-400 dark:text-gray-600 font-medium mt-auto">
                  {cert.issuer}
                  {cert.year && (
                    <span className="ml-1.5 pl-1.5 border-l
                                     border-gray-200 dark:border-gray-700">
                      {cert.year}
                    </span>
                  )}
                </p>

                {/* Optional credential link */}
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold
                               text-blue-600 dark:text-blue-400
                               hover:underline underline-offset-4 transition"
                  >
                    View credential
                    <svg className="w-3 h-3" fill="none" stroke="currentColor"
                         strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}