# RateKit MCP Server

An [MCP](https://modelcontextprotocol.io) server that gives Claude (or any MCP client) direct
access to every calculator on [ratekit.org](https://ratekit.org) — ROI, break-even, burn rate
& runway, LTV:CAC, SAFE note conversion, VAT/GST, freelance rate, business loan APR, P&L,
self-employment tax, and more. 18 tools in total.

It's a thin proxy over RateKit's existing free, no-auth JSON API (`ratekit.org/api/*`) — no
business logic lives here, so it never drifts out of sync with the live site. See the full
list of endpoints at [ratekit.org/api](https://ratekit.org/api) or
[ratekit.org/openapi.json](https://ratekit.org/openapi.json).

## Setup

No npm account or publish step needed — run it straight from a clone of this repo.

```bash
git clone https://github.com/AIsrail/ratekit.git
cd ratekit/mcp-server
npm install
```

### Claude Desktop

Add this to your `claude_desktop_config.json` (Settings → Developer → Edit Config):

```json
{
  "mcpServers": {
    "ratekit": {
      "command": "node",
      "args": ["/absolute/path/to/ratekit/mcp-server/index.js"]
    }
  }
}
```

### Claude Code

Add it as a project or user MCP server:

```bash
claude mcp add ratekit -- node /absolute/path/to/ratekit/mcp-server/index.js
```

Restart your client, and ask it something like *"What's the ROI on a $5,000 campaign that
brought in $8,000?"* or *"Model a $250k SAFE at a $5M post-money cap."* — it'll call the
matching tool automatically.

## Tools

| Tool | What it calculates |
|---|---|
| `roi` | ROI, annualized ROI, payback period |
| `break_even` | Break-even units/revenue, contribution margin |
| `freelance_rate` | Minimum freelance hourly/daily rate |
| `vat` | Add/remove VAT or GST |
| `profit_margin` | Gross/net margin, markup, target-margin pricing |
| `budget_forecast` | 12-month cash flow forecast, runway |
| `salary_hourly` | Salary ↔ hourly conversion |
| `stripe_fee` | Payment processing fees, multi-processor comparison |
| `self_employment_tax` | US SE tax (15.3%), quarterly payments |
| `contractor_vs_employee` | US 1099 vs W2 take-home comparison |
| `feie` | US expat Foreign Earned Income Exclusion |
| `loan` | Loan payment, total interest, true APR |
| `safe_note` | SAFE note conversion, ownership %, dilution |
| `burn_rate` | Net/gross burn rate, cash runway |
| `ltv_cac` | LTV, CAC, LTV:CAC ratio, payback |
| `pl_statement` | Gross profit, EBITDA, net profit |
| `invoice_totals` | Invoice subtotal, tax, total |
| `live_rates` | Live FX + crypto rates |

## Why a proxy, not a reimplementation

Every formula already lives at `ratekit.org/api/*`, tested and used by the live calculator
pages. Reimplementing the math here would mean two places that could disagree. This server
just calls the real API and returns what it returns — one source of truth.

## License

MIT, same as the rest of the RateKit repo. The API it calls is free and requires no key.
