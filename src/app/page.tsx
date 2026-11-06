'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Rss,
  Terminal,
  Clock,
  Compass,
  FileText,
  Boxes,
  Workflow,
  ShieldCheck
} from 'lucide-react';
import { AUTHOR_INFO } from '@/data/biography';
import { ALL_REPORTS } from '@/data/reports';
import PriceTicker from '@/components/layout/PriceTicker';

/**
 * 核心金属周期雷达前哨数据 (4 大战略矿种实时快照)
 * 与 cycle-map 保持底层指标一致，首页即刻渲染
 */
const SNAPSHOT_COMMODITIES = [
  {
    name: '海绵钛 (Titanium)',
    slug: 'titanium',
    symbol: 'TI',
    score: 88,
    status: '防务扩张 / 航空级强劲',
    trend: 'up' as const,
    changeText: '+18.4% 溢价走强',
    cyclePhase: '上升扩张期 (Stage 1)',
    badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    barColor: 'bg-emerald-400',
    focus: '航空发动机 · 结构强韧 · 纯度壁垒'
  },
  {
    name: '海绵锆 (Zirconium)',
    slug: 'zirconium',
    symbol: 'ZR',
    score: 72,
    status: '供应受限 / 订单刚性',
    trend: 'up' as const,
    changeText: '+6.2% 刚性锁定',
    cyclePhase: '紧平衡阶段 (Stage 2)',
    badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    barColor: 'bg-cyan-400',
    focus: '核电涂层 · 澳洲精矿 · 特种陶瓷'
  },
  {
    name: '精炼铜 (Copper)',
    slug: 'copper',
    symbol: 'HG=F',
    score: 58,
    status: '高库存修正 / 算力分化',
    trend: 'neutral' as const,
    changeText: '-1.24% 高位整固',
    cyclePhase: '库存再平衡 (Stage 3)',
    badgeColor: 'text-brand-gold border-amber-500/30 bg-amber-500/10',
    barColor: 'bg-amber-400',
    focus: 'AI 算力电网 · 绿色转型 · 100万吨显性库存'
  },
  {
    name: '碳酸锂 (Lithium)',
    slug: 'lithium',
    symbol: 'LI',
    score: 38,
    status: '社会库存去化 / 探底出清',
    trend: 'down' as const,
    changeText: '-24.5% 成本博弈',
    cyclePhase: '产能出清期 (Stage 4)',
    badgeColor: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
    barColor: 'bg-rose-400',
    focus: '电池级锂盐 · 边际成本关停 · 储能放量'
  }
];

