# Metas Diárias - PWA

App Progressive Web App (PWA) para gerenciar suas metas diárias com checklist, alarme e acompanhamento de progresso através de um calendário colorido.

## 📱 Funcionalidades

- ✅ **Checklist Customizável**: Adicione e gerencie seus itens diários
- ⏰ **Sistema de Alarme**: Configure a hora do despertador
- 📊 **Sistema de Pontuação**: Receba uma nota baseada no tempo de conclusão
- 📅 **Calendário 2026**: Visualize seu progresso em um calendário completo colorido
- 💾 **Funciona Offline**: Após o primeiro carregamento, funciona sem internet
- 🎨 **Interface Moderna**: Design limpo e responsivo

## 🚀 Como Usar

### Opção 1: Testar Localmente no Windows

1. **Instalar um servidor HTTP local** (escolha uma opção):

   **Python 3:**
   ```bash
   python -m http.server 8000
   ```

   **Node.js (http-server):**
   ```bash
   npx http-server -p 8000
   ```

   **VS Code (Live Server extension):**
   - Instale a extensão "Live Server"
   - Clique com botão direito em `index.html` > "Open with Live Server"

2. **Abrir no navegador:**
   - Acesse `http://localhost:8000`

### Opção 2: Testar no iPhone (Rede Local)

1. **Descobrir o IP do seu PC:**
   ```bash
   ipconfig
   ```
   Procure por "IPv4 Address" (ex: 192.168.1.100)

2. **Iniciar servidor HTTP** (como na Opção 1)

3. **No iPhone (mesma rede WiFi):**
   - Abra o Safari
   - Acesse `http://SEU_IP:8000` (ex: `http://192.168.1.100:8000`)

### Opção 3: Hospedar Online (Recomendado para iPhone)

#### GitHub Pages (Gratuito)

1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. Vá em Settings > Pages
4. Selecione a branch main
5. Acesse `https://SEU_USUARIO.github.io/SEU_REPOSITORIO`

#### Netlify (Gratuito)

1. Acesse [netlify.com](https://netlify.com)
2. Arraste a pasta do projeto
3. Pronto! Você terá uma URL pública

#### Vercel (Gratuito)

1. Instale o Vercel CLI: `npm i -g vercel`
2. Execute: `vercel`
3. Siga as instruções

## 📲 Instalar no iPhone

1. Abra o app no Safari do iPhone
2. Toque no botão "Compartilhar" (quadrado com seta para cima)
3. Role para baixo e selecione **"Adicionar à Tela de Início"**
4. Personalize o nome (opcional)
5. Toque em **"Adicionar"**
6. O app aparecerá na sua tela inicial como um app nativo!

## 🎯 Como Usar o App

### Configurar Alarme

1. Toque no ícone ⚙️ (Configurações)
2. Configure a hora do despertador
3. Ative o alarme
4. Salve

### Usar o Checklist

1. Toque no ícone ✓ ou no botão "Abrir Checklist"
2. Marque os itens conforme completa
3. O timer conta automaticamente
4. Quando terminar todos, você verá sua nota
5. Toque em "Finalizar" para salvar

### Visualizar Progresso

1. Na tela principal, veja o calendário de 2026
2. Dias com checklist completado aparecem coloridos:
   - 🟢 Verde: Excelente (nota ≥ 80)
   - 🟢 Verde claro: Bom (nota 60-79)
   - 🟡 Amarelo: Regular (nota 40-59)
   - 🟠 Laranja: Ruim (nota 20-39)
   - 🔴 Vermelho: Muito ruim (nota < 20)
3. Toque em um dia colorido para ver detalhes

### Personalizar Itens do Checklist

1. Vá em Configurações (⚙️)
2. Na seção "Itens do Checklist"
3. Adicione ou remova itens
4. Os itens padrão são: "Tomar água" e "Preparar comida"

## 📊 Sistema de Pontuação

- **Tempo ideal**: 30 minutos (nota 100)
- **Penalidade**: -2 pontos por minuto acima de 30
- **Nota mínima**: 0

**Exemplo:**
- 30 minutos = 100 pontos
- 35 minutos = 90 pontos
- 40 minutos = 80 pontos
- 50 minutos = 60 pontos

## 🛠️ Estrutura do Projeto

```
ModoFac/
├── index.html              # Tela principal com calendário
├── checklist.html          # Tela de checklist
├── settings.html           # Configurações
├── manifest.json           # Manifest do PWA
├── service-worker.js       # Service Worker para offline
├── css/
│   ├── styles.css          # Estilos principais
│   └── calendar.css        # Estilos do calendário
├── js/
│   ├── app.js              # Lógica principal
│   ├── calendar.js         # Lógica do calendário
│   ├── checklist.js        # Lógica do checklist
│   ├── notifications.js    # Sistema de notificações
│   └── storage.js          # Persistência de dados
└── icons/                  # Ícones do app (precisa criar)
    ├── icon-192.png
    ├── icon-512.png
    └── apple-touch-icon.png
```

## 🎨 Criar Ícones

O app precisa de ícones para funcionar como PWA. Você pode:

1. **Usar um gerador online:**
   - [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)
   - [RealFaviconGenerator](https://realfavicongenerator.net/)

2. **Criar manualmente:**
   - `icon-192.png`: 192x192 pixels
   - `icon-512.png`: 512x512 pixels
   - `apple-touch-icon.png`: 180x180 pixels

Coloque os arquivos na pasta `icons/`

## ⚠️ Limitações no iOS

- **Notificações**: No iOS, notificações de PWAs só funcionam quando o app está aberto. O app mostra um banner visual quando você abre no horário configurado.

## 🔧 Solução de Problemas

### Service Worker não funciona
- Certifique-se de estar usando um servidor HTTP (não `file://`)
- Verifique o console do navegador para erros

### App não instala no iPhone
- Certifique-se de estar usando HTTPS ou localhost
- Verifique se o `manifest.json` está correto
- Tente limpar o cache do Safari

### Dados não persistem
- Verifique se o navegador permite localStorage
- Não use modo anônimo/privado

## 📝 Licença

Este projeto é de uso pessoal.

## 🤝 Contribuindo

Sinta-se à vontade para fazer melhorias e personalizações!

---

**Desenvolvido para funcionar 100% no Windows e ser instalado no iPhone como PWA!** 🎉

