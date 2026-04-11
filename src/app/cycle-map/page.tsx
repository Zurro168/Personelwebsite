'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, Zap, TrendingUp, TrendingDown } from 'lucide-react';
import TableOfContents from '@/components/TableOfContents';

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
    name: '锆 (Zirconium)',
    symbol: 'ZR',
    score: 64,
    status: '供应受限 / 需求平稳',
    slug: 'zirconium',
    trend: 'neutral',
    description: '核心观察点：澳洲精矿供应动态与全球陶瓷、核电涂层的订单反馈。',
    labels: ['精矿供应', '核电材料', '陶瓷基建']
  },
  {
    name: '钛 (Titanium)',
    symbol: 'TI',
    score: 71,
    status: '航空级需求强劲',
    slug: 'titanium',
    trend: 'up',
    description: '核心观察点：民航大飞机复苏对高端钛合金零件的长期拉动效应。',
    labels: ['航空工业', '海工装备', '结构强韧']
  },
  {
    name: '锂 (Lithium)',
    symbol: 'LI',
    score: 45,
    status: '库存出清 / 成本支撑',
    slug: 'lithium',
    trend: 'down',
    description: '核心观察点：锂矿提锂成本线与下游电池厂商补库周期的拟合度。',
    labels: ['电池金属', '库存周期', '减产预期']
  }
];

export default function CycleMapPortal() {
  return (
    <div className="min-h-screen bg-background">
      {/* Node-based Progress Tracker */}
      <TableOfContents content="" />

      <section id="header" className="max-w-7xl mx-auto px-8 py-12 space-y-4 lg:pr-96">
        <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter">
          金属周期地图 <span className="text-brand-blue">/</span> Circle Map
        </h1>
        <p className="max-w-2xl text-slate-500 font-light text-xs leading-relaxed">
          基于独有的“硅基定价模型”，通过高频数据拟合大宗商品的基本面状态、宏观溢价与情绪指数，实时监测各品类的周期拐点。
        </p>
      </section>

      {/* Grid List */}
      <main id="commodities" className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-10 lg:pr-96">
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
              <div className="text-white/30 font-black text-lg tracking-widest uppercase italic">Cobalt / Nickel / Rare Earth</div>
              <p className="text-white/10 text-[10px] uppercase tracking-[0.3em]">Initial Intelligence under processing</p>
           </div>
        </div>
      </main>

      {/* Data Footer */}
      <footer className="max-w-7xl mx-auto px-8 mt-24 py-12 border-t border-white/5 flex flex-wrap justify-between items-center text-white/20 font-mono text-[10px] tracking-[0.2em] lg:pr-96">
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
