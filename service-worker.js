const CACHE_NAME = "memory-game-cache-v1";
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

// インストール
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// リクエスト時
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// 古いキャッシュ削除
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(
          keys.map(key => {
            if (!cacheWhitelist.includes(key)) {
              return caches.delete(key);
            }
          })
        )
      )
  );
});