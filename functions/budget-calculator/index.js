export async function onRequest(context) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Budget Calculator — RateKit</title>
<meta name="description" content="Free monthly budget and cash flow calculator. Project revenue, costs, profit/loss, and runway. No signup required.">
<style>
:root{--bg:#F8F9FC;--white:#FFFFFF;--border:#E2E8F0;--ink:#0F172A;--mid:#475569;--muted:#94A3B8;--blue:#2563EB;--bluebg:#EFF6FF;--green:#059669;--amber:#D97706;--red:#DC2626;--font:'Plus Jakarta Sans',sans-serif;--mono:'JetBrains Mono',monospace;}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{font-family:var(--font);background:var(--bg);color:var(--ink);line-height:1.6;}
a{text-decoration:none;color:var(--blue);}
nav{position:sticky;top:0;z-index:100;background:rgba(255,255,255,0.92);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);padding:0 48px;height:60px;display:flex;align-items:center;justify-content:space-between;}
.logo{font-size:18px;font-weight:700;color:var(--ink);letter-spacing:-.02em;}.logo span{color:var(--blue);}
.page-header{background:var(--white);border-bottom:1px solid var(--border);padding:48px 48px 40px;}
h1{font-size:2.2rem;font-weight:700;letter-spacing:-.02em;line-height:1.15;margin-bottom:10px;}
.page-sub{font-size:15px;color:var(--mid);max-width:560px;}
main{padding:40px 48px 64px;max-width:1200px;}
.calculator-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-bottom:40px;}
.input-section{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:24px;}
.input-section h2{font-size:1.1rem;font-weight:600;margin-bottom:16px;color:var(--ink);}
.input-group{margin-bottom:16px;}
.input-label{font-size:13px;font-weight:500;color:var(--mid);margin-bottom:6px;display:block;}
input[type="number"]{width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:6px;font-family:var(--font);font-size:14px;color:var(--ink);}
input[type="number"]:focus{outline:none;border-color:var(--blue);box-shadow:0 0 0 3px var(--bluebg);}
.output-section{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:24px;grid-column:2;}
.output-row{display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--border);}
.output-value{font-size:16px;font-weight:600;color:var(--ink);font-family:var(--mono);}
.output-value.positive{color:var(--green);}
.output-value.negative{color:var(--red);}
footer{background:var(--ink);padding:28px 48px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;}
.flogo{font-size:16px;font-weight:700;color:white;text-decoration:none;}.flogo span{color:var(--blue);}
.fcopy{font-size:12px;color:rgba(255,255,255,.3);}
@media(max-width:768px){.calculator-grid{grid-template-columns:1fr;}.output-section{grid-column:1;}}
</style>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
</head>
<body>
<nav>
  <a href="/" class="logo">Rate<span>Kit</span></a>
</nav>

<div class="page-header">
  <h1>Budget & Cash Flow Calculator</h1>
  <p class="page-sub">Plan monthly budget, forecast 12-month cash flow, calculate runway. All calculations in your browser.</p>
</div>

