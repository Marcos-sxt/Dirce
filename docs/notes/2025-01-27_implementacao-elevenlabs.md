# Implementação: Eleven Labs - Solução Híbrida

**Data:** 27/01/2025  
**Status:** ✅ Implementado

---

## 🎯 Decisão: Solução Híbrida

### STT (Speech-to-Text): Web Speech API
- ✅ **Client-side** (gratuito, nativo do navegador)
- ✅ Sem API key necessária
- ✅ Baixa latência
- ✅ Funciona offline

### TTS (Text-to-Speech): Backend API
- ✅ **Via backend** (API key segura)
- ✅ Qualidade alta (Eleven Labs)
- ✅ Já implementado no backend

---

## 📁 Arquivos Criados

### 1. **`src/hooks/useSpeechRecognition.ts`**
Hook React para Web Speech API:
- Detecta suporte do navegador
- Gerencia ciclo de vida do reconhecimento
- Tratamento de erros
- Callbacks para resultados

**Uso:**
```typescript
const { isListening, transcript, error, start, stop } = useSpeechRecognition({
  lang: 'pt-BR',
  onResult: (text) => console.log(text),
});
```

### 2. **`src/hooks/useTextToSpeech.ts`**
Hook React para TTS via backend:
- Chama endpoint `/elevenlabs/text-to-speech`
- Gerencia reprodução de áudio
- Estados de loading/playing/error

**Uso:**
```typescript
const { speak, isPlaying, isLoading } = useTextToSpeech({
  onComplete: () => console.log('Áudio terminou'),
});
await speak('Olá, sou a Dirce');
```

### 3. **`src/lib/api.ts`**
Cliente API para comunicação com backend:
- `getNearbyStations()` - Buscar estações próximas
- `getAllStations()` - Listar todas
- `getStationById()` - Buscar por ID
- `textToSpeech()` - TTS via backend
- `speechToText()` - STT via backend (fallback)

### 4. **`src/pages/Listening.tsx`** (Atualizado)
- Usa `useSpeechRecognition` para reconhecimento real
- Mostra transcript em tempo real
- Fallback para modo simulado se não suportado
- Passa transcript para página de confirmação

### 5. **`src/pages/Confirm.tsx`** (Atualizado)
- Recebe transcript do estado de navegação
- Mostra localização reconhecida

---

## 🔧 Configuração

### Variável de Ambiente (Opcional)

Criar `.env` no frontend:
```env
VITE_API_URL=http://localhost:3001
```

Se não configurado, usa `http://localhost:3001` por padrão.

---

## ✅ Funcionalidades

### STT (Web Speech API)
- ✅ Reconhecimento em tempo real
- ✅ Suporte pt-BR
- ✅ Mostra transcript enquanto fala
- ✅ Fallback automático se não suportado
- ✅ Tratamento de erros (permissões, etc)

### TTS (Backend API)
- ✅ Geração de áudio via Eleven Labs
- ✅ Suporte a modelo Flash (baixa latência)
- ✅ Reprodução automática
- ✅ Gerenciamento de estados

---

## 🧪 Como Testar

### 1. **STT (Reconhecimento de Voz)**
1. Acesse: `http://localhost:8080`
2. Clique no microfone
3. Fale sua localização (ex: "Praça Tiradentes, 100")
4. Veja o transcript aparecer em tempo real
5. Após parar de falar, vai para confirmação

**Requisitos:**
- Navegador moderno (Chrome, Edge, Safari)
- HTTPS ou localhost
- Permissão de microfone

### 2. **TTS (Síntese de Voz)**
```typescript
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

const { speak } = useTextToSpeech();
await speak('Olá, sou a Dirce');
```

---

## ⚠️ Limitações

### Web Speech API:
- ❌ Não funciona em Firefox (ainda)
- ⚠️ Requer HTTPS (exceto localhost)
- ⚠️ Qualidade pode variar por navegador
- ⚠️ Depende de conexão (primeira vez)

### Backend TTS:
- ⚠️ Requer backend rodando
- ⚠️ Latência adicional (rede)
- ⚠️ Consome créditos Eleven Labs

---

## 🚀 Próximos Passos (Opcional)

1. **Cache de áudios TTS** (evitar regenerar)
2. **Melhorar tratamento de erros** (mensagens mais amigáveis)
3. **Adicionar feedback visual** durante TTS
4. **Otimizar Web Speech API** (ajustar parâmetros)
5. **Adicionar fallback STT** (usar backend se Web Speech falhar)

---

## 📊 Comparação Final

| Aspecto | STT (Web Speech) | TTS (Backend) |
|---------|------------------|---------------|
| Localização | Client-side | Backend |
| Custo | Gratuito | Pago (Eleven Labs) |
| Latência | Baixa | Média |
| Qualidade | Boa | Excelente |
| Segurança | ✅ OK | ✅ OK (key no backend) |
| Offline | ✅ Sim | ❌ Não |

---

## ✅ Status

- [x] Hook `useSpeechRecognition` criado
- [x] Hook `useTextToSpeech` criado
- [x] Cliente API criado
- [x] Página Listening atualizada
- [x] Página Confirm atualizada
- [x] Build funcionando
- [x] Documentação criada

**Tudo pronto para testar!** 🎤

