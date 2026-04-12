# 📖 Site Configuration Dictionary

Use this dictionary to map database fields to UI components. Reference these fields when requesting updates.

## 1. Global Identity (`src/data/biography.ts`)

| Field | UI Component | Description |
| :--- | :--- | :--- |
| `name` | Global Label | Author's primary name. |
| `title` | Identity Card Head | Displayed above the si-icon. |
| `motto` | About / Meta | Core philosophy string. |
| `location` | Identity Card Row | Current operational coordinates. |
| `focus` | Identity Card Row | Focus[0] is displayed prominently. |
| `tags` | Identity Card Tags | Keywords displayed in the card footer. |
| `social.wechat.id` | Connect Card Footer | Displayed WeChat ID string. |
| `social.wechat.qrCode`| Connect Card Image | Path: `/brand/wechat-personal.png`. |
| `social.officalAccount.qrCode` | Connect Card Image | Path: `/brand/official-account.png`. |
| `auditLog` | Identity Card Log | **High-frequency updates**. {date, action}. |

## 2. Content Inventory (`src/data/reports.ts`)

| Field | UI Component | Description |
| :--- | :--- | :--- |
| `id` | Report Top-Left | Industrial code (e.g., SCC-2026-001). |
| `tag` | Blue Capsule Tag | Category (e.g., Cross-domain, Commodities). |
| `title` | Report List / Detail | The primary article title. |
| `description` | Report List Excerpt | Short summary shown on the list page. |
| `slug` | URL Path | Must match the data file identifier. |
| `isHtml` | **Render Logic** | Set to `true` for interactive JS charts. |

## 3. Asset Paths
- **QR Codes / Logos**: `public/brand/`
- **Article Covers**: `public/images/reports/`
- **Interactive Assets**: Bundled within the HTML report content.
