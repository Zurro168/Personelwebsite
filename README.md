# Silicon Commodity Portal

This repository powers the personal website and research portal for **Silicon Commodity / 硅基大宗**.

It is both a Next.js website and a publishing bridge for research content maintained from the Obsidian-based SiliconCommand workspace.

## What This Repo Does

- Hosts the public website, personal profile, research archive, cycle map, and cross-domain lab.
- Stores generated report HTML under `public/content/`.
- Registers report metadata in `src/data/reports.ts`.
- Syncs published Obsidian content into the website through `scripts/sync.ts`.
- Deploys through Vercel from the Git repository.

## Current Stack

- Next.js `16.2.2`
- React `19.2.4`
- Tailwind CSS `4`
- TypeScript
- Vercel deployment

Important: this project uses a newer Next.js version. Before changing Next.js APIs, routing behavior, build configuration, or server components, read the relevant local guide under `node_modules/next/dist/docs/`.

## Repository Map

| Path | Purpose |
| --- | --- |
| `src/app/` | App Router pages and API routes |
| `src/components/` | Shared UI and rendering components |
| `src/data/` | Site configuration, biography, report registry, commodity data |
| `src/lib/` | Data adapters and service helpers |
| `public/content/reports/` | Generated report HTML used by `/portfolio/[slug]` |
| `public/content/system/` | Generated system pages such as `about.html` |
| `public/images/reports/` | Report cover images |
| `public/brand/` | Brand, QR, and identity assets |
| `scripts/sync.ts` | Obsidian-to-site sync pipeline |
| `docs/` | Maintenance, architecture, and workflow documentation |
| `scratch/` | Temporary audit and cleanup scripts; do not treat as production entrypoints |

## Common Commands

```bash
npm install
npm run dev
npm run lint
npm run build
npm run sync
```

Vercel CLI is not currently installed on this machine. Installing it with `npm i -g vercel` will make environment pulls, deployment checks, and log inspection easier.

## Git Maintenance Flow

1. Start from a clean working tree when possible: `git status --short --branch`.
2. Create a focused branch for meaningful changes, usually with the `codex/` prefix when an assistant is driving the work.
3. Keep content sync changes separate from UI/refactor changes when practical.
4. Run the smallest useful verification before committing:
   - docs-only: inspect changed Markdown and links
   - code or config: `npm run lint`
   - runtime or rendering changes: `npm run build`
   - content sync changes: `npm run sync`, then inspect generated files
5. Commit with a clear message and push for Vercel/GitHub review.

See [CONTRIBUTING.md](./CONTRIBUTING.md) and [docs/GIT_MAINTENANCE.md](./docs/GIT_MAINTENANCE.md) for the shared maintenance rules.

## Content Publishing Summary

The preferred publishing path is:

```text
Obsidian SiliconCommand source
  -> scripts/sync.ts
  -> public/content/*
  -> src/data/reports.ts
  -> Next.js portfolio pages
  -> Vercel deployment
```

Do not manually edit generated report HTML unless the change is an emergency patch. Prefer fixing the Obsidian source or sync script, then regenerate.

## Safety Notes

- Do not commit real `.env*` files.
- Copy `.env.example` to `.env.local` and set `FRED_API_KEY` before using the FRED-backed market data endpoint.
- Do not move Obsidian-linked folders or generated content paths without first checking sync dependencies.
- Treat `public/content/` and `src/data/reports.ts` as generated website-facing artifacts.
- Keep API keys in environment variables, not source files.
