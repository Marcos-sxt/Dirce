# Debug: Estações Não Aparecem

**Data:** 27/01/2025  
**Problema:** "Nenhuma estação encontrada" mesmo com estações no banco

---

## 🔍 Checklist de Debug

### 1. **Verificar Backend está Rodando**
```bash
curl http://localhost:3001/stations
# Deve retornar JSON com estações
```

### 2. **Verificar Console do Navegador (F12)**
Agora os logs mostram:
- `📍 Buscando estações próximas a:` - coordenadas
- `🔍 Buscando estações:` - URL da requisição
- `📦 Dados recebidos do backend:` - resposta do backend
- `🏪 Estações encontradas:` - quantidade
- `✅ Estações formatadas:` - dados finais

### 3. **Verificar Geocoding**
- Abra Network tab no DevTools
- Veja requisição para Google Maps Geocoding API
- Verifique se retorna coordenadas corretas

### 4. **Verificar Estado de Navegação**
- No console: `location.state` deve ter `userLocation`
- Verificar se `lat` e `lng` estão corretos

---

## 🐛 Problemas Comuns

### Backend não está rodando
**Sintoma:** Erro de conexão no console
**Solução:** 
```bash
cd backend
npm run start:dev
```

### CORS bloqueando
**Sintoma:** Erro CORS no console
**Solução:** Verificar se backend tem CORS habilitado

### Coordenadas erradas
**Sintoma:** Geocoding retorna coordenadas de outro lugar
**Solução:** Verificar se API key está configurada e funcionando

### Backend retorna array vazio
**Sintoma:** Backend responde mas sem estações
**Solução:** 
```bash
cd backend
npm run seed
```

---

## 📝 Próximos Passos

1. Abrir console do navegador (F12)
2. Testar novamente com "Avenida Ataulfo de Paiva"
3. Verificar logs no console
4. Compartilhar logs para debug

