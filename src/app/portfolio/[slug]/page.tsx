import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
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
import { ALL_REPORTS, Report } from '@/data/reports';

// Comprehensive Alias & Legacy Redirect Map
export const SLUG_ALIASES: Record<string, string> = {
  // Frequently tested short slugs
  'ai-agent-2026': 'ai-agent-procurement-2026',
  'AI_Agent_Procurement': 'ai-agent-procurement-2026',
  'global-copper-supply-bottleneck': 'global-copper-supply-bottleneck-2026',
  'strategic-metals-2026': 'strategic-metals-analysis-2026',
  'usd-cycle-commodities': 'dollar-cycle-and-commodity-gravity-2026',
  'gabon-manganese': 'gabon-manganese-export-ban-analysis',

  // Legacy Chinese slugs mapped to canonical ASCII slugs
  '铝工业跨越绿色叙事的结构性摩擦与估值重构': 'aluminum-green-narrative-friction-2026',
  '2026年全球铅锌市场的认知失调与定价扭曲': 'lead-zinc-cognitive-dissonance-2026',
  'AI自动驾驶重塑矿山物流：铅锌矿供应链弹性与成本结构深度分析': 'ai-autonomous-mining-logistics-2026',
  '西芒杜（simandou）西非铁矿石的最后堡垒': 'simandou-iron-ore-last-fortress-2026',
  '大语言模型LLM驱动下的铅锌大宗商品价值链革新': 'llm-lead-zinc-value-chain-2026',
  '黄金定价权-“去利率化”-转型与全球信用本位回归': 'gold-pricing-de-rate-shift-2026',
  '2026-年全球铅锌产业-“颗粒度”-管理与价格背离研究': 'lead-zinc-granularity-price-divergence-2026',
  '利率潮汐下的资源重构：全球铅锌矿业-2025-2026-年深度战略研究报告-1': 'rate-tides-lead-zinc-mining-2026',
  '2026年全球铜业战略报告：美元锚点失效下的“软脱钩”与战略性资产重估': 'global-copper-strategic-decoupling-2026',
  '刚果民主共和国采矿业微观建模分析：地缘博弈、技术转型与财政主权演进': 'drc-mining-micro-modeling-2026',
  '全球铜业物理成本陷阱与硅基对冲重构': 'copper-physical-cost-trap-2026',
  '全球铜业巨擘财务稳健性与战略转型深度调研报告：智利国家铜业公司（codelco）与必和必拓（bhp）的对比研究': 'codelco-vs-bhp-financial-analysis-2026',
};

// Normalize and resolve slug (handles URL decoding, trailing slashes, and aliases)
export function resolveCanonicalSlug(rawSlug: string): string {
  let cleaned = rawSlug.trim();
  // Strip trailing slash if any
  if (cleaned.endsWith('/')) {
    cleaned = cleaned.slice(0, -1);
  }
  try {
    cleaned = decodeURIComponent(cleaned);
  } catch {
    // Keep as is if decode fails
  }

  // Check alias dictionary
  if (SLUG_ALIASES[cleaned]) {
    return SLUG_ALIASES[cleaned];
  }

  // Case-insensitive alias check
  const lowerKey = cleaned.toLowerCase();
  for (const [alias, target] of Object.entries(SLUG_ALIASES)) {
    if (alias.toLowerCase() === lowerKey) {
      return target;
    }
  }

  return cleaned;
}

