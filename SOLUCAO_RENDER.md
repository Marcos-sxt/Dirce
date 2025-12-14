# 🔧 Solução: Erro no Render - "Running build command 'npm'"

## ❌ O Problema

O Render está executando apenas `npm` sem argumentos, quando deveria executar `npm run build`.

**Erro:**
```
==> Running build command 'npm'...
npm <command>
Usage: npm install...
```

## 🔍 Por Que Acontece?

O `render.yaml` está correto, mas o Render pode ter problemas ao ler o Blueprint automaticamente. Isso é comum quando:
- O arquivo está na raiz mas o serviço precisa de `rootDir`
- Há problemas de parsing do YAML no Blueprint
- O Render não detecta o arquivo corretamente

## ✅ Solução: Configurar Manualmente

**NÃO use Blueprint!** Configure manualmente no dashboard:

### Passo 1: Criar Web Service Manual

1. No Render, **CANCELE** qualquer Blueprint que esteja criando
2. Clique em **"New +"** → **"Web Service"** (NÃO "Blueprint")
3. Conecte o repositório `Marcos-sxt/Dirce`
4. Branch: `deploy`

### Passo 2: Configurações

**Básicas:**
- Name: `dirce-backend`
- Environment: `Node`
- Region: Escolha a mais próxima
- **Root Directory:** `backend` ⚠️ **CRÍTICO**

**Build & Start:**
- **Build Command:** `npm run build`
- **Start Command:** `npm run start:prod`

### Passo 3: Variáveis de Ambiente

Adicione manualmente:

```
NODE_ENV = production
PORT = 10000
ELEVENLABS_API_KEY = (deixe vazio por enquanto)
FRONTEND_URL = https://placeholder.vercel.app
```

### Passo 4: Deploy

1. Clique em **"Create Web Service"**
2. Aguarde o build
3. Deve funcionar! ✅

## 🎯 Por Que Manual Funciona?

- Você controla exatamente o que o Render executa
- Não depende do parsing do YAML
- Mais confiável para projetos com estrutura específica
- Você vê exatamente o que está sendo executado

## 📝 Depois do Deploy

1. Copie a URL do backend (ex: `https://dirce-backend.onrender.com`)
2. Use essa URL no Vercel como `VITE_API_URL`
3. Atualize `FRONTEND_URL` no Render com a URL do Vercel

