# Plano de Implementação - Projeto Dirce

**Data:** 27/01/2025  
**Duração:** 36 horas (Hackathon)  
**Status:** Pronto para execução

---

## 🎯 Objetivo do MVP

Criar um app web mobile que:
1. Permite usuário falar sua localização
2. Retorna estações próximas por áudio
3. Abre Google Maps com rota até estação escolhida
4. Simula pagamento via NFC (mockado) usando tokens Stellar

---

## ⏱️ Cronograma (36h)

### Fase 1: Setup (3-4h)
**Objetivo:** Ter ambiente funcionando

- [ ] **0-1h: Repositório e estrutura**
  - [ ] Criar repositório Git
  - [ ] Criar pastas `frontend/` e `backend/`
  - [ ] Setup `.gitignore`

- [ ] **1-2h: Frontend Next.js**
  ```bash
  cd frontend
  npm create next-app@latest . --typescript --tailwind --app --no-src-dir
  npm install @stellar/stellar-sdk axios
  npm install -D @types/node
  ```

- [ ] **2-3h: Backend NestJS**
  ```bash
  cd backend
  npm i -g @nestjs/cli
  nest new . --package-manager npm --skip-git
  npm install @stellar/stellar-sdk @prisma/client
  npm install -D prisma
  npx prisma init
  ```

- [ ] **3-4h: Banco de Dados**
  - [ ] Configurar PostgreSQL (local ou Supabase/Railway)
  - [ ] Criar schema Prisma
  - [ ] Rodar migrations
  - [ ] Criar seed de dados mock

---

### Fase 2: Core Features (20-22h)

#### 2.1 Integração Eleven Labs (4-5h)
- [ ] **STT (Speech-to-Text)**
  - [ ] Criar serviço no backend para receber áudio
  - [ ] Integrar Eleven Labs STT API
  - [ ] Testar reconhecimento em português
  - [ ] Criar endpoint `/api/speech-to-text`

- [ ] **TTS (Text-to-Speech)**
  - [ ] Criar serviço no backend
  - [ ] Integrar Eleven Labs TTS API
  - [ ] Escolher voice ID em português
  - [ ] Criar endpoint `/api/text-to-speech`
  - [ ] Testar qualidade e latência

#### 2.2 Interface de Voz no Frontend (3-4h)
- [ ] **Componente VoiceInput**
  - [ ] Botão de microfone grande
  - [ ] Gravar áudio do navegador
  - [ ] Enviar para backend (STT)
  - [ ] Feedback visual (gravando)

- [ ] **Componente VoiceOutput**
  - [ ] Receber texto do backend
  - [ ] Chamar TTS
  - [ ] Reproduzir áudio
  - [ ] Indicador de "Dirce falando"

- [ ] **Tela Principal**
  - [ ] Avatar/ilustração da Dirce
  - [ ] Botão de microfone
  - [ ] Fluxo: "Fale sua localização" → STT → processar → TTS

#### 2.3 Busca de Estações (4-5h)
- [ ] **Schema Prisma - Estações**
  ```prisma
  model Station {
    id          String   @id @default(uuid())
    name        String
    address     String
    latitude    Float
    longitude   Float
    stellarWallet String
    createdAt   DateTime @default(now())
    updatedAt   DateTime @updatedAt
  }
  ```

- [ ] **Seed de Dados**
  - [ ] Criar 10-20 estações mockadas
  - [ ] Coordenadas de uma cidade (ex: Curitiba)
  - [ ] Nomes: "Restaurante Popular", "Cozinha Comunitária", etc.

- [ ] **Endpoint de Busca**
  - [ ] `/api/stations/nearby?lat=X&lng=Y&radius=5000`
  - [ ] Calcular distância (Haversine)
  - [ ] Ordenar por proximidade
  - [ ] Retornar top 5 mais próximas

- [ ] **Processamento de Localização por Voz**
  - [ ] Extrair localização do texto (STT)
  - [ ] Geocoding (Google Maps ou manual)
  - [ ] Buscar estações próximas
  - [ ] Formatar resposta para TTS: "Estação 1: Nome, 500m. Estação 2: ..."

