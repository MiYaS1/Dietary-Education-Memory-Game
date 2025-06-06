// キャッシュ名 (更新したい場合はこの名前を変更する)
const CACHE_NAME = 'dietary-education-game-cache-v1';

// キャッシュするファイルのリスト
const urlsToCache = [
  '.',
  'index.html',
  'manifest.json',
  'icon-192x192.png',
  'icon-512x512.png',
  'Build/Unity-Dietary-Education-Memory-Game.data',
  'Build/Unity-Dietary-Education-Memory-Game.framework.js',
  'Build/Unity-Dietary-Education-Memory-Game.loader.js',
  'Build/Unity-Dietary-Education-Memory-Game.wasm',
  // TemplateDataフォルダの中身をすべてここに追加します
  // 例:
  'TemplateData/style.css',
  'TemplateData/favicon.ico',
  'TemplateData/progress-bar-empty-dark.png',
  'TemplateData/progress-bar-full-dark.png',
  'TemplateData/unity-logo-dark.png'
  // 他にもTemplateData内に必要なファイルがあれば追記してください
];

// インストール処理
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// フェッチ（リクエスト）処理
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // キャッシュ内に一致するリクエストがあれば、それを返す
        if (response) {
          return response;
        }
        //なければネットワークからフェッチする
        return fetch(event.request);
      })
  );
});
