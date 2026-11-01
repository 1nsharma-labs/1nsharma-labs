# AEMY — The Engineering Universe

An interactive, Roblox-inspired 2.5D portfolio and open engineering map for AEMY and 1nsharma-labs.

## Experience
- Interactive island map with keyboard navigation and accessible portal controls.
- AI systems, engineering labs, product world, and research outpost.
- Selected work linked to verified public repositories.
- Responsive layout, semantic HTML, visible focus states, and reduced-motion support.
- No runtime framework or paid dependency required.

## Local preview
Open `index.html` in a browser, or run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Public project registry
`projects.json` contains curated metadata for selected repositories. The workflow in `.github/workflows/sync-projects.yml` is configured for scheduled and manual runs. It queries public repositories for the personal account and organization, and only publishes records returned by GitHub with `private: false` and `visibility: public`. Curated descriptions are applied only when a matching public repository is discovered; curated-only entries are never reinserted.

The workflow configuration has not yet been validated by a successful Actions run. If the organization API is unavailable, already-discovered public repositories remain eligible; unavailable curated entries are not retained as published records.

## Identity and links
Public identity and verified links align with the personal profile README: https://github.com/1nsharma/1nsharma.

## Deployment
GitHub Pages is not enabled and no production deployment is claimed. The site is maintained as source for review and local preview.

## Safety
- Never expose private repository names, metadata, or source.
- Never put tokens or secrets in frontend code, JSON, commits, or build artifacts.
- Do not change repository visibility, Pages, or production settings without explicit approval.
- Do not represent a prototype as deployed, piloted, or measured without evidence.
