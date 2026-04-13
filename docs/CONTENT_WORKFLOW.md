# ⚙️ Content Workflow & Maintenance

## 1. Adding a New Report
1. **Sync Files**: Export your Markdown or HTML (Interactive) content to the project.
2. **Register Metadata**: Add a new entry to `ALL_REPORTS` in `src/data/reports.ts`.
3. **Set Flags**: 
   - If it contains `<script>` or `<canvas>` (Chart.js), set `isHtml: true`.
   - If it is standard Markdown, omit `isHtml`.
4. **Backfill Obsidian Metadata**: 
   - **MANDATORY**: Update the source file in Obsidian Vault with:
     - `slug: [assigned-slug]`
     - `status: published`
     - `published_at: [current-date]`

## 2. Interactive Report Standards
Interactive reports should be self-contained HTML strings.
- **Styling**: Include a `<style>` block if specific fonts or layouts are needed.
- **JS Libraries**: If using external libs like Chart.js, ensure they are CDN linked or the `ReportRenderer` is configured to handle them.
- **Dark Mode**: Use `text-slate-400` or `text-white/60` to maintain terminal aesthetic.

## 3. Maintenance of Audit Logs
The `auditLog` in `biography.ts` is the chronological heartbeat of the site.
- **Frequency**: Update whenever a new major report or system iteration is completed.
- **Naming**: Use technical verbs (e.g., `processed`, `deployed`, `optimized`) to maintain the prompt-log style.

## 4. Environment Sync
- Deployment is automated via **Vercel**.
- Pushing to `origin main` triggers a production build.
- Binary assets (images) MUST be pushed to Git to be visible on the web.
