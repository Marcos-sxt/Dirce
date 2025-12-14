# Prompt para Lovable.ai - Frontend Dirce

## 🎯 Contexto do Projeto

Criar um app web mobile-first (PWA) chamado **Dirce** para um hackathon. O app guia pessoas em situação de vulnerabilidade até estações de alimentação usando interface por voz.

**Importante:** É uma DEMONSTRAÇÃO/MVP. Não precisa de funcionalidades reais complexas, apenas simulações e fluxos controlados.

---

## 📱 Especificações Técnicas

### Stack
- **Framework:** Next.js 14+ (App Router)
- **TypeScript:** Sim
- **Styling:** Tailwind CSS
- **PWA:** Configurado para instalação mobile
- **API Backend:** REST API em `http://localhost:3001`

### Design
- **Mobile-first:** Tela vertical (portrait)
- **Simplicidade extrema:** Máximo 2-3 elementos por tela
- **Botões grandes:** Mínimo 48x48px, fácil de tocar
- **Alto contraste:** Cores vibrantes, texto grande (18px+)
- **Paleta:** Verde (primária), Laranja (secundária), Branco (fundo)

---

## 🗺️ Estrutura de Telas

### 1. **Home Page (`/`)**
```
┌─────────────────────────┐
│   [Logo/Avatar Dirce]   │
│                         │
│   👋 Olá! Sou a Dirce   │
│   Como posso ajudar?    │
│                         │
│   [🎤 Botão Falar]      │
│   (Grande, centralizado)│
│                         │
│   [📍 Usar Localização] │
│   (Opcional, menor)     │
└─────────────────────────┘
```

**Funcionalidades:**
- Botão de microfone grande e visível
- Ao clicar, vai para tela de escuta
- Botão opcional para usar geolocalização do navegador
- Design limpo e acessível

### 2. **Listening Page (`/listening`)**
```
┌─────────────────────────┐
│   🎤 Estou ouvindo...   │
│                         │
│   [Animação de ondas]   │
│   (Visual feedback)     │
│                         │
│   "Fale sua localização"│
│                         │
│   [⏹️ Cancelar]         │
└─────────────────────────┘
```

**Funcionalidades:**
- Animação visual de áudio (ondas, círculos pulsantes)
- Após 3-5 segundos, automaticamente vai para confirmação (simulado)
- Botão para cancelar e voltar
- Feedback visual claro

### 3. **Confirmation Page (`/confirm`)**
```
┌─────────────────────────┐
│   ✅ Entendi!           │
│                         │
│   Você está em:         │
│   Rua X, Bairro Y       │
│   (Texto grande)        │
│                         │
│   [✅ Correto] [❌ Errado]│
└─────────────────────────┘
```

**Funcionalidades:**
- Mostra localização "transcrita" (mockada para demo)
- Dois botões grandes: Correto / Errado
- Se correto, vai para lista de estações
- Se errado, volta para escuta

### 4. **Stations List Page (`/stations`)**
```
┌─────────────────────────┐
│   📍 Estações Próximas  │
│                         │
│   🏪 Estação 1          │
│   Restaurante Popular   │
│   500m • 5 min a pé     │
│   [Ver no mapa]         │
│                         │
│   🏪 Estação 2          │
│   Cozinha Comunitária   │
│   800m • 10 min a pé    │
│   [Ver no mapa]         │
│                         │
│   [🎤 Falar novamente]  │
└─────────────────────────┘
```

**Funcionalidades:**
- Lista de estações (dados mockados ou da API)
- Cada estação: nome, endereço, distância, tempo
- Botão "Ver no mapa" para cada estação
- Botão opcional para buscar novamente
- Cards grandes e fáceis de tocar

### 5. **Navigation Page (`/navigation?stationId=xxx`)**
```
┌─────────────────────────┐
│   🗺️ Navegando...       │
│                         │
│   [Google Maps Embed]   │
│   (ou link externo)     │
│                         │
│   Dirce está guiando    │
│   por voz...            │
│                         │
│   [📍 Cheguei]          │
│   [❌ Cancelar]         │
└─────────────────────────┘
```

**Funcionalidades:**
- Google Maps embed ou link externo para abrir no app
- Botão "Cheguei" quando chegar
- Botão cancelar
- Instruções de voz (simuladas ou TTS)

### 6. **Payment Page (`/payment?stationId=xxx`)**
```
┌─────────────────────────┐
│   ✅ Você chegou!        │
│                         │
│   Restaurante Popular   │
│                         │
│   Aproxime seu cartão   │
│   [Simular NFC]         │
│                         │
│   Saldo: 100 REFEICAO   │
│                         │
│   [💳 Pagar 1 REFEICAO] │
└─────────────────────────┘
```

**Funcionalidades:**
- Confirmação de chegada
- Botão para simular NFC (mockado)
- Mostra saldo (mockado ou da API)
- Botão de pagar
- Após pagar, mostra confirmação com hash (mockado)

