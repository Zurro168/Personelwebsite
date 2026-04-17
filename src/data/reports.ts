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
  isHtml?: boolean;
  isPinned?: boolean;
}

export const ALL_REPORTS: Report[] = [
  {
    id: 'SCC-2026-435',
    title: '主理人简历',
    description: '自动同步的深度研究报告',
    tag: '关于我们',
    date: '2026-04-13',
    readTime: '15 min',
    image: '/images/reports/mining-strategy.png',
    slug: 'about',
    hasContent: true
  },
  {
    id: 'SCC-2026-524',
    title: '第一线认知：中游加工企业的成本管控与管理哲学思考',
    description: '自动同步的深度研究报告',
    tag: '跨界实验',
    date: '2026-04-13',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1551288049-bbbda536ad80?q=80&w=800',
    slug: 'first-line-management-philosophy',
    hasContent: true,
    isPinned: false
  },
  {
    id: 'SCC-2026-291',
    title: '中医系统论：从脏腑平衡到大宗商品供给侧博弈的隐喻',
    description: '自动同步的深度研究报告',
    tag: '跨界实验',
    date: '2026-04-13',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc206e?q=80&w=800',
    slug: 'tcm-theory',
    hasContent: true,
    isPinned: false
  },
  {
    id: 'SCC-2026-672',
    title: '中医系统论：从脏腑平衡到大宗商品供给侧博弈的隐喻Html',
    description: '自动同步的深度研究报告',
    tag: '跨界实验',
    date: '2026-04-13',
    readTime: '5 min',
    image: '/images/reports/tcm-interactive.png',
    slug: 'tcm-interactive',
    hasContent: true,
    isPinned: false
  },
  {
    id: 'SCC-2026-736',
    title: 'AI 时代的信息生产：从碎片化搜索转向结构化知识合成',
    description: '自动同步的深度研究报告',
    tag: '跨界实验',
    date: '2026-04-13',
    readTime: '8min',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800',
    slug: 'ai-information-production',
    hasContent: true,
    isPinned: false
  },
  {
    id: 'SCC-2026-295',
    title: '2026 全球矿业巨头大博弈',
    description: '从算法到原子的跨代竞争：解析必和必拓、紫金矿业等巨头在全球资源民族主义背景下的地缘抉择。',
    tag: '宏观觉悟',
    date: '2026-04-13',
    readTime: '15 min',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200&auto=format&fit=crop',
    slug: 'global-mining-battle-2026',
    hasContent: true,
    isPinned: false
  },
  {
    id: 'SCC-2026-455',
    title: '加蓬锰矿出口政策变动背后的产业博弈与实操判断',
    description: '深度拆解加蓬锰矿产业地位、2029禁令细节及全球锰源替代实操预判。针对LMFP爆发背景下的供应链布局提供决策参考。',
    tag: '硬核商品',
    date: 'Fri Apr 17 2026 08:00:00 GMT+0800 (中国标准时间)',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200&auto=format&fit=crop',
    slug: 'gabon-manganese-export-ban-analysis',
    hasContent: true,
    isPinned: false
  },
  {
    id: 'SCC-2026-307',
    title: '2026年全球战略金属市场深度分析报告：锡、锆、钛的品类深化与产业链重构',
    description: '全景透视三大战略金属的供需红线，分析核能复兴、AI算力以及航空航天扩张带来的产业链重构机遇。',
    tag: '硬核商品',
    date: 'Fri Apr 17 2026 08:00:00 GMT+0800 (中国标准时间)',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200&auto=format&fit=crop',
    slug: '2026-strategic-metals-analysis-tin-zirconium-titanium',
    hasContent: true,
    isPinned: false
  },
  {
    id: 'SCC-2026-179',
    title: '美元周期与全球大宗商品的宏观引力：2026年铜金属性定价的系统性重构与风险对策报告',
    description: '深度解析美元指数与大宗商品价格的非线性相关性，探讨去美元化背景下定价权的碎片化趋势。',
    tag: '宏观觉悟',
    date: 'Fri Apr 17 2026 08:00:00 GMT+0800 (中国标准时间)',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200&auto=format&fit=crop',
    slug: 'dollar-cycle-and-commodity-gravity-2026',
    hasContent: true,
    isPinned: false
  },
  {
    "id": "SCC-2026-0",
    "title": "主理人简历",
    "description": "硅基大宗主理人：深耕大宗商品、AI Agent 与系统博弈的跨界观察者。",
    tag: '关于我们',
    "date": "2026-04-11",
    "readTime": "15 min",
    "image": "/images/reports/mining-strategy.png",
    "slug": "about",
    "hasContent": true
  },
  {
    "id": "SCC-2026-104",
    "title": "第一线认知：中游加工企业的成本管控与管理哲学思考",
    "description": "深入实地调研，探讨中游加工企业的工业系统论与管理博弈。",
    tag: '跨界实验',
    "date": "2026-04-11",
    "readTime": "10 min",
    "image": "/images/reports/mining-strategy.png",
    "slug": "first-line-management-philosophy",
    "hasContent": true
  },
  {
    "id": "SCC-2026-105",
    "title": "中医系统论：从脏腑平衡到大宗商品供给侧博弈的隐喻 (交互版)",
    "description": "集成 Chart.js 动态可视化，通过阴阳指数与五行雷达透视全球大宗商品周期平衡。",
    tag: '跨界实验',
    "date": "2026-04-11",
    "readTime": "15 min",
    "image": "/images/reports/mining-strategy.png",
    "slug": "tcm-interactive",
    "hasContent": true,
    "isHtml": true
  },
  {
    "id": "SCC-2026-106",
    "title": "中医系统论：从脏腑平衡到大宗商品供给侧博弈的隐喻 (理论版)",
    "description": "深度文字解析：将全球大宗市场视为人体脏腑，探讨供给侧博弈中的虚实寒热与经络流转。",
    tag: '跨界实验',
    "date": "2026-04-11",
    "readTime": "12 min",
    "image": "/images/reports/mining-strategy.png",
    "slug": "tcm-theory",
    "hasContent": true
  },
  {
    "id": "SCC-2026-107",
    "title": "AI 时代的信息生产：从碎片化搜索转向结构化知识合成",
    "description": "探讨在 AI Agent 时代，知识生产如何从“搜索”进化为“合成”。",
    tag: '跨界实验',
    "date": "2026-04-11",
    "readTime": "8min",
    "image": "/images/reports/mining-strategy.png",
    "slug": "ai-information-production",
    "hasContent": true
  },
  {
    "id": "SCC-2026-1",
    "title": "美元周期如何决定全球大宗价格",
    "description": "美元的‘潮汐’效应不仅定价货币，更决定了大宗商品价格波动的上限与地板。",
    tag: '宏观觉悟',
    "date": "2026-04-13",
    "readTime": "8 min",
    "image": "/images/reports/mining-strategy.png",
    "slug": "dollar-cycle-commodities-2026",
    "hasContent": true
  },
  {
    "id": "SCC-2026-11",
    "title": "加蓬锰矿出口关税调整预警背后的产业博弈",
    "description": "加蓬作为全球高品位锰矿的核心，其政策变动正重塑全球供应链权力天花板。",
    tag: '宏观觉悟',
    "date": "2026-04-11",
    "readTime": "12 min",
    "image": "/images/reports/mining-strategy.png",
    "slug": "gabon-manganese-2029",
    "hasContent": true
  },
  {
    "id": "SCC-2026-21",
    "title": "全球铜矿供给正在进入瓶颈吗",
    "description": "品位衰减与资本开支赤字，正将全球铜矿供给推向地质物理意义上的硬瓶颈。",
    tag: '硬核商品',
    "date": "2026-04-14",
    "readTime": "10 min",
    "image": "/images/reports/mining-strategy.png",
    "slug": "global-copper-supply-bottleneck",
    "hasContent": true
  },
  {
    "id": "SCC-2026-42",
    "title": "锌冶炼厂利润降至历史低位背后的产业博弈",
    "description": "能源成本占比突破45%，欧洲锌冶炼产能正面临非线性的出清压力。",
    tag: '硬核商品',
    "date": "2026-04-16",
    "readTime": "6 min",
    "image": "/images/reports/mining-strategy.png",
    "slug": "zinc-smelter-margins-critical",
    "hasContent": true
  },
  {
    "id": "SCC-2026-61",
    "title": "AI Agent 如何改变采购决策",
    "description": "从经验驱动到算法触发：AI Agent正全方位重塑大宗商品采购的时间周期与决策博弈。",
    tag: '硅基供应链',
    "date": "2026-04-15",
    "readTime": "11 min",
    "image": "/images/reports/mining-strategy.png",
    "slug": "ai-agent-procurement-revolution",
    "hasContent": true
  },
  {
    "id": "SCC-2026-41",
    "title": "重塑版图：全球十大矿业巨头 2026 战略大博弈",
    "description": "深度复盘 2024-2026 年矿业巨头的资本开支周期与资源民族主义博弈。",
    tag: '硬核商品',
    "date": "2026-04-10",
    "readTime": "5 min",
    "image": "/images/reports/mining-strategy.png",
    "slug": "global-mining-battle-2026",
    "hasContent": true
  },
  {
    id: 'SCC-2026-604',
    title: '深度解析‘看对行情却赚不到钱’的盈亏悖论与破局之道 网页代码',
    description: '自动同步的深度研究报告',
    tag: '交易员笔记',
    date: '2026-04-13',
    readTime: '5 min',
    image: '/images/reports/profit-loss-paradox.png',
    slug: 'profit-loss-paradox',
    hasContent: true,
    isPinned: false
  },
  {
    id: 'SCC-2026-702',
    title: '跨越鸿沟：为什么你赢了判断，却输了账户？',
    description: '自动同步的深度研究报告',
    tag: '交易员笔记',
    date: '2026-04-13',
    readTime: '5 min',
    image: '/images/reports/Crossing-the-Cognitive-Gap.png',
    slug: 'Crossing-the-Cognitive-Gap',
    hasContent: true,
    isPinned: false
  },
  {
    id: 'SCC-2026-411',
    title: '硅基大宗周期地图：铜 (Copper)',
    description: '正从过热期向结构性修正期过渡。全球高库存及宏观经济压力暂时抵消了人工智能（AI）和能源转型的长期需求。',
    tag: '硬核商品',
    date: '2026-04-10',
    readTime: '15 min',
    image: '/images/reports/mining-strategy.png',
    slug: 'copper-cycle-map',
    hasContent: true
  },
  {
    id: 'SCC-2026-611',
    title: '2026 全球矿业巨头大博弈',
    description: '从算法到原子的跨代竞争：解析必和必拓、紫金矿业等巨头在全球资源民族主义背景下的地缘抉择。',
    tag: '硬核商品',
    date: '2026-04-11',
    readTime: '15 min',
    image: '/images/reports/mining-strategy.png',
    slug: 'mining-battle-2026',
    hasContent: true
  },
  {
    id: 'SCC-2026-003',
    title: '重塑版图：全球矿业巨头的 2026 战略大博弈',
    description: '本文深入解析必和必拓、紫金矿业等巨头在全球资源民族主义抬头背景下的地缘政治抉择与协同逻辑。',
    tag: '硬核商品',
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
    tag: '硅基供应链',
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
    tag: '硬核商品',
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
    tag: '硬核商品',
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
    tag: '硬核商品',
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
    tag: '硬核商品',
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
    tag: '硬核商品',
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
  }
];
