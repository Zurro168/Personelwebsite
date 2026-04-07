import React from 'react';
import { Database, TrendingUp, Cpu, Activity } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="relative overflow-x-hidden">
      {/* Decorative Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <main className="max-w-6xl mx-auto px-8 lg:px-20 py-24 relative">
        <div className="space-y-32">
          {/* Hero Section */}
          <section className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-[10px] font-bold tracking-[0.3em] rounded uppercase font-mono">
              <Activity size={12} className="animate-pulse" /> Profile Status: Verified
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-[calc(-0.05em)] leading-[0.9] text-white">
              贸易的终局 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-cyan-300 to-brand-blue bg-[length:200%_auto] animate-gradient">算法的起点</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl font-light leading-relaxed">
              深耕大宗商品贸易全链路，在周期波动中寻找确定性，在算法潮汐中重构产业逻辑。本平台旨在交付“可验证、可复用、可执行”的深度洞察。
            </p>
          </section>

          {/* Experience Grid */}
          <section className="grid lg:grid-cols-[180px_1fr] gap-10 border-t border-industrial-border pt-16 group">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-10 bg-brand-blue shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>
                <h2 className="text-2xl font-black text-white tracking-widest uppercase font-mono italic">Background</h2>
              </div>
              <div className="text-[11px] text-brand-blue/60 font-mono space-y-5 border-l border-brand-blue/20 pl-5">
                <div>
                  <label className="block text-white/40 uppercase mb-1 tracking-widest font-bold">Location</label>
                  <p className="text-white/80">GOBI / XI&apos;AN / GLOBAL</p>
                </div>
                <div>
                  <label className="block text-white/40 uppercase mb-1 tracking-widest font-bold">Academic</label>
                  <p className="text-white/80">XJTU / 西安交通大学</p>
                  <p className="text-white/80">HKU / 香港大学研究生</p>
                </div>
                <div>
                  <label className="block text-white/40 uppercase mb-1 tracking-widest font-bold">Intelligence Ops</label>
                  <p className="text-brand-gold font-bold">COMMODITIES × AI</p>
                </div>
                <div className="pt-2">
                  <div className="h-1 w-20 bg-brand-blue/10 rounded-full overflow-hidden">
                     <div className="h-full w-2/3 bg-brand-blue animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-12 text-xl md:text-2xl font-medium leading-[1.8] text-slate-300">
              <p>
                长期深耕国际大宗商品贸易领域，职业路径覆盖 <span className="text-white border-b-2 border-brand-blue/20 hover:border-brand-blue transition-colors cursor-help">钢材、焦炭、锰系合金、猛矿、铅锌、锆钛、钽铌</span> 等关键工业品类。
              </p>
              <p className="relative">
                <span className="absolute -left-12 top-0 text-brand-blue/30 text-5xl font-serif">&ldquo;</span>
                纵向横跨从 <span className="text-brand-blue font-bold decoration-brand-blue/30 underline underline-offset-8">上游资源获取</span>、中游加工组织到下游国际销售的全价值链条。对企业经营、成本结构与市场竞争具备极为敏锐的一线体感。
              </p>
            </div>
          </section>

          {/* Methodology */}
          <section className="grid lg:grid-cols-[180px_1fr] gap-10 border-t border-industrial-border pt-16">
            <div className="flex items-center gap-4 self-start">
               <div className="w-1.5 h-10 bg-brand-gold shadow-[0_0_10px_rgba(251,191,36,0.3)]"></div>
               <h2 className="text-2xl font-black text-white tracking-widest uppercase font-mono italic">Methodology</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6 group/box p-6 rounded-xl border border-white/5 hover:border-brand-blue/30 transition-all bg-white/[0.01]">
                <div className="w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-4">
                  <Database size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  穿透式逻辑
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed font-light">
                  关注商品背后的“底层操作系统”：宏观政策、货币流向、金融衍生品如何共同塑造周期脉搏。拒绝盲目跟风，强调逻辑可溯。
                </p>
              </div>
              <div className="space-y-6 group/box p-6 rounded-xl border border-white/5 hover:border-brand-gold/30 transition-all bg-white/[0.01]">
                <div className="w-12 h-12 rounded-lg bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-4">
                  <TrendingUp size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  同步交叉验证
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed font-light">
                  通过“产业实战 × 系统研究”双向对冲，在复杂的 <span className="text-brand-gold/80 italic font-medium">产业-金融-宏观</span> 耦合机制中持续迭代。旨在跨越认知陷阱。
                </p>
              </div>
            </div>
          </section>

          {/* Interests & Future */}
          <section className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue/20 to-brand-gold/20 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-slate-900/40 border border-white/5 backdrop-blur-2xl rounded-3xl p-16 overflow-hidden">
               <div className="absolute -right-24 -top-24 text-brand-blue/5 pointer-events-none rotate-12">
                 <Cpu size={400} />
               </div>
               <div className="space-y-12 relative z-10">
                 <div className="space-y-3">
                   <div className="flex items-center gap-2">
                      <span className="w-10 h-[1px] bg-brand-blue"></span>
                      <span className="text-brand-blue text-xs font-bold tracking-[0.5em] uppercase font-mono italic">Next Chapter</span>
                   </div>
                   <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-tight">人工智能带来的 <br />结构性变革探索</h2>
                 </div>
                 <p className="text-2xl text-slate-300 max-w-3xl leading-relaxed font-light">
                   将 AI 视为继互联网之后的新一轮生产力跃迁工具。本平台致力于记录 AI 在 <span className="text-brand-blue font-medium underline decoration-brand-blue/30 underline-offset-4">信息获取、认知增强与产业决策</span> 中的实际应用路径。
                 </p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 border-t border-white/10 pt-12">
                    {[
                      "AI 发展趋势下的宏观判断",
                      "跨境贸易中的 AI 自动化落地",
                      "个人决策体系的数字化重构",
                      "大宗商品供需的结构性演进"
                    ].map((item, i) => (
                      <div key={i} className="flex gap-6 items-center group/item cursor-pointer">
                        <div className="w-10 h-10 rounded border border-brand-blue/20 flex items-center justify-center text-brand-blue font-black text-sm font-mono group-hover/item:bg-brand-blue group-hover/item:text-slate-900 group-hover/item:border-brand-blue transition-all duration-300">0{i+1}</div>
                        <span className="text-lg text-slate-400 group-hover/item:text-white transition-colors tracking-tight">{item}</span>
                      </div>
                    ))}
                 </div>
               </div>
            </div>
          </section>

          {/* Philosophy Section */}
          <section className="text-center py-32 border-t border-industrial-border relative">
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
                 拒绝虚妄的宏大叙事。我们旨在交付从真实经验中演化出的 <span className="text-white font-medium">确定性信息增量</span>。
               </p>
             </div>
          </section>
        </div>
      </main>
    </div>
  );
}
