import { json, preflight, error, readParams, num, ATTRIBUTION } from "../_shared.js";

// GET/POST /api/freelance-rate
// params: targetIncome (required), expenses (default 0), taxRatePct (default 0),
//         hoursPerDay (default 6), daysPerWeek (default 5), vacationWeeks (default 4),
//         nonBillablePct (default 0)
export async function onRequest(context) {
  const { request } = context;
  if (request.method === "OPTIONS") return preflight();
  if (request.method !== "GET" && request.method !== "POST") {
    return error("Use GET (query params) or POST (JSON body).", 405);
  }

  const p = await readParams(request);
  const targetIncome = num(p, "targetIncome", undefined);
  if (targetIncome === undefined) {
    return error("Required param: targetIncome. Optional: expenses, taxRatePct, hoursPerDay, daysPerWeek, vacationWeeks, nonBillablePct.");
  }

  const expenses = num(p, "expenses", 0);
  const taxRatePct = num(p, "taxRatePct", 0);
  const hoursPerDay = num(p, "hoursPerDay", 6);
  const daysPerWeek = num(p, "daysPerWeek", 5);
  const vacationWeeks = num(p, "vacationWeeks", 4);
  const nonBillablePct = num(p, "nonBillablePct", 0);

  if (taxRatePct >= 100) return error("taxRatePct must be less than 100.");
  if (hoursPerDay <= 0 || daysPerWeek <= 0) return error("hoursPerDay and daysPerWeek must be > 0.");

  const workWeeks = 52 - vacationWeeks;
  const workDays = workWeeks * daysPerWeek;
  const billableHours = workDays * hoursPerDay * (1 - nonBillablePct / 100);
  const grossNeeded = (targetIncome + expenses) / (1 - taxRatePct / 100);
  const hourlyRate = billableHours > 0 ? grossNeeded / billableHours : null;
  const dailyRate = hourlyRate === null ? null : hourlyRate * hoursPerDay;
  const monthlyGrossTarget = grossNeeded / 12;

  return json({
    tool: "freelance-rate",
    source: "https://ratekit.org/freelance-rate",
    provider: ATTRIBUTION,
    inputs: { targetIncome, expenses, taxRatePct, hoursPerDay, daysPerWeek, vacationWeeks, nonBillablePct },
    result: {
      hourlyRate: hourlyRate === null ? null : round2(hourlyRate),
      dailyRate: dailyRate === null ? null : round2(dailyRate),
      monthlyGrossTarget: round2(monthlyGrossTarget),
      billableHoursPerYear: round2(billableHours),
    },
    formula: "hourlyRate = (targetIncome + expenses) / (1 - taxRatePct/100) / billableHoursPerYear",
  });
}

function round2(n) {
  return Math.round(n * 100) / 100;
}
