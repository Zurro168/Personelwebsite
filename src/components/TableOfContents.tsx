'use client';

import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
}

export default function TableOfContents({ content }: { content: string }) {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // 1. Dual-mode parsing: works for raw Markdown (##) or Synced HTML (h2)
    const foundItems: TOCItem[] = [];
    
    // Check if it's the 2026 Mining Battle report which has specific ID structures
    // or standard synced reports
    if (content.includes('</h2>')) {
      // HTML Path: Extract text from <h2>...</h2>
      // We look for both <h2> with IDs and without
      const h2HtmlRegex = /<h2[^>]*>(.*?)<\/h2>/g;
      let match;
      let index = 0;
      while ((match = h2HtmlRegex.exec(content)) !== null) {
        const text = match[1].replace(/<[^>]*>/g, '').trim();
        // Try to find if the h2 already has an ID (like in Mining Battle)
        const idMatch = match[0].match(/id="([^"]+)"/);
        const id = idMatch ? idMatch[1] : `section-${index}`;
        
        // Filter out obvious meta-headers if needed
        if (text && !['2026 矿业版图', '导航'].includes(text)) {
          foundItems.push({ id, text });
        }
        index++;
      }
    } else {
      // Markdown Path: Extract text from ## ...
      const h2MdRegex = /#{2}\s+(.*)/g;
      let match;
      let index = 0;
      while ((match = h2MdRegex.exec(content)) !== null) {
        foundItems.push({ id: `section-${index}`, text: match[1].trim() });
        index++;
      }
    }
    
    setItems(foundItems);

    // 2. Setup IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0px -80% 0px' }
    );

    // 3. Bind elements
    const timer = setTimeout(() => {
      // Primary targets: manually assigned IDs or discovered ones
      const sectionElements = document.querySelectorAll(
        '.prose-cyber h2, .report-html-content-wrapper h2, section[id]'
      );
      
      sectionElements.forEach((el, index) => {
        if (!el.id) {
          el.setAttribute('id', `section-${index}`);
        }
        observer.observe(el);
      });
    }, 800);

    // 4. Global scroll progress for the vertical line
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [content]);

  if (items.length === 0) return null;

  return (
    <nav className="fixed right-6 lg:right-12 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end group pointer-events-none">
      <div className="relative flex flex-col items-center gap-12 py-12 pointer-events-auto">
        {/* The Baseline Track - More visible */}
        <div className="absolute top-0 bottom-0 w-[4px] bg-white/5 right-[10px] rounded-full" />
        
        {/* The Active Progress Fill - Distinct glow */}
        <div 
          className="absolute top-0 w-[4px] bg-brand-blue right-[10px] transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.5)] rounded-full" 
          style={{ height: `${scrollProgress}%` }}
        />
        
        {items.map((item, idx) => {
          const isActive = activeId === item.id;
          return (
            <div key={`${item.id}-${idx}`} className="relative flex items-center justify-end group/item">
              {/* Optional Label - Always visible but dimmed if not active */}
              <div className={`
                absolute right-10 flex flex-col items-end transition-all duration-500
                ${isActive ? 'opacity-100 translate-x-0' : 'opacity-10 group-hover/item:opacity-50 translate-x-2'}
              `}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[8px] font-black text-brand-blue/40 font-mono tracking-tighter">NODE 0{idx + 1}</span>
                  {isActive && <span className="text-[8px] font-black text-brand-blue animate-pulse font-mono">LIVE</span>}
                </div>
                <span className={`
                  whitespace-nowrap text-[11px] font-bold tracking-[0.1em] uppercase transition-colors
                  ${isActive ? 'text-white' : 'text-white/60'}
                `}>
                  {item.text}
                </span>
              </div>
              
              {/* Milestone Node - Larger and more explicit */}
              <a 
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`
                  relative z-10 w-8 h-8 flex items-center justify-center rounded-sm border-2 transition-all duration-500 transform
                  ${isActive 
                    ? 'border-brand-blue bg-slate-900 rotate-45 scale-125 shadow-[0_0_20px_rgba(56,189,248,0.4)]' 
                    : 'border-white/10 bg-background/80 hover:border-white/20 rotate-45 hover:scale-110'}
                `}
              >
                {/* Inner Dot - Squares for industrial feel */}
                <div className={`
                  w-2.5 h-2.5 transition-all duration-500
                  ${isActive ? 'bg-brand-blue' : 'bg-white/5'}
                `} />
                
                {/* Active Indicator Pulse */}
                {isActive && (
                  <div className="absolute -inset-2 border border-brand-blue/20 rounded-sm animate-ping" />
                )}
              </a>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