<main>
  <div class="calculator-grid">
    <div class="input-section">
      <h2>💰 Monthly Revenue</h2>
      <div class="input-group">
        <label class="input-label">Product/Service Revenue</label>
        <input type="number" id="revenue-main" value="50000" min="0" step="100">
      </div>
      <div class="input-group">
        <label class="input-label">Other Income</label>
        <input type="number" id="revenue-other" value="0" min="0" step="100">
      </div>

      <h2 style="margin-top:24px;">📊 Fixed Costs (Monthly)</h2>
      <div class="input-group">
        <label class="input-label">Team Salaries</label>
        <input type="number" id="cost-salaries" value="20000" min="0" step="100">
      </div>
      <div class="input-group">
        <label class="input-label">Office / Servers / Tools</label>
        <input type="number" id="cost-ops" value="5000" min="0" step="100">
      </div>
      <div class="input-group">
        <label class="input-label">Marketing & Sales</label>
        <input type="number" id="cost-marketing" value="3000" min="0" step="100">
      </div>
      <div class="input-group">
        <label class="input-label">Other Expenses</label>
        <input type="number" id="cost-other" value="2000" min="0" step="100">
      </div>

      <h2 style="margin-top:24px;">📉 Variable Costs</h2>
      <div class="input-group">
        <label class="input-label">Variable Cost (% of revenue)</label>
        <input type="number" id="variable-cost-pct" value="10" min="0" max="100" step="0.1">
      </div>

      <h2 style="margin-top:24px;">💵 Starting Cash</h2>
      <div class="input-group">
        <label class="input-label">Cash on Hand</label>
        <input type="number" id="starting-cash" value="100000" min="0" step="1000">
      </div>
    </div>

    <div class="output-section">
      <h2>📈 This Month</h2>
      <div class="output-row">
        <span>Total Revenue</span>
        <span class="output-value" id="out-revenue">$50,000</span>
      </div>
      <div class="output-row">
        <span>Total Costs</span>
        <span class="output-value" id="out-costs">$35,000</span>
      </div>
      <div class="output-row" style="background:var(--bluebg);padding:12px;border-radius:6px;margin:0 -12px;">
        <span style="color:var(--blue);font-weight:600;">Profit/Loss</span>
        <span class="output-value positive" id="out-profit">$15,000</span>
      </div>
      <div class="output-row">
        <span>Profit Margin %</span>
        <span class="output-value" id="out-margin">30.0%</span>
      </div>
      <div class="output-row" style="margin-top:16px;padding-top:16px;border-top:1px solid var(--border);">
        <span>Months Until Broke</span>
        <span class="output-value" id="out-runway">∞</span>
      </div>

      <h2 style="margin-top:24px;">📊 Scenarios</h2>
      <div class="output-row">
        <span>If Revenue -25%</span>
        <span class="output-value" id="scenario-down25">$1,250</span>
      </div>
      <div class="output-row">
        <span>If Revenue +25%</span>
        <span class="output-value" id="scenario-up25">$26,250</span>
      </div>
    </div>
  </div>
</main>

<footer>
  <a href="/" class="flogo">Rate<span>Kit</span></a>
  <span class="fcopy">© 2026 RateKit</span>
</footer>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
const inputs = ['revenue-main', 'revenue-other', 'cost-salaries', 'cost-ops', 'cost-marketing', 'cost-other', 'variable-cost-pct', 'starting-cash'];

function calculate() {
  const revenue = (parseFloat(document.getElementById('revenue-main').value) || 0) + (parseFloat(document.getElementById('revenue-other').value) || 0);
  const fixedCosts = (parseFloat(document.getElementById('cost-salaries').value) || 0) + (parseFloat(document.getElementById('cost-ops').value) || 0) + (parseFloat(document.getElementById('cost-marketing').value) || 0) + (parseFloat(document.getElementById('cost-other').value) || 0);
  const varCostPct = parseFloat(document.getElementById('variable-cost-pct').value) || 0;
  const varCosts = revenue * (varCostPct / 100);
  const totalCosts = fixedCosts + varCosts;
  const profit = revenue - totalCosts;
  const margin = revenue > 0 ? ((profit / revenue) * 100).toFixed(1) : 0;

  document.getElementById('out-revenue').textContent = '$' + revenue.toLocaleString('en-US', {maximumFractionDigits: 0});
  document.getElementById('out-costs').textContent = '$' + totalCosts.toLocaleString('en-US', {maximumFractionDigits: 0});
  document.getElementById('out-profit').textContent = '$' + profit.toLocaleString('en-US', {maximumFractionDigits: 0});
  document.getElementById('out-profit').className = 'output-value ' + (profit >= 0 ? 'positive' : 'negative');
  document.getElementById('out-margin').textContent = margin + '%';

  const startingCash = parseFloat(document.getElementById('starting-cash').value) || 0;
  const runway = profit < -0.01 ? Math.floor(startingCash / Math.abs(profit)) : (profit > 0 ? '∞' : 'N/A');
  document.getElementById('out-runway').textContent = typeof runway === 'number' ? runway + ' months' : runway;

  const down25 = (revenue * 0.75) - totalCosts;
  const up25 = (revenue * 1.25) - totalCosts;
  document.getElementById('scenario-down25').textContent = '$' + down25.toLocaleString('en-US', {maximumFractionDigits: 0});
  document.getElementById('scenario-up25').textContent = '$' + up25.toLocaleString('en-US', {maximumFractionDigits: 0});
}

inputs.forEach(id => document.getElementById(id)?.addEventListener('input', calculate));
</script>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}
