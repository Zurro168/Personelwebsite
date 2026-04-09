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
    id: 'SCC-2026-889',
    title: '深度解析‘看对行情却赚不到钱’的盈亏悖论与破局之道 网页代码',
    description: '自动同步的深度研究报告',
    tag: '..\03_Archives\交易员笔记',
    date: '2026-04-09',
    readTime: '5 min',
    image: '/images/reports/mining-strategy.png',
    slug: 'profit-loss-paradox',
    hasContent: true
  },
  {
    id: 'SCC-2026-163',
    title: '跨越鸿沟：为什么你赢了判断，却输了账户？',
    description: '自动同步的深度研究报告',
    tag: '..\03_Archives\交易员笔记',
    date: '2026-04-09',
    readTime: '5 min',
    image: '/images/reports/mining-strategy.png',
    slug: 'Crossing-the-Cognitive-Gap',
    hasContent: true
  },
  {
    id: 'SCC-2026-868',
    title: '硅基大宗周期地图：铜 (Copper)',
    description: '正从过热期向结构性修正期过渡。全球高库存及宏观经济压力暂时抵消了人工智能（AI）和能源转型的长期需求。',
    tag: '有色金属',
    date: '2026-04-09',
    readTime: '15 min',
    image: '/images/reports/mining-strategy.png',
    slug: 'copper-cycle-map',
    hasContent: true
  },
  {
    id: 'SCC-2026-137',
    title: '2026 全球矿业巨头大博弈',
    description: '从算法到原子的跨代竞争：解析必和必拓、紫金矿业等巨头在全球资源民族主义背景下的地缘抉择。',
    tag: '宏观研报',
    date: '2026-04-09',
    readTime: '15 min',
    image: '/images/reports/mining-strategy.png',
    slug: 'mining-battle-2026',
    hasContent: true
  },
  {
    id: 'SCC-2026-003',
    title: '重塑版图：全球矿业巨头的 2026 战略大博弈',
    description: '本文深入解析必和必拓、紫金矿业等巨头在全球资源民族主义抬头背景下的地缘政治抉择与协同逻辑。',
    tag: '宏观周期',
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
    tag: '有色金属',
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
    tag: '有色金属',
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
    tag: '能源化工',
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
    tag: '黑色金属',
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
    tag: '电池金属',
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
    tag: (['宏观研究', '有色金属', '能源化工', '电池金属', '黑色金属', '跨界实验'][i % 6]) as Report['tag'],
    date: '2026-03-20',
    readTime: '10 min',
    image: `https://images.unsplash.com/photo-${1500000000000 + i}?q=80&w=800&auto=format&fit=crop`,
    slug: `placeholder-topic-${i}`,
    hasContent: false
  }))
];
