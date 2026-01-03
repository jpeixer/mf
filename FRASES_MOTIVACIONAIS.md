# 📝 Como Adicionar Frases Motivacionais

## Localização do Arquivo

As frases estão no arquivo: `js/motivational-quotes.js`

## Como Adicionar Novas Frases

1. Abra o arquivo `js/motivational-quotes.js`
2. Encontre o array `MOTIVATIONAL_QUOTES`
3. Adicione suas frases dentro do array, entre aspas:

```javascript
const MOTIVATIONAL_QUOTES = [
    "Sua frase aqui",
    "Outra frase aqui",
    // Adicione quantas quiser!
];
```

## Como Funciona

- **Uma frase diferente por dia**: O app usa o dia do ano (1-365) para escolher qual frase mostrar
- **Rotação automática**: Se você tiver menos de 365 frases, elas serão repetidas ao longo do ano
- **Efeito fade in/fade out**: Cada frase aparece com animação suave

## Exemplo

```javascript
const MOTIVATIONAL_QUOTES = [
    "Cada dia é uma nova oportunidade de ser melhor.",
    "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
    "Sua nova frase motivacional aqui!",
    // Continue adicionando...
];
```

## Dicas

- Mantenha as frases curtas (idealmente até 100 caracteres)
- Use frases positivas e motivacionais
- Você pode adicionar quantas frases quiser
- As frases aparecem na tela de carregamento do app

## Personalização

Se quiser mudar o tempo de exibição da frase, edite o arquivo `js/loading-screen.js` e altere o valor em `setTimeout` (atualmente 2000ms = 2 segundos).

