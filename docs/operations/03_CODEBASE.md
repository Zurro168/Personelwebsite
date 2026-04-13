# 🧬 核心代码库 (Core Codebase)

## 1. 核心路由 (Pages)
- **首页**: `src/app/page.tsx`
  - 核心模块: `HeroSection`, `CoreEngineV2`, `PortfolioSection`, `ContactSection`.
  - 逻辑: 聚合 `biography.ts` 里的审计日志与联系方式。
- **研报页**: `src/app/portfolio/[slug]/page.tsx`
  - 逻辑: 动态获取 `slug` -> 读取 `/public/content/reports/` 对应文件 -> 选择渲染模式。

## 2. 关键组件 (Components)
- **`ReportRenderer.tsx`**:
  - **功能**: 内容解析中心。
  - **模式 A**: Markdown (使用 `react-markdown` + `remark-gfm`).
  - **模式 B**: Raw HTML (直接注入到 `iframe` 或 `dangerouslySetInnerHTML`).
- **`PriceTicker.tsx`**:
  - **功能**: 顶部滚动行情条。高度定制化, 工业风窄边设计。
- **`Navigation.tsx`**:
  - **功能**: 全站粘性导航。

## 3. 布局治理 (Layout Standards)
- **容器规范**: 全站主容器统一使用 `max-w-7xl mx-auto px-8`.
- **排版**: 
  - 标题: `font-bold tracking-tight text-white`
  - 正文: `text-slate-400 leading-relaxed`
  - 代码/终端感: `font-mono text-cyan-500`

## 4. UI 逻辑
- **Core Engine v2**: 动态状态机日志。通过 `systemLogs` 数组驱动，展示系统“运行中”的质感。
- **Social Matrix**: 社交媒体矩阵。支持扫码弹窗与外部悬停效果。
