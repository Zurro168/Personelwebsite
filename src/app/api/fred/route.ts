import { NextResponse } from 'next/server';

/**
 * 圣路易斯联储 (FRED) 数据中转代理
 * 职责：安全持有 API KEY 并抓取工业指数
 */
const FRED_API_KEY = 'ca4248ea5a7d0438cf0a8e4065e7b5ab';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const series_id = searchParams.get('series_id');

  if (!series_id) {
    return NextResponse.json({ error: 'Missing series_id' }, { status: 400 });
  }

  try {
    // 抓取最近 12 个月的月度观察值
    const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${series_id}&api_key=${FRED_API_KEY}&file_type=json&sort_order=desc&limit=12`;
    const res = await fetch(url, { next: { revalidate: 86400 } }); // 工业指数更新慢，缓存 24 小时
    const data = await res.json();

    if (!data.observations) {
      throw new Error('Fred response invalid');
    }

    // 格式化输出：反转顺序让图表从左到右 (时间由远及近)
    const history = data.observations.map((obs: any) => parseFloat(obs.value)).reverse();
    const dates = data.observations.map((obs: any) => {
      const d = new Date(obs.date);
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
