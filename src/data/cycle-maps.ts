export interface CycleMapData {
  name: string;
  slug: string;
  priceSymbol: string;
  status: string;
  score: number;
  lastScore: number;
  description: string;
  scores: {
    macro: number;
    demand: number;
    inventory: number;
    supply: number;
  };
  inventory: {
    labels: string[];
    inventoryData: number[];
    priceData: number[];
  };
  demand: {
    labels: string[];
    data: number[];
  };
  strategy: {
    shortTerm: string;
    supportLevel: string;
    enterprise: string;
  };
  roadmap: {
    macro: string;
    demand: string;
    inventory: string;
    price: string;
    supply: string;
    currentPos: number; // 0-4
  };
}

export const cycleMaps: Record<string, CycleMapData> = {
  copper: {
    name: '铜 (Copper)',
    slug: 'copper',
    priceSymbol: 'LME铜价 (美元/吨)',
    status: '⚠️ 修正期',
    score: 58,
    lastScore: 72,
    description: '正从过热期向结构性修正期过渡。全球高库存及宏观经济压力暂时抵消了 AI 和能源转型的长期需求。',
    scores: {
      macro: 45,
      demand: 70,
      inventory: 25,
      supply: 60
    },
    inventory: {
      labels: ['2025-11', '2025-12', '2026-01', '2026-02', '2026-03', '2026-04'],
      inventoryData: [420, 510, 680, 850, 960, 1050],
      priceData: [10200, 11500, 13400, 12900, 12500, 12150]
    },
    demand: {
      labels: ['AI数据中心与服务器', '电动车与电网升级', '传统建筑工程', '通用制造业'],
      data: [35, 45, 12, 8]
    },
    strategy: {
      shortTerm: 'LME铜价在 12,000 美元附近震荡。直到库存显著去化前，上行空间极其有限。',
      supportLevel: '密切关注 11,500 美元水位。在该位置若伴随库存回落，将是入场良机。',
      enterprise: '维持“随用随买”策略。降低战略性库存权重，关注地缘关税风险。'
    },
    roadmap: {
      macro: '滞胀隐忧',
      demand: 'AI/电网刚性',
      inventory: '严重饱和',
      price: '宽幅震荡',
      supply: '长线紧平衡',
      currentPos: 2
    }
  },
  aluminum: {
    name: '铝 (Aluminum)',
    slug: 'aluminum',
    priceSymbol: 'LME铝价 (美元/吨)',
    status: '🚀 扩张期',
    score: 82,
    lastScore: 78,
    description: '随着能源成本结构重组以及光伏装机量激增，原铝需求进入长效扩张阶段。',
    scores: {
      macro: 65,
      demand: 88,
      inventory: 75,
      supply: 50
    },
    inventory: {
      labels: ['2025-11', '2025-12', '2026-01', '2026-02', '2026-03', '2026-04'],
      inventoryData: [800, 750, 710, 680, 650, 620],
      priceData: [2100, 2250, 2400, 2550, 2600, 2640]
    },
    demand: {
      labels: ['光伏边框与支架', '汽车轻量化', '传统包装', '电工圆铝线'],
      data: [40, 30, 15, 15]
    },
    strategy: {
      shortTerm: '由于供给端氧化铝瓶颈持续，价格具备坚实支撑，建议持股待涨。',
      supportLevel: '关键支撑位在 2,500 美元，若回调即是加仓位。',
      enterprise: '建议建立 2-3 个月的安全库存，防止供给扰动带来的基差飙升。'
    },
    roadmap: {
      macro: '软着陆预期',
      demand: '绿色能源爆发',
      inventory: '持续去库',
      price: '阶梯上行',
      supply: '产能红线',
      currentPos: 3
    }
  },
  zircon: {
    name: '锆钛 (Zircon & Titanium)',
    slug: 'zircon',
    priceSymbol: '锆英砂/海绵钛 (指数)',
    status: '💎 积累期',
    score: 65,
    lastScore: 62,
    description: '受高端矿源稀缺性支撑，价格中枢逐步抬升。航空航天与高端化工需求构成了强劲的结构性底部。',
    scores: {
      macro: 55,
      demand: 75,
      inventory: 40,
      supply: 85
    },
    inventory: {
      labels: ['2025-11', '2025-12', '2026-01', '2026-02', '2026-03', '2026-04'],
      inventoryData: [250, 245, 240, 235, 232, 228],
      priceData: [420, 425, 432, 445, 455, 462]
    },
    demand: {
      labels: ['航空航天钛合金', '高端化工防腐', '精密陶瓷与耐火材料', '增材制造(3D打印)'],
      data: [35, 25, 30, 10]
    },
    strategy: {
      shortTerm: '目前处于矿端溢价向中游传导的关键期。建议关注高品质矿源龙头的定价风向。',
      supportLevel: '支撑位明确。若主流供应商出现减产信号，价格将具备跨周期爆发力。',
      enterprise: '建议实施战略性备库。由于上游集中度极高，必须确保供应链的多元化冗余。'
    },
    roadmap: {
      macro: '政策扶持',
      demand: '军工/大飞机放量',
      inventory: '温和去化',
      price: '底部抬升',
      supply: '供给寡头化',
      currentPos: 1
    }
  }
};
