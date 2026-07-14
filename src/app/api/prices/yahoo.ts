export interface YahooQuote {
  price: number;
  previousClose: number;
}

export function parseYahooChart(payload: unknown): YahooQuote | null {
  if (!payload || typeof payload !== 'object') return null;

  const chart = 'chart' in payload ? payload.chart : null;
  if (!chart || typeof chart !== 'object' || !('result' in chart) || !Array.isArray(chart.result)) {
    return null;
  }

  const firstResult = chart.result[0];
  if (!firstResult || typeof firstResult !== 'object' || !('meta' in firstResult)) return null;

  const meta = firstResult.meta;
  if (!meta || typeof meta !== 'object') return null;

  const price = 'regularMarketPrice' in meta ? meta.regularMarketPrice : null;
  const previousClose = 'chartPreviousClose' in meta ? meta.chartPreviousClose : null;

  if (typeof price !== 'number' || !Number.isFinite(price)) return null;
  if (typeof previousClose !== 'number' || !Number.isFinite(previousClose) || previousClose === 0) return null;

  return { price, previousClose };
}
