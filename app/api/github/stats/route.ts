import { NextResponse } from "next/server";

const USERNAME = "Bahulvgopal";

type GitHubRepo = {
  stargazers_count: number;
  fork: boolean;
  language: string | null;
};

type GitHubUser = {
  public_repos: number;
  followers: number;
  following: number;
};

type LanguageMap = Record<string, number>;

export async function GET() {
  try {
    const headers = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2026-03-10",
      "User-Agent": "bahulvgopal-portfolio",
    };

    const [userResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
        {
          headers,
          next: { revalidate: 3600 },
        }
      ),
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      throw new Error("GitHub API request failed");
    }

    const user: GitHubUser = await userResponse.json();
    const repos: GitHubRepo[] = await reposResponse.json();

    const ownRepos = repos.filter((repo) => !repo.fork);

    const totalStars = ownRepos.reduce(
      (total, repo) => total + repo.stargazers_count,
      0
    );

    const languageCounts: LanguageMap = {};

    for (const repo of ownRepos) {
      if (repo.language) {
        languageCounts[repo.language] =
          (languageCounts[repo.language] || 0) + 1;
      }
    }

    const languages = Object.entries(languageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([name, count]) => ({
        name,
        count,
      }));

    return NextResponse.json(
      {
        username: USERNAME,
        publicRepos: user.public_repos,
        followers: user.followers,
        following: user.following,
        stars: totalStars,
        languages,
      },
      {
        headers: {
          "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("GitHub stats error:", error);

    return NextResponse.json(
      { error: "Unable to fetch GitHub statistics." },
      { status: 500 }
    );
  }
}