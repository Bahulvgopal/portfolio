"use client";

import dynamic from "next/dynamic";

// Disable SSR for this component
const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

export default function GithubGraph() {
  return (
    <section className="py-16 px-6 text-center">
      <h2 className="text-2xl -mt-[9rem] font-bold mb-6">
        GitHub Contributions
      </h2>

      <div className="flex justify-center overflow-x-auto">
        <GitHubCalendar
          username="Bahulvgopal"
          blockSize={15}
          blockMargin={5}
          fontSize={14}
        />
      </div>
    </section>
  );
}