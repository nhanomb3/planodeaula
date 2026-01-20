// service-worker.js
const CACHE_NAME = 'plano-aula-v1.0';
const urlsToCache = [
  '/planodeaula/',
  '/planodeaula/index.html',
  '/planodeaula/manifest.json',
  '/planodeaula/icon-192x192.png',
  '/planodeaula/icon-512x512.png'
];

// Instalação
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Intercepta requisições
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Atualização
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
