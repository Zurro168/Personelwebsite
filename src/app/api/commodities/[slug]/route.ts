import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { calculateCommodityLinkage, COMMODITY_CONFIGS } from '@/lib/cycle-engine';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  try {
    const filePath = path.join(process.cwd(), 'src/data/commodities', `${slug}.json`);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Commodity packet not found' }, { status: 404 });
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    // 若配置了高频行情联动，则将实时动态指标注入研报底稿
    if (COMMODITY_CONFIGS[slug]) {
      try {
        const linkage = await calculateCommodityLinkage(slug);
        
        if (data.score_engine) {
          data.score_engine.total_score = linkage.liveScore;
          data.score_engine.dimensions = linkage.dimensions;
          data.score_engine.outlook = linkage.trend === 'up' ? 'bullish' : linkage.trend === 'down' ? 'bearish' : 'neutral';
        }

        if (data.metadata) {
          data.metadata.status = linkage.liveStatus;
        }

        if (!data.manual_override) {
          data.manual_override = {};
        }
        data.manual_override.price = linkage.livePrice;
        data.manual_override.change = linkage.deltaFormatted;
        
        data.market_linkage = linkage;
      } catch (e) {
        console.warn(`[Commodity API] Live linkage fallback for ${slug}:`, e);
      }
    }
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'CDN-Cache-Control': 'no-store',
      }
    });
  } catch {
    return NextResponse.json({ error: 'Failed to resolve packet' }, { status: 500 });
  }
}
