# Ajuste: Sempre Mostrar 5 Estações Mais Próximas

**Data:** 27/01/2025  
**Status:** ✅ Implementado

---

## 🎯 Problema

O sistema estava mostrando "Nenhuma estação encontrada" quando não havia estações dentro do raio de 5km.

## ✅ Solução

### 1. **Backend Atualizado** (`stations.service.ts`)

**Antes:**
- Filtrava por raio e retornava apenas estações dentro do raio
- Se não encontrasse nenhuma, retornava array vazio

**Depois:**
- Calcula distância de todas as estações
- Ordena por distância
- Tenta pegar dentro do raio primeiro
- **Se não tiver suficientes, pega as N mais próximas mesmo fora do raio**
- Sempre retorna pelo menos as 5 mais próximas

**Código:**
```typescript
// Primeiro tenta pegar dentro do raio
const withinRadius = stationsWithDistance.filter(
  (station) => station.distance <= radius,
);

// Se tiver menos que o limite dentro do raio, pega as mais próximas mesmo fora do raio
if (withinRadius.length >= limit) {
  return withinRadius.slice(0, limit);
} else {
  // Retorna as N mais próximas, mesmo que estejam além do raio
  return stationsWithDistance.slice(0, limit);
}
```

### 2. **Frontend Atualizado** (`Stations.tsx`)

**Mudanças:**
- Raio aumentado para 50km (garantir que encontre)
- Limit fixo em 5 (sempre mostrar 5 mais próximas)

**Código:**
```typescript
const nearbyStations = await getNearbyStations({
  lat: userLocation.lat,
  lng: userLocation.lng,
  radius: 50000, // 50km (raio grande para garantir)
  limit: 5, // Sempre mostrar 5 mais próximas
});
```

---

## 📊 Comportamento Agora

### Cenário 1: Estações dentro de 5km
- Retorna as 5 mais próximas dentro do raio

### Cenário 2: Poucas estações dentro de 5km
- Retorna as que estão dentro do raio + as mais próximas fora do raio
- Total: sempre 5 (ou menos se não houver 5 no banco)

### Cenário 3: Nenhuma estação dentro de 5km
- Retorna as 5 mais próximas mesmo que estejam longe
- Exemplo: se a mais próxima estiver a 10km, mostra ela

---

## ✅ Resultado

Agora o sistema **sempre mostra as 5 estações mais próximas**, independente da distância.

**Exemplo:**
- Usuário em "Avenida Ataulfo de Paiva" (Rio de Janeiro)
- Não há estações em Curitiba próximas
- Sistema mostra as 5 estações de Curitiba mais próximas (mesmo que estejam a 100km+)

---

## 🧪 Teste

1. Fale qualquer endereço
2. Confirme
3. Deve sempre mostrar 5 estações (ou menos se não houver 5 no banco)
4. Ordenadas por distância (mais próxima primeiro)

---

## 📝 Notas

- O seed criou 10 estações em Curitiba
- Todas as estações têm coordenadas reais
- Sistema calcula distância usando fórmula de Haversine
- Distância mostrada em metros (convertida para km se > 1000m)

---

## ✅ Status

- [x] Backend sempre retorna 5 mais próximas
- [x] Frontend busca com raio grande
- [x] Seed executado (10 estações criadas)
- [x] Testado e funcionando

**Tudo pronto!** 🎉

