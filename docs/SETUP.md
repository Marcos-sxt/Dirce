# Setup do Projeto Dirce

Este documento contém instruções para configurar o ambiente de desenvolvimento.

---

## 📋 Pré-requisitos

- Node.js 18+ (ou 20+)
- npm ou yarn
- PostgreSQL (local ou serviço cloud como Supabase/Railway)
- Contas/Chaves de API:
  - Google Maps API Key
  - Eleven Labs API Key
  - Stellar Testnet (gratuito)

---

## 🚀 Setup Inicial

### 1. Clonar/Configurar Repositório

```bash
cd /home/user/Documents/devs_de_impacto
```

### 2. Frontend (Next.js)

```bash
cd frontend
npm install
```

**Variáveis de Ambiente (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
NEXT_PUBLIC_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
NEXT_PUBLIC_STELLAR_NETWORK=testnet
```

### 3. Backend (NestJS)

```bash
cd backend
npm install
```

**Variáveis de Ambiente (.env):**
```env
# Database - PostgreSQL Local (já configurado)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/dirce

# Eleven Labs
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# Stellar
STELLAR_SECRET_KEY=your_stellar_secret_key_here
STELLAR_NETWORK=testnet
STELLAR_ISSUER_WALLET=your_issuer_wallet_address_here

# Server
PORT=3001
NODE_ENV=development
```

**Nota:** O arquivo `.env` já foi criado com configuração para PostgreSQL localhost. Ajuste `postgres:postgres` se suas credenciais forem diferentes.

### 4. Banco de Dados (PostgreSQL Local)

#### Setup PostgreSQL Local
```bash
# 1. Instalar PostgreSQL (se ainda não tiver)
# Ubuntu/Debian:
sudo apt update
sudo apt install postgresql postgresql-contrib

# macOS (com Homebrew):
brew install postgresql
brew services start postgresql

# 2. Criar banco de dados
createdb dirce

# Ou via psql:
psql -U postgres
CREATE DATABASE dirce;
\q

# 3. Verificar se o .env está correto
# O arquivo .env já está configurado para:
# DATABASE_URL=postgresql://postgres:postgres@localhost:5432/dirce
# Ajuste usuário/senha se necessário
```

### 5. Configurar Prisma

```bash
cd backend
npx prisma migrate dev --name init
npx prisma db seed  # (quando seed estiver configurado)
```

---

## 🔑 Obter Chaves de API

### Google Maps API
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto
3. Ative "Maps JavaScript API" e "Places API"
4. Crie uma chave de API
5. Adicione no `.env.local` do frontend

### Eleven Labs API
1. Acesse [Eleven Labs](https://elevenlabs.io/)
2. Crie uma conta (plano gratuito disponível)
3. Vá em Settings > API Keys
4. Crie uma nova chave
5. Adicione no `.env.local` (frontend) e `.env` (backend)

### Stellar Testnet
1. Acesse [Stellar Laboratory](https://laboratory.stellar.org/)
2. Use "Test Network"
3. Crie uma conta de teste
4. Use [Friendbot](https://developers.stellar.org/docs/encyclopedia/testnet) para obter XLM de teste
5. Configure no `.env` do backend

---

## ▶️ Executar Projetos

### Frontend
```bash
cd frontend
npm run dev
```
Acesse: http://localhost:3000

### Backend
```bash
cd backend
npm run start:dev
```
API disponível em: http://localhost:3001

---

## 📦 Dependências Instaladas

### Frontend
- `next` - Framework React
- `react`, `react-dom` - React
- `@stellar/stellar-sdk` - SDK Stellar
- `axios` - Cliente HTTP
- `@react-google-maps/api` - Google Maps React

### Backend
- `@nestjs/core`, `@nestjs/common` - NestJS
- `@prisma/client` - Prisma ORM
- `@stellar/stellar-sdk` - SDK Stellar
- `prisma` (dev) - CLI Prisma

---

## 🗄️ Estrutura do Banco de Dados

Ver `backend/prisma/schema.prisma` para o schema completo.

**Tabelas principais:**
- `Station` - Estações de alimentação
- `Transaction` - Transações (cache local)
- `User` (opcional) - Usuários

---

## 🧪 Testar Setup

### Frontend
```bash
cd frontend
npm run build  # Verificar se compila
```

### Backend
```bash
cd backend
npm run test  # Rodar testes
npx prisma studio  # Abrir Prisma Studio (visualizar dados)
```

---

## 🐛 Troubleshooting

### Erro: "Cannot find module"
```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Database connection failed"
- Verificar se PostgreSQL está rodando:
  ```bash
  # Linux
  sudo systemctl status postgresql
  
  # macOS
  brew services list | grep postgresql
  ```
- Verificar se o banco `dirce` existe:
  ```bash
  psql -U postgres -l | grep dirce
  ```
- Se não existir, criar:
  ```bash
  createdb -U postgres dirce
  ```
- Verificar `DATABASE_URL` no `.env` (padrão: `postgresql://postgres:postgres@localhost:5432/dirce`)
- Testar conexão:
  ```bash
  psql postgresql://postgres:postgres@localhost:5432/dirce
  ```
- Se a senha for diferente, ajustar no `.env` ou criar usuário:
  ```bash
  psql -U postgres
  ALTER USER postgres PASSWORD 'sua_senha';
  ```

### Erro: "Prisma migrate failed"
```bash
# Resetar banco (CUIDADO: apaga dados)
npx prisma migrate reset
npx prisma migrate dev
```

---

## 📚 Próximos Passos

1. Configurar todas as variáveis de ambiente
2. Rodar migrations do Prisma
3. Criar seed de dados mock (estações)
4. Testar integrações (Eleven Labs, Google Maps, Stellar)
5. Começar desenvolvimento seguindo o [Plano de Implementação](./notes/2025-01-27_plano-implementacao.md)

