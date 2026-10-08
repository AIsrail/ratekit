# ResumeLink SEO Fixes

## 🔴 Critical Issues Found

### 1. **202 `/roles/<name>` pages not indexed** ⚠️
- Each file in `_roles/` generates a page at `/roles/<slug>/`
- Layout: `_layouts/role.html` 
- **Problem:** No `<meta name="description">` tags on role pages!
- **Solution:** Add dynamic meta descriptions to `role.html` layout

**Fix:** Add to `_layouts/role.html` (in `<head>`):
```html
<meta name="description" content="{{ page.summary_hack | strip_html | truncatewords: 25 }} Get ATS-optimized resume tips for {{ page.title }}.">
```

### 2. **Need unique content markers for Google**
Each role page has:
- ✅ H1 (`page.h1`)
- ✅ Summary (`page.summary_hack`)  
- ✅ Skills, Tools, Resume bullets, ATS keywords
- ❌ No opening paragraph explaining role

**Add:** Short opening paragraph to layout that expands on `summary_hack`

### 3. **Check for thin/duplicate content**
Run: Count unique words per role, identify if some have <200 words

### 4. **Improve FAQ schema**
- Template includes `FAQPage` schema ✅
- But need at least 3 Q&A pairs per role to make schema useful

---

## 📋 Action Items (Priority Order)

### Immediate (1-2 hours)
- [ ] **Add meta descriptions to role layout**
  - File: `_layouts/role.html`
  - Add dynamic meta description using `page.summary_hack` (first 160 chars)
  
- [ ] **Add og:description for social sharing**
  - Helps Google understand page purpose
  
- [ ] **Check GitHub deployment**
  - Deploy to Cloudflare Pages after changes
  - Trigger GSC re-crawl

### Week 1
- [ ] Check `/vs/` comparison pages for canonical issues
- [ ] Find & fix 12 returning 404 (check broken links from external sites)
- [ ] Audit 3-5 role pages manually:
  - View in browser
  - Check Google Search Console for crawl errors
  - Verify no rendering issues

### Week 2
- [ ] Add structured `<script type="application/ld+json">` for `JobPosting` schema (not just FAQPage)
- [ ] Verify all roles have 4+ resume bullet examples
- [ ] Add internal linking between related roles

---

## 📊 Current State
- **Indexed:** 62 pages
- **Scanned, not indexed:** 67-74 pages (mostly `/roles/`)
- **404 errors:** 12 pages
- **Duplicates:** 5 pages

## 🎯 Expected Outcome
After meta descriptions fix:
- Should see crawl improvement within 1-2 weeks
- Indexation should jump to 150+ pages within 4 weeks

---

## Notes for Cloudflare Integration
If using Cloudflare Pages + Workers:
- No caching issues expected (meta tags are dynamic from Jekyll)
- Ensure `wrangler.toml` doesn't strip HTML headers
- Check Cloudflare Analytics for crawl success rate
