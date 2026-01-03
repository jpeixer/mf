class StorageManager {
    static STORAGE_KEYS = {
        SETTINGS: 'metas_diarias_settings',
        CHECKLIST_ITEMS: 'metas_diarias_checklist_items',
        DAILY_RECORDS: 'metas_diarias_daily_records',
        CURRENT_CHECKLIST: 'metas_diarias_current_checklist'
    };

    // Settings
    static getSettings() {
        const defaultSettings = {
            alarmTime: '07:00',
            alarmEnabled: true
        };
        const stored = localStorage.getItem(this.STORAGE_KEYS.SETTINGS);
        return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    }

    static saveSettings(settings) {
        localStorage.setItem(this.STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    }

    // Checklist Items
    static getChecklistItems() {
        const defaultItems = [
            { id: '1', title: 'Tomar água', isCompleted: false },
            { id: '2', title: 'Preparar comida', isCompleted: false }
        ];
        const stored = localStorage.getItem(this.STORAGE_KEYS.CHECKLIST_ITEMS);
        return stored ? JSON.parse(stored) : defaultItems;
    }

    static saveChecklistItems(items) {
        localStorage.setItem(this.STORAGE_KEYS.CHECKLIST_ITEMS, JSON.stringify(items));
    }

    // Daily Records
    static getDailyRecords() {
        const stored = localStorage.getItem(this.STORAGE_KEYS.DAILY_RECORDS);
        return stored ? JSON.parse(stored) : [];
    }

    static saveDailyRecord(record) {
        const records = this.getDailyRecords();
        const dateKey = this.getDateKey(record.date);
        
        // Remove existing record for this date if any
        const filtered = records.filter(r => this.getDateKey(r.date) !== dateKey);
        filtered.push(record);
        
        localStorage.setItem(this.STORAGE_KEYS.DAILY_RECORDS, JSON.stringify(filtered));
    }

    static getDailyRecord(date) {
        const records = this.getDailyRecords();
        const dateKey = this.getDateKey(date);
        return records.find(r => this.getDateKey(r.date) === dateKey) || null;
    }

    static getDateKey(date) {
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }

    // Current Checklist State
    static getCurrentChecklist() {
        const stored = localStorage.getItem(this.STORAGE_KEYS.CURRENT_CHECKLIST);
        return stored ? JSON.parse(stored) : null;
    }

    static saveCurrentChecklist(checklist) {
        localStorage.setItem(this.STORAGE_KEYS.CURRENT_CHECKLIST, JSON.stringify(checklist));
    }

    static clearCurrentChecklist() {
        localStorage.removeItem(this.STORAGE_KEYS.CURRENT_CHECKLIST);
    }
}

