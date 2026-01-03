// Gerenciador da tela de carregamento
class LoadingScreen {
    constructor() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.quoteText = document.getElementById('quoteText');
        this.init();
    }

    init() {
        // Mostrar frase motivacional
        const quote = getQuoteOfTheDay();
        if (this.quoteText) {
            this.quoteText.textContent = `"${quote}"`;
        }

        // Aguardar o carregamento completo da página
        window.addEventListener('load', () => {
            // Aguardar um pouco para mostrar a frase
            setTimeout(() => {
                this.hide();
            }, 5000); // Mostra por 2 segundos
        });

        // Fallback: se já estiver carregado
        if (document.readyState === 'complete') {
            setTimeout(() => {
                this.hide();
            }, 2000);
        }
    }

    hide() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('hidden');
            // Remover do DOM após animação
            setTimeout(() => {
                if (this.loadingScreen) {
                    this.loadingScreen.remove();
                }
            }, 500);
        }
    }
}

// Inicializar tela de carregamento
document.addEventListener('DOMContentLoaded', () => {
    new LoadingScreen();
});

