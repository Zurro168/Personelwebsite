import assert from 'node:assert/strict';
import test from 'node:test';
import { parseYahooChart } from '../src/app/api/prices/yahoo.ts';

test('returns null when Yahoo has no chart result', () => {
  assert.equal(parseYahooChart({ chart: { result: null } }), null);
});

test('returns a quote when Yahoo provides numeric market data', () => {
  const quote = parseYahooChart({
    chart: {
      result: [{ meta: { regularMarketPrice: 4.37, chartPreviousClose: 4.25 } }],
    },
  });

  assert.deepEqual(quote, { price: 4.37, previousClose: 4.25 });
});
