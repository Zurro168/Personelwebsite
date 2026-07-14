'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Briefcase,
  ExternalLink,
  GraduationCap,
  Globe2,
  Mail,
  MapPin,
  Printer,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { AUTHOR_INFO } from '@/data/biography';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-200 pb-24">
      <style jsx global>{`
        @media print {
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          .no-print {
            display: none !important;
          }
          .resume-grid {
            display: block !important;
          }
          .print-card {
            break-inside: avoid;
            border: 0 !important;
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

      <div className="no-print border-b border-white/5 bg-[#0b1120]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 transition-colors hover:text-cyan-300"
          >
            <ArrowLeft size={14} /> 返回首页
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-md border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-xs font-bold text-cyan-200 transition-colors hover:border-cyan-300"
          >
            <Printer size={14} /> 打印 / 保存 PDF
          </button>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-12">
        <div className="resume-grid grid items-start gap-8 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,2.1fr)] lg:grid-rows-[auto_1fr] lg:gap-10">
          <aside className="no-print lg:col-start-1 lg:row-start-1">
            <div className="rounded-lg border border-white/10 bg-[#101726] p-6 sm:p-8 lg:sticky lg:top-24">
              <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-cyan-400/20 bg-cyan-400/5 px-2.5 py-1 text-[11px] font-bold text-cyan-300">
                <ShieldCheck size={13} /> 关键矿产实业履历
              </div>

              <h1 className="text-3xl font-black text-white sm:text-4xl">{AUTHOR_INFO.name}</h1>
              <p className="mt-3 text-sm font-bold leading-6 text-cyan-300">{AUTHOR_INFO.job_title}</p>
              <p className="mt-6 border-l-2 border-amber-300/50 pl-4 text-sm leading-7 text-slate-300">
                {AUTHOR_INFO.motto}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-5 text-xs text-slate-400">
                <span className="inline-flex items-center gap-2"><MapPin size={13} className="text-cyan-300" /> 广东广州</span>
                <span className="inline-flex items-center gap-2"><Globe2 size={13} className="text-cyan-300" /> 籍贯山东</span>
              </div>
            </div>
          </aside>

          <div className="space-y-8 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="hidden print:block">
              <h1 className="text-3xl font-black text-black">{AUTHOR_INFO.name}</h1>
              <p className="mt-2 text-sm font-bold text-slate-700">{AUTHOR_INFO.job_title} | {AUTHOR_INFO.email}</p>
              <p className="mt-2 text-xs text-slate-500">{AUTHOR_INFO.motto}</p>
              <hr className="my-4 border-slate-300" />
            </div>

            <section aria-labelledby="career-evidence" className="rounded-lg border border-white/10 bg-[#101726]/70 p-6 sm:p-8 print-card">
              <div className="mb-6 flex items-center gap-3">
                <Sparkles size={18} className="text-amber-300 print:text-black" />
                <h2 id="career-evidence" className="text-lg font-black text-white print-text-dark">核心成果证据</h2>
              </div>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 lg:grid-cols-4">
                {AUTHOR_INFO.highlights.map((item) => (
                  <div key={item.label} className="bg-[#0d1422] p-4 sm:p-5 print:bg-white">
                    <p className="text-lg font-black text-cyan-300 print-text-dark">{item.value}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-400 print-text-muted">{item.label}</p>
                  </div>
                ))}
              </div>
            </section>

            <section aria-labelledby="experience" className="rounded-lg border border-white/10 bg-[#101726]/70 p-6 sm:p-8 print-card">
              <div className="mb-8 flex items-center gap-3 border-b border-white/10 pb-4 print:border-slate-200">
                <Briefcase size={18} className="text-cyan-300 print:text-black" />
                <h2 id="experience" className="text-xl font-black text-white print-text-dark">核心业务履历</h2>
              </div>

              <div className="relative space-y-9 pl-6">
                <div className="timeline-line absolute bottom-2 left-[7px] top-2 w-px bg-cyan-400/30" />
                {AUTHOR_INFO.experience.map((experience) => (
                  <article key={`${experience.company}-${experience.duration}`} className="relative">
                    <div className="timeline-dot absolute -left-[24px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-cyan-300 bg-[#0a0f1a]" />
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white print-text-dark">{experience.role}</h3>
                        <p className="mt-1 text-xs font-bold text-cyan-300 print-text-muted">{experience.company}</p>
                      </div>
                      <time className="shrink-0 text-xs text-slate-500 print-text-muted">{experience.duration}</time>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-400 print-text-muted">{experience.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="expertise" className="rounded-lg border border-white/10 bg-[#101726]/70 p-6 sm:p-8 print-card">
              <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4 print:border-slate-200">
                <Sparkles size={18} className="text-amber-300 print:text-black" />
                <h2 id="expertise" className="text-xl font-black text-white print-text-dark">专业能力与项目证据</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {AUTHOR_INFO.skills.map((skill) => (
                  <div key={skill.name} className="rounded-md border border-white/10 bg-black/15 p-4 print:border-slate-200 print:bg-white">
                    <h3 className="text-sm font-bold text-white print-text-dark">{skill.name}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-400 print-text-muted">{skill.evidence}</p>
                  </div>
                ))}
              </div>
            </section>

            <section aria-labelledby="education" className="rounded-lg border border-white/10 bg-[#101726]/70 p-6 sm:p-8 print-card">
              <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4 print:border-slate-200">
                <GraduationCap size={18} className="text-cyan-300 print:text-black" />
                <h2 id="education" className="text-xl font-black text-white print-text-dark">教育背景</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {AUTHOR_INFO.education.map((education) => (
                  <div key={`${education.school}-${education.duration}`} className="rounded-md border border-white/10 p-4 print:border-slate-200">
                    <h3 className="text-sm font-bold text-white print-text-dark">{education.degree}</h3>
                    <p className="mt-2 text-xs text-cyan-300 print-text-muted">{education.school}</p>
                    <p className="mt-2 text-xs text-slate-500 print-text-muted">{education.duration}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section aria-labelledby="contact" className="no-print rounded-lg border border-white/10 bg-[#101726] p-6 lg:col-start-1 lg:row-start-2 lg:self-start">
            <h2 id="contact" className="text-sm font-black text-white">公开联络方式</h2>
            <p className="mt-2 text-xs leading-5 text-slate-500">商务合作请优先使用邮箱或 LinkedIn。</p>

            <div className="mt-5 space-y-3 text-xs">
              <a href={`mailto:${AUTHOR_INFO.email}`} className="flex items-center justify-between gap-3 rounded-md border border-white/10 p-3 text-slate-300 transition-colors hover:border-cyan-300/40 hover:text-white">
                <span className="inline-flex items-center gap-2"><Mail size={14} className="text-cyan-300" /> 电子邮箱</span>
                <span className="truncate font-bold">{AUTHOR_INFO.email}</span>
              </a>
              <a href={AUTHOR_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 rounded-md border border-white/10 p-3 text-slate-300 transition-colors hover:border-cyan-300/40 hover:text-white">
                <span className="inline-flex items-center gap-2"><Globe2 size={14} className="text-cyan-300" /> LinkedIn</span>
                <ExternalLink size={13} />
              </a>
            </div>

            <div className="mt-5 flex items-center gap-4 rounded-md border border-white/10 bg-black/20 p-3">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white p-1">
                <Image
                  src={AUTHOR_INFO.social.officialAccount.qrCode}
                  alt="硅基大宗公众号二维码"
                  width={64}
                  height={64}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{AUTHOR_INFO.social.officialAccount.name}</p>
                <p className="mt-1 text-xs text-slate-500">公众号研究更新</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
