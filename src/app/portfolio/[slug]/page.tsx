import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Calendar, ChevronLeft, ShieldCheck } from 'lucide-react';
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
      let rawContent = fs.readFileSync(contentPath, 'utf8');
      
      // Sanitization: Remove duplicate H1 headings (Obsidian often adds # Title)
      // This matches "# Title" at the very beginning of the string or after whitespace
      rawContent = rawContent.replace(/^(\s*#\s+.*$)/m, '');

      content = rawContent.trim();
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
  // Trust report metadata over heuristic detection for rendering mode
  // Heuristic HTML detection: if it has tags, treat as HTML for better rendering
  const isHtml = report.isHtml || (report.content.includes('<') && report.content.includes('>'));

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand-blue/30">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[60] bg-white/5">
        <div id="reading-progress" className="h-full bg-brand-blue w-full scale-x-0" />
      </div>

      {/* Node-based Progress Tracker (Side Menu) */}
      <TableOfContents content={report.content} />

      {/* Main Content Area - Aligned to Global Navbar (7xl) */}
      <main className={report.layout === 'interactive' ? "w-full min-h-screen" : "max-w-7xl mx-auto px-8 py-12"}>
        <div className={report.layout === 'interactive' ? "" : "space-y-8"}>
          {report.layout !== 'interactive' && (
            <>
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

              <div className="pt-16 border-t border-white/5" />
            </>
          )}

          <div className={isHtml ? "max-w-none mx-auto overflow-x-hidden" : "prose prose-invert prose-cyber max-w-4xl overflow-x-hidden"}>
            {isHtml ? (
              <ReportRenderer html={report.content} layout={report.layout} />
            ) : (
              <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                {report.content}
              </ReactMarkdown>
            )}
          </div>

          {/* Minimal Copyright Line */}
          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/20 font-mono tracking-widest uppercase">
            <div className="flex items-center gap-2">
              <ShieldCheck size={12} className="text-brand-blue/40" />
              <span>© {AUTHOR_INFO.copyright.year} {AUTHOR_INFO.copyright.owner} | {AUTHOR_INFO.copyright.notice.split('。')[0]}</span>
            </div>
            <Link href="/about" className="hover:text-brand-blue transition-colors">
              IP & REPRINT GUIDE
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-12 text-center">
        <div className="text-white/10 text-[9px] tracking-[0.5em] font-mono uppercase">
           RESEARCH ARCHIVE SYSTEM TERMINAL
        </div>
      </footer>
    </div>
  );
}
