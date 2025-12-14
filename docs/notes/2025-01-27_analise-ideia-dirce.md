# Análise da Ideia: Dirce - App de Estações de Alimentação

**Data:** 27/01/2025  
**Projeto:** Dirce  
**Contexto:** Hackathon Devs de Impacto - Insegurança Alimentar

---

## 📱 Conceito Atual

### Descrição
App web (mobile-oriented) que guia pessoas até estações de alimentação usando:
- **Tokens onchain** para rastreabilidade e antifraude
- **Cartão físico** distribuído pelo CRAS com saldo onchain
- **Interface por áudio** para acessibilidade
- **Integração com Google Maps** para navegação

### Jornada do Usuário
1. Página inicial com a Dirce
2. Usuário fala sua localização por áudio
3. Recebe estações mais próximas por áudio
4. Escolhe estação por áudio
5. Recebe link do Google Maps com destino marcado
6. Inicia jornada até o local
7. Chegando no local, interage e usa o cartão para "pagar" por uma refeição

---

## ✅ Pontos Fortes

1. **Acessibilidade**
   - Interface por áudio é inclusiva para pessoas com baixa alfabetização ou deficiência visual
   - Mobile-first atende ao público-alvo

2. **Rastreabilidade**
   - Blockchain para transparência e combate a fraudes
   - Integração com CRAS (política pública existente)

3. **Navegação Prática**
   - Integração com Google Maps facilita deslocamento
   - Foco em proximidade (estações mais próximas)

4. **Alinhamento com Hackathon**
   - Resolve problema de insegurança alimentar
   - Pode usar IA para processamento de voz
   - Impacto social mensurável

---

## ⚠️ Pontos de Atenção e Desafios

### 1. **Complexidade Técnica (36 horas)**
- **Blockchain/Onchain:** Implementar wallet, transações, e integração com cartão físico em 36h é muito desafiador
- **Sugestão:** Simplificar para MVP - usar sistema de tokens centralizado ou simular blockchain

### 2. **Infraestrutura Física**
- **Estações de alimentação:** Onde serão instaladas? Quem gerencia?
- **Cartões físicos:** Distribuição pelo CRAS requer parcerias pré-existentes
- **Sugestão:** Focar no app e simular/maquetar a infraestrutura física

### 3. **Processamento de Voz (IA)**
- **Requisito do hackathon:** Uso de IA
- **Desafio:** Implementar ASR (Automatic Speech Recognition) e TTS (Text-to-Speech) em português
- **Sugestão:** Usar APIs prontas (Google Speech-to-Text, OpenAI Whisper, Azure Speech)

### 4. **Geolocalização**
- **Precisão:** GPS em ambientes urbanos pode ter limitações
- **Privacidade:** Coleta de localização precisa de consentimento
- **Sugestão:** Usar HTML5 Geolocation API + fallback para entrada manual

### 5. **Modelo de Negócio/Parcerias**
- **Quem fornece as refeições?** Restaurantes, ONGs, governo?
- **Como funciona o "pagamento"?** É subsídio público?
- **Sugestão:** Definir modelo claro no pitch

---

## 💡 Sugestões de Melhoria

### MVP Simplificado (36h)
1. **App Web PWA** (Progressive Web App)
   - Funciona offline parcialmente
   - Instalável no celular
   - Mobile-first

2. **IA para Voz**
   - Usar API de Speech-to-Text (Google/OpenAI)
   - Usar API de Text-to-Speech
   - Processar localização e escolha por voz

3. **Sistema de Tokens Simplificado**
   - **Opção A:** Simular blockchain (mostrar conceito)
   - **Opção B:** Sistema centralizado com hash/criptografia para rastreabilidade
   - **Opção C:** QR Code no cartão físico que valida saldo via API

4. **Mapa de Estações**
   - Banco de dados de estações (mock ou real)
   - Cálculo de distância e rota
   - Integração com Google Maps

5. **Sistema de "Pagamento"**
   - QR Code no cartão
   - Leitura na estação
   - Validação de saldo
   - Dedução de tokens

### Funcionalidades Adicionais (Diferenciais)
1. **Histórico de Uso**
   - Rastreabilidade de refeições
   - Transparência para gestores públicos

2. **Notificações**
   - Lembrete de saldo baixo
   - Novas estações próximas
   - Ofertas especiais

3. **Gamificação**
   - Pontos por uso responsável
   - Badges de participação

4. **Dashboard para Gestores**
   - Visualização de uso por região
   - Análise de padrões
   - Prevenção de fraudes

---

## 🎯 Alinhamento com Hackathon

### Como a IA é Usada
1. **Processamento de Voz (ASR)**
   - Reconhecer localização falada
   - Compreender escolha de estação

2. **Síntese de Voz (TTS)**
   - Responder ao usuário por áudio
   - Narrar opções de estações

3. **Recomendação Inteligente**
   - Sugerir estações baseado em histórico
   - Otimizar rotas considerando trânsito

4. **Detecção de Fraudes (Opcional)**
   - Análise de padrões de uso
   - Alertas de comportamento suspeito

