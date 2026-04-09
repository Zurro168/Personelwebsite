import { Microscope, Bot, Heart, Coffee } from 'lucide-react';
import TableOfContents from '@/components/TableOfContents';

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
    <div className="relative overflow-x-hidden">
      {/* Node-based Progress Tracker */}
      <TableOfContents content="" />

      <main className="max-w-7xl mx-auto px-8 lg:pr-96 py-24">
        <div className="space-y-24">
          {/* Section Heading */}
          <div id="intro" className="space-y-6 pb-12 border-b border-white/5">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-[10px] font-black tracking-[0.3em] rounded uppercase font-mono">
                Nexus Explorer Active
             </div>
             <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white">跨界实验室</h1>
             <p className="text-slate-400 text-xl font-light leading-relaxed max-w-2xl italic">大宗商品贸易、中医认知体系与人工智能的跨界碰撞与融合。</p>
          </div>

          {/* Grid Layout */}
          <div id="essays" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {essays.map((essay) => (
              <div key={essay.id} className="group relative bg-slate-900/40 border border-white/5 rounded-3xl p-10 hover:border-brand-blue/30 transition-all cursor-pointer shadow-xl">
                <div className="space-y-8">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:border-brand-blue/30 transition-all">
                    {essay.icon}
                  </div>
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase tracking-widest text-brand-blue font-mono font-bold italic">{essay.category}</span>
                    <h3 className="text-2xl font-black text-white group-hover:text-brand-blue transition-colors leading-tight italic">{essay.title}</h3>
                  </div>
                  <p className="text-slate-400 leading-relaxed font-light italic">&ldquo;{essay.excerpt}&rdquo;</p>
                  <div className="pt-4 flex items-center text-[10px] font-black text-brand-blue tracking-[0.3em] gap-3 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all">
                     EXPLORE STORY <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Quote / Philosophy */}
          <section id="philosophy" className="bg-slate-900/60 border border-white/5 p-16 rounded-[2.5rem] text-center relative overflow-hidden mt-20 group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                <Microscope size={200} />
             </div>
             <blockquote className="text-3xl md:text-4xl italic font-black text-white/80 relative z-10 tracking-tight leading-snug max-w-4xl mx-auto">
                “我们追求的不是极致的专业分科，而是跨学科背后统一运行规律的数字化重构。”
             </blockquote>
          </section>
        </div>
      </main>
    </div>
  );
}
