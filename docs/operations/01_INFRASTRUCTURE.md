# 🏗️ 基础架构 (Infrastructure)

## 1. 技术栈 (Tech Stack)
- **底层框架**: Next.js (App Router)
- **样式方案**: Tailwind CSS (JIT Mode)
- **图标系统**: Lucide-React
- **渲染插件**: React-Markdown, Remark-GFM, KaTeX (公式解析), Prism (代码高亮)
- **交互引擎**: Chart.js (用于研报中的动态图表)

## 2. 部署与同步流程
- **版本控制**: GitHub (`Zurro168/Personelwebsite`)
- **宿主环境**: Vercel Production
- **流水线**: 
  1. 本地 `git push`
  2. Vercel 检测到更新, 启动 `npm run build`
  3. 静态化 (Edge Network) 部署, 全球加速
- **外部依赖**: 
  - 通过 MCP (Model Context Protocol) 连接本地的 Obsidian Vault 实现自动化打标。

## 3. 目录与存储结构 (Directory Structure)
- `/src/app/`: 页面路由 (Home, Portfolio)
- `/src/components/`: 可复用 UI 模块 (Renderer, Layout)
- `/src/data/`: **网站的大脑** (所有可编辑配置存放于此)
- `/public/`: 静态资产
  - `/brand/`: QR 码、个人 Logo
  - `/content/reports/`: 研报源文件 (.md / .html)
  - `/images/`: 文章封面图

## 4. 容灾与维护
- **本地备份**: 定期同步 `个人网站` 整个文件夹到云盘。
- **配置优先级**: 修改 `src/data/` 下的文件具有最高优先级，修改后必须 `git commit` 方可生效。
