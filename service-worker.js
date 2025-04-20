const CACHE_NAME = 'unity-pwa-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './Build/UnityLoader.js',
    './Build/Unity-Dietary-Education-Memory-Game.wasm.code.unityweb',
    './Build/Unity-Dietary-Education-Memory-Game.wasm.data.unityweb',
    './Build/Unity-Dietary-Education-Memory-Game.wasm.framework.unityweb',
    './TemplateData/style.css',
    './TemplateData/UnityProgress.js',
    './TemplateData/favicon.ico',
    './TemplateData/webgl-logo.jpg',
    // 他のアセットもここに追加 (画像、音声など)
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // キャッシュにデータがあればそれを返す
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});