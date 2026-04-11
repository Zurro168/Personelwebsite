'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, ShieldCheck, Share2, Zap, MessageCircle, Rss, ChevronRight, ArrowRight, Cpu } from 'lucide-react';
import { AUTHOR_INFO } from '@/data/biography';
import PriceTicker from '@/components/layout/PriceTicker';

export default function Home() {
  return (
    <div className="relative overflow-x-hidden bg-[#0a0f1a] text-slate-200 min-h-screen">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* 1. Integrated Ticker - Terminal Header Style */}
      <div className="border-b border-white/5 bg-[#0a0f1a]/50 backdrop-blur-sm">
        <PriceTicker />
      </div>

      <main className="relative z-10">
        {/* 2. Hero Section - Strategic Spacing & Balanced Grid */}
        <section id="hero" className="px-8 pt-24 pb-32 max-w-7xl mx-auto relative grid lg:grid-cols-2 items-center gap-16">
          <div className="flex flex-col space-y-10">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#38bdf8]"></div>
              <span className="text-cyan-500/60 text-[10px] font-black tracking-[0.4em] uppercase font-mono">Terminal Active / V2.1</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter text-white">
                贸易的终局 <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-cyan-400 bg-[length:200%_auto] animate-gradient italic font-serif">算法的起点</span>
              </h1>
              <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-transparent"></div>
            </div>

            <p className="text-xl text-slate-400 max-w-lg leading-relaxed font-light italic opacity-80">
              {AUTHOR_INFO.motto}
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <Link href="/portfolio" className="group px-10 py-4 bg-cyan-500 text-slate-900 font-black text-sm tracking-widest rounded hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] transition-all flex items-center gap-2">
                进入研报库 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/intersection" className="px-10 py-4 border border-white/10 font-black text-sm tracking-widest rounded hover:bg-white/5 transition-all text-white">
                跨界实验室
              </Link>
            </div>
          </div>

          {/* 3. Decorative Terminal Element - Fills the Right Void */}
          <div className="hidden lg:block relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-transparent blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative bg-slate-900/60 border border-white/5 p-10 rounded shadow-2xl backdrop-blur-md">
              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500/50"></div>
                </div>
                <span className="text-[9px] font-mono text-cyan-500/40 tracking-[0.3em]">CORE_ENGINE_v2</span>
              </div>
              
              <div className="space-y-6 font-mono text-[10px]">
                <div className="space-y-2">
                  <p className="text-cyan-500/80">{'['} INFRASTRUCTURE SECURED {']'}</p>
                  <p className="text-white/40 leading-relaxed italic">
                    Mapping global commodity cycles through the lens of algorithmic entropy...
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div className="space-y-1">
                    <span className="text-white/20 block uppercase">Latency</span>
                    <span className="text-cyan-500">14.2ms</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-white/20 block uppercase">Stability</span>
                    <span className="text-emerald-500">99.98%</span>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded border border-white/5 flex items-center justify-between group-hover:border-cyan-500/30 transition-colors">
                  <span className="text-white/40 tracking-tighter italic">Predictive Mode</span>
                  <Activity size={12} className="text-cyan-500 animate-pulse" />
                </div>
              </div>
            </div>
            
            {/* Background floating element */}
            <div className="absolute -bottom-10 -right-10 opacity-5 grayscale invert">
              <Cpu size={240} />
            </div>
          </div>
        </section>

        {/* 4. Core Matrix (Features) */}
        <section id="features" className="px-8 py-32 max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link href="/portfolio" className="group p-10 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-cyan-500/30 transition-all duration-500 hover:bg-white/[0.02]">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 mb-8 group-hover:scale-110 transition-transform">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">硬核研报库</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-light italic">提供基于数据模型与实地调研的大宗商品深度分析报告。</p>
          </Link>

          <Link href="/intersection" className="group p-10 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-cyan-500/30 transition-all duration-500 hover:bg-white/[0.02]">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-8 group-hover:scale-110 transition-transform">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">跨界实验室</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-light italic">中医系统论与现代管理哲学在数字时代的耦合实践。</p>
          </Link>

          <Link href="/about" className="group p-10 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-cyan-500/30 transition-all duration-500 hover:bg-white/[0.02]">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-8 group-hover:scale-110 transition-transform">
              <Activity size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">关于主理人</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-light italic">从西交大老兵到全球贸易领域的数字化转型记录。</p>
          </Link>
        </section>

        {/* 5. Contact Section */}
        <section id="connect" className="px-8 py-32 bg-gradient-to-b from-transparent to-cyan-950/10 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-24 items-start">
              <div className="space-y-12">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black text-cyan-400 tracking-widest uppercase">Digital Identity</span>
                  </div>
                  <h2 className="text-5xl font-black text-white tracking-tighter leading-tight">
                    硅基逻辑下的 <br />
                    <span className="text-cyan-500 italic">跨界共鸣</span>
                  </h2>
                  <p className="text-lg text-slate-400 font-light max-w-md">
                    寻求深度合作、研报授权或系统治理探讨，请通过以下矩阵联系我。
                  </p>
                </div>

                <div className="p-10 rounded-3xl bg-slate-900/50 border border-white/10 relative overflow-hidden group shadow-2xl backdrop-blur-sm">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl -mr-16 -mt-16"></div>
                  <div className="flex items-center gap-6 mb-10 relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-600 to-cyan-400 p-0.5 flex items-center justify-center">
                      <div className="w-full h-full bg-[#0a0f1a] rounded-[14px] flex items-center justify-center text-3xl font-black text-cyan-400">
                        {AUTHOR_INFO.name.substring(0,2)}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white leading-none mb-2">{AUTHOR_INFO.name}</h3>
                      <p className="text-cyan-500/60 font-mono text-[10px] tracking-widest uppercase">{AUTHOR_INFO.title}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 relative">
                    <div className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-xs text-slate-500">领域 / Focus</span>
                      <span className="text-xs text-white font-bold">{AUTHOR_INFO.focus[0]}</span>
                    </div>
                    <div className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-xs text-slate-500">坐标 / Location</span>
                      <span className="text-xs text-white font-bold tracking-tight">{AUTHOR_INFO.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 pt-2">
                      {AUTHOR_INFO.tags.map(tag => (
                        <span key={tag} className="text-[9px] px-3 py-1 bg-cyan-500/5 border border-cyan-500/10 rounded uppercase text-cyan-400 font-mono">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-8 rounded-2xl bg-slate-900 border border-white/10 hover:border-cyan-500/30 transition-all group shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><MessageCircle size={20}/></div>
                    <span className="text-sm font-bold text-white">{AUTHOR_INFO.social.wechat.label}</span>
                  </div>
                  <div className="aspect-square bg-white rounded-xl overflow-hidden p-2 group-hover:scale-[1.02] transition-transform">
                    <img 
                      src={AUTHOR_INFO.social.wechat.qrCode} 
                      alt="Personal WeChat" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${AUTHOR_INFO.social.wechat.id}`;
                      }}
                    />
                  </div>
                  <p className="mt-4 text-center text-[10px] text-slate-500 font-mono uppercase tracking-widest">ID: {AUTHOR_INFO.social.wechat.id}</p>
                </div>

                <div className="p-8 rounded-2xl bg-slate-900 border border-white/10 hover:border-cyan-500/30 transition-all group shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400"><Rss size={20}/></div>
                    <span className="text-sm font-bold text-white">{AUTHOR_INFO.social.officialAccount.label}</span>
                  </div>
                  <div className="aspect-square bg-white rounded-xl overflow-hidden p-2 group-hover:scale-[1.02] transition-transform">
                    <img 
                      src={AUTHOR_INFO.social.officialAccount.qrCode} 
                      alt="Official Account" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="mt-4 text-center text-[10px] text-slate-500 font-mono uppercase tracking-widest">@{AUTHOR_INFO.social.officialAccount.name}</p>
                </div>

                <a href={AUTHOR_INFO.social.linkedin} target="_blank" className="flex items-center justify-between p-6 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[#0077b5]/50 transition-all group">
                  <div className="flex items-center gap-3">
                    <Share2 className="text-slate-500 group-hover:text-[#0077b5]" size={20} />
                    <span className="text-sm font-medium">LinkedIn Profile</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
                </a>

                <a href={AUTHOR_INFO.social.x} target="_blank" className="flex items-center justify-between p-6 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/30 transition-all group">
                  <div className="flex items-center gap-3">
                    <Share2 className="text-slate-500 group-hover:text-white" size={20} />
                    <span className="text-sm font-medium">Twitter / X</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Minimal Copyright Line */}
            <footer className="mt-40 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-white/20 font-mono tracking-widest uppercase">
              <div className="flex items-center gap-3">
                <ShieldCheck size={12} className="text-cyan-500/40" />
                <span>© {AUTHOR_INFO.copyright.year} {AUTHOR_INFO.copyright.owner} | {AUTHOR_INFO.copyright.notice.split('。')[0]}</span>
              </div>
              <div className="flex gap-10">
                <Link href="/portfolio" className="hover:text-cyan-500 transition-colors">ARCHIVE</Link>
                <Link href="/about" className="hover:text-cyan-500 transition-colors">IP GUIDE</Link>
                <span className="text-white/10 italic">TERMINAL V4.0</span>
              </div>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
