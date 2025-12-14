# 🚀 Deploy Backend no Render

## Configuração

### 1. Criar Web Service no Render

1. Acesse https://render.com
2. Clique em "New +" → "Web Service"
3. Conecte seu repositório GitHub
4. Selecione o repositório `Dirce`

### 2. Configurações do Serviço

- **Name:** `dirce-backend`
- **Environment:** `Node`
- **Region:** Escolha a mais próxima (ex: `Oregon (US West)`)
- **Branch:** `deploy` (ou `main`)
- **Root Directory:** `backend`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run start:prod`

### 3. Variáveis de Ambiente

Configure as seguintes variáveis no Render:

```
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://... (Render cria automaticamente se usar PostgreSQL)
ELEVENLABS_API_KEY=sua_chave_aqui
STELLAR_SECRET_KEY=sua_chave_aqui
STELLAR_NETWORK=testnet
FRONTEND_URL=https://seu-app.vercel.app
```

### 4. Banco de Dados PostgreSQL (Opcional)

Se precisar de banco de dados:

1. No Render, clique em "New +" → "PostgreSQL"
2. Configure o banco
3. Copie a `DATABASE_URL` gerada
4. Use essa URL na variável `DATABASE_URL` do Web Service

### 5. Migrations e Seed

Após o primeiro deploy, você pode executar migrations via SSH ou adicionar ao build:

**Opção 1: Via SSH (Recomendado)**
```bash
# Conectar via SSH no Render
cd backend
npx prisma migrate deploy
npx prisma db seed
```

**Opção 2: Adicionar ao build (Automático)**
Adicione ao `package.json`:
```json
"postbuild": "npx prisma migrate deploy && npx prisma db seed"
```

### 6. Deploy

1. Clique em "Create Web Service"
2. Aguarde o build e deploy
3. Copie a URL gerada (ex: `https://dirce-backend.onrender.com`)

### 7. Configurar Frontend

No Vercel, adicione a variável:
```
VITE_API_URL=https://dirce-backend.onrender.com
```

## Troubleshooting

### Erro: "Cannot find module"
- Verifique se o `Root Directory` está como `backend`
- Verifique se todas as dependências estão no `package.json`

### Erro: "Database connection failed"
- Verifique se `DATABASE_URL` está configurada corretamente
- Verifique se o banco está acessível

### Erro: "CORS"
- Verifique se `FRONTEND_URL` está configurada com a URL do Vercel
- Verifique se a URL do Vercel está no formato correto (https://)

