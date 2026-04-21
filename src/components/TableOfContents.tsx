'use client';

import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  topPos: number; // Percentage from top
}

export default function TableOfContents({ 
  content, 
  variant = 'blue' 
}: { 
  content: string; 
  variant?: 'blue' | 'experiment' 
}) {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState(0);

  const themeColor = variant === 'experiment' ? 'var(--brand-experiment)' : 'var(--brand-blue)';
  const themeAccent = variant === 'experiment' ? 'text-brand-experiment' : 'text-brand-blue';
  const themeBorder = variant === 'experiment' ? 'border-brand-experiment' : 'border-brand-blue';
  const themeBg = variant === 'experiment' ? 'bg-brand-experiment' : 'bg-brand-blue';

  useEffect(() => {
    const timer = setTimeout(() => {
      const containerEl = document.querySelector('.report-layout-container') as HTMLElement;
      if (!containerEl) return;
      
      const containerRect = containerEl.getBoundingClientRect();
      const hElements = document.querySelectorAll('.report-body h2, .report-body h3, .interactive-base h1, .interactive-base h2, .interactive-base h3, #reports, #intro, #market-structure');
      
      let extracted: TOCItem[] = [];
      
      hElements.forEach(el => {
        const id = el.id || el.textContent?.trim().toLowerCase().replace(/\s+/g, '-');
        if (!el.id) el.id = id || '';
        
        if (id && el.textContent) {
          let text = el.textContent.trim();
          // Clean up markdown/emoji prefixes
          text = text.replace(/^#+\s*/, '').replace(/^[\u{1F300}-\u{1F9FF}]\s*/u, '').trim();

          const rect = el.getBoundingClientRect();
          // Calculate Top relative to our shared layout container
          const topPos = rect.top - containerRect.top;

          extracted.push({ id, text, topPos });
        }
      });

      // Sort vertically
      extracted.sort((a, b) => a.topPos - b.topPos);

      // Avoid overlap for items that are too close
      for (let i = 1; i < extracted.length; i++) {
        if (extracted[i].topPos - extracted[i-1].topPos < 40) {
          extracted[i].topPos = extracted[i-1].topPos + 40;
        }
      }

      setItems(extracted);
    }, 500);

    return () => clearTimeout(timer);
  }, [content]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const containerEl = document.querySelector('.report-layout-container');
          if (!containerEl) return;

          const containerRect = containerEl.getBoundingClientRect();
          const scrollPos = -containerRect.top + 200;
          
          let currentId = items[0]?.id;
          let currentLineHeight = 0;

          let activeIndex = -1;
          for (let i = 0; i < items.length; i++) {
            if (items[i].topPos <= scrollPos) {
              currentId = items[i].id;
              activeIndex = i;
            } else {
              break;
            }
          }

          if (activeIndex >= 0) {
            currentLineHeight = items[activeIndex].topPos;
          }

          setActiveId(currentId || '');
          setScrollProgress(currentLineHeight);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="absolute inset-y-0 right-[-32px] md:right-8 w-[280px] pointer-events-none hidden md:block">
      <div className="relative h-full w-full">
        <div className="absolute top-0 bottom-0 w-[1px] bg-white/5 right-0" />
        
        <div 
          className={`absolute top-0 w-[1px] transition-all duration-300 right-0 ${themeBg}`}
          style={{ height: `${scrollProgress}px`, boxShadow: `0 0 15px ${themeColor}` }}
        />
        
        {items.map((item, idx) => {
          const isActive = activeId === item.id;
          return (
            <div 
              key={`${item.id}-${idx}`} 
              className={`absolute right-0 flex items-center justify-end group/item w-full transition-all duration-700 ${isActive ? 'z-50' : 'z-10'}`}
              style={{ top: `${item.topPos}px` }}
            >
              <div className={`
                absolute right-8 w-60 px-4 py-3 rounded-lg border backdrop-blur-3xl transition-all duration-500 text-right pointer-events-auto cursor-pointer
                ${isActive ? 'opacity-100 translate-x-0 bg-slate-900/80 border-white/20' : 'opacity-100 translate-x-0 bg-transparent border-transparent hover:bg-slate-950/40 hover:border-white/5'}
              `}
              onClick={() => {
                const el = document.getElementById(item.id);
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 100;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              >
                <div className="flex items-center gap-2 mb-1 justify-end">
                  <span className={`text-[8px] font-black font-mono tracking-widest ${isActive ? 'text-white' : 'text-white/20'}`}>LVL.0{idx + 1}</span>
                  {isActive && <span className={`text-[8px] font-black animate-pulse font-mono ${themeAccent} drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]`}>TRACKING</span>}
                </div>
                <span className={`text-[10px] font-black tracking-[0.05em] uppercase leading-tight block break-words whitespace-normal px-1 ${isActive ? 'text-white' : 'text-white/30'}`}>
                  {item.text}
                </span>
              </div>
              
              <button 
                onClick={() => {
                  const el = document.getElementById(item.id);
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
                className={`
                  relative z-10 w-6 h-6 flex items-center justify-end transition-all duration-500
                  ${isActive ? 'scale-125' : 'hover:scale-110'}
                `}
              >
                <div className={`
                  w-1.5 h-1.5 transition-all duration-500 transform rotate-45 mr-[-2px]
                  ${isActive ? `${themeBg} scale-150` : 'bg-white/10 group-hover/item:bg-white/40'}
                `} style={isActive ? { boxShadow: `0 0 12px ${themeColor}`, backgroundColor: '#FFFFFF' } : {}} />
              </button>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
