import { json, preflight } from "../_shared.js";

// GET /api — machine-readable directory of available calculator endpoints.
export async function onRequest(context) {
  const { request } = context;
  if (request.method === "OPTIONS") return preflight();

  return json({
    name: "RateKit API",
    description: "Free, no-auth JSON endpoints for RateKit's business calculators. Call these directly instead of re-deriving the formulas in-context.",
    openapi: "https://ratekit.org/openapi.json",
    documentation: "https://ratekit.org/llms.txt",
    endpoints: [
      { path: "/api/roi", methods: ["GET", "POST"], summary: "Return on investment, annualized ROI, payback period." },
      { path: "/api/break-even", methods: ["GET", "POST"], summary: "Break-even units/revenue, contribution margin." },
      { path: "/api/freelance-rate", methods: ["GET", "POST"], summary: "Minimum freelance hourly/daily rate." },
      { path: "/api/vat", methods: ["GET", "POST"], summary: "Add or remove VAT/GST from a price." },
      { path: "/api/profit-margin", methods: ["GET", "POST"], summary: "Gross/net margin, markup, target-margin pricing." },
      { path: "/api/budget", methods: ["GET", "POST"], summary: "12-month cash flow forecast, runway, revenue scenarios." },
      { path: "/api/rates", methods: ["GET"], summary: "Live FX (USD/EUR/CNY/JPY/GBP vs. visitor's local currency) and crypto (BTC/ETH/SOL/XRP/DOGE vs USD) rates, geolocated via Cloudflare, cached 30 min." },
    ],
    usage: "GET with query-string params, or POST with a JSON body. All endpoints are CORS-enabled and require no API key.",
  });
}
