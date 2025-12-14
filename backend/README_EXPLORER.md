# 🔗 Como Ver no Explorer - GUIA RÁPIDO

## ⚡ COMANDO MAIS SIMPLES

```bash
npm run stellar:links
```

**Isso mostra os links PRONTOS para copiar e colar!**

---

## 📋 O Que Você Precisa Saber

### Na Stellar NÃO tem "contrato" como Ethereum

O que temos:
- **Issuer Wallet**: A wallet que emite os tokens (equivalente ao "contrato")
- **Asset REFEICAO**: O token customizado

### Como Descobrir o Issuer Public Key

**Opção 1: Script automático (MAIS FÁCIL)**
```bash
npm run stellar:links
```

**Opção 2: Ver no .env**
```bash
# Se você rodou npm run setup:issuer, o issuer está no .env
# Mas o .env tem a SECRET key, não a PUBLIC key
# Melhor usar o script mesmo
```

**Opção 3: Script completo**
```bash
npm run stellar:info
# Mostra TUDO: issuer, estações, usuários, transações
```

---

## 🎯 Links Diretos (Depois de rodar setup)

Depois de rodar `npm run setup:stellar`, você verá algo assim:

```
🔗 LINKS DO EXPLORER

1️⃣  WALLET ISSUER:
   👉 https://stellar.expert/explorer/testnet/account/GABC123...

2️⃣  ASSET REFEICAO:
   👉 https://stellar.expert/explorer/testnet/asset/REFEICAO-GABC123...
```

**Só copiar e colar no navegador!**

---

## ❓ FAQ

**P: Como sei qual é o issuer?**
R: Rode `npm run stellar:links` - mostra o link direto!

**P: O link não funciona?**
R: Verifique se rodou `npm run setup:issuer` e configurou o `.env`

**P: Quero ver tudo de uma vez**
R: Rode `npm run stellar:info` - mostra issuer, estações, usuários, transações

---

## 🚀 Resumo

1. **Setup:** `npm run setup:issuer` → `npm run setup:stellar`
2. **Ver links:** `npm run stellar:links`
3. **Copiar e colar no navegador!**

**FIM!** 🎉

