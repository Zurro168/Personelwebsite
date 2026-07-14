'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Rss } from 'lucide-react';
import { AUTHOR_INFO } from '@/data/biography';
import { ALL_REPORTS } from '@/data/reports';
import PriceTicker from '@/components/layout/PriceTicker';

export default function Home() {
  return (
    <div className="relative overflow-x-hidden bg-[#0a0f1a] text-slate-200 min-h-screen">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* 1. Integrated Ticker */}
      <div className="border-b border-white/5 bg-[#0a0f1a]/50 backdrop-blur-sm">
        <PriceTicker />
      </div>

      <main className="relative z-10">
        {/* 2. Hero Section — simplified terminal panel */}
        <section id="hero" className="relative">
          <div className="max-w-7xl mx-auto px-8 pt-24 pb-32 grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-20 relative z-10">
            <div className="flex flex-col space-y-10">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#38bdf8]"></div>
                <span className="text-cyan-500/60 text-[10px] font-black tracking-[0.4em] uppercase font-mono">Silicon Commodity / V2.1</span>
              </div>

              <div className="space-y-8">
                <h1 className="text-5xl md:text-7xl font-black leading-[1.15] tracking-tighter text-white mb-2">
                  贸易的终局 <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-cyan-400 bg-[length:200%_auto] animate-gradient italic">算法的起点</span>
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

            {/* Simplified right panel — key metrics only */}
            <div className="hidden lg:block relative">
              <div className="relative bg-slate-900/60 border border-white/5 p-10 rounded shadow-2xl backdrop-blur-md">
                <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
                  <span className="text-[9px] font-mono text-cyan-500/40 tracking-[0.3em]">INSIGHT ENGINE</span>
                </div>

                <div className="space-y-6 font-mono text-xs">
                  <p className="text-white/70 leading-relaxed italic border-l border-cyan-500/30 pl-3">
                    Mapping global commodity cycles through the lens of algorithmic entropy — calculating price-to-sentiment correlations in real-time.
                  </p>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
                    <div className="space-y-1">
                      <span className="text-white/40 block uppercase tracking-tighter">Reports</span>
                      <span className="text-emerald-400 font-bold">{ALL_REPORTS.length} Active</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-white/40 block uppercase tracking-tighter">Focus</span>
                      <span className="text-cyan-400 font-bold">Commodities</span>
                    </div>
                  </div>

                  <div className="space-y-2 bg-black/20 p-3 rounded-lg border border-white/5">
                    {AUTHOR_INFO.focus.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-[10px] font-mono">
                        <div className="w-1 h-1 bg-cyan-500 rounded-full"></div>
                        <span className="text-white/50">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Connect / Social Matrix */}
        <section id="connect" className="py-32 relative overflow-hidden bg-[#0a0f1a]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/[0.02] blur-[150px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-8 relative">
            <div className="space-y-4 max-w-2xl mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black text-cyan-400 tracking-widest uppercase">Digital Identity</span>
              </div>
              <h2 className="text-5xl font-black text-white tracking-tighter leading-tight">
                硅基逻辑下的 <br />
                <span className="text-cyan-500 italic">跨界共鸣</span>
              </h2>
              <p className="text-lg text-slate-400 font-light max-w-lg leading-relaxed">
                本网站为公众号「硅基大宗」的互补平台，承载交互式图表与深度数据。若需深度合作、研报授权或系统治理探讨，请通过以下矩阵联系我。
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left: Identity Card */}
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
                    <p className="text-cyan-500/70 font-mono text-xs tracking-widest uppercase">{AUTHOR_INFO.title}</p>
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
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-500/70 uppercase tracking-[0.2em]">
                    <span>SYSTEM_AUDIT_LOG</span>
                    <span className="flex items-center gap-1.5 animate-pulse"><span className="w-1 h-1 bg-emerald-500 rounded-full"></span> LIVE_FEED</span>
                  </div>
                  <div className="space-y-3 text-xs font-mono lowercase tracking-tight">
                    {AUTHOR_INFO.systemLogs.map((log) => (
                      <div key={log.id} className="flex justify-between gap-4">
                        <span className="text-white/50">{`> ${log.text}`}</span>
                        <span className="text-cyan-500/80 font-bold uppercase">{log.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Social Matrix */}
              <div className="grid sm:grid-cols-2 gap-6 items-start">
                {/* Official Account */}
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
                    <Image
                      src={AUTHOR_INFO.social.officialAccount.qrCode}
                      alt="硅基大宗公众号二维码"
                      width={320}
                      height={320}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <p className="mt-8 text-center text-[10px] text-slate-500 font-mono bg-white/5 py-2.5 rounded-xl border border-white/5 uppercase tracking-[0.3em]">@{AUTHOR_INFO.social.officialAccount.name}</p>
                </div>

                {/* LinkedIn */}
                <a href={AUTHOR_INFO.social.linkedin} target="_blank" rel="noopener noreferrer" className="relative group p-6 rounded-2xl bg-slate-900 border border-white/10 overflow-hidden transition-all hover:bg-slate-800">
                  <div className="absolute inset-y-0 left-0 w-[2px] bg-blue-500 transition-transform scale-y-0 group-hover:scale-y-100"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                        <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </div>
                      <div>
                        <span className="block text-xs font-black text-white uppercase tracking-widest leading-none mb-1">LinkedIn</span>
                        <span className="text-[10px] text-slate-500 font-mono">PROFESSIONAL_GRAPH</span>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-slate-500 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </a>

                {/* Twitter / X */}
                <a href={AUTHOR_INFO.social.x} target="_blank" rel="noopener noreferrer" className="relative group p-6 rounded-2xl bg-slate-900 border border-white/10 overflow-hidden transition-all hover:bg-slate-800">
                  <div className="absolute inset-y-0 left-0 w-[2px] bg-white transition-transform scale-y-0 group-hover:scale-y-100"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </div>
                      <div>
                        <span className="block text-xs font-black text-white uppercase tracking-widest leading-none mb-1">Twitter / X</span>
                        <span className="text-[10px] text-slate-500 font-mono">GLOBAL_SIGNALS</span>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              </div>
            </div>

            <div className="mt-20" />
          </div>
        </section>
      </main>
    </div>
  );
}
