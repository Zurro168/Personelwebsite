'use client';

import React, { use, useEffect, useState } from 'react';
import { ChevronRight, ShieldAlert, Activity, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { resolveCommodity, UnifiedCommodityData } from '@/lib/price-adapter';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

  const breadcrumbs = [
    { name: '金属周期地图', href: '/cycle-map' },
    { name: data ? data.name : slug.toUpperCase(), href: `/cycle-map/${slug}` }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050507] text-white flex flex-col items-center justify-center p-8">
        <Loader2 className="w-8 h-8 text-brand-blue animate-spin mb-4" />
        <div className="text-brand-blue font-mono text-[10px] tracking-widest uppercase italic">Establishing Secure FRED Link...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#050507] text-white flex flex-col items-center justify-center p-8 text-center">
        <div className="text-brand-blue font-mono mb-4">ERROR_CODE: 404</div>
        <h1 className="text-2xl font-black mb-8 italic uppercase tracking-tighter">智库数据中心未检索到该品种 // NO_ENTRY</h1>
        <Link href="/cycle-map" className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-brand-blue hover:text-slate-900 transition-all font-bold tracking-widest uppercase text-xs italic">
          返回控制中心 / Back to Terminal
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white font-sans selection:bg-brand-blue/30">
      {/* Top Nav */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-10 opacity-30 hover:opacity-100 transition-opacity">
           <Breadcrumbs items={breadcrumbs} />
        </div>

        <div className="bg-white/5 border border-white/5 p-8 md:p-12 backdrop-blur-xl rounded-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse"></div>
                <span className="text-brand-blue font-mono text-[10px] tracking-widest">LIVE DATA TERMINAL // {slug.toUpperCase()}</span>
              </div>
              <h1 className="text-5xl font-black tracking-tighter italic uppercase">{data.name}</h1>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="text-right">
                <div className="text-white/20 text-[10px] uppercase font-black mb-1 tracking-widest">Pricing Index</div>
                <div className="text-4xl font-black tracking-tighter">{data.price} <span className="text-sm font-normal text-white/20 ml-1">{data.unit}</span></div>
              </div>
              <div className={`px-4 py-2 text-sm font-black italic ${data.change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {data.change}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {Object.entries(data.stats).map(([k, v]) => (
              <div key={k} className="p-6 bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all group">
                <div className="text-[10px] text-white/20 uppercase font-black mb-2 tracking-[0.2em] group-hover:text-brand-blue transition-colors text-xs italic">{k}</div>
                <div className="text-lg font-bold tracking-tight">{v as string}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="h-72 relative border border-white/5 bg-white/[0.012] p-6 rounded-sm group overflow-hidden">
                <Line 
                  data={{
                    labels: data.chartLabels,
                    datasets: [{
                      label: 'SPOT PRICE INDEX',
                      data: data.chartValues,
                      borderColor: '#3b82f6',
                      borderWidth: 2,
                      pointBackgroundColor: '#3b82f6',
                      pointBorderColor: '#050507',
                      pointBorderWidth: 2,
                      pointRadius: 4,
                      pointHoverRadius: 6,
                      fill: true,
                      tension: 0.4,
                      backgroundColor: (context) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.15)');
                        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
                        return gradient;
                      },
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        backgroundColor: 'rgba(5, 5, 7, 0.95)',
                        titleFont: { family: 'inherit', weight: 'bold' },
                        bodyFont: { family: 'monospace' },
                        padding: 12,
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1,
                        displayColors: false,
                      }
                    },
                    scales: {
                      y: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: 'rgba(255, 255, 255, 0.2)', font: { size: 10, family: 'monospace' } }
                      },
                      x: {
                        grid: { display: false },
                        ticks: { color: 'rgba(255, 255, 255, 0.2)', font: { size: 10, family: 'monospace' } }
                      }
                    }
                  }}
                />
              </div>
              <div className="mt-10">
                <h3 className="text-xl font-black mb-6 flex items-center gap-3 italic uppercase tracking-tight">
                  <Activity className="w-5 h-5 text-brand-blue" />
                  周期逻辑深度解析 <span className="text-brand-blue">/</span> Analysis
                </h3>
                <div className="p-8 border-l border-brand-blue/30 bg-white/[0.02] relative">
                    <p className="text-lg text-white/80 leading-relaxed font-light italic">
                      “{data.context}”
                    </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
                <div className="p-8 bg-brand-blue text-slate-900 rounded-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <ShieldAlert size={48} />
                    </div>
                    <h4 className="font-black uppercase tracking-widest text-xs mb-4 text-xs italic">AI 周期预判 // PREDICTION</h4>
                    <p className="text-sm font-medium leading-relaxed">
                        基于跨市场基本面数据的多维度交叉验证。该品种当前核心矛盾集中在供应端的非线性反馈。
                    </p>
                    <div className="mt-6 pt-6 border-t border-slate-900/10">
                        <div className="text-[10px] font-black uppercase mb-1 tracking-widest">Current Rating</div>
                        <div className="text-xl font-black italic uppercase">中性偏多 / NEUTRAL+</div>
                    </div>
                </div>
                
                <div className="p-8 border border-white/10 bg-white/[0.02] rounded-sm">
                    <div className="flex items-center gap-2 mb-6 text-white/20">
                        <ShieldAlert className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Alpha Signals</span>
                    </div>
                    <ul className="space-y-4 text-sm font-bold">
                        <li className="flex items-center gap-3 group cursor-pointer hover:text-brand-blue transition-colors text-xs italic">
                            <ChevronRight className="w-4 h-4 text-brand-blue" />
                            库存斜率变动预警
                        </li>
                        <li className="flex items-center gap-3 group cursor-pointer hover:text-brand-blue transition-colors text-xs italic">
                            <ChevronRight className="w-4 h-4 text-brand-blue" />
                            产业利润周期追踪
                        </li>
                        <li className="flex items-center gap-3 group cursor-pointer hover:text-brand-blue transition-colors text-xs italic">
                            <ChevronRight className="w-4 h-4 text-brand-blue" />
                            宏观流动性溢价测算
                        </li>
                    </ul>
                </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="max-w-7xl mx-auto mt-20 py-12 border-t border-white/5 text-center">
         <Link href="/cycle-map" className="text-white/20 hover:text-brand-blue text-[10px] font-mono tracking-widest uppercase transition-colors">
            RETURN TO COMMAND CENTER
         </Link>
      </footer>
    </div>
  );
}
