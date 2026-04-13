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
        <section id="hero" className="relative group overflow-hidden">
          <div className="max-w-[1600px] mx-auto px-10 md:px-16 pt-24 pb-32 grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-20 relative z-10">
          <div className="flex flex-col space-y-10">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#38bdf8]"></div>
              <span className="text-cyan-500/60 text-[10px] font-black tracking-[0.4em] uppercase font-mono">Terminal Active / V2.1</span>
            </div>
            
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-[0.05em] text-white mb-2">
                贸易的终局 <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-cyan-400 bg-[length:200%_auto] animate-gradient italic font-serif">算法的起点</span>
              </h1>
              <div className="h-0.5 w-32 bg-gradient-to-r from-cyan-500/80 via-cyan-500/20 to-transparent"></div>
            </div>

            <p className="text-xl text-slate-400 max-w-xl leading-relaxed font-light italic opacity-80">
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
                  <p className="text-cyan-400 font-bold">{'>>'} INITIALIZING_ARCHIVE_NODE...</p>
                  <p className="text-white/70 leading-relaxed italic border-l border-cyan-500/30 pl-3">
                    Mapping global commodity cycles through the lens of algorithmic entropy—calculating price-to-sentiment correlations in real-time.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
                  <div className="space-y-1">
                    <span className="text-white/40 block uppercase tracking-tighter">Vault Sync Status</span>
                    <span className="text-emerald-400 font-bold">READY / 0.04s</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-white/40 block uppercase tracking-tighter">Knowledge Matrix</span>
                    <span className="text-cyan-400 font-bold">ACTIVE / 124 Nodes</span>
                  </div>
                </div>

                {/* CORE_ENGINE_v2: 实时情报流 */}
                <div className="pt-6 border-t border-white/5 space-y-4">
                  <div className="flex justify-between items-center px-1">
                    <div className="text-[8px] text-white/20 uppercase tracking-widest">Global Intelligence Feed</div>
                    <div className="text-[8px] text-cyan-500/60 font-mono italic">REFRESH_RATE: 1.5s</div>
                  </div>
                  
                  <div className="space-y-1.5 bg-black/20 p-3 rounded-lg border border-white/5">
                    {AUTHOR_INFO.systemLogs.slice(0, 3).map((log) => (
                      <div key={log.id} className="flex justify-between items-center text-[8px] font-mono">
                        <span className="text-white/40">{`> ${log.text}`}</span>
                        <span className="text-cyan-500/80 font-bold">{log.status}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-cyan-500/10 p-4 rounded border border-cyan-500/20 flex items-center justify-between group-hover:bg-cyan-500/20 transition-all duration-500">
                    <span className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase italic">Predictive Engine Active</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-1 h-3 bg-cyan-500/40 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background floating element */}
            <div className="absolute -bottom-10 -right-10 opacity-5 grayscale invert">
              <Cpu size={240} />
            </div>
            </div>
          </div>
        </section>


        <section id="connect" className="py-32 relative overflow-hidden bg-[#0a0f1a]">
          {/* Background Decor */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/[0.02] blur-[150px] pointer-events-none"></div>
          
          <div className="max-w-[1600px] mx-auto px-10 md:px-16 relative">
            <div className="space-y-4 max-w-2xl mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black text-cyan-400 tracking-widest uppercase">Digital Identity</span>
              </div>
              <h2 className="text-5xl font-black text-white tracking-tighter leading-tight">
                硅基逻辑下的 <br />
                <span className="text-cyan-500 italic">跨界共鸣</span>
              </h2>
              <p className="text-lg text-slate-400 font-light max-w-lg">
                寻求深度合作、研报授权或系统治理探讨，请通过以下矩阵联系我。
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* 左侧：身份卡片 */}
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
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 space-y-4 relative">
                  <div className="flex items-center justify-between text-[9px] font-mono text-cyan-500/50 uppercase tracking-[0.2em]">
                    <span>SYSTEM_AUDIT_LOG</span>
                    <span className="flex items-center gap-1.5 animate-pulse"><span className="w-1 h-1 bg-emerald-500 rounded-full"></span> LIVE_FEED</span>
                  </div>
                  <div className="space-y-3 opacity-60 text-[10px] font-mono lowercase tracking-tight">
                    {AUTHOR_INFO.systemLogs.map((log) => (
                      <div key={log.id} className="flex justify-between gap-4">
                        <span className="text-white/60">{`> ${log.text}`}</span>
                        <span className="text-cyan-500 font-bold uppercase">{log.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 右侧：社交矩阵 */}
              <div className="grid sm:grid-cols-2 gap-6 items-start">
                <div className="p-8 rounded-3xl bg-slate-900 border border-white/10 hover:border-cyan-500/30 transition-all group relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform"><MessageCircle size={22}/></div>
                    <div>
                       <span className="text-xs font-black text-white block uppercase tracking-tighter">{AUTHOR_INFO.social.wechat.label}</span>
                       <span className="text-[8px] text-slate-600 font-mono tracking-widest uppercase">ENCRYPTED_COMMS</span>
                    </div>
                  </div>
                  <div className="aspect-square bg-white rounded-2xl overflow-hidden p-3 group-hover:scale-[1.02] transition-all duration-500">
                    <img src={AUTHOR_INFO.social.wechat.qrCode} alt="WeChat" className="w-full h-full object-cover" />
                  </div>
                  <p className="mt-8 text-center text-[10px] text-slate-500 font-mono bg-white/5 py-2.5 rounded-xl border border-white/5 uppercase tracking-[0.3em]">ID: {AUTHOR_INFO.social.wechat.id}</p>
                </div>

                <div className="p-8 rounded-3xl bg-slate-900 border border-white/10 hover:border-cyan-500/30 transition-all group relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform"><Rss size={22}/></div>
                    <div>
                       <span className="text-xs font-black text-white block uppercase tracking-tighter">{AUTHOR_INFO.social.officialAccount.label}</span>
                       <span className="text-[8px] text-slate-600 font-mono tracking-widest uppercase">PUBLIC_INTEL</span>
                    </div>
                  </div>
                  <div className="aspect-square bg-white rounded-2xl overflow-hidden p-3 group-hover:scale-[1.02] transition-all duration-500">
                    <img src={AUTHOR_INFO.social.officialAccount.qrCode} alt="Official Account" className="w-full h-full object-cover" />
                  </div>
                  <p className="mt-8 text-center text-[10px] text-slate-500 font-mono bg-white/5 py-2.5 rounded-xl border border-white/5 uppercase tracking-[0.3em]">@{AUTHOR_INFO.social.officialAccount.name}</p>
                </div>

                <a href={AUTHOR_INFO.social.linkedin} target="_blank" className="relative group p-6 rounded-2xl bg-slate-900 border border-white/10 overflow-hidden transition-all hover:bg-slate-800">
                  <div className="absolute inset-y-0 left-0 w-[2px] bg-blue-500 transition-transform scale-y-0 group-hover:scale-y-100"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform"><Share2 size={18}/></div>
                      <div>
                        <span className="block text-xs font-black text-white uppercase tracking-widest leading-none mb-1">LinkedIn</span>
                        <span className="text-[9px] text-slate-600 font-mono">PROFESSIONAL_GRAPH</span>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-slate-700 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </a>

                <a href={AUTHOR_INFO.social.x} target="_blank" className="relative group p-6 rounded-2xl bg-slate-900 border border-white/10 overflow-hidden transition-all hover:bg-slate-800">
                  <div className="absolute inset-y-0 left-0 w-[2px] bg-white transition-transform scale-y-0 group-hover:scale-y-100"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white group-hover:scale-110 transition-transform"><Share2 size={18}/></div>
                      <div>
                        <span className="block text-xs font-black text-white uppercase tracking-widest leading-none mb-1">Twitter / X</span>
                        <span className="text-[9px] text-slate-600 font-mono">GLOBAL_SIGNALS</span>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              </div>
            </div>

            {/* Footer */}
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
