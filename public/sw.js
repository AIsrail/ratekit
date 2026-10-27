// RateKit service worker: makes the site installable and lets visited pages open offline.
// Pages are fetched network-first (so updates always arrive) and fall back to the cache;
// build assets, icons and Google Fonts are served cache-first. Everything else (live rates,
// analytics, ads, API calls) goes straight to the network and is never cached.
const CACHE = 'rk-site-v1';
const PRECACHE = [
  '/', '/ru', '/offline', '/ru/offline', '/app', '/ru/app',
  '/calculator', '/ru/calculator', '/happiness-calculator', '/ru/happiness-calculator',
];
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.allSettled(PRECACHE.map((p) => precache(cache, p)));
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => (k.startsWith('rk-site-') || k.startsWith('rk-calc-')) && k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

// A cached page must not be a "redirected" response, or the browser refuses to show it.
async function clean(res) {
  if (!res.redirected) return res;
  return new Response(await res.blob(), { status: 200, statusText: 'OK', headers: res.headers });
}

const pageKey = (url) => new Request(url.origin + (url.pathname.length > 1 ? url.pathname.replace(/\/$/, '') : '/'));

// Fetch a page and the build assets it uses, so it works offline even before it is visited.
async function precache(cache, path) {
  const url = new URL(path, self.location.origin);
  const res = await fetch(url.href, { cache: 'reload' });
  if (!res.ok) return;
  const html = await res.clone().text();
  await cache.put(pageKey(url), await clean(res));
  const assets = new Set(html.match(/\/_astro\/[A-Za-z0-9._\-]+/g) || []);
  await Promise.allSettled([...assets].map(async (a) => {
    const r = await fetch(a);
    if (r.ok) await cache.put(new Request(new URL(a, self.location.origin).href), r);
  }));
}

// A page can also tell us which of its files to keep (fonts, icons).
self.addEventListener('message', (event) => {
  if (!event.data || event.data.type !== 'cache-urls') return;
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.allSettled(event.data.urls.map(async (u) => {
      const url = new URL(u, self.location.origin);
      const sameOrigin = url.origin === self.location.origin;
      if (!sameOrigin && !FONT_HOSTS.includes(url.hostname)) return;
      const req = sameOrigin ? new Request(url) : new Request(url, { mode: 'no-cors' });
      const res = await fetch(req);
      if (res.ok || res.type === 'opaque') await cache.put(req, res);
    }));
    const clients = await self.clients.matchAll();
    clients.forEach((c) => c.postMessage({ type: 'cached' }));
  })());
});

function isStatic(url) {
  if (url.origin === self.location.origin) {
    if (url.pathname === '/sw.js') return false;
    return url.pathname.startsWith('/_astro/') || /\.(png|jpe?g|svg|ico|webp|woff2?|webmanifest)$/.test(url.pathname);
  }
  return FONT_HOSTS.includes(url.hostname);
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (req.mode === 'navigate') {
    if (url.origin !== self.location.origin) return;
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const res = await fetch(req);
        if (res.ok && (res.headers.get('content-type') || '').includes('text/html')) {
          cache.put(pageKey(url), (await clean(res.clone())));
        }
        return res;
      } catch (err) {
        const hit = await cache.match(pageKey(url));
        if (hit) return hit;
        const offline = await cache.match(url.pathname.startsWith('/ru') ? '/ru/offline' : '/offline');
        return offline || Response.error();
      }
    })());
    return;
  }

  if (isStatic(url)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const hit = await cache.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      if (res.ok || res.type === 'opaque') cache.put(req, res.clone());
      return res;
    })());
  }
});
