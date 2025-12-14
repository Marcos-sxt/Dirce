# Análise: Frontend Dirce

**Data:** 27/01/2025  
**Objetivo:** Definir arquitetura e interface do frontend

---

## 🎯 Contexto do Projeto

### Público-Alvo
- **Pessoas em situação de insegurança alimentar**
- **Baixa ou nenhuma alfabetização**
- **Acesso limitado a tecnologia**
- **Precisam de ajuda para encontrar comida**

### Características Importantes
- ✅ **Sem login** - Acesso público
- ✅ **Interface por voz** - Acessibilidade total
- ✅ **Mobile-first** - PWA para instalar no celular
- ✅ **Simples e direto** - Zero complexidade

---

## 🗺️ Jornada do Usuário

### 1. Abertura do App
- Tela inicial com Dirce (assistente de voz)
- Botão grande "Falar com Dirce" ou ativação automática
- Instrução clara: "Fale sua localização"

### 2. Fala Localização
- Usuário fala onde está (ex: "Estou na Rua X")
- App usa STT (Speech-to-Text) para capturar
- Confirmação por voz: "Entendi, você está em..."

### 3. Recebe Estações Próximas
- Dirce lista estações por voz (TTS)
- "Encontrei 3 estações próximas. Estação 1: Restaurante Popular, 500 metros..."
- Mostra lista visual também (para quem consegue ler)

### 4. Escolhe Estação
- Usuário fala qual estação quer (ex: "Quero a estação 1")
- Ou toca na estação na tela

### 5. Navegação
- Abre Google Maps com destino marcado
- Dirce guia por voz durante o caminho
- "Vire à direita em 100 metros..."

### 6. Chegada na Estação
- Tela de confirmação de chegada
- Instrução para usar cartão NFC
- Simulação de pagamento (mockado para MVP)

---

## 📱 Estrutura do Frontend

### Tecnologias Confirmadas
- **Next.js** (App Router, TypeScript)
- **Tailwind CSS** (estilização)
- **PWA** (Progressive Web App)
- **Google Maps API** (navegação)
- **Eleven Labs** (STT + TTS)

### Arquitetura de Telas

#### 1. **Tela Principal (Home)**
```
┌─────────────────────────┐
│   [Logo Dirce]          │
│                         │
│   👋 Olá! Sou a Dirce   │
│   Como posso ajudar?    │
│                         │
│   [🎤 Botão Falar]      │
│   (ou ativação auto)    │
│                         │
│   [📍 Usar Localização] │
└─────────────────────────┘
```

**Funcionalidades:**
- Botão de microfone grande e visível
- Ativação automática de voz (opcional)
- Botão para usar geolocalização do navegador
- Indicador visual quando está ouvindo

#### 2. **Tela de Escuta (Listening)**
```
┌─────────────────────────┐
│   🎤 Estou ouvindo...   │
│                         │
│   [Animação de ondas]   │
│                         │
│   "Fale sua localização"│
│                         │
│   [⏹️ Cancelar]         │
└─────────────────────────┘
```

**Funcionalidades:**
- Animação visual de áudio
- Feedback visual claro
- Botão para cancelar

#### 3. **Tela de Confirmação (Confirmation)**
```
┌─────────────────────────┐
│   ✅ Entendi!           │
│                         │
│   Você está em:         │
│   Rua X, Bairro Y       │
│                         │
│   [Correto] [Errado]    │
└─────────────────────────┘
```

**Funcionalidades:**
- Reproduz áudio de confirmação (TTS)
- Mostra texto transcrito
- Opção de corrigir

#### 4. **Tela de Estações (Stations List)**
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
- Lista visual das estações
- Distância e tempo estimado
- Botão para cada estação
- Reproduz lista por voz (TTS)
- Opção de falar novamente

#### 5. **Tela de Navegação (Navigation)**
```
┌─────────────────────────┐
│   🗺️ Navegando...       │
│                         │
│   [Google Maps Embed]   │
│                         │
│   Dirce está guiando    │
│   por voz...            │
│                         │
│   [📍 Cheguei]          │
└─────────────────────────┘
```

**Funcionalidades:**
- Google Maps integrado
- Instruções por voz (TTS)
- Botão "Cheguei" quando chegar
- Opção de cancelar navegação

#### 6. **Tela de Pagamento (Payment)**
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
- Simulação de NFC (mockado)
- Mostra saldo onchain
- Processa pagamento
- Mostra confirmação com hash da transação

---

## 🎨 Design e UX

### Princípios de Design

1. **Simplicidade Extrema**
   - Máximo 2-3 elementos por tela
   - Botões grandes (mínimo 48x48px)
   - Texto grande e legível
   - Alto contraste

2. **Acessibilidade**
   - Suporte a leitores de tela
   - Navegação por voz
   - Feedback visual e auditivo
   - Cores contrastantes

3. **Mobile-First**
   - Tela vertical (portrait)
   - Botões na parte inferior (fácil de alcançar)
   - Gestos simples (toque, swipe)
   - Funciona offline (PWA)

4. **Feedback Constante**
   - Indicadores visuais claros
   - Áudio de confirmação
   - Animações suaves
   - Mensagens de erro claras

### Paleta de Cores (Sugestão)

- **Primária:** Verde (esperança, comida)
- **Secundária:** Laranja (energia, ação)
- **Fundo:** Branco/Cinza claro
- **Texto:** Preto/Cinza escuro
- **Destaque:** Amarelo (atenção, botões)

### Tipografia

