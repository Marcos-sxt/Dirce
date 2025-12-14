# Setup Blockchain Stellar - Dirce

Guia completo para configurar o sistema de tokens REFEICAO na blockchain Stellar.

---

## 🎯 Visão Geral

O sistema usa a blockchain Stellar (testnet) para:
- Emitir tokens REFEICAO customizados
- Processar pagamentos onchain reais
- Garantir rastreabilidade e transparência
- Prevenir fraudes

---

## 📋 Pré-requisitos

- Backend rodando e compilando sem erros
- Banco de dados PostgreSQL configurado
- `.env` configurado com `DATABASE_URL`

---

## 🚀 Setup Passo a Passo

### Opção 1: Setup Automático (Recomendado)

```bash
cd backend
./scripts/quick-setup.sh
```

O script vai:
1. Criar wallet issuer
2. Popular banco com estações
3. Configurar todas as wallets Stellar
4. Emitir tokens REFEICAO

### Opção 2: Setup Manual

#### Passo 1: Criar Wallet Issuer

```bash
cd backend
npm run setup:issuer
```

**Saída esperada:**
```
🔑 Gerando wallet issuer para Stellar...

✅ Wallet criada!

📋 Adicione essas informações no seu .env:

STELLAR_SECRET_KEY=SXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
STELLAR_ISSUER_WALLET=GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**Ação:** Copie a `STELLAR_SECRET_KEY` para o seu `.env`

#### Passo 2: Popular Banco com Estações

```bash
npm run seed
```

Isso cria 10 estações em Curitiba com coordenadas reais.

#### Passo 3: Setup Stellar Completo

```bash
npm run setup:stellar
```

Este script vai:
- ✅ Verificar/criar wallet issuer
- ✅ Fundar wallet issuer com XLM de teste
- ✅ Criar wallets para todas as estações
- ✅ Fundar wallets das estações
- ✅ Criar trustlines para receber REFEICAO
- ✅ Criar 3 wallets demo para usuários
- ✅ Emitir 100 REFEICAO para cada usuário demo

**Saída esperada:**
```
🚀 Iniciando setup Stellar...

📝 Issuer Wallet: GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
✅ Issuer wallet OK (XLM: 10000.0)

🏪 Criando wallets para estações...
   ✅ Criada wallet para Restaurante Popular Centro: GXXXXXXXXXXXXXXXX...
   ✅ Trustline criada para Restaurante Popular Centro
   ...

👥 Criando wallets demo para usuários...
   ✅ Criada wallet para Usuário Demo 1: GXXXXXXXXXXXXXXXX...
   ✅ Emitidos 100 REFEICAO (Tx: abc123...)

💾 Secret keys dos usuários demo:
   (Adicione essas keys no .env)

   DEMO_USER_1_SECRET=SXXXXXXXXXXXXXXXX...
   # Usuário Demo 1: GXXXXXXXXXXXXXXXX...
   ...
```

**Ação:** Copie todas as `DEMO_USER_*_SECRET` para o seu `.env`

#### Passo 4: Configurar .env

Adicione no seu `.env`:

```env
# Stellar Issuer (já deve estar configurado)
STELLAR_SECRET_KEY=SXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
STELLAR_NETWORK=testnet

# Usuários Demo (adicionar após rodar setup:stellar)
DEMO_USER_1_SECRET=SXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
DEMO_USER_2_SECRET=SXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
DEMO_USER_3_SECRET=SXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

#### Passo 5: Reiniciar Backend

```bash
npm run start:dev
```

Você deve ver no console:
```
✅ Usuário demo 1 carregado: GXXXXXXXXXXXXXXXX...
✅ Usuário demo 2 carregado: GXXXXXXXXXXXXXXXX...
✅ Usuário demo 3 carregado: GXXXXXXXXXXXXXXXX...
📝 3 usuários demo carregados
```

---

## 🧪 Testando

### 1. Consultar Saldo

```bash
curl http://localhost:3001/transactions/balance/GXXXXXXXXXXXXXXXX...
```

**Resposta esperada:**
```json
{
  "wallet": "GXXXXXXXXXXXXXXXX...",
  "balance": 100,
  "asset": "REFEICAO"
}
```

### 2. Processar Pagamento

