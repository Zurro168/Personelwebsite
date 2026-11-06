'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Download, ShieldCheck, HelpCircle } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

/**
 * GCTS Case Study & Live Experience Page
 * 展示面向非洲关键矿产多式联运走廊的报价决策系统
 */
export default function GctsCaseStudy() {
  const breadcrumbs = [
    { name: '深度研报与作品', href: '/portfolio' },
    { name: 'GCTS 交易决策系统', href: '/portfolio/gcts' }
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-white pb-32">
      {/* 注入 CSS 模拟窗口样式 */}
      <style jsx>{`
        .window-container {
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(15, 23, 42, 0.45);
          backdrop-filter: blur(20px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
          transition: border-color 0.5s ease;
        }
        .window-container:hover {
          border-color: rgba(56, 189, 248, 0.25);
        }
        .window-bar {
          background: #101628;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .window-dots {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
        }
        .red { background: #ff5f56; }
        .yellow { background: #ffbd2e; }
        .green { background: #27c93f; }
        .window-title {
          color: rgba(255, 255, 255, 0.4);
          font-size: 11px;
          font-family: monospace;
          letter-spacing: 1px;
        }
        .demo-iframe {
          width: 100%;
          height: 750px;
          border: none;
          background: #0a0d16;
        }
      `}</style>

      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* 面包屑导航 */}
        <div className="mb-12 opacity-60 hover:opacity-100 transition-opacity duration-300">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* 返回作品集链接 */}
        <Link 
          href="/portfolio" 
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-widest mb-8 font-mono"
        >
          <ArrowLeft size={14} /> Back to Archive
        </Link>

        {/* --- 工业级头部介绍 (Case Study Header) --- */}
        <div className="bg-[#101726]/40 border border-white/5 p-12 rounded-3xl mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[45%] h-full bg-gradient-to-l from-cyan-500/[0.02] to-transparent pointer-events-none"></div>
          
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 relative z-10">
            <div className="space-y-6 flex-1">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-[0.3em] font-mono">FINTECH SYSTEM // PROJECT BRIEF</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase text-white leading-none">
                GCTS: 关键矿产智能报价决策系统
              </h1>
              <p className="text-lg text-slate-400 font-light leading-relaxed border-l-2 border-cyan-500/30 pl-6">
                非洲内陆国（乍得、刚果金等）大宗金属原料跨境采购是一项复杂的系统工程。本项目自研打通了“多流向内陆多式联运走廊”、“EXW / FOB 进出口倒算计价模型”与“AI 驱动地缘风控拦截红线”，为大型跨国实体交易提供一键测算与智能看板。
              </p>
            </div>
            
            <div className="flex flex-col gap-4 bg-black/30 p-6 rounded-2xl border border-white/5 font-mono text-xs text-slate-400 min-w-[280px]">
              <div className="text-[10px] font-black tracking-widest text-white/40 uppercase pb-2 border-b border-white/5">Project Metadata</div>
              <div className="flex justify-between py-1"><span>Code Name</span><span className="text-white font-bold">GCTS_OS</span></div>
              <div className="flex justify-between py-1"><span>Target Minerals</span><span className="text-white">锑矿, 钨矿, 锂矿</span></div>
              <div className="flex justify-between py-1"><span>Deploy State</span><span className="text-emerald-400 font-bold">✓ Production</span></div>
              <div className="flex justify-between py-1"><span>Tech Stack</span><span className="text-cyan-400">Vanilla JS / openpyxl</span></div>
            </div>
          </div>
        </div>

        {/* --- 大宗商品基础知识科普栏 (AI Code Tutor Guide) --- */}
        <section className="grid md:grid-cols-2 gap-10 mb-16">
          <div className="bg-[#101726]/20 border border-white/5 p-8 rounded-3xl space-y-6">
            <h3 className="text-lg font-black text-white italic uppercase tracking-wider flex items-center gap-2">
              <HelpCircle size={18} className="text-amber-400" />
              贸易术语简析 (Trade Terms Demystified)
            </h3>
            <div className="space-y-4 text-xs leading-relaxed text-slate-400">
              <p>
                <strong className="text-white block font-mono">1. EXW (Ex Works - 厂区/工厂现场交货)</strong>
                指买方直接在卖方矿区堆场提货。买方负责后续所有运送：装车、跨境路运、报关、海运及风险。此条款下采购成本虽低，但要求买方具备极强的本地清关与物流掌控力。
              </p>
              <p>
                <strong className="text-white block font-mono">2. FOB (Free on Board - 船上交货 / 离岸价)</strong>
                指卖方将精矿安全装上喀麦隆杜阿拉港的国际大船。装船过舷前的公路、铁路转运和乍得-喀麦隆海关清关风险全部由卖方负责。买方仅需管理海运并开立信用证。
              </p>
            </div>
          </div>

          <div className="bg-[#101726]/20 border border-white/5 p-8 rounded-3xl space-y-6">
            <h3 className="text-lg font-black text-white italic uppercase tracking-wider flex items-center gap-2">
              <HelpCircle size={18} className="text-cyan-400" />
              物理与物理计价基准 (Pricing Metrics)
            </h3>
            <div className="space-y-4 text-xs leading-relaxed text-slate-400">
              <p>
                <strong className="text-white block font-mono">1. DMT (Dry Metric Ton - 干公吨)</strong>
                大宗商品实物交易以“干重”计价。原矿开采出来带有一定水分（如 5% H2O）。计价公式为：
                <code className="block mt-1 bg-black/30 p-2 rounded text-cyan-400 font-mono text-[10px]">干重 (DMT) = 湿重 (WMT) × (1 - 水分 H2O%)</code>
              </p>
              <p>
                <strong className="text-white block font-mono">2. MTU (Metric Ton Unit - 吨度 / 吨金属)</strong>
                指每公吨矿石中含金属元素的百分比单位。例如：1干吨 50% 品位的锑精矿，等于 50个吨度（MTU）。大宗小金属价格通常以 MTU 价格来对外报价。
              </p>
            </div>
          </div>
        </section>

        {/* --- 业务架构与解决逻辑 --- */}
        <section className="bg-[#101726]/20 border border-white/5 p-12 rounded-3xl mb-16 space-y-10">
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white uppercase italic">系统解决逻辑与架构 (System Logic)</h2>
            <p className="text-xs text-slate-500 font-light">大宗商品贸易的盈利核心是对物流、海关和汇率的细节把控。GCTS 通过三大引擎统一量化决策：</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-lg font-mono text-cyan-400 font-bold">#01</div>
              <h4 className="text-white font-bold">公路/铁路转运联动算法</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">乍得北部 Mongo 矿区至喀麦隆 Ngaoundéré 陆港公路长达 750 公里（含非铺装土路和 20+ 个军警卡哨灰色费用），在 Ngaoundéré 换装 CAMRAIL 铁路前有高昂的折损与仓储保函费，系统实现了物流费用的精密分段拆解与倒算。</p>
            </div>
            
            <div className="space-y-4">
              <div className="text-lg font-mono text-amber-400 font-bold">#02</div>
              <h4 className="text-white font-bold">100% 对账物理稽核</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">前端网页的所有计算代码（水分扣减、品位乘数、增值税、关税、扣减费 TC）均与后端 openpyxl 生成的物理 Excel 对账报表公式 100% 同步对齐，支持贸易商直接将网页参数“一键下载”导出为脱机对账 Excel 模板。</p>
            </div>

            <div className="space-y-4">
              <div className="text-lg font-mono text-rose-400 font-bold">#03</div>
              <h4 className="text-white font-bold">红线风控动态预警</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">系统根据每年 7.15 - 10.15 乍得北部雨季公路阻断以及地缘政局事件，智能下发 Go / Watch / No Go 投资准入评估得分，实施交易流程的主动拦截与风险控制。</p>
            </div>
          </div>
        </section>

        {/* --- 在线体验中心 IFrame 容器 (Interactive demo cabin) --- */}
        <section id="demo-center" className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white italic uppercase tracking-tight">GCTS 智能控制中心体验舱</h2>
              <p className="text-xs text-slate-500 font-light">您可在下方的小型体验视口中直接操纵面板评估项目；也可点击右侧按钮，一键进入 100% 独立全屏的 GCTS OS 操作系统。</p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="/gcts/index.html" 
                target="_blank" 
                className="px-6 py-3 bg-cyan-500 text-slate-900 text-xs font-black tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all flex items-center gap-2"
              >
                启动全屏 GCTS 控制台 <ExternalLink size={14} />
              </a>
              <a 
                href="/gcts/GCTS_Metals_Pricing_Engine_V1.xlsx" 
                download 
                className="px-6 py-3 border border-white/10 text-white text-xs font-black tracking-widest rounded-xl hover:bg-white/5 transition-all flex items-center gap-2"
              >
                下载 Excel 算账模板 <Download size={14} />
              </a>
            </div>
          </div>

          {/* Mac 风格 IFrame 控制舱 */}
          <div className="window-container">
            <div className="window-bar">
              <div className="window-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="window-title">GCTS_Decision_Center_Interactive_V0.1.html</div>
              <div className="w-10"></div> {/* 占位平衡 */}
            </div>
            
            <iframe 
              src="/gcts/index.html" 
              className="demo-iframe" 
              loading="lazy" 
              title="GCTS Live Dashboard Demo"
            />
          </div>
        </section>

        {/* --- 页脚保护声明 --- */}
        <footer className="mt-20 pt-10 border-t border-white/5 flex items-center justify-center gap-2 text-[10px] text-slate-600 font-mono tracking-widest uppercase">
          <ShieldCheck size={12} className="text-cyan-500/40" />
          <span>FINTECH SYSTEM IP | SYSTEM INTEGRATED SECURELY // 2026</span>
        </footer>
      </main>
    </div>
  );
}
