'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, Zap, TrendingUp, TrendingDown, Layers } from 'lucide-react';

// --- Commodity Overview Data (Sync with your data/cycle-maps.ts) ---
const COMMODITIES = [
  {
    name: '精炼铜 (Copper)',
    symbol: 'HG=F',
    score: 82,
    status: '库存低位 / 需求爆发',
    slug: 'copper',
    trend: 'up',
    description: '核心观察点：LME/SHFE 库存历史低位与算力基建的结构性需求背离。',
    labels: ['库存紧缺', '能源转型', '算力溢价']
  },
  {
    name: '原油 (Crude Oil)',
    symbol: 'CL=F',
    score: 54,
    status: '供需弱平衡 / 地缘溢价',
    slug: 'crude-oil',
    trend: 'neutral',
    description: '核心观察点：OPEC+ 减产协议的执行力与非 OPEC 产油国增产的博弈。',
    labels: ['地缘政治', '宏观溢价', '炼厂检修']
  },
  {
    name: '黄金 (Gold)',
    symbol: 'GC=F',
    score: 78,
    status: '避险情绪 / 降息预期',
    slug: 'gold',
    trend: 'up',
    description: '核心观察点：全球央行增持趋势与美元信用体系的长期去全球化风险。',
    labels: ['避险资产', '货币替代', '宏观对冲']
  },
  {
    name: '铝 (Aluminum)',
    symbol: 'ALI=F',
    score: 42,
    status: '供给过剩 / 需求持平',
    slug: 'aluminum',
    trend: 'down',
    description: '核心观察点：电解铝产能红线与能源成本下降带来的成本端下移压力。',
    labels: ['电力成本', '减产预期', '轻量化']
  }
];

export default function CycleMapPortal() {
  return (
    <div className="min-h-screen bg-background p-8 md:p-12">
      {/* Header */}
      <section className="mb-20 max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-4 text-brand-blue">
          <Layers size={24} />
          <span className="text-[12px] font-black uppercase tracking-[0.4em] font-mono">Real-time Intelligence</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-[0.85]">
          金属周期地图 <br />
          <span className="text-brand-blue tracking-normal opacity-40">/ Circle Map</span>
        </h1>
        <p className="max-w-2xl text-slate-500 font-light text-lg leading-relaxed pt-4">
          基于独有的“硅基定价模型”，通过高频数据拟合大宗商品的基本面状态、宏观溢价与情绪指数，实时监测各品类的周期拐点。
        </p>
      </section>

      {/* Grid List */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {COMMODITIES.map((item) => (
          <Link 
            key={item.slug} 
            href={`/cycle-map/${item.slug}`}
            className="group block bg-slate-900/30 border border-white/5 rounded-3xl p-10 hover:border-brand-blue/30 transition-all hover:bg-slate-900/50 relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl opacity-5 group-hover:opacity-20 transition-all ${item.trend === 'up' ? 'bg-emerald-500' : item.trend === 'down' ? 'bg-rose-500' : 'bg-brand-blue'}`}></div>
            
            <div className="relative z-10 space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h2 className="text-3xl font-black text-white tracking-tight italic group-hover:text-brand-blue transition-colors">
                    {item.name}
                  </h2>
                  <span className="text-white/20 font-mono text-[10px] tracking-widest uppercase">{item.symbol} TICKER</span>
                </div>
                <div className="text-right">
                  <div className={`text-4xl font-black font-mono ${item.trend === 'up' ? 'text-emerald-400' : item.trend === 'down' ? 'text-rose-400' : 'text-brand-blue'}`}>
                    {item.score}
                    <span className="text-xs text-white/10 ml-1">/100</span>
                  </div>
                  <div className="text-[10px] text-white/30 uppercase mt-1 tracking-widest">Confidence</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {item.trend === 'up' ? <TrendingUp size={16} className="text-emerald-400" /> : <TrendingDown size={16} className="text-rose-400" />}
                  <span className="text-xs font-bold text-white tracking-widest uppercase">{item.status}</span>
                </div>
                <p className="text-slate-500 text-sm font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4">
                {item.labels.map(label => (
                  <span key={label} className="px-3 py-1 bg-white/5 border border-white/5 rounded text-[10px] text-white/40 font-bold uppercase tracking-wider">{label}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}

        {/* Coming Soon Card */}
        <div className="bg-slate-900/10 border border-dashed border-white/10 rounded-3xl p-10 flex flex-center flex-col justify-center items-center gap-4 text-center group">
           <Zap size={32} className="text-white/10 group-hover:text-brand-gold transition-colors" />
           <div className="space-y-1">
              <div className="text-white/30 font-black text-lg tracking-widest uppercase italic">Zirconium / Titanium / Lithium</div>
              <p className="text-white/10 text-[10px] uppercase tracking-[0.3em]">Initial Intelligence under processing</p>
           </div>
        </div>
      </main>

      {/* Data Footer */}
      <footer className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-wrap justify-between items-center text-white/20 font-mono text-[10px] tracking-[0.2em]">
        <div className="flex gap-10">
          <span>LATENCY: 1800s</span>
          <span>ENGINE: Si-V4.2</span>
          <span>SOURCE: YAHOO FINANCE / LME PRO</span>
        </div>
        <div className="flex items-center gap-2">
          <Activity size={12} className="text-brand-blue" />
          <span>DATA STREAM ACTIVE</span>
        </div>
      </footer>
    </div>
  );
}
