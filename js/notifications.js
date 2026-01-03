class NotificationManager {
    static async requestPermission() {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            return permission === 'granted';
        }
        return false;
    }

    static async showNotification(title, options = {}) {
        if (!('Notification' in window)) {
            return false;
        }

        const permission = await this.requestPermission();
        if (!permission) {
            return false;
        }

        const notification = new Notification(title, {
            body: options.body || '',
            icon: options.icon || 'icons/icon-192.png',
            badge: 'icons/icon-192.png',
            tag: options.tag || 'metas-diarias',
            requireInteraction: options.requireInteraction || false
        });

        notification.onclick = () => {
            window.focus();
            if (options.onClick) {
                options.onClick();
            }
            notification.close();
        };

        return true;
    }

    static checkAlarmTime() {
        const settings = StorageManager.getSettings();
        
        if (!settings.alarmEnabled || !settings.alarmTime) {
            return;
        }

        const now = new Date();
        const [hours, minutes] = settings.alarmTime.split(':').map(Number);
        const alarmTime = new Date();
        alarmTime.setHours(hours, minutes, 0, 0);

        // Se já passou a hora hoje, agendar para amanhã
        if (now > alarmTime) {
            alarmTime.setDate(alarmTime.getDate() + 1);
        }

        const timeUntilAlarm = alarmTime.getTime() - now.getTime();
        
        // Verificar se estamos dentro de 1 minuto do alarme
        if (timeUntilAlarm > 0 && timeUntilAlarm <= 60000) {
            this.triggerAlarm();
        }
    }

    static triggerAlarm() {
        // Mostrar notificação
        this.showNotification('⏰ Hora do seu checklist!', {
            body: 'É hora de começar suas metas diárias',
            requireInteraction: true,
            onClick: () => {
                window.location.href = getRelativePath('checklist.html');
            }
        });

        // Mostrar banner na página principal
        const banner = document.getElementById('alarmBanner');
        if (banner) {
            banner.classList.remove('hidden');
        }
    }

    static startAlarmChecker() {
        // Verificar a cada minuto
        setInterval(() => {
            this.checkAlarmTime();
        }, 60000);

        // Verificar imediatamente
        this.checkAlarmTime();
    }
}

