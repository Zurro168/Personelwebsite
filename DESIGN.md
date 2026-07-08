---
version: alpha
name: Silicon Commodity Dark Identity
description: 硅基大宗的深色极客与大宗商品工业数字系统视觉规范
colors:
  primary: "#38bdf8"
  secondary: "#fbbf24"
  tertiary: "#a855f7"
  neutral-bg: "#0a0f1a"
  neutral-fg: "#f8fafc"
  border: "rgba(56, 189, 248, 0.1)"
typography:
  h1:
    fontFamily: Inter
    fontSize: 3rem
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: -0.04em
  h2:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: 900
    lineHeight: 1.2
    letterSpacing: -0.04em
  h3:
    fontFamily: Inter
    fontSize: 1.4rem
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0.1em
  body:
    fontFamily: Inter
    fontSize: 1.1rem
    fontWeight: 400
    lineHeight: 1.9
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.85rem
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  "2xl": 24px
  "3xl": 32px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  "2xl": 48px
---

## Overview

极客主义工业风与数据科学美学。硅基大宗的界面设计摒弃了苍白的极简主义，转而追求由冷色调暗光、毛玻璃 Bento 卡片和发光霓虹边框构建而成的“终端科技感”体验。它旨在让大宗商品的分析数据、图表决策和系统逻辑以最具冲击力和极客感的方式展现。

## Colors

本设计系统根植于高对比度的深色调，使用冷青蓝作为主色，并辅助以金色与紫色提供多维度的交互和分类指示：

- **Primary (#38bdf8 - 品牌蓝/青色):** 极具视觉张力的冷电青色，作为全站核心超链接、主要交互控件、标题发光下划线及主导色。
- **Secondary (#fbbf24 - 品牌金/琥珀金):** 琥珀金色，象征大宗商品贵金属，用于核心大宗专题（如金属周期地图、黄金与钨矿高管层级的警告与核心决策卡）。
- **Tertiary (#a855f7 - 品牌紫/极客紫):** 科技极客紫色，专门用于“跨界实验室 (/intersection)”及其相关的底层探索性科学项目，提供明确的视觉隔离。
- **Neutral Background (#0a0f1a - 极深蓝底色):** 作为全站的物理背景基座，比纯黑更具冷科技质感，并伴有微妙的径向渐变光晕。
- **Neutral Foreground (#f8fafc - 亮灰白前景色):** 极其柔和的高亮白，为正文、标题和重要元数据提供最高等级的 WCAG 对比度保障。

## Typography

全站统一采用 Google 优质无衬线字体 `Inter` 作为主视觉字体，并在代码、公式与决策序列中使用 `JetBrains Mono` 作为等宽字体以凸显工业数智感：

- **H1 (3rem, Bold 900):** 主标题级，字重极粗，展现大宗研报的庄重与科技深度。
- **H2 (2.25rem, Bold 900, Underlined):** 副标题级，底部有一条 80px 的 Primary 霓虹青色发光下划线，作为章节分隔的强视觉锚点。
- **H3 (1.4rem, Bold 700, All-Caps):** 小标题级，全大写字母或带有一点字间距，用于局部列表与模块名。
- **Body (1.1rem, Regular 400, LineHeight 1.9):** 正文级，两端对齐，行高较高以保持在深色背光屏下的长期舒适阅读体验。

## Layout

采用多维度的 Bento 网格（Bento Grid）作为基础布局框架：
- **最大宽度限制**：主体框架限宽为 `max-w-7xl` (1280px)，左右留有 `px-8` (32px) 的防挤压边距。
- **网格系统**：使用 CSS Grid，桌面端通常采用 3 列网格，平板端为双列，移动端响应式落为单列。

## Elevation & Depth

在深色底图上通过多层毛玻璃阴影和微弱发光来营造悬浮深度（Depth）：
- **背景层**：`#0a0f1a`，衬以 `radial-gradient` 漫反射青色霓虹微光。
- **卡片层**：`rgba(15, 23, 42, 0.45)` 的极暗磨砂卡片，带有 1px 细微半透明白边 `border-white/5`。
- **悬浮层**：在 Card Hover 时，边框渐变为 `rgba(168, 85, 247, 0.25)` 或 `rgba(56, 189, 248, 0.25)`，并且添加背部发光 `box-shadow: 0 0 15px rgba(56, 189, 248, 0.2)`，形成呼吸灯微动效。

## Shapes

- **圆角规则**：
  - 主要交互按钮：采用 `rounded-xl` (12px) 或者是 `rounded-full`。
  - Bento 磨砂卡片：统一采用 `rounded-3xl` (24px)，维持科技系统柔和与专业的张力平衡。
  - 数据模型子网格：采用 `rounded-2xl` (16px)。

## Components

- **IFrame 体验舱模拟器**：顶部带有 3 个 Mac 仿红黄绿圆点的 `window-bar` 控制条，以磨砂玻璃外边框包裹。
- **科技风按钮 (CTA)**：采用半透明背景 `rgba(22, 28, 49, 0.8)` 叠以 `border-white/10`，在 hover 时转为带有主色（青/紫）的发光霓虹边框。
- **高对比数据表格**：表头采用 `rgba(168, 85, 247, 0.1)` 或者是 `rgba(56, 189, 248, 0.1)` 浅色底，文字为 Primary 亮色，数据行有 hover 加亮响应。

## Do's and Don'ts

- **Do**: 必须保持极细微的毛玻璃边框 `border-white/5`，它是深色 Bento 布局能清晰识别的分界保障。
- **Do**: 必须保证正文阅读字体行高为 `1.9`，这能够使高密度研报的文字透气度最佳。
- **Don't**: 严禁在大范围使用纯红、纯蓝、纯绿等高饱和度原色，所有的对比色都必须通过本规范中的 HSL 品牌色彩（冷青、琥珀金、极客紫）进行降噪处理。
- **Don't**: 页面中除公式与代码外，严禁大范围使用衬线字体。
