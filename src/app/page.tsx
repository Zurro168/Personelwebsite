import React from 'react';
import Link from 'next/link';
import { Activity, ShieldCheck, Share2, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-x-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="border-b border-industrial-border px-8 py-6 flex justify-between items-center sticky top-0 bg-background/60 backdrop-blur-xl z-50">
        <div className="flex items-center gap-3">
          <Link href="/" className="w-9 h-9 bg-brand-blue rounded shadow-[0_0_15px_rgba(56,189,248,0.3)] flex items-center justify-center text-slate-900 font-black">Si</Link>
          <span className="text-xl font-black tracking-tighter">
            <span className="text-white">硅基大宗</span>
            <span className="text-brand-blue/40 font-light mx-1">|</span>
            <span className="text-brand-blue text-sm uppercase tracking-widest font-mono">Terminal</span>
          </span>
        </div>
        <nav className="hidden md:flex gap-10 text-[11px] font-bold tracking-[0.25em] text-white/50">
          <Link href="/portfolio" className="hover:text-brand-blue transition-all">PORTFOLIO</Link>
          <Link href="/intersection" className="hover:text-brand-blue transition-all">INTERSECTION</Link>
          <Link href="/about" className="hover:text-brand-blue transition-all">ABOUT</Link>
        </nav>
        <button className="hidden lg:flex items-center gap-2 px-6 py-2 border border-brand-blue/30 text-brand-blue text-[10px] font-black tracking-[0.2em] rounded-full hover:bg-brand-blue hover:text-slate-900 transition-all group">
          <Activity size={14} className="group-hover:animate-spin" />
          AI ASSISTANT
        </button>
      </header>

      <main>
        {/* Hero Section */}
        <section className="px-8 py-24 md:py-40 grid lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto relative">
          <div className="space-y-12 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-[11px] font-bold tracking-[0.3em] rounded uppercase font-mono">
              <Zap size={14} className="text-brand-gold animate-pulse" /> Intelligence Hub Active
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-white">
              贸易的终局 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-cyan-300 to-brand-blue bg-[length:200%_auto] animate-gradient italic">算法的起点</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-lg leading-relaxed font-light">
              在这个宏观叙事剧烈波动的时代，我们用硅基逻辑解构碳基贸易，重塑大宗商品的智库范式。
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <Link href="/portfolio" className="px-10 py-4 bg-brand-blue text-slate-900 font-black text-sm tracking-widest rounded hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] transition-all">
                深度研报
              </Link>
              <Link href="/intersection" className="px-10 py-4 border border-white/20 font-black text-sm tracking-widest rounded hover:bg-white/5 transition-all text-white">
                探索实验室
              </Link>
            </div>
          </div>

          {/* Featured Report Card */}
          <div className="relative group animate-in fade-in slide-in-from-right-8 duration-1000">
            <div className="absolute -inset-2 bg-gradient-to-tr from-brand-blue/40 to-brand-gold/40 rounded-3xl blur-2xl opacity-10 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative bg-slate-900/60 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-3xl shadow-2xl">
               <div className="p-12 space-y-8">
                 <div className="flex justify-between items-start">
                   <div className="space-y-1">
                      <span className="text-brand-blue font-black text-[10px] tracking-[0.4em] uppercase font-mono">Insight Preview</span>
                      <div className="h-0.5 w-12 bg-brand-blue"></div>
                   </div>
                   <span className="text-white/30 text-xs font-mono">ID: SCC-2026-004</span>
                 </div>
                 <h2 className="text-3xl font-black text-white leading-tight tracking-tight">2026 铜供给缺口：从智利矿区到高性能算力心脏的传导逻辑</h2>
                 <p className="text-slate-400 text-lg leading-relaxed line-clamp-3 font-light">
                   深度探讨了在全球算力架构升级背景下，高导电率精炼铜的需求爆发如何与传统矿业产量的结构性瓶颈产生共振，并推演了未来的价格策略过程...
                 </p>
                 <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <Link href="/portfolio/cycle-map/copper" className="flex items-center text-brand-blue text-sm font-black gap-3 hover:gap-5 transition-all group-hover:text-cyan-300">
                      查看完整周期地图 <span className="text-xl">→</span>
                    </Link>
                    <div className="flex -space-x-2">
                       {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border border-slate-900 bg-slate-800 flex items-center justify-center text-[8px] font-bold">U{i}</div>)}
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* Dynamic Data Bar */}
        <section className="border-y border-industrial-border bg-slate-900/40 py-6 backdrop-blur-md">
          <div className="flex overflow-hidden gap-20 whitespace-nowrap px-8">
            <div className="flex animate-scroll gap-20">
              {[
                { name: "LME COPPER", price: "12,150.00", delta: "+2.4%" },
                { name: "WTI CRUDE", price: "92.45", delta: "-0.8%" },
                { name: "GOLD (SPOT)", price: "2,465.20", delta: "+0.5%" },
                { name: "SILVER (SPOT)", price: "34.12", delta: "+1.2%" },
                { name: "ALUMINUM", price: "2,640.50", delta: "+0.3%" },
                { name: "NICKEL", price: "18,450", delta: "-2.1%" }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-center group">
                  <span className="text-white/30 font-mono text-[10px] tracking-widest">{item.name}</span>
                  <span className="font-black text-white text-sm tracking-tight">{item.price}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.delta.startsWith('+') ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}>
                    {item.delta}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="px-8 py-32 max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          <Link href="/portfolio" className="group">
            <div className="h-full p-10 border border-white/5 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent hover:border-brand-blue/40 hover:bg-brand-blue/5 transition-all duration-500 relative overflow-hidden">
               <div className="absolute -right-8 -bottom-8 text-brand-blue/5 group-hover:text-brand-blue/10 transition-colors opacity-50"><ShieldCheck size={120} /></div>
               <h3 className="text-2xl font-black text-white mb-6 group-hover:text-brand-blue transition-colors">硬核研报库</h3>
               <p className="text-slate-500 leading-relaxed font-light mb-8 italic text-sm">从矿产源头到工业终端，提供基于数据模型与实地调研的深度分析报告。</p>
               <span className="text-[10px] font-black text-brand-blue tracking-[0.3em] uppercase">Enter Archive &rarr;</span>
            </div>
          </Link>
          <Link href="/intersection" className="group">
            <div className="h-full p-10 border border-white/5 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent hover:border-brand-blue/40 hover:bg-brand-blue/5 transition-all duration-500 relative overflow-hidden">
               <div className="absolute -right-8 -bottom-8 text-brand-blue/5 group-hover:text-brand-blue/10 transition-colors opacity-50"><Share2 size={120} /></div>
               <h3 className="text-2xl font-black text-white mb-6 group-hover:text-brand-blue transition-colors">跨界实验室</h3>
               <p className="text-slate-500 leading-relaxed font-light mb-8 italic text-sm">中医系统论、现代管理哲学与 AI 生产力实践在这个名为交叉点的空间融合。</p>
               <span className="text-[10px] font-black text-brand-blue tracking-[0.3em] uppercase">Explore Nexus &rarr;</span>
            </div>
          </Link>
          <Link href="/about" className="group">
            <div className="h-full p-10 border border-white/5 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent hover:border-brand-blue/40 hover:bg-brand-blue/5 transition-all duration-500 relative overflow-hidden">
               <div className="absolute -right-8 -bottom-8 text-brand-blue/5 group-hover:text-brand-blue/10 transition-colors opacity-50"><Activity size={120} /></div>
               <h3 className="text-2xl font-black text-white mb-6 group-hover:text-brand-blue transition-colors">关于主理人</h3>
               <p className="text-slate-500 leading-relaxed font-light mb-8 italic text-sm">从西交大老兵到全球贸易领域的数字化转型。这是一个关于持续进化的记录。</p>
               <span className="text-[10px] font-black text-brand-blue tracking-[0.3em] uppercase">Read Intel &rarr;</span>
            </div>
          </Link>
        </section>
      </main>

      <footer className="border-t border-industrial-border px-8 py-20 text-center text-white/5 text-[9px] tracking-[0.8em] font-mono uppercase">
        © 2026 SILICON COMMODITY | QUANTUM TRADING HUB | DATA TERMINAL V5.2.0
      </footer>
    </div>
  );
}
