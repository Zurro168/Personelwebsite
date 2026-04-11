import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Calendar, ChevronLeft } from 'lucide-react';
import ReportRenderer from '@/components/ReportRenderer';
import { AUTHOR_INFO } from '@/data/biography';
import TableOfContents from '@/components/TableOfContents';

import fs from 'fs';
import path from 'path';
import { ALL_REPORTS } from '@/data/reports';

// Real function for fetching report by slug from the local filesystem
async function getReport(slug: string) {
  const reportMeta = ALL_REPORTS.find(r => r.slug === slug);
  
  if (!reportMeta) {
    return null;
  }

  // Path to the synchronized content
  const contentPath = path.join(process.cwd(), 'public/content/reports', `${slug}.html`);
  let content = '';
  
  try {
    if (fs.existsSync(contentPath)) {
      content = fs.readFileSync(contentPath, 'utf8');
    } else {
      content = '⚠️ 报告内容正在同步中，请稍后再试...';
    }
  } catch (err) {
    console.error(`Failed to read report content for ${slug}:`, err);
    content = '❌ 内容读取失败。';
  }

  return {
    ...reportMeta,
    content
  };
}

export default async function ReportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const report = await getReport(slug);

  if (!report) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-white font-mono uppercase tracking-widest">
        404 | Research Not Found
      </div>
    );
  }

  // Detect if the content is likely HTML (starts with <!DOCTYPE or contains tags)
  const isHtml = report.content.trim().startsWith('<!DOCTYPE') || 
                 report.content.includes('<html') || 
                 report.content.includes('<div') ||
                 report.content.includes('<script');

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand-blue/30">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[60] bg-white/5">
        <div id="reading-progress" className="h-full bg-brand-blue w-full scale-x-0" />
      </div>

      {/* Node-based Progress Tracker (Side Menu) */}
      <TableOfContents content={report.content} />

      {/* Header */}
      <header className="border-b border-white/5 px-8 py-5 flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-3 group">
          <Link href="/" className="w-9 h-9 bg-brand-blue rounded shadow-[0_0_15px_rgba(56,189,248,0.3)] flex items-center justify-center text-slate-900 font-black cursor-pointer transition-transform group-hover:scale-105 shrink-0">Si</Link>
          <div className="flex flex-col h-9 justify-center">
            <Link href="/" className="flex items-center gap-2 group-hover:opacity-80 transition-opacity whitespace-nowrap">
              <span className="text-xl font-black tracking-tighter text-white leading-none">硅基大宗</span>
              <span className="text-brand-blue/40 font-light leading-none">|</span>
              <span className="text-brand-blue text-[11px] uppercase tracking-[0.3em] font-bold leading-none mt-[2px]">Terminal</span>
            </Link>
          </div>
        </div>
        <nav className="flex gap-10 text-[14px] font-bold tracking-[0.2em] text-white/50">
          <Link href="/portfolio" className="text-brand-blue underline decoration-2 underline-offset-8">PORTFOLIO</Link>
          <Link href="/intersection" className="hover:text-white transition-colors">INTERSECTION</Link>
          <Link href="/about" className="hover:text-white transition-colors">ABOUT</Link>
        </nav>
      </header>

      {/* Horizontal Stretch: Content now fills the space up to the Guidance Bar */}
      <main className={`${isHtml ? 'max-w-[100rem]' : 'max-w-7xl'} mx-auto px-6 lg:pl-16 lg:pr-[20rem] py-20`}>
        <div className="space-y-8">
          <Link href="/portfolio" className="flex items-center gap-2 text-white/40 hover:text-brand-blue transition-colors text-[10px] font-bold tracking-[0.2em] group">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> BACK TO ARCHIVE
          </Link>
          
          <div className="space-y-4">
             <div className="inline-block px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-[10px] font-bold tracking-[0.2em] rounded uppercase">
               {report.tag}
             </div>
             <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] text-white">
               {report.title}
             </h1>
             <div className="flex flex-wrap gap-4 text-xs font-mono text-white/30 pt-4 items-center">
                <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded"><Calendar size={14} /> {report.date}</span>
                <span className="text-white/10 italic">#{report.id}</span>
             </div>
          </div>

          <div className="pt-16 border-t border-white/5">
            <div className="prose prose-invert prose-cyber max-w-none overflow-x-hidden">
              {isHtml ? (
                <ReportRenderer html={report.content} />
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                  {report.content}
                </ReactMarkdown>
              )}
            </div>
          </div>

          {/* Copyright Section */}
          <div className="mt-24 p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 blur-3xl rounded-full" />
            <div className="flex items-center gap-4 text-brand-blue">
               <ShieldCheck size={20} />
               <span className="text-[10px] font-black tracking-[0.3em] uppercase">Copyright Notice / 版权申明</span>
            </div>
            <div className="space-y-4 relative z-10">
               <p className="text-slate-400 text-sm leading-relaxed font-light">
                 本文著作权归 <span className="text-white font-black">{AUTHOR_INFO.copyright.owner}</span> 所有。
                 {AUTHOR_INFO.copyright.notice}
               </p>
               <p className="text-slate-500 text-xs leading-relaxed italic">
                 {AUTHOR_INFO.copyright.reprintGuide}
               </p>
            </div>
          </div>
        </div>
      </main>

      {/* Client-side script for top progress bar */}
      <script dangerouslySetInnerHTML={{ __html: `
        window.addEventListener('scroll', () => {
          const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
          const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrolled = (winScroll / height);
          const bar = document.getElementById('reading-progress');
          if (bar) bar.style.transform = 'scaleX(' + scrolled + ')';
        });
      `}} />

      {/* Footer */}
      <footer className="border-t border-white/5 px-8 py-20 text-center flex flex-col items-center gap-4">
        <div className="w-10 h-[1px] bg-white/20" />
        <div className="text-white/20 text-[10px] tracking-[0.4em] font-mono uppercase">
          © {AUTHOR_INFO.copyright.year} {AUTHOR_INFO.copyright.owner.toUpperCase()} | RESEARCH ARCHIVE
        </div>
      </footer>
    </div>
  );
}
