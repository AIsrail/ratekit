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
