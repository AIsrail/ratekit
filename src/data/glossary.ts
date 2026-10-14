// Programmatic-SEO glossary: one template per language (src/pages/glossary/[slug].astro,
// src/pages/ru/glossary/[slug].astro) rendering every entry below instead of hand-written
// pages — add a term here and it ships with fully indexable chrome (meta, JSON-LD
// DefinedTerm, related calculators) automatically. Mirrors the "single source of truth"
// pattern in tools.ts. Top-level fields are English; `ru` holds the Russian translation —
// every term currently has one, but it's optional so new terms can ship EN-first.

export interface GlossaryTermRu {
  term: string;
  shortDef: string;
  category: string;
  formula?: string;
  body: string[];
  relatedTools: { label: string; path: string }[];
}

export interface GlossaryTerm {
  slug: string;
  term: string;
  shortDef: string;
  category: string;
  formula?: string;
  body: string[];
  relatedTools: { label: string; path: string }[];
  ru?: GlossaryTermRu;
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
    ru: {
      term: 'ROI (рентабельность инвестиций)',
      shortDef: 'ROI показывает, сколько прибыли принесла инвестиция относительно её стоимости, в процентах.',
      category: 'Инвестиции и рост',
      formula: 'ROI = (Чистая прибыль / Стоимость инвестиции) × 100',
      body: [
        'Return on Investment (ROI, рентабельность инвестиций) — самая распространённая метрика для оценки того, окупились ли деньги, потраченные на рекламную кампанию, оборудование или проект. Она убирает из уравнения конкретные суммы и выражает результат одним процентом, что позволяет сравнивать совершенно разные виды затрат — кампанию за $500 и станок за $50 000 можно оценить по одной шкале.',
        'У ROI есть известное слабое место: он игнорирует время. ROI 50%, полученный за месяц, — это совсем не то же самое, что ROI 50% за пять лет, поэтому маркетологи и инвесторы часто дополнительно считают годовой ROI (annualized ROI) — ту же доходность, приведённую к 12 месяцам, — когда сравнивают инвестиции с разными сроками.',
        'ROI также ничего не говорит о риске. Инвестиция с высоким ROI, которая с равной вероятностью могла принести убыток, не обязательно лучше более скромной, но надёжной доходности. Используйте ROI, чтобы сравнивать похожие варианты, а не чтобы заменить оценку того, насколько вероятен был каждый исход.',
      ],
      relatedTools: [
        { label: 'Калькулятор ROI', path: '/ru/roi-calculator' },
        { label: 'Точка безубыточности', path: '/ru/break-even' },
        { label: 'Маржа и наценка', path: '/ru/profit-margin' },
      ],
    },
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
    ru: {
      term: 'Точка безубыточности',
      shortDef: 'Точка безубыточности — это объём продаж (в единицах или выручке), при котором выручка равна всем затратам, а прибыль равна нулю.',
      category: 'Цены и затраты',
      formula: 'Точка безубыточности (units) = Постоянные затраты / (Цена − Переменные затраты на единицу)',
      body: [
        'У любого бизнеса есть затраты, которые не зависят от объёма продаж — аренда, зарплаты, подписки на софт, — и затраты, которые растут с каждой проданной единицей, например материалы или комиссии платёжных систем. Точка безубыточности — это точное число единиц (или точная сумма выручки), при котором деньги от продаж наконец полностью покрывают оба вида затрат, без остатка и без недостачи.',
        'До точки безубыточности бизнес в целом теряет деньги на каждой продаже, даже если отдельная единица продаётся «в плюс» на бумаге — потому что постоянные затраты ещё не окуплены. После неё каждая дополнительная проданная единица идёт прямиком в прибыль, поскольку постоянные затраты уже покрыты.',
        'Расчёт точки безубыточности — одно из первых действий для нового бизнеса или нового продукта, потому что он превращает вопрос «а сработает ли это?» в конкретное, проверяемое число: точный план продаж, а не смутную надежду.',
      ],
      relatedTools: [
        { label: 'Точка безубыточности', path: '/ru/break-even' },
        { label: 'Маржа и наценка', path: '/ru/profit-margin' },
        { label: 'Калькулятор бюджета и кассовых потоков', path: '/ru/budget-calculator' },
      ],
    },
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
    ru: {
      term: 'Маржинальная прибыль (Contribution Margin)',
      shortDef: 'Маржинальная прибыль — это выручка с одной единицы продажи за вычетом только переменных затрат на неё — сумма, которая «вносит вклад» в покрытие постоянных затрат и прибыли.',
      category: 'Цены и затраты',
      formula: 'Маржинальная прибыль = Цена − Переменные затраты на единицу',
      body: [
        'Маржинальная прибыль отвечает на более узкий вопрос, чем маржа прибыли: не «прибыльна ли эта единица после всех затрат», а «сколько каждая проданная единица помогает покрыть расходы, не зависящие от объёма». Считается на единицу товара (или как коэффициент: маржинальная прибыль ÷ цена) и намеренно не учитывает постоянные затраты вроде аренды.',
        'Именно это делает её ключевым элементом расчёта точки безубыточности: постоянные затраты, делённые на маржинальную прибыль, точно показывают, сколько единиц нужно продать, прежде чем постоянные затраты будут покрыты и каждая следующая продажа станет чистой прибылью. Здоровый коэффициент маржинальной прибыли также показывает запас прочности на случай снижения цены или роста издержек.',
      ],
      relatedTools: [
        { label: 'Точка безубыточности', path: '/ru/break-even' },
        { label: 'Маржа и наценка', path: '/ru/profit-margin' },
      ],
    },
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
    ru: {
      term: 'Наценка vs. Маржа',
      shortDef: 'Наценка — это прибыль в процентах от себестоимости; маржа — та же прибыль в процентах от цены продажи. Для одной и той же продажи это всегда разные числа.',
      category: 'Цены и затраты',
      body: [
        'Наценка и маржа — самая часто путаемая пара чисел в ценообразовании, потому что они описывают одну и ту же сумму прибыли, но от разных точек отсчёта. Если товар стоит вам $60, а продаётся за $100, прибыль — $40. Как наценка (прибыль ÷ себестоимость) — это 66,7%. Как маржа (прибыль ÷ цена продажи) — это 40%. Оба числа верны, они просто отвечают на разные вопросы.',
        'Практический риск — использовать процент наценки там, где имелась в виду маржа, или наоборот. Частая ошибка — установить «маржу 50%», просто прибавив 50% к себестоимости, что на деле даёт маржу всего 33,3%, а не 50%. Чтобы получить настоящую маржу в 50%, нужна наценка в 100% от себестоимости.',
        'Практическое правило: наценка всегда больше маржи для одной и той же продажи — потому что себестоимость всегда ниже цены продажи, и та же прибыль составляет большую долю от меньшего числа.',
      ],
      relatedTools: [
        { label: 'Маржа и наценка', path: '/ru/profit-margin' },
        { label: 'Точка безубыточности', path: '/ru/break-even' },
      ],
    },
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
    ru: {
      term: 'Burn Rate (скорость сжигания денег)',
      shortDef: 'Burn rate — это сколько денег компания тратит в месяц, обычно делится на gross burn (общие расходы) и net burn (расходы минус выручка).',
      category: 'Стартапы и фандрайзинг',
      body: [
        'Burn rate — термин стартап-мира для месячного оттока денег компании. Gross burn — это просто все месячные операционные расходы: зарплаты, аренда, софт, всё подряд. Net burn вычитает выручку, поступившую в этом месяце, и именно этот показатель определяет, как быстро на самом деле падает остаток на счету.',
        'Прибыльная компания с выручкой может иметь высокий gross burn, но нулевой или даже отрицательный net burn — то есть деньги на самом деле растут. У стартапа без выручки gross и net burn обычно совпадают, потому что компенсировать расходы нечем.',
        'Инвесторы внимательно следят за burn rate, потому что вместе с остатком денег в банке он определяет runway — сколько месяцев компания может работать, прежде чем деньги закончатся. Внезапный необъяснимый скачок burn rate — один из первых тревожных сигналов, которые инвесторы ищут в отчётах совету директоров.',
      ],
      relatedTools: [
        { label: 'Burn Rate & Runway Calculator (на английском)', path: '/burn-rate' },
        { label: 'Калькулятор бюджета и кассовых потоков', path: '/ru/budget-calculator' },
        { label: 'SAFE Equity Calculator (на английском)', path: '/safe-calculator' },
      ],
    },
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
    ru: {
      term: 'Runway стартапа',
      shortDef: 'Runway — это сколько месяцев компания может работать при текущем burn rate, прежде чем остаток денег обнулится.',
      category: 'Стартапы и фандрайзинг',
      formula: 'Runway (месяцев) = Деньги в банке / Net Burn Rate',
      body: [
        'Runway отвечает на самый срочный вопрос для ранней стадии компании: сколько времени осталось до того, как деньги закончатся? Считается делением текущего остатка денег на net burn rate в месяц, при условии что расходы и выручка остаются примерно постоянными.',
        'Общепринятая рекомендация — начинать фандрайзинг, когда остаётся минимум 6-9 месяцев runway, а не когда счёт почти пуст: сбор раунда обычно занимает 3-6 месяцев от первой питч-встречи до денег на счету, а переговоры «от нужды» дают худшие условия. Сразу после закрытия раунда инвесторы обычно хотят видеть 18-24 месяца runway.',
        'Runway — не фиксированное число, а постоянно меняющаяся величина: любое изменение в найме, расходах или росте выручки сразу его сдвигает, поэтому большинство фаундеров пересчитывают его ежемесячно, а не считают разовой оценкой.',
      ],
      relatedTools: [
        { label: 'Burn Rate & Runway Calculator (на английском)', path: '/burn-rate' },
        { label: 'Калькулятор бюджета и кассовых потоков', path: '/ru/budget-calculator' },
      ],
    },
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
    ru: {
      term: 'CAC (стоимость привлечения клиента)',
      shortDef: 'CAC — это полная стоимость продаж и маркетинга на привлечение одного нового клиента: общие затраты делятся на число привлечённых клиентов.',
      category: 'Инвестиции и рост',
      formula: 'CAC = Затраты на продажи и маркетинг / Новые клиенты',
      body: [
        'Customer Acquisition Cost — это именно то, что звучит: сколько в среднем стоит бизнесу превратить незнакомца в платящего клиента. Считается за период (обычно месяц или квартал): всё потраченное на продажи и маркетинг делится на число новых клиентов за этот период.',
        'Сам по себе CAC не говорит, здоров ли бизнес — он становится осмысленным только рядом с Customer Lifetime Value (LTV). CAC в $500 — катастрофа для продукта, который приносит $100 пожизненной прибыли с клиента, и выгодная сделка для продукта, приносящего $5000. Именно это сравнение измеряет соотношение LTV:CAC.',
        'CAC обычно растёт по мере взросления канала привлечения — самые дешёвые и очевидные клиенты уже захвачены, — поэтому растущий CAC при неизменном рекламном бюджете часто сигнализирует о насыщении канала роста.',
      ],
      relatedTools: [
        { label: 'LTV : CAC Calculator (на английском)', path: '/ltv-cac' },
        { label: 'Калькулятор ROI', path: '/ru/roi-calculator' },
      ],
    },
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
    ru: {
      term: 'LTV (пожизненная ценность клиента)',
      shortDef: 'LTV — это общая валовая прибыль, которую бизнес ожидает получить от клиента за всё время, пока тот остаётся клиентом.',
      category: 'Инвестиции и рост',
      formula: 'LTV = (Выручка с клиента в месяц × Валовая маржа) / Месячный отток (churn)',
      body: [
        'Customer Lifetime Value оценивает общую прибыль — не выручку — которую типичный клиент принесёт за всё время отношений с бизнесом, от первой покупки до ухода. Для подписочных бизнесов обычно считается из месячной выручки с клиента, валовой маржи и месячного оттока (churn rate), поскольку 1 ÷ churn даёт среднюю продолжительность жизни клиента в месяцах.',
        'Частая ошибка — считать LTV из выручки, а не из валовой прибыли, что завышает число, игнорируя стоимость обслуживания клиента — хостинг, поддержку, платёжные комиссии, себестоимость. Корректный LTV — всегда показатель прибыли, потому что сравнивается с CAC, который тоже является затратой.',
        'Поскольку churn стоит в знаменателе, LTV крайне чувствителен к небольшим изменениям в удержании клиентов — сокращение месячного оттока вдвое примерно удваивает LTV, поэтому снижение оттока обычно даёт больше эффекта, чем увеличение расходов на привлечение.',
      ],
      relatedTools: [
        { label: 'LTV : CAC Calculator (на английском)', path: '/ltv-cac' },
        { label: 'Маржа и наценка', path: '/ru/profit-margin' },
      ],
    },
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
    ru: {
      term: 'Соотношение LTV:CAC',
      shortDef: 'Соотношение LTV:CAC сравнивает, сколько стоит клиент (LTV), с тем, сколько стоит его привлечь (CAC); 3:1 — широко принятый ориентир здоровой экономики для SaaS.',
      category: 'Инвестиции и рост',
      body: [
        'Соотношение LTV:CAC — число, чаще всего используемое для оценки устойчивости роста компании. Ниже 1:1 бизнес теряет деньги на каждом привлечённом клиенте, сколько бы выручки ни показывала верхняя строка отчёта. От 1:1 до 3:1 — пограничная зона: юнит-экономика работает, но запаса прочности мало.',
        'От 3:1 до 5:1 обычно считается здоровым диапазоном: клиенты приносят заметно больше ценности, чем стоит их привлечение, при этом бизнес ещё достаточно вкладывается в рост, чтобы продолжать привлекать новых клиентов. Соотношение намного выше 5:1 может быть не только хорошей новостью — часто это значит, что компания слишком осторожничает с расходами на рост.',
        'Это соотношение стоит всегда читать вместе со сроком окупаемости CAC (сколько месяцев нужно, чтобы отбить стоимость привлечения), потому что бизнес может иметь отличную долгосрочную экономику и при этом остаться без денег в ожидании этой окупаемости.',
      ],
      relatedTools: [
        { label: 'LTV : CAC Calculator (на английском)', path: '/ltv-cac' },
        { label: 'Burn Rate & Runway Calculator (на английском)', path: '/burn-rate' },
      ],
    },
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
    ru: {
      term: 'SAFE (конвертируемый заём для стартапов)',
      shortDef: 'SAFE (Simple Agreement for Future Equity) — инструмент привлечения инвестиций для стартапов, где инвестор даёт деньги сейчас в обмен на долю в компании при будущем раунде с оценкой, а не получает акции сразу.',
      category: 'Стартапы и фандрайзинг',
      body: [
        'SAFE, созданный Y Combinator в 2013 году, позволяет стартапам на ранней стадии привлекать деньги, не договариваясь заранее об оценке компании — а это крайне сложно сделать точно до появления выручки. Инвестор передаёт деньги сейчас; взамен он получает право конвертировать эту инвестицию в акции позже, когда компания привлечёт раунд с установленной оценкой.',
        'Большинство SAFE включают cap (потолок оценки, по которой считается цена конвертации инвестора, защищающий ранних инвесторов от размытия при сильно возросшей последующей оценке), discount (скидку от цены, которую платят другие инвесторы в будущем раунде), или оба условия сразу. Инвестор конвертируется по тому условию, которое даёт ему более низкую цену.',
        'С 2018 года стандартный SAFE от Y Combinator — «post-money»: потолок оценки уже учитывает все остальные SAFE и опционный пул, то есть доля владения по каждому SAFE фиксирована и известна в момент подписания. Более ранние «pre-money» SAFE могли размывать друг друга непредсказуемым образом вплоть до самого раунда с оценкой.',
      ],
      relatedTools: [
        { label: 'SAFE Equity Calculator (на английском)', path: '/safe-calculator' },
        { label: 'Burn Rate & Runway Calculator (на английском)', path: '/burn-rate' },
      ],
    },
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
    ru: {
      term: 'Размытие доли (Dilution)',
      shortDef: 'Размытие — это снижение процента владения существующего акционера, которое происходит, когда компания выпускает новые акции для новых инвесторов.',
      category: 'Стартапы и фандрайзинг',
      body: [
        'Каждый раз, когда компания привлекает деньги через выпуск новых акций — будь то SAFE, раунд с оценкой или новый пул опционов для сотрудников — общее число акций увеличивается. Поскольку каждый существующий акционер по-прежнему владеет тем же числом акций, что и раньше, но «пирог» теперь разрезан на больше кусков, его процент владения снижается. Это и есть размытие.',
        'Размытие само по себе не плохо: меньшая доля в гораздо большем пироге — компании, которая теперь стоит намного больше благодаря привлечённому капиталу, — обычно хорошая сделка для фаундеров и ранних инвесторов. Проблема — неконтролируемое или непонятое размытие: стопка SAFE по низким cap, раздутые опционные пулы или down-раунды — которое может оставить фаундерам гораздо меньшую долю, чем они ожидали, к моменту продажи или выхода на биржу.',
        'Фаундеры обычно ведут cap table (таблицу капитализации), которая показывает точный процент владения каждого после каждого раунда, чтобы размытие от нового привлечения можно было смоделировать и обсудить заранее, а не узнать по факту.',
      ],
      relatedTools: [
        { label: 'SAFE Equity Calculator (на английском)', path: '/safe-calculator' },
        { label: 'Burn Rate & Runway Calculator (на английском)', path: '/burn-rate' },
      ],
    },
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
    ru: {
      term: 'НДС / GST (налог на добавленную стоимость)',
      shortDef: 'НДС (или GST) — это налог на потребление, добавляемый на каждом этапе производства и собираемый продавцом, в конечном счёте его платит конечный потребитель.',
      category: 'Налоги и комплаенс',
      body: [
        'НДС (используется в ЕС, Великобритании и большей части мира) и GST (используется, например, в Австралии, Канаде, Индии) — функционально один и тот же налог под разными названиями: процент, добавляемый к цене большинства товаров и услуг, который собирает продающий их бизнес и перечисляет государству. В отличие от американского sales tax, который обычно взимается только на финальной розничной продаже, НДС/GST, как правило, начисляется и возвращается на каждом этапе цепочки поставок, и в итоге его полностью несёт только конечный потребитель.',
        'Для бизнеса практическая сложность обычно в правильном выставлении счетов — отдельное указание налога, применение верной ставки для нужной страны и категории товара — и в зачёте НДС, уплаченного на бизнес-покупки, против НДС, собранного с продаж; разница — это то, что реально перечисляется в налоговую.',
        'Ставки сильно различаются по странам и даже по категориям товаров внутри одной страны (во многих странах действует сниженная ставка на еду, книги или детские товары), поэтому продавцам с международными продажами обычно нужен инструмент, который отслеживает актуальные ставки по юрисдикциям, а не память об одном числе.',
      ],
      relatedTools: [
        { label: 'Калькулятор НДС / GST', path: '/ru/vat-calculator' },
        { label: 'Счёт-фактура онлайн', path: '/ru/invoice-generator' },
      ],
    },
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
    ru: {
      term: 'Self-Employment Tax (налог на самозанятость в США)',
      shortDef: 'Американский self-employment tax — это налог 15,3% на социальное страхование и медицину, который платят фрилансеры и независимые подрядчики вместо налогов, которые обычно делит пополам работодатель.',
      category: 'Налоги и комплаенс',
      formula: 'SE Tax = Чистый доход × 92,35% × 15,3% (12,4% Social Security + 2,9% Medicare)',
      body: [
        'Когда вы работаете по найму (W-2), работодатель платит половину налогов Social Security и Medicare (7,65%) и удерживает вторую половину из зарплаты. Когда вы самозанятый — фрилансите, работаете как подрядчик или ведёте собственный бизнес, — работодателя, который разделит эту стоимость, нет, поэтому вы платите обе половины сами: 15,3% всего, с 92,35% чистого дохода от самозанятости.',
        'Это сверх, а не вместо обычного федерального и штатного подоходного налога — поэтому многих новых фрилансеров застаёт врасплох первый же полный счёт по налогам. Распространённое правило — откладывать 25-30% от чистой прибыли на налоги в течение года, поскольку налоговая система США ожидает от самозанятых квартальных авансовых платежей, а не одной выплаты в апреле.',
        'Половина уплаченного self-employment tax вычитается при расчёте скорректированного валового дохода, что немного смягчает удар, но для людей, переходящих с найма на самозанятость, это всё равно самый большой налоговый сюрприз.',
      ],
      relatedTools: [
        { label: 'Self-Employment Tax Calculator (на английском)', path: '/self-employment-tax' },
        { label: '1099 vs W2 Calculator (на английском)', path: '/1099-vs-w2' },
        { label: 'Ставка фрилансера', path: '/ru/freelance-rate' },
      ],
    },
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
    ru: {
      term: 'FEIE (исключение иностранного трудового дохода)',
      shortDef: 'FEIE позволяет гражданам США, живущим за рубежом и соответствующим требованиям, исключить установленную сумму иностранного дохода из федерального подоходного налога США каждый год.',
      category: 'Налоги и комплаенс',
      body: [
        'США облагают своих граждан налогом на доход по всему миру, независимо от того, где они живут, — почти уникальная практика среди стран. Foreign Earned Income Exclusion, заявляемое через форму IRS 2555, — главный механизм облегчения для американцев, живущих и работающих за границей: он позволяет исключить установленную сумму иностранной зарплаты или дохода от самозанятости из подоходного налога США каждый год.',
        'Чтобы претендовать, нужен налоговый дом в иностранном государстве и прохождение либо Bona Fide Residence Test (установленное проживание за рубежом в течение полного налогового года), либо Physical Presence Test (минимум 330 полных дней вне США за любые 12 месяцев). Если вы соответствуете требованиям лишь часть года, лимит исключения пропорционально уменьшается.',
        'FEIE снижает только подоходный налог — он не уменьшает self-employment tax США, который самозанятые экспаты по-прежнему должны платить полностью, если не действует специальное соглашение о тотализации со страной проживания. Экспатам в странах с высокими налогами иногда выгоднее Foreign Tax Credit вместо FEIE или вместе с ним.',
      ],
      relatedTools: [
        { label: 'Form 2555 — FEIE Calculator (на английском)', path: '/form-2555' },
        { label: 'Self-Employment Tax Calculator (на английском)', path: '/self-employment-tax' },
      ],
    },
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
    ru: {
      term: 'APR (годовая процентная ставка)',
      shortDef: 'APR — это годовая стоимость заимствования денег в процентах, включающая и процентную ставку, и большинство разовых комиссий — правильное число для сравнения кредитов с разной структурой комиссий.',
      category: 'Финансы и кредиты',
      body: [
        'Процентная ставка кредита показывает, сколько процентов начисляется на остаток долга. APR идёт дальше: он добавляет комиссию за выдачу и другие разовые платежи, распределяя их по сроку кредита, чтобы получить единый годовой процент, отражающий реальную стоимость кредита.',
        'Два кредита с одинаковой процентной ставкой могут иметь очень разный APR, если один берёт комиссию за выдачу 3%, а другой — нет: APR делает эту разницу видимой и сравнимой в одном числе, вместо того чтобы считать комиссии вручную для каждого предложения.',
        'Краткосрочные кредиторы иногда указывают «factor rate» вместо процентной ставки (например, верните 1,2 от занятой суммы). Factor rate выглядит обманчиво маленьким, потому что он не годовой — в пересчёте на APR многие кредиты с factor rate оказываются с эффективной годовой ставкой далеко за 40-50%.',
      ],
      relatedTools: [{ label: 'Business Loan & APR Calculator (на английском)', path: '/loan-calculator' }],
    },
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
    ru: {
      term: 'Амортизация кредита',
      shortDef: 'Амортизация — это процесс погашения кредита равными периодическими платежами, где каждый платёж покрывает проценты за период плюс растущую долю основного долга.',
      category: 'Финансы и кредиты',
      body: [
        'Амортизируемый кредит — большинство ипотек, автокредитов и стандартных бизнес-кредитов — устроен так, что каждый платёж одинаков по сумме на весь срок кредита, но его состав меняется со временем. Ранние платежи — в основном проценты, потому что остаток долга ещё велик; поздние платежи — в основном основной долг, потому что остаток уже сократился.',
        'График амортизации — это просто таблица, показывающая платёж за платежом, сколько пошло на проценты, а сколько на основной долг, и какой остаток после этого. Он полезен для понимания общей стоимости процентов по кредиту и для решения, стоит ли делать досрочный платёж в счёт основного долга — почти всегда стоит, особенно в начале кредита, когда доля процентов максимальна.',
        'Сам ежемесячный платёж рассчитывается один раз, заранее, из суммы кредита, ставки и срока — пересчитывать его каждый месяц не нужно, если только ставка не меняется, как в кредите с плавающей ставкой.',
      ],
      relatedTools: [{ label: 'Business Loan & APR Calculator (на английском)', path: '/loan-calculator' }],
    },
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
    ru: {
      term: 'EBITDA',
      shortDef: 'EBITDA (прибыль до вычета процентов, налогов, износа и амортизации) — показатель базовой операционной прибыльности компании, очищенный от финансовых и учётных решений.',
      category: 'Финансы и кредиты',
      body: [
        'EBITDA начинается с чистой прибыли и прибавляет обратно процентные расходы, налоги, износ и амортизацию — четыре статьи, которые никак не связаны с тем, насколько хорошо работает сам бизнес, но напрямую зависят от того, как он финансируется (проценты), где платит налоги и как бухгалтеры амортизируют активы на бумаге. То, что остаётся, — грубый показатель способности основного бизнеса генерировать деньги.',
        'Инвесторы и покупатели компаний любят EBITDA именно потому, что он позволяет сравнивать компании с очень разной структурой капитала или налоговой ситуацией «на равных» — компания, полностью профинансированная за счёт капитала, и компания с большим долгом могут сильно отличаться по чистой прибыли только из-за процентных расходов, даже если их операционная деятельность одинаково эффективна.',
        'EBITDA — не то же самое, что денежный поток, и его критикуют за то, что он делает закредитованные или капиталоёмкие бизнесы внешне более здоровыми, чем они есть, поскольку игнорирует и выплаты по долгу, и капитальные затраты, часто необходимые для поддержания изнашивающегося оборудования. Это полезная метрика для сравнения, а не замена взгляда на реальные деньги в банке.',
      ],
      relatedTools: [
        { label: 'P&L Statement (на английском)', path: '/pl-statement' },
        { label: 'Калькулятор ROI', path: '/ru/roi-calculator' },
      ],
    },
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
    ru: {
      term: 'Оплачиваемые и неоплачиваемые часы',
      shortDef: 'Оплачиваемые часы — это время, за которое клиент платит напрямую; неоплачиваемые часы покрывают всё остальное, что фрилансер или агентство делает, чтобы бизнес работал.',
      category: 'Фриланс',
      body: [
        'Оплачиваемые часы — единственные часы, которые напрямую приносят выручку: написание кода, дизайн макета, проведение консультации, за которую реально платит клиент. Неоплачиваемые часы покрывают всё, что поддерживает эту работу, но само по себе не оплачивается: выставление счетов, поиск новых клиентов, доработка предложений, бухгалтерия, обычная административная работа.',
        'Разрыв между ними — главная причина, почему ставка фрилансера в час должна быть намного выше, чем у сопоставимого сотрудника на зарплате. Фрилансер, который хочет получать $75 000 в год на руки, не может просто разделить эту сумму на 2080 рабочих часов, потому что значительная часть этих часов — часто 20-30% — будет неоплачиваемой. Целевой доход нужно делить только на оплачиваемые часы.',
        'Агентства и консалтинговые компании отслеживают «utilization rate» (оплачиваемые часы ÷ все доступные часы) именно для контроля этого разрыва; utilization rate ниже примерно 65-75% обычно сигнализирует о проблемах с ценообразованием или штатом.',
      ],
      relatedTools: [
        { label: 'Ставка фрилансера', path: '/ru/freelance-rate' },
      ],
    },
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
    ru: {
      term: 'Комиссии платёжных систем',
      shortDef: 'Платёжные системы вроде Stripe и PayPal берут процент плюс небольшую фиксированную комиссию с каждой карточной транзакции, что уменьшает сумму, которую реально получает продавец.',
      category: 'Фриланс',
      formula: 'Комиссия = (Сумма × Процент) + Фиксированная комиссия',
      body: [
        'Каждый раз, когда клиент платит картой онлайн, платёжная система — Stripe, PayPal, Square и подобные — забирает свою долю, прежде чем деньги дойдут до продавца. Стандартная структура — процент от транзакции плюс небольшая фиксированная комиссия за транзакцию (обычно около 2,9% + $0,30 в США для Stripe, чуть больше для чекаута PayPal).',
        'Международные карты, конвертация валют и операции с ручным вводом карты (не онлайн) обычно несут дополнительные проценты сверх стандартной ставки, поэтому у одного и того же продавца эффективная ставка может заметно отличаться месяц от месяца в зависимости от того, откуда платят клиенты.',
        'Продавцам, которые хотят переложить комиссию на клиента, а не брать её на себя, нужно указывать сумму чуть больше, чем они хотят реально получить — простая наценка в размере ставки платёжной системы не совсем точна, потому что сама комиссия считается от более высокой, «накрученной» суммы счёта, а не от исходной желаемой суммы.',
      ],
      relatedTools: [
        { label: 'Stripe & PayPal Fee Calculator (на английском)', path: '/stripe-fee' },
        { label: 'Счёт-фактура онлайн', path: '/ru/invoice-generator' },
        { label: 'Ставка фрилансера', path: '/ru/freelance-rate' },
      ],
    },
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
    ru: {
      term: 'Прогноз денежного потока',
      shortDef: 'Прогноз денежного потока показывает, сколько денег будет у бизнеса в будущие месяцы, исходя из ожидаемой выручки, затрат и стартового остатка на счету.',
      category: 'Финансы и кредиты',
      body: [
        'В отличие от отчёта о прибылях и убытках, который может показывать бизнес прибыльным «на бумаге» даже когда реальных денег не хватает (из-за разницы во времени — неоплаченных счетов или крупных авансовых расходов), прогноз денежного потока отслеживает то, что реально определяет, сможет ли бизнес платить по счетам: настоящий остаток денег в банке, месяц за месяцем.',
        'Базовый прогноз начинается с текущего остатка денег, затем для каждого будущего периода прибавляет ожидаемую выручку и вычитает ожидаемые затраты, перенося текущий остаток вперёд. Более детальные прогнозы закладывают несколько сценариев — что будет с остатком денег, если выручка окажется на 25% ниже плана или выше, — поскольку реальные результаты редко точно совпадают с единственным наиболее вероятным прогнозом.',
        'Для стартапа или любого бизнеса с ограниченным запасом денег скользящий прогноз денежного потока на 12 месяцев — один из важнейших документов, который нужно держать актуальным, потому что именно он превращает «runway» и «burn rate» из абстрактных понятий в конкретный месяц, когда, если ничего не изменится, деньги у бизнеса закончатся.',
      ],
      relatedTools: [
        { label: 'Калькулятор бюджета и кассовых потоков', path: '/ru/budget-calculator' },
        { label: 'Burn Rate & Runway Calculator (на английском)', path: '/burn-rate' },
      ],
    },
  },
];

export function glossaryBySlug(slug: string): GlossaryTerm | undefined {
  return glossary.find((g) => g.slug === slug);
}

export const glossaryCategories = Array.from(new Set(glossary.map((g) => g.category)));