- **Títulos:** Sans-serif grande (24px+)
- **Corpo:** Sans-serif legível (18px+)
- **Botões:** Bold, grande (20px+)

---

## 🔧 Componentes Principais

### 1. **VoiceButton**
- Botão grande de microfone
- Animação quando está ouvindo
- Feedback visual claro

### 2. **StationCard**
- Card de estação
- Nome, endereço, distância
- Botão de ação

### 3. **MapView**
- Integração Google Maps
- Marcadores de estações
- Rota traçada

### 4. **AudioPlayer**
- Reproduz áudio TTS
- Controles básicos
- Indicador de progresso

### 5. **LoadingState**
- Spinner/animacao
- Mensagem clara
- Feedback de progresso

### 6. **ErrorState**
- Mensagem de erro clara
- Botão de tentar novamente
- Instruções de ajuda

---

## 🔌 Integrações

### Backend API
- `GET /stations/nearby` - Buscar estações
- `POST /elevenlabs/speech-to-text` - STT
- `POST /elevenlabs/text-to-speech` - TTS
- `POST /transactions/process` - Pagamento
- `GET /transactions/balance/:wallet` - Saldo

### Google Maps
- Embed de mapa
- Direções
- Geolocalização

### Eleven Labs
- STT (captura de voz)
- TTS (reprodução de voz)

### Stellar (Opcional no Frontend)
- Mostrar saldo
- Mostrar hash de transação
- Link para explorer

---

## 📦 Estrutura de Pastas

```
frontend/
├── app/
│   ├── page.tsx              # Home
│   ├── listening/
│   │   └── page.tsx          # Tela de escuta
│   ├── stations/
│   │   └── page.tsx          # Lista de estações
│   ├── navigation/
│   │   └── page.tsx          # Navegação
│   └── payment/
│       └── page.tsx          # Pagamento
├── components/
│   ├── VoiceButton.tsx
│   ├── StationCard.tsx
│   ├── MapView.tsx
│   ├── AudioPlayer.tsx
│   └── LoadingState.tsx
├── lib/
│   ├── api.ts                # Cliente API
│   ├── elevenlabs.ts         # STT/TTS
│   ├── maps.ts               # Google Maps
│   └── stellar.ts            # Stellar (opcional)
├── hooks/
│   ├── useVoice.ts           # Hook de voz
│   ├── useLocation.ts        # Hook de geolocalização
│   └── useStations.ts        # Hook de estações
└── styles/
    └── globals.css
```

---

## 🚀 Fluxo de Dados

### 1. Captura de Voz
```
Usuário fala → MediaRecorder → 
Backend STT → Texto → 
Geocoding (Google) → Coordenadas →
Backend /stations/nearby → Estações
```

### 2. Reprodução de Voz
```
Backend TTS → Áudio MP3 →
AudioPlayer → Reproduz →
Feedback visual
```

### 3. Navegação
```
Usuário escolhe estação →
Google Maps API →
Rota traçada →
Instruções por voz (TTS)
```

### 4. Pagamento
```
Usuário chega →
Simula NFC →
Backend /transactions/process →
Transação onchain →
Confirmação com hash
```

---

## ⚡ Funcionalidades Prioritárias (MVP)

### Must Have
1. ✅ Captura de voz (STT)
2. ✅ Reprodução de voz (TTS)
3. ✅ Busca de estações por localização
4. ✅ Lista de estações próximas
5. ✅ Integração Google Maps
6. ✅ Navegação básica
7. ✅ Simulação de pagamento

### Nice to Have
- Histórico de transações
- Saldo onchain visível
- Modo offline (PWA)
- Notificações
- Compartilhar localização

---

## 🎯 Próximos Passos

1. **Criar estrutura básica Next.js**
2. **Implementar tela principal**
3. **Integrar Eleven Labs (STT/TTS)**
4. **Criar componente de voz**
5. **Integrar Google Maps**
6. **Implementar busca de estações**
7. **Criar fluxo de navegação**
8. **Implementar pagamento**

---

## 💡 Considerações Importantes

### Performance
- Carregar áudio de forma assíncrona
- Cache de estações próximas
- Lazy loading de mapas
- Otimizar imagens

### Acessibilidade
- ARIA labels
- Navegação por teclado
- Suporte a leitores de tela
- Contraste adequado

### Offline
- Service Worker (PWA)
- Cache de estações
- Funcionalidade básica offline

### Segurança
- HTTPS obrigatório (para geolocalização)
- Validação de inputs
- Sanitização de dados

---

## 📊 Métricas de Sucesso

- Tempo para encontrar estação: < 30 segundos
- Taxa de sucesso de STT: > 90%
- Taxa de conclusão de navegação: > 80%
- Tempo de carregamento: < 3 segundos

---

## 🎨 Inspirações

- **Google Assistant** - Interface por voz
- **Waze** - Navegação simples
- **Uber** - Botões grandes, ações claras
- **WhatsApp** - Simplicidade extrema

---

## ✅ Checklist de Implementação

- [ ] Setup Next.js com TypeScript
- [ ] Configurar Tailwind CSS
- [ ] Criar estrutura de pastas
- [ ] Implementar tela principal
- [ ] Integrar Eleven Labs STT
- [ ] Integrar Eleven Labs TTS
- [ ] Criar componente VoiceButton
- [ ] Integrar Google Maps
- [ ] Implementar busca de estações
- [ ] Criar tela de lista de estações
- [ ] Implementar navegação
- [ ] Criar tela de pagamento
- [ ] Testar fluxo completo
- [ ] Otimizar para mobile
- [ ] Configurar PWA

