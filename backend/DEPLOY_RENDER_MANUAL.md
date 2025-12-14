# 🚀 Deploy Manual no Render (Se render.yaml não funcionar)

Se o `render.yaml` não estiver funcionando, configure manualmente no dashboard do Render:

## Passo a Passo Manual

### 1. Criar Web Service

1. Acesse https://render.com
2. Clique em **"New +"** → **"Web Service"** (NÃO use Blueprint)
3. Conecte seu repositório GitHub
4. Selecione o repositório `Dirce`

### 2. Configurações Básicas

- **Name:** `dirce-backend`
- **Environment:** `Node`
- **Region:** Escolha a mais próxima
- **Branch:** `deploy`
- **Root Directory:** `backend` ⚠️ **IMPORTANTE**

### 3. Build & Start

- **Build Command:** `npm run build`
- **Start Command:** `npm run start:prod`

### 4. Variáveis de Ambiente

Adicione manualmente:

```
NODE_ENV=production
PORT=10000
ELEVENLABS_API_KEY=sua_chave_aqui (ou deixe vazio)
FRONTEND_URL=https://placeholder.vercel.app (atualizar depois)
```

### 5. Deploy

1. Clique em **"Create Web Service"**
2. Aguarde o build
3. Copie a URL gerada

## Por que Manual?

O Render às vezes tem problemas com `render.yaml` quando:
- O arquivo está na raiz mas o serviço precisa do `rootDir`
- Há problemas de parsing do YAML
- O Blueprint não está lendo corretamente

Configurar manualmente garante que tudo funcione!

