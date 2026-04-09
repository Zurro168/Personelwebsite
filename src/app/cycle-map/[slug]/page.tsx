'use client';

import React, { use, useEffect, useState } from 'react';
import { ChevronRight, ShieldAlert, Activity, Loader2, Info, ArrowRight } from 'lucide-react';
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
  const [data, setData] = useState<any>(null);
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
      <div className="min-h-screen bg-[#0c0c0e] text-white flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-brand-blue animate-spin mb-6" />
        <div className="text-xs uppercase font-black tracking-[0.3em] text-brand-blue italic animate-pulse">Establishing Secure Neural Link...</div>
      </div>
    );
  }

  if (!data) return null;

  const breadcrumbs = [
    { name: '金属周期地图', href: '/cycle-map' },
    { name: data.name, href: `/cycle-map/${slug}` }
  ];

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white font-sans selection:bg-brand-blue/30 pb-32">
      {/* 注入全局动态关键帧 */}
      <style jsx global>{`
        @keyframes liquidFlow {
          0% { stroke-dashoffset: 20; opacity: 0.1; }
          50% { opacity: 0.5; }
          100% { stroke-dashoffset: 0; opacity: 0.1; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.1); }
          50% { box-shadow: 0 0 25px rgba(59, 130, 246, 0.4); }
        }
        @keyframes radarExpand {
          0% { transform: scale(0.9); opacity: 0.2; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 opacity-60 hover:opacity-100 transition-opacity duration-500">
           <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* --- 工业头部 (Premium Header) --- */}
        <div className="bg-[#141417] border border-white/10 p-12 rounded-sm mb-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-full bg-gradient-to-l from-brand-blue/[0.03] to-transparent pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-12 relative z-10">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                   <div className="w-3 h-3 rounded-full bg-brand-blue animate-pulse"></div>
                   <div className="absolute inset-0 rounded-full bg-brand-blue animate-ping opacity-20"></div>
                </div>
                <span className="text-xs font-black text-brand-blue uppercase tracking-[0.2em] italic">Industrial Data Node 0x7A // SILICON INSIGHT</span>
              </div>
              <h1 className="text-8xl font-black tracking-tighter italic uppercase text-white mb-8 leading-none drop-shadow-2xl">{data.name}</h1>
              <p className="max-w-2xl text-lg leading-relaxed text-white/70 italic font-medium border-l-2 border-brand-blue/30 pl-8">{data.context}</p>
            </div>
            
            <div className="flex items-end gap-16">
              <div className="text-right">
                <div className="text-xs uppercase font-black text-white/40 mb-4 tracking-widest">Market Quotation Index</div>
                <div className="text-7xl font-black tracking-tighter text-white">
                  {data.price} <span className="text-xl font-normal text-white/20 ml-3 italic">USD</span>
                </div>
              </div>
              <div className={`px-6 py-4 text-2xl font-black italic rounded-sm shadow-[0_0_30px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform ${data.change.startsWith('+') ? 'bg-emerald-500 text-slate-900 border-b-4 border-emerald-700' : 'bg-rose-500 text-white border-b-4 border-rose-700'}`}>
                {data.change}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-10">
            {/* 核心评分卡片 (Radar Animated Score) */}
            <div className="p-12 bg-white/[0.04] border border-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden group shadow-2xl transition-all hover:bg-white/[0.06]">
               {/* 动态雷达波扩散 */}
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-32 h-32 rounded-full border border-white/10" style={{ animation: 'radarExpand 3s infinite linear' }}></div>
                  <div className="w-32 h-32 rounded-full border border-white/5 delay-1000" style={{ animation: 'radarExpand 3s infinite linear 1.5s' }}></div>
               </div>
               <div className="text-xs font-black text-white/50 uppercase tracking-widest mb-8 italic z-10 transition-colors group-hover:text-brand-blue">Global Score Matrix</div>
               <div className="text-9xl font-black text-white italic drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] mb-3 tracking-tighter z-10">{data.score}<span className="text-2xl text-white/10 italic ml-1">/pts</span></div>
               <div className="px-6 py-2 bg-white/5 text-white/60 text-[10px] font-black rounded-sm border border-white/10 uppercase italic tracking-[0.2em] z-10">Rating: Current Cycle Phase</div>
            </div>

            {/* 逻辑分解条形图 (High-Contrast Bar) */}
            <div className="md:col-span-3 p-12 bg-white/[0.04] border border-white/10 shadow-2xl relative group">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-blue group-hover:w-2 transition-all duration-500 opacity-30"></div>
                <h2 className="text-xs font-black text-brand-blue uppercase tracking-widest mb-10 italic flex items-center gap-4">
                    <Activity size={18} className="text-brand-blue" /> Fundamental Dimension Breakdown
                </h2>
                <div className="h-44">
                    <Bar 
                        data={{
                            labels: ['宏观环境', '需求动能', '库存水位', '供应潜力'],
                            datasets: [{
                                data: data.dimensionScores,
                                backgroundColor: ['rgba(56,189,248,0.7)', 'rgba(56,189,248,0.5)', 'rgba(56,189,248,0.3)', 'rgba(56,189,248,0.6)'],
                                borderColor: '#fff',
                                borderWidth: 0,
                                borderRadius: 0
                            }]
                        }}
                        options={{
                            indexAxis: 'y',
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false } },
                            scales: {
                                x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.4)', font: { size: 10, family: 'monospace', weight: 'bold' } } },
                                y: { grid: { display: false }, ticks: { color: '#fff', font: { size: 14, weight: 'bold' } } }
                            }
                        }}
                    />
                </div>
            </div>
          </div>
        </div>

        {/* --- 宏观周期流程 (Liquid Interaction Flow) --- */}
        <div className="bg-[#141417] border border-white/10 p-16 rounded-sm mb-10 shadow-2xl relative group">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-32 bg-brand-blue/20 blur-2xl opacity-10 group-hover:opacity-100 transition-opacity"></div>
            <h2 className="text-xs font-black text-brand-blue uppercase tracking-[0.5em] mb-16 italic text-center drop-shadow-sm">End-to-End Market Cycle Logic Linkage</h2>
            <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6 lg:gap-4 lg:px-10">
                {data.cycleSteps?.map((pos: any, idx: number) => (
                    <React.Fragment key={idx}>
                        <div className={`flex-1 p-8 border rounded-sm text-center transition-all duration-700 relative flex flex-col justify-center items-center group/card cursor-pointer hover:bg-white/[0.05] ${idx === data.cyclePosition ? 'border-brand-blue/50 bg-brand-blue/5 shadow-[0_0_60px_rgba(56,189,248,0.1)] scale-110 z-20 border-2' : 'border-white/5 bg-white/[0.01] opacity-40 hover:opacity-100 grayscale hover:grayscale-0'}`}>
                            {idx === data.cyclePosition && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-brand-blue text-slate-900 text-[9px] font-black px-4 py-1.5 whitespace-nowrap italic shadow-[0_0_20px_rgba(56,189,248,0.4)]">ACTIVE POSITION</div>
                            )}
                            <div className={`text-6xl mb-6 transition-transform duration-500 group-hover/card:scale-125 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]`}>{pos.emoji}</div>
                            <div className={`text-base font-black uppercase mb-3 tracking-widest transition-colors ${idx === data.cyclePosition ? 'text-brand-blue' : 'text-white/90 group-hover/card:text-brand-blue'}`}>{pos.label}</div>
                            <div className={`text-[12px] font-bold italic leading-snug px-2 transition-opacity ${idx === data.cyclePosition ? 'text-brand-blue/60 opacity-100' : 'text-white/30 group-hover/card:text-white/60'}`}>{pos.sub}</div>
                        </div>
                        {idx < 4 && (
                            <div className="hidden lg:flex items-center justify-center text-white/5 opacity-40 hover:opacity-100">
                                <ArrowRight size={24} className="animate-pulse" />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-12">
                <div className="p-12 border border-white/10 bg-[#141417] rounded-sm shadow-2xl relative section-reveal">
                   <h2 className="text-xs font-black text-brand-blue uppercase tracking-widest mb-16 italic flex items-center gap-4">
                      <Activity className="w-6 h-6 text-brand-blue" />
                      Multidimensional Market Intelligence Narrative
                   </h2>
                   <div className="h-[500px] w-full mb-16 border-b border-white/10 pb-12 relative">
                      <Line 
                        data={{
                            labels: data.chartLabels,
                            datasets: [
                                {
                                    label: '全球库存 (千吨)',
                                    data: data.inventoryValues,
                                    borderColor: '#f43f5e',
                                    backgroundColor: (context) => {
                                        const ctx = context.chart.ctx;
                                        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                                        gradient.addColorStop(0, 'rgba(244, 63, 94, 0.4)');
                                        gradient.addColorStop(1, 'rgba(244, 63, 94, 0)');
                                        return gradient;
                                    },
                                    fill: true,
                                    yAxisID: 'y1',
                                    tension: 0.4,
                                    pointRadius: 6,
                                    pointBackgroundColor: '#f43f5e',
                                    pointBorderColor: '#fff',
                                    pointBorderWidth: 2,
                                },
                                {
                                    label: '市场均价 (USD)',
                                    data: data.chartValues,
                                    borderColor: '#3b82f6',
                                    borderDash: [5, 5],
                                    pointRadius: 6,
                                    pointBackgroundColor: '#fff',
                                    pointBorderColor: '#3b82f6',
                                    pointBorderWidth: 3,
                                    yAxisID: 'y',
                                    tension: 0.4,
                                }
                            ]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'top',
                                    align: 'center',
                                    labels: {
                                        color: 'rgba(255,255,255,0.6)',
                                        font: { size: 12, weight: 'bold', family: 'monospace' },
                                        usePointStyle: true,
                                        padding: 20
                                    }
                                },
                                tooltip: {
                                    backgroundColor: 'rgba(20, 20, 23, 0.95)',
                                    titleFont: { size: 16, weight: 'bold' },
                                    bodyFont: { size: 14, family: 'monospace' },
                                    borderColor: 'rgba(255,255,255,0.1)',
                                    borderWidth: 1,
                                    padding: 16,
                                    callbacks: {
                                        label: (context) => `${context.dataset.label}: ${context.raw}`
                                    }
                                }
                            },
                            scales: {
                                y: {
                                    type: 'linear',
                                    display: true,
                                    position: 'right',
                                    title: { display: true, text: '价格 (USD)', color: '#3b82f6', font: { weight: 'bold' } },
                                    grid: { color: 'rgba(255,255,255,0.05)' },
                                    ticks: { color: '#3b82f6', font: { family: 'monospace' } }
                                },
                                y1: {
                                    type: 'linear',
                                    display: true,
                                    position: 'left',
                                    title: { display: true, text: '库存 (kT)', color: '#f43f5e', font: { weight: 'bold' } },
                                    grid: { drawOnChartArea: false },
                                    ticks: { color: '#f43f5e', font: { family: 'monospace' } }
                                },
                                x: {
                                    grid: { display: false },
                                    ticks: { color: 'rgba(255,255,255,0.5)', font: { family: 'monospace' } }
                                }
                            }
                        }}
                      />
                   </div>
                   
                   <div className="space-y-16">
                      {data.narrative?.map((item: any, idx: number) => (
                        <div key={idx} className="group cursor-default relative pl-12">
                           <div className="absolute left-0 top-0 w-1 h-full bg-white/5 group-hover:bg-brand-blue transition-all duration-700"></div>
                           <h3 className="text-3xl font-black mb-8 italic uppercase text-white group-hover:tracking-wider transition-all duration-500">
                              {item.title}
                           </h3>
                           <p className="text-white/80 leading-relaxed text-xl font-medium italic mb-2">{item.content}</p>
                           <div className="h-0.5 w-12 bg-brand-blue/40 mt-8 group-hover:w-full transition-all duration-1000"></div>
                        </div>
                      ))}
                   </div>
                </div>
            </div>

            <div className="space-y-10">
                <div className="p-12 bg-brand-blue text-slate-900 border-l-[12px] border-slate-900/10 shadow-[0_20px_50px_rgba(59,130,246,0.3)] relative overflow-hidden group/strat">
                    <div className="absolute top-0 right-0 p-8 opacity-20 transform group-hover/strat:scale-110 transition-transform duration-700"><ShieldAlert size={80} /></div>
                    <div className="text-xs font-black uppercase tracking-[0.3em] italic mb-10 border-b border-slate-900/10 pb-4 inline-block">AI Strategy Masterplan</div>
                    <p className="text-2xl font-black leading-tight mb-12 italic border-l-4 border-slate-900/10 pl-6">“库存拐点尚未确立，流动性溢价面临二次修正。当前核心逻辑：防守至上，静待极值爆发。”</p>
                    <div className="pt-10 border-t border-slate-900/20">
                        <div className="text-[12px] font-black uppercase mb-2 opacity-60 tracking-widest">Global Risk Rating</div>
                        <div className="text-4xl font-black italic uppercase tracking-tighter shadow-sm">中性偏空 / BEARISH-HEDGE</div>
                    </div>
                </div>

                <div className="p-12 border border-white/10 bg-[#141417] shadow-2xl relative overflow-hidden">
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand-blue/5 rounded-full blur-3xl opacity-50"></div>
                    <h3 className="text-xs font-black text-brand-blue uppercase tracking-widest mb-10 italic flex items-center gap-4">
                        <Activity size={18} /> High-Fidelity Alpha Signals
                    </h3>
                    <div className="space-y-8">
                        <div className="p-8 bg-white/[0.04] border border-white/10 rounded-sm hover:border-brand-blue/60 hover:bg-white/[0.06] transition-all cursor-cell group">
                            <div className="text-rose-400 text-xs font-black uppercase mb-4 italic flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e] animate-pulse"></div> 战术性空头敞口预警
                            </div>
                            <div className="text-[15px] font-bold text-white/80 leading-relaxed italic">LME 现货大幅深贴水（Contango），暗示实物囤积成本高昂。</div>
                        </div>
                        <div className="p-8 bg-white/[0.04] border border-white/10 rounded-sm hover:border-brand-blue/60 hover:bg-white/[0.06] transition-all cursor-cell group">
                            <div className="text-emerald-400 text-xs font-black uppercase mb-4 italic flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse"></div> 供给侧结构性异动
                            </div>
                            <div className="text-[15px] font-bold text-white/80 leading-relaxed italic">刚果（金）出口物流受阻，关注 11,200 美金底线支撑力度。</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <footer className="max-w-7xl mx-auto mt-32 py-16 border-t border-white/5 text-center">
         <Link href="/cycle-map" className="text-white/20 hover:text-brand-blue text-xs font-black tracking-[0.5em] uppercase transition-all duration-500 hover:tracking-[0.8em] italic">
            BACK TO CENTRAL INTELLIGENCE COMMAND
         </Link>
      </footer>
    </div>
  );
}