// Fetch report by slug from memory metadata & filesystem
async function getReport(slug: string): Promise<(Report & { content: string }) | null> {
  const canonicalSlug = resolveCanonicalSlug(slug);

  // Exact match or fallback match
  let reportMeta = ALL_REPORTS.find(r => r.slug === canonicalSlug);
  if (!reportMeta) {
    reportMeta = ALL_REPORTS.find(r => r.slug.toLowerCase() === canonicalSlug.toLowerCase());
  }
  
  if (!reportMeta) {
    return null;
  }

  // Candidate content file paths
  const reportsDir = path.join(process.cwd(), 'public/content/reports');
  const candidates = [
    path.join(reportsDir, `${reportMeta.slug}.html`),
    path.join(reportsDir, `${canonicalSlug}.html`),
    path.join(reportsDir, `${slug}.html`),
  ];

  let contentPath = '';
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      contentPath = candidate;
      break;
    }
  }

  let content = '';
  try {
    if (contentPath && fs.existsSync(contentPath)) {
      let rawContent = fs.readFileSync(contentPath, 'utf8');
      
      // Sanitization: Remove duplicate Markdown H1 headings
      rawContent = rawContent.replace(/^(\s*#\s+.*$)/m, '');

      // Sanitization: Remove duplicate HTML H1 heading at top to avoid double titles
      rawContent = rawContent.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>/i, '');

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

export async function generateStaticParams() {
  const slugs = new Set<string>();
  
  // All canonical slugs
  ALL_REPORTS.forEach(r => {
    if (r.slug) slugs.add(r.slug);
  });

  // All legacy and short aliases
  Object.keys(SLUG_ALIASES).forEach(alias => {
    slugs.add(alias);
  });

  return Array.from(slugs).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const canonicalSlug = resolveCanonicalSlug(slug);
  const report = ALL_REPORTS.find(r => r.slug === canonicalSlug || r.slug.toLowerCase() === canonicalSlug.toLowerCase());

  if (!report) {
    return {
      title: '研报未找到 | 硅基大宗',
    };
  }

  return {
    title: `${report.title} | 硅基大宗`,
    description: report.description,
    openGraph: {
      title: report.title,
      description: report.description,
      type: 'article',
      images: report.image ? [report.image] : [],
    },
  };
}

export default async function ReportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const canonicalSlug = resolveCanonicalSlug(slug);

  // If accessed via an old alias/slug, perform an SEO-friendly 308 redirect to canonical slug
  if (slug !== canonicalSlug && (SLUG_ALIASES[slug] || SLUG_ALIASES[decodeURIComponent(slug) || ''])) {
    redirect(`/portfolio/${canonicalSlug}`);
  }

  const report = await getReport(slug);

  if (!report) {
    notFound();
  }

  // Detect if the content is likely HTML
  const isHtml = report.isHtml || (report.content.includes('<') && report.content.includes('>'));

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand-blue/30">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[60] bg-white/5">
        <div id="reading-progress" className="h-full bg-brand-blue origin-left" style={{ transform: 'scaleX(0)' }} />
      </div>
      <script dangerouslySetInnerHTML={{
        __html: `(function(){
          var bar=document.getElementById('reading-progress');
          if(!bar)return;
          window.addEventListener('scroll',function(){
            var h=document.documentElement;
            var pct=Math.min(window.scrollY/(h.scrollHeight-h.clientHeight),1);
            bar.style.transform='scaleX('+pct+')';
          },{passive:true});
        })();`
      }} />

      {/* Dual-Column Industrial Layout */}
      <div className={report.layout === 'interactive' ? "w-full report-layout-container" : "max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-8 px-4 md:px-8 relative report-layout-container"}>
        
        {/* Left Column: Authoritative Content */}
        <div className={report.layout === 'interactive' ? "w-full" : "w-full lg:w-[980px] lg:shrink-0"}>
          <main className="py-12">
            <div className={report.layout === 'interactive' && !report.title ? "" : "space-y-8"}>
              {(report.layout !== 'interactive' || (report.layout === 'interactive' && report.title)) && (
                <div className="mb-12">
                  <Link href="/portfolio" className="flex items-center gap-2 text-white/40 hover:text-brand-blue transition-colors text-[10px] font-bold tracking-[0.2em] group mb-8">
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
                </div>
              )}

              <div className="max-w-none overflow-x-hidden">
                {isHtml ? (
                  <ReportRenderer html={report.content} layout={report.layout} />
                ) : (
                  <div className="flex justify-center">
                    <div className="prose prose-invert prose-cyber max-w-4xl w-full">
                      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                        {report.content}
                      </ReactMarkdown>
                    </div>
                  </div>
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
        </div>

        {/* Right Column: Industrial Guide (Sticky) */}
        {report.layout !== 'interactive' && (
          <aside className="hidden lg:block pt-8">
             <TableOfContents content={report.content} />
          </aside>
        )}
      </div>

      {/* Footer */}
      <footer className="px-8 py-12 text-center">
        <div className="text-white/10 text-[9px] tracking-[0.5em] font-mono uppercase">
           RESEARCH ARCHIVE SYSTEM TERMINAL
        </div>
      </footer>
    </div>
  );
}
