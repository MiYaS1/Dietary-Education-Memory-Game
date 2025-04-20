const CACHE_NAME = 'unity-pwa-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './Build/Unity-Dietary-Education-Memory-Game.loader.js',
    './Build/Unity-Dietary-Education-Memory-Game.wasm',
    './Build/Unity-Dietary-Education-Memory-Game.data',
    './Build/Unity-Dietary-Education-Memory-Game.framework.js',
    './TemplateData/style.css',
    './TemplateData/UnityProgress.js',
    './TemplateData/favicon.ico',
    './TemplateData/webgl-logo.jpg',
    // 他のアセットもここに追加 (画像、音声など)
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Opened cache');
            return Promise.all(
                urlsToCache.map(url => {
                    return fetch(url).then(response => {
                        if (!response.ok) {
                            console.error(`Failed to fetch ${url}`);
                            throw new Error(`Failed to fetch ${url}`);
                        }
                        return cache.put(url, response);
                    }).catch(err => {
                        console.error(`Error caching ${url}: `, err);
                    });
                })
            );
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
                // キャッシュに無い場合はネットワークからリソースを取得
                return fetch(event.request).catch(err => {
                    console.error('Fetch error: ', err);
                    throw err;  // 必要に応じてエラーハンドリングを追加
                });
            })
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
