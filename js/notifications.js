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

    // Agendar notificações para os horários fixos
    static async scheduleNotifications() {
        const settings = StorageManager.getSettings();
        
        if (!settings.notificationsEnabled) {
            return;
        }

        // Solicitar permissão
        const hasPermission = await this.requestPermission();
        if (!hasPermission) {
            console.log('Permissão de notificação negada');
            return;
        }

        // Obter horários fixos
        const times = StorageManager.getNotificationTimes();
        const now = new Date();
        
        // Registrar Service Worker para notificações agendadas
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.ready;
                
                // Agendar notificações para cada horário
                for (const time of times) {
                    const [hours, minutes] = time.split(':').map(Number);
                    const notificationTime = new Date();
                    notificationTime.setHours(hours, minutes, 0, 0);
                    
                    // Se já passou hoje, agendar para amanhã
                    if (now > notificationTime) {
                        notificationTime.setDate(notificationTime.getDate() + 1);
                    }
                    
                    const delay = notificationTime.getTime() - now.getTime();
                    
                    // Enviar mensagem para o Service Worker agendar
                    registration.active.postMessage({
                        type: 'SCHEDULE_NOTIFICATION',
                        time: time,
                        delay: delay,
                        title: '⏰ Hora de revisar seu checklist',
                        body: 'É hora de revisar suas metas diárias',
                        tag: `checklist-${time.replace(':', '')}`
                    });
                }
            } catch (error) {
                console.error('Erro ao agendar notificações:', error);
            }
        }
    }

    // Verificar horários e disparar notificações (fallback)
    static checkAlarmTimes() {
        const settings = StorageManager.getSettings();
        
        if (!settings.notificationsEnabled) {
            return;
        }

        const times = StorageManager.getNotificationTimes();
        const now = new Date();
        
        for (const time of times) {
            const [hours, minutes] = time.split(':').map(Number);
            const alarmTime = new Date();
            alarmTime.setHours(hours, minutes, 0, 0);

            // Se já passou hoje, verificar amanhã
            if (now > alarmTime) {
                alarmTime.setDate(alarmTime.getDate() + 1);
            }

            const timeUntilAlarm = alarmTime.getTime() - now.getTime();
            
            // Verificar se estamos dentro de 1 minuto do alarme
            if (timeUntilAlarm > 0 && timeUntilAlarm <= 60000) {
                this.triggerNotification(time);
            }
        }
    }

    static triggerNotification(time) {
        // Mostrar notificação
        this.showNotification('⏰ Hora de revisar seu checklist', {
            body: 'É hora de revisar suas metas diárias',
            requireInteraction: true,
            tag: `checklist-${time.replace(':', '')}`,
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
        // Agendar notificações quando o app carregar
        this.scheduleNotifications();
        
        // Verificar a cada minuto (fallback)
        setInterval(() => {
            this.checkAlarmTimes();
        }, 60000);

        // Verificar imediatamente
        this.checkAlarmTimes();
    }
}

