import { json, preflight, error, readParams, num, str, ATTRIBUTION } from "../_shared.js";

// GET/POST /api/profit-margin
// mode "cost" (default): revenue (required), cogs (required), opex (default 0)
//   -> grossMarginPct, grossProfit, markupPct, netMarginPct
// mode "margin": cost (required), targetMarginPct (required)
//   -> sellingPrice, profit, markupPct
export async function onRequest(context) {
  const { request } = context;
  if (request.method === "OPTIONS") return preflight();
  if (request.method !== "GET" && request.method !== "POST") {
    return error("Use GET (query params) or POST (JSON body).", 405);
  }

  const p = await readParams(request);
  const mode = str(p, "mode", "cost").toLowerCase();

  if (mode === "margin") {
    const cost = num(p, "cost", undefined);
    const targetMarginPct = num(p, "targetMarginPct", undefined);
    if (cost === undefined || targetMarginPct === undefined) {
      return error('mode=margin requires: cost, targetMarginPct.');
    }
    if (targetMarginPct >= 100) return error("targetMarginPct must be less than 100.");

    const sellingPrice = cost / (1 - targetMarginPct / 100);
    const profit = sellingPrice - cost;
    const markupPct = cost > 0 ? (profit / cost) * 100 : null;

    return json({
      tool: "profit-margin",
      source: "https://ratekit.org/profit-margin",
      provider: ATTRIBUTION,
      inputs: { mode, cost, targetMarginPct },
      result: {
        sellingPrice: round2(sellingPrice),
        profit: round2(profit),
        markupPct: markupPct === null ? null : round2(markupPct),
      },
      formula: "sellingPrice = cost / (1 - targetMarginPct/100)",
    });
  }

  // mode === "cost"
  const revenue = num(p, "revenue", undefined);
  const cogs = num(p, "cogs", undefined);
  const opex = num(p, "opex", 0);
  if (revenue === undefined || cogs === undefined) {
    return error("mode=cost (default) requires: revenue, cogs. Optional: opex.");
  }
  if (revenue <= 0) return error("revenue must be > 0.");

  const grossProfit = revenue - cogs;
  const grossMarginPct = (grossProfit / revenue) * 100;
  const markupPct = cogs > 0 ? (grossProfit / cogs) * 100 : null;
  const netProfit = grossProfit - opex;
  const netMarginPct = (netProfit / revenue) * 100;

  return json({
    tool: "profit-margin",
    source: "https://ratekit.org/profit-margin",
    provider: ATTRIBUTION,
    inputs: { mode, revenue, cogs, opex },
    result: {
      grossProfit: round2(grossProfit),
      grossMarginPct: round2(grossMarginPct),
      markupPct: markupPct === null ? null : round2(markupPct),
      netProfit: round2(netProfit),
      netMarginPct: round2(netMarginPct),
    },
    formula: "grossMarginPct = (revenue - cogs) / revenue * 100; markupPct = (revenue - cogs) / cogs * 100",
  });
}

function round2(n) {
  return Math.round(n * 100) / 100;
}
