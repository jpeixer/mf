# 📱 Guia: Abrir App Automaticamente com Shortcuts do iOS

Este guia mostra como configurar o app **Memento Mori** para abrir automaticamente nos horários 5:30, 12:30 e 18:30 usando o app **Shortcuts** do iOS.

## 📋 Pré-requisitos

- iPhone com iOS 13 ou superior
- App **Shortcuts** instalado (vem pré-instalado no iOS 13+)
- App **Memento Mori** instalado como PWA na tela inicial

## 🎯 Passo a Passo

### 1. Instalar o App como PWA

1. Abra o Safari no iPhone
2. Acesse: `https://jpeixer.github.io/mf/`
3. Toque no botão **Compartilhar** (quadrado com seta)
4. Role para baixo e toque em **Adicionar à Tela Inicial**
5. Confirme o nome e toque em **Adicionar**

### 2. Criar o Primeiro Atalho (5:30)

1. Abra o app **Shortcuts**
2. Toque na aba **Automação** (parte inferior)
3. Toque em **Criar Automação** (canto superior direito)
4. Toque em **Hora do Dia**
5. Configure:
   - **Hora**: `5:30`
   - **Repetir**: `Diariamente`
   - Toque em **Próximo**
6. Toque em **Adicionar Ação**
7. Procure por **Abrir App**
8. Selecione **Abrir App**
9. Toque em **Escolher** e selecione **Memento Mori** (ou o nome que você deu)
10. Toque em **Próximo**
11. **Desative** "Perguntar antes de executar" (importante!)
12. Toque em **Concluir**

### 3. Criar o Segundo Atalho (12:30)

1. Na aba **Automação**, toque em **Criar Automação** novamente
2. Toque em **Hora do Dia**
3. Configure:
   - **Hora**: `12:30`
   - **Repetir**: `Diariamente`
   - Toque em **Próximo**
4. Toque em **Adicionar Ação**
5. Procure por **Abrir App**
6. Selecione **Abrir App**
7. Selecione **Memento Mori**
8. Toque em **Próximo**
9. **Desative** "Perguntar antes de executar"
10. Toque em **Concluir**

### 4. Criar o Terceiro Atalho (18:30)

1. Na aba **Automação**, toque em **Criar Automação** novamente
2. Toque em **Hora do Dia**
3. Configure:
   - **Hora**: `18:30`
   - **Repetir**: `Diariamente`
   - Toque em **Próximo**
4. Toque em **Adicionar Ação**
5. Procure por **Abrir App**
6. Selecione **Abrir App**
7. Selecione **Memento Mori**
8. Toque em **Próximo**
9. **Desative** "Perguntar antes de executar"
10. Toque em **Concluir**

## ✅ Verificação

Após criar as três automações, você verá:

- **5:30 - Abrir App** (diariamente)
- **12:30 - Abrir App** (diariamente)
- **18:30 - Abrir App** (diariamente)

## 🔔 Notificações

As automações do Shortcuts podem mostrar uma notificação quando executam. Para desativar:

1. Abra **Configurações** no iPhone
2. Vá em **Shortcuts**
3. Desative **Permitir Notificações de Execução** (opcional)

## ⚙️ Personalização Avançada

### Adicionar Mais Ações

Você pode adicionar ações extras antes de abrir o app:

1. Edite a automação
2. Toque em **Adicionar Ação** antes de "Abrir App"
3. Adicione ações como:
   - **Reproduzir Som** (para um alarme)
   - **Vibrar** (para feedback tátil)
   - **Mostrar Notificação** (com mensagem personalizada)

### Exemplo: Automação com Som

```
1. Hora do Dia: 5:30
2. Reproduzir Som: [Escolha um som]
3. Abrir App: Memento Mori
```

## 🐛 Solução de Problemas

### O app não abre automaticamente

1. Verifique se o app está instalado na tela inicial
2. Certifique-se de que "Perguntar antes de executar" está **desativado**
3. Verifique se a automação está **ativada** (interruptor verde)
4. Reinicie o iPhone

### A automação não funciona

1. Abra **Configurações** > **Shortcuts**
2. Verifique se **Permitir Automações** está ativado
3. Certifique-se de que o iPhone não está em **Modo Avião**
4. Verifique se o **Foco** não está bloqueando automações

### Não encontro o app na lista

1. Certifique-se de que o app está instalado como PWA
2. Tente abrir o app manualmente uma vez
3. Reinicie o app Shortcuts
4. Se ainda não aparecer, use a opção **URL** e cole: `https://jpeixer.github.io/mf/`

## 📝 Notas Importantes

- ⚠️ **Bateria**: Automações podem consumir bateria, mas o impacto é mínimo
- ⚠️ **Bloqueio**: O iPhone precisa estar desbloqueado para abrir o app automaticamente
- ⚠️ **Foco**: Alguns modos de Foco podem bloquear automações
- ✅ **Funciona em Background**: As automações funcionam mesmo com o iPhone bloqueado (mas o app só abre se desbloqueado)

## 🎉 Pronto!

Agora seu app **Memento Mori** abrirá automaticamente nos horários:
- 🌅 **5:30** - Manhã
- ☀️ **12:30** - Meio-dia
- 🌆 **18:30** - Tarde

Combine isso com as **notificações agendadas** do app para ter o melhor de ambos os mundos!

---

**Dica**: Você pode criar mais automações para outros horários se desejar!

