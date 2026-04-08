'use client';

import { useEffect, useRef } from 'react';

interface ReportRendererProps {
  html: string;
}

export default function ReportRenderer({ html }: ReportRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Clear existing content (optional, as dangerouslySetInnerHTML handles it)
    
    // 2. Find and execute scripts manually
    const scripts = containerRef.current.querySelectorAll('script');
    scripts.forEach((oldScript) => {
      const newScript = document.createElement('script');
      
      // Copy attributes (src, async, etc.)
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });

      // Copy content (for inline scripts)
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));

      // Append to execute
      document.body.appendChild(newScript);
      
      // Clean up old script to prevent double execution if the component re-renders
      oldScript.parentNode?.removeChild(oldScript);
    });

    return () => {
      // Optional: Clean up appended scripts if necessary
    };
  }, [html]);

  return (
    <div 
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: html }} 
      className="report-html-content-wrapper"
    />
  );
}
