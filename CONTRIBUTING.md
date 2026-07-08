# Contributing

This repository is maintained as a shared Git workspace for human and Antigravity/Codex-assisted work.

## Working Principles

- Verify the active path before editing: `F:\Documents\Antigravity\个人网站`.
- Keep changes small and topic-focused.
- Separate documentation, content sync, UI, and infrastructure changes when possible.
- Preserve generated assets unless the task is explicitly about regenerating or cleaning them.
- Never commit local secrets.

## Branches

Use short, descriptive branch names:

```text
codex/docs-git-maintenance
codex/content-sync-fix
codex/ui-portfolio-polish
```

If the user requests a different branch style, follow that request.

## Commit Style

Use clear, practical commit messages:

```text
docs: add git maintenance workflow
content: sync published reports
fix: resolve portfolio renderer overflow
chore: update generated registry
```

## Change Types

### Documentation Only

Typical files:

- `README.md`
- `CONTRIBUTING.md`
- `CHANGELOG.md`
- `docs/**/*.md`
- `.github/*.md`

Verification:

```bash
git diff --check
```

### Content Sync

Typical files:

- `src/data/reports.ts`
- `public/content/reports/*.html`
- `public/content/system/*.html`
- `public/images/reports/*`
- `published_files.json`

Verification:

```bash
npm run sync
npm run build
```

Inspect the report list and at least one updated article after sync.

### Code or UI Changes

Typical files:

- `src/app/**/*.tsx`
- `src/components/**/*.tsx`
- `src/lib/**/*.ts`
- `src/app/api/**/*.ts`
- `next.config.ts`
- `package.json`

Verification:

```bash
npm run lint
npm run build
```

Before changing Next.js APIs or conventions, read the relevant local docs under `node_modules/next/dist/docs/`.

## Pull Request Checklist

Before opening a PR:

- [ ] The branch contains one coherent topic.
- [ ] No real `.env*` files or secrets are included.
- [ ] Generated content changes are intentional.
- [ ] Verification commands were run or the reason for skipping is documented.
- [ ] The PR description names the affected user-facing areas.

