# Git Maintenance Guide

This guide turns the project into a predictable Git workspace for human and Antigravity-assisted maintenance.

## Repository Role

`F:\Documents\Antigravity\个人网站` is the website-facing repository for Silicon Commodity. It is connected to:

- Obsidian/SiliconCommand content sources
- Next.js site pages
- generated HTML report artifacts
- Vercel deployment

Because of those dependencies, path stability matters. Do not rename or relocate content roots casually.

## Source vs Generated Files

### Source of Truth

These files should be edited intentionally:

- `src/app/**`
- `src/components/**`
- `src/lib/**`
- `src/data/commodities/**`
- `src/data/biography.ts`
- `scripts/sync.ts`
- `docs/**`
- `README.md`
- `CONTRIBUTING.md`
- `AGENTS.md`

### Generated or Sync-Derived

These files are usually produced by `scripts/sync.ts` or content export workflows:

- `src/data/reports.ts`
- `public/content/reports/*.html`
- `public/content/system/*.html`
- `public/images/reports/*`
- `published_files.json`

Commit generated files only when the sync result is intentional.

### Local or Disposable

These should not be treated as source:

- `.next/`
- `node_modules/`
- `.vercel/`
- `.env*`
- `scratch/` outputs unless explicitly promoted

## Recommended Workflow

1. Check the current state:

   ```bash
   git status --short --branch
   ```

2. Create or switch to a focused branch.

3. Make one category of change:
   - docs
   - content sync
   - UI/code
   - deployment/config

4. Verify.

5. Review the diff:

   ```bash
   git diff --stat
   git diff --check
   ```

6. Commit and push.

## Verification Matrix

| Change | Minimum verification |
| --- | --- |
| Documentation only | `git diff --check` |
| Source code | `npm run lint` |
| App routing/build behavior | `npm run lint` and `npm run build` |
| Content sync | `npm run sync`, then `npm run build` |
| API route changes | `npm run build` and targeted endpoint check |

## Secrets and Environment

- Never commit real `.env*` files.
- Use environment variables for API keys.
- If an API key is found in source, move it to env config before public upload.
- Keep masked templates separate from local real values.

## Antigravity/Codex Notes

- Read `AGENTS.md` before editing.
- For Next.js work, read the relevant local docs under `node_modules/next/dist/docs/`.
- Do not bundle unrelated generated content into a code-only PR.
- Summarize verification results in the final message or PR body.

