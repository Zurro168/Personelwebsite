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
    <header className="border-b border-industrial-border sticky top-0 bg-background/60 backdrop-blur-xl z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3 group">
          <Link href="/" className="w-9 h-9 bg-brand-blue rounded shadow-[0_0_15px_rgba(56,189,248,0.3)] flex items-center justify-center text-slate-900 font-black cursor-pointer transition-transform group-hover:scale-105 shrink-0">Si</Link>
          <div className="flex flex-col h-9 justify-center">
            <Link href="/" className="flex items-center gap-2 group-hover:opacity-80 transition-opacity whitespace-nowrap">
              <span className="text-xl font-black tracking-tighter text-white leading-none">硅基大宗</span>
              <span className="text-brand-blue/40 font-light leading-none">|</span>
              <span className="text-brand-blue text-[11px] uppercase tracking-[0.3em] font-bold leading-none mt-[2px]">Terminal</span>
            </Link>
          </div>
        </div>
        <nav className="flex gap-10 text-[15px] font-bold tracking-[0.2em] text-white/50">
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
