'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Activity, Zap, TrendingUp, TrendingDown, RefreshCw, Loader2, Radio } from 'lucide-react';
import { resolveCommodity, type UnifiedCommodityData } from '@/lib/price-adapter';

// --- Commodity Metadata ---
const COMMODITIES_META = [
  {
    name: '精炼铜 (Copper)',
    symbol: 'HG=F',
    slug: 'copper',
    description: '核心观察点：LME/SHFE 库存历史低位与算力基建的结构性需求背离。',
    labels: ['库存紧缺', '能源转型', '算力溢价']
  },
  {
    name: '海绵锆 (Zirconium)',
    symbol: 'ZR',
    slug: 'zirconium',
    description: '核心观察点：澳洲精矿供应动态与全球陶瓷、核电涂层的订单反馈。',
    labels: ['精矿供应', '核电材料', '陶瓷基建']
  },
  {
    name: '海绵钛 (Titanium)',
    symbol: 'TI',
    slug: 'titanium',
    description: '核心观察点：民航大飞机复苏对高端钛合金零件的长期拉动效应。',
    labels: ['航空工业', '海工装备', '结构强韧']
  },
  {
    name: '电池级碳酸锂 (Lithium)',
    symbol: 'LI',
    slug: 'lithium',
    description: '核心观察点：锂矿提锂成本线与下游电池厂商补库周期的拟合度。',
    labels: ['电池金属', '库存周期', '减产预期']
  }
];

type CommodityCard = (typeof COMMODITIES_META)[number] & Pick<UnifiedCommodityData, 'score' | 'status' | 'trend' | 'price' | 'change' | 'unit' | 'marketLinkage'>;

