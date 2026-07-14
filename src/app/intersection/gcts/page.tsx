'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

/**
 * GCTS 跨界实验室子栏目页面
 * 布局：体验舱最上，解决逻辑最下，剥离基础科普
 */
export default function GctsLabPage() {
  const breadcrumbs = [
    { name: '跨界实验室', href: '/intersection' },
    { name: 'GCTS 交易决策系统', href: '/intersection/gcts' }
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-200 font-sans selection:bg-purple-500/30 selection:text-white pb-32">
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
          border-color: rgba(168, 85, 247, 0.25);
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
          height: min(780px, calc(100vh - 160px));
          min-height: 560px;
          border: none;
          background: #0a0d16;
        }
        @media (max-width: 640px) {
          .window-container {
            border-radius: 12px;
          }
          .window-bar {
            padding: 10px 12px;
          }
          .window-title {
            max-width: 68%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .demo-iframe {
            height: calc(100vh - 120px);
            min-height: 520px;
          }
        }
      `}</style>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* 面包屑导航 */}
        <div className="mb-12 opacity-60 hover:opacity-100 transition-opacity duration-300">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* 返回跨界实验室链接 */}
        <Link 
          href="/intersection" 
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-purple-400 transition-colors uppercase tracking-widest mb-8 font-mono"
        >
          <ArrowLeft size={14} /> Back to Lab
        </Link>


        {/* --- 1. GCTS 智能控制中心体验舱 (放置在最顶部) --- */}
        <section id="demo-center" className="space-y-8 mb-20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white italic uppercase tracking-tight">GCTS 智能控制中心体验舱</h2>
              <p className="text-xs text-slate-500 font-light">您可在下方的小型体验视口中直接操纵面板评估项目；也可点击右侧按钮，一键进入 100% 独立全屏的 GCTS OS 操作系统。</p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="/gcts/index.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-purple-500 text-white text-xs font-black tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all flex items-center gap-2"
              >
                启动全屏 GCTS 控制台 <ExternalLink size={14} />
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
              src="/gcts/index.html?v=1.0.5" 
              className="demo-iframe" 
              loading="lazy" 
              title="GCTS Live Dashboard Demo"
            />
          </div>
        </section>

        {/* --- 2. 业务架构与解决逻辑 (System Logic - 放在最底部) --- */}
        <section id="system-logic" className="bg-[#101726]/20 border border-white/5 p-6 sm:p-12 rounded-3xl space-y-10">
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white uppercase italic">系统解决逻辑与架构 (System Logic)</h2>
            <p className="text-xs text-slate-500 font-light">大宗商品贸易的盈利核心是对物流、海关和汇率的细节把控。GCTS 通过三大引擎统一量化决策：</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-lg font-mono text-purple-400 font-bold">#01</div>
              <h4 className="text-white font-bold">公路/铁路转运联动算法</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">乍得北部 Mongo 矿区至喀麦隆 Ngaoundéré 陆港公路长达 750 公里（含非铺装土路和 20+ 个军警卡哨灰色费用），在 Ngaoundéré 换装 CAMRAIL 铁路前有高昂的折损与仓储保函费，系统实现了物流费用的精密分段拆解与倒算。</p>
            </div>
            
            <div className="space-y-4">
              <div className="text-lg font-mono text-amber-400 font-bold">#02</div>
              <h4 className="text-white font-bold">100% 对账物理稽核</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">前端网页的所有计算代码（水分扣减、品位乘数、增值税、关税、扣减费 TC）均与后端 openpyxl 生成 of 物理 Excel 对账报表公式 100% 同步对齐，支持贸易商直接将网页参数“一键下载”导出为脱机对账 Excel 模板。</p>
            </div>

            <div className="space-y-4">
              <div className="text-lg font-mono text-rose-400 font-bold">#03</div>
              <h4 className="text-white font-bold">红线风控动态预警</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">系统根据每年 7.15 - 10.15 乍得北部雨季公路阻断以及地缘政局事件，智能下发 Go / Watch / No Go 投资准入评估得分，实施交易流程的主动拦截与风险控制。</p>
            </div>
          </div>
        </section>

        {/* --- 页脚保护声明 --- */}
        <footer className="mt-20 pt-10 border-t border-white/5 flex items-center justify-center gap-2 text-[10px] text-slate-600 font-mono tracking-widest uppercase">
          <ShieldCheck size={12} className="text-purple-500/40" />
          <span>FINTECH SYSTEM IP | SYSTEM INTEGRATED SECURELY // 2026</span>
        </footer>
      </main>
    </div>
  );
}
