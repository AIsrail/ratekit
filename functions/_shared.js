const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...CORS_HEADERS,
    },
  });
}

export function preflight() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export function error(message, status = 400) {
  return json({ error: message }, status);
}

// Merge query-string params (GET) and JSON body (POST) into one plain object of numbers/strings.
export async function readParams(request) {
  const url = new URL(request.url);
  const params = {};
  for (const [k, v] of url.searchParams.entries()) params[k] = v;

  if (request.method === "POST") {
    const ct = request.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      try {
        const body = await request.json();
        Object.assign(params, body);
      } catch {
        // ignore malformed body, fall back to query params only
      }
    }
  }
  return params;
}

export function num(params, key, fallback) {
  const v = params[key];
  if (v === undefined || v === null || v === "") return fallback;
  const n = typeof v === "number" ? v : parseFloat(v);
  return Number.isFinite(n) ? n : fallback;
}

export function str(params, key, fallback) {
  const v = params[key];
  return v === undefined || v === null || v === "" ? fallback : String(v);
}

export const ATTRIBUTION = {
  name: "RateKit",
  url: "https://ratekit.org",
};

// Simplified 2026 US federal income tax brackets, mirrors the client-side calc() in
// self-employment-tax.astro and 1099-vs-w2.astro exactly (including "hoh" falling back
// to the single-filer brackets, same as those pages) — for estimation only.
export function calcFedTax2026(taxable, filing) {
  const brackets = filing === "married"
    ? [[0, 0.10, 24800], [24800, 0.12, 100800], [100800, 0.22, 211400], [211400, 0.24, 403550], [403550, 0.32, 512450], [512450, 0.35, 768700], [768700, 0.37, Infinity]]
    : [[0, 0.10, 12400], [12400, 0.12, 50400], [50400, 0.22, 105700], [105700, 0.24, 201775], [201775, 0.32, 256225], [256225, 0.35, 640600], [640600, 0.37, Infinity]];
  let tax = 0;
  for (const [min, rate, max] of brackets) {
    if (taxable <= min) break;
    tax += Math.min(taxable, max) * rate - min * rate;
    if (taxable <= max) break;
  }
  return Math.max(0, tax);
}

export function stdDeduction2026(filing) {
  return filing === "married" ? 32200 : 16100;
}
