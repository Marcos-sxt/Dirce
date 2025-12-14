# Decisões Técnicas - Projeto Dirce

**Data:** 27/01/2025  
**Status:** ✅ Todas as decisões confirmadas

---

## ✅ Decisões Confirmadas

### Blockchain: Stellar
- **Motivo:** Taxas extremamente baixas (0,00001 XLM por transação)
- **Ideal para:** Alto volume de transações com custos mínimos
- **Reserva mínima:** 1 XLM por conta
- **Documentação:** [developers.stellar.org](https://developers.stellar.org/docs)

### Áudio: Eleven Labs (STT + TTS)
- **STT (Speech-to-Text):** ✅ Eleven Labs API
- **TTS (Text-to-Speech):** ✅ Eleven Labs API
- **Motivo:** Alta qualidade, baixa latência, suporte a português
- **Modelos disponíveis:**
  - Multilingual v2: discursos realistas e consistentes
  - Flash v2.5: latência reduzida (ideal para interação em tempo real)
- **Pricing:**
  - Plano gratuito: 10.000 créditos/mês
  - Creator: 100.000 créditos/mês por US$ 22
- **SDKs:** Python e TypeScript disponíveis
- **Documentação:** [elevenlabs.io/developers](https://elevenlabs.io/developers)

---

## ✅ Decisões Confirmadas (Completas)

### 1. Speech-to-Text (ASR)
- ✅ **Eleven Labs API** (também para STT, não só TTS)

### 2. Stack Frontend
- ✅ **Next.js** (App Router)
- Comando: `npm create next-app@latest`

### 3. Stack Backend
- ✅ **NestJS** (TypeScript)
- Comando: `nest new` (via @nestjs/cli)

### 4. Banco de Dados
- ✅ **PostgreSQL**
- ORM sugerido: Prisma ou TypeORM

### 5. Autenticação/Identificação
- ✅ **Sem login - App completamente público**
- **Justificativa:** Público-alvo não sabe ler/navegar em login
- **Benefício:** Facilita acesso e espalha conhecimento
- Não há prejuízo se pessoas fora do público-alvo usarem

### 6. Cartão Físico
- ✅ **Tipo Kast** (cartão de transporte)
- **Status:** Mockado no código, existe apenas no storytelling
- **Conteúdo:** Wallet address Stellar (público), QR Code, código numérico

### 7. Pagamento
- ✅ **Por aproximação NFC** (mockado)
- **Maquininha:** Teórica, qualquer uma que aceite "nossa bandeira"
- **Fluxo:** Cartão aproxima → maquininha lê wallet → backend processa pagamento

### 8. Token Stellar
- ✅ **Asset customizado "REFEICAO"**
- Criado na Stellar testnet para MVP

### 9. Dados
- ✅ **Mockados/inflados para MVP**
- Estações: dados fictícios ou alguns reais para demo
- Saldos: inflados para facilitar testes
- Tudo falso em geral, alguns dados reais só para demo

---

## 📋 Resumo Final da Stack

### Frontend
- **Next.js** (TypeScript, App Router)
- **Tailwind CSS** (sugerido)
- **PWA** configurado

### Backend
- **NestJS** (TypeScript)
- **PostgreSQL** (Prisma/TypeORM)
- **REST API**

### Blockchain
- **Stellar** (testnet)
- **Token:** REFEICAO (customizado)

### APIs Externas
- **Eleven Labs:** STT + TTS
- **Google Maps:** Navegação
- **Stellar Horizon:** Consulta blockchain

### Modelo de Acesso
- **Público:** Sem autenticação
- **Cartão:** Mockado (tipo Kast)
- **Pagamento:** NFC mockado

---

## 🔧 Integrações Necessárias

### ✅ Todas Confirmadas
- ✅ Stellar Blockchain (tokens onchain, asset REFEICAO)
- ✅ Eleven Labs (STT + TTS)
- ✅ Google Maps (navegação)
- ✅ Next.js (frontend)
- ✅ NestJS (backend)
- ✅ PostgreSQL (banco de dados)

---

## 📋 Checklist de Implementação (36h)

### Setup Inicial (2-3h)
- [ ] Configurar repositório Git
- [ ] Setup frontend (React/Vue)
- [ ] Setup backend (Node/Python)
- [ ] Configurar variáveis de ambiente
- [ ] Criar contas/APIs:
  - [ ] Stellar (testnet)
  - [ ] Eleven Labs
  - [ ] Google Maps
  - [ ] Speech-to-Text

### Core Features (20-24h)
- [ ] Autenticação/vinculação de cartão
- [ ] Integração Speech-to-Text
- [ ] Integração Eleven Labs (TTS)
- [ ] Busca de estações por localização
- [ ] Integração Google Maps
- [ ] Sistema de tokens Stellar:
  - [ ] Criar wallets
  - [ ] Consultar saldo
  - [ ] Fazer transações
- [ ] Fluxo de pagamento na estação
- [ ] Interface mobile-first

### IA e Melhorias (6-8h)
- [ ] Processamento de voz (localização, escolha)
- [ ] Respostas por áudio (Eleven Labs)
- [ ] Recomendações inteligentes (opcional)
- [ ] Dashboard básico (métricas)

### Polimento (4-6h)
- [ ] Testes e correções
- [ ] Ajustes de UX
- [ ] Preparar apresentação
- [ ] Demo funcional

---

## 📚 Recursos e Documentação

### Stellar
- [Documentação Oficial](https://developers.stellar.org/docs)
- [SDKs Disponíveis](https://developers.stellar.org/docs/software-and-sdks)
- [Horizon API](https://developers.stellar.org/api)
- [Testnet](https://developers.stellar.org/docs/encyclopedia/testnet)

### Eleven Labs
- [Documentação da API](https://elevenlabs.io/developers)
- [SDKs](https://elevenlabs.io/docs/api-reference)
- [Pricing](https://elevenlabs.io/pricing/api)

### Google Maps
- [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)
- [Places API](https://developers.google.com/maps/documentation/places)

---

## ⚠️ Riscos e Mitigações

### Riscos Técnicos
1. **Latência de áudio (Eleven Labs)**
   - Mitigação: Usar modelo Flash v2.5 para baixa latência
   - Fallback: Pré-gerar áudios comuns

2. **Custos de API**
   - Mitigação: Usar planos gratuitos/testnet quando possível
   - Monitorar uso durante desenvolvimento

3. **Complexidade Stellar em 36h**
   - Mitigação: Focar em MVP funcional, não todas as features
   - Usar testnet, não mainnet

4. **Precisão Speech-to-Text em português**
   - Mitigação: Testar APIs antes do hackathon
   - Ter fallback para entrada manual

### Riscos de Negócio
1. **Infraestrutura física (estações, cartões)**
   - Mitigação: Simular no MVP, focar no app

2. **Parcerias (CRAS, estações)**
   - Mitigação: Demonstrar valor, não precisa de parcerias reais para o hackathon

---

## 🎯 Próximos Passos Imediatos

1. ✅ **Todas as decisões técnicas confirmadas**
2. **Setup inicial dos projetos:**
   - Criar frontend Next.js
   - Criar backend NestJS
   - Configurar PostgreSQL
3. **Configurar APIs:**
   - Obter chaves (Google Maps, Eleven Labs)
   - Configurar Stellar testnet
   - Testar integrações básicas
4. **Criar wireframes/mockups**
5. **Preparar dados mock:**
   - Estações de exemplo (dados inflados)
   - Wallets Stellar de teste
   - Saldos inflados para demo
6. **Estruturar pitch**

