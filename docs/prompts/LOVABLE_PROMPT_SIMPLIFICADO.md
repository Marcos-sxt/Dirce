# Prompt Simplificado para Lovable.ai - Dirce App

## 🎯 Objetivo

Criar um app web mobile-first (PWA) chamado **Dirce** que guia pessoas até estações de alimentação usando interface por voz. **É uma DEMONSTRAÇÃO - não precisa de funcionalidades reais complexas.**

---

## 📱 Stack

- Next.js 14+ (App Router, TypeScript)
- Tailwind CSS
- Mobile-first, PWA
- API Backend: `http://localhost:3001` (pode mockar se não estiver rodando)

---

## 🗺️ Telas (6 telas)

### 1. Home (`/`)
- Logo/Avatar "Dirce"
- Texto: "Olá! Sou a Dirce. Como posso ajudar?"
- **Botão grande de microfone** (centralizado, 48px+)
- Botão opcional: "Usar Localização"

### 2. Listening (`/listening`)
- Título: "Estou ouvindo..."
- **Animação de ondas de áudio** (visual feedback)
- Texto: "Fale sua localização"
- Botão: "Cancelar"
- **Após 3-5 segundos, automaticamente vai para confirmação** (simulado)

### 3. Confirm (`/confirm`)
- Título: "Entendi!"
- Mostra localização mockada: "Rua X, Bairro Y" (texto grande)
- **Dois botões grandes:** "✅ Correto" | "❌ Errado"
- Se correto → vai para `/stations`
- Se errado → volta para `/listening`

### 4. Stations (`/stations`)
- Título: "Estações Próximas"
- **Lista de cards de estações:**
  - 🏪 Nome da estação
  - Endereço
  - Distância (ex: "500m • 5 min a pé")
  - Botão: "Ver no mapa"
- Botão opcional: "🎤 Falar novamente"

**Dados mockados (se API não estiver rodando):**
```typescript
const stations = [
  {
    id: "1",
    name: "Restaurante Popular Centro",
    address: "Rua XV de Novembro, 1000",
    distance: 500,
    time: 5
  },
  {
    id: "2", 
    name: "Cozinha Comunitária Vila Torres",
    address: "Rua da Cidadania Vila Torres",
    distance: 800,
    time: 10
  }
];
```

### 5. Navigation (`/navigation?stationId=xxx`)
- Título: "Navegando..."
- **Google Maps embed** (ou link para abrir no app Maps)
- Texto: "Dirce está guiando por voz..."
- Botão: "📍 Cheguei"
- Botão: "❌ Cancelar"

### 6. Payment (`/payment?stationId=xxx`)
- Título: "Você chegou!"
- Nome da estação
- Texto: "Aproxime seu cartão"
- **Botão: "Simular NFC"** (mockado)
- Mostra: "Saldo: 100 REFEICAO" (mockado)
- **Botão: "💳 Pagar 1 REFEICAO"**
- Após pagar, mostra confirmação com hash mockado

---

## 🎤 Voz (SIMULADO para demo)

**NÃO precisa de STT/TTS real funcionando!**

Fluxo simulado:
1. Usuário clica "Falar"
2. Mostra animação (3-5 segundos)
3. Automaticamente "transcreve" localização mockada
4. Mostra confirmação
5. Reproduz resposta (pode ser texto ou áudio mockado)

**Se quiser integrar Eleven Labs (opcional):**
- `POST /elevenlabs/speech-to-text` (STT)
- `POST /elevenlabs/text-to-speech` (TTS)

Mas para demo, pode ser tudo simulado.

---

## 🎨 Design

- **Mobile-first:** Tela vertical
- **Simplicidade:** Máximo 2-3 elementos por tela
- **Botões grandes:** 48px+ mínimo, fácil de tocar
- **Alto contraste:** Cores vibrantes
- **Texto grande:** 18px+ para legibilidade
- **Paleta:** Verde (primária), Laranja (secundária), Branco (fundo)

---

## 🔌 API (Opcional - pode mockar)

```typescript
// Se API estiver rodando:
GET /stations/nearby?lat=-25.4284&lng=-49.2733
GET /stations
POST /transactions/process

// Se não estiver, usar dados mockados
```

---

## ✅ Checklist

- [ ] 6 telas com navegação
- [ ] Design mobile-first
- [ ] Botões grandes e acessíveis
- [ ] Animação de áudio na tela de escuta
- [ ] Lista de estações (mockada ou da API)
- [ ] Google Maps (embed ou link)
- [ ] Fluxo de pagamento mockado
- [ ] Dados mockados como fallback

---

## 💡 Instruções para Lovable

Crie um app Next.js mobile-first com as 6 telas acima. Use Tailwind CSS. Implemente navegação entre telas. Para voz, simule o fluxo (não precisa de STT/TTS real). Use dados mockados se a API não estiver disponível. Foque em simplicidade e acessibilidade. Botões grandes, texto legível, alto contraste.

