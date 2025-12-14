# Fluxo: Página de Confirmação e Próximos Passos

**Data:** 27/01/2025  
**Status:** 📋 Análise do fluxo atual

---

## 🔄 Fluxo Atual

### 1. **Página Listening** (`/listening`)
- ✅ Usuário fala localização
- ✅ Reconhecimento de voz captura texto
- ✅ Navega para `/confirm` com `state: { transcript }`

### 2. **Página Confirm** (`/confirm`)
- ✅ Recebe `transcript` do estado de navegação
- ✅ Mostra localização reconhecida
- ✅ Botões: "Errado" (volta para `/listening`) ou "Correto" (vai para `/stations`)

### 3. **Página Stations** (`/stations`)
- ⚠️ **PROBLEMA:** Usa dados mockados (`mockStations`)
- ⚠️ **PROBLEMA:** Não usa a localização do usuário
- ⚠️ **PROBLEMA:** Não busca estações reais do backend
- ✅ Mostra lista de estações
- ✅ Ao clicar em uma estação, vai para `/navigation?stationId=X`

### 4. **Página Navigation** (`/navigation`)
- ✅ Mostra mapa com rota para estação
- ✅ Usa Google Maps

### 5. **Página Payment** (`/payment`)
- ✅ Simula pagamento NFC
- ✅ Mostra transação

---

## ❌ Problemas Identificados

### 1. **Página Confirm → Stations**
- ❌ Localização do usuário é perdida
- ❌ Não passa coordenadas para buscar estações próximas
- ❌ Stations usa dados mockados fixos

### 2. **Geocoding (Endereço → Coordenadas)**
- ❌ Não converte "Avenida Ataulfo de Paiva" em lat/lng
- ❌ Precisa usar Google Maps Geocoding API

### 3. **Busca de Estações**
- ❌ Não chama backend `/stations/nearby`
- ❌ Não passa lat/lng do usuário

---

## ✅ O Que Precisa Ser Implementado

### 1. **Geocoding no Confirm**
```typescript
// Converter endereço em coordenadas
const geocodeAddress = async (address: string) => {
  // Usar Google Maps Geocoding API
  // Retornar { lat, lng }
};
```

### 2. **Passar Coordenadas para Stations**
```typescript
// Confirm → Stations
navigate("/stations", { 
  state: { 
    transcript,
    userLocation: { lat, lng }
  } 
});
```

### 3. **Buscar Estações Reais no Stations**
```typescript
// Stations.tsx
const { userLocation } = useLocation().state || {};

useEffect(() => {
  if (userLocation) {
    // Buscar estações próximas do backend
    getNearbyStations({
      lat: userLocation.lat,
      lng: userLocation.lng,
      radius: 5000, // 5km
      limit: 10
    }).then(setStations);
  } else {
    // Fallback: usar mockados
    setStations(mockStations);
  }
}, [userLocation]);
```

---

## 🎯 Fluxo Ideal (Para Implementar)

1. **Listening** → Captura "Avenida Ataulfo de Paiva"
2. **Confirm** → 
   - Mostra localização
   - Ao confirmar: geocodifica endereço → obtém lat/lng
   - Navega para Stations com coordenadas
3. **Stations** →
   - Busca estações próximas do backend usando lat/lng
   - Mostra lista ordenada por distância
4. **Navigation** → Mostra rota no mapa
5. **Payment** → Processa pagamento

---

## 📝 Próximos Passos

1. ✅ Implementar geocoding no Confirm
2. ✅ Passar coordenadas para Stations
3. ✅ Buscar estações reais do backend
4. ✅ Ordenar por distância
5. ✅ Mostrar distância e tempo estimado

---

## 🔧 APIs Necessárias

### Google Maps Geocoding API
- Endpoint: `https://maps.googleapis.com/maps/api/geocode/json`
- Parâmetros: `address`, `key`
- Retorna: `{ lat, lng }`

### Backend `/stations/nearby`
- Endpoint: `GET /stations/nearby?lat=X&lng=Y&radius=5000`
- Retorna: Lista de estações próximas

---

## ✅ Status Atual

- [x] Listening funciona
- [x] Confirm mostra localização
- [x] Stations mostra lista (mockada)
- [ ] Geocoding não implementado
- [ ] Busca real de estações não implementada
- [ ] Coordenadas não são passadas entre páginas

