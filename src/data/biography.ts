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
    linkedin: "https://www.linkedin.com/in/gordon-wang-63622821", 
    x: "https://x.com/Gordon800619", 
    github: "https://github.com/Zurro168",
    email: "zurro_w@foxmail.com"
  },

  // 版权申明模板
  copyright: {
    owner: "硅基大宗 (Silicon Commodity)",
    year: 2026,
    notice: "本文著作权归 硅基大宗 所有。非经书面授权，禁止任何形式的转载、摘编或建立镜像。",
    reprintGuide: "如需转载、引用或进行深度商业合作，请通过上方社交矩阵联系主理人进行授权验证。"
  },

  // 🖱️ 系统审计日志 (展示在首页情报看板)
  systemLogs: [
    { id: 1, text: 'PARSING_OBSIDIAN_VAULT: 124_NODES_IDENTIFIED', status: 'READY' },
    { id: 2, text: 'SCANNING_NYMEX_WTI_SENTIMENT_CLUSTERS...', status: 'FETCHING' },
    { id: 3, text: 'GENERATING_COPPER_SUPPLY_CHAIN_MATRIX_V4', status: 'COMPLETED' },
    { id: 4, text: 'SYNCING_HTML_REPORTS_TO_PRODUCTION...', status: 'SUCCESS' },
    { id: 5, text: 'MAPPING_MACRO_ENTROPY_ACROSS_AGRI_SECTOR', status: 'ACTIVE' },
  ],
  telemetry: {
    latency: '14.2ms',
    throughput: '1,240 pkts/s',
    entropy: '0.842'
  },

  // 🎓 教育背景 (Education)
  education: [
    {
      degree: "产业经济学 / 硕士",
      school: "双一流重点大学",
      duration: "2010 - 2013",
      status: "GRADUATED"
    },
    {
      degree: "国际贸易与金融 / 学士",
      school: "重点财经大学",
      duration: "2006 - 2010",
      status: "GRADUATED"
    }
  ],

  // 💼 工作经历 (Work Experience)
  experience: [
    {
      role: "主理人 & 架构师",
      company: "硅基大宗 (Silicon Commodity)",
      duration: "2024 - PRESENT",
      description: "主导大宗商品投研体系的数字化转型，构建基于 AI Agent 的情报自动化采集与研报生成流水线。"
    },
    {
      role: "资深投研经理",
      company: "某大型有色金属产业集团",
      duration: "2016 - 2024",
      description: "深耕铜、铝、锌及战略金属产业链，负责全球供应平衡表建模及跨国矿山项目投后资产管理。"
    },
    {
      role: "初级分析师",
      company: "大宗商品贸易行",
      duration: "2013 - 2016",
      description: "负责基础金属现货贸易风险管理，执行 LME/SHFE 跨市套利与基差交易策略方案。"
    }
  ],

  // 🏆 荣誉奖项 (Awards)
  awards: [
    {
      title: "年度数字化转型创新奖",
      source: "行业技术高峰论坛",
      year: "2025"
    },
    {
      title: "最佳有色金属策略师",
      source: "大宗商品研究协会",
      year: "2022"
    }
  ],

  // ⚡ 技能矩阵 (Skills - 用于底部动态环)
  skills: [
    { name: "Python / AI", level: 92 },
    { name: "投研建模", level: 95 },
    { name: "供应链治理", level: 88 },
    { name: "全栈开发", level: 85 },
    { name: "现货风控", level: 90 },
    { name: "双语商务", level: 80 }
  ]
};
