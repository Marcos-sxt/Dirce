# Comparação: Railway vs Render (Free Tier)

**Data:** 27/01/2025

---

## 📊 Comparação Rápida

### Railway (Free Tier)
- **Uptime:** 500 horas/mês (~20 dias)
- **Sleep/Inatividade:** ❌ Não dorme por inatividade
- **Limite:** Após 500h, pausa até próximo ciclo
- **SLA:** 99.9% uptime (planos pagos)

### Render (Free Tier)
- **Uptime:** 750 horas/mês (~31 dias)
- **Sleep/Inatividade:** ✅ **DORME após 15 min de inatividade**
- **Limite:** Permanece ativo o mês todo (se usado)
- **SLA:** 99.95% uptime (planos pagos)

---

## ⚠️ Problema do Render

**Render Free Tier:**
- ✅ 750 horas/mês (mais que Railway)
- ❌ **DORME após 15 minutos sem requisições**
- ❌ Primeira requisição após sleep demora ~30-60s (cold start)
- ❌ Ruim para demos ao vivo

**Railway Free Tier:**
- ✅ 500 horas/mês (menos que Render)
- ✅ **NÃO dorme por inatividade**
- ✅ Sempre pronto (sem cold start)
- ✅ Melhor para demos ao vivo

---

## 🎯 Recomendação para Hackathon

### Railway (Recomendado)
- ✅ Não dorme
- ✅ Sempre pronto para demo
- ✅ Sem cold start
- ⚠️ 500h/mês (suficiente para hackathon)

### Render (Não recomendado para demo)
- ❌ Dorme após 15 min
- ❌ Cold start lento
- ❌ Pode falhar durante apresentação
- ✅ 750h/mês (mais horas, mas inútil se dormir)

---

## 💰 Planos Pagos

### Railway
- **Starter:** $5/mês
- Uptime 24/7
- Sem limites de horas

### Render
- **Starter:** $7/mês
- Uptime 24/7
- Sem sleep

---

## 🎯 Conclusão

**Para hackathon/demo:**
- ✅ **Railway é melhor** (não dorme)
- ❌ Render pode falhar durante apresentação (sleep)

**Para produção:**
- Ambos são bons
- Escolha baseado em preço/features

---

## 📝 Nota

Se usar Railway free tier:
- 500 horas = ~20 dias contínuos
- Suficiente para hackathon (36h)
- Se precisar mais, upgrade para $5/mês


