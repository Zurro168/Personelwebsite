'use client';

import React, { use } from 'react';
import { ChevronRight, ShieldAlert, BarChart3, Activity } from 'lucide-react';
import Link from 'next/link';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

// --- Mock Data ---
const commodityData: any = {
  'copper': {
    name: '精炼铜 (Copper)',
    price: '9,240.50',
    change: '+1.2%',
    unit: 'USD/MT',
    stats: {
      supply: '偏紧',
      demand: '强劲 (EV/AI 驱动)',
      inventory: '低位 (LME 3.2万吨)',
      outlook: '看涨'
    },
    context: '作为“电气化之母”，铜在2026年正经历历史性的结构性短缺。',
    chartLabels: ['Jan', 'Feb', 'Mar', 'Apr'],
    chartValues: [8800, 9100, 8950, 9240]
  },
  'zirconium': {
    name: '锆 (Zirconium)',
    price: '15,800',
    change: '+0.5%',
    unit: 'USD/MT',
    stats: {
      supply: '受限 (矿端开采权收紧)',
      demand: '稳健 (核电/高端陶瓷)',
      inventory: '中等偏低',
      outlook: '中性偏多'
    },
    context: '锆英砂供应受制于核心产区开采效率，核电工业的结构性需求提供了底部支撑。',
    chartLabels: ['Jan', 'Feb', 'Mar', 'Apr'],
    chartValues: [15200, 15400, 15600, 15800]
  },
  'titanium': {
    name: '钛 (Titanium)',
    price: '28,500',
    change: '+2.1%',
    unit: 'USD/MT',
    stats: {
      supply: '结构性错配 (航级短缺)',
      demand: '爆发 (民航/海工)',
      inventory: '极低',
      outlook: '强力看涨'
    },
    context: '随着全球民航大飞机的交付提速，航空级钛材面临长期产能瓶颈。',
    chartLabels: ['Jan', 'Feb', 'Mar', 'Apr'],
    chartValues: [26000, 27200, 27800, 28500]
  },
  'lithium': {
    name: '碳酸锂 (Lithium)',
    price: '98,000',
    change: '-0.8%',
    unit: 'CNY/MT',
    stats: {
      supply: '过剩 (多项目达产)',
      demand: '增速回归常态',
      inventory: '高位运行',
      outlook: '筑底期'
    },
    context: '行业正在经历残酷的成本出清周期，市场仍在寻找新的定价锚点。',
    chartLabels: ['Jan', 'Feb', 'Mar', 'Apr'],
    chartValues: [110000, 105000, 100000, 98000]
  }
};

export default function CycleMapDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const data = commodityData[slug];

  const breadcrumbs = [
    { name: '金属周期地图', href: '/cycle-map' },
    { name: data ? data.name : slug.toUpperCase(), href: `/cycle-map/${slug}` }
  ];

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
                <div className="text-[10px] text-white/20 uppercase font-black mb-2 tracking-[0.2em] group-hover:text-brand-blue transition-colors">{k}</div>
                <div className="text-lg font-bold tracking-tight">{v as string}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="h-72 relative border border-white/5 bg-white/[0.01] flex items-center justify-center rounded-sm group overflow-hidden">
                 <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                    <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 0.5px, transparent 0.5px)', backgroundSize: '16px 16px' }}></div>
                 </div>
                 <div className="flex flex-col items-center gap-4 relative z-10">
                    <BarChart3 className="w-10 h-10 text-brand-blue opacity-20 group-hover:opacity-50 transition-all duration-700" />
                    <span className="font-mono text-[10px] text-white/20 uppercase tracking-[0.3em] italic">Real-time Visualization Pipeline Syncing...</span>
                 </div>
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
                    <h4 className="font-black uppercase tracking-widest text-xs mb-4">AI 周期预判 // PREDICTION</h4>
                    <p className="text-sm font-medium leading-relaxed">
                        基于跨市场基本面数据的多维度交叉验证。该品种当前核心矛盾集中在供应端的非线性反馈。
                    </p>
                    <div className="mt-6 pt-6 border-t border-slate-900/10">
                        <div className="text-[10px] font-black uppercase mb-1">Current Rating</div>
                        <div className="text-xl font-black italic uppercase">中性偏多 / NEUTRAL+</div>
                    </div>
                </div>
                
                <div className="p-8 border border-white/10 bg-white/[0.02] rounded-sm">
                    <div className="flex items-center gap-2 mb-6 text-white/20">
                        <ShieldAlert className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Alpha Signals</span>
                    </div>
                    <ul className="space-y-4 text-sm font-bold">
                        <li className="flex items-center gap-3 group cursor-pointer hover:text-brand-blue transition-colors">
                            <ChevronRight className="w-4 h-4 text-brand-blue" />
                            库存斜率变动预警
                        </li>
                        <li className="flex items-center gap-3 group cursor-pointer hover:text-brand-blue transition-colors">
                            <ChevronRight className="w-4 h-4 text-brand-blue" />
                            产业利润周期追踪
                        </li>
                        <li className="flex items-center gap-3 group cursor-pointer hover:text-brand-blue transition-colors">
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
