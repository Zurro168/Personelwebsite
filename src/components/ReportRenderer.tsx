'use client';

import { useEffect, useRef } from 'react';
import katex from 'katex';
import renderMathInElement from 'katex/dist/contrib/auto-render';
import { AUTHOR_INFO } from '@/data/biography';
import { ShieldCheck } from 'lucide-react';

interface ReportRendererProps {
  html: string;
}

export default function ReportRenderer({ html }: ReportRendererProps) {
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
    
    // Create a sequential execution chain for scripts
    const executeScripts = async () => {
      // 2a. Pre-load Chart.js if canvas exists but no chart.js script is found
      if (hasCanvas && !Array.from(scripts).some(s => s.src.includes('chart.js'))) {
        const chartLib = document.createElement('script');
        chartLib.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        document.head.appendChild(chartLib);
        await new Promise(r => chartLib.onload = r);
      }

      for (const oldScript of Array.from(scripts)) {
        const newScript = document.createElement('script');
        
        // Copy attributes
        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });

        // Use .text for inline scripts to ensure correct execution
        if (oldScript.innerHTML) {
          newScript.text = oldScript.innerHTML;
        }

        // Wait for external scripts to load before proceeding
        const scriptPromise = new Promise((resolve) => {
          if (newScript.src) {
            newScript.onload = () => resolve(true);
            newScript.onerror = () => resolve(false);
          } else {
            // Inline scripts execute immediately upon insertion
            resolve(true);
          }
        });

        // Append to head or the container to trigger execution
        document.head.appendChild(newScript);
        
        // Remove from head after execution (optional)
        if (!newScript.src) {
           // We might want to keep it or remove it, but for inline scripts 
           // that do definitions, keeping them for a bit is safer.
        }
        
        await scriptPromise;
        oldScript.parentNode?.removeChild(oldScript);
      }
    };

    executeScripts();
  }, [html]);

  return (
    <div className="space-y-12">
      {/* Article Content */}
      <div 
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: html }} 
        className="report-html-content-wrapper prose prose-invert max-w-none"
      />

      {/* Minimal Bottom Space or Separator if needed */}
      <div className="pt-12" />
    </div>
  );
}