#### 2.4 Integração Google Maps (2-3h)
- [ ] **Configurar API Key**
  - [ ] Obter chave Google Maps
  - [ ] Configurar no `.env.local`

- [ ] **Componente de Mapa**
  - [ ] Instalar `@react-google-maps/api`
  - [ ] Exibir mapa
  - [ ] Marcar estação escolhida
  - [ ] Traçar rota (Directions API)

- [ ] **Botão "Abrir no Google Maps"**
  - [ ] Link para app nativo
  - [ ] Formato: `https://www.google.com/maps/dir/?api=1&destination=LAT,LNG`

#### 2.5 Sistema Stellar (5-6h)
- [ ] **Setup Stellar Testnet**
  - [ ] Criar conta no Stellar testnet
  - [ ] Obter XLM de teste (Friendbot)
  - [ ] Configurar Horizon server (testnet)

- [ ] **Criar Asset REFEICAO**
  - [ ] Criar wallet issuer
  - [ ] Criar asset customizado "REFEICAO"
  - [ ] Configurar trustlines

- [ ] **Wallets de Teste**
  - [ ] Criar wallets para estações (10-20)
  - [ ] Criar wallets para usuários demo (5-10)
  - [ ] Emitir tokens REFEICAO para wallets de teste
  - [ ] Saldos inflados (ex: 100 REFEICAO cada)

- [ ] **Serviço Stellar no Backend**
  - [ ] Consultar saldo de wallet
  - [ ] Criar transação
  - [ ] Assinar e enviar transação
  - [ ] Endpoints:
    - `GET /api/stellar/balance/:wallet`
    - `POST /api/stellar/transfer`

- [ ] **Schema Prisma - Transações**
  ```prisma
  model Transaction {
    id            String   @id @default(uuid())
    stellarTxHash String   @unique
    userWallet    String
    stationId     String
    amount        Float
    status        String   // pending, confirmed, failed
    createdAt     DateTime @default(now())
    updatedAt     DateTime @updatedAt
  }
  ```

#### 2.6 Fluxo de Pagamento Mockado (2-3h)
- [ ] **Endpoint de Pagamento**
  - [ ] `POST /api/payment/process`
  - [ ] Receber: `{ wallet, stationId, amount }`
  - [ ] Validar saldo
  - [ ] Criar transação Stellar
  - [ ] Atualizar cache local
  - [ ] Retornar confirmação

- [ ] **Mock de NFC**
  - [ ] Endpoint que simula leitura de cartão
  - [ ] `POST /api/payment/nfc-simulate`
  - [ ] Receber wallet address
  - [ ] Processar pagamento

- [ ] **Interface de Pagamento (opcional)**
  - [ ] Tela simples para simular aproximação
  - [ ] Botão "Aproximar cartão"
  - [ ] Mostrar confirmação

---

### Fase 3: Integração e Fluxo Completo (4-5h)

- [ ] **Fluxo End-to-End**
  - [ ] Testar jornada completa
  - [ ] Corrigir bugs
  - [ ] Melhorar feedback visual/áudio

- [ ] **Tratamento de Erros**
  - [ ] Erros de STT (não entendeu)
  - [ ] Erros de rede
  - [ ] Saldo insuficiente
  - [ ] Mensagens amigáveis por áudio

- [ ] **Otimizações**
  - [ ] Cache de estações
  - [ ] Cache de saldos Stellar
  - [ ] Pré-carregar áudios comuns

---

### Fase 4: Polimento e Apresentação (4-6h)

- [ ] **UI/UX Mobile**
  - [ ] Design responsivo
  - [ ] Botões grandes e acessíveis
  - [ ] Cores contrastantes
  - [ ] Animações suaves

- [ ] **PWA**
  - [ ] Configurar manifest
  - [ ] Service worker básico
  - [ ] Ícone do app
  - [ ] Instalável no celular

- [ ] **Testes Finais**
  - [ ] Testar em dispositivo móvel real
  - [ ] Testar fluxo completo
  - [ ] Verificar áudio em português
  - [ ] Testar transações Stellar

