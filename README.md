# AEMY — The Engineering Universe

An interactive, Roblox-inspired 2.5D portfolio and open engineering map for Amit Sharma and 1nsharma-labs.

## Experience
- Interactive island map with keyboard navigation and accessible portal controls.
- AI systems, engineering labs, product world, and research outpost.
- Curated selected projects sourced from the founder's public profile README.
- Responsive layout, semantic HTML, visible focus states, and reduced-motion support.
- No runtime framework or paid dependency required.

## Local preview
Open `index.html` in a browser, or run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Public project registry
`projects.json` starts with curated public repositories. The workflow in `.github/workflows/sync-projects.yml` refreshes public metadata every 12 hours or by manual dispatch. It queries the public repositories of the personal account and named organization, filters private repositories and forks, preserves curated featured descriptions, and writes only public metadata. The workflow-scoped GitHub token is never written into site files or logs.

If the organization API is unavailable, curated entries are preserved and the workflow logs a warning.

## Identity and links
Founder identity and engineering principles align with the public profile README: https://github.com/1nsharma/1nsharma. Only verified profile links are included.

## Deployment
This feature branch is prepared for review. GitHub Pages has not been enabled and no production deployment has been performed. After review and merge approval, configure Pages to publish from the intended branch or a dedicated deployment workflow.

## Safety
- Never expose private repository names, metadata, or source.
- Never put tokens or secrets in frontend code, JSON, commits, or build artifacts.
- Do not change repository visibility or production settings without explicit approval.
- Do not represent a prototype as deployed, piloted, or measured without evidence.
