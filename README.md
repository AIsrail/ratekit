# RateKit

Free, no-signup business calculators for founders, freelancers and startups —
[ratekit.org](https://ratekit.org). Freelance rate, ROI, break-even, burn rate & runway,
LTV:CAC, SAFE note conversion, VAT/GST, business loan APR, self-employment tax, and more.
Every calculation runs client-side in the browser — no data is ever sent to a server.

## For developers and AI agents

Every calculator (except the AI-based Deal Coach) is also a free, no-auth JSON API endpoint:

- Directory: [ratekit.org/api](https://ratekit.org/api)
- Spec: [ratekit.org/openapi.json](https://ratekit.org/openapi.json)
- Full formulas/examples/FAQ in one file: [ratekit.org/llms-full.txt](https://ratekit.org/llms-full.txt)
- **MCP server** for Claude and other MCP clients: [`mcp-server/`](./mcp-server) — see its
  README for setup. 18 tools, one per calculator.

## Stack

Astro (static output) on Cloudflare Pages. Calculator pages and the JSON API live in `src/`
and `functions/api/`; `src/data/tools.ts` is the single source of truth for every tool's
nav entry and homepage card — add a calculator there and it's automatically wired into the
menu, homepage grid, sitemap generation, and related-tools links.

## License

MIT.
