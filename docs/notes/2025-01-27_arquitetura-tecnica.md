# Arquitetura Técnica - Projeto Dirce

**Data:** 27/01/2025  
**Status:** Definido

---

## 🏗️ Arquitetura Geral

```
┌─────────────────┐
│   Next.js App   │  (Frontend - PWA Mobile)
│   (Público)     │
└────────┬────────┘
         │
         │ HTTP/REST
         │
┌────────▼────────┐
│   NestJS API    │  (Backend)
│   PostgreSQL    │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼────────┐
│Stellar│ │Eleven Labs│
│Blockch│ │  (STT/TTS)│
└───────┘ └───────────┘
```

---

## ✅ Stack Tecnológica Definida

### Frontend
- **Framework:** Next.js (App Router)
- **UI:** Tailwind CSS (sugerido) ou Material-UI
- **PWA:** Configurado para instalação mobile
- **Maps:** Google Maps API
- **Voz:**
  - **STT:** Eleven Labs API
  - **TTS:** Eleven Labs API

### Backend
- **Framework:** NestJS
- **Linguagem:** TypeScript
- **ORM:** Prisma ou TypeORM (sugerido: Prisma)
- **Validação:** class-validator, class-transformer

### Banco de Dados
- **SGBD:** PostgreSQL
- **Dados:** Mockados/inflados para MVP

