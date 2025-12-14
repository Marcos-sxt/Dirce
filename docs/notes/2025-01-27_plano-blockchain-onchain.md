# Plano: Implementação Blockchain Onchain Real - Stellar

**Data:** 27/01/2025  
**Objetivo:** Implementar sistema de tokens REFEICAO na Stellar testnet

---

## 🎯 O Que Precisamos

### 1. Wallets Stellar (Testnet)

#### Wallet Issuer (Emissor)
- **Função:** Emite os tokens REFEICAO
- **Criar:** 1 wallet
- **Configurar:** Secret key no `.env` como `STELLAR_ISSUER_WALLET`
- **Fundos:** XLM de teste (via Friendbot)

#### Wallets das Estações
- **Função:** Recebem pagamentos dos usuários
- **Criar:** 1 wallet por estação (10-20 wallets)
- **Armazenar:** Public keys no banco (campo `stellarWallet` da tabela Station)
- **Fundos:** XLM de teste para reserva mínima (1 XLM cada)

#### Wallets dos Usuários (Demo)
- **Função:** Pagam pelas refeições
- **Criar:** 5-10 wallets para demo
- **Fundos:** XLM de teste + tokens REFEICAO emitidos
- **Armazenar:** Pode ser mockado ou salvo no banco

---

### 2. Asset Customizado REFEICAO

#### Criar Asset
- **Código:** REFEICAO
- **Issuer:** Wallet issuer criada
- **Precisão:** 2 casas decimais (ex: 10.50 REFEICAO)
- **Configurar:** No StellarService

#### Trustlines
- **O que é:** Permissão para receber o asset
- **Quem precisa:** Todas as wallets que vão receber REFEICAO
  - Wallets das estações
  - Wallets dos usuários (opcional, se quiserem ver saldo)
- **Como criar:** Operação `changeTrust` na Stellar

---

### 3. Emissão de Tokens

#### Para Usuários Demo
- **Quantidade:** 100 REFEICAO por wallet (inflado para demo)
- **Operação:** `payment` do issuer para cada wallet de usuário
- **Fazer:** Script de seed ou manual

#### Para Estações (Opcional)
- Pode deixar vazio (só recebem, não gastam)

---

### 4. Implementação Técnica

#### Backend - StellarService
- ✅ Já tem: `getBalance()`, `transferTokens()`, `createWallet()`
- ⏳ Adicionar: `createAsset()`, `setupTrustline()`, `issueTokens()`

#### Backend - TransactionsService
- ✅ Já tem: `processPayment()` (mockado)
- ⏳ Modificar: Usar transação real do Stellar
- ⏳ Adicionar: Validação de saldo real
- ⏳ Adicionar: Confirmação de transação onchain

#### Problema: Secret Key do Usuário
- **Desafio:** Para assinar transação, precisa da secret key
- **Soluções:**
  1. **Custódia (Backend):** Backend guarda secret keys (não ideal, mas funciona para MVP)
  2. **Custódia Parcial:** Backend assina com wallet do sistema
  3. **Mockado:** Para demo, simular transação mas mostrar hash real

---

### 5. Scripts de Setup

#### Script 1: Criar Wallets
```typescript
// Criar issuer, estações, usuários
// Salvar public keys no banco
// Fundar com XLM (Friendbot)
```

#### Script 2: Criar Asset REFEICAO
```typescript
// Criar asset customizado
// Configurar issuer
```

#### Script 3: Setup Trustlines
```typescript
// Criar trustlines para todas as wallets que precisam receber REFEICAO
```

#### Script 4: Emitir Tokens
```typescript
// Emitir REFEICAO para wallets de usuários demo
```

---

### 6. Fluxo de Pagamento Real

#### Atual (Mockado)
```
1. Usuário chega na estação
2. Backend valida saldo (mockado)
3. Cria transação mockada
4. Salva no banco
```

#### Novo (Onchain)
```
1. Usuário chega na estação
2. Backend consulta saldo real na Stellar
3. Valida saldo suficiente
4. Cria transação Stellar real
5. Assina com secret key do usuário (ou backend custódia)
6. Envia para Stellar network
7. Aguarda confirmação
8. Salva hash da transação no banco
9. Retorna confirmação
```

---

### 7. Checklist de Implementação

#### Fase 1: Setup Stellar (2-3h)
- [ ] Criar wallet issuer
- [ ] Configurar secret key no `.env`
- [ ] Fundar wallet com XLM (Friendbot)
- [ ] Criar asset REFEICAO
- [ ] Testar criação de asset

