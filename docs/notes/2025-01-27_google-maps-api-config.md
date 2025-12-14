# Configuração: Google Maps API para Geocoding

**Data:** 27/01/2025  
**API Usada:** Geocoding API

---

## ✅ API Correta

Estamos usando a **Geocoding API**, que é exatamente a que precisamos:

> "Convert addresses into geographic coordinates (geocoding), which you can use to place markers or position the map."

**Endpoint usado:**
```
https://maps.googleapis.com/maps/api/geocode/json
```

---

## 🔧 Como Configurar

### 1. **Ativar Geocoding API no Google Cloud Console**

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Selecione seu projeto (ou crie um novo)
3. Vá em **APIs & Services** > **Library**
4. Procure por **"Geocoding API"**
5. Clique em **Enable**

### 2. **Criar API Key**

1. Vá em **APIs & Services** > **Credentials**
2. Clique em **Create Credentials** > **API Key**
3. Copie a chave gerada

### 3. **Configurar no Frontend**

Adicione no `.env` do frontend:

```env
VITE_GOOGLE_MAPS_API_KEY=sua_chave_aqui
```

### 4. **Restringir API Key (Recomendado para Produção)**

Para segurança, restrinja a chave:

1. Clique na chave criada
2. Em **API restrictions**, selecione **Restrict key**
3. Escolha apenas **Geocoding API**
4. Em **Application restrictions**, configure:
   - **HTTP referrers** (para web)
   - Ou **IP addresses** (para servidor)

---

## 📊 Outras APIs Úteis (Futuro)

### Para Navegação:
- **Directions API** - Calcular rotas
- **Routes API** (v2) - Versão nova do Directions

### Para Busca de Lugares:
- **Places API (New)** - Buscar restaurantes, pontos de interesse
- **Places API** (legacy) - Versão antiga

### Para Mapas:
- **Maps JavaScript API** - Mostrar mapas interativos
- **Maps Embed API** - Embed simples (já usamos no Navigation)

---

## 💰 Custos

**Geocoding API:**
- Primeiros $200/mês são gratuitos
- Depois: $5.00 por 1,000 requisições
- Para hackathon/demo: mais que suficiente

**Limite gratuito:**
- ~40,000 requisições/mês (dentro do crédito de $200)

---

## ✅ Status Atual

- [x] Código usando Geocoding API corretamente
- [x] Fallback implementado (funciona sem API key)
- [ ] API Key precisa ser configurada no `.env`
- [ ] Geocoding API precisa ser ativada no Google Cloud

---

## 🧪 Testar

### Sem API Key:
```bash
# Funciona com fallback (coordenadas de Curitiba)
# Não precisa configurar nada
```

### Com API Key:
```bash
# 1. Ativar Geocoding API no Google Cloud
# 2. Criar API Key
# 3. Adicionar no .env:
VITE_GOOGLE_MAPS_API_KEY=sua_chave_aqui

# 4. Testar:
# Fale: "Avenida Ataulfo de Paiva"
# Deve geocodificar corretamente
```

---

## 📝 Nota

Para o hackathon, o fallback funciona perfeitamente. A API key é opcional, mas melhora a precisão do geocoding.

