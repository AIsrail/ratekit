import { json, preflight, error, readParams, num, str, ATTRIBUTION } from "../_shared.js";

const PROCESSORS = {
  stripe: { pct: 2.9, fixed: 0.30 },
  paypal: { pct: 3.49, fixed: 0.49 },
  square: { pct: 2.6, fixed: 0.10 },
  wise: { pct: 0.5, fixed: 0.00 },
};

// GET/POST /api/stripe-fee
// params: amount (required), mode (receive|charge, default receive),
//         processor (stripe|paypal|square|wise|custom, default stripe), pct, fixed (for processor=custom)
export async function onRequest(context) {
  const { request } = context;
  if (request.method === "OPTIONS") return preflight();
  if (request.method !== "GET" && request.method !== "POST") {
    return error("Use GET (query params) or POST (JSON body).", 405);
  }

  const p = await readParams(request);
  const amount = num(p, "amount", undefined);
  if (amount === undefined) return error("Required param: amount. Optional: mode (receive|charge), processor (stripe|paypal|square|wise|custom), pct, fixed.");

  const mode = str(p, "mode", "receive") === "charge" ? "charge" : "receive";
  const processorName = str(p, "processor", "stripe");
  const base = PROCESSORS[processorName] || PROCESSORS.stripe;
  const pct = num(p, "pct", base.pct);
  const fixed = num(p, "fixed", base.fixed);

  let charge, fee, receive;
  if (mode === "receive") {
    charge = (amount + fixed) / (1 - pct / 100);
    fee = charge - amount;
    receive = amount;
  } else {
    fee = amount * (pct / 100) + fixed;
    receive = amount - fee;
    charge = amount;
  }

  const comparison = Object.entries(PROCESSORS).map(([name, r]) => {
    if (mode === "receive") {
      const c = (amount + r.fixed) / (1 - r.pct / 100);
      return { processor: name, pct: r.pct, fixed: r.fixed, youCharge: round2(c), fee: round2(c - amount), youReceive: round2(amount) };
    }
    const f = amount * (r.pct / 100) + r.fixed;
    return { processor: name, pct: r.pct, fixed: r.fixed, youCharge: round2(amount), fee: round2(f), youReceive: round2(amount - f) };
  });

  return json({
    tool: "stripe-fee",
    source: "https://ratekit.org/stripe-fee",
    provider: ATTRIBUTION,
    inputs: { amount, mode, processor: processorName, pct, fixed },
    result: {
      youCharge: round2(mode === "receive" ? charge : amount),
      fee: round2(fee),
      youReceive: round2(mode === "receive" ? amount : receive),
    },
    comparison,
    formula: "fee = amount*pct/100 + fixed; toReceiveX_charge = (X + fixed) / (1 - pct/100)",
  });
}

function round2(n) {
  return Math.round(n * 100) / 100;
}
