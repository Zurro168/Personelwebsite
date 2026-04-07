'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { ChevronLeft, TrendingUp, Cpu } from 'lucide-react';
import { cycleMaps } from '@/data/cycle-maps';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function GenericCycleMap() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : 'copper';
  const data = cycleMaps[slug];

  // Chart.js defaults set once
  useEffect(() => {
    ChartJS.defaults.color = '#94a3b8';
    ChartJS.defaults.font.family = "'Inter', 'PingFang SC', sans-serif";
  }, []);

  if (!data) {
    return notFound();
  }

  // Prep Data
  const scoreData = {
    labels: ['宏观环境', '需求动能', '库存水位', '供应潜力'],
    datasets: [{
      label: '评分 (100分制)',
      data: [data.scores.macro, data.scores.demand, data.scores.inventory, data.scores.supply],
      backgroundColor: [
        'rgba(244, 63, 94, 0.8)',
        'rgba(52, 211, 153, 0.8)',
        'rgba(244, 63, 94, 0.8)',
        'rgba(245, 158, 11, 0.8)'
      ],
      borderColor: [
        'rgba(244, 63, 94, 1)',
        'rgba(52, 211, 153, 1)',
        'rgba(244, 63, 94, 1)',
        'rgba(245, 158, 11, 1)'
      ],
      borderWidth: 1,
      borderRadius: 6
    }]
  };

  const inventoryData = {
    labels: data.inventory.labels,
    datasets: [
      {
        label: '全球库存 (kT)',
        data: data.inventory.inventoryData,
        borderColor: '#f43f5e',
        backgroundColor: 'rgba(244, 63, 94, 0.1)',
        fill: true,
        yAxisID: 'y',
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: '#f43f5e'
      },
      {
        label: data.priceSymbol,
        data: data.inventory.priceData,
        borderColor: '#38bdf8',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        yAxisID: 'y1',
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: '#38bdf8'
      }
    ]
  };

  const demandData = {
    labels: data.demand.labels,
    datasets: [{
      data: data.demand.data,
      backgroundColor: ['#38bdf8', '#34d399', '#64748b', '#475569'],
      borderColor: '#0b1120',
      borderWidth: 4,
      hoverOffset: 10
    }]
  };

  const roadmapSteps = [
    { emoji: "🌪️", title: "宏观环境", detail: data.roadmap.macro, color: "text-rose-400" },
    { emoji: "⚡", title: "需求动能", detail: data.roadmap.demand, color: "text-emerald-400" },
    { emoji: "📦", title: "库存水平", detail: data.roadmap.inventory, color: "text-amber-500" },
    { emoji: "💲", title: "价格反应", detail: data.roadmap.price, color: "text-slate-300" },
    { emoji: "⛏️", title: "供应周期", detail: data.roadmap.supply, color: "text-slate-300" }
  ];

  return (
    <div className="relative overflow-x-hidden">
      {/* Sub-Header for Navigation Back */}
      <div className="bg-slate-900/40 backdrop-blur-md border-b border-white/5 px-8 py-4 flex justify-between items-center sticky top-[80px] z-40">
        <div className="flex items-center gap-4">
          <Link href="/portfolio" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-blue hover:text-slate-900 transition-all">
            <ChevronLeft size={16} />
          </Link>
          <span className="font-bold text-sm tracking-tight text-white/40 uppercase font-mono">
            Terminal <span className="mx-1">/</span> <span className="text-white">{data.name.split(' ')[0]}</span>
          </span>
        </div>
        <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest font-mono">ID: {slug.toUpperCase()}-TERMINAL-SYNC</div>
      </div>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16">
        <div className="mb-20 space-y-4">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none">
            {data.name.split(' ')[0]} <span className="bg-gradient-to-r from-brand-blue via-cyan-300 to-brand-blue bg-clip-text text-transparent animate-gradient italic">周期地图</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl font-light italic leading-relaxed">
            &ldquo;{data.description}&rdquo;
          </p>
        </div>

        {/* HUD Score Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 mb-16">
          <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-3xl p-10 flex flex-col justify-center items-center text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold/50 shadow-[0_0_10px_rgba(251,191,36,0.3)]"></div>
            <h2 className="text-slate-500 text-xs font-black uppercase tracking-[0.4em] mb-6 font-mono">Aggregate Cycle Score</h2>
            <div className="text-9xl font-black text-brand-gold mb-6 drop-shadow-[0_0_20px_rgba(251,191,36,0.2)] font-mono">{data.score}<span className="text-2xl text-white/10 italic">/100</span></div>
            <div className={`inline-flex items-center justify-center px-8 py-3 rounded-xl border border-brand-gold/30 bg-brand-gold/5 text-brand-gold font-black text-sm mb-6 tracking-widest`}>
              {data.status}
            </div>
            <div className="text-[10px] text-white/20 font-mono tracking-widest italic flex items-center gap-2">
              <TrendingUp size={12} className={data.score > data.lastScore ? 'text-emerald-500' : 'text-rose-500'} /> 
              Prev: {data.lastScore} {'//'} Trend: {data.score > data.lastScore ? 'UPWARD' : 'NEUTRAL_SHIFT'}
            </div>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-3xl p-10 shadow-2xl flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-white flex items-center gap-3 font-mono italic uppercase tracking-tight">
                 <span className="w-1.5 h-6 bg-brand-blue"></span> Core Pillar Analysis
              </h2>
            </div>
            <div className="flex-grow min-h-[300px]">
              <Bar 
                data={scoreData} 
                options={{
                  indexAxis: 'y',
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: { 
                    x: { beginAtZero: true, max: 100, grid: { color: 'rgba(56, 189, 248, 0.05)' } },
                    y: { grid: { display: false }, ticks: { font: { weight: 'bold', size: 12 } } }
                  }
                }} 
              />
            </div>
          </div>
        </div>

        {/* Global Inventory Deep Dive */}
        <div className="mb-16 bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-3xl p-12 shadow-2xl overflow-hidden relative">
          <div className="absolute left-0 top-0 w-1.5 h-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]"></div>
          <div className="space-y-4 mb-10">
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase font-mono">Inventory Saturation & Price Equilibrium</h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-4xl font-light">
              通过对全球 LME / SHFE / COMEX 显性库存数据与基准价格的拟合分析，我们观察到当前节点下的博弈核心已经转向跨区域溢价与结构性短缺的背离趋势。
            </p>
          </div>
          <div className="h-[450px]">
            <Line 
              data={inventoryData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: { legend: { position: 'top', labels: { usePointStyle: true, font: { weight: 'bold' } } } },
                scales: {
                  y: { type: 'linear', position: 'left', title: { display: true, text: 'Stock (kT)', color: '#f43f5e', font: { weight: 'bold' } } },
                  y1: { type: 'linear', position: 'right', grid: { display: false }, title: { display: true, text: 'Price (USD)', color: '#38bdf8', font: { weight: 'bold' } } }
                }
              }}
            />
          </div>
        </div>

        {/* Split Section: Demand & Triage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-10 shadow-2xl group overflow-hidden">
            <h2 className="text-2xl font-black text-white mb-8 italic uppercase tracking-tight flex items-center gap-3">
               <span className="w-1.5 h-6 bg-brand-blue"></span> Structural Demand Gap
            </h2>
            <div className="h-[350px]">
              <Doughnut 
                data={demandData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: '65%',
                  plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 30, font: { size: 10, weight: 'bold' } } } }
                }}
              />
            </div>
          </div>

          <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-10 shadow-2xl flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5"><Cpu size={150} /></div>
            <h2 className="text-2xl font-black text-white mb-8 italic uppercase tracking-tight flex items-center gap-3">
               <span className="w-1.5 h-6 bg-brand-gold"></span> Strategic Protocols
            </h2>
            <div className="space-y-6 flex-grow">
              {[
                { label: "Short-Term Strategy", text: data.strategy.shortTerm, color: "text-rose-400" },
                { label: "Pivot Support Level", text: data.strategy.supportLevel, color: "text-emerald-400" },
                { label: "Enterprise Protocol", text: data.strategy.enterprise, color: "text-brand-blue" }
              ].map((s, i) => (
                <div key={i} className="bg-slate-950/50 rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors">
                  <div className={`${s.color} font-black text-[10px] mb-2 uppercase tracking-[0.3em] font-mono italic`}>Protocol_0{i+1}: {s.label}</div>
                  <div className="text-slate-300 text-sm leading-relaxed">{s.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cycle Flow Map */}
        <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-12 shadow-2xl mb-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-blue/5 blur-[100px] pointer-events-none"></div>
            <h2 className="text-2xl font-black mb-12 text-white italic text-center uppercase tracking-widest relative">Current Cycle Position Flow</h2>
            <div className="flex flex-col md:flex-row items-stretch justify-between gap-6 relative">
                {roadmapSteps.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <div className={`flex-1 bg-slate-950 border ${idx === data.roadmap.currentPos ? 'border-brand-gold shadow-[0_0_30px_rgba(251,191,36,0.3)]' : 'border-white/5'} rounded-2xl p-8 text-center relative group transition-all duration-500`}>
                        {idx === data.roadmap.currentPos && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-gold text-slate-900 text-[9px] font-black px-4 py-1 rounded-full animate-pulse tracking-[0.2em]">CURRENT_POS</div>}
                        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{step.emoji}</div>
                        <div className={`font-black text-sm ${step.color} mb-1 tracking-tight`}>{step.title}</div>
                        <div className="text-[10px] text-white/20 uppercase tracking-widest font-mono italic">{step.detail}</div>
                    </div>
                    {idx < 4 && <div className="flex items-center justify-center text-white/10 hidden md:flex font-mono text-xl">➔</div>}
                  </React.Fragment>
                ))}
            </div>
        </div>
      </main>
    </div>
  );
}
