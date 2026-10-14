import { json, preflight, error, readParams, num, ATTRIBUTION } from "../_shared.js";

// GET/POST /api/ltv-cac
// params: arpu (required), margin (%, required), churn (%/mo, required), spend (required), newCustomers (required)
export async function onRequest(context) {
  const { request } = context;
  if (request.method === "OPTIONS") return preflight();
  if (request.method !== "GET" && request.method !== "POST") {
    return error("Use GET (query params) or POST (JSON body).", 405);
  }

  const p = await readParams(request);
  const arpu = num(p, "arpu", undefined);
  const margin = num(p, "margin", undefined);
  const churn = num(p, "churn", undefined);
  const spend = num(p, "spend", undefined);
  const newCustomers = num(p, "newCustomers", undefined);
  if ([arpu, margin, churn, spend, newCustomers].some((v) => v === undefined)) {
    return error("Required params: arpu, margin (%), churn (%/mo), spend, newCustomers.");
  }
  if (churn <= 0) return error("churn must be > 0.");
  if (newCustomers <= 0) return error("newCustomers must be > 0.");

  const monthlyProfit = arpu * (margin / 100);
  const ltv = monthlyProfit / (churn / 100);
  const cac = spend / newCustomers;
  const ratio = cac > 0 ? ltv / cac : 0;
  const paybackMonths = monthlyProfit > 0 ? cac / monthlyProfit : null;
  const customerLifeMonths = 1 / (churn / 100);

  const verdict = ratio < 1 ? "losing-money" : ratio < 3 ? "below-target" : ratio <= 5 ? "healthy" : "excellent";

  return json({
    tool: "ltv-cac",
    source: "https://ratekit.org/ltv-cac",
    provider: ATTRIBUTION,
    inputs: { arpu, margin, churn, spend, newCustomers },
    result: {
      ltv: round2(ltv),
      cac: round2(cac),
      ratio: round2(ratio),
      ratioLabel: round1(ratio) + ":1",
      paybackMonths: paybackMonths === null ? null : round2(paybackMonths),
      customerLifeMonths: round2(customerLifeMonths),
      verdict,
    },
    formula: "ltv = arpu*margin/100 / (churn/100); cac = spend/newCustomers; payback = cac / (arpu*margin/100)",
  });
}

function round2(n) {
  return Math.round(n * 100) / 100;
}
function round1(n) {
  return Math.round(n * 10) / 10;
}
