'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { ALL_REPORTS } from '@/data/reports';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import TableOfContents from '@/components/TableOfContents';

// 动态获取所有分类，确保与 reports.ts 同步
const TAGS = ['全部', ...Array.from(new Set(ALL_REPORTS.map(r => r.tag)))];

export default function Portfolio() {
  const [activeTag, setActiveTag] = useState('全部');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Increased density

  // Smart Sorting: hasContent (boolean) first, then date (string)
  const sortedReports = [...ALL_REPORTS].sort((a, b) => {
    if (a.hasContent !== b.hasContent) {
      return a.hasContent ? -1 : 1;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const filteredReports = sortedReports.filter(r => 
    activeTag === '全部' || r.tag === activeTag
  );

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const currentReports = filteredReports.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-background">
      {/* Node-based Progress Tracker */}
      <TableOfContents content="" />

      {/* Page Header */}
      <section id="header" className="px-8 py-6 bg-slate-900/40 border-b border-industrial-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue/5 blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-10 lg:pr-96">
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter">深度研报 <span className="text-brand-blue">/</span> Deep Insights</h1>
            <p className="text-slate-500 max-w-xl font-light text-xs leading-relaxed">
              致力于用第一性原理拆解大宗商品背后的物理与资本逻辑。所有研报均基于硅基大宗专有模型与长期产业深度访谈。
            </p>
          </div>
          <div className="flex bg-slate-800/50 p-1.5 rounded-lg border border-white/5 backdrop-blur-md">
            <input 
              type="text" 
              placeholder="搜索视角..." 
              className="bg-transparent px-4 py-2 outline-none text-xs text-white placeholder:text-white/20 w-48"
            />
            <button className="p-2 bg-brand-blue text-slate-900 rounded"><Search size={16} /></button>
          </div>
        </div>
      </section>



      <section id="categories" className="sticky top-[86px] z-40 bg-background/80 backdrop-blur-xl border-b border-white/5 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between lg:pr-96">
          <div className="flex gap-8 overflow-x-auto no-scrollbar py-3">
            {TAGS.map(tag => (
              <button 
                key={tag}
                onClick={() => { setActiveTag(tag); setCurrentPage(1); }}
                className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all whitespace-nowrap ${activeTag === tag ? 'text-brand-blue' : 'text-white/30 hover:text-white'}`}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-2 text-white/20">
            <Filter size={14} /> <span className="text-[10px] font-mono tracking-widest italic">Sorted by Recency</span>
          </div>
        </div>
      </section>

      {/* Breadcrumbs Section */}
      <div className="max-w-7xl mx-auto px-8 pt-4 lg:pr-96">
        <Breadcrumbs items={[{ name: '深度研报', href: '/portfolio' }]} />
      </div>

      {/* Reports Grid */}
      <main id="reports" className="max-w-7xl mx-auto px-8 py-8 lg:pr-96">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {currentReports.map((report) => (
            <article 
              key={report.id} 
              className={`group flex flex-col transition-opacity ${report.hasContent ? 'opacity-100' : 'opacity-60'}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded mb-6 border border-white/5 bg-slate-900">
                {report.hasContent ? (
                  <Link href={`/portfolio/${report.slug}`} className="block w-full h-full">
                    <img 
                      src={report.image} 
                      alt={report.title} 
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                    />
                  </Link>
                ) : (
                  <img 
                    src={report.image} 
                    alt={report.title} 
                    className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 transition-all duration-700" 
                  />
                )}
                <div className="absolute top-4 left-4">
                  <span className="text-brand-blue text-[9px] font-black uppercase tracking-[0.3em] font-mono">{report.tag}</span>
                </div>
              </div>
              
              <div className="space-y-4 flex-grow">
                <div className="flex justify-between items-center text-[10px] text-white/20 font-mono">
                  <span className="flex items-center gap-2"><Clock size={12} /> {report.readTime}</span>
                  <span className="flex items-center gap-2">
                    {report.hasContent && <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse"></span>}
                    {report.date}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white transition-colors group-hover:text-brand-blue leading-tight tracking-tight">
                  {report.hasContent ? (
                    <Link href={`/portfolio/${report.slug}`}>{report.title}</Link>
                  ) : (
                    <span className="cursor-help">{report.title}</span>
                  )}
                </h2>
                <p className="text-sm text-slate-500 line-clamp-2 font-light leading-relaxed">
                  {report.description}
                </p>
                <div className="pt-4 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-white/10 italic">#{report.id}</span>
                  {report.hasContent ? (
                    <Link href={`/portfolio/${report.slug}`} className="text-brand-blue text-xs font-black hover:underline transition-all flex items-center gap-2 underline-offset-4 decoration-2">
                      READ INSIGHT <span className="text-lg">→</span>
                    </Link>
                  ) : (
                    <span className="text-white/10 text-[10px] font-mono uppercase tracking-[0.2em] italic">Intelligence Pending...</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-24 pt-12 border-t border-white/5 flex items-center justify-center gap-10">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-4 border border-white/5 rounded-full text-white/30 hover:text-brand-blue hover:border-brand-blue/30 disabled:opacity-0 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-4 text-xs font-mono tracking-widest">
              <span className="text-brand-blue font-black">{currentPage}</span>
              <span className="text-white/10">/</span>
              <span className="text-white/40">{totalPages}</span>
            </div>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-4 border border-white/5 rounded-full text-white/30 hover:text-brand-blue hover:border-brand-blue/30 disabled:opacity-0 transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        {currentReports.length === 0 && (
          <div className="py-20 text-center space-y-4">
             <div className="text-brand-blue/20 text-6xl">∅</div>
             <p className="text-white/30 text-xs font-mono tracking-widest uppercase italic">No analysis found for this selection.</p>
          </div>
        )}
      </main>
    </div>
  );
}
