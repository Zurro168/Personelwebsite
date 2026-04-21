# 🛰️ 硅基大宗：出版标准 V6.0 技术备案 (Technical Spec)

## 1. 核心物理规格 (Physical Dimensions)
本规格旨在确立“工业级阅读”的权威感，所有渲染引擎必须严格执行以下绝对像素值：

| 维度 | 规格值 | CSS 实现 |
| :--- | :--- | :--- |
| **画布总宽 (Canvas Width)** | 1300px | `width: 1300px !important` |
| **侧边边距 (Horizontal Padding)** | 80px | `padding-left/right: 80px` |
| **首尾边距 (Vertical Padding)** | 100px | `padding-top/bottom: 100px` |
| **有效文字区 (Text Content Area)** | 1140px | `max-width: none` (内压 160px) |

## 2. 样式注入逻辑 (CSS Injection Logic)
为了防止 HTML 源码中携带的样式（如 Tailwind 或 Inline Styles）干扰工业画幅，必须执行以下强制覆盖：

```css
.report-body {
  width: 1300px !important;
  max-width: 1300px !important;
  margin: 0 auto !important;
  padding: 100px 80px !important;
  box-sizing: border-box !important;
}

/* 强制重置内部容器宽度 */
.report-body * {
  max-width: none !important;
}

.report-body [class*="max-w-"] {
  max-width: 100% !important;
  width: 100% !important;
}
```

## 3. 双模渲染协议 (Dual-Mode Rendering)
*   **Paper Mode (默认)**：应用上述 1300px 物理白区及“纸质化”CSS 增强。
*   **Interactive Mode**：当 YAML `layout: interactive` 时，隐藏站点页眉，移除 1300px 限制，开启全域视口。

## 4. 版本变更记录
- **V4.0**: 重构渲染引擎，支持 960px 宽度。
- **V5.0**: 引入 1100px 宽度，增加溢出防护。
- **V6.0 (当前)**: 确立 1300px 物理基准，移除浮窗阴影，执行“极致宽屏”强制拉伸。

---
**备案人**: Antigravity SC-Agent
**日期**: 2026-04-21
**状态**: 生产环境已部署 (ECCB25B / C9C2DF0)
