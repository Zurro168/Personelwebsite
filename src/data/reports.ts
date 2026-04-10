export interface Report {
  id: string;
  title: string;
  description: string;
  tag: string; // 使用字符串，确保分类可以随着文件夹动态增加
  date: string;
  readTime: string;
  image: string;
  slug: string;
  hasContent: boolean;
}

export const ALL_REPORTS: Report[] = [
  {
    id: 'SCC-2026-464',
    title: '第一线认知：中游加工企业的成本管控与管理哲学思考',
    description: '自动同步的深度研究报告',
    tag: '跨界实验',
    date: '2026-04-10',
    readTime: '10 min',
    image: '/images/reports/mining-strategy.png',
    slug: 'first-line-management-philosophy',
    hasContent: true
  },
  {
    id: 'SCC-2026-251',
    title: '中医系统论：从脏腑平衡到大宗商品供给侧博弈的隐喻',
    description: '自动同步的深度研究报告',
    tag: '跨界实验',
    date: '2026-04-10',
    readTime: '10 min',
    image: '/images/reports/mining-strategy.png',
    slug: 'tcm-commodity-metaphor',
    hasContent: true
  },
  {
    id: 'SCC-2026-158',
    title: 'AI 时代的信息生产：从碎片化搜索转向结构化知识合成',
    description: '自动同步的深度研究报告',
    tag: '跨界实验',
    date: '2026-04-10',
    readTime: '8min',
    image: '/images/reports/mining-strategy.png',
    slug: 'ai-information-production',
    hasContent: true
  },
  {
    id: 'SCC-2026-249',
    title: '硅基大宗：给所有人的商品周期地图——看懂世界的赚钱逻辑',
    description: '自动同步的深度研究报告',
    tag: '商品研报',
    date: '2026-04-10',
    readTime: '5 min',
    image: '/images/reports/mining-strategy.png',
    slug: 'commodity-business',
    hasContent: true
  },
  {
    id: 'SCC-2026-349',
    title: '硅基大宗：AI Agent 抢了全球供应链的“中枢神经”',
    description: '自动同步的深度研究报告',
    tag: '商品研报',
    date: '2026-04-10',
    readTime: '5 min',
    image: '/images/reports/mining-strategy.png',
    slug: 'global-supply-chain-2026',
    hasContent: true
  },
  {
    id: 'SCC-2026-517',
    title: '重塑版图：全球十大矿业巨头 2026 战略大博弈',
    description: '自动同步的深度研究报告',
    tag: '商品研报',
    date: '2026-04-10',
    readTime: '5 min',
    image: '/images/reports/mining-strategy.png',
    slug: 'global-mining-battle-2026',
    hasContent: true
  },
  {
    id: 'SCC-2026-287',
    title: '深度解析‘看对行情却赚不到钱’的盈亏悖论与破局之道 网页代码',
    description: '自动同步的深度研究报告',
    tag: '交易员笔记',
    date: '2026-04-10',
    readTime: '5 min',
    image: '/images/reports/mining-strategy.png',
    slug: 'profit-loss-paradox',
    hasContent: true
  },
  {
    id: 'SCC-2026-383',
    title: '跨越鸿沟：为什么你赢了判断，却输了账户？',
    description: '自动同步的深度研究报告',
    tag: '交易员笔记',
    date: '2026-04-10',
    readTime: '5 min',
    image: '/images/reports/mining-strategy.png',
    slug: 'Crossing-the-Cognitive-Gap',
    hasContent: true
  },
  {
    id: 'SCC-2026-411',
    title: '硅基大宗周期地图：铜 (Copper)',
    description: '正从过热期向结构性修正期过渡。全球高库存及宏观经济压力暂时抵消了人工智能（AI）和能源转型的长期需求。',
    tag: '商品研报',
    date: '2026-04-10',
    readTime: '15 min',
    image: '/images/reports/mining-strategy.png',
    slug: 'copper-cycle-map',
    hasContent: true
  },
  {
    id: 'SCC-2026-156',
    title: '2026 全球矿业巨头大博弈',
    description: '从算法到原子的跨代竞争：解析必和必拓、紫金矿业等巨头在全球资源民族主义背景下的地缘抉择。',
    tag: '商品研报',
    date: '2026-04-10',
    readTime: '15 min',
    image: '/images/reports/mining-strategy.png',
    slug: 'mining-battle-2026',
    hasContent: true
  },
  {
    id: 'SCC-2026-003',
    title: '重塑版图：全球矿业巨头的 2026 战略大博弈',
    description: '本文深入解析必和必拓、紫金矿业等巨头在全球资源民族主义抬头背景下的地缘政治抉择与协同逻辑。',
    tag: '商品研报',
    date: '2026-03-28',
    readTime: '25 min',
    image: '/images/reports/mining-strategy.png',
    slug: 'mining-2026',
    hasContent: true
  },
  {
    id: 'SCC-2026-005',
    title: '硅基时代的能源锚点：核聚变商用化的路径演进',
    description: '解析超导材料需求与清洁能源最终方案，探讨 ITER 之后的可持续能源路径。',
    tag: 'AI × 供应链',
    date: '2026-04-05',
    readTime: '15 min',
    image: '/images/reports/fusion-energy.png',
    slug: 'fusion-energy',
    hasContent: false
  },
  {
    id: 'SCC-2026-004',
    title: '精炼铜周期：从智利矿区到高性能算力心脏',
    description: '深度探讨算力需求爆发与矿产瓶颈的共振逻辑，分析 AI 算力中心对铜消费强度的结构性改变。',
    tag: '商品研报',
    date: '2026-04-01',
    readTime: '12 min',
    image: '/images/reports/copper-supply.png',
    slug: 'copper-gap',
    hasContent: false
  },
  {
    id: 'SCC-2026-006',
    title: '稀土永磁：低空经济爆发下的供应链安全底座',
    description: 'EVTOL 核心电机对高性能钕铁硼的消耗强度测算。',
    tag: '商品研报',
    date: '2026-04-04',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800',
    slug: 'ree-low-altitude',
    hasContent: false
  },
  {
    id: 'SCC-2026-007',
    title: '氢能重卡：长三角化工副产氢的消纳逻辑',
    description: '燃料电池生命周期成本(TCO)与传统柴油车的平衡拐点。',
    tag: '商品研报',
    date: '2026-04-03',
    readTime: '18 min',
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800',
    slug: 'hydrogen-truck',
    hasContent: false
  },
  {
    id: 'SCC-2026-008',
    title: '印度钢铁崛起：铁矿石长协价的定价权东移',
    description: '从基建周期看印度作为全球下一个粗钢增长极的潜力。',
    tag: '商品研报',
    date: '2026-04-02',
    readTime: '22 min',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800',
    slug: 'india-steel',
    hasContent: false
  },
  {
    id: 'SCC-2026-009',
    title: '欧洲电池法案：再生金属强制比例对回收市场的重塑',
    description: '废旧锂电回收中的镍钴锰闭环体系实战分析。',
    tag: '商品研报',
    date: '2026-04-01',
    readTime: '14 min',
    image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?q=80&w=800',
    slug: 'europe-battery-act',
    hasContent: false
  },
  {
    id: 'SCC-2026-010',
    title: '数字化转型：AI 如何重构大宗商品交易台',
    description: '算法驱动的库存管理与情绪分析系统实战。',
    tag: '跨界实验',
    date: '2026-03-31',
    readTime: '20 min',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=800',
    slug: 'ai-trading',
    hasContent: false
  },
  // --- 自动补齐其余 90 篇 ---
  ...Array.from({ length: 90 }).map((_, i) => ({
    id: `SCC-2026-${String(11 + i).padStart(3, '0')}`,
    title: `深度专题 ${11 + i}：大宗商品供应链风险校准`,
    description: '本系列专题旨在通过对全球核心资源节点的实时监测，提供具有实战价值的供应链风险预警逻辑。',
    tag: (['商品研报', '交易员笔记', '矿业与产业链', 'AI × 供应链', '跨界实验'][i % 5]) as Report['tag'],
    date: '2026-03-20',
    readTime: '10 min',
    image: `https://images.unsplash.com/photo-${1500000000000 + i}?q=80&w=800&auto=format&fit=crop`,
    slug: `placeholder-topic-${i}`,
    hasContent: false
  }))
];
