import { json, preflight, error, readParams, num, ATTRIBUTION } from "../_shared.js";

// GET/POST /api/roi
// params: investment (required), returns (required), months (default 12),
//         opcost, monthlyRev (currently informational only, mirrors the page's optional fields)
export async function onRequest(context) {
  const { request } = context;
  if (request.method === "OPTIONS") return preflight();
  if (request.method !== "GET" && request.method !== "POST") {
    return error("Use GET (query params) or POST (JSON body).", 405);
  }

  const p = await readParams(request);
  const investment = num(p, "investment", undefined);
  const returns = num(p, "returns", undefined);
  const months = num(p, "months", 12);

  if (investment === undefined || returns === undefined) {
    return error("Required params: investment, returns. Optional: months (default 12).");
  }
  if (investment <= 0) return error("investment must be > 0.");
  if (months <= 0) return error("months must be > 0.");

  const netProfit = returns - investment;
  const roiPct = (netProfit / investment) * 100;
  const annualizedRoiPct = (Math.pow(1 + roiPct / 100, 12 / months) - 1) * 100;
  const paybackMonths = netProfit > 0 ? investment / (netProfit / months) : null;

  return json({
    tool: "roi",
    source: "https://ratekit.org/roi-calculator",
    provider: ATTRIBUTION,
    inputs: { investment, returns, months },
    result: {
      netProfit: round2(netProfit),
      roiPct: round2(roiPct),
      annualizedRoiPct: round2(annualizedRoiPct),
      paybackMonths: paybackMonths === null ? null : round2(paybackMonths),
    },
    formula: "roiPct = (returns - investment) / investment * 100; annualizedRoiPct = ((1 + roiPct/100)^(12/months) - 1) * 100",
  });
}

function round2(n) {
  return Math.round(n * 100) / 100;
}