### Blockchain
- **Network:** Stellar (testnet para MVP)
- **Token:** Asset customizado "REFEICAO"
- **SDK:** [@stellar/stellar-sdk](https://www.npmjs.com/package/@stellar/stellar-sdk)

### APIs Externas
- **Eleven Labs:** STT + TTS
- **Google Maps:** Navegação e geolocalização
- **Stellar Horizon:** Consulta blockchain

---

## 🔐 Autenticação e Segurança

### Modelo de Acesso
- **Público:** App completamente público, sem login
- **Justificativa:** Público-alvo não sabe ler/navegar em login
- **Benefício:** Facilita acesso e espalha conhecimento

### Identificação do Usuário
- **Cartão físico (mockado):** Tipo Kast
- **Conteúdo do cartão:**
  - Wallet address Stellar (público)
  - QR Code com wallet address
  - Código numérico (opcional, para fallback)
- **Vinculação:** Usuário escaneia QR Code do cartão no app (opcional, pode ser mockado)

---

## 💳 Sistema de Pagamento

### Fluxo de Pagamento

1. **Usuário chega na estação**
2. **Aproximação NFC:**
   - Cartão físico (mockado) aproxima da maquininha teórica
   - Maquininha lê wallet address do cartão
3. **Validação:**
   - Maquininha consulta saldo na Stellar (via backend)
   - Verifica se tem tokens suficientes
4. **Transação:**
   - Backend cria transação Stellar
   - Transfere tokens "REFEICAO" da wallet do usuário para wallet da estação
   - Confirma transação onchain
5. **Confirmação:**
   - Maquininha confirma pagamento
   - Libera refeição

### Componentes

#### Cartão Físico (Mockado)
- **Tipo:** Kast (cartão de transporte)
- **Conteúdo:**
  - Wallet address Stellar (público)
  - QR Code
  - Chip NFC (simulado)
- **Implementação:** Mock no código, storytelling na apresentação

#### Maquininha (Teórica)
- **Tipo:** Qualquer maquininha que aceite "nossa bandeira"
- **Funcionalidade:**
  - Lê wallet address via NFC
  - Consulta saldo via API backend
  - Processa pagamento via backend
  - Confirma transação
- **Implementação:** Endpoint API que simula leitura NFC

---

## 🗄️ Estrutura de Dados

### PostgreSQL - Tabelas

#### `stations` (Estações de Alimentação)
```sql
- id: UUID (PK)
- name: VARCHAR
- address: VARCHAR
- latitude: DECIMAL
- longitude: DECIMAL
- stellar_wallet: VARCHAR (wallet que recebe pagamentos)
- opening_hours: JSONB
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### `users` (Usuários - opcional, para rastreamento)
```sql
- id: UUID (PK)
- stellar_wallet: VARCHAR (UNIQUE)
- card_code: VARCHAR (código do cartão físico)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### `transactions` (Transações - cache local)
```sql
- id: UUID (PK)
- stellar_tx_hash: VARCHAR (hash da transação onchain)
- user_wallet: VARCHAR
- station_id: UUID (FK)
- amount: DECIMAL
- status: ENUM ('pending', 'confirmed', 'failed')
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### `token_balances` (Cache de saldos - atualizado periodicamente)
```sql
- wallet_address: VARCHAR (PK)
- balance: DECIMAL
- last_updated: TIMESTAMP
```

### Stellar Blockchain

#### Asset Customizado
- **Código:** REFEICAO
- **Issuer:** Wallet do governo/CRAS (mockado)
- **Precisão:** 2 casas decimais (ex: 10.50 REFEICAO)

#### Wallets
- **Usuário:** Cada cartão tem uma wallet Stellar
- **Estação:** Cada estação tem uma wallet Stellar
- **Emissor:** Wallet que emite os tokens REFEICAO

---

## 🔄 Fluxos Principais

### 1. Busca de Estações (Jornada do Usuário)

```
Usuário → App Next.js
  ↓
Fala localização (áudio)
  ↓
Eleven Labs STT → Texto
  ↓
Backend NestJS
  ↓
Consulta PostgreSQL (estações próximas)
  ↓
Eleven Labs TTS → Áudio com opções
  ↓
Usuário escolhe estação (áudio)
  ↓
Eleven Labs STT → Texto
  ↓
Backend retorna coordenadas
  ↓
Google Maps abre com destino
```

### 2. Pagamento na Estação

```
Usuário aproxima cartão (NFC mockado)
  ↓
Maquininha lê wallet address
  ↓
Backend consulta saldo Stellar
  ↓
Valida saldo suficiente
  ↓
Backend cria transação Stellar
  ↓
Transfere tokens REFEICAO
  ↓
Confirma transação onchain
  ↓
Atualiza cache local (PostgreSQL)
  ↓
Maquininha confirma pagamento
```

---

## 🎨 Interface do Usuário

### Tela Principal
- **Personagem Dirce:** Avatar/ilustração
- **Botão de microfone:** Grande, acessível
- **Instrução por áudio:** "Fale sua localização"
- **Feedback visual:** Animação quando está ouvindo

### Tela de Estações
- **Lista de estações:** Por áudio (não visual)
- **Opções numeradas:** "Estação 1: Restaurante Popular, 500m"
- **Botão de escolha:** Por voz ou toque

### Tela de Navegação
- **Google Maps:** Integrado
- **Rota traçada:** Até a estação escolhida
- **Botão "Abrir no Google Maps":** Abre app nativo

---

## 🔧 Integrações Técnicas

### Eleven Labs API

#### Speech-to-Text (STT)
```typescript
// Endpoint: POST /v1/speech-to-text
// Input: Audio file (WebM, MP3, etc.)
// Output: Text transcript
```

#### Text-to-Speech (TTS)
```typescript
// Endpoint: POST /v1/text-to-speech/{voice_id}
// Input: Text, voice settings
// Output: Audio file (MP3)
```

**Configuração:**
- Voice ID: Escolher voz em português brasileiro
- Model: Multilingual v2 ou Flash v2.5 (baixa latência)

### Stellar SDK

#### Operações Principais
```typescript
// 1. Consultar saldo
const account = await server.loadAccount(walletAddress);
const balance = account.balances.find(b => b.asset_code === 'REFEICAO');

// 2. Criar transação
const transaction = new TransactionBuilder(account, {
  fee: BASE_FEE,
  networkPassphrase: Networks.TESTNET
})
.addOperation(PaymentOperation({
  destination: stationWallet,
  asset: Asset.native(), // ou asset customizado
  amount: amount.toString()
}))
.build();

// 3. Assinar e enviar
transaction.sign(keypair);
const result = await server.submitTransaction(transaction);
```

### Google Maps API

#### Integrações
- **Geocoding:** Converter endereço em coordenadas
- **Places API:** Buscar estações próximas (opcional)
- **Maps JavaScript API:** Exibir mapa
- **Directions API:** Calcular rotas

---

## 📦 Estrutura de Projeto

```
devs_de_impacto/
├── frontend/                 # Next.js
│   ├── app/
│   │   ├── page.tsx         # Tela principal
│   │   ├── stations/
│   │   └── navigation/
│   ├── components/
│   │   ├── DirceAvatar.tsx
│   │   ├── VoiceInput.tsx
│   │   └── StationList.tsx
│   ├── lib/
│   │   ├── elevenlabs.ts    # Cliente Eleven Labs
│   │   └── maps.ts           # Google Maps
│   └── package.json
│
├── backend/                  # NestJS
│   ├── src/
│   │   ├── stations/
│   │   ├── transactions/
│   │   ├── stellar/
│   │   ├── elevenlabs/
│   │   └── main.ts
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
│
├── docs/
└── README.md
```

---

## 🚀 Comandos de Setup

### Frontend (Next.js)
```bash
cd frontend
npm create next-app@latest . --typescript --tailwind --app
npm install @stellar/stellar-sdk
npm install axios
```

### Backend (NestJS)
```bash
cd backend
npm i -g @nestjs/cli
nest new . --package-manager npm
npm install @stellar/stellar-sdk
npm install @prisma/client
npm install prisma --save-dev
npx prisma init
```

### Banco de Dados
```bash
# Usar PostgreSQL local ou serviço (Supabase, Railway, etc.)
# Configurar DATABASE_URL no .env do backend
```

---

## 🔑 Variáveis de Ambiente

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=xxx
NEXT_PUBLIC_ELEVENLABS_API_KEY=xxx
NEXT_PUBLIC_STELLAR_NETWORK=testnet
```

### Backend (.env)
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

### Estações (Seed Data)
- 10-20 estações em diferentes bairros
- Coordenadas reais ou fictícias de uma cidade
- Nomes: "Restaurante Popular", "Cozinha Comunitária", etc.

### Wallets Stellar (Testnet)
- Criar wallets de teste para cada estação
- Criar wallets de teste para usuários demo
- Emitir tokens REFEICAO para wallets de teste

### Saldos Inflados
- Usuários demo com saldos altos (ex: 100 REFEICAO)
- Para facilitar testes e demo

---

## ⚡ Otimizações para 36h

### MVP Mínimo
1. ✅ App Next.js básico (tela principal)
2. ✅ Integração Eleven Labs (STT + TTS)
3. ✅ Busca de estações por localização
4. ✅ Integração Google Maps
5. ✅ Sistema Stellar básico (consultar saldo, fazer transação)
6. ✅ Endpoint de pagamento mockado

### Nice to Have (se sobrar tempo)
- Dashboard de métricas
- Histórico de transações
- Notificações
- Cache de saldos

---

## 🧪 Testes e Validação

### Testes Manuais
- [ ] STT reconhece localização em português
- [ ] TTS fala claramente em português
- [ ] Busca retorna estações próximas
- [ ] Google Maps abre corretamente
- [ ] Transação Stellar funciona (testnet)
- [ ] Pagamento mockado funciona

### Dados de Teste
- Localizações de teste: "Centro", "Bairro X", "Rua Y"
- Estações pré-cadastradas
- Wallets Stellar com saldo

---

## 📚 Recursos e Documentação

### Next.js
- [Documentação Oficial](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)

### NestJS
- [Documentação Oficial](https://docs.nestjs.com/)
- [Prisma Integration](https://docs.nestjs.com/recipes/prisma)

### Stellar
- [Stellar SDK JS](https://stellar.github.io/js-stellar-sdk/)
- [Horizon API](https://developers.stellar.org/api)

### Eleven Labs
- [API Documentation](https://elevenlabs.io/docs/api-reference)
- [SDK TypeScript](https://www.npmjs.com/package/elevenlabs)

### PostgreSQL
- [Prisma Schema](https://www.prisma.io/docs/concepts/components/prisma-schema)

---

## 🎯 Próximos Passos

1. **Setup inicial dos projetos**
   - Criar frontend (Next.js)
   - Criar backend (NestJS)
   - Configurar PostgreSQL

2. **Configurar APIs**
   - Obter chaves (Google Maps, Eleven Labs)
   - Configurar Stellar testnet
   - Testar integrações básicas

3. **Desenvolvimento Core**
   - Implementar fluxo de voz (STT → TTS)
   - Busca de estações
   - Integração Google Maps
   - Sistema Stellar básico

4. **Dados Mock**
   - Seed de estações
   - Criar wallets Stellar de teste
   - Dados inflados para demo

5. **Polimento**
   - UI/UX mobile
   - Testes
   - Preparar apresentação

