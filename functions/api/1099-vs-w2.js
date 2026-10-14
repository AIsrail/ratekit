import { json, preflight, error, readParams, num, str, ATTRIBUTION, calcFedTax2026, stdDeduction2026 } from "../_shared.js";

// GET/POST /api/1099-vs-w2
// params: w2Salary, w2Health, w2Match (401k match), w2Perks, w2YourK (own 401k contribution),
//         cIncome (1099 income), cExpenses, cHealth, cRetirement, cOther,
//         filing (single|married, default single), stateTax (%, default 5)
export async function onRequest(context) {
  const { request } = context;
  if (request.method === "OPTIONS") return preflight();
  if (request.method !== "GET" && request.method !== "POST") {
    return error("Use GET (query params) or POST (JSON body).", 405);
  }

  const p = await readParams(request);
  const w2Salary = num(p, "w2Salary", undefined);
  const cIncome = num(p, "cIncome", undefined);
  if (w2Salary === undefined || cIncome === undefined) {
    return error("Required params: w2Salary, cIncome. Optional: w2Health, w2Match, w2Perks, w2YourK, cExpenses, cHealth, cRetirement, cOther, filing (single|married), stateTax (%).");
  }

  const w2Health = num(p, "w2Health", 6000);
  const w2Match = num(p, "w2Match", 4000);
  const w2Perks = num(p, "w2Perks", 3000);
  const w2YourK = num(p, "w2YourK", 6000);
  const cExpenses = num(p, "cExpenses", 10000);
  const cHealth = num(p, "cHealth", 8000);
  const cRetire = num(p, "cRetirement", 10000);
  const cOther = num(p, "cOther", 3000);
  const filing = str(p, "filing", "single");
  const stateTaxPct = num(p, "stateTax", 5);
  const stateTax = stateTaxPct / 100;
  const stdDed = stdDeduction2026(filing);

  const w2FICA = Math.min(w2Salary, 184500) * 0.062 + w2Salary * 0.0145;
  const w2Taxable = Math.max(0, w2Salary - w2YourK - stdDed);
  const w2Fed = calcFedTax2026(w2Taxable, filing);
  const w2State = w2Salary * stateTax;
  const w2TotalTax = w2FICA + w2Fed + w2State;
  const w2TakeHome = w2Salary - w2TotalTax - w2YourK;
  const w2TotalComp = w2Salary + w2Health + w2Match + w2Perks;

  const cNet = Math.max(0, cIncome - cExpenses);
  const cSEBase = cNet * 0.9235;
  const cSETax = Math.min(cSEBase, 184500) * 0.124 + cSEBase * 0.029;
  const cSEDed = cSETax / 2;
  const cAGI = cNet - cSEDed - cHealth - cRetire;
  const cTaxable = Math.max(0, cAGI - stdDed);
  const cFed = calcFedTax2026(cTaxable, filing);
  const cState = cNet * stateTax;
  const cTotalTax = cSETax + cFed + cState;
  const cTakeHome = cIncome - cExpenses - cHealth - cOther - cRetire - cTotalTax;

  const diff = cTakeHome - w2TakeHome;
  const verdict = Math.abs(diff) < 1000 ? "tie" : diff > 0 ? "1099" : "w2";

  return json({
    tool: "1099-vs-w2",
    source: "https://ratekit.org/1099-vs-w2",
    provider: ATTRIBUTION,
    inputs: { w2Salary, w2Health, w2Match, w2Perks, w2YourK, cIncome, cExpenses, cHealth, cRetirement: cRetire, cOther, filing, stateTax: stateTaxPct },
    result: {
      w2: { totalCompensation: round2(w2TotalComp), totalTax: round2(w2TotalTax), takeHome: round2(w2TakeHome), takeHomeMonthly: round2(w2TakeHome / 12) },
      contractor1099: { grossIncome: round2(cIncome), seTax: round2(cSETax), totalTax: round2(cTotalTax), takeHome: round2(cTakeHome), takeHomeMonthly: round2(cTakeHome / 12) },
      winner: verdict,
      annualDifference: round2(Math.abs(diff)),
    },
    formula: "contractorNet = 1099income - SEtax - incomeTax - selfPaidBenefits - expenses; employeeNet = salary - employeeFICA(7.65%) - incomeTax",
    disclaimer: "Simplified 2026 federal estimate only. Consult a CPA before making employment decisions.",
  });
}

function round2(n) {
  return Math.round(n * 100) / 100;
}
