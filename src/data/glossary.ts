// Programmatic-SEO glossary: one template (src/pages/glossary/[slug].astro) rendering
// every entry below, instead of hand-written pages — add a term here and it ships with
// nav-free but fully indexable chrome (meta, JSON-LD DefinedTerm, related calculators)
// automatically. EN only for now; mirrors the "single source of truth" pattern in tools.ts.

export interface GlossaryTerm {
  slug: string;
  term: string;
  shortDef: string;
  category: string;
  formula?: string;
  body: string[];
  relatedTools: { label: string; path: string }[];
}

export const glossary: GlossaryTerm[] = [
  {
    slug: 'roi',
    term: 'ROI (Return on Investment)',
    shortDef: 'ROI measures how much profit an investment generated relative to its cost, expressed as a percentage.',
    category: 'Investment & Growth',
    formula: 'ROI = (Net Profit / Cost of Investment) × 100',
    body: [
      "Return on Investment (ROI) is the most widely used metric for judging whether money spent on a campaign, a piece of equipment, or a project paid off. It strips away the dollar amounts and expresses the result as a single percentage, which makes it easy to compare completely different kinds of spending — a $500 ad campaign and a $50,000 piece of machinery can both be scored on the same scale.",
      "ROI has one well-known blind spot: it ignores time. A 50% ROI earned in one month is a very different result from a 50% ROI earned over five years, which is why marketers and investors often also look at annualized ROI — the same return normalized to a 12-month period — when comparing investments with different holding periods.",
      "ROI also says nothing about risk. A high-ROI investment that could just as easily have lost money is not automatically better than a lower, more reliable return. Use ROI to compare similar bets, not to replace judgment about how likely each outcome actually was.",
    ],
    relatedTools: [
      { label: 'ROI Calculator', path: '/roi-calculator' },
      { label: 'Break-even Calculator', path: '/break-even' },
      { label: 'Profit Margin Calculator', path: '/profit-margin' },
    ],
  },
  {
    slug: 'break-even-point',
    term: 'Break-Even Point',
    shortDef: "The break-even point is the sales volume — in units or revenue — at which total revenue equals total costs, so profit is exactly zero.",
    category: 'Pricing & Costs',
    formula: 'Break-even units = Fixed Costs / (Price − Variable Cost per unit)',
    body: [
      "Every business has costs that don't move with sales volume — rent, salaries, software subscriptions — and costs that scale with each unit sold, like materials or payment processing fees. The break-even point is the exact number of units (or the exact revenue figure) where the money coming in from sales finally covers both kinds of costs completely, with nothing left over and nothing short.",
      "Below the break-even point, every sale still loses the business money overall, even if each individual unit is sold at a profit on paper — because the fixed costs haven't been paid off yet. Above it, every additional unit sold drops straight to the bottom line as profit, since the fixed costs are already covered.",
      "Break-even analysis is one of the first things a new business or new product line should calculate, because it turns \"will this work?\" into a concrete, falsifiable number: a specific sales target to hit, rather than a vague hope.",
    ],
    relatedTools: [
      { label: 'Break-even Calculator', path: '/break-even' },
      { label: 'Profit Margin Calculator', path: '/profit-margin' },
      { label: 'Budget & Cash Flow Calculator', path: '/budget-calculator' },
    ],
  },
  {
    slug: 'contribution-margin',
    term: 'Contribution Margin',
    shortDef: "Contribution margin is the revenue left from one unit of sale after subtracting only the variable costs tied to that unit — the amount it \"contributes\" toward covering fixed costs and profit.",
    category: 'Pricing & Costs',
    formula: 'Contribution Margin = Price − Variable Cost per Unit',
    body: [
      "Contribution margin answers a narrower question than profit margin: not \"is this unit profitable after everything?\" but \"how much does each unit sold help pay down the bills that don't change with volume?\" It's calculated per unit (or as a ratio, contribution margin ÷ price) and deliberately excludes fixed costs like rent or salaries.",
      "This makes it the key input to break-even analysis — fixed costs divided by contribution margin tells you exactly how many units you need to sell before fixed costs are covered and every further sale is pure profit. A healthy contribution margin ratio also tells you how much cushion you have to absorb a price cut or a cost increase without losing money on each sale.",
    ],
    relatedTools: [
      { label: 'Break-even Calculator', path: '/break-even' },
      { label: 'Profit Margin Calculator', path: '/profit-margin' },
    ],
  },
  {
    slug: 'markup-vs-margin',
    term: 'Markup vs. Margin',
    shortDef: 'Markup is profit expressed as a percentage of cost; margin is the same profit expressed as a percentage of selling price. They always give different numbers for the same sale.',
    category: 'Pricing & Costs',
    body: [
      "Markup and margin are the single most commonly confused pair of numbers in pricing, because they describe the exact same dollar amount of profit from two different starting points. If something costs you $60 and you sell it for $100, your profit is $40. As a markup (profit ÷ cost), that's 66.7%. As a margin (profit ÷ selling price), that's 40%. Both are correct; they're just answering different questions.",
      "The practical risk is using a markup percentage where a margin percentage was intended, or vice versa — a common mistake is setting a \"50% margin\" by simply adding 50% to cost, which actually produces only a 33.3% margin, not 50%. If you want a true 50% margin, you need a 100% markup on cost.",
      "As a rule of thumb: markup is always a larger number than margin for the same sale, because cost is always lower than selling price, so the same profit dollars make up a bigger share of the smaller number.",
    ],
    relatedTools: [
      { label: 'Profit Margin Calculator', path: '/profit-margin' },
      { label: 'Break-even Calculator', path: '/break-even' },
    ],
  },
  {
    slug: 'burn-rate',
    term: 'Burn Rate',
    shortDef: 'Burn rate is how much cash a company spends per month, usually split into gross burn (total spending) and net burn (spending minus revenue).',
    category: 'Startups & Fundraising',
    body: [
      "Burn rate is the startup-world term for a company's monthly cash outflow. Gross burn is simply total monthly operating expenses — payroll, rent, software, everything. Net burn subtracts whatever revenue came in that month, and is the number that actually determines how fast the bank balance is falling.",
      "A profitable, revenue-generating company can have a high gross burn but zero or negative net burn, meaning cash is actually growing. A pre-revenue startup's gross and net burn are usually identical, since there's no revenue to offset spending.",
      "Investors watch burn rate closely because, combined with cash in the bank, it determines runway — how many months the company can operate before running out of money. A sudden, unexplained jump in burn rate is one of the first warning signs investors look for in board updates.",
    ],
    relatedTools: [
      { label: 'Burn Rate & Runway Calculator', path: '/burn-rate' },
      { label: 'Budget & Cash Flow Calculator', path: '/budget-calculator' },
      { label: 'SAFE Equity Calculator', path: '/safe-calculator' },
    ],
  },
  {
    slug: 'runway',
    term: 'Startup Runway',
    shortDef: "Runway is how many months a company can keep operating at its current burn rate before its cash balance hits zero.",
    category: 'Startups & Fundraising',
    formula: 'Runway (months) = Cash in Bank / Net Burn Rate',
    body: [
      "Runway answers the single most urgent question for an early-stage company: how much time is left before the money runs out? It's calculated by dividing current cash on hand by the net monthly burn rate, assuming spending and revenue stay roughly constant.",
      "The common advice is to start fundraising with at least 6-9 months of runway remaining, not when the bank account is nearly empty — because a fundraise typically takes 3-6 months from first pitch to money in the bank, and negotiating from a position of scarcity produces worse terms. Investors generally like to see 18-24 months of runway right after a round closes.",
      "Runway is a moving target, not a fixed number: any change in hiring, spend, or revenue growth immediately shifts it, which is why most founders recalculate it monthly rather than treating it as a one-time estimate.",
    ],
    relatedTools: [
      { label: 'Burn Rate & Runway Calculator', path: '/burn-rate' },
      { label: 'Budget & Cash Flow Calculator', path: '/budget-calculator' },
      { label: 'SAFE Equity Calculator', path: '/safe-calculator' },
    ],
  },
  {
    slug: 'cac',
    term: 'Customer Acquisition Cost (CAC)',
    shortDef: 'CAC is the total sales and marketing cost to acquire one new customer, calculated by dividing total spend by the number of customers acquired.',
    category: 'Investment & Growth',
    formula: 'CAC = Total Sales & Marketing Spend / New Customers Acquired',
    body: [
      "Customer Acquisition Cost is exactly what it sounds like: how much, on average, it costs a business to turn a stranger into a paying customer. It's calculated over a period — usually a month or a quarter — by dividing everything spent on sales and marketing in that period by the number of new customers that period produced.",
      "CAC on its own doesn't tell you whether a business is healthy; it only becomes meaningful next to Customer Lifetime Value (LTV). A $500 CAC is a disaster for a product that generates $100 of lifetime profit per customer, and a bargain for one that generates $5,000. That comparison is exactly what the LTV:CAC ratio measures.",
      "CAC tends to rise as a channel matures and the cheapest, most obvious customers have already been captured — a rising CAC over time, even with flat ad spend, is often a sign that a growth channel is saturating.",
    ],
    relatedTools: [
      { label: 'LTV : CAC Calculator', path: '/ltv-cac' },
      { label: 'ROI Calculator', path: '/roi-calculator' },
    ],
  },
  {
    slug: 'ltv',
    term: 'Customer Lifetime Value (LTV)',
    shortDef: 'LTV is the total gross profit a business expects to earn from a customer over the entire time they remain a customer.',
    category: 'Investment & Growth',
    formula: 'LTV = (Monthly Revenue per Customer × Gross Margin) / Monthly Churn Rate',
    body: [
      "Customer Lifetime Value estimates the total profit — not revenue — a typical customer is worth over their whole relationship with a business, from first purchase to the day they leave. For subscription businesses, it's usually calculated from monthly revenue per customer, gross margin, and the monthly churn rate, since 1 ÷ churn rate gives the average customer lifespan in months.",
      "A common mistake is calculating LTV from revenue instead of gross profit, which overstates the number by ignoring the cost of actually serving the customer — hosting, support, payment processing, cost of goods. A correct LTV is always a profit figure, since it's meant to be compared against CAC, which is also a cost.",
      "Because churn rate sits in the denominator, LTV is extremely sensitive to small changes in retention — cutting monthly churn in half roughly doubles LTV, which is why reducing churn is usually a higher-leverage lever than increasing acquisition spend.",
    ],
    relatedTools: [
      { label: 'LTV : CAC Calculator', path: '/ltv-cac' },
      { label: 'Profit Margin Calculator', path: '/profit-margin' },
    ],
  },
  {
    slug: 'ltv-cac-ratio',
    term: 'LTV:CAC Ratio',
    shortDef: "The LTV:CAC ratio compares what a customer is worth (LTV) to what it costs to acquire them (CAC); 3:1 is the widely cited healthy benchmark for SaaS businesses.",
    category: 'Investment & Growth',
    body: [
      "The LTV:CAC ratio is the single number most often used to judge whether a company's growth is sustainable. Below 1:1, the business loses money on every customer it acquires, no matter how much revenue shows up on the top line. Between 1:1 and 3:1 is considered marginal — the unit economics work, but with little room for error.",
      "3:1 to 5:1 is generally treated as the healthy range: customers generate meaningfully more value than they cost to acquire, while the business is still spending enough on growth to keep winning new customers. A ratio well above 5:1 can actually be a yellow flag rather than purely good news — it often means a company is being too conservative with growth spending.",
      "The ratio should always be read alongside CAC payback period (how many months it takes to recover the acquisition cost), since a business can have excellent long-term unit economics and still run out of cash waiting for that payback to happen.",
    ],
    relatedTools: [
      { label: 'LTV : CAC Calculator', path: '/ltv-cac' },
      { label: 'Burn Rate & Runway Calculator', path: '/burn-rate' },
    ],
  },
  {
    slug: 'safe-note',
    term: 'SAFE Note',
    shortDef: 'A SAFE (Simple Agreement for Future Equity) is a startup fundraising instrument where an investor gives money now in exchange for equity at a future priced round, instead of receiving shares immediately.',
    category: 'Startups & Fundraising',
    body: [
      "A SAFE, created by Y Combinator in 2013, lets early-stage startups raise money without first agreeing on a company valuation — a notoriously hard thing to price accurately pre-revenue. The investor hands over cash now; in exchange, they get the right to convert that investment into equity later, when the company raises a priced round.",
      "Most SAFEs include a valuation cap (a ceiling on the valuation used to calculate the investor's conversion price), a discount (a percentage off the price other investors pay in that future round), or both. The investor converts at whichever term gives them the better, lower price.",
      "Since 2018, Y Combinator's standard SAFE is \"post-money\" — the valuation cap already accounts for all other SAFEs and the option pool, meaning each SAFE's ownership percentage is fixed and known at signing. Earlier \"pre-money\" SAFEs could dilute each other in ways that were hard to predict until the priced round actually happened.",
    ],
    relatedTools: [
      { label: 'SAFE Equity Calculator', path: '/safe-calculator' },
      { label: 'Burn Rate & Runway Calculator', path: '/burn-rate' },
    ],
  },
  {
    slug: 'equity-dilution',
    term: 'Equity Dilution',
    shortDef: "Dilution is the reduction in an existing shareholder's ownership percentage that happens when a company issues new shares to new investors.",
    category: 'Startups & Fundraising',
    body: [
      "Every time a company raises money by selling new shares — through a SAFE, a priced funding round, or a new employee stock option grant — the total number of shares outstanding goes up. Since each existing shareholder still owns the same number of shares as before, but the total pie has more slices, their percentage ownership goes down. That's dilution.",
      "Dilution isn't inherently bad: a smaller slice of a much bigger pie is usually a good trade for founders and early investors. The problem is uncontrolled or poorly understood dilution — stacking SAFEs at low caps, oversized option pools, or down rounds — which can leave founders with far less of the company than they expected by the time it's acquired or goes public.",
      "Founders typically track a \"cap table\" that shows exactly who owns what percentage after every round, so dilution from each new raise can be modeled and negotiated before it happens, not discovered afterward.",
    ],
    relatedTools: [
      { label: 'SAFE Equity Calculator', path: '/safe-calculator' },
      { label: 'Burn Rate & Runway Calculator', path: '/burn-rate' },
    ],
  },
  {
    slug: 'vat-gst',
    term: 'VAT / GST (Value Added Tax)',
    shortDef: 'VAT (or GST) is a consumption tax added at each stage of production and collected by the seller, ultimately paid by the end consumer.',
    category: 'Tax & Compliance',
    body: [
      "VAT (used in the EU, UK, and most of the world) and GST (used in countries like Australia, Canada, and India) are functionally the same kind of tax under different names: a percentage added to the price of most goods and services, collected by the business selling them, and remitted to the government. Unlike US sales tax, VAT/GST is typically charged and reclaimed at every stage of a supply chain, with only the end consumer ultimately bearing the cost.",
      "For a business, the practical complexity is usually around invoicing correctly — showing tax separately, applying the right rate for the right country and product category — and reclaiming VAT paid on business purchases against VAT collected on sales; the difference is what actually gets paid to the tax authority.",
      "Rates vary enormously by country and even by product category within a country (many countries apply a reduced rate to food, books, or children's goods), which is why cross-border sellers usually need a tool that tracks current rates by jurisdiction rather than memorizing a single number.",
    ],
    relatedTools: [
      { label: 'VAT & GST Calculator', path: '/vat-calculator' },
      { label: 'Invoice Generator', path: '/invoice-generator' },
    ],
  },
  {
    slug: 'self-employment-tax',
    term: 'Self-Employment Tax',
    shortDef: 'US self-employment tax is a 15.3% tax covering Social Security and Medicare, paid by freelancers and independent contractors in place of the payroll taxes an employer would normally split with an employee.',
    category: 'Tax & Compliance',
    formula: 'SE Tax = Net Earnings × 92.35% × 15.3% (12.4% Social Security + 2.9% Medicare)',
    body: [
      "When you work as a W-2 employee, your employer pays half of your Social Security and Medicare taxes (7.65%) and withholds the other half from your paycheck. When you're self-employed, there's no employer to split that cost, so you pay both halves yourself: 15.3% total, applied to 92.35% of your net self-employment earnings.",
      "This is on top of, not instead of, regular federal and state income tax — which is why many new freelancers are caught off guard the first time they see their full tax bill. A common rule of thumb is to set aside 25-30% of net profit for taxes throughout the year, since the US tax system expects self-employed people to pay estimated taxes quarterly.",
      "Half of the self-employment tax paid is deductible when calculating adjusted gross income, which softens the blow slightly, but it's still the single biggest tax-planning surprise for people transitioning from a salaried job to self-employment.",
    ],
    relatedTools: [
      { label: 'Self-Employment Tax Calculator', path: '/self-employment-tax' },
      { label: '1099 vs W2 Calculator', path: '/1099-vs-w2' },
      { label: 'Freelance Rate Calculator', path: '/freelance-rate' },
    ],
  },
  {
    slug: 'feie',
    term: 'FEIE (Foreign Earned Income Exclusion)',
    shortDef: 'The FEIE lets qualifying US citizens living abroad exclude a set amount of foreign-earned income from US federal income tax each year.',
    category: 'Tax & Compliance',
    body: [
      "The United States taxes its citizens on worldwide income no matter where they live — almost uniquely among countries. The Foreign Earned Income Exclusion, claimed via IRS Form 2555, is the main relief valve for Americans living and working abroad: it lets them exclude a set dollar amount of foreign wages or self-employment income from US income tax each year.",
      "To qualify, you need a tax home in a foreign country and need to pass either the Bona Fide Residence Test (established residency abroad for a full tax year) or the Physical Presence Test (at least 330 full days outside the US in any 12-month period). If you qualify for only part of the year, the exclusion limit is prorated.",
      "The FEIE only reduces income tax — it does not reduce US self-employment tax, which self-employed expats still owe in full unless a specific totalization agreement applies. Expats in high-tax countries sometimes do better with the Foreign Tax Credit instead of, or alongside, the FEIE.",
    ],
    relatedTools: [
      { label: 'Form 2555 — FEIE Calculator', path: '/form-2555' },
      { label: 'Self-Employment Tax Calculator', path: '/self-employment-tax' },
    ],
  },
  {
    slug: 'apr',
    term: 'APR (Annual Percentage Rate)',
    shortDef: 'APR is the yearly cost of borrowing money, expressed as a percentage, including both the interest rate and most upfront fees — making it the right number for comparing loans with different fee structures.',
    category: 'Finance & Loans',
    body: [
      "The interest rate on a loan tells you how much interest accrues on the outstanding balance. APR goes further: it folds in origination fees and other upfront charges, spreading them across the loan term to produce a single annualized percentage that represents the loan's true cost.",
      "Two loans with the identical interest rate can have very different APRs if one charges a 3% origination fee and the other charges none — APR is what makes that difference visible and comparable, rather than requiring you to do the fee math yourself for every offer.",
      "Short-term lenders sometimes quote a \"factor rate\" instead of an interest rate (e.g., repay 1.2× what you borrowed). Factor rates look deceptively small because they aren't annualized — converted to APR, many factor-rate loans turn out to carry effective annual rates well over 40-50%.",
    ],
    relatedTools: [{ label: 'Business Loan & APR Calculator', path: '/loan-calculator' }],
  },
  {
    slug: 'amortization',
    term: 'Loan Amortization',
    shortDef: 'Amortization is the process of paying off a loan through equal periodic payments, where each payment covers that period\'s interest plus a growing share of the principal.',
    category: 'Finance & Loans',
    body: [
      "An amortizing loan — most mortgages, auto loans, and standard business term loans — is structured so every payment is the same dollar amount for the life of the loan, but the mix inside each payment changes over time. Early payments are mostly interest, because the outstanding balance is still large; later payments are mostly principal, because the balance has shrunk.",
      "An amortization schedule is a table showing, payment by payment, exactly how much went to interest versus principal, and what the remaining balance is afterward. It's useful for understanding total interest cost, and for deciding whether an extra principal payment is worth making — it almost always is, early in the loan, when the interest share is highest.",
      "The monthly payment itself is calculated once, up front, from the loan amount, interest rate, and term — it doesn't need to be recalculated each month unless the rate changes, as with an adjustable-rate loan.",
    ],
    relatedTools: [{ label: 'Business Loan & APR Calculator', path: '/loan-calculator' }],
  },
  {
    slug: 'ebitda',
    term: 'EBITDA',
    shortDef: 'EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) is a measure of a company\'s core operating profitability, stripped of financing and accounting decisions.',
    category: 'Finance & Loans',
    body: [
      "EBITDA starts from net profit and adds back interest expense, taxes, depreciation, and amortization — four items that have nothing to do with how well the underlying business operates, and everything to do with how it's financed, where it's taxed, and how its accountants depreciate assets on paper. What's left is a rough proxy for the cash-generating power of the core business.",
      "Investors and acquirers favor EBITDA because it allows an apples-to-apples comparison between companies with very different capital structures or tax situations — a company funded entirely by equity and one funded heavily by debt can look very different on net profit alone, purely because of interest expense.",
      "EBITDA is not the same as cash flow and has been criticized for making leveraged or capital-intensive businesses look healthier than they are, since it ignores both debt payments and ongoing capital expenditure. It's a useful comparison metric, not a substitute for looking at actual cash in the bank.",
    ],
    relatedTools: [
      { label: 'P&L Statement', path: '/pl-statement' },
      { label: 'ROI Calculator', path: '/roi-calculator' },
    ],
  },
  {
    slug: 'billable-hours',
    term: 'Billable vs. Non-Billable Hours',
    shortDef: "Billable hours are time spent on work a client directly pays for; non-billable hours cover everything else a freelancer or agency does to keep the business running.",
    category: 'Freelancing',
    body: [
      "Billable hours are the only hours that generate revenue directly — writing the code, designing the asset, running the consultation the client is actually paying for. Non-billable hours cover everything that supports that work but isn't itself billed: sending invoices, finding new clients, revising proposals, bookkeeping, and ordinary business admin.",
      "The gap between the two is the single biggest reason a freelance hourly rate needs to be much higher than an equivalent employee's hourly wage. A freelancer who wants to take home $75,000 a year can't just divide that by 2,080 working hours, because a large share of those hours — often 20-30% — will be non-billable. The target income has to be divided by billable hours only.",
      "Agencies and consultancies track a \"utilization rate\" (billable hours ÷ total hours available) precisely to monitor this gap; a utilization rate below roughly 65-75% usually signals pricing or staffing problems.",
    ],
    relatedTools: [
      { label: 'Freelance Rate Calculator', path: '/freelance-rate' },
      { label: 'Salary ↔ Hourly Calculator', path: '/salary-hourly' },
    ],
  },
  {
    slug: 'payment-processing-fees',
    term: 'Payment Processing Fees',
    shortDef: 'Payment processors like Stripe and PayPal charge a percentage plus a small fixed fee on every card transaction, which reduces what a seller actually receives from a sale.',
    category: 'Freelancing',
    formula: 'Fee = (Amount × Percentage) + Fixed Fee',
    body: [
      "Every time a customer pays by card online, the payment processor — Stripe, PayPal, Square, and similar services — takes a cut before the money reaches the seller. The standard structure is a percentage of the transaction plus a small flat fee per transaction, commonly around 2.9% + $0.30 in the US for Stripe, slightly higher for PayPal's checkout product.",
      "International cards, currency conversion, and manually-keyed transactions typically carry extra percentage points on top of the standard rate, which is why the same seller can see meaningfully different effective rates month to month depending on where their customers are paying from.",
      "Sellers who want to pass the fee on to the customer, rather than absorb it, need to charge slightly more than the amount they actually want to receive — a flat percentage markup equal to the processor's rate isn't quite enough, because the fee is calculated on the higher, grossed-up charge amount.",
    ],
    relatedTools: [
      { label: 'Stripe & PayPal Fee Calculator', path: '/stripe-fee' },
      { label: 'Invoice Generator', path: '/invoice-generator' },
      { label: 'Freelance Rate Calculator', path: '/freelance-rate' },
    ],
  },
  {
    slug: 'cash-flow-forecast',
    term: 'Cash Flow Forecast',
    shortDef: 'A cash flow forecast projects how much cash a business will have on hand in future months, based on expected revenue, costs, and the starting cash balance.',
    category: 'Finance & Loans',
    body: [
      "Unlike a profit and loss statement, which can show a business as profitable \"on paper\" even when it's short on actual cash, a cash flow forecast tracks the thing that actually determines whether a business can pay its bills: the real cash balance in the bank, month by month.",
      "A basic forecast starts with the current cash balance, then adds expected monthly revenue and subtracts expected monthly costs for each future period, carrying the running balance forward. More detailed forecasts build in multiple scenarios — what happens to the cash position if revenue comes in 25% below plan, or above it — since actual results rarely match the single most-likely projection exactly.",
      "For a startup or any cash-constrained business, a 12-month rolling cash flow forecast is one of the most important documents to keep current, because it's what turns \"runway\" and \"burn rate\" from abstract concepts into an actual month where, if nothing changes, the business runs out of money.",
    ],
    relatedTools: [
      { label: 'Budget & Cash Flow Calculator', path: '/budget-calculator' },
      { label: 'Burn Rate & Runway Calculator', path: '/burn-rate' },
    ],
  },
];

export function glossaryBySlug(slug: string): GlossaryTerm | undefined {
  return glossary.find((g) => g.slug === slug);
}

export const glossaryCategories = Array.from(new Set(glossary.map((g) => g.category)));
