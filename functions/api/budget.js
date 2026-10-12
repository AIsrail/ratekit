export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (request.method === 'GET') {
      // Calculate budget scenario
      const revenue = parseFloat(url.searchParams.get('revenue')) || 0;
      const costs = parseFloat(url.searchParams.get('costs')) || 0;
      const startingCash = parseFloat(url.searchParams.get('startingCash')) || 0;
      const months = parseInt(url.searchParams.get('months')) || 12;

      const profit = revenue - costs;
      const margin = revenue > 0 ? ((profit / revenue) * 100).toFixed(1) : 0;
      const runway = profit < -0.01 ? Math.floor(startingCash / Math.abs(profit)) : (profit > 0 ? Infinity : 0);

      const projection = [];
      let cash = startingCash;
      for (let i = 1; i <= months; i++) {
        cash += profit;
        projection.push({
          month: i,
          revenue,
          costs,
          profit,
          endingCash: Math.max(0, cash),
        });
      }

      return new Response(JSON.stringify({
        summary: {
          revenue: Math.round(revenue),
          costs: Math.round(costs),
          profit: Math.round(profit),
          marginPercent: parseFloat(margin),
          runway: runway === Infinity ? null : runway,
        },
        projection,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (request.method === 'POST') {
      const data = await request.json();
      const { revenue, fixedCosts, variableCostPercent, startingCash, months = 12 } = data;

      if (typeof revenue !== 'number' || typeof fixedCosts !== 'number' || typeof variableCostPercent !== 'number' || typeof startingCash !== 'number') {
        return new Response(JSON.stringify({ error: 'Missing or invalid required fields' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const varCosts = revenue * (variableCostPercent / 100);
      const totalCosts = fixedCosts + varCosts;
      const profit = revenue - totalCosts;
      const margin = revenue > 0 ? ((profit / revenue) * 100).toFixed(1) : 0;
      const runway = profit < -0.01 ? Math.floor(startingCash / Math.abs(profit)) : (profit > 0 ? null : 0);

      const projection = [];
      let cash = startingCash;
      for (let i = 1; i <= months; i++) {
        cash += profit;
        projection.push({
          month: i,
          revenue: Math.round(revenue),
          costs: Math.round(totalCosts),
          profit: Math.round(profit),
          endingCash: Math.round(Math.max(0, cash)),
        });
      }

      const scenarios = {
        down25: {
          revenue: Math.round(revenue * 0.75),
          costs: Math.round(fixedCosts + (revenue * 0.75 * variableCostPercent / 100)),
          profit: Math.round((revenue * 0.75) - (fixedCosts + (revenue * 0.75 * variableCostPercent / 100))),
        },
        up25: {
          revenue: Math.round(revenue * 1.25),
          costs: Math.round(fixedCosts + (revenue * 1.25 * variableCostPercent / 100)),
          profit: Math.round((revenue * 1.25) - (fixedCosts + (revenue * 1.25 * variableCostPercent / 100))),
        },
      };

      return new Response(JSON.stringify({
        summary: {
          revenue: Math.round(revenue),
          costs: Math.round(totalCosts),
          profit: Math.round(profit),
          marginPercent: parseFloat(margin),
          runway,
        },
        projection,
        scenarios,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error', details: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}
