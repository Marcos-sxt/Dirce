#!/bin/bash

# Script de Setup Rápido - Dirce Blockchain
# Executa todos os passos necessários para configurar o blockchain

set -e

echo "🚀 Setup Rápido - Dirce Blockchain"
echo "=================================="
echo ""

cd "$(dirname "$0")/.."

# 1. Verificar se .env existe
if [ ! -f .env ]; then
    echo "❌ Arquivo .env não encontrado!"
    echo "   Crie um arquivo .env baseado no .env.example"
    exit 1
fi

# 2. Criar wallet issuer (se não existir)
if ! grep -q "STELLAR_SECRET_KEY=" .env || grep -q "STELLAR_SECRET_KEY=your_stellar_secret_key_here" .env; then
    echo "📝 Criando wallet issuer..."
    npm run setup:issuer
    echo ""
    echo "⚠️  IMPORTANTE: Copie a STELLAR_SECRET_KEY acima para o seu .env"
    echo "   Depois pressione Enter para continuar..."
    read
fi

# 3. Popular banco com estações
echo "🌱 Populando banco com estações..."
npm run seed

# 4. Setup Stellar completo
echo ""
echo "🔗 Configurando Stellar (wallets, trustlines, tokens)..."
npm run setup:stellar

echo ""
echo "✅ Setup completo!"
echo ""
echo "📋 Próximos passos:"
echo "   1. Adicione as DEMO_USER_*_SECRET no .env (mostradas acima)"
echo "   2. Reinicie o backend: npm run start:dev"
echo "   3. Teste uma transação usando os endpoints da API"