export default function CycleMapPortal() {
  const [commodities, setCommodities] = useState<CommodityCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('');

  const loadData = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) setIsRefreshing(true);
    try {
      const data = await Promise.all(
        COMMODITIES_META.map(async (meta) => {
          const resolved = await resolveCommodity(meta.slug);
          return {
            ...meta,
            name: resolved.name || meta.name,
            score: resolved.score,
            status: resolved.status,
            trend: resolved.trend,
            price: resolved.price,
            change: resolved.change,
            unit: resolved.unit,
            marketLinkage: resolved.marketLinkage
          };
        })
      );
      setCommodities(data);
      const now = new Date();
      setLastSyncTime(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`);
    } catch (err) {
      console.error("Failed to load commodities data:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    // 每 60 秒前台静默刷新一次，保持数据实效性
    const timer = setInterval(() => {
      loadData(false);
    }, 60000);
    return () => clearInterval(timer);
  }, [loadData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] text-white flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-brand-blue animate-spin mb-6" />
        <div className="text-xs uppercase font-black tracking-[0.3em] text-brand-blue italic animate-pulse">Establishing Secure Neural Link...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      <section id="header" className="max-w-7xl mx-auto px-8 pt-12 pb-6 space-y-4">
        {/* 实时高频联动状态横条 */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-black text-emerald-400 tracking-wider uppercase">
                实时高频行情联动中 (LIVE FEED)
              </span>
              <span className="text-white/20 font-mono text-xs">|</span>
              <span className="text-[11px] text-slate-400 font-mono">
                指数根据全球公开市场高频价格与动量最新变化动态校准
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            {lastSyncTime && (
              <span className="text-slate-400 text-[11px]">
                校准时间: <span className="text-white font-bold">{lastSyncTime}</span>
              </span>
            )}
            <button
              onClick={() => loadData(true)}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 rounded text-cyan-300 transition-all text-xs cursor-pointer disabled:opacity-50"
              title="点击获取最新行情并重新计算周期指数"
            >
              <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
              <span>{isRefreshing ? '同步中...' : '同步行情'}</span>
            </button>
          </div>
        </div>

        <div className="pt-2">
          <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter">
            金属周期地图 <span className="text-brand-blue">/</span> Cycle Map
          </h1>
          <p className="max-w-3xl text-slate-400 font-light text-xs leading-relaxed mt-2">
            基于独有的“硅基定价模型”，通过高频价格动量拟合大宗商品的基本面状态、宏观溢价与情绪指数，实时动态监测各品种的周期拐点。
          </p>
        </div>
      </section>

      {/* Grid List */}
      <main id="commodities" className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {commodities.map((item) => {
          const scoreDelta = item.marketLinkage?.scoreDelta ?? 0;
          const deltaFormatted = item.marketLinkage?.deltaFormatted ?? item.change;
          const isUp = (item.marketLinkage?.deltaPercent ?? 0) >= 0;

          return (
            <Link 
              key={item.slug} 
              href={`/cycle-map/${item.slug}`}
              className="group block bg-slate-900/30 border border-white/5 rounded-3xl p-10 hover:border-brand-blue/30 transition-all hover:bg-slate-900/50 relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className={`absolute top-0 right-0 w-28 h-28 blur-3xl opacity-5 group-hover:opacity-20 transition-all ${item.trend === 'up' ? 'bg-emerald-500' : item.trend === 'down' ? 'bg-rose-500' : 'bg-brand-blue'}`}></div>
              
              <div className="relative z-10 space-y-6">
                {/* 头部：名称、标的代码与评分 */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-3xl font-black text-white tracking-tight italic group-hover:text-brand-blue transition-colors">
                        {item.name}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/30 font-mono text-[10px] tracking-widest uppercase">{item.symbol} TICKER</span>
                      {item.marketLinkage && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                          <Radio size={9} className="animate-pulse" /> LIVE LINK
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-baseline justify-end gap-1">
                      <div className={`text-4xl font-black font-mono ${item.trend === 'up' ? 'text-emerald-400' : item.trend === 'down' ? 'text-rose-400' : 'text-brand-blue'}`}>
                        {item.score}
                      </div>
                      <span className="text-xs text-white/20">/100</span>
                    </div>

                    <div className="flex items-center justify-end gap-1.5 mt-1">
                      <div className="text-[10px] text-white/40 uppercase tracking-widest">Confidence</div>
                      {scoreDelta !== 0 && (
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                          scoreDelta > 0 
                            ? 'text-emerald-300 bg-emerald-500/10 border border-emerald-500/20' 
                            : 'text-rose-300 bg-rose-500/10 border border-rose-500/20'
                        }`}>
                          {scoreDelta > 0 ? `+${scoreDelta}` : scoreDelta} pt
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 市场行情联动信息条 */}
                <div className="p-3 rounded-xl bg-black/30 border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Activity size={12} className="text-brand-blue" />
                      高频行情: <span className="text-slate-200 font-bold">{item.marketLinkage?.tickerName || item.symbol}</span>
                    </span>
                    <span className={`font-bold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {deltaFormatted}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>
                      参考基准: {item.marketLinkage?.ticker || item.symbol} {item.marketLinkage ? `$${item.marketLinkage.tickerPrice.toFixed(2)}` : ''}
                    </span>
                    <span>
                      模型估算: <strong className="text-slate-300">{item.price}</strong> {item.unit}
                    </span>
                  </div>
                </div>

                {/* 状态与观察点 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    {item.trend === 'up' ? (
                      <TrendingUp size={16} className="text-emerald-400 shrink-0" />
                    ) : item.trend === 'down' ? (
                      <TrendingDown size={16} className="text-rose-400 shrink-0" />
                    ) : (
                      <RefreshCw size={16} className="text-brand-blue shrink-0" />
                    )}
                    <span className="text-xs font-bold text-white tracking-widest uppercase">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* 标签 */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.labels.map((label: string) => (
                    <span key={label} className="px-3 py-1 bg-white/5 border border-white/5 rounded text-[10px] text-white/40 font-bold uppercase tracking-wider">
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}

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
      <footer className="max-w-7xl mx-auto px-8 mt-24 py-12 border-t border-white/5 flex flex-wrap justify-between items-center text-white/20 font-mono text-[10px] tracking-[0.2em]">
        <div className="flex gap-10">
          <span>HIGH-FREQ REFRESH: ACTIVE (60s)</span>
          <span>ENGINE: Si-V4.2 LIVE</span>
          <span>SOURCE: YAHOO FINANCE / COMEX / ASX</span>
        </div>
        <div className="flex items-center gap-2">
          <Activity size={12} className="text-emerald-400" />
          <span className="text-emerald-400 font-bold">REALTIME LINKAGE ENGAGED</span>
        </div>
      </footer>
    </div>
  );
}
