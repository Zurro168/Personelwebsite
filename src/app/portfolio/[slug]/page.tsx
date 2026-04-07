import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, ChevronLeft } from 'lucide-react';

// Mock function for fetching report by slug
async function getReport(slug: string) {
  // In a real scenario, fetch from Notion/Sanity here
  return {
    title: '2026 铜供给缺口：从智利矿区到高性能算力心脏的传导逻辑',
    date: '2026-04-07',
    category: '硬核商品',
    tags: ['#宏观觉悟', '#精炼铜', '#算力基础设施'],
    content: `
# 2026 铜供给缺口：深度透视

大宗商品市场的周期波动，本质上是实物资产对全球流动性溢价的定价校准。在本轮周期中，铜（Copper）正成为 **“数字化能源转换”** 的核心锚点。

## 1. 智利矿区的生产瓶颈

尽管铜矿资源总量丰富，但 **“高品位矿石”** 的枯竭正使得生产边际成本不断攀升。智利某些大型矿山的开采深度已经超过 1,000 米...

## 2. 算力心脏的传导逻辑

高性能算力（HPC）集群、数据中心以及 AI 芯片的算力密度激增，对电力系统的稳定性提出了前所未有的要求。**精炼铜** 在变级器、散热系统及高频导电网络中的应用几乎不可替代。

- **需求倍增**: 预计到 2026 年，算力相关的铜需求将占比提升至 12%。
- **弹性缺失**: 矿业生产周期的滞后性决定了短期内无法弥补供给缺口。

## 3. 定价权转换

我们观察到，定价权正从传统的现货贸易流转，向 **“硅基算力中心”** 的供应链锁定合同转移...

---
> “贸易的终局，算法的起点。”
    `
  };
}

export default async function ReportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const report = await getReport(slug);

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
             <div className="inline-block px-3 py-1 bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] font-bold tracking-[0.2em] rounded uppercase">
               {report.category}
             </div>
             <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight text-white">
               {report.title}
             </h1>
             <div className="flex flex-wrap gap-4 text-xs font-mono text-white/30 pt-4">
                <span className="flex items-center gap-1"><Calendar size={14} /> {report.date}</span>
                <div className="flex gap-2">
                  {report.tags.map((t, i) => (
                    <span key={i} className="text-brand-blue/60">{t}</span>
                  ))}
                </div>
             </div>
          </div>

          <div className="pt-12 border-t border-white/5 prose prose-invert max-w-none prose-headings:tracking-tighter prose-a:text-brand-blue">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {report.content}
            </ReactMarkdown>
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
