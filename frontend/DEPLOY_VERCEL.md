# 🚀 Deploy Frontend no Vercel - Dirce

## 📋 Variáveis de Ambiente Necessárias

### ✅ Obrigatória

**`VITE_API_URL`**
- URL do backend no Render
- Exemplo: `https://dirce-backend.onrender.com`
- **⚠️ IMPORTANTE:** Use a URL completa com `https://`
- Sem essa variável, o frontend tentará usar `http://localhost:3001` (não funciona em produção)

### 🔑 Opcional (mas recomendada)

**`VITE_GOOGLE_MAPS_API_KEY`**
- Chave da API do Google Maps
- Usada para geocodificação de endereços
- **Fallback:** Se não configurada, usa coordenadas mockadas do Rio de Janeiro
- Como obter:
  1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
  2. Crie um projeto ou selecione um existente
  3. Ative a **Geocoding API**
  4. Crie uma chave de API em "Credenciais"
  5. (Opcional) Restrinja a chave para o domínio do Vercel

## 🎯 Passo a Passo no Vercel

### 1. Criar Projeto

1. Acesse https://vercel.com
2. Clique em **"Add New..."** → **"Project"**
3. Conecte o repositório `Marcos-sxt/Dirce`
4. Selecione a branch `deploy`

### 2. Configurar Build

- **Framework Preset:** Vite (detectado automaticamente)
- **Root Directory:** `frontend` ⚠️ **CRÍTICO**
- **Build Command:** (deixar vazio, Vite detecta automaticamente)
- **Output Directory:** `dist` (padrão do Vite)

### 3. Adicionar Variáveis de Ambiente

No Vercel, vá em **Settings** → **Environment Variables** e adicione:

```
VITE_API_URL = https://seu-backend.onrender.com
VITE_GOOGLE_MAPS_API_KEY = sua_chave_google_maps_aqui
```

**⚠️ IMPORTANTE:**
- Substitua `seu-backend.onrender.com` pela URL real do seu backend no Render
- Se não tiver a chave do Google Maps ainda, pode deixar vazia (terá fallback)

### 4. Deploy

1. Clique em **"Deploy"**
2. Aguarde o build
3. Copie a URL do deploy (ex: `https://dirce.vercel.app`)

### 5. Atualizar Backend

No Render, atualize a variável de ambiente do backend:

```
FRONTEND_URL = https://seu-app.vercel.app
```

Isso permite que o backend aceite requisições do frontend (CORS).

## ✅ Checklist

- [ ] Projeto criado no Vercel
- [ ] Root Directory: `frontend`
- [ ] `VITE_API_URL` configurada com URL do backend
- [ ] `VITE_GOOGLE_MAPS_API_KEY` configurada (opcional)
- [ ] Build funcionando
- [ ] URL do frontend copiada
- [ ] `FRONTEND_URL` atualizado no Render

## 🐛 Troubleshooting

### Build Fails

**Erro:** `Cannot find module`
- Verifique se o Root Directory está como `frontend`
- Teste build local: `cd frontend && npm run build`

**Erro:** `VITE_API_URL is not defined`
- Adicione a variável no Vercel
- Certifique-se de que está no formato `VITE_*`

### CORS Error

- Verifique se `FRONTEND_URL` está correto no Render
- Verifique se a URL do Vercel está no formato `https://`
- Verifique logs do backend no Render

### Google Maps não funciona

- Verifique se a chave está correta
- Verifique se a Geocoding API está ativada
- Verifique se a chave não tem restrições que bloqueiam o Vercel
- Se não tiver chave, o app funciona com coordenadas mockadas

## 📝 Notas

- O Vercel detecta automaticamente o Vite
- Não precisa configurar `vercel.json` manualmente (já está configurado)
- As variáveis `VITE_*` são expostas no build-time
- Após mudar variáveis, faça um novo deploy
