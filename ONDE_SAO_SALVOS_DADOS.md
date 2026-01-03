# 📦 Onde são Salvos os Dados do App

## Localização dos Dados

Todos os dados do app são salvos no **localStorage do navegador** do seu iPhone/iPad.

### O que é localStorage?

- É um armazenamento local do navegador Safari
- Os dados ficam **apenas no seu dispositivo**
- Não são enviados para servidores externos
- Persistem mesmo após fechar o app
- São específicos para o domínio do app (jpeixer.github.io/mf)

## O que é Salvo?

### 1. **Configurações** (`metas_diarias_settings`)
- Hora do alarme
- Status do alarme (ativado/desativado)
- Tema escolhido (dark/light)

### 2. **Itens do Checklist** (`metas_diarias_checklist_items`)
- Lista de itens personalizados
- Exemplo: "Tomar água", "Preparar comida", etc.

### 3. **Registros Diários** (`metas_diarias_daily_records`)
- Nota de cada dia
- Itens completados
- Data do registro
- **Este é o mais importante!** Contém todo seu histórico

### 4. **Checklist em Andamento** (`metas_diarias_current_checklist`)
- Estado temporário do checklist atual
- É limpo quando você finaliza

### 5. **Dados do Dia Selecionado** (`currentDayData`)
- Número do dia (001-365)
- Data selecionada
- Usado para passar informações entre telas

## Como Acessar os Dados (Desenvolvedor)

### No iPhone/iPad:

1. Conecte o iPhone ao Mac
2. Abra o Safari no Mac
3. Desenvolvedor > [Seu iPhone] > [URL do app]
4. Console > Application > Local Storage
5. Você verá todos os dados salvos

### No Computador (para teste):

1. Abra o app no navegador
2. Pressione F12 (ou clique com botão direito > Inspecionar)
3. Vá em "Application" (Chrome) ou "Armazenamento" (Firefox)
4. Local Storage > jpeixer.github.io/mf
5. Você verá todas as chaves e valores

## Limitações do localStorage

- **Tamanho máximo**: ~5-10 MB (mais que suficiente para este app)
- **Escopo**: Apenas no mesmo domínio
- **Privacidade**: Dados ficam apenas no seu dispositivo
- **Backup**: Não é incluído no backup do iCloud automaticamente

## Como Fazer Backup

### Opção 1: Exportar Manualmente (Futuro)
Podemos adicionar uma função de exportar/importar dados em JSON.

### Opção 2: Backup do Safari
Os dados do localStorage podem ser incluídos no backup do Safari se você:
- Fazer backup do iPhone no iCloud ou iTunes
- Os dados do Safari são incluídos

### Opção 3: Exportar via Console (Avançado)
1. Abra o console do navegador
2. Digite: `JSON.stringify(localStorage)`
3. Copie o resultado
4. Salve em um arquivo de texto

## Limpar Dados

### Pelo App:
- Vá em Configurações (⚙️)
- Seção "📊 Dados"
- Clique em "Limpar Todos os Dados"

### Pelo Navegador:
1. Configurações do Safari
2. Avançado > Dados do Site
3. Encontre "jpeixer.github.io"
4. Remova os dados

## Importante

⚠️ **Os dados são salvos apenas no seu dispositivo!**

- Se você limpar os dados do Safari, perderá tudo
- Se desinstalar o app, os dados podem ser perdidos
- Se trocar de iPhone, os dados não são transferidos automaticamente

💡 **Recomendação**: Use a função "Limpar Dados" no app apenas se realmente quiser apagar tudo.

## Estrutura dos Dados

### Exemplo de Registro Diário:
```json
{
  "id": "2026-01-03",
  "date": "2026-01-03T00:00:00.000Z",
  "score": 85,
  "completedItems": 4,
  "totalItems": 5
}
```

### Exemplo de Configurações:
```json
{
  "alarmTime": "07:00",
  "alarmEnabled": true
}
```

### Exemplo de Itens do Checklist:
```json
[
  {
    "id": "1",
    "title": "Tomar água",
    "isCompleted": false
  },
  {
    "id": "2",
    "title": "Preparar comida",
    "isCompleted": false
  }
]
```

## Segurança

✅ **Seus dados são privados:**
- Ficam apenas no seu dispositivo
- Não são enviados para servidores
- Não são compartilhados com terceiros
- Apenas você tem acesso

