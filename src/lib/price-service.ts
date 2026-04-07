export interface PriceItem {
  name: string;
  price: string;
  delta: string;
  isUp: boolean;
}

/**
 * 硅基大宗行情中心 - Yahoo Finance 驱动版
 * 现在从我们的本地负载均衡 API 获取真实的公开数据
 */
export async function fetchLivePrices(): Promise<PriceItem[]> {
  try {
    const response = await fetch('/api/prices');
    if (!response.ok) throw new Error('API fetching failed');
    return await response.json();
  } catch (error) {
    console.warn("行情 API 暂时不可用，回落至本地缓存或模拟模式...", error);
    // 降级模拟模式，确保页面不会因为 API 响应问题而崩溃
    return [
      { name: "LME COPPER", price: "12,150.00", delta: "+2.4%", isUp: true },
      { name: "WTI CRUDE", price: "92.45", delta: "-0.8%", isUp: false },
      { name: "GOLD (SPOT)", price: "2,465.20", delta: "+0.5%", isUp: true },
      { name: "ALUMINUM", price: "2,640.50", delta: "+0.3%", isUp: true }
    ];
  }
}
