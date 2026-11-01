import { readFile, writeFile } from "node:fs/promises";

const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(process.env.GITHUB_TOKEN ? { Authorization: "Bearer " + process.env.GITHUB_TOKEN } : {})
};
const endpoints = [
  ["personal", "https://api.github.com/users/1nsharma/repos?type=public&per_page=100&sort=updated"],
  ["organization", "https://api.github.com/orgs/1nsharma-labs/repos?type=public&per_page=100&sort=updated"]
];
const curated = JSON.parse(await readFile("projects.json", "utf8"));
const featured = new Map(curated.projects.map((item) => [item.fullName.toLowerCase(), item]));
const discovered = [];
for (const [scope, endpoint] of endpoints) {
  let url = endpoint;
  let pageCount = 0;
  while (url && pageCount < 5) {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      if (response.status === 404 && scope === "organization") {
        console.warn("Organization endpoint unavailable; preserving curated registry.");
        break;
      }
      throw new Error("GitHub API " + response.status + " for " + scope + " repository discovery");
    }
    const repos = await response.json();
    for (const repo of repos) {
      if (repo.private || repo.visibility !== "public" || repo.fork) continue;
      const fullName = repo.full_name;
      const curatedItem = featured.get(fullName.toLowerCase());
      discovered.push({
        ...(curatedItem || {}),
        name: curatedItem?.name || repo.name,
        fullName,
        url: repo.html_url,
        category: curatedItem?.category || "engineering",
        featured: curatedItem?.featured || false,
        description: curatedItem?.description || repo.description || "Public repository — description not provided.",
        language: repo.language,
        stars: repo.stargazers_count,
        updatedAt: repo.updated_at,
        archived: repo.archived,
        scope
      });
    }
    const link = response.headers.get("link") || "";
    url = link.split(",").find((part) => part.includes('rel="next"'))?.match(/<([^>]+)>/)?.[1] || null;
    pageCount += 1;
  }
}
const merged = new Map(discovered.map((item) => [item.fullName.toLowerCase(), item]));
for (const item of curated.projects) {
  if (!merged.has(item.fullName.toLowerCase())) merged.set(item.fullName.toLowerCase(), item);
}
const output = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  source: "GitHub public repository API + curated founder profile metadata",
  projects: [...merged.values()].sort((a, b) => Number(b.featured) - Number(a.featured) || (b.stars || 0) - (a.stars || 0)),
  discovery: curated.discovery
};
await writeFile("projects.json", JSON.stringify(output, null, 2) + "\n");
console.log("Wrote " + output.projects.length + " public project entries.");