'use client';

import { useEffect, useRef } from 'react';
import katex from 'katex';
import renderMathInElement from 'katex/dist/contrib/auto-render';

interface ReportRendererProps {
  html: string;
  layout?: string;
}

export default function ReportRenderer({ html, layout = 'paper' }: ReportRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Manually trigger math rendering
    try {
      renderMathInElement(containerRef.current, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
        ],
        throwOnError: false,
      });
    } catch (err) {
      console.error('KaTeX rendering error:', err);
    }

    // 2. Clear and re-execute scripts to handle dynamic content (like Chart.js)
    const scripts = containerRef.current.querySelectorAll('script');
    const hasCanvas = containerRef.current.querySelector('canvas');
    
    const executeScripts = async () => {
      // 2a. Pre-load Chart.js if canvas exists but no chart.js script is found
      if (hasCanvas && !Array.from(scripts).some(s => s.src?.includes('chart.js'))) {
        const chartLib = document.createElement('script');
        chartLib.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        document.head.appendChild(chartLib);
        await new Promise(r => chartLib.onload = r);
      }

      for (const oldScript of Array.from(scripts)) {
        const newScript = document.createElement('script');
        
        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });

        if (oldScript.innerHTML) {
          newScript.text = oldScript.innerHTML;
        }

        const scriptPromise = new Promise((resolve) => {
          if (newScript.src) {
            newScript.onload = () => resolve(true);
            newScript.onerror = () => resolve(false);
          } else {
            resolve(true);
          }
        });

        document.head.appendChild(newScript);
        await scriptPromise;
        oldScript.parentNode?.removeChild(oldScript);
      }
    };

    executeScripts();
  }, [html]);

  // Determine container classes based on layout
  const containerClasses = layout === 'interactive' 
    ? "report-html-content-wrapper w-full" // Zero styling for interactive
    : "report-html-content-wrapper report-body mx-auto"; // Paper styles for standard

  return (
    <div className={layout === 'interactive' ? "w-full" : "space-y-12"}>
      {/* Article Content */}
      <div 
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: html }} 
        className={containerClasses}
      />
      
      {layout !== 'interactive' && <div className="pt-12" />}
    </div>
  );
}
