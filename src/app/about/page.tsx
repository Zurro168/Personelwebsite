import React from 'react';
import fs from 'fs';
import path from 'path';
import { Database, TrendingUp, Cpu, Activity } from 'lucide-react';
import TableOfContents from '@/components/TableOfContents';
import ReportRenderer from '@/components/ReportRenderer';
import { AUTHOR_INFO } from '@/data/biography';

async function getAboutContent() {
  const contentPath = path.join(process.cwd(), 'public/content/system/about.html');
  try {
    if (fs.existsSync(contentPath)) {
      return fs.readFileSync(contentPath, 'utf8');
    }
  } catch (err) {
    console.error("Failed to read about content:", err);
  }
  return null;
}

export default async function AboutPage() {
  const customContent = await getAboutContent();

  return (
    <div className="relative overflow-x-hidden">
      {/* Decorative Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Node-based Progress Tracker */}
      <TableOfContents content={customContent || ""} />

      <main className="max-w-7xl mx-auto px-8 lg:pr-96 py-24 relative">

        <div className="space-y-32">
          {/* Hero Section - Powered by AUTHOR_INFO */}
          <section className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-[10px] font-bold tracking-[0.3em] rounded uppercase font-mono">
              <Activity size={12} className="animate-pulse" /> Profile Status: Active
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-[calc(-0.05em)] leading-[0.9] text-white">
              {AUTHOR_INFO.name.split(' ')[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-cyan-300 to-brand-blue bg-[length:200%_auto] animate-gradient">
                {AUTHOR_INFO.name.split(' ').slice(1).join(' ')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl font-light leading-relaxed">
              {AUTHOR_INFO.motto}
            </p>
          </section>

          {/* Core Content - Powered by Obsidian about.html or Fallback */}
          <section id="content" className="pt-16 border-t border-industrial-border">
            {customContent ? (
              <div className="prose prose-invert prose-cyber max-w-none">
                <ReportRenderer html={customContent} />
              </div>
            ) : (
              <div className="space-y-32">
                {/* Fallback Static Content (The original high-quality layout) */}
                <section id="background" className="grid lg:grid-cols-[180px_1fr] gap-10 group">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-1.5 h-10 bg-brand-blue shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>
                      <h2 className="text-2xl font-black text-white tracking-widest uppercase font-mono italic">Background</h2>
                    </div>
                    <div className="text-[11px] text-brand-blue/60 font-mono space-y-5 border-l border-brand-blue/20 pl-5">
                      <div>
                        <label className="block text-white/40 uppercase mb-1 tracking-widest font-bold">Location</label>
                        <p className="text-white/80">{AUTHOR_INFO.location}</p>
                      </div>
                      <div>
                        <label className="block text-white/40 uppercase mb-1 tracking-widest font-bold">Focus</label>
                        <p className="text-white/80">{AUTHOR_INFO.focus.join(' / ')}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-12 text-xl md:text-2xl font-medium leading-[1.8] text-slate-300">
                    <p>
                      主理人深耕国际大宗商品领域。为了便于你灵活更新，请在 Obsidian 的 <code className="text-brand-blue">04_System/About.md</code> 中编写您的详细履历。
                    </p>
                    <p className="text-slate-500 italic text-lg text-center py-20 border border-dashed border-white/10 rounded-2xl">
                      期待您的同步内容...
                    </p>
                  </div>
                </section>
              </div>
            )}
          </section>

          {/* Philosophy Section */}
          <section id="philosophy" className="text-center py-32 border-t border-industrial-border relative">
             <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <p className="text-[200px] font-black text-white/[0.02] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap select-none">MANIFESTO</p>
             </div>
             <div className="relative z-10 space-y-16">
               <div className="inline-block px-10 py-3 border border-brand-gold/30 text-brand-gold text-xs font-black tracking-[1em] uppercase italic bg-brand-gold/5">
                 Content Philosophy
               </div>
               <p className="text-6xl md:text-9xl font-black text-white tracking-tighter italic leading-none">
                 “可验证、可复用、可执行”
               </p>
               <div className="h-px w-24 bg-brand-gold/50 mx-auto"></div>
               <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-light">
                 {AUTHOR_INFO.copyright.notice}
               </p>
             </div>
          </section>
        </div>
      </main>
    </div>
  );
}
