import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-8 py-16 text-center text-white/20 text-[10px] tracking-[0.2em] font-mono uppercase bg-slate-950/40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 px-8">
        <div className="flex items-center gap-2">
          <span>© 2026 SILICON COMMODITY | ANALYTICAL TERMINAL V5.2.0 | ENCRYPTED LINK</span>
        </div>
        <div className="flex gap-10 text-[9px] tracking-widest">
          <Link href="/" className="hover:text-brand-blue transition-colors">TERMINAL</Link>
          <Link href="/cycle-map" className="hover:text-brand-blue transition-colors">CYCLE MAP</Link>
          <Link href="/portfolio" className="hover:text-brand-blue transition-colors">ARCHIVE</Link>
          <Link href="/about" className="hover:text-brand-blue transition-colors">IP GUIDE</Link>
        </div>
      </div>
    </footer>
  );
}
