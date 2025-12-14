# 🔑 Variáveis de Ambiente - O que é Obrigatório?

## ✅ OBRIGATÓRIAS (Precisa preencher)

### 1. **FRONTEND_URL** ⚠️ IMPORTANTE
- **O que é:** URL do frontend no Vercel
- **Por que precisa:** Para configurar CORS corretamente
- **Exemplo:** `https://dirce.vercel.app`
- **O que fazer se não tiver ainda:** 
  - Deixe vazio por enquanto: `https://placeholder.vercel.app`
  - Depois que fizer deploy do frontend, atualize com a URL real

## ⚠️ OPCIONAIS (Pode deixar vazio)

### 2. **ELEVENLABS_API_KEY**
- **O que é:** Chave da API do Eleven Labs para TTS
- **Por que é opcional:** O app funciona sem, mas o TTS não vai funcionar
- **O que acontece sem ela:** 
  - O app inicia normalmente
  - Mas quando tentar falar, vai dar erro
  - Outras funcionalidades continuam funcionando
- **Para conseguir:**
  1. Acesse https://elevenlabs.io
  2. Crie conta (tem plano gratuito)
  3. Vá em Profile → API Key
  4. Copie a chave
- **Se não tiver agora:** Deixe vazio (vai dar warning mas não quebra)

## 📝 Resumo Rápido

### Mínimo para funcionar:
```
FRONTEND_URL=https://seu-app.vercel.app (ou placeholder)
```

### Para funcionar completo (com TTS):
```
FRONTEND_URL=https://seu-app.vercel.app
ELEVENLABS_API_KEY=sua_chave_aqui
```

## 🎯 Recomendação para Deploy Inicial

1. **Preencha obrigatória:**
   - `FRONTEND_URL`: Coloque um placeholder por enquanto (`https://placeholder.vercel.app`)

2. **Deixe opcional vazia:**
   - `ELEVENLABS_API_KEY`: Deixe vazio (pode adicionar depois)

3. **Depois do deploy:**
   - Adicione a chave do Eleven Labs quando conseguir
   - Atualize `FRONTEND_URL` com a URL real do Vercel

## ❌ Removidas (Não são mais necessárias)

- **DATABASE_URL**: Removida - não salvamos dados, estações vêm do seed
- **STELLAR_SECRET_KEY**: Removida - pagamentos são mockados no frontend
- **STELLAR_NETWORK**: Removida - não usamos blockchain real

## 🔄 Como Atualizar Depois

No Render, você pode atualizar variáveis de ambiente a qualquer momento:
1. Vá em Settings → Environment
2. Edite as variáveis
3. O serviço reinicia automaticamente

