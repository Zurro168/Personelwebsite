'use client';

import React, { useEffect, useState } from 'react';
import { ChevronRight, ArrowLeft, TrendingUp, TrendingDown, Info, ShieldAlert, BarChart3, Activity } from 'lucide-react';
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
  'lithium': {
    name: '碳酸锂 (Lithium)',
    price: '98,000',
    change: '-0.8%',
    unit: 'CNY/MT',
    stats: {
      supply: '过剩',
      demand: '放缓',
      inventory: '高位',
      outlook: '震荡筑底'
    },
    context: '产能出清周期尚未结束，市场仍在消化过往三年的超量建设。',
    chartLabels: ['Jan', 'Feb', 'Mar', 'Apr'],
    chartValues: [110000, 105000, 100000, 98000]
  }
};

export default function CycleMapDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const data = commodityData[slug];

  const breadcrumbs = [
    { name: '金属周期地图', href: '/cycle-map' },
    { name: data ? data.name : slug.toUpperCase(), href: `/cycle-map/${slug}` }
  ];

  if (!data) {
    return (
      <div className="min-h-screen bg-[#050507] text-white flex flex-col items-center justify-center p-8">
        <div className="text-brand-blue font-mono mb-4">ERROR_CODE: 404</div>
        <h1 className="text-2xl font-black mb-8">数据中心未查询到该品种</h1>
        <Link href="/cycle-map" className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-brand-blue hover:text-slate-900 transition-all font-bold">
          返回控制中心
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white font-sans selection:bg-brand-blue/30">
      {/* Top Nav */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-10 opacity-60 hover:opacity-100 transition-opacity">
           <Breadcrumbs items={breadcrumbs} />
        </div>

        <div className="bg-white/5 border border-white/10 p-8 md:p-12 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse"></div>
                <span className="text-brand-blue font-mono text-xs tracking-widest">LIVE TERMINAL // {slug.toUpperCase()}</span>
              </div>
              <h1 className="text-5xl font-black tracking-tighter">{data.name}</h1>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="text-right">
                <div className="text-white/40 text-[10px] uppercase font-black mb-1">Current Price</div>
                <div className="text-4xl font-black tracking-tighter">{data.price} <span className="text-sm font-normal text-white/40 ml-1">{data.unit}</span></div>
              </div>
              <div className={`px-4 py-2 text-sm font-black ${data.change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                {data.change}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {Object.entries(data.stats).map(([k, v]) => (
              <div key={k} className="p-6 bg-white/5 border border-white/5 hover:border-white/20 transition-colors">
                <div className="text-[10px] text-white/30 uppercase font-black mb-2">{k}</div>
                <div className="text-lg font-bold">{v as string}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="h-64 relative border border-white/5 bg-white/[0.02] flex items-center justify-center">
                 <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                 </div>
                 <BarChart3 className="w-12 h-12 text-brand-blue opacity-20" />
                 <span className="font-mono text-[10px] text-white/20 uppercase tracking-[0.2em]">Data Visualization Pipeline Online</span>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-brand-blue" />
                  基本面深度解析
                </h3>
                <p className="text-lg text-white/60 leading-relaxed font-light italic">
                  “{data.context}”
                </p>
              </div>
            </div>

            <div className="space-y-6">
                <div className="p-8 bg-brand-blue text-slate-900">
                    <h4 className="font-black uppercase tracking-tight mb-4">AI 风险评级：中性偏多</h4>
                    <p className="text-sm font-medium leading-normal">
                        基于 LME 与 SHFE 联动数据的多维度交叉验证，该品种当前处于复苏周期的早期阶段。建议关注关键成本支撑位的防御性逻辑。
                    </p>
                </div>
                <div className="p-8 border border-white/10 bg-white/5">
                    <div className="flex items-center gap-2 mb-4 text-white/40">
                        <ShieldAlert className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase">Alpha Strategy</span>
                    </div>
                    <ul className="space-y-4 text-sm font-bold">
                        <li className="flex items-center gap-3">
                            <ChevronRight className="w-4 h-4 text-brand-blue" />
                            库存下降斜率检测
                        </li>
                        <li className="flex items-center gap-3">
                            <ChevronRight className="w-4 h-4 text-brand-blue" />
                            冶炼利润盈亏线追踪
                        </li>
                    </ul>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
