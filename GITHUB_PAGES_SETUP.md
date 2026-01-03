# 🚀 Como Publicar no GitHub Pages

Guia passo a passo para publicar seu PWA no GitHub Pages sem precisar usar terminal.

## 📋 Pré-requisitos

- Conta no GitHub (gratuita)
- Navegador web

## 🔧 Passo a Passo

### 1. Criar Repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique no botão **"+"** no canto superior direito
3. Selecione **"New repository"**
4. Preencha:
   - **Repository name**: `metas-diarias` (ou outro nome de sua escolha)
   - **Description**: "App PWA para gerenciar metas diárias"
   - Marque **Public** (GitHub Pages só funciona com repositórios públicos no plano gratuito)
   - **NÃO** marque "Initialize with README"
5. Clique em **"Create repository"**

### 2. Fazer Upload dos Arquivos

**Opção A: Via Interface Web do GitHub (Mais Fácil)**

1. Na página do repositório recém-criado, clique em **"uploading an existing file"**
2. Arraste TODOS os arquivos da pasta `ModoFac` para a área de upload:
   - `index.html`
   - `checklist.html`
   - `settings.html`
   - `manifest.json`
   - `service-worker.js`
   - Pasta `css/` (com todos os arquivos dentro)
   - Pasta `js/` (com todos os arquivos dentro)
   - Pasta `icons/` (com todos os arquivos dentro)
3. Role para baixo e clique em **"Commit changes"**

**Opção B: Via GitHub Desktop (Recomendado para futuras atualizações)**

1. Baixe e instale [GitHub Desktop](https://desktop.github.com/)
2. Faça login com sua conta GitHub
3. File → Add Local Repository
4. Selecione a pasta `ModoFac`
5. Clique em "Publish repository"
6. Escolha o repositório que você criou

### 3. Ativar GitHub Pages

1. No repositório, clique na aba **"Settings"** (Configurações)
2. Role até a seção **"Pages"** no menu lateral esquerdo
3. Em **"Source"**, selecione:
   - Branch: `main` (ou `master`)
   - Folder: `/ (root)`
4. Clique em **"Save"**
5. Aguarde alguns minutos (pode levar até 10 minutos)

### 4. Acessar seu App

Após alguns minutos, seu app estará disponível em:

```
https://SEU-USUARIO.github.io/metas-diarias/
```

Substitua:
- `SEU-USUARIO` pelo seu nome de usuário do GitHub
- `metas-diarias` pelo nome do seu repositório

### 5. Instalar no iPhone

1. Abra o Safari no iPhone
2. Acesse a URL do seu app (ex: `https://seu-usuario.github.io/metas-diarias/`)
3. Toque no botão **"Compartilhar"** (quadrado com seta)
4. Selecione **"Adicionar à Tela de Início"**
5. Personalize o nome (opcional)
6. Toque em **"Adicionar"**

Pronto! O app estará instalado no seu iPhone! 🎉

## 🔄 Atualizar o App

Quando você fizer mudanças:

**Via GitHub Desktop:**
1. Abra o GitHub Desktop
2. As mudanças aparecerão automaticamente
3. Digite uma mensagem (ex: "Atualização do calendário")
4. Clique em "Commit to main"
5. Clique em "Push origin"

**Via Interface Web:**
1. Vá até o arquivo que quer editar
2. Clique no ícone de lápis (Edit)
3. Faça as alterações
4. Role para baixo e clique em "Commit changes"

O GitHub Pages atualiza automaticamente em alguns minutos!

## ⚠️ Importante

- O app só funciona com **HTTPS** (GitHub Pages fornece isso automaticamente)
- Se você mudar o nome do repositório, a URL muda também
- Mudanças podem levar alguns minutos para aparecer

## 🎯 Dica

Adicione a URL do seu app aos favoritos do Safari para acesso rápido!

