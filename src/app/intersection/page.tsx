import React from 'react';
import { Microscope, Bot, Heart, Coffee } from 'lucide-react';

const essays = [
  {
    id: 1,
    title: '中医系统论：从脏腑平衡到大宗商品供给侧博弈的隐喻',
    excerpt: '探寻中医整体观与大宗商品全球定价权的某种重合，如何用中医的平衡视角观察市场过热与寒凉...',
    category: '中医系统论',
    icon: <Heart size={24} className="text-red-400" />
  },
  {
    id: 2,
    title: '第一线认知：中游加工企业的成本管控与管理哲学思考',
    excerpt: '在利润空间极度压缩的存量竞争时代，如何构建具备韧性的管理逻辑。',
    category: '企业管理哲学',
    icon: <Coffee size={24} className="text-brand-gold" />
  },
  {
    id: 3,
    title: 'AI 时代的信息生产：从碎片化搜索转向结构化知识合成',
    excerpt: '记录我如何使用 Agent 技术重塑个人的大宗商品研究流程。',
    category: 'AI 实践笔记',
    icon: <Bot size={24} className="text-brand-blue" />
  }
];

export default function IntersectionPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header */}
      <header className="border-b border-white/10 px-8 py-4 flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <a href="/" className="w-8 h-8 bg-brand-blue rounded-sm flex items-center justify-center text-white font-bold cursor-pointer">Si</a>
          <span className="text-lg font-bold tracking-tighter cursor-pointer"><a href="/">硅基大宗 <span className="text-brand-blue">|</span> Digital Commodities</a></span>
        </div>
        <nav className="flex gap-8 text-sm font-medium opacity-70">
          <a href="/portfolio" className="hover:text-brand-blue transition-colors">PORTFOLIO</a>
          <a href="/intersection" className="text-brand-blue font-bold">INTERSECTION</a>
          <a href="/about" className="hover:text-brand-blue transition-colors">ABOUT</a>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-20">
        <div className="space-y-12">
          {/* Section Heading */}
          <div className="space-y-4 pb-8 border-b border-white/5">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">跨界实验室</h1>
            <p className="text-white/40 text-lg">大宗商品贸易、中医认知体系与人工智能的跨界碰撞与融合。</p>
          </div>

          {/* Grid Layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {essays.map((essay) => (
              <div key={essay.id} className="group relative bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] hover:border-brand-blue/30 transition-all cursor-pointer">
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                    {essay.icon}
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-white/30 font-mono">{essay.category}</span>
                    <h3 className="text-xl font-bold group-hover:text-brand-blue transition-colors">{essay.title}</h3>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed">{essay.excerpt}</p>
                  <div className="pt-4 flex items-center text-xs font-bold text-brand-blue gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all">
                     EXPLORE STORY <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Quote / Philosophy */}
          <section className="bg-brand-blue/5 border border-brand-blue/10 p-12 rounded-3xl text-center relative overflow-hidden mt-20">
             <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Microscope size={120} />
             </div>
             <blockquote className="text-2xl italic font-serif text-white/80 relative z-10">
                “我们追求的不是极致的专业分科，而是跨学科背后的统一运行规律。”
             </blockquote>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 px-8 py-12 text-center text-white/20 text-[10px] tracking-widest font-mono">
        © 2026 SILICON COMMODITY | INTERSECTION LABORATORY
      </footer>
    </div>
  );
}
