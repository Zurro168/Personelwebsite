'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, ShieldCheck, Share2, Zap, MessageCircle, Rss, ChevronRight } from 'lucide-react';
import { AUTHOR_INFO } from '@/data/biography';
import PriceTicker from '@/components/layout/PriceTicker';

export default function Home() {
  return (
    <div className="relative overflow-x-hidden bg-[#0a0f1a] text-slate-200 min-h-screen">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* 1. Hero Section - EXTREME COMPACT */}
      <section id="hero" className="px-8 pt-4 pb-12 max-w-7xl mx-auto relative flex flex-col">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#38bdf8]"></div>
            <span className="text-cyan-500/60 text-[10px] font-black tracking-[0.4em] uppercase font-mono">Terminal Active / V2.0</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-[1.0] tracking-tighter text-white">
            贸易的终局 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-cyan-400 bg-[length:200%_auto] animate-gradient italic">算法的起点</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-lg leading-relaxed font-light">
            {AUTHOR_INFO.motto}
          </p>
          <div className="flex flex-wrap gap-6 pt-4">
            <Link href="/portfolio" className="px-10 py-4 bg-cyan-500 text-slate-900 font-black text-sm tracking-widest rounded hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] transition-all">
              进入研报库
            </Link>
            <Link href="/intersection" className="px-10 py-4 border border-white/10 font-black text-sm tracking-widest rounded hover:bg-white/5 transition-all text-white">
              跨界实验室
            </Link>
          </div>
      </section>

      {/* 2. Live Market Bar */}
      <PriceTicker />

      {/* 3. Core Matrix (Features) */}
      <section id="features" className="px-8 py-32 max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/portfolio" className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan-500/30 transition-all duration-500">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 mb-6 group-hover:scale-110 transition-transform">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">硬核研报库</h3>
          <p className="text-sm text-slate-500 leading-relaxed font-light italic">提供基于数据模型与实地调研的大宗商品深度分析报告。</p>
        </Link>

        <Link href="/intersection" className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan-500/30 transition-all duration-500">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
            <Zap size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">跨界实验室</h3>
          <p className="text-sm text-slate-500 leading-relaxed font-light italic">中医系统论与现代管理哲学在数字时代的耦合实践。</p>
        </Link>

        <Link href="/about" className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan-500/30 transition-all duration-500">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform">
            <Activity size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">关于主理人</h3>
          <p className="text-sm text-slate-500 leading-relaxed font-light italic">从西交大老兵到全球贸易领域的数字化转型记录。</p>
        </Link>
      </section>

      {/* 4. 🔥 HIGH VISIBILITY IP & CONTACT SECTION */}
      <section id="connect" className="px-8 py-32 bg-gradient-to-b from-transparent to-cyan-950/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            
            {/* Left: Identity Card */}
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

              <div className="p-8 rounded-3xl bg-slate-900 border border-white/10 relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl -mr-16 -mt-16"></div>
                <div className="flex items-center gap-6 mb-8 relative">
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
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs text-slate-500">领域 / Focus</span>
                    <span className="text-xs text-white font-bold">{AUTHOR_INFO.focus[0]}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs text-slate-500">坐标 / Location</span>
                    <span className="text-xs text-white font-bold tracking-tight">{AUTHOR_INFO.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {AUTHOR_INFO.tags.map(tag => (
                      <span key={tag} className="text-[9px] px-2 py-1 bg-cyan-500/5 border border-cyan-500/10 rounded uppercase text-cyan-400 font-mono">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Social Matrix & QR */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* WeChat QR Cards */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 hover:border-cyan-500/30 transition-all group">
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
                <p className="mt-4 text-center text-[10px] text-slate-500 font-mono">ID: {AUTHOR_INFO.social.wechat.id}</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 hover:border-cyan-500/30 transition-all group">
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
                <p className="mt-4 text-center text-[10px] text-slate-500 font-mono">@{AUTHOR_INFO.social.officialAccount.name}</p>
              </div>

              {/* Links */}
              <a href={AUTHOR_INFO.social.linkedin} target="_blank" className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[#0077b5]/50 transition-all group">
                <div className="flex items-center gap-3">
                  <Share2 className="text-slate-500 group-hover:text-[#0077b5]" size={20} />
                  <span className="text-sm font-medium">LinkedIn Profile</span>
                </div>
                <ChevronRight size={16} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
              </a>

              <a href={AUTHOR_INFO.social.x} target="_blank" className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/30 transition-all group">
                <div className="flex items-center gap-3">
                  <Share2 className="text-slate-500 group-hover:text-white" size={20} />
                  <span className="text-sm font-medium">Twitter / X</span>
                </div>
                <ChevronRight size={16} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Minimal Copyright Line */}
          <footer className="mt-40 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-white/20 font-mono tracking-widest uppercase">
            <div className="flex items-center gap-2">
              <ShieldCheck size={12} className="text-brand-blue/40" />
              <span>© {AUTHOR_INFO.copyright.year} {AUTHOR_INFO.copyright.owner} | {AUTHOR_INFO.copyright.notice.split('。')[0]}</span>
            </div>
            <div className="flex gap-8">
              <Link href="/portfolio" className="hover:text-brand-blue transition-colors">ARCHIVE</Link>
              <Link href="/about" className="hover:text-brand-blue transition-colors">IP GUIDE</Link>
              <span className="text-white/10 italic">TERMINAL V3.2</span>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
// FORCE_SYNC_CHECK_20260411_2217
