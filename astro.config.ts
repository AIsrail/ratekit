import { defineConfig } from 'astro/config';

// IMPORTANT: build.format 'file' + trailingSlash 'never' keeps URLs exactly as they are
// today (e.g. /roi-calculator, not /roi-calculator/) — no redirects, no link-equity loss
// during the migration from static HTML to Astro pages.
export default defineConfig({
  site: 'https://ratekit.org',
  output: 'static',
  compressHTML: true,
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
});
