import { json, preflight, error, readParams, num, ATTRIBUTION } from "../_shared.js";

// GET/POST /api/burn-rate
// params: cash (required), grossBurn (required), revenue (default 0), growth (%/mo, default 0)
export async function onRequest(context) {
  const { request } = context;
  if (request.method === "OPTIONS") return preflight();
  if (request.method !== "GET" && request.method !== "POST") {
    return error("Use GET (query params) or POST (JSON body).", 405);
  }

  const p = await readParams(request);
  const cash = num(p, "cash", undefined);
  const grossBurn = num(p, "grossBurn", undefined);
  if (cash === undefined || grossBurn === undefined) {
    return error("Required params: cash, grossBurn. Optional: revenue (default 0), growth (%/mo, default 0).");
  }

  const revenue = num(p, "revenue", 0);
  const growth = num(p, "growth", 0);
  const netBurn = grossBurn - revenue;

  let balance = cash;
  let monthlyRev = revenue;
  let months = 0;
  for (let i = 1; i <= 60; i++) {
    const net = grossBurn - monthlyRev;
    balance -= net;
    if (balance <= 0) break;
    months = i;
    monthlyRev *= 1 + growth / 100;
  }
  const runwayMonths = balance > 0 ? "60+" : months;

  return json({
    tool: "burn-rate",
    source: "https://ratekit.org/burn-rate",
    provider: ATTRIBUTION,
    inputs: { cash, grossBurn, revenue, growth },
    result: {
      netBurnPerMonth: round2(netBurn),
      grossBurnPerMonth: round2(grossBurn),
      runwayMonths,
      status: netBurn <= 0 ? "profitable" : typeof runwayMonths === "number" && runwayMonths < 6 ? "critical" : typeof runwayMonths === "number" && runwayMonths < 18 ? "raise-soon" : "healthy",
    },
    formula: "netBurn = grossBurn - revenue; runway = months until cash balance <= 0, compounding revenue by growth%/mo",
  });
}

function round2(n) {
  return Math.round(n * 100) / 100;
}
