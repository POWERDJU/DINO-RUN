const CACHE_NAME = 'dino-game-v1';
const urlsToCache = [
    'dino_run.html',
    'manifest.json',
    'tyrano.PNG',
    'trikeratops.PNG',
    'bg.png',
    'tyrano_success.jpg',
    'tyrano_failure.jpg',
    'trikera_success.PNG',
    'trikera_failure.PNG'
];

// 설치 시 캐시에 파일 저장
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('캐시 열림');
                return cache.addAll(urlsToCache);
            })
            .catch(err => {
                console.log('캐시 저장 실패 (일부 파일 누락 가능):', err);
            })
    );
});

// 캐시에서 파일 제공
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // 캐시에 있으면 캐시에서, 없으면 네트워크에서
                return response || fetch(event.request);
            })
    );
});

// 구버전 캐시 삭제
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
