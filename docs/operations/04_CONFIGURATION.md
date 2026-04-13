# ⚙️ 系统设定 (Configuration)

> **核心原则**: 改配置文件 = 改网页内容。无需重写业务逻辑。

## 1. 个人品牌与身份 (`src/data/biography.ts`)
该文件定义了全站所有的静态文本描述：
- `AUTHOR_BIO`: 首页英雄区的自我介绍。
- `SOCIAL_LINKS`: 底部 Connect 模块的所有外部链接与图片路径。
- `AUDIT_LOG_ENTRY`: `CORE_ENGINE_v2` 面板中的所有系统日志清单。
- `ENVIRONMENT_STATUS`: 设置系统状态（如 `ONLINE` 或 `SYNCING`）。

## 2. 研报内容配置 (`src/data/reports.ts`)
这是全站内容的“路由器”：
- `REPORT_CATEGORY`: 分类定义。
- `ALL_REPORTS`: 核心数组。每增加一篇文章，必须在此注册。
  - **关键字段**:
    - `isHtml`: (Boolean) 决定渲染引擎。
    - `hasContent`: (Boolean) 决定列表页是否可点击。
    - `path`: 研报在 `public` 下的相对路径。

## 3. 价格行情模拟器 (`src/components/layout/PriceTicker.tsx`)
- **数据源**: 当前为 `TICKER_DATA` 静态数组。
- **自定义**: 可随时修改数组内的 `price` 和 `change` 以响应您的市场观点。

## 4. 颜色与视觉令牌 (`tailwind.config.ts`)
- **Cyan-500 (#06b6d4)**: 主色调，用于按钮、边框、等宽字体和系统日志。
- **Slate-900/950**: 背景主色，营造深色工业氛围。
- **Amber-500**: 强调色，仅用于极少数高警示信息（如页头装饰线）。

---

## 💡 维护秘籍
当您需要告诉 AI 进行修改时，直接引用本文件中的字段名即可。
*例: “帮我修改 biography.ts 里的 AUDIT_LOG_ENTRY，增加一条名为‘2026.04 交互式研报引擎上线’的日志。”*
