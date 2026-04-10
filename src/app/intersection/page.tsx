import { ALL_REPORTS } from '@/data/reports';
import Link from 'next/link';
import { Microscope, Bot, Heart, Coffee } from 'lucide-react';
import TableOfContents from '@/components/TableOfContents';

export default function IntersectionPage() {
  // 动态筛选「跨界实验」分类下的文章
  const crossoverArticles = ALL_REPORTS.filter(r => r.tag === '跨界实验');
  
  // 智能匹配槽位逻辑
  const slots = [
    {
      category: '中医系统论',
      icon: <Heart size={24} className="text-brand-experiment" />,
      article: crossoverArticles.find(a => a.title.includes('中医') || a.slug.includes('tcm'))
    },
    {
      category: '企业管理哲学',
      icon: <Coffee size={24} className="text-brand-gold" />,
      article: crossoverArticles.find(a => a.title.includes('管理') || a.title.includes('第一线') || a.slug.includes('management'))
    },
    {
      category: 'AI 实践笔记',
      icon: <Bot size={24} className="text-brand-experiment" />,
      article: crossoverArticles.find(a => a.title.includes('AI') || a.title.includes('信息') || a.slug.includes('ai'))
    }
  ];

  return (
    <div className="relative overflow-x-hidden font-sans">
      {/* Node-based Progress Tracker - Purple Variant */}
      <TableOfContents content="" variant="experiment" />

      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="space-y-12">
          {/* Section Heading */}
          <div id="intro" className="space-y-4 pb-6 border-b border-white/5">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-experiment/10 border border-brand-experiment/20 text-brand-experiment text-[10px] font-black tracking-[0.3em] rounded uppercase font-mono italic">
                Cross-Domain Synthesis Active
             </div>
             <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white font-sans uppercase italic">跨界实验室</h1>
             <p className="text-slate-400 text-lg font-light leading-relaxed max-w-2xl italic border-l-2 border-brand-experiment pl-6 font-sans">
               在不同领域的张力中寻找统一的底层规律 —— 跨越边界，重构认知。
             </p>
          </div>

          {/* Featured Zone - Top 3 Specific Slots */}
          <section id="featured">
            <h2 className="text-[10px] font-black text-brand-experiment/40 uppercase tracking-[0.4em] mb-10 font-mono italic">Featured Experiments // 精选导引</h2>
            <div id="essays" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 flex-wrap">
              {slots.map((slot, index) => {
                const article = slot.article;
                if (!article) return null;

                return (
                  <Link key={index} href={`/portfolio/${article.slug}`}>
                    <div className="group relative bg-slate-900/40 border border-white/5 rounded-3xl p-10 hover:border-brand-experiment/30 transition-all cursor-pointer shadow-xl h-full flex flex-col justify-between">
                      <div className="space-y-8">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:border-brand-experiment/30 transition-all">
                          {slot.icon}
                        </div>
                        <div className="space-y-3">
                          <span className="text-[10px] uppercase tracking-widest text-brand-experiment font-mono font-bold italic">{slot.category}</span>
                          <h3 className="text-2xl font-black text-white group-hover:text-brand-experiment transition-colors leading-tight italic line-clamp-3">
                            {article.title}
                          </h3>
                        </div>
                        <p className="text-slate-400 leading-relaxed font-light italic line-clamp-4">
                          &ldquo;{article.description || '点击探索深度跨界研报内容...'}&rdquo;
                        </p>
                        <div className="pt-4 flex items-center text-[10px] font-black text-brand-experiment tracking-[0.3em] gap-3 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all">
                           EXPLORE STORY <span>→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Featured Quote / Philosophy */}
          <section id="philosophy" className="bg-slate-900/60 border border-brand-experiment/20 p-16 rounded-[2.5rem] text-center relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none text-brand-experiment">
                <Microscope size={200} />
             </div>
             <blockquote className="text-3xl md:text-4xl italic font-black text-white/80 relative z-10 tracking-tight leading-snug max-w-4xl mx-auto">
                “我们追求的不是极致的专业分科，而是跨学科背后统一运行规律的数字化重构。”
             </blockquote>
          </section>

          {/* Full Archive Grid - For Scalability */}
          <section id="archive" className="pt-12">
            <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-4">
               <h2 className="text-[10px] font-black text-brand-experiment/40 uppercase tracking-[0.4em] font-mono italic">Experimental Archive // 全套档案</h2>
               <div className="text-[10px] text-white/20 font-mono italic uppercase tracking-widest">Total: {crossoverArticles.length} Projects</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {crossoverArticles.map((report) => (
                <article key={report.id} className="group flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden rounded mb-6 border border-white/5 bg-slate-900 shadow-2xl">
                    <Link href={`/portfolio/${report.slug}`} className="block w-full h-full">
                      <img 
                        src={report.image} 
                        alt={report.title} 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                      />
                    </Link>
                    <div className="absolute top-4 left-4">
                      <span className="text-brand-experiment text-[9px] font-black uppercase tracking-[0.4em] font-mono italic px-2 py-0.5 bg-black/50 backdrop-blur-sm rounded-sm">{report.tag}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4 flex-grow font-sans">
                    <h2 className="text-xl font-bold text-white transition-colors group-hover:text-brand-experiment leading-tight tracking-tight italic uppercase">
                      <Link href={`/portfolio/${report.slug}`}>{report.title}</Link>
                    </h2>
                    <p className="text-sm text-slate-500 line-clamp-2 font-light leading-relaxed italic">
                      {report.description}
                    </p>
                    <div className="pt-4 flex items-center justify-between font-mono">
                      <span className="text-[10px] text-white/10 italic">#{report.id}</span>
                      <Link href={`/portfolio/${report.slug}`} className="text-brand-experiment text-xs font-black hover:underline transition-all flex items-center gap-2 underline-offset-4 decoration-2 italic uppercase tracking-widest">
                        Read Insight <span className="text-lg">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
