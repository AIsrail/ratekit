import { json, preflight, error, readParams, num, ATTRIBUTION } from "../_shared.js";

// GET/POST /api/invoice
// params: either `items` (POST JSON array of {qty, rate}) or `subtotal` (GET/POST number),
//         taxRatePct (default 0)
export async function onRequest(context) {
  const { request } = context;
  if (request.method === "OPTIONS") return preflight();
  if (request.method !== "GET" && request.method !== "POST") {
    return error("Use GET (query params) or POST (JSON body).", 405);
  }

  const p = await readParams(request);
  const taxRatePct = num(p, "taxRatePct", 0);

  let subtotal;
  if (Array.isArray(p.items)) {
    subtotal = p.items.reduce((s, i) => s + (Number(i.qty) || 0) * (Number(i.rate) || 0), 0);
  } else {
    subtotal = num(p, "subtotal", undefined);
  }
  if (subtotal === undefined) {
    return error("Provide either 'items' (POST JSON body: array of {qty, rate}) or 'subtotal' (a precomputed number). Optional: taxRatePct (default 0).");
  }

  const tax = subtotal * (taxRatePct / 100);
  const total = subtotal + tax;

  return json({
    tool: "invoice-generator",
    source: "https://ratekit.org/invoice-generator",
    provider: ATTRIBUTION,
    inputs: { subtotal: round2(subtotal), taxRatePct },
    result: {
      subtotal: round2(subtotal),
      tax: round2(tax),
      total: round2(total),
    },
    formula: "subtotal = sum(qty * rate); tax = subtotal * taxRatePct/100; total = subtotal + tax",
  });
}

function round2(n) {
  return Math.round(n * 100) / 100;
}
