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
    <nav className="flex items-center space-x-2 text-sm font-bold tracking-[0.15em] uppercase text-white/30 py-4 border-b border-white/10">
      <Link href="/" className="hover:text-brand-blue transition-colors flex items-center gap-2 group">
        <Home size={14} className="text-brand-blue/60 group-hover:text-brand-blue transition-colors" />
        <span className="text-white/90">硅基洞察 / SILICON INSIGHT</span>
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          <ChevronRight size={12} className="text-white/20" />
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
