import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const idx = projects.indexOf(project);
  const prev = projects[idx - 1] ?? null;
  const next = projects[idx + 1] ?? null;

  return (
    <main className="min-h-screen pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* ── Back ───────────────────────── */}
        <div className="pt-10 sm:pt-14 mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium
                       text-gray-400 dark:text-gray-500
                       hover:text-gray-700 dark:hover:text-gray-300"
          >
            ← All Projects
          </Link>
        </div>

        {/* ── Header ─────────────────────── */}
        <header className="mb-10">

          {/* Tech */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-0.5 rounded-full text-xs font-semibold
                           bg-blue-50 dark:bg-blue-950/40
                           text-blue-600 dark:text-blue-400"
              >
                {t}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            {project.title}
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {project.description}
          </p>

          {/* Buttons */}
          <div className="flex gap-3 flex-wrap">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm"
              >
                Live Demo
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                className="px-4 py-2 rounded-lg border text-sm"
              >
                GitHub
              </a>
            )}
          </div>
        </header>

        {/* ── Image ─────────────────────── */}
        {project.image && (
          <div className="relative w-full aspect-video mb-12 rounded-2xl overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* ── Sections ─────────────────── */}
        <div className="flex flex-col gap-10">

          {/* Problem */}
          {project.problem && (
            <section>
              <h2 className="text-xs font-bold uppercase mb-2">Problem</h2>
              <p className="text-gray-500">{project.problem}</p>
            </section>
          )}

          {/* Features */}
          {(project.features ?? []).length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase mb-2">Features</h2>
              <ul className="space-y-2">
                {(project.features ?? []).map((f, i) => (
                  <li key={i} className="text-gray-500">• {f}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Screenshots ✅ FIXED */}
          {(project.screenshots ?? []).length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase mb-4">
                Screenshots
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(project.screenshots ?? []).map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-video rounded-xl overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt={`Screenshot ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Learnings */}
          {project.learnings && (
            <section>
              <h2 className="text-xs font-bold uppercase mb-2">
                Learnings
              </h2>
              <p className="text-gray-500">{project.learnings}</p>
            </section>
          )}
        </div>

        {/* ── Navigation ───────────────── */}
        <div className="grid grid-cols-2 gap-4 mt-12">

          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="text-sm">
              ← {prev.title}
            </Link>
          ) : <div />}

          {next && (
            <Link
              href={`/projects/${next.slug}`}
              className="text-sm text-right"
            >
              {next.title} →
            </Link>
          )}
        </div>

      </div>
    </main>
  );
}