- [ ] **Preparar Apresentação**
  - [ ] Demo funcional
  - [ ] Slides (problema, solução, impacto)
  - [ ] Storytelling do cartão Kast
  - [ ] Métricas de impacto

- [ ] **Documentação Básica**
  - [ ] README atualizado
  - [ ] Como rodar localmente
  - [ ] Variáveis de ambiente

---

## 🛠️ Comandos Rápidos

### Setup Inicial
```bash
# Frontend
cd frontend
npm create next-app@latest . --typescript --tailwind --app
npm install @stellar/stellar-sdk axios
npm install @react-google-maps/api

# Backend
cd backend
npm i -g @nestjs/cli
nest new . --package-manager npm
npm install @stellar/stellar-sdk @prisma/client
npm install -D prisma
npx prisma init
npx prisma migrate dev --name init
npx prisma db seed
```

### Variáveis de Ambiente

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=xxx
NEXT_PUBLIC_ELEVENLABS_API_KEY=xxx
NEXT_PUBLIC_STELLAR_NETWORK=testnet
```

**Backend (.env)**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/dirce
ELEVENLABS_API_KEY=xxx
STELLAR_SECRET_KEY=xxx
STELLAR_NETWORK=testnet
STELLAR_ISSUER_WALLET=xxx
PORT=3001
```

---

## 📊 Dados Mockados

### Estações (Seed)
```typescript
const stations = [
  {
    name: "Restaurante Popular Centro",
    address: "Rua das Flores, 123, Centro",
    latitude: -25.4284,
    longitude: -49.2733,
    stellarWallet: "GXXXXX..."
  },
  // ... mais 9-19 estações
];
```

### Wallets Stellar
- **Issuer:** Wallet que emite tokens REFEICAO
- **Estações:** 1 wallet por estação
- **Usuários demo:** 5-10 wallets com saldo inflado

---

## 🎯 Prioridades (Se faltar tempo)

### Must Have (MVP)
1. ✅ STT + TTS funcionando
2. ✅ Busca de estações por localização
3. ✅ Google Maps abre com destino
4. ✅ Transação Stellar básica (consultar saldo, transferir)

### Should Have
- Interface mobile polida
- Tratamento de erros básico
- PWA instalável

### Nice to Have
- Dashboard de métricas
- Histórico de transações
- Notificações

---

## 🐛 Riscos e Mitigações

### Risco: Eleven Labs STT não reconhece bem português
**Mitigação:** Testar antes, ter fallback para entrada manual

### Risco: Latência alta no áudio
**Mitigação:** Usar modelo Flash v2.5, pré-gerar áudios comuns

### Risco: Stellar complexo demais
**Mitigação:** Focar em MVP básico (consultar saldo + transferir), usar testnet

### Risco: Falta de tempo
**Mitigação:** Priorizar fluxo core, deixar features extras para depois

---

## 📚 Recursos Úteis

### Documentação
- [Next.js Docs](https://nextjs.org/docs)
- [NestJS Docs](https://docs.nestjs.com/)
- [Stellar SDK JS](https://stellar.github.io/js-stellar-sdk/)
- [Eleven Labs API](https://elevenlabs.io/docs/api-reference)
- [Google Maps API](https://developers.google.com/maps/documentation)

### Ferramentas
- [Stellar Laboratory (Testnet)](https://laboratory.stellar.org/)
- [Friendbot (XLM de teste)](https://developers.stellar.org/docs/encyclopedia/testnet)
- [Prisma Studio](https://www.prisma.io/studio) (visualizar dados)

---

## ✅ Checklist Final (Antes da Apresentação)

- [ ] App funciona end-to-end
- [ ] STT reconhece português
- [ ] TTS fala claramente
- [ ] Google Maps abre corretamente
- [ ] Transação Stellar funciona (testnet)
- [ ] Demo preparada
- [ ] Slides prontos
- [ ] Storytelling do cartão Kast definido
- [ ] Métricas de impacto calculadas

