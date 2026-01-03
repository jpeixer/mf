const CACHE_NAME = 'metas-diarias-v2';

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
    base + 'css/days-view.css',
    base + 'js/app.js',
    base + 'js/days-view.js',
    base + 'js/checklist.js',
    base + 'js/notifications.js',
    base + 'js/storage.js',
    base + 'js/base-path.js',
    base + 'js/theme.js',
    base + 'js/loading-screen.js',
    base + 'js/motivational-quotes.js',
    base + 'manifest.json',
    base + 'icons/icon-192.png',
    base + 'icons/icon-512.png'
];

// Armazenar timers de notificações agendadas
const scheduledNotifications = new Map();

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
    self.skipWaiting();
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
    return self.clients.claim();
});

// Mensagem do cliente para agendar notificações
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SCHEDULE_NOTIFICATION') {
        const { time, delay, title, body, tag } = event.data;
        
        // Limpar notificação anterior para este horário se existir
        if (scheduledNotifications.has(tag)) {
            clearTimeout(scheduledNotifications.get(tag));
        }
        
        // Agendar nova notificação
        const timeoutId = setTimeout(() => {
            self.registration.showNotification(title, {
                body: body,
                icon: base + 'icons/icon-192.png',
                badge: base + 'icons/icon-192.png',
                tag: tag,
                requireInteraction: true,
                data: {
                    url: base + 'checklist.html'
                }
            });
            
            // Remover do mapa após disparar
            scheduledNotifications.delete(tag);
            
            // Reagendar para o próximo dia
            const nextDay = new Date();
            nextDay.setDate(nextDay.getDate() + 1);
            const [hours, minutes] = time.split(':').map(Number);
            nextDay.setHours(hours, minutes, 0, 0);
            const nextDelay = nextDay.getTime() - Date.now();
            
            if (nextDelay > 0) {
                const nextTimeoutId = setTimeout(() => {
                    self.registration.showNotification(title, {
                        body: body,
                        icon: base + 'icons/icon-192.png',
                        badge: base + 'icons/icon-192.png',
                        tag: tag,
                        requireInteraction: true,
                        data: {
                            url: base + 'checklist.html'
                        }
                    });
                }, nextDelay);
                scheduledNotifications.set(tag, nextTimeoutId);
            }
        }, delay);
        
        scheduledNotifications.set(tag, timeoutId);
    }
});

// Clique na notificação
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    const urlToOpen = event.notification.data?.url || base + 'checklist.html';
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                // Se já existe uma janela aberta, focar nela
                for (let i = 0; i < clientList.length; i++) {
                    const client = clientList[i];
                    if (client.url.includes(urlToOpen) && 'focus' in client) {
                        return client.focus();
                    }
                }
                // Se não, abrir nova janela
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});
