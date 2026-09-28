import { json, preflight, error, readParams, num, str, ATTRIBUTION } from "../_shared.js";

// GET/POST /api/vat
// params: amount (required), rate (required, percent), mode ("add" | "remove", default "add")
export async function onRequest(context) {
  const { request } = context;
  if (request.method === "OPTIONS") return preflight();
  if (request.method !== "GET" && request.method !== "POST") {
    return error("Use GET (query params) or POST (JSON body).", 405);
  }

  const p = await readParams(request);
  const amount = num(p, "amount", undefined);
  const rate = num(p, "rate", undefined);
  const mode = str(p, "mode", "add").toLowerCase();

  if (amount === undefined || rate === undefined) {
    return error('Required params: amount, rate. Optional: mode ("add" | "remove", default "add").');
  }
  if (mode !== "add" && mode !== "remove") {
    return error('mode must be "add" or "remove".');
  }

  let priceExclTax, taxAmount, priceInclTax;
  if (mode === "add") {
    priceExclTax = amount;
    taxAmount = (amount * rate) / 100;
    priceInclTax = priceExclTax + taxAmount;
  } else {
    priceInclTax = amount;
    priceExclTax = amount / (1 + rate / 100);
    taxAmount = priceInclTax - priceExclTax;
  }

  return json({
    tool: "vat",
    source: "https://ratekit.org/vat-calculator",
    provider: ATTRIBUTION,
    inputs: { amount, rate, mode },
    result: {
      priceExclTax: round2(priceExclTax),
      taxAmount: round2(taxAmount),
      priceInclTax: round2(priceInclTax),
    },
    formula: "add: priceInclTax = amount * (1 + rate/100); remove: priceExclTax = amount / (1 + rate/100)",
  });
}

function round2(n) {
  return Math.round(n * 100) / 100;
}
