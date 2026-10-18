import re
import io
import os
import html

TOOLS_EN = ['freelance-rate', 'salary-hourly', '1099-vs-w2', 'stripe-fee', 'vat-calculator',
            'invoice-generator', 'self-employment-tax', 'form-2555', 'deal-coach', 'roi-calculator',
            'profit-margin', 'break-even', 'loan-calculator', 'pl-statement', 'budget-calculator',
            'safe-calculator', 'burn-rate', 'ltv-cac', 'math-quiz']


def extract_faq(path):
    src = io.open(path, encoding='utf-8').read()
    m = re.search(r'const faq = \[(.*?)\n\];', src, re.S)
    if not m:
        return []
    block = m.group(1)
    pairs = re.findall(r"\{\s*q:\s*'(.+?)',\s*\n?\s*a:\s*'(.+?)'\s*\}", block, re.S)
    out = []
    for q, a in pairs:
        q = html.unescape(q.replace("\\'", "'").replace('\n', ' ').strip())
        a = html.unescape(a.replace("\\'", "'").replace('\n', ' ').strip())
        out.append((q, a))
    return out


def extract_title_desc_path(path):
    src = io.open(path, encoding='utf-8').read()
    t = re.search(r'title="([^"]+)"', src)
    d = re.search(r'description="([^"]+)"', src)
    h1 = re.search(r'h1="([^"]+)"', src)
    return (
        html.unescape(t.group(1)) if t else '',
        html.unescape(d.group(1)) if d else '',
        html.unescape(h1.group(1)) if h1 else '',
    )


def extract_formula(path):
    src = io.open(path, encoding='utf-8').read()
    m = re.search(r'<pre>(.*?)</pre>', src, re.S)
    if not m:
        return ''
    txt = re.sub(r'<[^>]+>', '', m.group(1)).strip()
    return html.unescape(txt)


def qstr(field, text):
    m = re.search(r"\n    " + field + r": '(.+?)',\n", text, re.S)
    if m:
        return m.group(1)
    m = re.search(r'\n    ' + field + r': "(.+?)",\n', text, re.S)
    if m:
        return m.group(1)
    return None


out = io.open('llms_full_tmp.txt', 'w', encoding='utf-8', newline='\n')
out.write('# RateKit \u2014 Full Reference (llms-full.txt)\n\n')
out.write('> Complete formulas, worked examples and FAQ text for every RateKit calculator, '
          'in one file, for AI agents and language models that want full context without '
          'crawling 18 separate pages. Short directory: llms.txt. Machine-readable API spec: openapi.json.\n\n')

for slug in TOOLS_EN:
    p = 'src/pages/%s.astro' % slug
    if not os.path.exists(p):
        continue
    title, desc, h1 = extract_title_desc_path(p)
    faq = extract_faq(p)
    formula = extract_formula(p)
    url = 'https://ratekit.org/%s' % slug
    out.write('## %s\n' % (h1 or title))
    out.write('URL: %s\n' % url)
    out.write('%s\n\n' % desc)
    if formula:
        out.write('Formula:\n')
        out.write(formula + '\n\n')
    if faq:
        out.write('FAQ:\n')
        for q, a in faq:
            out.write('Q: %s\nA: %s\n' % (q, a))
        out.write('\n')
    out.write('---\n\n')

# --- Glossary ---
src = io.open('src/data/glossary.ts', encoding='utf-8').read()
entries = re.split(r"\n  \{\n    slug: '", src)[1:]

out.write('# Glossary (full text)\n\n')
out.write('> Plain-English definitions for business/finance terms used across RateKit. Short directory: /glossary.\n\n')

count = 0
missed = []
for e in entries:
    slug_m = re.match(r"([a-z0-9-]+)'", e)
    slug = slug_m.group(1)
    term_m = re.search(r"\n    term: '([^']+)',", e)
    shortdef_raw = qstr('shortDef', e)
    formula_raw = qstr('formula', e)
    body_m = re.search(r"\n    body: \[(.*?)\n    \],\n    relatedTools:", e, re.S)
    if not (term_m and shortdef_raw and body_m):
        missed.append(slug)
        continue
    term = html.unescape(term_m.group(1))
    shortdef = html.unescape(shortdef_raw.replace("\\'", "'"))
    formula = html.unescape(formula_raw.replace("\\'", "'")) if formula_raw else ''
    body_block = body_m.group(1)
    paras = re.findall(r"'((?:[^'\\]|\\.)*)',?\n", body_block + '\n')
    if not paras:
        paras = re.findall(r'"((?:[^"\\]|\\.)*)",?\n', body_block + '\n')
    paras = [html.unescape(p.replace("\\'", "'").replace('\\"', '"')) for p in paras]

    out.write('## %s\n' % term)
    out.write('URL: https://ratekit.org/glossary/%s\n' % slug)
    out.write('%s\n\n' % shortdef)
    if formula:
        out.write('Formula: %s\n\n' % formula)
    for p in paras:
        out.write(p + '\n\n')
    out.write('---\n\n')
    count += 1

out.close()
print('tools: %d, glossary entries: %d, missed: %s' % (len(TOOLS_EN), count, missed))
