const cacheName = 'unity-pwa-cache-v1';
const filesToCache = [
  'index.html',
  'Build/Unity-Dietary-Education-Memory-Game.loader.js',
  'Build/Unity-Dietary-Education-Memory-Game.wasm.code.unityweb',
  'Build/Unity-Dietary-Education-Memory-Game.data.unityweb',
  'Build/Unity-Dietary-Education-Memory-Game.framework.js.unityweb',
  'TemplateData/style.css',
  'TemplateData/favicon.ico',
  'manifest.json',
  'image/icon_192x192.png',
  'image/icon_512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log('Caching all: app shell and content');
        return cache.addAll(filesToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== cacheName) {
          console.log('Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});
