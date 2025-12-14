# 🚀 Quick Start - Blockchain Setup

## Setup Rápido (3 comandos)

```bash
# 1. Criar wallet issuer
npm run setup:issuer
# Copie STELLAR_SECRET_KEY para .env

# 2. Popular banco
npm run seed

# 3. Setup completo Stellar
npm run setup:stellar
# Copie DEMO_USER_*_SECRET para .env

# 4. Reiniciar backend
npm run start:dev
```

## Testar

```bash
# Consultar saldo
curl http://localhost:3001/transactions/balance/{WALLET}

# Processar pagamento
curl -X POST http://localhost:3001/transactions/process \
  -H "Content-Type: application/json" \
  -d '{"userWallet":"{WALLET}","stationId":"{ID}","amount":1.0}'
```

## Documentação Completa

Veja `docs/BLOCKCHAIN_SETUP.md` para guia detalhado.

