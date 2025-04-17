self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('unity-cache-v1').then(function (cache) {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './TemplateData/style.css',
        './Build/Unity-Dietary-Education-Memory-Game.loader.js',
        './Build/Unity-Dietary-Education-Memory-Game.framework.js',
        './Build/Unity-Dietary-Education-Memory-Game.data',
        './Build/Unity-Dietary-Education-Memory-Game.wasm',
        './image/icon-192x192.png',
        './image/icon-512x512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
