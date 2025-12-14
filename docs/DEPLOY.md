# 🚀 Guia de Deploy - Dirce

**Análise de dependências e opções de deploy**

---

## 📊 Dependências do Frontend com Backend

### ✅ Funciona SEM Backend:
1. **Reconhecimento de Voz (STT)**
   - Web Speech API (nativo do navegador)
   - Não precisa de backend

2. **Geocoding**
   - Google Maps Geocoding API (chamada direta do frontend)
   - Não precisa de backend

3. **Fallbacks**
   - Dados mockados se backend não responder
   - Sistema tem fallbacks em todas as páginas

### ❌ Precisa de Backend:
1. **Busca de Estações** (`/stations`)
   - `GET /stations/nearby` - Busca estações próximas
   - **Fallback:** Usa dados mockados se erro

2. **Navegação** (`/navigation`)
   - `GET /stations/:id` - Busca estação por ID
   - **Fallback:** Redireciona para `/stations` se erro

3. **TTS (Text-to-Speech)**
   - `POST /elevenlabs/text-to-speech` - Gera áudio
   - **Status:** Implementado mas não usado no fluxo principal

---

## 🎯 Opções de Deploy

### Opção 1: Deploy Completo (Recomendado)

**Frontend:** Vercel  
**Backend:** Railway / Render / Fly.io

**Configuração:**
1. Deploy backend primeiro
2. Obter URL do backend (ex: `https://dirce-backend.railway.app`)
3. Configurar no Vercel:
   ```
   VITE_API_URL=https://dirce-backend.railway.app
   VITE_GOOGLE_MAPS_API_KEY=sua_chave
   ```

**Vantagens:**
- ✅ Funcionalidade completa
- ✅ Dados reais do banco
- ✅ Busca de estações funcionando

---

### Opção 2: Deploy Frontend com Fallbacks (Demo)

**Frontend:** Vercel  
**Backend:** Não precisa (usa fallbacks)

**Configuração:**
1. Deploy no Vercel
2. Configurar apenas:
   ```
   VITE_GOOGLE_MAPS_API_KEY=sua_chave
   ```
3. Não configurar `VITE_API_URL` (ou deixar vazio)

**Comportamento:**
- ✅ Voz funciona (Web Speech API)
- ✅ Geocoding funciona (Google Maps)
- ⚠️ Estações: usa dados mockados (fallback)
- ⚠️ Navigation: redireciona se não encontrar estação

**Vantagens:**
- ✅ Deploy rápido
- ✅ Funciona para demo básica
- ✅ Não precisa manter backend rodando

**Desvantagens:**
- ❌ Não mostra estações reais do banco
- ❌ Navigation pode não funcionar perfeitamente

---

### Opção 3: Deploy Backend Local + Frontend Vercel

**Frontend:** Vercel  
**Backend:** Local (túnel ngrok)

**Configuração:**
1. Rodar backend local
2. Criar túnel ngrok: `ngrok http 3001`
3. Configurar no Vercel:
   ```
   VITE_API_URL=https://seu-tunel.ngrok.io
   ```

**Vantagens:**
- ✅ Funcionalidade completa
- ✅ Não precisa deploy do backend

**Desvantagens:**
- ❌ Precisa manter backend local rodando
- ❌ Túnel ngrok pode cair
- ❌ Não ideal para demo

---

## 🚀 Deploy no Vercel (Passo a Passo)

### 1. Preparar Frontend

```bash
cd frontend-lovable
npm run build  # Testar build localmente
```

### 2. Deploy no Vercel

**Opção A: Via CLI**
```bash
npm i -g vercel
cd frontend-lovable
vercel
```

**Opção B: Via GitHub**
1. Push para GitHub
2. Conectar repositório no Vercel
3. Configurar variáveis de ambiente

### 3. Variáveis de Ambiente no Vercel

**Se tiver backend deployado:**
```
VITE_API_URL=https://seu-backend.railway.app
VITE_GOOGLE_MAPS_API_KEY=AIzaSyDjD0-E6rkSJ2W9PaD-kQ5hgikNYEa8EFE
```

**Se NÃO tiver backend (só fallbacks):**
```
VITE_GOOGLE_MAPS_API_KEY=AIzaSyDjD0-E6rkSJ2W9PaD-kQ5hgikNYEa8EFE
# VITE_API_URL não precisa (ou deixar vazio)
```

### 4. Build Settings

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

---

## 🔧 Deploy do Backend (Opcional)

### Railway (Recomendado)

1. Criar conta em https://railway.app
2. New Project → Deploy from GitHub
3. Conectar repositório
4. Configurar variáveis de ambiente:
   ```
   DATABASE_URL=postgresql://... (Railway cria automaticamente)
   ELEVENLABS_API_KEY=xxx
   STELLAR_SECRET_KEY=xxx
   STELLAR_NETWORK=testnet
   PORT=3001
   ```
5. Deploy automático

### Render

1. Criar conta em https://render.com
2. New Web Service
3. Conectar GitHub
4. Configurar:
   - Build: `npm install && npm run build`
   - Start: `npm run start:prod`
   - Environment: Node

---

## ✅ Checklist de Deploy

### Frontend (Vercel):
- [ ] Build local funciona (`npm run build`)
- [ ] Variáveis de ambiente configuradas
- [ ] Google Maps API key configurada
- [ ] Backend URL configurada (se tiver backend)

### Backend (se deployar):
- [ ] Banco de dados configurado
- [ ] Migrations aplicadas
- [ ] Seed executado
- [ ] Variáveis de ambiente configuradas
- [ ] CORS configurado para domínio do Vercel

---

## 🎯 Recomendação para Hackathon

**Para demo rápida:**
- ✅ Deploy frontend no Vercel
- ✅ Usar fallbacks (não precisa backend)
- ✅ Configurar apenas Google Maps API key

**Para demo completa:**
- ✅ Deploy frontend no Vercel
- ✅ Deploy backend no Railway
- ✅ Configurar ambas as URLs

---

## 📝 Notas Importantes

1. **CORS:**
   - Backend precisa aceitar domínio do Vercel
   - Atualizar `main.ts` para incluir domínio de produção

2. **HTTPS:**
   - Vercel usa HTTPS automaticamente
   - Web Speech API requer HTTPS (funciona no Vercel)

3. **API Keys:**
   - Google Maps: configurar restrições de domínio
   - Eleven Labs: pode deixar sem restrições para demo

4. **Build:**
   - Vercel detecta Vite automaticamente
   - Build deve funcionar sem configuração extra

---

## 🐛 Troubleshooting

### Erro: "Failed to fetch"
- Verificar se `VITE_API_URL` está correto
- Verificar CORS no backend
- Verificar se backend está rodando

### Erro: "Invalid API key"
- Verificar se Google Maps API key está configurada
- Verificar restrições de domínio na API key

### Estações não aparecem
- Verificar se backend está respondendo
- Verificar logs do console
- Sistema usa fallback automaticamente

