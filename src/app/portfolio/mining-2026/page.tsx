'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Globe2, 
  Zap, 
  MapPin, 
  TrendingUp, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Activity,
  Layers,
  Cpu,
  History as HistoryIcon,
  LayoutList
} from 'lucide-react';
import Chart from 'chart.js/auto';
import { AUTHOR_INFO } from '@/data/biography';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import TableOfContents from '@/components/TableOfContents';

// --- Types ---
interface Faction {
  title: string;
  companies: string;
  description: string;
  logic: string;
  chartData: number[];
  color: string;
  borderColor: string;
}

const factionData: Record<string, Faction> = {
  'A': {
    title: "A. 守成与兼并派 (Acquisitionists)",
    companies: "BHP (必和必拓), Anglo American (英美资源)",
    description: "依靠极强的资产负债表，在存量市场进行“大卫收购歌利亚”式的兼并。通过购买已投产项目规避长周期勘探风险。",
    logic: "将财务杠杆转化为资源护城河，确保存量资产在供需缺口扩大时的议价权。",
    chartData: [95, 10, 20, 30, 80],
    color: 'rgba(56, 189, 248, 0.2)',
    borderColor: '#38bdf8'
  },
  'B': {
    title: "B. 供应链垂直整合派 (Vertical Integrators)",
    companies: "紫金矿业, 洛阳钼业",
    description: "展现极强的“建设者姿态”。不仅持续投入原矿，更开始向冶炼、材料端深度延伸，建立全产业链优势。",
    logic: "【硅基点评】：逆周期投入。在西方巨头因 ESG 压力收缩时，建立独立于传统体系的资源循环。",
    chartData: [40, 80, 95, 60, 95],
    color: 'rgba(14, 165, 233, 0.3)',
    borderColor: '#0ea5e9'
  },
  'C': {
    title: "C. 电池金属激进派 (Energy-Metal Pioneers)",
    companies: "Glencore (嘉能可), Vale (淡水河谷)",
    description: "彻底的结构重组。剥离传统煤炭业务，疯狂押注镍、钴、锂等。试图通过拆分基础金属业务释放溢价。",
    logic: "迎合资本市场“零碳”偏好，通过纯粹的能源金属叙事摆脱传统周期股的估值束缚。",
    chartData: [20, 50, 40, 100, 40],
    color: 'rgba(56, 189, 248, 0.4)',
    borderColor: '#38bdf8'
  }
};

