'use client';

import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

// --- Data Constants ---
const factionData: any = {
  'A': {
    title: "A. 守成与兼并派",
    companies: "BHP (必和必拓), Anglo American (英美资源)",
    description: "依靠极强的资产负债表，在存量市场进行“大卫收购歌利亚”式的兼并（例如 BHP 对 Anglo American 的持续渗透）。",
    logic: "规避长达15年的新矿勘探风险，直接买入已经投产的可预测资产，将财务优势转化为资源储备。",
    chartData: [95, 10, 20, 30, 80],
    color: 'rgba(75, 85, 99, 0.8)',
    borderColor: 'rgb(75, 85, 99)'
  },
  'B': {
    title: "B. 供应链垂直整合派",
    companies: "紫金矿业, 洛阳钼业",
    description: "中国背景巨头展现极强的“建设者姿态”。不仅在刚果金（DRC）和非洲其他地区持续投入原矿，更开始向冶炼、材料端深度延伸。",
    logic: "【硅基点评】：其战略韧性在于“逆周期投入”。在西方巨头因为 ESG 压力回撤时，正是他们逢低拿地的最佳时机，并建立全产业链优势规避单一环节风险。",
    chartData: [40, 80, 95, 60, 95],
    color: 'rgba(180, 83, 9, 0.8)',
    borderColor: 'rgb(180, 83, 9)'
  },
  'C': {
    title: "C. 电池金属激进派",
    companies: "Glencore (嘉能可), Vale (淡水河谷)",
    description: "彻底的结构重组。Glencore 正剥离传统煤炭业务疯狂押注镍和钴。Vale 则引入主权基金，试图剥离基础金属业务独立上市。",
    logic: "迎合资本市场偏好，释放“能源金属”的高估值溢价，摆脱传统矿业周期束缚的激进转型。",
    chartData: [20, 50, 40, 100, 40],
    color: 'rgba(16, 185, 129, 0.8)',
    borderColor: 'rgb(16, 185, 129)'
  }
};

