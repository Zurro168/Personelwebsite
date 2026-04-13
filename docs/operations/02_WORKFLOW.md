# 🔄 日常工作流 (Daily Workflow)

## 1. 内容生产 SOP (5 步发布法)

### 第一步：在 Obsidian 中创作
- **路径**: `D:\iCloudDrive\iCloud~md~obsidian\Obsidian Vault\SiliconCommand\...`
- **注意**: 确保文章包含 Frontmatter 头信息。

### 第二步：同步至网站文件夹
- **Markdown 文章**: 拷贝到 `public/content/reports/[slug].md`
- **交互式 HTML**: 拷贝到 `public/content/reports/[slug].html`
- **图片资产**: 封面图放入 `public/images/`

### 第三步：全站注册 (Registration)
- **文件**: `src/data/reports.ts`
- **操作**: 在 `ALL_REPORTS` 数组中添加新的对象。
- **配置项**:
  - `id`: 唯一 ID (如 SCC-2026-001)
  - `slug`: 永久链接 (需与文件名一致)
  - `isHtml`: 若含有动态图表脚本, 设为 `true`

### 第四步：元数据回填 (Backfill)
- **操作**: 回到 Obsidian 源文件。
- **回填**: 设置 `status: published` 和 `published_at: yyyy-mm-dd`。

### 第五步：推送部署
- **命令**: 
  ```bash
  git add .
  git commit -m "feat: publish [title]"
  git push origin main
  ```

## 2. 交互式研报 (HTML) 发布指引
- **渲染模式**: 站点会自动识别 `isHtml: true`。
- **源码处理**: 建议移除 Obsidian 辅助标签，仅保留 `<!DOCTYPE html>` 相关代码。
- **外部 CDN**: 确保 HTML 中的脚本使用了稳定 CDN (如 `jsdelivr` 或 `tailwindcss`)。

## 3. 故障排除 (Troubleshooting)
- **图表不显示**: 检查 `reports.ts` 中 `isHtml` 字段是否开启。
- **公式乱码**: 检查 Markdown 语法是否符合 KaTeX 规范。
- **配置不生效**: 检查是否有语法错误 (缺少逗号或未关闭括号)。
