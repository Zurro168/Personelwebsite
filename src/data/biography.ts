/**
 * 🛰️ Silicon Commodity: Global Biography & IP Configuration
 * ---------------------------------------------------------
 * 作用：集中管理个人联系方式、社交链接、版权申明及 IP 标签。
 */

export const AUTHOR_INFO = {
  name: "Silicon Researcher",
  title: "硅基大宗主理人",
  motto: "碳基经验的终局，算法逻辑的起点。",
  location: "Decision Frontier / 决策前沿",
  focus: ["Commodities (大宗商品)", "AI Architecture (AI 架构)", "Systemic Governance (系统治理)"],
  
  // 个人标签
  tags: ["Systemic", "Resilient", "Algorithm-Driven", "Evolutionary"],

  // 社交矩阵 (用于首页 Connect 模块)
  social: {
    wechat: {
      label: "个人微信号",
      id: "SiliconCommand", 
      qrCode: "/brand/wechat-personal.png", 
    },
    officialAccount: {
      label: "微信公众号",
      name: "硅基大宗",
      qrCode: "/brand/official-account.png",
    },
    linkedin: "https://linkedin.com/in/your-profile", 
    x: "#", 
    email: "contact@silicon-commodity.com"
  },

  // 版权申明模板
  copyright: {
    owner: "硅基大宗 (Silicon Commodity)",
    year: 2026,
    notice: "本文著作权归 硅基大宗 所有。非经书面授权，禁止任何形式的转载、摘编或建立镜像。",
    reprintGuide: "如需转载、引用或进行深度商业合作，请通过上方社交矩阵联系主理人进行授权验证。"
  },

  // 🖱️ 系统审计日志 (展示在首页身份卡片下方)
  auditLog: [
    { date: "04.12", action: "processed_market_sentiment_matrix_v2.1" },
    { date: "04.10", action: "deployed_autonomous_intel_node_sh" },
    { date: "04.08", action: "archived_tcm_systems_refactor_notes" },
  ]
};
