<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Repository Maintenance Rules

This repository is the Git-maintained website workspace for Silicon Commodity / 硅基大宗.

## Before Editing

- Confirm the active path is `F:\Documents\Antigravity\个人网站`.
- Check `git status --short --branch`.
- Read `README.md`, `CONTRIBUTING.md`, and `docs/GIT_MAINTENANCE.md` when the task involves maintenance, publishing, or collaboration.

## Content Boundaries

- `src/data/reports.ts`, `public/content/reports/*.html`, `public/content/system/*.html`, and `public/images/reports/*` are usually sync-derived artifacts.
- Prefer fixing the Obsidian source or `scripts/sync.ts`, then regenerating, instead of hand-editing generated report HTML.
- Do not rename or relocate Obsidian-linked paths unless dependency mapping has been done.

## Safety

- Do not commit real `.env*` files or secrets.
- Keep generated-content commits separate from code changes when practical.
- For code changes, run `npm run lint`; for routing/build/rendering changes, run `npm run build` too.
