# 🌐 Silicon Commodity Portal 运维总览 (Index)

> **版本**: v2.5  
> **状态**: 模块化治理完成  
> **核心原则**: 配置驱动, 代码解耦, 沉浸式工业设计

本目录包含了网站的一站式运维指南。当您需要修改网站内容、调整布局或修复错误时，请按需查阅以下模块：

## 🛠️ 功能模块索引

### 1. [基础架构 | Infrastructure](./01_INFRASTRUCTURE.md)
- **技术栈**: Next.js 14, Tailwind CSS, Vercel
- **部署逻辑**: Git Push 触发全自动构建
- **资产存放**: 静态图片与研报源码的存储规范

### 2. [日常工作流 | Daily Workflow](./02_WORKFLOW.md)
- **发布 SOP**: 从 Obsidian 撰写到网站上线的 5 步走
- **打标标准**: 元数据 (Slug/Status/Timestamp) 的回填规范
- **内容同步**: Markdown 与交互式 HTML 的导入路径

### 3. [核心代码库 | Core Codebase](./03_CODEBASE.md)
- **渲染引擎**: `ReportRenderer` 的双模解析逻辑
- **布局系统**: 首页英雄区、Core Engine v2 及 Connect 矩阵
- **组件索引**: `PriceTicker` 与 `PortfolioCard`

### 4. [系统设定 | Configuration](./04_CONFIGURATION.md)
- **身份字典**: `biography.ts` (个人品牌、联系方式、审计日志)
- **内容清单**: `reports.ts` (全站文章注册中心)
- **视觉令牌**: 工业风颜色与字体定义

---

**快速运维命令**:
- `npm run dev`: 本地预览测试
- `git push origin main`: 生产环境部署
