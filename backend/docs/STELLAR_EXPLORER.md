# 🔍 Como Ver no Stellar Explorer

Na Stellar, **não há contratos** como no Ethereum. O que temos é:

## 🪙 Asset REFEICAO

O "contrato" na Stellar é um **asset customizado** emitido por uma wallet issuer.

### Informações do Asset

- **Código:** `REFEICAO`
- **Issuer:** Public key da wallet que emite os tokens
- **Formato:** `REFEICAO-{ISSUER_PUBLIC_KEY}`

---

## 📋 Como Ver no Explorer

### 1. Ver Wallet Issuer (Emissor)

**URL:**
```
https://stellar.expert/explorer/testnet/account/{ISSUER_PUBLIC_KEY}
```

**O que você vê:**
- Saldo de XLM
- Saldo de tokens REFEICAO emitidos
- Histórico de transações
- Trustlines criadas

### 2. Ver Asset REFEICAO

**URL:**
```
https://stellar.expert/explorer/testnet/asset/REFEICAO-{ISSUER_PUBLIC_KEY}
```

**O que você vê:**
- Informações do asset
- Total emitido
- Wallets que têm o asset
- Transações do asset

### 3. Ver Wallet de Estação

**URL:**
```
https://stellar.expert/explorer/testnet/account/{STATION_WALLET}
```

**O que você vê:**
- Saldo de REFEICAO recebido
- Transações recebidas
- Trustline para REFEICAO

### 4. Ver Wallet de Usuário

**URL:**
```
https://stellar.expert/explorer/testnet/account/{USER_WALLET}
```

**O que você vê:**
- Saldo de REFEICAO
- Histórico de pagamentos
- Trustline para REFEICAO

### 5. Ver Transação Específica

**URL:**
```
https://stellar.expert/explorer/testnet/tx/{TRANSACTION_HASH}
```

**O que você vê:**
- Detalhes da transação
- Remetente e destinatário
- Quantidade transferida
- Timestamp
- Status (sucesso/falha)

---

## 🚀 Script Rápido

Para ver todas as informações de uma vez:

```bash
npm run stellar:info
```

Isso mostra:
- ✅ Public key do issuer
- ✅ Links do explorer para tudo
- ✅ Wallets das estações
- ✅ Wallets dos usuários demo
- ✅ Transações recentes

---

## 📝 Exemplo de URLs

Se o issuer for `GABC123...`, os links seriam:

- **Issuer:** https://stellar.expert/explorer/testnet/account/GABC123...
- **Asset:** https://stellar.expert/explorer/testnet/asset/REFEICAO-GABC123...
- **Estação:** https://stellar.expert/explorer/testnet/account/GXYZ789...
- **Usuário:** https://stellar.expert/explorer/testnet/account/GDEF456...
- **Transação:** https://stellar.expert/explorer/testnet/tx/abc123def456...

---

## 🔗 Outros Explorers

### Stellar Laboratory (Oficial)
```
https://laboratory.stellar.org/#explorer?resource=accounts&network=test
```

### Stellar Expert (Recomendado)
```
https://stellar.expert/explorer/testnet
```

---

## 💡 Dica

Após rodar `npm run setup:stellar`, todas as informações são mostradas no console, incluindo os links do explorer!

