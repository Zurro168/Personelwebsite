'use client';

import React from 'react';
import Link from 'next/link';
import { 
  User, Mail, Phone, Briefcase, GraduationCap, 
  Printer, ArrowLeft, ShieldCheck, MapPin, Globe, Sparkles
} from 'lucide-react';
import { AUTHOR_INFO } from '@/data/biography';

/**
 * Premium Bento Style Resume & About Me Page
 * 极致高阶极客暗色Bento排版，剔除臃肿大图，开门见山展示核心大宗专家履历
 */
export default function AboutPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-200 font-sans selection:bg-purple-500/30 selection:text-white pb-32 relative overflow-hidden">
      
      {/* 打印专属全局样式注入 */}
      <style jsx global>{`
        @media print {
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          .no-print {
            display: none !important;
          }
          .print-full-width {
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
          }
          .print-card {
            border: none !important;
            background: transparent !important;
            box-shadow: none !important;
            color: #000000 !important;
            padding: 10px 0 !important;
          }
          .print-text-dark {
            color: #000000 !important;
          }
          .print-text-muted {
            color: #555555 !important;
          }
          .timeline-line {
            border-left-color: #cccccc !important;
          }
          .timeline-dot {
            background-color: #000000 !important;
          }
        }
      `}</style>

      {/* Background radial gradients for tech mood */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/[0.02] blur-[150px] pointer-events-none no-print"></div>
      <div className="absolute bottom-20 right-1/4 w-[600px] h-[600px] bg-cyan-500/[0.02] blur-[150px] pointer-events-none no-print"></div>

      {/* TOP NAVIGATION HEADER (no-print) */}
      <div className="bg-[#0b1120]/60 backdrop-blur-md border-b border-white/5 h-14 flex justify-between items-center px-8 sticky top-0 z-50 no-print">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-purple-400 transition-colors uppercase tracking-widest font-mono"
        >
          <ArrowLeft size={14} /> Back to Terminal
        </Link>
        
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-purple-400/80 tracking-widest uppercase">GORDON WANG // BIO</span>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-1.5 bg-purple-500/10 border border-purple-500/30 hover:border-purple-400 text-purple-300 text-xs font-bold tracking-wider rounded-lg transition-all"
          >
            <Printer size={12} /> 打印/保存 PDF
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-8 py-16 print-full-width">
        <div className="grid lg:grid-cols-[1.1fr_2.2fr] gap-12 items-start print-full-width">
          
          {/* ======================================================== */}
          {/* 左侧栏：个人数字名片舱 (Bento Sidebar) */}
          {/* ======================================================== */}
          <div className="space-y-8 sticky top-24 no-print print-full-width">
            
            {/* 核心个人卡 */}
            <div className="bg-[#101726]/40 border border-white/5 p-8 rounded-3xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/10 to-transparent blur-xl pointer-events-none"></div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold tracking-widest rounded-lg font-mono uppercase">ABOUT Gordon</span>
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-ping"></div>
                </div>

                <div className="space-y-2">
                  <h1 className="text-4xl font-black tracking-tight text-white">{AUTHOR_INFO.name}</h1>
                  <p className="text-sm font-mono text-purple-400 font-bold uppercase tracking-wider">{AUTHOR_INFO.job_title}</p>
                </div>

                <p className="text-sm text-slate-400 font-light leading-relaxed border-l-2 border-purple-500/20 pl-4 italic">
                  &ldquo;{AUTHOR_INFO.motto}&rdquo;
                </p>

                {/* 社交/物理属性网格 */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <MapPin size={12} className="text-purple-400" />
                    <span>广东广州</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={12} className="text-purple-400" />
                    <span>籍贯山东</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 微信与联络 Bento */}
            <div className="bg-[#101726]/20 border border-white/5 p-8 rounded-3xl space-y-6">
              <h3 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-purple-400/80">联络与数字网络</h3>
              
              <div className="space-y-4 text-xs font-mono">
                <div className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <Mail size={14} className="text-purple-400" />
                    <span>电子邮箱</span>
                  </div>
                  <a href={`mailto:${AUTHOR_INFO.email}`} className="text-white hover:text-purple-400 transition-colors font-bold">{AUTHOR_INFO.email}</a>
                </div>

                <div className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <User size={14} className="text-purple-400" />
                    <span>微信号码</span>
                  </div>
                  <span className="text-white font-bold">{AUTHOR_INFO.social.wechat.id}</span>
                </div>
              </div>

              {/* 二维码展示区 - 纵向高档列表，彻底防挤压 */}
              <div className="space-y-4 pt-2">
                <div className="bg-black/30 border border-white/5 p-4 rounded-2xl flex items-center gap-4 hover:border-purple-500/20 transition-all duration-300">
                  <div className="w-16 h-16 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-lg relative overflow-hidden">
                    <img 
                      src={AUTHOR_INFO.social.wechat.qrCode} 
                      alt="个人微信" 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) parent.innerHTML = '<span class="text-[9px] text-slate-500 text-center">微信</span>';
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white font-mono">{AUTHOR_INFO.social.wechat.id}</h4>
                    <p className="text-[10px] text-slate-500 font-light leading-none">扫码添加个人微信</p>
                  </div>
                </div>

                <div className="bg-black/30 border border-white/5 p-4 rounded-2xl flex items-center gap-4 hover:border-purple-500/20 transition-all duration-300">
                  <div className="w-16 h-16 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-lg relative overflow-hidden">
                    <img 
                      src={AUTHOR_INFO.social.officialAccount.qrCode} 
                      alt="公众号" 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) parent.innerHTML = '<span class="text-[9px] text-slate-500 text-center">公众号</span>';
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white">硅基大宗</h4>
                    <p className="text-[10px] text-slate-500 font-light leading-none">扫码关注公众号</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 专业背书 */}
            <div className="bg-[#101726]/10 border border-white/5 p-6 rounded-3xl flex items-center gap-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              <ShieldCheck size={14} className="text-purple-500/60" />
              <span>Verified Commodity Professional</span>
            </div>

          </div>

          {/* ======================================================== */}
          {/* 右侧栏：履历时间轴 & 教育背景 (Bento Content) */}
          {/* ======================================================== */}
          <div className="space-y-12 print-full-width">
            
            {/* 打印版专属头部 (在屏幕上隐藏) */}
            <div className="hidden print:block mb-8">
              <h1 className="text-3xl font-black text-black mb-2">{AUTHOR_INFO.name}</h1>
              <p className="text-sm font-bold text-slate-700">{AUTHOR_INFO.job_title} | {AUTHOR_INFO.email}</p>
              <p className="text-xs text-slate-500 mt-2 font-light">{AUTHOR_INFO.motto}</p>
              <hr className="my-4 border-slate-300" />
            </div>

            {/* 1. 核心工作经历 (Work Experience) */}
            <section className="bg-[#101726]/20 border border-white/5 p-10 rounded-[2rem] space-y-10 print-card">
              <div className="flex items-center gap-3 pb-4 border-b border-white/5 print:border-slate-200">
                <Briefcase size={18} className="text-purple-400 print:text-black" />
                <h2 className="text-xl font-black text-white italic uppercase tracking-wider print-text-dark">核心业务履历 (Experience)</h2>
              </div>

              {/* 垂直时间轴容器 */}
              <div className="relative pl-6 space-y-12">
                {/* 渐变竖线 */}
                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-purple-500 via-cyan-500/40 to-slate-800/10 timeline-line"></div>

                {AUTHOR_INFO.experience.map((exp, idx) => (
                  <div key={idx} className="relative group space-y-3">
                    {/* 时间轴圆点 */}
                    <div className="absolute -left-[24px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#0a0f1a] border-2 border-purple-500 group-hover:bg-purple-500 transition-colors duration-300 timeline-dot"></div>

                    {/* 头部信息 */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors leading-tight print-text-dark">
                          {exp.role}
                        </h3>
                        <p className="text-xs font-mono font-bold text-purple-400/80 uppercase print-text-muted">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-900/40 px-2.5 py-1 rounded-md border border-white/5 uppercase tracking-wider print:border-none print:bg-transparent print-text-muted">
                        {exp.duration}
                      </span>
                    </div>

                    {/* 详细描述 */}
                    <p className="text-xs leading-relaxed text-slate-400 font-light print-text-muted">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. 教育背景 (Education) */}
            <section className="bg-[#101726]/20 border border-white/5 p-10 rounded-[2rem] space-y-8 print-card">
              <div className="flex items-center gap-3 pb-4 border-b border-white/5 print:border-slate-200">
                <GraduationCap size={18} className="text-purple-400 print:text-black" />
                <h2 className="text-xl font-black text-white italic uppercase tracking-wider print-text-dark">教育背景 (Education)</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {AUTHOR_INFO.education.map((edu, idx) => (
                  <div key={idx} className="p-6 bg-slate-900/30 rounded-2xl border border-white/5 space-y-3 print:bg-transparent print:border-none print:p-0">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white print-text-dark">{edu.degree}</h4>
                      <p className="text-xs font-mono text-purple-400/80 print-text-muted">{edu.school}</p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 block">{edu.duration}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. 核心数智技能 (Expertise) */}
            <section className="bg-[#101726]/20 border border-white/5 p-10 rounded-[2rem] space-y-8 print-card">
              <div className="flex items-center gap-3 pb-4 border-b border-white/5 print:border-slate-200">
                <Sparkles size={16} className="text-purple-400 print:text-black" />
                <h2 className="text-xl font-black text-white italic uppercase tracking-wider print-text-dark">商业与数智技能 (Expertise)</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {AUTHOR_INFO.skills.map((skill, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300 print-text-dark">{skill.name}</span>
                      <span className="text-purple-400 font-bold print-text-muted">{skill.level}%</span>
                    </div>
                    {/* 进度条 */}
                    <div className="h-1.5 w-full bg-slate-900/60 rounded-full overflow-hidden border border-white/5 no-print">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