export default function MiningReport() {
  const macroChartRef = useRef<HTMLCanvasElement>(null);
  const radarChartRefA = useRef<HTMLCanvasElement>(null);
  const radarChartRefB = useRef<HTMLCanvasElement>(null);
  const radarChartRefC = useRef<HTMLCanvasElement>(null);
  
  const macroInstance = useRef<Chart | null>(null);
  const radarInstances = useRef<Record<string, Chart | null>>({ A: null, B: null, C: null });

  useEffect(() => {
    // Initialize Macro Chart
    if (macroChartRef.current) {
        if (macroInstance.current) macroInstance.current.destroy();
        macroInstance.current = new Chart(macroChartRef.current, {
            type: 'bar',
            data: {
                labels: ['过去二十年 (中国基建驱动)', '2026 及未来 (能源转型驱动)'],
                datasets: [
                    {
                        label: '铁矿石战略权重',
                        data: [90, 35],
                        backgroundColor: 'rgba(71, 85, 105, 0.6)',
                        borderColor: '#475569',
                        borderWidth: 1,
                        borderRadius: 2
                    },
                    {
                        label: '铜及新能源金属权重',
                        data: [30, 95],
                        backgroundColor: 'rgba(56, 189, 248, 0.7)',
                        borderColor: '#38bdf8',
                        borderWidth: 1,
                        borderRadius: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                  legend: { 
                    position: 'top', 
                    labels: { color: '#94a3b8', font: { weight: 'bold', family: 'sans-serif' }, usePointStyle: true, boxWidth: 6 } 
                  } 
                },
                scales: {
                    y: { 
                      beginAtZero: true, 
                      max: 100, 
                      grid: { color: 'rgba(255,255,255,0.03)' },
                      ticks: { color: '#64748b' }
                    },
                    x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                }
            }
        });
    }

    // Initialize Radar Charts
    const initRadar = (id: string, ref: React.RefObject<HTMLCanvasElement | null>) => {
      if (ref.current) {
        const data = factionData[id];
        if (radarInstances.current[id]) radarInstances.current[id]?.destroy();
        radarInstances.current[id] = new Chart(ref.current, {
            type: 'radar',
            data: {
                labels: ['买入存量资产', '新矿勘探意愿', '下游冶炼整合', '新能源金属押注', '逆周期投资能力'],
                datasets: [{
                    label: '战略权重',
                    data: data.chartData,
                    backgroundColor: data.color,
                    borderColor: data.borderColor,
                    pointBackgroundColor: data.borderColor,
                    borderWidth: 2,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { 
                    r: { 
                        angleLines: { color: 'rgba(255, 255, 255, 0.05)' }, 
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        min: 0, 
                        max: 100, 
                        ticks: { display: false },
                        pointLabels: { color: '#94a3b8', font: { size: 10, weight: 'bold' } }
                    } 
                }
            }
        });
      }
    };

    initRadar('A', radarChartRefA);
    initRadar('B', radarChartRefB);
    initRadar('C', radarChartRefC);

    return () => {
      macroInstance.current?.destroy();
      Object.values(radarInstances.current).forEach(chart => chart?.destroy());
    };
  }, []);

  return (
    <div className="bg-[#0c0c0e] min-h-screen text-slate-200 font-sans selection:bg-brand-blue/30 overflow-x-hidden">
      {/* Visual background elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-blue/3 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Node-based Progress Tracker */}
      <TableOfContents content="" />

      <header className="border-b border-white/5 px-8 py-4 flex flex-col md:flex-row justify-between items-center sticky top-0 bg-background/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-6">
          <Link href="/portfolio" className="w-10 h-10 bg-brand-blue rounded-sm flex items-center justify-center text-slate-900 font-bold transition-all hover:scale-110 shadow-[0_0_20px_rgba(56,189,248,0.3)]">Si</Link>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white uppercase italic">2026 矿业大博弈</span>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black text-brand-blue uppercase tracking-[0.3em]">Deep Strategic Intelligence</span>
              <span className="w-1 h-1 bg-brand-blue rounded-full animate-pulse"></span>
            </div>
          </div>
        </div>
        <nav className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
          <Link href="/portfolio" className="hover:text-brand-blue transition-colors">Archive</Link>
          <Link href="/cycle-map" className="hover:text-brand-blue transition-colors">Cycle Map</Link>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-20 relative z-10">
        <div className="space-y-40">
          
          {/* Section 1: Macro */}
          <section id="macro" className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid lg:grid-cols-2 gap-20 items-center mb-20">
              <div className="space-y-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[2px] bg-brand-blue"></div>
                  <span className="text-brand-blue text-[10px] font-black tracking-[0.4em] uppercase font-mono">Macro Pivot Analysis</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter leading-[0.9]">
                  从“铁”到“铜” <br />
                  <span className="text-brand-blue">历史性偏移</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed font-light">
                  过去二十年的矿业增长由中国基建驱动（铁矿石）；而在 2026 年，能源转型的物理限制让铜成为了新的“主权资产”。
                </p>
                <div className="pt-8 flex gap-8">
                  <div className="space-y-2">
                    <span className="text-4xl font-black text-white">+240%</span>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Copper Scarcity Index</p>
                  </div>
                  <div className="w-[1px] h-full bg-white/10" />
                  <div className="space-y-2">
                    <span className="text-4xl font-black text-slate-600">-40%</span>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Iron Ore Priority</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900/40 border border-white/10 p-10 rounded shadow-3xl h-[450px] relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 right-0 p-4 opacity-5"><Activity size={120} /></div>
                <div className="h-full relative z-10">
                  <canvas ref={macroChartRef}></canvas>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: '铜：新时代的“原油”', icon: Zap, desc: '巨头们正通过并购直接获取存量铜资源，因为环保审批导致新矿开发周期已超过 15 年。' },
                { title: '铁矿石：权重修正', icon: HistoryIcon, desc: '面对需求的结构性洗牌，铁矿石已不再是 Capex 分配的宠儿，全球需求进入平原期。' },
                { title: '地缘政治溢价', icon: Globe2, desc: '资源国政府开始要求就地冶炼，提高进入门槛，重塑全球矿产流通路径。' }
              ].map((card, i) => (
                <div key={i} className="group p-8 bg-slate-900/20 border border-white/5 rounded-sm hover:border-brand-blue/30 transition-all">
                  <card.icon className="text-brand-blue mb-6 group-hover:scale-110 transition-transform" size={24} />
                  <h3 className="text-lg font-bold text-white mb-4 italic">{card.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Factions */}
          <section id="factions" className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-20 space-y-4">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-[2px] bg-brand-gold"></div>
                  <span className="text-brand-gold text-[10px] font-black tracking-[0.4em] uppercase font-mono">Strategic Factions</span>
               </div>
               <h2 className="text-5xl font-black text-white italic tracking-tighter">三大战略流派的对峙</h2>
            </div>
            
            <div className="space-y-32">
              {Object.keys(factionData).map((id, idx) => {
                const f = factionData[id];
                const refs = { 'A': radarChartRefA, 'B': radarChartRefB, 'C': radarChartRefC };
                return (
                  <div key={id} className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className={`space-y-8 ${idx % 2 === 1 ? 'lg:order-last' : ''}`}>
                      <div className="flex items-center gap-4">
                        <span className="text-6xl font-black text-brand-blue/20 italic">{id}</span>
                        <h3 className="text-3xl font-black text-white italic">{f.title}</h3>
                      </div>
                      <div className="text-[12px] text-brand-blue font-mono tracking-widest uppercase bg-brand-blue/5 py-1 px-3 border border-brand-blue/10 inline-block">{f.companies}</div>
                      <p className="text-slate-400 text-lg leading-relaxed font-light">{f.description}</p>
                      <div className="p-6 bg-slate-900/60 border-l-4 border-brand-blue text-brand-blue text-sm font-bold italic shadow-xl">
                        核心逻辑：{f.logic}
                      </div>
                    </div>
                    <div className="bg-slate-900/40 border border-white/10 p-10 rounded-sm relative shadow-2xl backdrop-blur-md h-[450px]">
                      <canvas ref={refs[id as 'A' | 'B' | 'C']}></canvas>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 3: Action */}
          <section id="action" className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
             <div className="p-16 bg-brand-blue border-l-[20px] border-slate-900/20 text-slate-900 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-1000"><Cpu size={160} /></div>
                <h3 className="text-xs font-black uppercase tracking-[0.4em] mb-12 border-b border-slate-900/10 pb-4 inline-block italic">Strategic Action Framework</h3>
                <div className="grid md:grid-cols-2 gap-16 relative z-10">
                   <div className="space-y-8">
                      <span className="text-[10px] font-black uppercase bg-slate-900/20 px-3 py-1 italic shadow-sm">Intelligence Alert 01</span>
                      <h4 className="text-4xl font-black italic tracking-tighter leading-tight uppercase">资源民族主义 2.0</h4>
                      <p className="text-slate-900/80 font-medium italic text-lg leading-relaxed">资源国政府不再满足于税收分红，正强制要求“本国化冶炼”与“技术换主权”，这将极大抬高巨头们的Capex门槛。</p>
                   </div>
                   <div className="bg-slate-900/10 p-10 border border-slate-900/10 rounded-sm backdrop-blur-sm self-center shadow-inner">
                      <p className="text-2xl font-black leading-tight italic">“当前核心逻辑：防守至上，静待流动性溢价面临二次修正后的极值机会。”</p>
                   </div>
                </div>
             </div>

             <div className="grid md:grid-cols-2 gap-8">
                <div className="p-12 bg-slate-900/30 border border-white/5 rounded-sm hover:border-brand-blue/40 transition-all shadow-xl">
                   <ShieldCheck className="text-brand-blue mb-8" size={40} />
                   <h4 className="text-2xl font-black text-white italic mb-4">1. 现金流确定性</h4>
                   <p className="text-slate-400 font-light leading-relaxed text-lg">关注那些在行业低迷期仍能保持稳定 Capex 投入并拥有高ROE优质矿产的公司，他们是周期的生存者。</p>
                </div>
                <div className="p-12 bg-slate-900/30 border border-white/5 rounded-sm hover:border-brand-blue/40 transition-all shadow-xl">
                   <TrendingUp className="text-brand-blue mb-8" size={40} />
                   <h4 className="text-2xl font-black text-white italic mb-4">2. 并购溢价风险评估</h4>
                   <p className="text-slate-400 font-light leading-relaxed text-lg">高溢价并购可能产生巨大的商誉泡沫，短期会打压股价，但应结合其通过整合后带来的协同规模效应进行二级定价。</p>
                </div>
             </div>
          </section>

        </div>
      </main>

      {/* Minimal footer */}
      <footer className="max-w-7xl mx-auto px-8 py-20 border-t border-white/5 flex flex-wrap justify-between items-center gap-6 text-[10px] text-white/20 font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <ShieldCheck size={12} className="text-brand-blue/40" />
            <span>ALGORITHM VERIFIED | © {AUTHOR_INFO.copyright.year} {AUTHOR_INFO.copyright.owner}</span>
          </div>
          <div className="flex gap-10 italic">
            <span>VERSION 4.2.0</span>
            <Link href="/portfolio" className="hover:text-brand-blue transition-colors">BACK TO ARCHIVE</Link>
          </div>
      </footer>
    </div>
  );
}
