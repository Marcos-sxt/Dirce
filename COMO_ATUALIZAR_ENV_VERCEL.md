# 🔧 Como Atualizar Variáveis de Ambiente no Vercel

## 📋 Passo a Passo

### 1. Acesse o Dashboard do Vercel

1. Vá para https://vercel.com
2. Faça login na sua conta
3. Clique no projeto **Dirce** (ou o nome do seu projeto)

### 2. Vá para Settings

1. No menu superior, clique em **"Settings"**
2. No menu lateral esquerdo, clique em **"Environment Variables"**

### 3. Adicionar/Editar Variável

**Para adicionar uma nova variável:**
1. Role até a seção de variáveis
2. Clique em **"Add New"** ou **"Add"**
3. Preencha:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://dirce.onrender.com`
   - **Environment:** Selecione todas as opções (Production, Preview, Development)
4. Clique em **"Save"**

**Para editar uma variável existente:**
1. Encontre a variável `VITE_API_URL` na lista
2. Clique nos **três pontinhos** (⋯) ao lado dela
3. Clique em **"Edit"**
4. Atualize o **Value** para `https://dirce.onrender.com`
5. Clique em **"Save"**

### 4. Fazer Novo Deploy

**Opção 1: Redeploy Manual**
1. Vá para a aba **"Deployments"** no menu superior
2. Encontre o último deployment
3. Clique nos **três pontinhos** (⋯) ao lado dele
4. Clique em **"Redeploy"**
5. Confirme o redeploy

**Opção 2: Push para Git (Redeploy Automático)**
1. Faça qualquer commit pequeno no repositório
2. Push para a branch conectada ao Vercel
3. O Vercel fará deploy automaticamente com as novas variáveis

**Opção 3: Aguardar Redeploy Automático**
- O Vercel pode fazer redeploy automaticamente após mudanças nas variáveis
- Mas é mais seguro fazer manualmente

## ✅ Verificar se Funcionou

1. Após o deploy, acesse a URL do seu app no Vercel
2. Abra o **Console do Navegador** (F12 → Console)
3. Verifique se não há erros de CORS ou conexão
4. Teste uma funcionalidade que usa a API (ex: buscar estações)

## 🔍 Variáveis que Você Precisa

```
VITE_API_URL = https://dirce.onrender.com
VITE_GOOGLE_MAPS_API_KEY = sua_chave_aqui (opcional)
```

## ⚠️ Importante

- Variáveis que começam com `VITE_` são expostas no build-time
- Após mudar variáveis, **sempre faça um novo deploy**
- Variáveis antigas continuam no build anterior até fazer redeploy
- O Vercel mostra um aviso quando variáveis mudam e pede redeploy

## 🐛 Troubleshooting

**Problema:** Variável não está sendo usada
- **Solução:** Certifique-se de fazer redeploy após mudar a variável

**Problema:** Erro de CORS
- **Solução:** Verifique se `FRONTEND_URL` no Render está com a URL correta do Vercel

**Problema:** API não responde
- **Solução:** Verifique se o backend está rodando no Render e se a URL está correta

