# 🚀 Guia de Deploy - Dirce

## 📋 Resumo

Este projeto está configurado para deploy em:
- **Frontend:** Vercel
- **Backend:** Render

## 🎯 Passos Rápidos

### 1. Deploy do Backend (Render)

1. Acesse https://render.com e crie uma conta
2. Clique em "New +" → "Web Service"
3. Conecte o repositório GitHub
4. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start:prod`
5. Adicione variáveis de ambiente (veja `backend/DEPLOY_RENDER.md`)
6. Copie a URL do backend (ex: `https://dirce-backend.onrender.com`)

### 2. Deploy do Frontend (Vercel)

1. Acesse https://vercel.com e crie uma conta
2. Clique em "Add New..." → "Project"
3. Importe o repositório GitHub
4. Configure:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite (detectado automaticamente)
5. Adicione variáveis de ambiente:
   ```
   VITE_API_URL=https://dirce-backend.onrender.com
   VITE_GOOGLE_MAPS_API_KEY=sua_chave_aqui
   ```
6. Deploy!

### 3. Atualizar CORS do Backend

No Render, atualize a variável:
```
FRONTEND_URL=https://seu-app.vercel.app
```

## 📁 Arquivos de Configuração

- `frontend/vercel.json` - Configuração do Vercel
- `backend/render.yaml` - Configuração do Render
- `frontend/DEPLOY_VERCEL.md` - Guia detalhado do Vercel
- `backend/DEPLOY_RENDER.md` - Guia detalhado do Render

## ✅ Checklist

### Backend (Render)
- [ ] Web Service criado
- [ ] Root Directory: `backend`
- [ ] Variáveis de ambiente configuradas
- [ ] Build funcionando
- [ ] URL do backend copiada

### Frontend (Vercel)
- [ ] Project criado
- [ ] Root Directory: `frontend`
- [ ] Variáveis de ambiente configuradas
- [ ] Build funcionando
- [ ] URL do frontend copiada

### Integração
- [ ] `FRONTEND_URL` configurado no backend
- [ ] `VITE_API_URL` configurado no frontend
- [ ] CORS funcionando
- [ ] Teste de conexão entre frontend e backend

## 🔧 Variáveis de Ambiente

### Backend (Render)
```
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://...
ELEVENLABS_API_KEY=xxx
STELLAR_SECRET_KEY=xxx
STELLAR_NETWORK=testnet
FRONTEND_URL=https://seu-app.vercel.app
```

### Frontend (Vercel)
```
VITE_API_URL=https://dirce-backend.onrender.com
VITE_GOOGLE_MAPS_API_KEY=xxx
```

## 🐛 Troubleshooting

### CORS Error
- Verifique se `FRONTEND_URL` está correto no backend
- Verifique se a URL do Vercel está no formato `https://`

### Build Fails
- Verifique logs no Vercel/Render
- Teste build local: `npm run build`
- Verifique se todas as dependências estão no `package.json`

### Database Connection
- Verifique se `DATABASE_URL` está correto
- Verifique se o banco está acessível
- Execute migrations: `npx prisma migrate deploy`

## 📚 Documentação Detalhada

- [Deploy Frontend (Vercel)](./frontend/DEPLOY_VERCEL.md)
- [Deploy Backend (Render)](./backend/DEPLOY_RENDER.md)