```bash
curl -X POST http://localhost:3001/transactions/process \
  -H "Content-Type: application/json" \
  -d '{
    "userWallet": "GXXXXXXXXXXXXXXXX...",
    "stationId": "<ID_DA_ESTACAO>",
    "amount": 1.0
  }'
```

**Resposta esperada:**
```json
{
  "id": "...",
  "stellarTxHash": "abc123def456...",
  "userWallet": "GXXXXXXXXXXXXXXXX...",
  "stationId": "...",
  "amount": 1.0,
  "status": "confirmed",
  "message": "Pagamento processado com sucesso na blockchain",
  "explorerUrl": "https://stellar.expert/explorer/testnet/tx/abc123..."
}
```

### 3. Verificar na Blockchain

Abra o link `explorerUrl` da resposta para ver a transação na blockchain.

---

## 📊 Estrutura de Dados

### Estações

Cada estação tem:
- `stellarWallet`: Public key da wallet Stellar
- Recebe pagamentos em tokens REFEICAO

### Usuários Demo

Cada usuário demo tem:
- `publicKey`: Wallet pública
- `secretKey`: Armazenada no `.env` (DEMO_USER_*_SECRET)
- Saldo inicial: 100 REFEICAO

### Transações

Cada transação tem:
- `stellarTxHash`: Hash real da transação na blockchain
- `status`: `confirmed` (Stellar confirma em ~5 segundos)
- Link para explorer: `https://stellar.expert/explorer/testnet/tx/{hash}`

---

## 🔍 Verificações

### Verificar Wallet Issuer

```bash
# Ver saldo do issuer
curl "https://horizon-testnet.stellar.org/accounts/GXXXXXXXXXXXXXXXX..."
```

### Verificar Transação

```bash
# Substituir {hash} pelo hash da transação
curl "https://horizon-testnet.stellar.org/transactions/{hash}"
```

### Verificar no Explorer

Acesse: https://stellar.expert/explorer/testnet

---

## ⚠️ Troubleshooting

### Erro: "STELLAR_SECRET_KEY não configurada"

**Solução:** Rode `npm run setup:issuer` e adicione a key no `.env`

### Erro: "Secret key do usuário não encontrada"

**Solução:** 
1. Verifique se rodou `npm run setup:stellar`
2. Adicione as `DEMO_USER_*_SECRET` no `.env`
3. Reinicie o backend

### Erro: "Saldo insuficiente"

**Solução:** 
- Verifique se os tokens foram emitidos: `npm run setup:stellar`
- Consulte o saldo: `GET /transactions/balance/{wallet}`

### Erro: "Estação não tem wallet Stellar configurada"

**Solução:** Rode `npm run setup:stellar` para criar wallets para todas as estações

### Transação Falha

**Possíveis causas:**
- Wallet sem XLM suficiente (reserva mínima)
- Trustline não criada
- Rede Stellar lenta (tente novamente)

**Solução:** 
- Verifique se rodou `npm run setup:stellar` completamente
- Aguarde alguns segundos e tente novamente

---

## 🔐 Segurança

### Para Demo/Hackathon

- Secret keys armazenadas no `.env` (aceitável para demo)
- Sistema de custódia temporária em memória
- Documentar que em produção usaria custódia segura

### Para Produção

- **NUNCA** armazenar secret keys no backend
- Usar custódia externa (ex: Fireblocks, BitGo)
- Ou hardware wallets
- Ou sistema de assinatura distribuída

---

## 📚 Recursos

- [Stellar Documentation](https://developers.stellar.org/)
- [Stellar SDK JS](https://stellar.github.io/js-stellar-sdk/)
- [Stellar Testnet Explorer](https://stellar.expert/explorer/testnet)
- [Stellar Laboratory](https://laboratory.stellar.org/)

---

## ✅ Checklist de Setup

- [ ] Wallet issuer criada e configurada no `.env`
- [ ] Banco populado com estações (`npm run seed`)
- [ ] Setup Stellar completo executado (`npm run setup:stellar`)
- [ ] Secret keys dos usuários demo no `.env`
- [ ] Backend reiniciado e carregando usuários demo
- [ ] Teste de consulta de saldo funcionando
- [ ] Teste de pagamento funcionando
- [ ] Transação verificada no explorer

---

## 🎉 Pronto!

Se todos os itens do checklist estão marcados, o sistema blockchain está completamente funcional!

Qualquer dúvida, consulte os logs do backend ou verifique os endpoints da API.

