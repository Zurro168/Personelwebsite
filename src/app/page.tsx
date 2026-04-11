import React from 'react';
import Link from 'next/link';
import { Activity, ShieldCheck, Share2, Zap } from 'lucide-react';
import { AUTHOR_INFO } from '@/data/biography';
import PriceTicker from '@/components/layout/PriceTicker';
import TableOfContents from '@/components/TableOfContents';

export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Node-based Progress Tracker */}
      <TableOfContents content="" />

      {/* Hero Section */}
      <section id="hero" className="px-8 py-24 md:py-40 grid lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto lg:pr-96 relative content-center min-h-[70vh]">
        <div className="space-y-12 animate-in fade-in slide-in-from-left-8 duration-1000">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse shadow-[0_0_8px_#38bdf8]"></div>
            <span className="text-brand-blue/60 text-[10px] font-black tracking-[0.4em] uppercase font-mono">Terminal Active</span>
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
                  <Link href="/cycle-map/copper" className="flex items-center text-brand-blue text-sm font-black gap-3 hover:gap-5 transition-all group-hover:text-cyan-300">
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

      {/* Dynamic Data Bar (LIVE) */}
      <PriceTicker />

      {/* Feature Grid */}
      <section id="features" className="px-8 py-32 max-w-7xl mx-auto lg:pr-96 grid md:grid-cols-3 gap-10">
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
      {/* Personal Branding & Connect Section */}
      <section id="connect" className="px-8 py-24 max-w-7xl mx-auto lg:pr-96 border-t border-white/5 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20">
              <span className="w-1.5 h-1.5 bg-brand-blue rounded-full"></span>
              <span className="text-[10px] font-black text-brand-blue tracking-widest uppercase">Digital Identity</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              链接思维 <br />
              <span className="text-slate-500">共建大宗商品的硅基未来</span>
            </h2>
            <p className="text-slate-400 text-lg font-light leading-relaxed max-w-md">
              这里不仅是报告的终点，更是深度连接的起点。欢迎探讨数据治理、大宗套利与系统演化。
            </p>
            
            {/* Social Matrix */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-blue/50 hover:bg-brand-blue/5 transition-all group relative overflow-hidden cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-brand-blue/20 transition-colors">
                    <Share2 className="text-slate-400 group-hover:text-brand-blue" size={20} />
                  </div>
                </div>
                <h4 className="text-white font-bold mb-1">{AUTHOR_INFO.social.wechat.label}</h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">{AUTHOR_INFO.social.wechat.id}</p>
                <div className="absolute right-[-10px] bottom-[-10px] opacity-10 group-hover:opacity-20 transition-opacity">
                  <Activity size={80} />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-blue/50 hover:bg-brand-blue/5 transition-all group relative overflow-hidden cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-brand-blue/20 transition-colors">
                    <Zap className="text-slate-400 group-hover:text-brand-blue" size={20} />
                  </div>
                </div>
                <h4 className="text-white font-bold mb-1">{AUTHOR_INFO.social.officialAccount.label}</h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">{AUTHOR_INFO.social.officialAccount.name}</p>
              </div>

              <a href={AUTHOR_INFO.social.linkedin} target="_blank" className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-[#0077b5]/50 hover:bg-[#0077b5]/5 transition-all group relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-[#0077b5]/20 transition-colors">
                    <ShieldCheck className="text-slate-400 group-hover:text-[#0077b5]" size={20} />
                  </div>
                </div>
                <h4 className="text-white font-bold mb-1">LinkedIn</h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">Explore Profile</p>
              </a>

              <a href={AUTHOR_INFO.social.x} target="_blank" className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/50 hover:bg-white/5 transition-all group relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Zap className="text-slate-400 group-hover:text-white" size={20} />
                  </div>
                </div>
                <h4 className="text-white font-bold mb-1">X / Twitter</h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">Intelligence Feed</p>
              </a>
            </div>
          </div>

          {/* IP Card / Visual Anchor */}
          <div className="relative">
            <div className="absolute -inset-4 bg-brand-blue/10 blur-3xl opacity-50 rounded-full"></div>
            <div className="relative p-10 rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-xl">
               <div className="space-y-6">
                 <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-brand-blue to-cyan-500 flex items-center justify-center text-4xl font-black text-slate-900 shadow-[0_0_30px_rgba(56,189,248,0.3)]">
                      {AUTHOR_INFO.name.substring(0,2)}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-black text-white leading-none whitespace-nowrap">{AUTHOR_INFO.name}</h3>
                      <p className="text-brand-blue font-mono text-[10px] tracking-[0.2em] uppercase">Status: Evolution Active</p>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                       <span className="text-xs text-slate-400">领域 Focus</span>
                       <span className="text-xs text-white font-black italic">{AUTHOR_INFO.focus[0]}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                       <span className="text-xs text-slate-400">坐标 Location</span>
                       <span className="text-xs text-white font-black">{AUTHOR_INFO.location}</span>
                    </div>
                    <div className="pt-4 flex flex-wrap gap-2">
                       {AUTHOR_INFO.tags.map(tag => (
                         <span key={tag} className="text-[9px] px-2 py-1 border border-white/10 rounded uppercase tracking-wider text-slate-500 font-mono">{tag}</span>
                       ))}
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