export default function Home() {
  const [commodities, setCommodities] = React.useState(
    SNAPSHOT_COMMODITIES.map((item) => ({ ...item, isLive: false, scoreDelta: 0 }))
  );

  React.useEffect(() => {
    async function syncCommodityLinkages() {
      try {
        const res = await fetch(`/api/commodities?_t=${Date.now()}`, { 
          cache: 'no-store',
          headers: {
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache'
          }
        });
        if (res.ok) {
          const liveData = await res.json();
          if (Array.isArray(liveData)) {
            setCommodities((prev) =>
              prev.map((item) => {
                const live = liveData.find((l: { slug: string }) => l.slug === item.slug);
                if (!live) return item;
                return {
                  ...item,
                  score: live.liveScore,
                  status: live.liveStatus,
                  trend: live.trend,
                  changeText: `${live.deltaFormatted} 市场联动`,
                  isLive: live.isLive,
                  scoreDelta: live.scoreDelta,
                };
              })
            );
          }
        }
      } catch {
        // 维持静默降级
      }
    }
    syncCommodityLinkages();
  }, []);

  // 精选前 4 篇最具代表性的智库研报（或带真实封面的优先排布）
  const featuredReports = React.useMemo(() => {
    // 优先选取代表作：AI Agent、美元周期、战略金属、交易能力
    const prioritySlugs = [
      'ai-agent-procurement-2026',
      'dollar-cycle-and-commodity-gravity-2026',
      'strategic-metals-analysis-2026',
      'trader-core-competency-2026'
    ];

    const picked = prioritySlugs
      .map(slug => ALL_REPORTS.find(r => r.slug === slug))
      .filter((r): r is (typeof ALL_REPORTS)[0] => Boolean(r));

    // 如果未满 4 篇，用最新的补足
    if (picked.length < 4) {
      const remaining = ALL_REPORTS.filter(r => !picked.some(p => p.id === r.id));
      return [...picked, ...remaining.slice(0, 4 - picked.length)];
    }
    return picked.slice(0, 4);
  }, []);

  return (
    <div className="relative overflow-x-hidden bg-[#0a0f1a] text-slate-200 min-h-screen selection:bg-cyan-500/30 selection:text-white">
      {/* 顶部环境光晕 (Ambient Glow) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[700px] bg-cyan-500/[0.04] blur-[140px] rounded-full pointer-events-none"></div>

      {/* 0. 实时大宗商品行情走马灯 */}
      <div className="border-b border-white/5 bg-[#0a0f1a]/80 backdrop-blur-md sticky top-[61px] z-30">
        <PriceTicker />
      </div>

      <main className="relative z-10 space-y-24 md:space-y-36 pb-32">
        {/* 1. HERO 指挥中心控制台 (Hero Command Terminal) */}
        <section id="hero" className="relative pt-12 md:pt-20">
          <div className="max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-[1.15fr_0.85fr] items-center gap-12 lg:gap-16">
            
            {/* 左侧：核心品牌叙事与行动号召 */}
            <div className="flex flex-col space-y-8">
              {/* 系统状态胶囊 */}
              <div className="inline-flex items-center gap-3 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full w-fit">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
                <span className="text-[10px] font-black text-cyan-300 tracking-[0.3em] uppercase font-mono">
                  SILICON COMMODITY // TERMINAL V3.0
                </span>
                <span className="text-white/20 font-mono text-[10px]">|</span>
                <span className="text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
                  ● NODE ACTIVE
                </span>
              </div>

              {/* 核心 Slogan */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tighter text-white">
                  贸易的终局 <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-cyan-400 bg-[length:200%_auto] animate-gradient italic">
                    算法的起点
                  </span>
                </h1>
                <div className="h-0.5 w-36 bg-gradient-to-r from-cyan-400 via-cyan-400/40 to-transparent"></div>
              </div>

              {/* 主理人立论与主旨 */}
              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-light border-l-2 border-cyan-500/40 pl-4 italic">
                {AUTHOR_INFO.motto}
              </p>

              {/* 核心操作按钮矩阵 */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/cycle-map"
                  className="px-7 py-3.5 bg-cyan-500 text-slate-950 font-black text-xs tracking-widest rounded hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] transition-all flex items-center gap-2 group"
                >
                  <Compass size={16} /> 金属周期地图
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/portfolio"
                  className="px-7 py-3.5 border border-white/10 hover:border-cyan-400/40 text-white font-black text-xs tracking-widest rounded hover:bg-white/5 transition-all flex items-center gap-2"
                >
                  <FileText size={16} className="text-cyan-400" /> 进入研报智库
                </Link>

                <Link
                  href="/intersection/gcts"
                  className="px-7 py-3.5 border border-purple-500/30 hover:border-purple-400 text-purple-300 font-black text-xs tracking-widest rounded hover:bg-purple-500/10 transition-all flex items-center gap-2"
                >
                  <Workflow size={16} className="text-purple-400" /> GCTS 决策系统
                </Link>
              </div>

              {/* 关键信誉证据栏 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/5">
                <div>
                  <div className="text-2xl font-black text-white font-mono">20+ 年</div>
                  <div className="text-[11px] text-slate-500 font-mono">实体矿冶与贸易</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-cyan-400 font-mono">3 亿美元</div>
                  <div className="text-[11px] text-slate-500 font-mono">海外直采供应链</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-400 font-mono">20+ 篇</div>
                  <div className="text-[11px] text-slate-500 font-mono">原创深度研报</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-purple-400 font-mono">100%</div>
                  <div className="text-[11px] text-slate-500 font-mono">物理对账稽核</div>
                </div>
              </div>
            </div>

            {/* 右侧：实时态势监控视窗 (Live Telemetry Monitor) */}
            <div className="relative">
              {/* 控制台外壳 */}
              <div className="relative bg-slate-900/60 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
                
                {/* 视窗标题栏 */}
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2.5">
                    <Terminal size={15} className="text-cyan-400" />
                    <span className="text-[11px] font-mono font-bold text-white tracking-widest uppercase">
                      SYSTEM MONITOR // 核心态势巡检
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-400 text-[10px] font-mono font-bold animate-pulse">
                    LIVE FEED
                  </span>
                </div>

                {/* 算法认知核心引语 */}
                <p className="text-xs text-slate-400 leading-relaxed font-mono italic border-l-2 border-cyan-400/30 pl-3">
                  &ldquo;Mapping global commodity cycles through the lens of algorithmic entropy — calculating price-to-sentiment correlations in real-time.&rdquo;
                </p>

                {/* 四大关键战略金属快照条 */}
                <div className="space-y-3 pt-2">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      战略金属高频联动
                    </span>
                    <span>CONFIDENCE INDEX</span>
                  </div>

                  {commodities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/cycle-map/${c.slug}`}
                      className="group/item flex items-center justify-between p-3 rounded-lg bg-black/25 border border-white/5 hover:border-cyan-400/30 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-black text-white group-hover/item:text-cyan-400 transition-colors">
                          {c.symbol}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-slate-200">{c.name.split(' ')[0]}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{c.cyclePhase}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-black font-mono text-white flex items-center justify-end gap-1">
                            {c.score}<span className="text-[10px] text-slate-500">/100</span>
                            {c.scoreDelta !== 0 && (
                              <span className={`text-[9px] font-bold ${c.scoreDelta > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                ({c.scoreDelta > 0 ? `+${c.scoreDelta}` : c.scoreDelta})
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400">{c.changeText}</div>
                        </div>
                        <ArrowUpRight size={14} className="text-slate-600 group-hover/item:text-cyan-400 transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>

                {/* 底部活跃状态 */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[10px] font-mono text-slate-500">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    ENGINE: SI-V3.0 HYBRID
                  </span>
                  <span>LATENCY: &lt;18ms</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 2. 核心战略金属周期雷达前哨 (Cycle Radar Matrix) */}
        <section id="cycle-matrix" className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-[10px] tracking-[0.3em] uppercase font-bold">
                <Compass size={14} /> Global Metals Cycle Radar
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                金属周期地图 <span className="text-cyan-400 font-light italic">/ 核心矩阵</span>
              </h2>
              <p className="text-sm text-slate-400 font-light max-w-2xl leading-relaxed">
                独创“硅基定价模型”，实时拟合宏观流动性、实物显性库存、能源成本约束与终端算力需求的相互作用力。
              </p>
            </div>

            <Link
              href="/cycle-map"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 tracking-wider uppercase group"
            >
              进入全景周期控制台
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 4 大战略金属卡片网格 */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {commodities.map((item) => (
              <Link
                key={item.slug}
                href={`/cycle-map/${item.slug}`}
                className="group relative p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:bg-slate-900/70 shadow-lg"
              >
                {/* 边角科技感指示线条 */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/[0.03] group-hover:bg-cyan-500/[0.08] transition-all rounded-bl-full pointer-events-none"></div>

                <div className="space-y-6">
                  {/* 头部：代码与评分 */}
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                          TICKER: {item.symbol}
                        </span>
                        {item.scoreDelta !== 0 && (
                          <span className={`text-[9px] font-mono px-1 rounded ${item.scoreDelta > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                            {item.scoreDelta > 0 ? `+${item.scoreDelta}` : item.scoreDelta}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors">
                        {item.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black font-mono text-white tracking-tight">
                        {item.score}
                      </div>
                      <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                        Confidence
                      </div>
                    </div>
                  </div>

                  {/* 状态徽标与进度条 */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold font-mono ${item.badgeColor}`}>
                        {item.status}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {item.changeText}
                      </span>
                    </div>

                    {/* 置信度进度条 */}
                    <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.barColor} transition-all duration-1000`}
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* 核心关注点标签 */}
                  <p className="text-xs text-slate-400 leading-relaxed font-light line-clamp-2">
                    {item.focus}
                  </p>
                </div>

                {/* 底部直达链接 */}
                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500 uppercase">{item.cyclePhase}</span>
                  <span className="text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    VIEW NODE →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. 旗舰数字化资产：GCTS 决策操作系统展台 (Flagship Asset Showcase) */}
        <section id="gcts-showcase" className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-[#101728] via-slate-900/60 to-[#141226] border border-purple-500/20 relative overflow-hidden shadow-2xl backdrop-blur-xl">
            {/* 背景科技光效 */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 blur-[100px] pointer-events-none"></div>

            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center relative z-10">
              <div className="space-y-8">
                {/* 旗舰资产标签 */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[10px] font-bold tracking-widest rounded-lg font-mono uppercase">
                    FLAGSHIP DIGITAL ASSET
                  </span>
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold tracking-widest rounded-lg font-mono uppercase">
                    FINTECH OS LIVE
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">EXP-GCTS-V0.1</span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-3xl sm:text-5xl font-black text-white italic tracking-tight leading-tight">
                    GCTS 关键矿产智能报价 <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-cyan-400">
                      与多式联运决策系统
                    </span>
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl">
                    大宗商品贸易的盈利核心是对物理物流、海关关税与汇率波动的极限把控。GCTS 打通了 EXW / FOB 联动报价、100% 对账物理 Excel 下载、多式联运走廊运费自动拟合与雨季红线风控拦截。
                  </p>
                </div>

                {/* 三大算法内核标签 */}
                <div className="grid sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <div className="text-xs font-mono font-bold text-purple-300">#01 多式联运倒算</div>
                    <p className="text-[11px] text-slate-400">乍得北部 Mongo 至喀麦隆 750km 复杂走廊分段拆解与倒算。</p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <div className="text-xs font-mono font-bold text-amber-300">#02 100% 物理对账</div>
                    <p className="text-[11px] text-slate-400">前端计算与后端脱机 Excel 报表公式百分百严格对齐。</p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <div className="text-xs font-mono font-bold text-emerald-300">#03 红线风控预警</div>
                    <p className="text-[11px] text-slate-400">7.15-10.15 雨季阻断与地缘异动 Go / No-Go 实时拦截。</p>
                  </div>
                </div>

                {/* 启动与进入入口 */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link
                    href="/intersection/gcts"
                    className="px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-black text-xs tracking-widest rounded-xl hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all flex items-center gap-2 group"
                  >
                    启动 GCTS 体验舱
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href="/gcts/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 border border-white/10 hover:border-purple-400/40 text-slate-300 hover:text-white font-black text-xs tracking-widest rounded-xl hover:bg-white/5 transition-all flex items-center gap-2"
                  >
                    全屏独立控制台 <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* 右侧：精巧模拟窗口 UI */}
              <div className="relative rounded-2xl border border-white/10 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-md space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="ml-2 text-[10px] font-mono text-slate-400">GCTS_Decision_Center_Live</span>
                  </div>
                  <span className="text-[10px] font-mono text-purple-400 font-bold">CASE 001 // CHAD-SB</span>
                </div>

                <div className="space-y-4 text-xs font-mono">
                  <div className="flex justify-between items-center p-3 rounded bg-white/5 border border-white/5">
                    <span className="text-slate-400">评估标的 / Target</span>
                    <span className="text-white font-bold">乍得高品位锑矿 (52% Sb)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded bg-white/5 border border-white/5">
                    <span className="text-slate-400">陆港换装 / Corridor</span>
                    <span className="text-cyan-400 font-bold">Ngaoundéré → Douala 港</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded bg-white/5 border border-white/5">
                    <span className="text-slate-400">对账下载 / Excel Sync</span>
                    <span className="text-emerald-400 font-bold">4 套标准金融对账模板</span>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <Link
                    href="/intersection/gcts"
                    className="text-[11px] text-purple-400 hover:text-purple-300 font-mono tracking-widest underline underline-offset-4"
                  >
                    EXPLORE LIVE INTERACTIVE DEMO →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. 最新重磅智库研报 (Latest Intelligence Dispatches) */}
        <section id="latest-reports" className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-[10px] tracking-[0.3em] uppercase font-bold">
                <FileText size={14} /> Authoritative Research Archive
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                最新深度智库研报 <span className="text-cyan-400 font-light italic">/ Dispatches</span>
              </h2>
              <p className="text-sm text-slate-400 font-light max-w-2xl leading-relaxed">
                全站已收录 {ALL_REPORTS.length} 篇产业级研报。坚持以第一性原理拆解宏观周期、地缘政治与实物供需裂口。
              </p>
            </div>

            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 tracking-wider uppercase group"
            >
              浏览全部 {ALL_REPORTS.length} 篇研报
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 研报卡片网格 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredReports.map((report) => (
              <article
                key={report.id}
                className="group flex flex-col justify-between p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-cyan-400/30 transition-all duration-300 hover:bg-slate-900/80"
              >
                <div className="space-y-4">
                  {/* 研报封面预览 */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/5 bg-slate-950">
                    <Link href={`/portfolio/${report.slug}`} className="block w-full h-full">
                      <img
                        src={report.image}
                        alt={report.title}
                        loading="lazy"
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                    </Link>
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-cyan-400/30 text-cyan-300 text-[9px] font-mono font-black uppercase tracking-wider">
                        {report.tag}
                      </span>
                    </div>
                  </div>

                  {/* 元数据 */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Clock size={11} /> {report.readTime}
                    </span>
                    <span>{report.date}</span>
                  </div>

                  {/* 标题 */}
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug line-clamp-2">
                    <Link href={`/portfolio/${report.slug}`}>{report.title}</Link>
                  </h3>

                  {/* 摘要 */}
                  <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-3">
                    {report.description}
                  </p>
                </div>

                {/* 底部链接 */}
                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-600">#{report.id}</span>
                  <Link
                    href={`/portfolio/${report.slug}`}
                    className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    READ INSIGHT →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* 特别推荐：十大矿业巨头战略博弈交互页 */}
          <div className="mt-8 p-6 rounded-2xl bg-slate-900/30 border border-white/5 hover:border-cyan-500/20 transition-all flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                <Boxes size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">特别可视化大屏：2026 全球十大矿业巨头战略大博弈</h4>
                <p className="text-xs text-slate-400 font-light mt-0.5">必和必拓、紫金矿业、嘉能可三大阵营雷达图与宏观 Capex 资本开支全景对峙。</p>
              </div>
            </div>
            <Link
              href="/portfolio/mining-2026"
              className="px-5 py-2.5 bg-white/5 hover:bg-cyan-500 hover:text-slate-950 border border-white/10 text-xs font-mono font-bold tracking-wider rounded-lg transition-all shrink-0"
            >
              启动博弈大屏 →
            </Link>
          </div>
        </section>

        {/* 5. 主理人实业背书与数字身份矩阵 (Author Identity & Connect Matrix) */}
        <section id="connect" className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="space-y-4 max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black text-cyan-300 tracking-widest uppercase font-mono">
                Authoritative Credentials
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter leading-tight">
              硅基逻辑下的 <br />
              <span className="text-cyan-400 italic">实业共鸣与合作</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
              本站为主理人研究与实操体系的数字化载体。若需深度矿产供应链合作、可行性论证、研报授权或金融风控探讨，请通过以下矩阵联系。
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* 左侧：主理人实业履历卡片 */}
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/50 border border-white/10 relative overflow-hidden shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-6 mb-8 relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-600 to-cyan-400 p-0.5 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                  <div className="w-full h-full bg-[#0a0f1a] rounded-[14px] flex items-center justify-center text-cyan-400">
                    <ShieldCheck size={36} />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white leading-none mb-2">{AUTHOR_INFO.name}</h3>
                  <p className="text-cyan-400/80 font-mono text-xs tracking-wider">{AUTHOR_INFO.job_title}</p>
                  <p className="text-[11px] text-slate-500 font-mono mt-1">{AUTHOR_INFO.location}</p>
                </div>
              </div>

              {/* 核心专注领域 */}
              <div className="space-y-3 mb-8">
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                  核心业务战壕 / Operational Focus
                </div>
                <div className="grid gap-2">
                  {AUTHOR_INFO.focus.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between text-xs font-mono"
                    >
                      <span className="text-slate-300">{item}</span>
                      <span className="text-cyan-400">● 核心实操</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 核心战绩数据 */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {AUTHOR_INFO.highlights.map((h, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-black/30 border border-white/5">
                    <div className="text-lg font-black text-cyan-400 font-mono">{h.value}</div>
                    <div className="text-[11px] text-slate-400 mt-1">{h.label}</div>
                  </div>
                ))}
              </div>

              {/* 查看完整履历按钮 */}
              <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                <div className="text-[11px] text-slate-500 font-mono">
                  支持一键导出标准 PDF 简历
                </div>
                <Link
                  href="/about"
                  className="px-5 py-2.5 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/30 text-xs font-mono font-bold tracking-wider rounded-lg transition-all flex items-center gap-1.5"
                >
                  查看完整实业履历 →
                </Link>
              </div>
            </div>

            {/* 右侧：社交与合作矩阵 */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* 微信公众号 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/30 transition-all group relative overflow-hidden shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                      <Rss size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-black text-white block uppercase tracking-tight">
                        {AUTHOR_INFO.social.officialAccount.label}
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">
                        PUBLIC INTEL FEED
                      </span>
                    </div>
                  </div>

                  <div className="aspect-square bg-white rounded-2xl overflow-hidden p-3 group-hover:scale-[1.02] transition-all duration-300 shadow-md">
                    <Image
                      src={AUTHOR_INFO.social.officialAccount.qrCode}
                      alt="硅基大宗公众号二维码"
                      width={280}
                      height={280}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>

                <p className="mt-6 text-center text-[10px] text-slate-400 font-mono bg-white/5 py-2 rounded-xl border border-white/5 uppercase tracking-widest">
                  微信扫码关注 @{AUTHOR_INFO.social.officialAccount.name}
                </p>
              </div>

              {/* 商务与专业社交链接 */}
              <div className="flex flex-col gap-4">
                {/* 电子邮箱 */}
                <a
                  href={`mailto:${AUTHOR_INFO.email}`}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/30 transition-all hover:bg-slate-800/80 flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                      BUSINESS INQUIRIES
                    </span>
                    <span className="text-xs text-cyan-400 font-mono">{AUTHOR_INFO.email}</span>
                  </div>
                  <ArrowRight size={14} className="text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </a>

                {/* LinkedIn */}
                <a
                  href={AUTHOR_INFO.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-blue-500/30 transition-all hover:bg-slate-800/80 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-white uppercase tracking-wide">LinkedIn</span>
                      <span className="text-[10px] text-slate-500 font-mono">PROFESSIONAL GRAPH</span>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </a>

                {/* Twitter / X */}
                <a
                  href={AUTHOR_INFO.social.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-white/30 transition-all hover:bg-slate-800/80 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-white uppercase tracking-wide">Twitter / X</span>
                      <span className="text-[10px] text-slate-500 font-mono">GLOBAL SIGNALS</span>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </a>

                {/* 实时系统运行日志卡片 */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400/80 uppercase tracking-wider">
                    <span>AUDIT FEED</span>
                    <span className="text-emerald-400">● LIVE</span>
                  </div>
                  <div className="space-y-1 text-[10px] font-mono text-slate-400 lowercase">
                    {AUTHOR_INFO.systemLogs.slice(0, 3).map((log) => (
                      <div key={log.id} className="flex justify-between">
                        <span className="truncate">&gt; {log.text}</span>
                        <span className="text-cyan-400 ml-2 uppercase font-bold">{log.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
