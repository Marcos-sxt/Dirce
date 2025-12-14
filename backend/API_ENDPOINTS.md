# API Endpoints - Backend Dirce

## Estações (Stations)

### GET /stations
Lista todas as estações

### GET /stations/nearby?lat={lat}&lng={lng}&radius={radius}&limit={limit}
Busca estações próximas
- `lat`: Latitude (obrigatório)
- `lng`: Longitude (obrigatório)
- `radius`: Raio em metros (opcional, padrão: 5000)
- `limit`: Número máximo de resultados (opcional, padrão: 5)

**Exemplo:**
```
GET /stations/nearby?lat=-25.4284&lng=-49.2733&radius=5000&limit=5
```

### GET /stations/:id
Busca estação por ID

---

## Eleven Labs (Áudio)

### POST /elevenlabs/speech-to-text
Converte áudio em texto (STT)
- Content-Type: `multipart/form-data`
- Campo: `audio` (arquivo de áudio)

**Exemplo:**
```bash
curl -X POST http://localhost:3001/elevenlabs/speech-to-text \
  -F "audio=@audio.mp3" \
  -H "Content-Type: multipart/form-data"
```

### POST /elevenlabs/text-to-speech
Converte texto em áudio (TTS)
- Body: JSON
  - `text`: Texto para converter (obrigatório)
  - `voiceId`: ID da voz (opcional)
  - `flash`: Usar modelo Flash para baixa latência (opcional, boolean)

**Exemplo:**
```bash
curl -X POST http://localhost:3001/elevenlabs/text-to-speech \
  -H "Content-Type: application/json" \
  -d '{"text": "Olá, como posso ajudar?", "flash": true}'
```

---

## Transações (Transactions)

### POST /transactions/process
Processa pagamento de uma refeição
- Body: JSON
  - `userWallet`: Wallet Stellar do usuário (obrigatório)
  - `stationId`: ID da estação (obrigatório)
  - `amount`: Quantidade de tokens REFEICAO (opcional, padrão: 1.0)

**Exemplo:**
```bash
curl -X POST http://localhost:3001/transactions/process \
  -H "Content-Type: application/json" \
  -d '{
    "userWallet": "GXXXXX...",
    "stationId": "uuid-da-estacao",
    "amount": 1.0
  }'
```

### POST /transactions/nfc-simulate
Simula pagamento via NFC (mockado)
- Body: JSON
  - `walletAddress`: Wallet Stellar do usuário (obrigatório)
  - `stationId`: ID da estação (obrigatório)
  - `amount`: Quantidade de tokens (opcional)

### GET /transactions/user/:wallet
Lista transações de um usuário

### GET /transactions/station/:stationId
Lista transações de uma estação

---

## Stellar (Blockchain)

### Nota: Endpoints Stellar serão adicionados conforme necessário
Por enquanto, o serviço Stellar é usado internamente pelos outros serviços.

---

## Status

- ✅ Estações: Implementado
- ✅ Eleven Labs (STT/TTS): Implementado
- ✅ Transações: Implementado
- ✅ Stellar Service: Implementado (uso interno)
- ⏳ Seed de dados: Pendente (estações mockadas)

