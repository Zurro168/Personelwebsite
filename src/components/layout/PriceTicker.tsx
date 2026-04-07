'use client';

import React, { useEffect, useState } from 'react';
import { fetchLivePrices, PriceItem } from '@/lib/price-service';

export default function PriceTicker() {
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 首次抓取
    fetchLivePrices().then(data => {
      setPrices(data);
      setIsLoading(false);
    });

    // 每 30 分钟同步一次真实雅虎财经行情 (1,800,000ms)
    const interval = setInterval(() => {
      fetchLivePrices().then(setPrices);
    }, 1800000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) return null;

  return (
    <section className="border-y border-industrial-border bg-slate-900/40 py-6 backdrop-blur-md overflow-hidden">
      <div className="flex gap-20 whitespace-nowrap px-8">
        <div className="flex animate-scroll gap-20">
          {/* 这里渲染两遍价格，以实现流畅的无缝循环动画 */}
          {[...prices, ...prices].map((item, i) => (
            <div key={i} className="flex gap-6 items-center group">
              <span className="text-white/30 font-mono text-[10px] tracking-widest">{item.name}</span>
              <span className="font-black text-white text-sm tracking-tight">{item.price}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded transition-all duration-300 ${item.isUp ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}>
                {item.delta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
