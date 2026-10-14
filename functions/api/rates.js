import { json, preflight, error } from "../_shared.js";

// GET /api/rates
// Live FX + crypto rates, cached at the edge so upstream APIs are hit roughly once per
// CACHE_TTL window regardless of traffic. Detects the visitor's likely local currency from
// Cloudflare's own edge geolocation (request.cf.country) — no extra geo-IP call needed.
// Upstream: exchangerate-api.com (fiat, no key) + CoinGecko (crypto, no key).

const CACHE_TTL_SECONDS = 1800; // 30 min — fiat/crypto reference rates don't need to be live-live here
const FX_URL = "https://api.exchangerate-api.com/v4/latest/USD";
const CRYPTO_IDS = ["bitcoin", "ethereum", "solana", "ripple", "dogecoin"];
const CRYPTO_SYMBOLS = { bitcoin: "BTC", ethereum: "ETH", solana: "SOL", ripple: "XRP", dogecoin: "DOGE" };
const CRYPTO_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=" +
  CRYPTO_IDS.join(",") +
  "&vs_currencies=usd&include_24hr_change=true";

const MAIN_FIAT = ["USD", "EUR", "CNY", "JPY", "GBP"];

// Country -> ISO 4217 currency. Not exhaustive — unmapped countries fall back to USD.
const COUNTRY_CCY = {
  KZ: "KZT", RU: "RUB", UZ: "UZS", KG: "KGS", TJ: "TJS", TM: "TMT", AZ: "AZN", AM: "AMD", GE: "GEL", BY: "BYN",
  US: "USD", GB: "GBP", JP: "JPY", CN: "CNY", KR: "KRW", IN: "INR", BR: "BRL", CA: "CAD", AU: "AUD", NZ: "NZD",
  CH: "CHF", SE: "SEK", NO: "NOK", DK: "DKK", PL: "PLN", CZ: "CZK", HU: "HUF", RO: "RON", TR: "TRY", UA: "UAH",
  MX: "MXN", ZA: "ZAR", SG: "SGD", HK: "HKD", TH: "THB", ID: "IDR", MY: "MYR", PH: "PHP", VN: "VND", PK: "PKR",
  BD: "BDT", EG: "EGP", SA: "SAR", AE: "AED", IL: "ILS", AR: "ARS", CL: "CLP", CO: "COP", PE: "PEN", NG: "NGN",
  KE: "KES", MN: "MNT",
  DE: "EUR", FR: "EUR", IT: "EUR", ES: "EUR", NL: "EUR", BE: "EUR", AT: "EUR", PT: "EUR", IE: "EUR", FI: "EUR",
  GR: "EUR", LU: "EUR", SK: "EUR", SI: "EUR", EE: "EUR", LV: "EUR", LT: "EUR", CY: "EUR", MT: "EUR", HR: "EUR",
};

export async function onRequest(context) {
  const { request } = context;
  if (request.method === "OPTIONS") return preflight();
  if (request.method !== "GET") return error("Use GET.", 405);

  const cache = caches.default;
  const cacheKey = new Request("https://ratekit.org/__cache/rates-v1", request);

  let upstream;
  const cached = await cache.match(cacheKey);
  if (cached) {
    upstream = await cached.json();
  } else {
    try {
      const [fxRes, cryptoRes] = await Promise.all([
        fetch(FX_URL),
        fetch(CRYPTO_URL, { headers: { "User-Agent": "Mozilla/5.0 (compatible; RateKitBot/1.0; +https://ratekit.org)" } }),
      ]);
      if (!fxRes.ok || !cryptoRes.ok) throw new Error("upstream rate provider unavailable (fx=" + fxRes.status + " crypto=" + cryptoRes.status + ")");
      const fx = await fxRes.json();
      const crypto = await cryptoRes.json();
      upstream = { fxRates: fx.rates, fxDate: fx.date, crypto, fetchedAt: new Date().toISOString() };

      const toCache = new Response(JSON.stringify(upstream), {
        headers: { "Content-Type": "application/json", "Cache-Control": `public, max-age=${CACHE_TTL_SECONDS}` },
      });
      context.waitUntil(cache.put(cacheKey, toCache));
    } catch (e) {
      return error("Rate providers temporarily unavailable. Try again shortly.", 502);
    }
  }

  const country = (request.cf && request.cf.country) || null;
  const localCurrency = COUNTRY_CCY[country] || "USD";
  const localRate = upstream.fxRates[localCurrency] || 1;

  const fiat = MAIN_FIAT.filter((code) => code !== localCurrency)
    .map((code) => {
      const rate = upstream.fxRates[code];
      if (!rate) return null;
      // value of 1 unit of `code` expressed in localCurrency
      const value = localRate / rate;
      return { code, value: round(value, value >= 100 ? 2 : 4) };
    })
    .filter(Boolean);

  const crypto = CRYPTO_IDS.map((id) => {
    const c = upstream.crypto[id];
    if (!c) return null;
    return {
      id,
      symbol: CRYPTO_SYMBOLS[id] || id.slice(0, 3).toUpperCase(),
      usd: round(c.usd, c.usd >= 100 ? 0 : 4),
      change24h: typeof c.usd_24h_change === "number" ? round(c.usd_24h_change, 2) : null,
    };
  }).filter(Boolean);

  return json({
    country,
    localCurrency,
    fiat,
    crypto,
    fxDate: upstream.fxDate,
    fetchedAt: upstream.fetchedAt,
    source: { fx: "exchangerate-api.com", crypto: "coingecko.com" },
  });
}

function round(n, decimals) {
  const f = Math.pow(10, decimals);
  return Math.round(n * f) / f;
}
