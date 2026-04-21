'use client';

import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
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
    // 1. Dual-mode parsing
    const foundItems: TOCItem[] = [];
    
    if (content) {
      if (content.includes('</h2>')) {
        const h2HtmlRegex = /<h2[^>]*>(.*?)<\/h2>/g;
        let match;
        let index = 0;
        while ((match = h2HtmlRegex.exec(content)) !== null) {
          const text = match[1].replace(/<[^>]*>/g, '').trim();
          const idMatch = match[0].match(/id="([^"]+)"/);
          const id = idMatch ? idMatch[1] : `section-${index}`;
          if (text && text.length < 40) {
            foundItems.push({ id, text });
          }
          index++;
        }
      } else {
        const h2MdRegex = /#{2}\s+(.*)/g;
        let match;
        let index = 0;
        while ((match = h2MdRegex.exec(content)) !== null) {
          foundItems.push({ id: `section-${index}`, text: match[1].trim() });
          index++;
        }
      }
      setItems(foundItems);
    } else {
      const scanDOM = () => {
        // ONLY scan Major Landmarks with explicit IDs or specific landmarks
        const domSections = document.querySelectorAll('section[id], main[id]');
        const domItems: TOCItem[] = [];
        
        const friendlyNames: Record<string, string> = {
          'header': '视角概览 // OVERVIEW',
          'categories': '分类筛选 // FILTER',
          'reports': '研报矩阵 // MATRIX',
          'intro': '实验室引言 // INTRO',
          'featured': '精选导引 // FEATURED',
          'archive': '全套档案 // ARCHIVE',
          'philosophy': '底层哲学 // THEORY'
        };

        domSections.forEach((el) => {
          if (friendlyNames[el.id]) {
            domItems.push({ 
              id: el.id, 
              text: friendlyNames[el.id] 
            });
          }
        });
        setItems(domItems);
      };
      
      const timer = setTimeout(scanDOM, 1000);
      return () => clearTimeout(timer);
    }

    // 2. Setup IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    const timer = setTimeout(() => {
      const landmarkIds = ['header', 'categories', 'reports', 'intro', 'featured', 'archive', 'philosophy'];
      landmarkIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 1200);

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
    <nav className="sticky top-24 z-50 hidden md:flex flex-col items-end w-[280px] shrink-0">
      <div className="relative flex flex-col items-center gap-10 py-10 w-full">
        <div className="absolute top-0 bottom-0 w-[1px] bg-white/10 right-[15px]" />
        
        <div 
          className={`absolute top-0 w-[1px] transition-all duration-300 right-[15px] ${themeBg}`}
          style={{ height: `${scrollProgress}%`, boxShadow: `0 0 10px ${themeColor}` }}
        />
        
        {items.map((item, idx) => {
          const isActive = activeId === item.id;
          return (
            <div key={`${item.id}-${idx}`} className="relative flex items-center justify-end group/item w-full pr-12">
              <div className={`
                absolute right-10 w-52 px-3 py-2 rounded-lg border border-white/5 
                backdrop-blur-2xl bg-slate-950/60 transition-all duration-500 text-right pointer-events-none
                ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 group-hover/item:opacity-100 group-hover/item:translate-x-0'}
              `}>
                <div className="flex items-center gap-2 mb-0.5 justify-end">
                  <span className={`text-[7px] font-black font-mono tracking-tighter opacity-40 ${themeAccent}`}>LVL.0{idx + 1}</span>
                  {isActive && <span className={`text-[7px] font-black animate-pulse font-mono ${themeAccent}`}>TRACKING</span>}
                </div>
                <span className={`text-[9px] font-bold tracking-[0.1em] uppercase leading-tight block break-words whitespace-normal ${isActive ? 'text-white' : 'text-white/40'}`}>
                  {item.text}
                </span>
              </div>
              
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
                  relative z-10 w-8 h-8 flex items-center justify-center transition-all duration-500
                  ${isActive ? 'scale-110' : 'hover:scale-110'}
                `}
              >
                <div className={`
                  w-1.5 h-1.5 transition-all duration-500 transform rotate-45
                  ${isActive ? `${themeBg} scale-125` : 'bg-white/10 group-hover/item:bg-white/40'}
                `} style={isActive ? { boxShadow: `0 0 8px ${themeColor}` } : {}} />
              </button>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
