import React from 'react';
import fs from 'fs';
import path from 'path';
import { User, FileText, Briefcase, Mail, Download, GraduationCap, Award, Zap } from 'lucide-react';
import ReportRenderer from '@/components/ReportRenderer';
import { AUTHOR_INFO } from '@/data/biography';

async function getAboutContent() {
  const contentPath = path.join(process.cwd(), 'public/content/system/about.html');
  try {
    if (fs.existsSync(contentPath)) {
      return fs.readFileSync(contentPath, 'utf8');
    }
  } catch (err) {
    console.error("Failed to read about content:", err);
  }
  return null;
}

export default async function AboutPage() {
  const customContent = await getAboutContent();

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-brand-blue/30 selection:text-slate-900">
      
      {/* 🚀 TOP NAVIGATION ICONS (Resume Style) */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-slate-900 z-50 flex justify-center items-center gap-12 text-slate-400">
        <User size={20} className="hover:text-white transition-colors cursor-pointer" />
        <FileText size={20} className="text-white cursor-pointer" />
        <Briefcase size={20} className="hover:text-white transition-colors cursor-pointer" />
        <Mail size={20} className="hover:text-white transition-colors cursor-pointer" />
      </div>

      {/* 🖼️ HERO HEADER */}
      <section className="relative h-[650px] overflow-hidden group">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[3s] group-hover:scale-110"
          style={{ backgroundImage: 'url("/brand/hero-me.jpg")' }}
        >
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-7xl md:text-[100px] font-extralight tracking-tight text-white mb-6 animate-in fade-in slide-in-from-top-12 duration-1000">
            {AUTHOR_INFO.name}
          </h1>
          <div className="flex flex-col items-center gap-4 animate-in fade-in duration-1000 delay-300">
             <p className="text-xl md:text-2xl text-white/80 font-light tracking-[0.2em] uppercase">
               {AUTHOR_INFO.title} 
             </p>
             <div className="h-px w-24 bg-white/30"></div>
             <p className="text-slate-300 font-mono text-sm tracking-widest uppercase">
               {AUTHOR_INFO.social.email}
             </p>
          </div>
        </div>
      </section>

      {/* 🌑 SUMMARY STRIP (ABOUT) */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-12 grid md:grid-cols-[1fr_2fr_1fr] gap-12 items-start">
          <h2 className="text-xs font-black tracking-[0.5em] uppercase text-slate-500 mt-2">About</h2>
          <div className="space-y-6">
            <p className="text-xl font-light leading-relaxed text-slate-300">
              {AUTHOR_INFO.motto} 
              主理人深耕国际大宗商品领域，致力于将碳基行业的实战经验通过算法逻辑在硅基数字世界重构。
            </p>
            {customContent && (
              <div className="prose prose-invert prose-slate max-w-none pt-8 border-t border-white/10 opacity-70">
                <ReportRenderer html={customContent} />
              </div>
            )}
          </div>
          <div className="flex justify-end pt-2">
            <a href="#" className="flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase text-brand-blue hover:text-white transition-all group">
               <Download size={14} className="group-hover:-translate-y-1 transition-transform" />
               Download PDF
            </a>
          </div>
        </div>
      </section>

      {/* 📚 MAIN CONTENT GRID (Resume Body) */}
      <main className="max-w-6xl mx-auto px-12 py-32 space-y-40 text-slate-900">
        
        {/* EDUCATION */}
        <section className="grid md:grid-cols-[1fr_3fr] gap-12 md:gap-24 relative">
          <div className="sticky top-24 h-fit">
            <h2 className="text-xs font-bold tracking-[0.5em] uppercase text-slate-400 flex items-center gap-3">
               <GraduationCap size={16} /> Education
            </h2>
          </div>
          <div className="space-y-16">
            {AUTHOR_INFO.education.map((edu, idx) => (
              <div key={idx} className="group grid md:grid-cols-[auto_1fr_auto] gap-8 items-center">
                {/* 🏛️ School Logo Section */}
                <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-100 p-3 flex items-center justify-center overflow-hidden shrink-0 group-hover:bg-white group-hover:border-brand-blue/30 transition-all duration-500 shadow-sm relative">
                   <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                   {/* @ts-ignore */}
                   {edu.logo ? (
                     <img 
                       /* @ts-ignore */
                       src={edu.logo} 
                       alt={edu.school} 
                       className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700 relative z-10"
                     />
                   ) : (
                     <GraduationCap className="text-slate-300 relative z-10" size={32} />
                   )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-bold group-hover:text-brand-blue transition-all duration-300">{edu.degree}</h3>
                  <p className="text-slate-500 text-lg font-light tracking-wide">{edu.school}</p>
                </div>

                <div className="text-right space-y-2">
                  <span className="text-sm font-mono font-bold tracking-widest text-slate-300 uppercase block">{edu.duration}</span>
                  {/* @ts-ignore */}
                  {edu.status === 'IN_PROGRESS' && (
                    <span className="inline-block px-2 py-0.5 bg-brand-blue/10 text-brand-blue text-[8px] font-black tracking-widest rounded uppercase animate-pulse">In Progress</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px w-full bg-slate-100"></div>

        {/* WORK EXPERIENCE */}
        <section className="grid md:grid-cols-[1fr_3fr] gap-12 md:gap-24 relative">
          <div className="sticky top-24 h-fit">
            <h2 className="text-xs font-bold tracking-[0.5em] uppercase text-slate-400 flex items-center gap-3">
               <Briefcase size={16} /> Work
            </h2>
          </div>
          <div className="space-y-24">
            {AUTHOR_INFO.experience.map((exp, idx) => (
              <div key={idx} className="group grid md:grid-cols-[1fr_auto] gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold group-hover:text-brand-blue transition-colors">{exp.role}</h3>
                    <p className="text-slate-500 text-lg font-light tracking-wide">{exp.company}</p>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-light text-lg max-w-2xl">
                    {exp.description}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase whitespace-nowrap">{exp.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px w-full bg-slate-100"></div>

        {/* AWARDS */}
        <section className="grid md:grid-cols-[1fr_3fr] gap-12 md:gap-24 relative">
          <div className="sticky top-24 h-fit">
            <h2 className="text-xs font-bold tracking-[0.5em] uppercase text-slate-400 flex items-center gap-3">
               <Award size={16} /> Awards
            </h2>
          </div>
          <div className="space-y-16">
            {AUTHOR_INFO.awards.map((award, idx) => (
              <div key={idx} className="group grid md:grid-cols-[1fr_auto] gap-8">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold group-hover:text-brand-blue transition-colors">{award.title}</h3>
                  <p className="text-slate-500 text-lg font-light tracking-wide">{award.source}</p>
                </div>
                <div className="text-right">
                   <span className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">{award.year}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 🌌 SKILLS SECTION (Footer Strip) */}
      <section className="bg-slate-900 py-32">
        <div className="max-w-6xl mx-auto px-12 grid md:grid-cols-[1fr_3fr] gap-24">
          <h2 className="text-xs font-bold tracking-[0.5em] uppercase text-slate-500 mt-4 flex items-center gap-3">
             <Zap size={16} /> Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-32">
            {AUTHOR_INFO.skills.map((skill, idx) => (
              <div key={idx} className="flex flex-col items-center gap-8 group">
                <div className="relative w-28 h-28">
                  {/* Background Circle */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="56" cy="56" r="50"
                      fill="transparent"
                      stroke="#1e293b"
                      strokeWidth="6"
                    />
                    {/* Progress Circle */}
                    <circle
                      cx="56" cy="56" r="50"
                      fill="transparent"
                      stroke="#0ea5e9"
                      strokeWidth="6"
                      strokeDasharray={314}
                      strokeDashoffset={314 - (314 * skill.level) / 100}
                      className="transition-all duration-1000 group-hover:stroke-cyan-300"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-mono text-sm text-slate-400">
                     {skill.level}%
                  </div>
                </div>
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-300 group-hover:text-white transition-colors">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimalistic Footer */}
      <footer className="py-12 border-t border-slate-100 flex justify-center text-[10px] text-slate-300 font-mono tracking-widest uppercase">
        © {AUTHOR_INFO.copyright.year} {AUTHOR_INFO.copyright.owner} | Identity Verified
      </footer>
    </div>
  );
}
