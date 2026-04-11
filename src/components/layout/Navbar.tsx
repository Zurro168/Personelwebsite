'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: '首页', path: '/' },
    { name: '金属周期地图', path: '/cycle-map' },
    { name: '深度研报', path: '/portfolio' },
    { name: '跨界实验', path: '/intersection' },
    { name: '关于', path: '/about' },
  ];

  return (
    <header className="border-b border-white/5 sticky top-0 bg-[#0a0f1a]/80 backdrop-blur-xl z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4 group">
          <Link href="/" className="w-10 h-10 bg-cyan-500 rounded flex items-center justify-center text-slate-900 font-black cursor-pointer transition-transform group-hover:rotate-6 group-hover:scale-110 shrink-0 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            Si
          </Link>
          <div className="flex flex-col h-10 justify-center">
            <Link href="/" className="flex flex-col group-hover:opacity-80 transition-opacity">
              <span className="text-xl font-black tracking-tighter text-white leading-none mb-1">硅基大宗</span>
              <div className="flex items-center gap-2">
                <span className="text-cyan-500/50 text-[9px] uppercase tracking-[0.2em] font-mono leading-none">Intelligence</span>
                <span className="w-1 h-1 bg-cyan-500/20 rounded-full"></span>
                <span className="text-cyan-500 text-[9px] uppercase tracking-[0.3em] font-black leading-none italic">Terminal</span>
              </div>
            </Link>
          </div>
        </div>
        <nav className="flex gap-12 text-[14px] font-bold tracking-[0.1em] text-slate-400">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link 
                key={link.path} 
                href={link.path} 
                className={`transition-all relative group ${isActive ? 'text-brand-blue' : 'hover:text-brand-blue'}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-brand-blue transition-all ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
