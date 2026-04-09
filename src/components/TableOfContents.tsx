'use client';

import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
}

export default function TableOfContents({ content }: { content: string }) {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Dual-mode parsing: works for raw Markdown (##) or Syneced HTML (<h2>)
    const foundItems: TOCItem[] = [];
    
    if (content.includes('</h2>')) {
      // HTML Path: Extract text from <h2>...</h2>
      const h2HtmlRegex = /<h2[^>]*>(.*?)<\/h2>/g;
      let match;
      let index = 0;
      while ((match = h2HtmlRegex.exec(content)) !== null) {
        // Strip nested tags if any
        const text = match[1].replace(/<[^>]*>/g, '').trim();
        foundItems.push({ id: `section-${index}`, text });
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

    // Setup IntersectionObserver to track which section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    // Give some time for the content to render
    const timer = setTimeout(() => {
      const sectionElements = document.querySelectorAll('.prose-cyber h2, .report-html-content h2');
      sectionElements.forEach((el, index) => {
        const id = `section-${index}`;
        el.setAttribute('id', id);
        observer.observe(el);
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [content]);

  if (items.length === 0) return null;

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-6 group">
      <div className="flex flex-col items-center gap-1 relative">
        {/* The thin background line */}
        <div className="absolute top-0 bottom-0 w-[1px] bg-white/10" />
        
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <div key={item.id} className="relative flex items-center justify-end w-full py-1">
              <a 
                href={`#${item.id}`}
                className={`
                  relative z-10 w-2 h-2 rounded-full border transition-all duration-500
                  ${isActive ? 'bg-brand-blue border-brand-blue scale-150 shadow-[0_0_10px_#38bdf8]' : 'bg-background border-white/20 hover:border-brand-blue'}
                `}
              />
              <span className={`
                absolute right-6 whitespace-nowrap text-[10px] font-mono tracking-widest uppercase transition-all duration-300
                ${isActive ? 'text-brand-blue opacity-100 translate-x-0' : 'text-white/20 opacity-0 translate-x-4 group-hover:opacity-40'}
              `}>
                {item.text}
              </span>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
