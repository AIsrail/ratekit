import { json, preflight, error, readParams, num, ATTRIBUTION } from "../_shared.js";

// GET/POST /api/break-even
// params: price (required), variableCost (required),
//         fixedCosts (single number) OR rent+salaries+software+marketing+other,
//         units (current monthly units sold, default 0), targetProfit (optional)
export async function onRequest(context) {
  const { request } = context;
  if (request.method === "OPTIONS") return preflight();
  if (request.method !== "GET" && request.method !== "POST") {
    return error("Use GET (query params) or POST (JSON body).", 405);
  }

  const p = await readParams(request);
  const price = num(p, "price", undefined);
  const variableCost = num(p, "variableCost", undefined);
  if (price === undefined || variableCost === undefined) {
    return error("Required params: price, variableCost. Optional: fixedCosts (or rent/salaries/software/marketing/other), units, targetProfit.");
  }
  if (price <= 0) return error("price must be > 0.");

  const fixedCosts = p.fixedCosts !== undefined
    ? num(p, "fixedCosts", 0)
    : num(p, "rent", 0) + num(p, "salaries", 0) + num(p, "software", 0) + num(p, "marketing", 0) + num(p, "other", 0);
  const units = num(p, "units", 0);
  const targetProfit = num(p, "targetProfit", 0);

  const contributionMargin = price - variableCost;
  const cmRatio = price > 0 ? contributionMargin / price : 0;
  const breakEvenUnits = contributionMargin > 0 ? Math.ceil(fixedCosts / contributionMargin) : null;
  const breakEvenRevenue = breakEvenUnits === null ? null : breakEvenUnits * price;
  const currentRevenue = units * price;
  const currentVariableCosts = units * variableCost;
  const currentProfit = currentRevenue - currentVariableCosts - fixedCosts;
  const unitsForTargetProfit = contributionMargin > 0 ? Math.ceil((fixedCosts + targetProfit) / contributionMargin) : null;

  return json({
    tool: "break-even",
    source: "https://ratekit.org/break-even",
    provider: ATTRIBUTION,
    inputs: { price, variableCost, fixedCosts, units, targetProfit },
    result: {
      contributionMargin: round2(contributionMargin),
      contributionMarginRatioPct: round2(cmRatio * 100),
      breakEvenUnits,
      breakEvenRevenue: breakEvenRevenue === null ? null : round2(breakEvenRevenue),
      currentProfit: round2(currentProfit),
      unitsForTargetProfit,
    },
    formula: "contributionMargin = price - variableCost; breakEvenUnits = ceil(fixedCosts / contributionMargin)",
  });
}

function round2(n) {
  return Math.round(n * 100) / 100;
}
