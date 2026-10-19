#!/usr/bin/env node
// RateKit MCP server — exposes every ratekit.org/api/* calculator as an MCP tool.
// Thin proxy: each tool just fetches the already-public, no-auth JSON API and returns
// the result. No business logic is duplicated here — ratekit.org/api/* stays the source
// of truth, so this server never drifts out of sync with the live calculators.
//
// Setup (no npm publish needed): see README.md in this folder.

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const BASE = 'https://ratekit.org/api';

const server = new McpServer({ name: 'ratekit', version: '1.0.0' });

async function callApi(path, params) {
  const url = new URL(BASE + path);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  }
  const res = await fetch(url, { headers: { 'User-Agent': 'RateKit-MCP/1.0 (+https://ratekit.org)' } });
  const body = await res.json();
  if (!res.ok) {
    return { content: [{ type: 'text', text: `Error: ${body.error || res.statusText}` }], isError: true };
  }
  return { content: [{ type: 'text', text: JSON.stringify(body, null, 2) }] };
}

function registerCalc(name, path, description, shape) {
  server.registerTool(name, { description, inputSchema: shape }, (args) => callApi(path, args));
}

registerCalc('roi', '/roi',
  'Return on investment: net profit, ROI %, annualized ROI, payback period in months.',
  { investment: z.number().describe('Initial investment amount'), returns: z.number().describe('Total return / revenue generated'), months: z.number().optional().describe('Time period in months, default 12') });

registerCalc('break_even', '/break-even',
  'Break-even point: units/revenue needed to cover costs, contribution margin.',
  { price: z.number().describe('Price per unit'), variableCost: z.number().describe('Variable cost per unit'), fixedCosts: z.number().optional().describe('Total monthly fixed costs'), units: z.number().optional().describe('Current monthly units sold'), targetProfit: z.number().optional() });

registerCalc('freelance_rate', '/freelance-rate',
  'Minimum freelance hourly/daily rate to hit a target income after tax, expenses and non-billable time.',
  { targetIncome: z.number().describe('Desired annual take-home income after tax'), expenses: z.number().optional().describe('Annual business expenses'), taxRatePct: z.number().optional(), hoursPerDay: z.number().optional().default(6), daysPerWeek: z.number().optional().default(5), vacationWeeks: z.number().optional().default(4), nonBillablePct: z.number().optional() });

registerCalc('vat', '/vat',
  'Add or remove VAT/GST from a price.',
  { amount: z.number(), rate: z.number().describe('Tax rate, percent'), mode: z.enum(['add', 'remove']).optional().default('add') });

registerCalc('profit_margin', '/profit-margin',
  'Gross/net profit margin, markup, or price needed to hit a target margin.',
  { mode: z.enum(['cost', 'margin']).optional().default('cost'), revenue: z.number().optional(), cogs: z.number().optional(), opex: z.number().optional(), cost: z.number().optional(), targetMarginPct: z.number().optional() });

registerCalc('budget_forecast', '/budget',
  '12-month cash flow forecast and runway from monthly revenue and costs.',
  { revenue: z.number().describe('Monthly revenue'), costs: z.number().describe('Monthly fixed + variable costs'), startingCash: z.number().optional() });

registerCalc('salary_hourly', '/salary-hourly',
  'Convert annual salary to hourly rate, or hourly rate to annual salary.',
  { mode: z.enum(['salary', 'hourly']).optional().default('salary'), annualSalary: z.number().optional(), hourlyRate: z.number().optional(), hoursPerDay: z.number().optional().default(8), daysPerWeek: z.number().optional().default(5), ptoDays: z.number().optional().default(15), holidays: z.number().optional().default(10) });

registerCalc('stripe_fee', '/stripe-fee',
  'Stripe/PayPal/Square/Wise payment processing fees, with a comparison across processors.',
  { amount: z.number(), mode: z.enum(['receive', 'charge']).optional().default('receive'), processor: z.enum(['stripe', 'paypal', 'square', 'wise', 'custom']).optional().default('stripe'), pct: z.number().optional(), fixed: z.number().optional() });

