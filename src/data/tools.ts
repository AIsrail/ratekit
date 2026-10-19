// Single source of truth for site navigation AND the homepage tool grid. Every tool page
// (and the homepage card grid) pulls its data from here instead of hand-copied markup —
// this is what let budget-calculator ship without appearing in menus or the grid
// (see REBUILD_PLAN.md, audit 2026-10-13).

export type Section = 'freelancers' | 'business' | 'startups' | 'fun';
export type Accent = 'blue' | 'violet' | 'green' | 'amber' | 'red';

interface LangEntry {
  label: string;
  path: string;
  /** Homepage card copy — omitted for tools not yet translated. */
  cardTitle?: string;
  desc?: string;
  tags?: string[];
  badge?: string;
}

export interface Tool {
  slug: string;
  icon: string;
  section: Section;
  /** Icon-tile / accent color family used on the homepage grid. */
  accent: Accent;
  en: LangEntry;
  /** Present only once the tool has a RU translation. */
  ru?: LangEntry;
  /** US-specific tool: shown in the RU menu pointing at the EN page, flagged "US только". */
  usOnly?: boolean;
}

export const sectionLabel: Record<Section, { en: string; ru: string }> = {
  freelancers: { en: 'Freelancers', ru: 'Фрилансерам' },
  business: { en: 'Business & Startups', ru: 'Бизнес и стартапы' },
  startups: { en: 'Startups', ru: 'Стартапы' },
  fun: { en: 'Just for Fun', ru: 'Для удовольствия' },
};