---

## 🎤 Fluxo de Voz (CONTROLADO/SIMULADO)

### Para Demo:
- **NÃO precisa de STT/TTS real funcionando**
- Pode simular o fluxo:
  1. Usuário clica em "Falar"
  2. Mostra animação de escuta (3-5 segundos)
  3. Automaticamente "transcreve" uma localização mockada
  4. Mostra confirmação
  5. Reproduz "áudio" de resposta (pode ser texto ou áudio mockado)

### Integração Eleven Labs (Opcional):
- Se quiser integrar de verdade:
  - Endpoint: `POST http://localhost:3001/elevenlabs/speech-to-text`
  - Endpoint: `POST http://localhost:3001/elevenlabs/text-to-speech`
- Mas para demo, pode ser tudo simulado

---

## 🔌 Integrações com Backend

### API Endpoints Disponíveis:
```typescript
// Buscar estações próximas
GET /stations/nearby?lat=-25.4284&lng=-49.2733&radius=5000

// Listar todas as estações
GET /stations

// Buscar estação por ID
GET /stations/:id

// Processar pagamento (mockado)
POST /transactions/process
Body: { userWallet: string, stationId: string, amount: number }

// Consultar saldo (mockado)
GET /transactions/balance/:wallet

// STT (opcional)
POST /elevenlabs/speech-to-text

// TTS (opcional)
POST /elevenlabs/text-to-speech
```

### Dados Mockados (se API não estiver rodando):
```typescript
const mockStations = [
  {
    id: "1",
    name: "Restaurante Popular Centro",
    address: "Rua XV de Novembro, 1000 - Centro",
    latitude: -25.4284,
    longitude: -49.2733,
    distance: 500, // metros
    time: 5 // minutos
  },
  // ... mais estações
];
```

---

## 🎨 Componentes Principais

### 1. **VoiceButton**
- Botão grande de microfone
- Animação quando ativo
- Feedback visual claro

### 2. **StationCard**
- Card de estação
- Nome, endereço, distância
- Botão de ação

### 3. **MapView** (ou MapLink)
- Google Maps embed ou link
- Marcador de destino
- Botão para abrir no app Maps

### 4. **LoadingState**
- Spinner/animacao
- Mensagem clara
- Feedback de progresso

### 5. **AudioWave** (opcional)
- Animação de ondas de áudio
- Visual feedback durante escuta

---

## 📦 Estrutura de Pastas Sugerida

```
app/
├── page.tsx              # Home
├── listening/
│   └── page.tsx          # Escuta
├── confirm/
│   └── page.tsx          # Confirmação
├── stations/
│   └── page.tsx          # Lista de estações
├── navigation/
│   └── page.tsx          # Navegação
└── payment/
    └── page.tsx          # Pagamento

components/
├── VoiceButton.tsx
├── StationCard.tsx
├── MapView.tsx
├── LoadingState.tsx
└── AudioWave.tsx

lib/
├── api.ts                # Cliente API
└── mockData.ts           # Dados mockados

hooks/
├── useLocation.ts        # Geolocalização
└── useStations.ts        # Buscar estações
```

---

## ✅ Checklist de Funcionalidades

### Must Have (MVP):
- [ ] Tela home com botão de voz
- [ ] Tela de escuta com animação
- [ ] Tela de confirmação de localização
- [ ] Tela de lista de estações
- [ ] Integração Google Maps (embed ou link)
- [ ] Tela de pagamento mockado
- [ ] Navegação entre telas
- [ ] Design mobile-first
- [ ] Botões grandes e acessíveis

### Nice to Have:
- [ ] Integração real com Eleven Labs (STT/TTS)
- [ ] Geolocalização do navegador
- [ ] PWA configurado
- [ ] Animações suaves
- [ ] Feedback de áudio real

---

## 🎯 Prioridades

1. **Estrutura básica** - Telas e navegação
2. **Design mobile-first** - Responsivo e acessível
3. **Fluxo simulado** - Funciona sem APIs reais
4. **Integração opcional** - APIs podem ser mockadas

---

## 💡 Observações Importantes

- **É uma DEMO:** Não precisa de tudo funcionando de verdade
- **Fluxo controlado:** Pode simular interações de voz
- **Mobile-first:** Priorizar experiência mobile
- **Simplicidade:** Interface extremamente simples
- **Acessibilidade:** Botões grandes, alto contraste, texto legível

---

## 🚀 Instruções para Lovable

Crie um app Next.js mobile-first com as telas acima. Use Tailwind CSS para estilização. Implemente o fluxo básico de navegação. Para a funcionalidade de voz, pode ser simulado (não precisa de STT/TTS real funcionando). Integre com a API backend quando disponível, mas tenha dados mockados como fallback. Foque em simplicidade e acessibilidade.

