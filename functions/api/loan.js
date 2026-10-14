import { json, preflight, error, readParams, num, ATTRIBUTION } from "../_shared.js";

// GET/POST /api/loan
// params: principal (required), rate (annual %, required), term (months, required), fee (origination %, default 0)
export async function onRequest(context) {
  const { request } = context;
  if (request.method === "OPTIONS") return preflight();
  if (request.method !== "GET" && request.method !== "POST") {
    return error("Use GET (query params) or POST (JSON body).", 405);
  }

  const p = await readParams(request);
  const principal = num(p, "principal", undefined);
  const rate = num(p, "rate", undefined);
  const term = num(p, "term", undefined);
  if (principal === undefined || rate === undefined || term === undefined) {
    return error("Required params: principal, rate (annual %), term (months). Optional: fee (origination %, default 0).");
  }
  if (principal <= 0) return error("principal must be > 0.");
  if (term <= 0) return error("term must be > 0.");

  const fee = num(p, "fee", 0);
  const r = rate / 100 / 12;
  const monthly = r === 0 ? principal / term : (principal * r * Math.pow(1 + r, term)) / (Math.pow(1 + r, term) - 1);
  const totalRepayment = monthly * term;
  const totalInterest = totalRepayment - principal;
  const trueAprPct = rate + (fee / term) * 12;

  return json({
    tool: "loan-calculator",
    source: "https://ratekit.org/loan-calculator",
    provider: ATTRIBUTION,
    inputs: { principal, rate, term, fee },
    result: {
      monthlyPayment: round2(monthly),
      totalInterest: round2(totalInterest),
      totalRepayment: round2(totalRepayment),
      trueAprPct: round2(trueAprPct),
    },
    formula: "monthlyPayment = P*r / (1 - (1+r)^-n), r = rate/12, n = term; trueAPR = rate + fee/term*12",
  });
}

function round2(n) {
  return Math.round(n * 100) / 100;
}