export const tools: Tool[] = [
  // ── Freelancers ──
  { slug: 'freelance-rate', icon: '💰', section: 'freelancers', accent: 'blue',
    en: { label: 'Freelance Rate', path: '/freelance-rate', cardTitle: 'Freelance Rate Calculator',
      desc: 'Calculate the minimum hourly, daily, and project rate you need to charge based on your income goals, expenses, and working schedule.',
      tags: ['Freelancers', 'Consultants', 'Agencies'], badge: '⭐ Popular' },
    ru: { label: 'Ставка фрилансера', path: '/ru/freelance-rate', cardTitle: 'Калькулятор ставки фрилансера',
      desc: 'Рассчитайте минимальную почасовую, дневную и проектную ставку исходя из целевого дохода, расходов и рабочего графика.',
      tags: ['Фрилансеры', 'Консультанты', 'Агентства'], badge: '⭐ Популярный' } },
  { slug: 'salary-hourly', icon: '🔄', section: 'freelancers', accent: 'blue',
    en: { label: 'Salary ↔ Hourly', path: '/salary-hourly', cardTitle: 'Salary ↔ Hourly Calculator',
      desc: 'Convert annual salary to hourly rate or hourly rate to annual salary. Accounts for work hours, paid time off, and holidays.',
      tags: ['Freelancers', 'Job seekers', 'Converter'] },
    ru: { label: 'Зарплата ↔ Почасовая', path: '/ru/salary-hourly', cardTitle: 'Калькулятор зарплата ↔ почасовая ставка',
      desc: 'Переведите годовую зарплату в часовую ставку или наоборот. Учитывает рабочие часы, отпуск и праздники.',
      tags: ['Фрилансеры', 'Соискатели', 'Конвертер'] } },
  { slug: '1099-vs-w2', icon: '📋', section: 'freelancers', accent: 'red',
    en: { label: '1099 vs W2', path: '/1099-vs-w2', cardTitle: '1099 vs W2 Calculator',
      desc: 'Compare contractor (1099) vs employee (W2) take-home pay. Find out which option actually puts more money in your pocket after taxes and benefits.',
      tags: ['USA', 'Freelancers', 'Tax 2026'] }, usOnly: true },
  { slug: 'stripe-fee', icon: '💳', section: 'freelancers', accent: 'amber',
    en: { label: 'Stripe / PayPal Fee', path: '/stripe-fee', cardTitle: 'Stripe & PayPal Fee Calculator',
      desc: 'Find out how much to charge your client so you receive your desired amount after Stripe, PayPal, or Square processing fees.',
      tags: ['Freelancers', 'E-commerce', 'Invoicing'], badge: '🔥 #1 Requested' },
    ru: { label: 'Комиссия Stripe / PayPal', path: '/ru/stripe-fee', cardTitle: 'Калькулятор комиссий Stripe и PayPal',
      desc: 'Узнайте, сколько выставить клиенту, чтобы получить нужную сумму после комиссии Stripe, PayPal или Square.',
      tags: ['Фрилансеры', 'E-commerce', 'Счета'], badge: '🔥 Популярный' } },
  { slug: 'vat-calculator', icon: '🌍', section: 'freelancers', accent: 'green',
    en: { label: 'VAT / GST Calculator', path: '/vat-calculator', cardTitle: 'VAT & GST Calculator',
      desc: 'Add or remove VAT/GST from any price. Supports UK, EU, Australia, Canada, and 10+ countries. Essential for international invoicing.',
      tags: ['Europe', 'Australia', 'Global'] },
    ru: { label: 'Калькулятор НДС / GST', path: '/ru/vat-calculator', cardTitle: 'Калькулятор НДС / GST',
      desc: 'Добавьте или вычтите НДС/GST из любой суммы. Поддерживает ЕС, Великобританию, Австралию, Канаду и произвольную ставку.',
      tags: ['Европа', 'Австралия', 'Мир'] } },
  { slug: 'invoice-generator', icon: '🧾', section: 'freelancers', accent: 'green',
    en: { label: 'Invoice Generator', path: '/invoice-generator', cardTitle: 'Invoice Generator',
      desc: 'Create professional invoices in seconds. Add line items, tax, and download as PDF. Your data is saved automatically.',
      tags: ['Freelancers', 'Small Business', 'PDF'], badge: '⭐ Popular' },
    ru: { label: 'Счёт-фактура онлайн', path: '/ru/invoice-generator', cardTitle: 'Счёт-фактура онлайн',
      desc: 'Создавайте профессиональные счета за секунды. Добавляйте позиции, налог, скачивайте в PDF. Данные сохраняются автоматически.',
      tags: ['Фрилансеры', 'Малый бизнес', 'PDF'], badge: '⭐ Популярный' } },
  { slug: 'self-employment-tax', icon: '🇺🇸', section: 'freelancers', accent: 'red',
    en: { label: 'Self-Employment Tax', path: '/self-employment-tax', cardTitle: 'Self-Employment Tax Calculator',
      desc: 'Calculate US self-employment tax (15.3%), estimated quarterly payments, and how much to set aside from every freelance payment.',
      tags: ['USA', 'Freelancers', 'Tax 2026'] }, usOnly: true },
  { slug: 'form-2555', icon: '📋', section: 'freelancers', accent: 'red',
    en: { label: 'Form 2555 (Expat)', path: '/form-2555', cardTitle: 'Form 2555 — FEIE Calculator',
      desc: 'US expats: calculate your Foreign Earned Income Exclusion for 2026. Supports Bona Fide Residence and Physical Presence tests.',
      tags: ['US Expats', 'Tax 2026', 'FEIE'] } },
  { slug: 'deal-coach', icon: '🤖', section: 'freelancers', accent: 'green',
    en: { label: 'Deal Coach AI', path: '/deal-coach', cardTitle: 'Deal Coach',
      desc: 'AI negotiation assistant. Get structured arguments for your rate negotiation or equity/SAFE discussion — in 2-3 minutes.',
      tags: ['Freelancers', 'Founders', 'AI'], badge: '✨ AI-Powered' } },

  // ── Business & Startups ──
  { slug: 'roi-calculator', icon: '📈', section: 'business', accent: 'violet',
    en: { label: 'ROI Calculator', path: '/roi-calculator', cardTitle: 'ROI Calculator',
      desc: 'Calculate return on investment, annualized ROI, and payback period for any business investment, marketing campaign, or project.',
      tags: ['Marketing', 'Investment', 'Business'] },
    ru: { label: 'Калькулятор ROI', path: '/ru/roi-calculator', cardTitle: 'Калькулятор ROI',
      desc: 'Рассчитайте окупаемость инвестиций (ROI), годовую доходность и срок окупаемости для любого проекта или рекламной кампании.',
      tags: ['Маркетинг', 'Инвестиции', 'Бизнес'] } },
  { slug: 'profit-margin', icon: '🛒', section: 'business', accent: 'amber',
    en: { label: 'Profit Margin', path: '/profit-margin', cardTitle: 'Profit Margin Calculator',
      desc: 'Calculate gross and net profit margin, markup percentage, and find your ideal selling price from cost and desired margin.',
      tags: ['E-commerce', 'Retail', 'Pricing'] },
    ru: { label: 'Маржа и наценка', path: '/ru/profit-margin', cardTitle: 'Калькулятор маржи и наценки',
      desc: 'Рассчитайте валовую и чистую маржу, процент наценки и идеальную цену продажи исходя из себестоимости.',
      tags: ['E-commerce', 'Розница', 'Ценообразование'] } },
  { slug: 'break-even', icon: '⚖️', section: 'business', accent: 'red',
    en: { label: 'Break-even', path: '/break-even', cardTitle: 'Break-even Calculator',
      desc: 'Determine how many units you need to sell (or revenue you need to generate) to cover your fixed and variable costs and start turning a profit.',
      tags: ['Business', 'Pricing', 'Planning'] },
    ru: { label: 'Точка безубыточности', path: '/ru/break-even', cardTitle: 'Точка безубыточности',
      desc: 'Узнайте, сколько единиц товара нужно продать (или какую выручку получить), чтобы покрыть постоянные и переменные расходы.',
      tags: ['Бизнес', 'Ценообразование', 'Планирование'] } },
  { slug: 'loan-calculator', icon: '🏦', section: 'business', accent: 'blue',
    en: { label: 'Business Loan', path: '/loan-calculator', cardTitle: 'Business Loan Calculator',
      desc: 'Calculate monthly payments, total interest, and true APR for any business loan. Includes full amortization schedule.',
      tags: ['Finance', 'Loans', 'APR'] },
    ru: { label: 'Бизнес-кредит', path: '/ru/loan-calculator', cardTitle: 'Калькулятор бизнес-кредита и APR',
      desc: 'Рассчитайте ежемесячный платёж, общую переплату и реальный APR для бизнес-кредита. Полный график погашения.',
      tags: ['Финансы', 'Кредиты', 'APR'] } },
  { slug: 'pl-statement', icon: '📊', section: 'business', accent: 'blue',
    en: { label: 'P&L Statement', path: '/pl-statement', cardTitle: 'P&L Statement',
      desc: 'Build your Profit & Loss statement online. Auto-calculates gross profit, EBITDA, and net profit. Export as PDF.',
      tags: ['Business', 'Finance', 'Reporting'] },
    ru: { label: 'Отчёт P&L', path: '/ru/pl-statement', cardTitle: 'Отчёт о прибылях и убытках (P&L)',
      desc: 'Составьте P&L онлайн. Автоматически считает валовую прибыль, EBITDA и чистую прибыль. Экспорт в PDF.',
      tags: ['Бизнес', 'Финансы', 'Отчётность'] } },
  { slug: 'budget-calculator', icon: '💵', section: 'business', accent: 'amber',
    en: { label: 'Budget & Cash Flow', path: '/budget-calculator', cardTitle: 'Budget & Cash Flow Calculator',
      desc: 'Plan your monthly budget, forecast cash flow for 12 months, and calculate runway. Build financial projections with revenue, costs, and scenarios.',
      tags: ['Planning', 'Finance', 'Founders'] },
    ru: { label: 'Бюджет и кассовые потоки', path: '/ru/budget-calculator', cardTitle: 'Калькулятор бюджета и кассовых потоков',
      desc: 'Спланируйте ежемесячный бюджет, спроектируйте кассовый поток на 12 месяцев и рассчитайте runway вашей компании.',
      tags: ['Планирование', 'Финансы', 'Фаундеры'] } },

  // ── Startups ──
  { slug: 'safe-calculator', icon: '🚀', section: 'startups', accent: 'green',
    en: { label: 'SAFE Equity', path: '/safe-calculator', cardTitle: 'SAFE Equity Calculator',
      desc: 'Model your SAFE note conversion, ownership percentage, and dilution. Supports valuation cap, discount rate, and MFN provisions.',
      tags: ['Startups', 'Founders', 'Investors'], badge: '🚀 Startups' },
    ru: { label: 'Доля SAFE', path: '/ru/safe-calculator', cardTitle: 'Калькулятор конвертации SAFE',
      desc: 'Смоделируйте конвертацию SAFE, долю владения и размытие. Поддерживает cap, дисконт и MFN.',
      tags: ['Стартапы', 'Фаундеры', 'Инвесторы'], badge: '🚀 Стартапы' } },
  { slug: 'burn-rate', icon: '🔥', section: 'startups', accent: 'amber',
    en: { label: 'Burn Rate & Runway', path: '/burn-rate', cardTitle: 'Burn Rate & Runway',
      desc: 'Find out how long your startup can survive on current cash. Calculate gross and net burn rate, runway in months, and zero-cash date.',
      tags: ['Startups', 'CFOs', 'Founders'] },
    ru: { label: 'Burn Rate и Runway', path: '/ru/burn-rate', cardTitle: 'Калькулятор Burn Rate и Runway',
      desc: 'Узнайте, сколько ваш стартап продержится на текущих деньгах. Gross/net burn rate, runway в месяцах, дата обнуления.',
      tags: ['Стартапы', 'CFO', 'Фаундеры'] } },
  { slug: 'ltv-cac', icon: '📉', section: 'startups', accent: 'violet',
    en: { label: 'LTV : CAC', path: '/ltv-cac', cardTitle: 'LTV : CAC Calculator',
      desc: 'Calculate your Customer Lifetime Value and Customer Acquisition Cost. Find out if your unit economics are healthy and how to improve them.',
      tags: ['SaaS', 'Growth', 'Marketing'] },
    ru: { label: 'LTV : CAC', path: '/ru/ltv-cac', cardTitle: 'Калькулятор LTV : CAC',
      desc: 'Рассчитайте пожизненную ценность клиента и стоимость его привлечения. Узнайте, здорова ли ваша юнит-экономика.',
      tags: ['SaaS', 'Рост', 'Маркетинг'] } },

  // ── Just for fun ──
  { slug: 'math-quiz', icon: '🧠', section: 'fun', accent: 'violet',
    en: { label: 'Mental Math Quiz', path: '/math-quiz', cardTitle: 'Mental Math Challenge',
      desc: 'Test your mental math and business-sense in a fast 60-second quiz. No calculator allowed — keep your brain sharp.',
      tags: ['Game', 'Brain Training', 'Fun'], badge: '🎮 New' },
    ru: { label: 'Квиз на устный счёт', path: '/ru/math-quiz', cardTitle: 'Квиз: быстрый устный счёт',
      desc: 'Проверьте устный счёт и деловую смекалку за 60 секунд. Без калькулятора — для тренировки ума.',
      tags: ['Игра', 'Тренировка ума', 'Развлечение'], badge: '🎮 Новое' } },
];

export function toolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
