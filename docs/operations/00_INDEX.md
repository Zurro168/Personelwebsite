# Silicon Commodity Portal Operations Index

Version: v3.0
Status: Git-maintained documentation baseline
Core principle: configuration-driven, content-sync aware, safe for shared Antigravity maintenance

This folder contains the operational guides for maintaining the Silicon Commodity website.

## First Read

- [Repository Git Maintenance](../GIT_MAINTENANCE.md): branch, commit, verification, and generated-file rules.
- [Root README](../../README.md): project role, repository map, and common commands.
- [Contributing Guide](../../CONTRIBUTING.md): shared workflow for humans and assistants.

## Operations Modules

### 1. Infrastructure

[01_INFRASTRUCTURE.md](./01_INFRASTRUCTURE.md)

Covers the website stack, deployment model, static assets, and infrastructure assumptions.

Current stack to verify against code before editing:

- Next.js `16.2.2`
- React `19.2.4`
- Tailwind CSS `4`
- Vercel deployment

### 2. Daily Workflow

[02_WORKFLOW.md](./02_WORKFLOW.md)

Covers the publishing flow from Obsidian content into the website, including metadata, sync, and deployment habits.

### 3. Core Codebase

[03_CODEBASE.md](./03_CODEBASE.md)

Covers key routes and components such as:

- `src/app/page.tsx`
- `src/app/portfolio/[slug]/page.tsx`
- `src/components/ReportRenderer.tsx`
- `src/components/layout/PriceTicker.tsx`

### 4. Configuration

[04_CONFIGURATION.md](./04_CONFIGURATION.md)

Covers configuration-oriented editing, especially:

- `src/data/biography.ts`
- `src/data/reports.ts`
- `src/data/commodities/*.json`

### 5. Publishing Specification

[06_PUBLISHING_V6_SPEC.md](./06_PUBLISHING_V6_SPEC.md)

Covers the industrial report rendering rules and the paper/interactive layout split.

## Quick Commands

```bash
npm run dev
npm run lint
npm run build
npm run sync
git status --short --branch
```

Vercel CLI is not installed in the current environment. Install it with `npm i -g vercel` when deployment logs, environment pulls, or CLI deployment checks are needed.

## Shared Maintenance Warnings

- Do not commit real `.env*` files.
- Treat `public/content/*` and `src/data/reports.ts` as sync-derived unless intentionally patched.
- Read local Next.js docs under `node_modules/next/dist/docs/` before changing framework behavior.
- Do not move Obsidian-linked paths before checking dependencies.
