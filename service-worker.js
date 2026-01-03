const CACHE_NAME = 'metas-diarias-v1';

// Função para obter caminho base
function getBasePath() {
    const path = self.location.pathname;
    // Se estiver na raiz, retorna '/', senão retorna o caminho do diretório
    if (path === '/' || path === '/index.html') {
        return '/';
    }
    // Remove o nome do arquivo e mantém o diretório
    return path.substring(0, path.lastIndexOf('/') + 1);
}

const base = getBasePath();

const urlsToCache = [
    base + 'index.html',
    base + 'checklist.html',
    base + 'settings.html',
    base + 'css/styles.css',
    base + 'css/calendar.css',
    base + 'js/app.js',
    base + 'js/calendar.js',
    base + 'js/checklist.js',
    base + 'js/notifications.js',
    base + 'js/storage.js',
    base + 'manifest.json',
    base + 'icons/icon-192.png',
    base + 'icons/icon-512.png'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache.map(url => new URL(url, self.location.origin).href));
            })
            .catch((err) => {
                console.log('Erro ao fazer cache:', err);
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version or fetch from network
                return response || fetch(event.request).catch(() => {
                    // If network fails and no cache, return offline page
                    if (event.request.destination === 'document') {
                        return caches.match(new URL(base + 'index.html', self.location.origin).href);
                    }
                });
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
