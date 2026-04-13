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
      id: "zurro_w", 
      qrCode: "/brand/wechat-personal.png", 
    },
    officialAccount: {
      label: "微信公众号",
      name: "Siliconcommodity",
      qrCode: "/brand/official-account.png",
    },
    linkedin: "www.linkedin.com/in/gordon-wang-63622821", 
    x: "#", 
    email: "zurro_w@foxmail.com"
  },

  // 版权申明模板
  copyright: {
    owner: "硅基大宗 (Silicon Commodity)",
    year: 2026,
    notice: "本文著作权归 硅基大宗 所有。非经书面授权，禁止任何形式的转载、摘编或建立镜像。",
    reprintGuide: "如需转载、引用或进行深度商业合作，请通过上方社交矩阵联系主理人进行授权验证。"
  },

  // 🖱️ 系统审计日志 (展示在首页身份卡片下方)
  systemLogs: [
    { id: 1, text: 'INIT_KERNEL_v2.0.4... SUCCESS', status: 'OK' },
    { id: 2, text: 'FETCHING_NYMEX_CRUDE_LIVE_STREAM...', status: '240.52 KB/s' },
    { id: 3, text: '[ALGO] ANALYZING_GEO_POLITICAL_SENTIMENT_NODE_09...', status: 'COMPLETED' },
    { id: 4, text: 'CALCULATING_ALPHA_VECTOR: METALS_GLOBAL_H1', status: 'IN_PROG' },
    { id: 5, text: 'MAPPING_SYSTEM_ENTROPY: CURRENT_VALUE_0.842', status: 'STABLE' },
  ],
  telemetry: {
    latency: '14.2ms',
    throughput: '1,240 pkts/s',
    entropy: '0.842'
  }
};
