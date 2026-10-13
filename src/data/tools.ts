// Single source of truth for site navigation. Every tool page pulls its nav entry from
// here instead of a hand-copied <nav> block — this is what let budget-calculator ship
// without appearing in either menu (see REBUILD_PLAN.md, audit 2026-10-13).

export type Section = 'freelancers' | 'business' | 'startups';

export interface Tool {
  slug: string;
  icon: string;
  section: Section;
  en: { label: string; path: string };
  /** Present only once the tool has a RU translation. */
  ru?: { label: string; path: string };
  /** US-specific tool: shown in the RU menu pointing at the EN page, flagged "US только". */
  usOnly?: boolean;
}

export const sectionLabel: Record<Section, { en: string; ru: string }> = {
  freelancers: { en: 'Freelancers', ru: 'Фрилансерам' },
  business: { en: 'Business & Startups', ru: 'Бизнес и стартапы' },
  startups: { en: 'Startups', ru: 'Стартапы' },
};

export const tools: Tool[] = [
  // ── Freelancers ──
  { slug: 'freelance-rate', icon: '💰', section: 'freelancers',
    en: { label: 'Freelance Rate', path: '/freelance-rate' },
    ru: { label: 'Ставка фрилансера', path: '/ru/freelance-rate' } },
  { slug: 'salary-hourly', icon: '🔄', section: 'freelancers',
    en: { label: 'Salary ↔ Hourly', path: '/salary-hourly' } },
  { slug: '1099-vs-w2', icon: '📋', section: 'freelancers',
    en: { label: '1099 vs W2', path: '/1099-vs-w2' }, usOnly: true },
  { slug: 'stripe-fee', icon: '💳', section: 'freelancers',
    en: { label: 'Stripe / PayPal Fee', path: '/stripe-fee' } },
  { slug: 'vat-calculator', icon: '🌍', section: 'freelancers',
    en: { label: 'VAT / GST Calculator', path: '/vat-calculator' },
    ru: { label: 'Калькулятор НДС / GST', path: '/ru/vat-calculator' } },
  { slug: 'invoice-generator', icon: '🧾', section: 'freelancers',
    en: { label: 'Invoice Generator', path: '/invoice-generator' },
    ru: { label: 'Счёт-фактура онлайн', path: '/ru/invoice-generator' } },
  { slug: 'self-employment-tax', icon: '🇺🇸', section: 'freelancers',
    en: { label: 'Self-Employment Tax', path: '/self-employment-tax' }, usOnly: true },
  { slug: 'form-2555', icon: '📋', section: 'freelancers',
    en: { label: 'Form 2555 (Expat)', path: '/form-2555' } },
  { slug: 'deal-coach', icon: '🤖', section: 'freelancers',
    en: { label: 'Deal Coach AI', path: '/deal-coach' } },

  // ── Business & Startups ──
  { slug: 'roi-calculator', icon: '📈', section: 'business',
    en: { label: 'ROI Calculator', path: '/roi-calculator' },
    ru: { label: 'Калькулятор ROI', path: '/ru/roi-calculator' } },
  { slug: 'profit-margin', icon: '🛒', section: 'business',
    en: { label: 'Profit Margin', path: '/profit-margin' },
    ru: { label: 'Маржа и наценка', path: '/ru/profit-margin' } },
  { slug: 'break-even', icon: '⚖️', section: 'business',
    en: { label: 'Break-even', path: '/break-even' },
    ru: { label: 'Точка безубыточности', path: '/ru/break-even' } },
  { slug: 'loan-calculator', icon: '🏦', section: 'business',
    en: { label: 'Business Loan', path: '/loan-calculator' } },
  { slug: 'pl-statement', icon: '📊', section: 'business',
    en: { label: 'P&L Statement', path: '/pl-statement' } },
  { slug: 'budget-calculator', icon: '💵', section: 'business',
    en: { label: 'Budget & Cash Flow', path: '/budget-calculator' },
    ru: { label: 'Бюджет и кассовые потоки', path: '/ru/budget-calculator' } },

  // ── Startups ──
  { slug: 'safe-calculator', icon: '🚀', section: 'startups',
    en: { label: 'SAFE Equity', path: '/safe-calculator' } },
  { slug: 'burn-rate', icon: '🔥', section: 'startups',
    en: { label: 'Burn Rate & Runway', path: '/burn-rate' } },
  { slug: 'ltv-cac', icon: '📉', section: 'startups',
    en: { label: 'LTV : CAC', path: '/ltv-cac' } },
];

export function toolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
