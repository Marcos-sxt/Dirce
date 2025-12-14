#!/bin/bash

# Script para configurar o banco de dados PostgreSQL local

echo "🗄️  Configurando banco de dados PostgreSQL local..."

# Verificar se PostgreSQL está instalado
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL não está instalado."
    echo "   Instale com: sudo apt install postgresql (Linux) ou brew install postgresql (macOS)"
    exit 1
fi

echo "✅ PostgreSQL encontrado"

# Verificar se o banco já existe
if psql -U postgres -lqt | cut -d \| -f 1 | grep -qw dirce; then
    echo "✅ Banco 'dirce' já existe"
else
    echo "📦 Criando banco de dados 'dirce'..."
    createdb -U postgres dirce 2>/dev/null || psql -U postgres -c "CREATE DATABASE dirce;"
    
    if [ $? -eq 0 ]; then
        echo "✅ Banco 'dirce' criado com sucesso"
    else
        echo "❌ Erro ao criar banco. Verifique suas credenciais PostgreSQL"
        echo "   Você pode precisar ajustar o usuário/senha no arquivo .env"
        exit 1
    fi
fi

echo ""
echo "🎉 Banco de dados configurado!"
echo ""
echo "Próximos passos:"
echo "1. Verifique se o DATABASE_URL no .env está correto"
echo "2. Execute: npx prisma migrate dev"
echo "3. (Opcional) Execute: npx prisma db seed (quando seed estiver configurado)"

