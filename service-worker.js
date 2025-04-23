// サービスワーカーを登録しないコード
if ('serviceWorker' in navigator) {
  // service-worker.jsは使わない
  console.log('Service Worker is disabled.');
} else {
  console.log('Service Worker is not supported by the browser.');
}
