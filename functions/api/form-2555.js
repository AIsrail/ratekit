import { json, preflight, error, readParams, num, str, ATTRIBUTION } from "../_shared.js";

const FEIE_LIMIT_2026 = 132900;

// GET/POST /api/form-2555
// params: income (required), testType (bfr|ppt, default bfr), bfrYears, pptDays,
//         housing (default 0), daysYear (default 365), daysAbroad (default 365)
export async function onRequest(context) {
  const { request } = context;
  if (request.method === "OPTIONS") return preflight();
  if (request.method !== "GET" && request.method !== "POST") {
    return error("Use GET (query params) or POST (JSON body).", 405);
  }

  const p = await readParams(request);
  const income = num(p, "income", undefined);
  if (income === undefined) return error("Required param: income. Optional: testType (bfr|ppt), bfrYears, pptDays, housing, daysYear, daysAbroad.");

  const testType = str(p, "testType", "bfr") === "ppt" ? "ppt" : "bfr";
  const bfrYears = num(p, "bfrYears", 2);
  const pptDays = num(p, "pptDays", 340);
  const housing = num(p, "housing", 0);
  const daysYear = num(p, "daysYear", 365);
  const daysAbroad = num(p, "daysAbroad", 365);

  const qualifies = testType === "bfr" ? bfrYears >= 1 : pptDays >= 330;

  if (!qualifies) {
    return json({
      tool: "form-2555",
      source: "https://ratekit.org/form-2555",
      provider: ATTRIBUTION,
      inputs: { income, testType, bfrYears, pptDays, housing, daysYear, daysAbroad },
      result: { qualifies: false, feieAmount: 0, taxableIncome: round2(income), estTaxSavings: 0 },
      formula: "Does not qualify: bona fide residence needs 1+ full year, or physical presence needs 330+ days abroad.",
      disclaimer: "Estimate only, 2026 limits. Consult a US expat tax professional.",
    });
  }

  const prorata = Math.min(1, daysAbroad / daysYear);
  const proratedLimit = FEIE_LIMIT_2026 * prorata;
  const housingBase = FEIE_LIMIT_2026 * 0.16 * prorata;
  const housingExcl = Math.max(0, Math.min(housing - housingBase, proratedLimit * 0.3));
  const feie = Math.min(income, proratedLimit - housingExcl);
  const totalExcl = feie + housingExcl;
  const taxable = Math.max(0, income - totalExcl);
  const savings = feie * 0.24;

  return json({
    tool: "form-2555",
    source: "https://ratekit.org/form-2555",
    provider: ATTRIBUTION,
    inputs: { income, testType, bfrYears, pptDays, housing, daysYear, daysAbroad },
    result: {
      qualifies: true,
      feieLimit2026: FEIE_LIMIT_2026,
      prorataFactor: round2(prorata),
      proratedLimit: round2(proratedLimit),
      housingExclusion: round2(housingExcl),
      feieAmount: round2(feie),
      totalExclusion: round2(totalExcl),
      taxableIncome: round2(taxable),
      estTaxSavings: round2(savings),
    },
    formula: "excludedIncome = min(foreignEarnedIncome, FEIE_LIMIT * qualifyingDays/daysInYear)",
    disclaimer: "Estimate only, 2026 limits. Consult a US expat tax professional.",
  });
}

function round2(n) {
  return Math.round(n * 100) / 100;
}
