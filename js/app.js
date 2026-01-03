// Registrar Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Detectar o caminho base automaticamente (funciona no GitHub Pages)
        const currentScript = document.currentScript || document.querySelector('script[src*="app.js"]');
        const scriptSrc = currentScript?.src || '';
        const basePath = scriptSrc.substring(0, scriptSrc.lastIndexOf('/js/') + 1) || './';
        const swPath = basePath + 'service-worker.js';
        
        navigator.serviceWorker.register(swPath)
            .then((registration) => {
                console.log('Service Worker registrado com sucesso:', registration.scope);
            })
            .catch((error) => {
                console.log('Falha ao registrar Service Worker:', error);
            });
    });
}

// Lógica principal da aplicação
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar calendário
    const calendar = new CalendarManager();
    calendar.render();

    // Fechar detalhes do dia
    const closeDetailsBtn = document.getElementById('closeDetailsBtn');
    if (closeDetailsBtn) {
        closeDetailsBtn.addEventListener('click', () => {
            document.getElementById('dayDetails').classList.add('hidden');
        });
    }

    // Navegação
    const settingsBtn = document.getElementById('settingsBtn');
    const checklistBtn = document.getElementById('checklistBtn');
    const openChecklistBtn = document.getElementById('openChecklistBtn');
    const alarmBanner = document.getElementById('alarmBanner');

    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            window.location.href = getRelativePath('settings.html');
        });
    }

    if (checklistBtn) {
        checklistBtn.addEventListener('click', () => {
            window.location.href = getRelativePath('checklist.html');
        });
    }

    if (openChecklistBtn) {
        openChecklistBtn.addEventListener('click', () => {
            if (alarmBanner) {
                alarmBanner.classList.add('hidden');
            }
            window.location.href = getRelativePath('checklist.html');
        });
    }

    // Verificar alarme
    NotificationManager.startAlarmChecker();

    // Verificar se deve mostrar banner de alarme
    const settings = StorageManager.getSettings();
    if (settings.alarmEnabled && settings.alarmTime) {
        const now = new Date();
        const [hours, minutes] = settings.alarmTime.split(':').map(Number);
        const alarmTime = new Date();
        alarmTime.setHours(hours, minutes, 0, 0);

        // Se estamos dentro de 5 minutos do alarme, mostrar banner
        const timeDiff = Math.abs(now - alarmTime);
        if (timeDiff <= 5 * 60 * 1000) {
            if (alarmBanner) {
                alarmBanner.classList.remove('hidden');
            }
        }
    }

    // Atualizar calendário quando voltar de outras páginas
    window.addEventListener('focus', () => {
        calendar.refresh();
    });
});

