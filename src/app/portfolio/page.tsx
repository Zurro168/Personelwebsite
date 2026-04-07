import React from 'react';
import Link from 'next/link';
import { Search, Calendar, ChevronRight, Activity, Zap, TrendingUp } from 'lucide-react';

const cycleMaps = [
  {
    id: 'copper',
    name: '铜 (Copper)',
    status: '⚠️ 修正期',
    score: 58,
    lastUpdate: '2026-04-07',
    description: '核心观察：库存饱和 vs AI/能源长期刚性。市场正处于估值回归与结构性牛市的博弈中。',
    color: 'border-amber-500'
  },
  {
    id: 'aluminum',
    name: '铝 (Aluminum)',
    status: '🚀 扩张期',
    score: 82,
    lastUpdate: '2026-03-24',
    description: '核心观察：供给红线与光伏/轻量化需求。氧化铝瓶颈持续抬升成本中枢。',
    color: 'border-emerald-500'
  },
  {
    id: 'zircon',
    name: '锆钛 (Zircon & Ti)',
    status: '💎 积累期',
    score: 65,
    lastUpdate: '2026-04-07',
    description: '核心观察：航空航天刚需与供给寡头化。关注高品质矿源的战略溢价。',
    color: 'border-indigo-500'
  }
];

const reports = [
  {
    id: 1,
    title: '去全球化叙事下的铅锌矿供应链重构与地缘政治溢价',
    excerpt: '分析铅锌精矿在全球矿权集中度提升背景下的价格底线，以及区域冲突如何改变传统海运物流链条的风险权重...',
    date: '2026-03-15',
    category: '宏观觉悟',
    tags: ['#供应链', '#地缘政治', '#铅锌矿'],
    slug: 'lead-zinc-supply-chain'
  },
  {
    id: 2,
    title: '硅基采购范式：如何利用 AI 模型优化锰矿长协定价策略',
    excerpt: '从传统的人工经验决策转向基于概率图模型与多智能体博弈的采购策略，详述在锰系合金波动周期中的套期保值应用案例...',
    date: '2026-03-28',
    category: '硅基采购',
    tags: ['#AI实践', '#锰矿', '#采购管理'],
    slug: 'ai-procurement-strategy-manganese'
  }
];

export default function PortfolioPage() {
  return (
    <div className="relative overflow-x-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none -mr-40 -mt-20"></div>

      <main className="max-w-7xl mx-auto px-8 lg:px-12 py-24 relative space-y-32">
        
        {/* Dynamic Column Section */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-12 border-b border-white/5">
            <div className="space-y-6">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] font-black tracking-[0.3em] rounded uppercase font-mono">
                  <Activity size={14} className="animate-pulse" /> Column: Cycle Maps
               </div>
               <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white">金属研判周期地图</h1>
               <p className="text-slate-400 text-xl font-light leading-relaxed max-w-2xl italic">交互式透视：将宏观叙事量化为周期坐标，捕捉每一次结构性拐点。</p>
            </div>
            <div className="hidden lg:flex items-center gap-2 text-white/10 font-mono text-[9px] tracking-widest uppercase pb-2">
                 Updated: APR 07 2026 // Real-time Feed Active
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {cycleMaps.map((map) => (
              <Link key={map.id} href={`/portfolio/cycle-map/${map.id}`} className="group relative">
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-brand-blue/20 to-brand-gold/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500`}></div>
                <div className={`relative bg-slate-900/60 border-l-4 ${map.color} border-t border-r border-b border-white/5 rounded-3xl p-10 backdrop-blur-3xl shadow-xl hover:translate-y-[-4px] transition-all duration-500`}>
                  <div className="flex justify-between items-start mb-8">
                     <div className="space-y-2">
                        <h2 className="text-3xl font-black text-white group-hover:text-brand-blue transition-colors uppercase italic">{map.name}</h2>
                        <div className="text-[10px] font-mono tracking-widest text-white/30 italic">LATEST_SYNC: {map.lastUpdate}</div>
                     </div>
                     <div className="text-4xl font-black text-brand-gold font-mono">{map.score}<span className="text-[10px] text-white/20 italic">/100</span></div>
                  </div>
                  <p className="text-slate-400 text-lg leading-relaxed font-light mb-8 italic">&ldquo;{map.description}&rdquo;</p>
                  <div className="flex items-center justify-between border-t border-white/5 pt-8">
                     <div className="flex items-center gap-4 text-xs font-black text-brand-blue tracking-widest uppercase group-hover:gap-6 transition-all">
                       Open Terminal <ChevronRight size={16} />
                     </div>
                     <div className={`px-4 py-1.5 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-widest ${map.color.replace('border-', 'text-')} group-hover:bg-white/5 transition-colors`}>
                        {map.status}
                     </div>
                  </div>
                </div>
              </Link>
            ))}
            <div className="relative bg-slate-900/20 border border-dashed border-white/10 rounded-3xl p-12 flex flex-col justify-center items-center text-center opacity-50 group hover:opacity-100 transition-opacity">
               <TrendingUp size={48} className="text-white/20 mb-6 group-hover:rotate-12 transition-transform" />
               <h3 className="text-xl font-black text-white/40 mb-2 uppercase italic tracking-widest">More Metals Coming</h3>
               <p className="text-xs text-white/20 font-mono tracking-widest">LITHIUM / NICKEL / IRON_ORE</p>
            </div>
          </div>
        </section>

        {/* Hardcore Reports Section */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-12 border-b border-white/5">
            <div className="space-y-6">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-[10px] font-black tracking-[0.3em] rounded uppercase font-mono">
                  <Zap size={14} className="text-brand-gold" /> Column: Deep Insights
               </div>
               <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white uppercase italic">深度研报归档</h2>
            </div>
            <div className="relative group w-full md:w-[350px]">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-blue transition-all" size={18} />
               <input 
                 type="text" 
                 placeholder="Search reports..."
                 className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-3 px-12 text-[11px] focus:outline-none focus:border-brand-blue transition-all placeholder:text-white/10"
                />
            </div>
          </div>

          <div className="grid gap-12">
            {reports.map((report) => (
              <Link key={report.id} href={`/portfolio/${report.slug}`} className="group relative block animate-in fade-in slide-up duration-500">
                <div className="relative bg-slate-900/40 border border-white/5 rounded-3xl p-10 hover:border-brand-blue/30 transition-all shadow-xl group-hover:translate-x-1 duration-500">
                  <div className="grid lg:grid-cols-[1fr_auto] gap-10">
                    <div className="space-y-6">
                      <div className="flex items-center gap-6 text-[10px] font-black tracking-widest text-white/30 font-mono">
                        <span className="flex items-center gap-2 uppercase tracking-[0.2em]"><Calendar size={14} className="text-brand-blue"/> {report.date}</span>
                        <span className="text-brand-gold bg-brand-gold/5 px-3 py-1 rounded border border-brand-gold/10 tracking-[0.2em] uppercase">{report.category}</span>
                      </div>
                      <h2 className="text-3xl font-black text-white group-hover:text-brand-blue transition-colors tracking-tight italic uppercase">{report.title}</h2>
                      <p className="text-slate-400 text-lg leading-relaxed line-clamp-2 font-light italic">&ldquo;{report.excerpt}&rdquo;</p>
                      <div className="flex items-center gap-4 pt-4">
                         {report.tags.map((t, idx) => (
                           <span key={idx} className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">{t}</span>
                         ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center group-hover:bg-brand-blue group-hover:border-brand-blue transition-all duration-500">
                        <ChevronRight className="text-white group-hover:text-slate-900" size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
