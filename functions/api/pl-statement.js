import { json, preflight, error, readParams, num, ATTRIBUTION } from "../_shared.js";

// GET/POST /api/pl-statement
// params: revenue (required), cogs (default 0), opex (default 0),
//         depreciation (default 0), interest (default 0), tax (default 0)
export async function onRequest(context) {
  const { request } = context;
  if (request.method === "OPTIONS") return preflight();
  if (request.method !== "GET" && request.method !== "POST") {
    return error("Use GET (query params) or POST (JSON body).", 405);
  }

  const p = await readParams(request);
  const revenue = num(p, "revenue", undefined);
  if (revenue === undefined) return error("Required param: revenue. Optional: cogs, opex, depreciation, interest, tax (all default 0).");

  const cogs = num(p, "cogs", 0);
  const opex = num(p, "opex", 0);
  const depreciation = num(p, "depreciation", 0);
  const interest = num(p, "interest", 0);
  const tax = num(p, "tax", 0);

  const grossProfit = revenue - cogs;
  const ebitda = grossProfit - opex;
  const netProfit = ebitda - depreciation - interest - tax;

  return json({
    tool: "pl-statement",
    source: "https://ratekit.org/pl-statement",
    provider: ATTRIBUTION,
    inputs: { revenue, cogs, opex, depreciation, interest, tax },
    result: {
      grossProfit: round2(grossProfit),
      grossMarginPct: revenue > 0 ? round2((grossProfit / revenue) * 100) : 0,
      ebitda: round2(ebitda),
      netProfit: round2(netProfit),
      netMarginPct: revenue > 0 ? round2((netProfit / revenue) * 100) : 0,
    },
    formula: "grossProfit = revenue - cogs; ebitda = grossProfit - opex; netProfit = ebitda - depreciation - interest - tax",
  });
}

function round2(n) {
  return Math.round(n * 100) / 100;
}
