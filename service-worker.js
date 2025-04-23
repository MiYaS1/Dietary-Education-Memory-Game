const CACHE_NAME = 'unity-pwa-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './Build/Unity-Dietary-Education-Memory-Game.loader.js',
    './Build/Unity-Dietary-Education-Memory-Game.wasm',
    './Build/Unity-Dietary-Education-Memory-Game.data',
    './Build/Unity-Dietary-Education-Memory-Game.framework.js',
    './TemplateData/style.css',
    './TemplateData/favicon.ico',
];

self.addEventListener('install', event => {
    console.log('Service Worker: Install event triggered');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Opened cache:', CACHE_NAME);
            return Promise.all(
                urlsToCache.map(url => {
                    console.log('Fetching and caching:', url);
                    return fetch(url).then(response => {
                        if (!response.ok) {
                            console.error(`Failed to fetch ${url}`);
                            throw new Error(`Failed to fetch ${url}`);
                        }
                        return cache.put(url, response);
                    }).catch(err => {
                        console.error(`Error caching ${url}:`, err);
                    });
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    console.log('Service Worker: Fetch event triggered for', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    console.log('Returning cached response:', event.request.url);
                    return response;
                }
                console.log('Fetching from network:', event.request.url);
                return fetch(event.request).catch(err => {
                    console.error('Fetch error:', err);
                    throw err;
                });
            })
    );
});

self.addEventListener('activate', event => {
    console.log('Service Worker: Activate event triggered');
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
