import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-industrial-border px-8 py-20 text-center text-white/5 text-[9px] tracking-[0.8em] font-mono uppercase bg-slate-950/40">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
        <div>© 2026 SILICON COMMODITY | ANALYTICAL TERMINAL V5.2.0 | ENCRYPTED LINK</div>
        <div className="text-[7px] text-white/2 opacity-50 tracking-[1.2em]">
          DATA_INTEGRITY_VERIFIED // SECURE_ORIGIN_ESTABLISHED
        </div>
      </div>
    </footer>
  );
}
