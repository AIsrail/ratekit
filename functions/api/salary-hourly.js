import { json, preflight, error, readParams, num, str, ATTRIBUTION } from "../_shared.js";

// GET/POST /api/salary-hourly
// params: mode (salary|hourly, default salary), annualSalary, hourlyRate,
//         hoursPerDay (default 8), daysPerWeek (default 5), ptoDays (default 15), holidays (default 10)
export async function onRequest(context) {
  const { request } = context;
  if (request.method === "OPTIONS") return preflight();
  if (request.method !== "GET" && request.method !== "POST") {
    return error("Use GET (query params) or POST (JSON body).", 405);
  }

  const p = await readParams(request);
  const mode = str(p, "mode", "salary") === "hourly" ? "hourly" : "salary";
  const hrsDay = num(p, "hoursPerDay", 8);
  const daysWk = num(p, "daysPerWeek", 5);
  const pto = num(p, "ptoDays", 15);
  const holidays = num(p, "holidays", 10);

  const totalDays = 52 * daysWk;
  const workDays = Math.max(1, totalDays - pto - holidays);
  const workHrs = workDays * hrsDay;

  let hourly, annual;
  if (mode === "salary") {
    annual = num(p, "annualSalary", undefined);
    if (annual === undefined) return error("mode=salary requires annualSalary.");
    hourly = annual / workHrs;
  } else {
    hourly = num(p, "hourlyRate", undefined);
    if (hourly === undefined) return error("mode=hourly requires hourlyRate.");
    annual = hourly * workHrs;
  }

  const daily = hourly * hrsDay;
  const weekly = daily * daysWk;

  return json({
    tool: "salary-hourly",
    source: "https://ratekit.org/salary-hourly",
    provider: ATTRIBUTION,
    inputs: { mode, hoursPerDay: hrsDay, daysPerWeek: daysWk, ptoDays: pto, holidays },
    result: {
      hourlyRate: round2(hourly),
      dailyRate: round2(daily),
      weeklyRate: round2(weekly),
      biweeklyRate: round2(weekly * 2),
      monthlyRate: round2(annual / 12),
      annualSalary: round2(annual),
      workingDaysPerYear: workDays,
      workingHoursPerYear: round2(workHrs),
    },
    formula: "hourlyRate = annualSalary / ((52*daysPerWeek - ptoDays - holidays) * hoursPerDay)",
  });
}

function round2(n) {
  return Math.round(n * 100) / 100;
}
