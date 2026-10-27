// RateKit service worker: keeps the Pebble Calculator pages and their files so it opens offline.
// It only touches calculator pages, hashed build assets, icons and Google Fonts; everything
// else (analytics, ads, other tools' data) goes straight to the network.
const CACHE = 'rk-calc-v2';
const PAGE = /^\/(ru\/)?calculator\/?$/;

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith('rk-calc-') && k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

// The page sends the list of files it uses; keep them for offline use.
self.addEventListener('message', (event) => {
  if (!event.data || event.data.type !== 'cache-urls') return;
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.allSettled(event.data.urls.map(async (u) => {
      const url = new URL(u, self.location.origin);
      const sameOrigin = url.origin === self.location.origin;
      if (!sameOrigin && url.hostname !== 'fonts.googleapis.com' && url.hostname !== 'fonts.gstatic.com') return;
      const req = sameOrigin ? new Request(url) : new Request(url, { mode: 'no-cors' });
      const res = await fetch(req);
      if (res.ok || res.type === 'opaque') await cache.put(req, res);
    }));
    const clients = await self.clients.matchAll();
    clients.forEach((c) => c.postMessage({ type: 'cached' }));
  })());
});

function cacheable(url) {
  if (url.origin === self.location.origin) {
    return url.pathname.startsWith('/_astro/') || /\.(png|ico|svg|webmanifest|woff2?)$/.test(url.pathname);
  }
  return url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const res = await fetch(req);
        if (res.ok && url.origin === self.location.origin && PAGE.test(url.pathname)) {
          const cache = await caches.open(CACHE);
          cache.put(req, res.clone());
        }
        return res;
      } catch (err) {
        const cache = await caches.open(CACHE);
        const hit = (await cache.match(req)) || (await cache.match(req, { ignoreSearch: true }));
        if (hit) return hit;
        if (PAGE.test(url.pathname)) return (await cache.match(url.pathname.startsWith('/ru') ? '/ru/calculator' : '/calculator')) || Response.error();
        return Response.error();
      }
    })());
    return;
  }

  if (cacheable(url)) {
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
