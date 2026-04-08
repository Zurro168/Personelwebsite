'use client';

import React, { use, useEffect, useState } from 'react';
import { ChevronRight, ShieldAlert, Activity, Loader2, Info } from 'lucide-react';
import Link from 'next/link';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { resolveCommodity, UnifiedCommodityData } from '@/lib/price-adapter';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function CycleMapDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [data, setData] = useState<UnifiedCommodityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await resolveCommodity(slug);
      setData(result);
      setLoading(false);
    }
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050507] text-white flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-blue animate-spin mb-4" />
        <div className="text-[10px] uppercase font-bold tracking-widest text-brand-blue italic animate-pulse">Syncing Cycle Data...</div>
      </div>
    );
  }

  if (!data) return null;

  const breadcrumbs = [
    { name: '金属周期地图', href: '/cycle-map' },
    { name: data.name, href: `/cycle-map/${slug}` }
  ];

  return (
    <div className="min-h-screen bg-[#050507] text-white font-sans selection:bg-brand-blue/30 pb-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 opacity-30 hover:opacity-100 transition-opacity">
           <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* --- 终端头部 (Terminal Header) --- */}
        <div className="bg-white/5 border border-white/5 p-8 rounded-sm mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse"></span>
                <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest italic">Live Statistics</span>
              </div>
              <h1 className="text-6xl font-black tracking-tighter italic uppercase">{data.name}</h1>
              <p className="mt-4 text-white/40 max-w-2xl text-sm leading-relaxed italic">{data.context}</p>
            </div>
            
            <div className="flex items-end gap-10">
              <div className="text-right">
                <div className="text-[10px] uppercase font-black text-white/20 mb-2 tracking-widest">Market Value</div>
                <div className="text-5xl font-black tracking-tighter tracking-tight">
                  {data.price} <span className="text-sm font-normal text-white/20 ml-1">{data.unit}</span>
                </div>
              </div>
              <div className={`px-4 py-2 text-sm font-black italic rounded-sm ${data.change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                {data.change}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* 周期评分卡片 (Score Card ported from HTML) */}
            <div className="p-8 bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-1 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
               <div className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-4 italic">Cycle Score</div>
               <div className="text-7xl font-black text-amber-500 italic drop-shadow-xl mb-1">{data.score}<span className="text-xl text-white/10 italic">/100</span></div>
               <div className="px-3 py-1 bg-amber-500/20 text-amber-500 text-[10px] font-black rounded-sm border border-amber-500/20 uppercase italic">警告: 周期修正</div>
            </div>

            {/* 维度逻辑拆解 (Dimension Analysis ported from HTML) */}
            <div className="md:col-span-3 p-8 bg-white/[0.02] border border-white/5">
                <h2 className="text-[10px] font-black text-brand-blue uppercase tracking-widest mb-6 italic flex items-center gap-2">
                    <Info size={12} /> Dimension Logic Breakdown
                </h2>
                <div className="h-32">
                    <Bar 
                        data={{
                            labels: ['宏观环境', '需求动能', '库存水位', '供应潜力'],
                            datasets: [{
                                data: data.dimensionScores,
                                backgroundColor: ['rgba(244,63,94,0.6)', 'rgba(52,211,153,0.6)', 'rgba(244,63,94,0.6)', 'rgba(245,158,11,0.6)'],
                                borderColor: ['#f43f5e', '#34d399', '#f43f5e', '#f59e0b'],
                                borderWidth: 1,
                                borderRadius: 2
                            }]
                        }}
                        options={{
                            indexAxis: 'y',
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false } },
                            scales: {
                                x: { grid: { display: false }, ticks: { color: 'rgba(255,255,255,0.2)', font: { size: 9, family: 'monospace' } } },
                                y: { grid: { display: false }, ticks: { color: 'rgba(255,255,255,0.6)', font: { size: 10 } } }
                            }
                        }}
                    />
                </div>
            </div>
          </div>
        </div>

        {/* --- 深度叙事层 (Narrative Layer) --- */}
        <div className="grid lg:grid-cols-3 gap-12 mb-12">
            <div className="lg:col-span-2 space-y-12">
                <div className="p-8 border border-white/5 bg-white/[0.012] rounded-sm">
                   <h2 className="text-[10px] font-black text-brand-blue uppercase tracking-widest mb-8 italic">Market Trend Analysis</h2>
                   <div className="h-80 w-full mb-10">
                      <Line 
                        data={{
                           labels: data.chartLabels,
                           datasets: [{
                              label: 'SPOT PRICE INDEX',
                              data: data.chartValues,
                              borderColor: '#3b82f6',
                              borderWidth: 2,
                              pointRadius: 4,
                              fill: true,
                              tension: 0.4,
                              backgroundColor: 'rgba(59, 130, 246, 0.05)'
                           }]
                        }}
                        options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }}
                      />
                   </div>
                   
                   <div className="space-y-10 border-t border-white/5 pt-10">
                      {data.narrative.map((item, idx) => (
                        <div key={idx}>
                           <h3 className="text-xl font-black mb-4 italic uppercase flex items-center gap-3">
                              <div className="w-1 h-4 bg-brand-blue"></div> {item.title}
                           </h3>
                           <p className="text-white/60 leading-relaxed text-sm font-light italic">{item.content}</p>
                        </div>
                      ))}
                   </div>
                </div>

                {/* --- 宏观周期定位 (Cycle Flow ported from HTML) --- */}
                <div className="p-10 bg-white/[0.012] border border-white/5 rounded-sm">
                    <h2 className="text-[10px] font-black text-brand-blue uppercase tracking-widest mb-10 italic text-center">Global Macro Cycle Positioning</h2>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {[
                            { emoji: '🌪️', label: '宏观环境', sub: '滞胀隐忧' },
                            { emoji: '⚡', label: '需求动能', sub: '核心刚性' },
                            { emoji: '📦', label: '库存水平', sub: '严重饱和' },
                            { emoji: '💲', label: '价格反应', sub: '横盘整理' },
                            { emoji: '⛏️', label: '供应周期', sub: '紧平衡' }
                        ].map((pos, idx) => (
                            <React.Fragment key={idx}>
                                <div className={`flex-1 p-4 border rounded-sm text-center transition-all relative ${idx === data.cyclePosition ? 'border-amber-500 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.2)] scale-110 z-10' : 'border-white/5 bg-white/[0.02] opacity-40'}`}>
                                    {idx === data.cyclePosition && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-900 text-[8px] font-black px-2 py-0.5 whitespace-nowrap italic animate-pulse">LATEST POSITION</div>
                                    )}
                                    <div className="text-2xl mb-2">{pos.emoji}</div>
                                    <div className={`text-[10px] font-black uppercase mb-1 ${idx === data.cyclePosition ? 'text-amber-500' : 'text-white/60'}`}>{pos.label}</div>
                                    <div className="text-[8px] opacity-40 italic">{pos.sub}</div>
                                </div>
                                {idx < 4 && (
                                    <div className="hidden md:block text-white/5 text-xl font-light">→</div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="p-8 bg-brand-blue text-slate-900 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><ShieldAlert size={40} /></div>
                    <div className="text-[10px] font-black uppercase tracking-widest italic mb-6">AI Strategy Prediction</div>
                    <p className="text-sm font-bold leading-relaxed mb-8">利用多维度非对称数据计算得出的周期结论。目前建议维持“结构性防御”姿态。</p>
                    <div className="pt-6 border-t border-slate-900/10">
                        <div className="text-[10px] font-black uppercase mb-1 opacity-40 tracking-widest">Rating</div>
                        <div className="text-2xl font-black italic">修正期 / CORRECTION</div>
                    </div>
                </div>

                <div className="p-8 border border-white/5 bg-white/[0.02]">
                    <h3 className="text-[10px] font-black text-brand-blue uppercase tracking-widest mb-6 italic">Strategic Operations</h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-sm">
                            <div className="text-rose-400 text-[10px] font-black uppercase mb-1 italic">Short-term</div>
                            <div className="text-[11px] font-bold text-white/60">LME铜价在 12,000 - 12,300 美元区间震荡。</div>
                        </div>
                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-sm">
                            <div className="text-emerald-400 text-[10px] font-black uppercase mb-1 italic">Critical Support</div>
                            <div className="text-[11px] font-bold text-white/60">密切关注 11,500 美元一线切入点。</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
