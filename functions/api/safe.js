import { json, preflight, error, readParams, num, str, ATTRIBUTION } from "../_shared.js";

// GET/POST /api/safe
// params: investment (required), premoney (required), newRound (required),
//         safeType (cap|discount|both, default cap), valCap, discount (%, default 20),
//         shares (existing pre-round shares, default 10000000), optPool (%, default 10)
export async function onRequest(context) {
  const { request } = context;
  if (request.method === "OPTIONS") return preflight();
  if (request.method !== "GET" && request.method !== "POST") {
    return error("Use GET (query params) or POST (JSON body).", 405);
  }

  const p = await readParams(request);
  const investment = num(p, "investment", undefined);
  const premoney = num(p, "premoney", undefined);
  const newRound = num(p, "newRound", undefined);
  if (investment === undefined || premoney === undefined || newRound === undefined) {
    return error("Required params: investment, premoney, newRound. Optional: safeType (cap|discount|both), valCap, discount, shares, optPool.");
  }

  const safeType = str(p, "safeType", "cap");
  const valCap = num(p, "valCap", 5000000);
  const discount = num(p, "discount", 20);
  const existShares = num(p, "shares", 10000000);
  const optPool = num(p, "optPool", 10);

  const postMoney = premoney + newRound;
  const optPoolShares = Math.round((existShares * optPool) / (100 - optPool));
  const totalPreShares = existShares + optPoolShares;
  const roundPricePerShare = premoney / totalPreShares;

  let conversionPrice;
  if (safeType === "discount") {
    conversionPrice = roundPricePerShare * (1 - discount / 100);
  } else if (safeType === "both") {
    const capPrice = valCap / totalPreShares;
    const discPrice = roundPricePerShare * (1 - discount / 100);
    conversionPrice = Math.min(capPrice, discPrice);
  } else {
    conversionPrice = valCap / totalPreShares;
  }

  const safeShares = conversionPrice > 0 ? Math.round(investment / conversionPrice) : 0;
  const newRoundShares = roundPricePerShare > 0 ? Math.round(newRound / roundPricePerShare) : 0;
  const totalShares = totalPreShares + safeShares + newRoundShares;
  const ownershipPct = totalShares > 0 ? (safeShares / totalShares) * 100 : 0;

  return json({
    tool: "safe-calculator",
    source: "https://ratekit.org/safe-calculator",
    provider: ATTRIBUTION,
    inputs: { investment, premoney, newRound, safeType, valCap, discount, shares: existShares, optPool },
    result: {
      investorOwnershipPct: round2(ownershipPct),
      conversionPricePerShare: round4(conversionPrice),
      safeSharesIssued: safeShares,
      founderDilutionPct: round2(ownershipPct),
      postMoneyValuation: round2(postMoney),
      totalSharesAfterConversion: totalShares,
    },
    formula: "ownership (post-money SAFE) = investment / postMoneyValuationCap; conversionPrice = min(capPrice, roundPrice*(1-discount))",
    disclaimer: "Illustrative only — real SAFE conversions involve pro-rata, MFN and other terms. Consult a startup lawyer.",
  });
}

function round2(n) {
  return Math.round(n * 100) / 100;
}
function round4(n) {
  return Math.round(n * 10000) / 10000;
}
