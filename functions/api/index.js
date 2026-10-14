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
      { path: "/api/salary-hourly", methods: ["GET", "POST"], summary: "Convert annual salary to hourly rate or vice versa." },
      { path: "/api/stripe-fee", methods: ["GET", "POST"], summary: "Stripe/PayPal/Square/Wise processing fees, with comparison across processors." },
      { path: "/api/self-employment-tax", methods: ["GET", "POST"], summary: "US self-employment tax (15.3%), quarterly estimated payments." },
      { path: "/api/1099-vs-w2", methods: ["GET", "POST"], summary: "Compare 1099 contractor vs W2 employee take-home pay." },
      { path: "/api/form-2555", methods: ["GET", "POST"], summary: "US Foreign Earned Income Exclusion (FEIE) estimate." },
      { path: "/api/loan", methods: ["GET", "POST"], summary: "Business loan monthly payment, total interest, true APR." },
      { path: "/api/safe", methods: ["GET", "POST"], summary: "SAFE note conversion, investor ownership %, founder dilution." },
      { path: "/api/burn-rate", methods: ["GET", "POST"], summary: "Startup net/gross burn rate and cash runway in months." },
      { path: "/api/ltv-cac", methods: ["GET", "POST"], summary: "Customer LTV, CAC, LTV:CAC ratio, CAC payback period." },
      { path: "/api/rates", methods: ["GET"], summary: "Live FX (USD/EUR/CNY/JPY/GBP vs. visitor's local currency) and crypto (BTC/ETH/SOL/XRP/DOGE vs USD) rates, geolocated via Cloudflare, cached 30 min." },
    ],
    usage: "GET with query-string params, or POST with a JSON body. All endpoints are CORS-enabled and require no API key.",
  });
}
