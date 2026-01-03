// Função para obter o caminho base do app (funciona em qualquer subdiretório)
function getBasePath() {
    // Se já foi calculado, retorna o valor em cache
    if (window.__basePath !== undefined) {
        return window.__basePath;
    }
    
    // Detecta pelo location.pathname
    const pathname = window.location.pathname;
    
    // Se está na raiz
    if (pathname === '/' || pathname === '/index.html') {
        window.__basePath = '';
        return '';
    }
    
    // Remove o nome do arquivo e mantém o caminho do diretório
    const parts = pathname.split('/').filter(p => p && !p.endsWith('.html'));
    
    if (parts.length === 0) {
        window.__basePath = '';
    } else {
        // Constrói o caminho base (ex: /md/)
        window.__basePath = '/' + parts.join('/') + '/';
    }
    
    return window.__basePath;
}

// Função helper para criar URLs relativas
function getRelativePath(path) {
    const base = getBasePath();
    // Remove barra inicial se existir no path
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return base + cleanPath;
}

// Debug (pode remover depois)
console.log('Base path detectado:', getBasePath());