registerCalc('self_employment_tax', '/self-employment-tax',
  'US self-employment tax (15.3%): SE tax, federal income tax estimate, quarterly payments.',
  { income: z.number(), expenses: z.number().optional().default(0), filing: z.enum(['single', 'married', 'hoh']).optional().default('single') });

registerCalc('contractor_vs_employee', '/1099-vs-w2',
  'US: compare 1099 contractor vs W2 employee take-home pay after taxes and benefits.',
  { w2Salary: z.number(), cIncome: z.number().describe('1099 contractor annual income'), w2Health: z.number().optional(), w2Match: z.number().optional(), w2Perks: z.number().optional(), w2YourK: z.number().optional(), cExpenses: z.number().optional(), cHealth: z.number().optional(), cRetirement: z.number().optional(), cOther: z.number().optional(), filing: z.enum(['single', 'married']).optional().default('single'), stateTax: z.number().optional() });

registerCalc('feie', '/form-2555',
  'US expat Foreign Earned Income Exclusion (FEIE / Form 2555) estimate.',
  { income: z.number().describe('Foreign earned income'), testType: z.enum(['bfr', 'ppt']).optional().default('bfr'), bfrYears: z.number().optional(), pptDays: z.number().optional(), housing: z.number().optional(), daysYear: z.number().optional(), daysAbroad: z.number().optional() });

registerCalc('loan', '/loan',
  'Business loan: monthly payment, total interest, true APR including origination fee.',
  { principal: z.number(), rate: z.number().describe('Annual interest rate, percent'), term: z.number().describe('Loan term in months'), fee: z.number().optional().describe('Origination fee, percent') });

registerCalc('safe_note', '/safe',
  'SAFE note conversion: investor ownership %, conversion price, founder dilution.',
  { investment: z.number(), premoney: z.number().describe('Next round pre-money valuation'), newRound: z.number().describe('New investment raised in the priced round'), safeType: z.enum(['cap', 'discount', 'both']).optional().default('cap'), valCap: z.number().optional(), discount: z.number().optional(), shares: z.number().optional(), optPool: z.number().optional() });

registerCalc('burn_rate', '/burn-rate',
  'Startup net/gross burn rate and cash runway in months.',
  { cash: z.number(), grossBurn: z.number().describe('Total monthly expenses'), revenue: z.number().optional(), growth: z.number().optional().describe('Monthly revenue growth, percent') });

registerCalc('ltv_cac', '/ltv-cac',
  'Customer LTV, CAC, LTV:CAC ratio, CAC payback period.',
  { arpu: z.number().describe('Average monthly revenue per customer'), margin: z.number().describe('Gross margin, percent'), churn: z.number().describe('Monthly churn rate, percent'), spend: z.number().describe('Monthly sales & marketing spend'), newCustomers: z.number() });

registerCalc('pl_statement', '/pl-statement',
  'Gross profit, EBITDA, and net profit from a simple P&L breakdown.',
  { revenue: z.number(), cogs: z.number().optional(), opex: z.number().optional(), depreciation: z.number().optional(), interest: z.number().optional(), tax: z.number().optional() });

registerCalc('invoice_totals', '/invoice',
  'Invoice subtotal, tax, and total from a precomputed subtotal and tax rate.',
  { subtotal: z.number(), taxRatePct: z.number().optional() });

registerCalc('live_rates', '/rates',
  "Live FX (USD/EUR/CNY/JPY/GBP vs. the caller's local currency, geolocated server-side) and crypto (BTC/ETH/SOL/XRP/DOGE vs USD) rates, cached ~30 min.",
  {});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('RateKit MCP server running on stdio.');
}

main().catch((err) => {
  console.error('Fatal error starting RateKit MCP server:', err);
  process.exit(1);
});
