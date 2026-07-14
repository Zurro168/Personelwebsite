import { NextResponse } from 'next/server';
import { parseYahooChart } from './yahoo';

interface PriceResponse {
  name: string;
  price: string;
  delta: string;
  isUp: boolean;
}

/**
 * 雅虎财经符号映射表
 * HG=F: COMEX 铜 (高频参考)
 * CL=F: WTI 原油
 * GC=F: COMEX 黄金
 * SI=F: COMEX 白银
 * ALI=F: COMEX 铝
 * NI=F: 镍期货
 */
const SYMBOLS = ['HG=F', 'CL=F', 'GC=F', 'SI=F', 'ALI=F', 'NI=F'];
const SYMBOL_NAMES: Record<string, string> = {
  'HG=F': 'LME COPPER',
  'CL=F': 'WTI CRUDE',
  'GC=F': 'GOLD (SPOT)',
  'SI=F': 'SILVER (SPOT)',
  'ALI=F': 'ALUMINUM',
  'NI=F': 'NICKEL'
};

export async function GET() {
  try {
    const results = await Promise.all(
      SYMBOLS.map(async (symbol) => {
        try {
          const res = await fetch(
            `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`,
            { next: { revalidate: 1800 } } // 缓存半小时
          );

          if (!res.ok) return null;

          const quote = parseYahooChart(await res.json() as unknown);
          if (!quote) return null;

          const deltaRaw = ((quote.price - quote.previousClose) / quote.previousClose) * 100;

          return {
            name: SYMBOL_NAMES[symbol],
            price: quote.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            delta: `${deltaRaw >= 0 ? '+' : ''}${deltaRaw.toFixed(2)}%`,
            isUp: deltaRaw >= 0
          };
        } catch (e) {
          console.error(`Fetch error for ${symbol}:`, e);
          return null;
        }
      })
    );

    return NextResponse.json(results.filter((result): result is PriceResponse => result !== null));
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
