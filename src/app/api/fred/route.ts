import { NextResponse } from 'next/server';

type FredObservation = {
  date: string;
  value: string;
};

type FredResponse = {
  observations?: FredObservation[];
};

/**
 * 圣路易斯联储 (FRED) 数据中转代理
 * 职责：安全持有 API KEY 并抓取工业指数
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const series_id = searchParams.get('series_id');
  const apiKey = process.env.FRED_API_KEY;

  if (!series_id) {
    return NextResponse.json({ error: 'Missing series_id' }, { status: 400 });
  }

  if (!/^[A-Z0-9._-]+$/i.test(series_id)) {
    return NextResponse.json({ error: 'Invalid series_id' }, { status: 400 });
  }

  if (!apiKey) {
    console.error('FRED_API_KEY is not configured');
    return NextResponse.json({ error: 'FRED service is not configured' }, { status: 503 });
  }

  try {
    // 抓取最近 12 个月的月度观察值
    const url = new URL('https://api.stlouisfed.org/fred/series/observations');
    url.search = new URLSearchParams({
      series_id,
      api_key: apiKey,
      file_type: 'json',
      sort_order: 'desc',
      limit: '12',
    }).toString();
    const res = await fetch(url, { next: { revalidate: 86400 } }); // 工业指数更新慢，缓存 24 小时

    if (!res.ok) {
      throw new Error(`FRED request failed with status ${res.status}`);
    }

    const data = await res.json() as FredResponse;

    if (!Array.isArray(data.observations) || data.observations.length === 0) {
      throw new Error('FRED response invalid');
    }

    // 格式化输出：反转顺序让图表从左到右 (时间由远及近)
    const validObservations = data.observations.filter((observation) => Number.isFinite(Number(observation.value)));

    if (validObservations.length === 0) {
      throw new Error('FRED response contains no numeric observations');
    }

    const history = validObservations.map((observation) => Number(observation.value)).reverse();
    const dates = validObservations.map((observation) => {
      const d = new Date(observation.date);
      return d.toLocaleString('en-US', { month: 'short' });
    }).reverse();

    return NextResponse.json({
      price: history[history.length - 1],
      history,
      dates,
      fred_id: series_id
    });
  } catch (error) {
    console.error('FRED Proxy Error:', error);
    return NextResponse.json({ error: 'Failed to sync with FRED' }, { status: 500 });
  }
}
