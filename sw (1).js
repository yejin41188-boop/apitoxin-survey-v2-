const CACHE_NAME = 'apitoxin-v2-intro';
const ASSETS = [
  '/apitoxin-survey-v2-/',
  '/apitoxin-survey-v2-/index.html',
  '/apitoxin-survey-v2-/manifest.json',
  '/apitoxin-survey-v2-/icon-192.png',
  '/apitoxin-survey-v2-/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
