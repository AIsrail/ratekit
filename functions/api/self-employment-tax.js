import { json, preflight, error, readParams, num, str, ATTRIBUTION, calcFedTax2026, stdDeduction2026 } from "../_shared.js";

// GET/POST /api/self-employment-tax
// params: income (required), expenses (default 0), filing (single|married|hoh, default single)
export async function onRequest(context) {
  const { request } = context;
  if (request.method === "OPTIONS") return preflight();
  if (request.method !== "GET" && request.method !== "POST") {
    return error("Use GET (query params) or POST (JSON body).", 405);
  }

  const p = await readParams(request);
  const income = num(p, "income", undefined);
  if (income === undefined) return error("Required param: income. Optional: expenses, filing (single|married|hoh).");

  const expenses = num(p, "expenses", 0);
  const filing = str(p, "filing", "single");
  const stdDed = stdDeduction2026(filing);

  const netIncome = income - expenses;
  const seBase = netIncome * 0.9235;
  const seTax = Math.min(seBase, 184500) * 0.124 + seBase * 0.029;
  const seDed = seTax / 2;
  const agi = netIncome - seDed;
  const taxable = Math.max(0, agi - stdDed);
  const fedTax = calcFedTax2026(taxable, filing);
  const totalTax = seTax + fedTax;

  return json({
    tool: "self-employment-tax",
    source: "https://ratekit.org/self-employment-tax",
    provider: ATTRIBUTION,
    inputs: { income, expenses, filing },
    result: {
      netIncome: round2(netIncome),
      seTax: round2(seTax),
      federalIncomeTax: round2(fedTax),
      totalTax: round2(totalTax),
      effectiveTaxRatePct: income > 0 ? round2((totalTax / income) * 100) : 0,
      setAsidePer1000: income > 0 ? round2((totalTax / income) * 1000) : 0,
      quarterlyPayment: round2(totalTax / 4),
    },
    formula: "seTax = min(netIncome*0.9235, wageBase)*0.124 + netIncome*0.9235*0.029; totalTax = seTax + federalIncomeTax(AGI - seTax/2 - stdDeduction)",
    disclaimer: "Simplified 2026 federal estimate only — does not cover state tax, credits, or every deduction. Consult a CPA.",
  });
}

function round2(n) {
  return Math.round(n * 100) / 100;
}