### Impacto Social Mensurável
- **Métricas:**
  - Número de pessoas atendidas
  - Redução de tempo de deslocamento
  - Taxa de uso vs. desperdício
  - Cobertura geográfica

---

## 🛠️ Stack Tecnológica Sugerida

### Frontend
- **Framework:** React ou Vue.js (PWA)
- **UI:** Tailwind CSS ou Material-UI
- **Maps:** Google Maps API ou Mapbox
- **Voz:** Web Speech API + fallback para APIs externas

### Backend
- **Runtime:** Node.js ou Python
- **API:** REST ou GraphQL
- **Banco de Dados:** PostgreSQL ou MongoDB
- **Blockchain (MVP):** Simulação ou integração com Polygon/Ethereum (testnet)

### IA/Voz
- **Speech-to-Text:** [A DEFINIR] Google Cloud Speech-to-Text, OpenAI Whisper API, ou Web Speech API
- **Text-to-Speech:** ✅ **Eleven Labs** (confirmado)
  - Modelos: Multilingual v2 ou Flash v2.5
  - SDKs: Python e TypeScript disponíveis
  - Pricing: Plano gratuito (10k créditos/mês) ou Creator (100k créditos/mês por US$ 22)
- **NLP:** Para processar intenções do usuário

### Infraestrutura
- **Hosting:** Vercel, Netlify, ou Railway
- **Blockchain:** ✅ **Stellar** (confirmado)
  - Taxas: 0,00001 XLM por transação (extremamente barato)
  - Reserva mínima: 1 XLM por conta
  - Ideal para alto volume de transações

---

## 📋 Checklist para Desenvolvimento

### Fase 1: Planejamento (2-4h)
- [ ] Definir escopo do MVP
- [ ] Escolher stack tecnológica
- [ ] Criar wireframes/mockups
- [ ] Definir estrutura de dados

### Fase 2: Desenvolvimento Core (20-24h)
- [ ] Setup do projeto (frontend + backend)
- [ ] Implementar autenticação básica
- [ ] Integrar API de voz (Speech-to-Text)
- [ ] Implementar busca de estações por localização
- [ ] Integrar Google Maps
- [ ] Sistema de tokens (simplificado)
- [ ] Interface de "pagamento" (QR Code)

### Fase 3: IA e Melhorias (6-8h)
- [ ] Melhorar processamento de voz
- [ ] Implementar TTS
- [ ] Adicionar recomendações inteligentes
- [ ] Dashboard básico de métricas

### Fase 4: Polimento e Pitch (4-6h)
- [ ] Testes e correções
- [ ] Preparar apresentação
- [ ] Documentação básica
- [ ] Demo funcional

---

## 🎤 Pitch Sugerido

### Problema
"X milhões de brasileiros enfrentam insegurança alimentar, mas têm dificuldade para acessar pontos de distribuição de refeições devido a falta de informação e barreiras de acessibilidade."

### Solução
"Dirce é um app acessível por voz que conecta pessoas em situação de vulnerabilidade a estações de alimentação próximas, usando tokens rastreáveis para garantir transparência e combater fraudes."

### Diferenciais
- Interface por voz (acessível)
- Rastreabilidade onchain
- Integração com políticas públicas (CRAS)
- Navegação inteligente

### Impacto
- Reduz tempo de deslocamento
- Aumenta acesso a alimentação
- Transparência para gestores
- Combate a fraudes

---

## 📚 Referências e Recursos

### APIs de Voz
- ✅ [Eleven Labs](https://elevenlabs.io/developers) (TTS - confirmado)
  - [Documentação da API](https://elevenlabs.io/docs/api-reference)
  - [Pricing](https://elevenlabs.io/pricing/api)
- **Speech-to-Text (a definir):**
  - [Google Cloud Speech-to-Text](https://cloud.google.com/speech-to-text)
  - [OpenAI Whisper API](https://openai.com/research/whisper)
  - [Azure Speech Services](https://azure.microsoft.com/services/cognitive-services/speech-services/)
  - [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) (gratuito, limitado)

### Blockchain
- ✅ [Stellar](https://developers.stellar.org/docs) (confirmado)
  - [Horizon API](https://developers.stellar.org/api)
  - [Testnet](https://developers.stellar.org/docs/encyclopedia/testnet)
  - [SDKs Disponíveis](https://developers.stellar.org/docs/software-and-sdks)

### Mapas
- [Google Maps Platform](https://developers.google.com/maps)
- [Mapbox](https://www.mapbox.com/)

### PWA
- [MDN - Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

---

## ⚡ Próximos Passos Imediatos

1. **Validar escopo do MVP** - O que é essencial para demo?
2. **Definir stack final** - Baseado em experiência da equipe
3. **Criar mockups** - Visualizar fluxo completo
4. **Testar APIs de voz** - Verificar qualidade em português
5. **Preparar dados mock** - Estações de exemplo para demo
6. **Estruturar pitch** - Narrativa clara e impactante

