
/**
 * Silicon Commodity Unified Data Adapter v2.1 (Production Grade)
 * - Harmonizes FRED API with manual JSON packets.
 * - Supports dynamic cycle steps and narrative injection.
 * - Handles dual-axis historical data (Price vs Inventory).
 */

export interface CycleStep {
  emoji: string;
  label: string;
  sub: string;
}

export interface Narrative {
  title: string;
  content: string;
}

export interface UnifiedCommodityData {
  slug: string;
  name: string;
  price: string;
  change: string;
  unit: string;
  score: number;
  dimensionScores: number[];
  cyclePosition: number;
  cycleSteps: CycleStep[];
  narrative: Narrative[];
  context: string;
  chartLabels: string[];
  chartValues: number[];
  inventoryValues: number[];
}

export async function resolveCommodity(slug: string): Promise<UnifiedCommodityData> {
  // 1. Fetch Manual Override / Narrative Packet from API
  let packet: any = null;
  try {
    // Determine base URL for server-side or client-side fetch
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');
    const response = await fetch(`${baseUrl}/api/commodities/${slug}`, { cache: 'no-store' });
    if (response.ok) {
        packet = await response.json();
    }
  } catch (e) {
    console.error("API Fetch failed for commodity packet:", e);
  }

  // 2. Default fallback if packet is missing
  if (!packet) {
      return {
        slug,
        name: slug.toUpperCase(),
        price: "0.00",
        change: "0%",
        unit: "N/A",
        score: 0,
        dimensionScores: [0, 0, 0, 0],
        cyclePosition: 0,
        cycleSteps: [],
        narrative: [],
        context: "Data packet not found. Please sync Obsidian Queue.",
        chartLabels: ["N/A"],
        chartValues: [0],
        inventoryValues: [0]
      };
  }

  // 3. Structural Mapping
  const price = packet.manual_override?.price || "0.00";
  const change = packet.manual_override?.change || "0.00%";
  
  // Historical Series Processing (for the dual-axis chart)
  const history = packet.history || [];
  const chartLabels = history.length > 0 ? history.map((h: any) => h.date) : ["NODATA"];
  const chartValues = history.length > 0 ? history.map((h: any) => h.price) : [0];
  const inventoryValues = history.length > 0 ? history.map((h: any) => h.inventory) : [0];

  return {
    slug,
    name: packet.metadata?.name || packet.slug.toUpperCase(),
    price: price,
    change: change,
    unit: packet.metadata?.unit || "N/A",
    score: packet.score_engine?.total_score || 50,
    dimensionScores: packet.score_engine?.dimensions || [50, 50, 50, 50],
    cyclePosition: packet.score_engine?.cycle_position || 0,
    cycleSteps: packet.score_engine?.cycle_steps || [],
    narrative: packet.narrative_layer || [],
    context: packet.manual_override?.context || "Loading logic...",
    chartLabels,
    chartValues,
    inventoryValues
  };
}
