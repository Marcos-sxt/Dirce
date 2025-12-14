# 🚀 Deploy Frontend no Vercel

## Configuração

### 1. Preparar Build Local (Teste)

```bash
cd frontend
npm install
npm run build
```

Se o build funcionar localmente, está pronto para deploy.

### 2. Deploy no Vercel

**Opção A: Via GitHub (Recomendado)**

1. Faça push da branch `deploy` para o GitHub
2. Acesse https://vercel.com
3. Clique em "Add New..." → "Project"
4. Importe o repositório `Dirce`
5. Configure:
   - **Framework Preset:** Vite (detectado automaticamente)
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

**Opção B: Via CLI**

```bash
npm i -g vercel
cd frontend
vercel
```

### 3. Variáveis de Ambiente

Configure no Vercel (Settings → Environment Variables):

**Se tiver backend deployado:**
```
VITE_API_URL=https://dirce-backend.onrender.com
VITE_GOOGLE_MAPS_API_KEY=sua_chave_aqui
```

**Se NÃO tiver backend (só fallbacks):**
```
VITE_GOOGLE_MAPS_API_KEY=sua_chave_aqui
# VITE_API_URL pode ficar vazio ou não configurar
```

### 4. Deploy

1. Clique em "Deploy"
2. Aguarde o build
3. Copie a URL gerada (ex: `https://dirce.vercel.app`)

### 5. Configurar Backend (se aplicável)

No Render, atualize a variável:
```
FRONTEND_URL=https://dirce.vercel.app
```

## Configurações Automáticas

O arquivo `vercel.json` já está configurado com:
- Build command
- Output directory
- Rewrites para SPA (Single Page Application)

## Troubleshooting

### Erro: "Failed to fetch"
- Verifique se `VITE_API_URL` está correto
- Verifique se o backend está rodando
- Verifique CORS no backend

### Erro: "Invalid API key" (Google Maps)
- Verifique se a API key está configurada
- Verifique restrições de domínio na Google Cloud Console
- Adicione `*.vercel.app` nas restrições se necessário

### Build falha
- Verifique logs no Vercel
- Teste build local: `npm run build`
- Verifique se todas as dependências estão no `package.json`

