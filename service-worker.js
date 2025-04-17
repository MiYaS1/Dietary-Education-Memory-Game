const CACHE_NAME = "dietary-education-memory-game-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./Build/Dietary-Education-Memory-Game.loader.js",
  "./Build/Dietary-Education-Memory-Game.framework.js",
  "./Build/Dietary-Education-Memory-Game.data",
  "./Build/Dietary-Education-Memory-Game.wasm",
  "./TemplateData/style.css",
  "./image/icon-192x192.png",
  "./image/icon-512x512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
