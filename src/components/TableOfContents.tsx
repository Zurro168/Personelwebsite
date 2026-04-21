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
    // 1. Setup IntersectionObserver FIRST
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0px -70% 0px' }
    );

    const extractHeadings = () => {
      const container = document.querySelector('.report-body');
      if (!container) return;

      const containerHeight = container.scrollHeight;
      const headingElements = Array.from(container.querySelectorAll('h2, h3')) as HTMLElement[];
      
      const foundItems: TOCItem[] = headingElements.map((el, index) => {
        if (!el.id) {
          el.id = `heading-ref-${index}`;
        }
        
        // Calculate position relative to container ONLY
        const relativeTop = el.offsetTop;
        const topPos = (relativeTop / containerHeight) * 100;

        return {
          id: el.id,
          text: el.innerText.trim(),
          topPos: Math.min(Math.max(topPos, 2), 98) // Clamp within track
        };
      });

      setItems(foundItems);
      
      // Re-observe after items are set
      observer.disconnect();
      headingElements.forEach(el => observer.observe(el));
      
      // Also observe major landmarks
      const landmarkIds = ['header', 'categories', 'reports', 'intro', 'featured', 'archive', 'philosophy'];
      landmarkIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    };

    const initTimer = setTimeout(extractHeadings, 1200);

    const handleScroll = () => {
      const container = document.querySelector('.report-body');
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const containerHeight = container.scrollHeight;
      const scrolledInContainer = Math.max(0, -rect.top);
      const scrolled = (scrolledInContainer / containerHeight) * 100;
      setScrollProgress(Math.min(scrolled, 100));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      clearTimeout(initTimer);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [content]);

  if (items.length === 0) return null;

  return (
    <nav className="sticky top-32 z-50 hidden md:flex flex-col items-end w-[280px] shrink-0 mt-[120px]">
      <div className="relative h-[70vh] w-full">
        {/* Track Line - Flush Right */}
        <div className="absolute top-0 bottom-0 w-[1px] bg-white/5 right-0" />
        
        {/* Progress Bar - Flush Right */}
        <div 
          className={`absolute top-0 w-[1px] transition-all duration-300 right-0 ${themeBg}`}
          style={{ height: `${scrollProgress}%`, boxShadow: `0 0 15px ${themeColor}` }}
        />
        
        {items.map((item, idx) => {
          const isActive = activeId === item.id;
          return (
            <div 
              key={`${item.id}-${idx}`} 
              className="absolute right-0 flex items-center justify-end group/item w-full transition-all duration-700"
              style={{ top: `${item.topPos}%` }}
            >
              {/* Tooltip Label */}
              <div className={`
                absolute right-8 w-60 px-4 py-3 rounded-lg border border-white/5 
                backdrop-blur-3xl transition-all duration-500 text-right pointer-events-none
                ${isActive ? 'opacity-100 translate-x-0 bg-slate-900/80' : 'opacity-0 translate-x-4 group-hover/item:opacity-100 group-hover/item:translate-x-0 bg-slate-950/40'}
              `}>
                <div className="flex items-center gap-2 mb-1 justify-end">
                  <span className={`text-[8px] font-black font-mono tracking-widest ${isActive ? 'text-white' : 'text-white/20'}`}>LVL.0{idx + 1}</span>
                  {isActive && <span className={`text-[8px] font-black animate-pulse font-mono ${themeAccent} drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]`}>TRACKING</span>}
                </div>
                <span className={`text-[10px] font-black tracking-[0.05em] uppercase leading-tight block break-words whitespace-normal px-1 ${isActive ? 'text-white' : 'text-white/10'}`}>
                  {item.text}
                </span>
              </div>
              
              {/* Anchor Button - The Diamond */}
              <button 
                onClick={() => {
                  const el = document.getElementById(item.id);
                  if (el) {
                    const offset = 100;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = el.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
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
