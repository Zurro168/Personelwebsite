import { NextResponse } from 'next/server';
import { calculateAllCommodityLinkages } from '@/lib/cycle-engine';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const data = await calculateAllCommodityLinkages();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'CDN-Cache-Control': 'no-store',
      }
    });
  } catch (error) {
    console.error('Failed to calculate commodity linkages:', error);
    return NextResponse.json({ error: 'Failed to calculate linkages' }, { status: 500 });
  }
}
