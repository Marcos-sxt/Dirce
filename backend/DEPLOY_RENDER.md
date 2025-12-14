# 🚀 Deploy Backend no Render - Dirce

## 📋 Variáveis de Ambiente Necessárias

### ✅ Obrigatórias

**`NODE_ENV`**
- Valor: `production`
- Define o ambiente de produção

**`PORT`**
- Valor: `10000` (ou deixe o Render definir automaticamente)
- Porta onde o backend vai rodar

**`ELEVENLABS_API_KEY`**
- Chave da API do Eleven Labs para TTS
- Obtenha em: https://elevenlabs.io/app/settings/api-keys
- **⚠️ IMPORTANTE:** Sem essa chave, o TTS não funcionará

**`FRONTEND_URL`**
- URL do frontend no Vercel
- Exemplo: `https://dirce.vercel.app`
- Usado para configurar CORS
- **⚠️ IMPORTANTE:** Atualize após fazer deploy do frontend

## 🎯 Passo a Passo no Render

### 1. Criar Web Service

1. Acesse https://render.com
2. Clique em **"New +"** → **"Web Service"** (NÃO "Blueprint")
3. Conecte o repositório `Marcos-sxt/Dirce`
4. Branch: `deploy`

### 2. Configurações Básicas

- **Name:** `dirce-backend`
- **Environment:** `Node`
- **Region:** Escolha a mais próxima ao Brasil
- **Branch:** `deploy`
- **Root Directory:** `backend` ⚠️ **CRÍTICO**

### 3. Build & Start Commands

**Build Command:**
```
npm run build:render
```

**Start Command:**
```
npm run start:prod
```

### 4. Adicionar Variáveis de Ambiente

No Render, vá em **Environment** e adicione:

```
NODE_ENV = production
PORT = 10000
ELEVENLABS_API_KEY = sua_chave_elevenlabs_aqui
FRONTEND_URL = https://placeholder.vercel.app
```

**⚠️ IMPORTANTE:**
- Substitua `sua_chave_elevenlabs_aqui` pela chave real
- `FRONTEND_URL` pode ser um placeholder inicial, mas atualize após o deploy do frontend

### 5. Deploy

1. Clique em **"Create Web Service"**
2. Aguarde o build (pode levar alguns minutos)
3. Copie a URL do serviço (ex: `https://dirce-backend.onrender.com`)

### 6. Atualizar Frontend

No Vercel, atualize a variável:

```
VITE_API_URL = https://dirce-backend.onrender.com
```

## ✅ Checklist

- [ ] Web Service criado no Render
- [ ] Root Directory: `backend`
- [ ] Build Command: `npm run build:render`
- [ ] Start Command: `npm run start:prod`
- [ ] `NODE_ENV` configurada
- [ ] `PORT` configurada (ou deixar automático)
- [ ] `ELEVENLABS_API_KEY` configurada
- [ ] `FRONTEND_URL` configurada (atualizar após deploy do frontend)
- [ ] Build funcionando
- [ ] URL do backend copiada
- [ ] `VITE_API_URL` atualizada no Vercel

## 🐛 Troubleshooting

### Build Fails: "nest: not found"

**Causa:** O Render não está encontrando o `nest` CLI.

**Solução:** O script `build:render` já resolve isso usando `npx nest build`. Certifique-se de que o Build Command está como:
```
npm run build:render
```

### Build Fails: "stations.json not found"

**Causa:** O arquivo JSON não está sendo copiado para o `dist`.

**Solução:** O `nest-cli.json` já está configurado para copiar JSONs. Verifique se o arquivo existe em `backend/src/data/stations.json`.

### CORS Error

**Causa:** O `FRONTEND_URL` não está configurado corretamente.

**Solução:**
- Verifique se `FRONTEND_URL` está no formato `https://seu-app.vercel.app`
- Verifique se a URL do Vercel está correta
- O backend aceita automaticamente qualquer domínio `.vercel.app`

### Port Already in Use

**Causa:** Conflito de porta.

**Solução:** Deixe o Render definir a porta automaticamente (remova `PORT` ou use `10000`).

### Eleven Labs API Error

**Causa:** Chave inválida ou sem créditos.

**Solução:**
- Verifique se a chave está correta
- Verifique se há créditos na conta do Eleven Labs
- Teste a chave localmente primeiro

## 📝 Notas

- O Render executa `npm install` automaticamente antes do build
- O script `build:render` garante que devDependencies sejam instaladas
- O `stations.json` é carregado automaticamente do arquivo estático
- Não é necessário banco de dados (usamos JSON)
- Não é necessário Stellar (está mockado)

## 🔄 Após Deploy do Frontend

1. Copie a URL do Vercel (ex: `https://dirce.vercel.app`)
2. No Render, atualize `FRONTEND_URL` com essa URL
3. Faça um novo deploy ou reinicie o serviço
4. Teste a conexão entre frontend e backend