export default function MiningReport() {
  const breadcrumbs = [
      { name: '深度研报', href: '/portfolio' },
      { name: '2026 矿业大博弈', href: '/portfolio/mining-2026' }
  ];
  const [activeView, setActiveView] = useState('macro');
  const [activeFaction, setActiveFaction] = useState('A');
  const macroChartRef = useRef<HTMLCanvasElement>(null);
  const radarChartRef = useRef<HTMLCanvasElement>(null);
  const macroInstance = useRef<any>(null);
  const radarInstance = useRef<any>(null);

  useEffect(() => {
    // Initialize Macro Chart
    if (activeView === 'macro' && macroChartRef.current) {
        if (macroInstance.current) macroInstance.current.destroy();
        macroInstance.current = new Chart(macroChartRef.current, {
            type: 'bar',
            data: {
                labels: ['过去二十年\n(中国基建驱动)', '2026 及未来\n(能源转型驱动)'],
                datasets: [
                    {
                        label: '铁矿石 (Iron Ore) 战略投入意愿',
                        data: [90, 35],
                        backgroundColor: 'rgba(120, 113, 108, 0.7)',
                        borderColor: 'rgb(120, 113, 108)',
                        borderWidth: 1,
                        borderRadius: 4
                    },
                    {
                        label: '铜及新能源金属 (Copper/Energy Metals)',
                        data: [30, 95],
                        backgroundColor: 'rgba(180, 83, 9, 0.8)',
                        borderColor: 'rgb(180, 83, 9)',
                        borderWidth: 1,
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top', labels: { usePointStyle: true, boxWidth: 8 } } },
                scales: {
                    y: { beginAtZero: true, max: 100, title: { display: true, text: '战略资源分配权重 (概念值)' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    // Initialize Radar Chart
    if (activeView === 'factions' && radarChartRef.current) {
        const data = factionData[activeFaction];
        if (radarInstance.current) radarInstance.current.destroy();
        radarInstance.current = new Chart(radarChartRef.current, {
            type: 'radar',
            data: {
                labels: ['买入存量资产偏好', '新矿勘探意愿', '下游冶炼垂直整合', '纯净新能源金属押注', '逆周期投资抗压能力'],
                datasets: [{
                    label: '当前焦点阵营',
                    data: data.chartData,
                    backgroundColor: data.color,
                    borderColor: data.borderColor,
                    pointBackgroundColor: data.borderColor,
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { 
                    r: { 
                        angleLines: { color: 'rgba(214, 211, 209, 0.5)' }, 
                        min: 0, 
                        max: 100, 
                        ticks: { display: false } 
                    } 
                }
            }
        });
    }
  }, [activeView, activeFaction]);

  const f = factionData[activeFaction];

  return (
    <div className="bg-[#fdfbf7] min-h-screen text-stone-900 font-sans">
      {/* Header & Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-1">
               <Breadcrumbs items={breadcrumbs} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-stone-800">硅基洞察 <span className="text-amber-700">.</span></h1>
              <p className="text-xs text-stone-500 uppercase tracking-widest">2026 全球矿业战略大博弈</p>
            </div>
          </div>
          <nav className="flex space-x-6 mt-4 md:mt-0">
            {['macro', 'factions', 'action'].map((v, i) => (
              <button 
                key={v}
                onClick={() => setActiveView(v)}
                className={`pb-1 text-sm font-bold transition-all ${activeView === v ? 'border-b-2 border-amber-700 text-amber-700' : 'text-stone-500 hover:text-stone-800'}`}
              >
                {['1. 宏观轴心', '2. 三大阵营', '3. 地缘与策略'][i]}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {activeView === 'macro' && (
          <section className="animate-in fade-in duration-500">
            <div className="max-w-3xl mb-12">
              <h2 className="text-4xl font-black mb-6">从“铁”到“铜”的历史性偏移</h2>
              <p className="text-stone-600 text-lg leading-relaxed">过去二十年的矿业增长由铁矿石驱动；而在2026年，能源转型的物理限制让铜成为了新的“物理货币”。</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
              <div className="h-[400px]"><canvas ref={macroChartRef}></canvas></div>
              <div className="space-y-6">
                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                  <h3 className="font-bold text-amber-900 mb-2">📈 铜：新时代的“原油”</h3>
                  <p className="text-sm text-amber-800">巨头们正通过并购直接获取存量铜资源，因为环保审批导致新矿开发周期已超过 15 年。</p>
                </div>
                <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
                  <h3 className="font-bold text-stone-800 mb-2">📉 铁矿石：战略优先级下降</h3>
                  <p className="text-sm text-stone-500">面对需求的结构性洗牌，铁矿石已不再是 Capex 分配的唯一宠儿。</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeView === 'factions' && (
          <section className="animate-in fade-in duration-500">
            <h2 className="text-4xl font-black mb-12">三大流派的战略对峙</h2>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                {Object.keys(factionData).map(id => (
                  <button 
                    key={id}
                    onClick={() => setActiveFaction(id)}
                    className={`w-full text-left p-6 rounded-2xl border transition-all ${activeFaction === id ? 'bg-white border-amber-600 shadow-md ring-1 ring-amber-600' : 'bg-stone-50 border-transparent hover:bg-stone-100'}`}
                  >
                    <div className="font-bold text-lg">{factionData[id].title}</div>
                    <div className="text-xs text-stone-400 mt-1">{factionData[id].companies}</div>
                  </button>
                ))}
              </div>
              <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-stone-100 shadow-sm flex flex-col">
                <div className="mb-8 border-l-4 border-amber-700 pl-6">
                  <h4 className="text-2xl font-bold mb-2">{f.title}</h4>
                  <p className="text-stone-600 mb-4">{f.description}</p>
                  <p className="text-sm font-medium bg-stone-50 p-4 rounded-xl text-stone-700">核心逻辑：{f.logic}</p>
                </div>
                <div className="h-[350px]"><canvas ref={radarChartRef}></canvas></div>
              </div>
            </div>
          </section>
        )}

        {activeView === 'action' && (
          <section className="grid md:grid-cols-2 gap-12 animate-in fade-in duration-500">
             <div className="bg-stone-900 text-stone-100 p-10 rounded-3xl">
                <h3 className="text-2xl font-bold text-amber-500 mb-6 font-mono">资源民族主义 2.0</h3>
                <p className="text-stone-400 leading-relaxed">资源国政府不再满足于税收分红，正强制要求“本国化冶炼”，这将极大拉高巨头们的门槛。</p>
             </div>
             <div className="space-y-6">
                <div className="p-8 bg-emerald-50 rounded-3xl border border-emerald-100">
                   <h4 className="font-bold text-emerald-900 mb-2">1. 现金流确定性</h4>
                   <p className="text-emerald-800 text-sm">关注那些在行业低迷期仍能保持稳定 Capex 投入的公司。</p>
                </div>
                <div className="p-8 bg-white rounded-3xl border border-stone-100 shadow-sm">
                   <h4 className="font-bold text-stone-800 mb-2">2. 并购溢价风险</h4>
                   <p className="text-stone-500 text-sm">高溢价并购可能产生商誉泡沫，短期打压股价，但长期构筑护城河。</p>
                </div>
             </div>
          </section>
        )}
      </main>

      <footer className="py-12 border-t border-stone-200 text-center text-stone-400 text-sm">
        © 2026 硅基洞察 产业观察部. Data Interactive Report.
      </footer>
    </div>
  );
}
