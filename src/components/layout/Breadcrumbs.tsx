'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-white/30 py-2 border-b border-white/5">
      <Link href="/" className="hover:text-brand-blue transition-colors flex items-center gap-1.5 grayscale hover:grayscale-0">
        <Home size={10} />
        <span>硅基洞察 / SILICON INSIGHT</span>
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          <ChevronRight size={10} className="text-white/10" />
          <Link 
            href={item.href} 
            className={`transition-colors ${index === items.length - 1 ? 'text-brand-blue font-black' : 'hover:text-white'}`}
          >
            {item.name}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
}
