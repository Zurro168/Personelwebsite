import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, ChevronLeft } from 'lucide-react';

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
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header */}
      <header className="border-b border-white/10 px-8 py-4 flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <Link href="/" className="w-8 h-8 bg-brand-blue rounded-sm flex items-center justify-center text-white font-bold cursor-pointer">Si</Link>
          <span className="text-lg font-bold tracking-tighter cursor-pointer">
            <Link href="/">硅基大宗 <span className="text-brand-blue">|</span> Digital Commodities</Link>
          </span>
        </div>
        <nav className="flex gap-8 text-sm font-medium opacity-70">
          <Link href="/portfolio" className="text-brand-blue font-bold">PORTFOLIO</Link>
          <Link href="/intersection" className="hover:text-brand-blue transition-colors">INTERSECTION</Link>
          <Link href="/about" className="hover:text-brand-blue transition-colors">ABOUT</Link>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-20">
        <div className="space-y-8">
          <Link href="/portfolio" className="flex items-center gap-2 text-white/40 hover:text-brand-blue transition-colors text-xs font-mono group">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> BACK TO ARCHIVE
          </Link>
          
          <div className="space-y-4">
             <div className="inline-block px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-[10px] font-bold tracking-[0.2em] rounded uppercase">
               {report.tag}
             </div>
             <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight text-white">
               {report.title}
             </h1>
             <div className="flex flex-wrap gap-4 text-xs font-mono text-white/30 pt-4">
                <span className="flex items-center gap-1"><Calendar size={14} /> {report.date}</span>
                <span className="text-white/10 italic">#{report.id}</span>
             </div>
          </div>

          <div className="pt-12 border-t border-white/5 prose prose-invert max-w-none prose-headings:tracking-tighter prose-a:text-brand-blue">
            {isHtml ? (
              <div 
                dangerouslySetInnerHTML={{ __html: report.content }} 
                className="report-html-content"
              />
            ) : (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {report.content}
              </ReactMarkdown>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 px-8 py-12 text-center text-white/20 text-[10px] tracking-widest font-mono">
        © 2026 SILICON COMMODITY | RESEARCH ARCHIVE
      </footer>
    </div>
  );
}
