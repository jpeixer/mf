class ThemeManager {
    static STORAGE_KEY = 'memento_mori_theme';
    
    static init() {
        // Carregar tema salvo ou usar dark como padrão
        const savedTheme = localStorage.getItem(this.STORAGE_KEY) || 'dark';
        this.setTheme(savedTheme);
    }
    
    static getTheme() {
        return localStorage.getItem(this.STORAGE_KEY) || 'dark';
    }
    
    static setTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem(this.STORAGE_KEY, theme);
    }
    
    static toggleTheme() {
        const current = this.getTheme();
        const newTheme = current === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        return newTheme;
    }
}

// Inicializar tema quando o script carregar
ThemeManager.init();