#### Fase 2: Wallets das Estações (1-2h)
- [ ] Criar script para gerar wallets
- [ ] Criar 10-20 wallets para estações
- [ ] Fundar com XLM (Friendbot)
- [ ] Criar trustlines para receber REFEICAO
- [ ] Salvar public keys no banco (seed de estações)

#### Fase 3: Wallets dos Usuários (1h)
- [ ] Criar 5-10 wallets para demo
- [ ] Fundar com XLM
- [ ] Criar trustlines
- [ ] Emitir tokens REFEICAO (100 cada)
- [ ] Armazenar secret keys (temporariamente, para demo)

#### Fase 4: Integração Real (2-3h)
- [ ] Modificar `processPayment()` para usar Stellar real
- [ ] Implementar custódia de secret keys (temporária)
- [ ] Testar transação end-to-end
- [ ] Adicionar tratamento de erros
- [ ] Adicionar confirmação de transação

#### Fase 5: Testes (1h)
- [ ] Testar pagamento completo
- [ ] Verificar saldo após transação
- [ ] Testar casos de erro (saldo insuficiente, etc.)
- [ ] Validar hash da transação na blockchain

---

### 8. Estrutura de Dados

#### Banco de Dados - Adicionar Campos

**Station:**
- ✅ `stellarWallet` (já existe) - Public key da estação

**User (opcional, para demo):**
- `stellarWallet` - Public key
- `stellarSecretKey` - Secret key (criptografada ou em variável de ambiente)
- `cardCode` - Código do cartão físico

**Transaction:**
- ✅ `stellarTxHash` (já existe) - Hash da transação real
- Adicionar: `confirmedAt` - Timestamp de confirmação

---

### 9. Segurança (Para Demo)

#### Secret Keys
- **Para MVP/Demo:** Armazenar em variável de ambiente ou banco (criptografado)
- **Em Produção:** Nunca armazenar secret keys no backend
- **Alternativa:** Usar custódia externa ou hardware wallet

#### Para Hackathon:
- Usar secret keys em `.env` (apenas para demo)
- Documentar que em produção usaria custódia segura
- Mostrar que transações são reais na blockchain

---

### 10. Recursos Necessários

#### Stellar Testnet
- [Friendbot](https://developers.stellar.org/docs/encyclopedia/testnet) - Para obter XLM de teste
- [Stellar Laboratory](https://laboratory.stellar.org/) - Para testar manualmente
- [Horizon Testnet](https://horizon-testnet.stellar.org/) - API pública

#### Documentação
- [Stellar SDK JS](https://stellar.github.io/js-stellar-sdk/)
- [Creating Assets](https://developers.stellar.org/docs/encyclopedia/assets)
- [Trustlines](https://developers.stellar.org/docs/encyclopedia/trustlines)

---

### 11. Comandos Úteis

#### Obter XLM de Teste
```bash
# Via Friendbot (API)
curl "https://friendbot.stellar.org/?addr=WALLET_ADDRESS"

# Ou via Stellar Laboratory (interface web)
```

#### Verificar Transação
```bash
# Via Horizon API
curl "https://horizon-testnet.stellar.org/transactions/TX_HASH"
```

---

### 12. Riscos e Mitigações

#### Risco: Rede Stellar Lenta
- **Mitigação:** Usar testnet (mais rápido que mainnet)
- **Fallback:** Timeout de 30s, retornar "pending" se demorar

#### Risco: Secret Key Exposta
- **Mitigação:** Usar apenas em `.env`, não commitar
- **Demo:** Aceitável para hackathon, documentar limitação

#### Risco: Wallet Sem Fundos
- **Mitigação:** Script verifica e funda automaticamente
- **Monitoramento:** Verificar saldos antes de transações

#### Risco: Trustline Não Criada
- **Mitigação:** Script de setup cria todas as trustlines
- **Validação:** Verificar trustline antes de pagar

---

### 13. Próximos Passos Imediatos

1. **Criar script de setup Stellar**
   - Gerar wallets
   - Criar asset
   - Setup trustlines
   - Emitir tokens

2. **Modificar TransactionsService**
   - Usar Stellar real ao invés de mock
   - Implementar custódia temporária

3. **Criar seed de dados**
   - Estações com wallets reais
   - Usuários demo com wallets e tokens

4. **Testar end-to-end**
   - Pagamento completo
   - Verificar na blockchain

---

## 🚀 Vamos Começar?

**Ordem sugerida:**
1. Criar wallet issuer e configurar
2. Criar asset REFEICAO
3. Criar script de setup (wallets + trustlines)
4. Modificar TransactionsService para usar Stellar real
5. Testar tudo

