# 🍽️ Dirce - Hackathon Devs de Impacto

**Tema:** Insegurança Alimentar  
**Evento:** Hackathon Devs de Impacto (36 horas)  
**Objetivo:** Desenvolver solução de IA para conectar pessoas em situação de vulnerabilidade a estações de alimentação

---

## 📋 Sobre o Projeto

**Dirce** é um app web (mobile-oriented) que guia pessoas até estações de alimentação usando interface por voz, tokens rastreáveis onchain e integração com Google Maps.

### Conceito
- Interface acessível por áudio para pessoas com baixa alfabetização ou deficiência visual
- Sistema de tokens onchain para rastreabilidade e combate a fraudes
- Cartão físico distribuído pelo CRAS com saldo onchain
- Navegação inteligente até estações de alimentação mais próximas

---

## 📁 Estrutura do Projeto

```
devs_de_impacto/
├── README.md                          # Este arquivo
├── projeto.txt                        # Ideia inicial
├── readme/
│   └── img/
│       └── dirce_logo.png            # Logo para documentação (README, apresentações)
├── frontend/
│   ├── public/                       # Assets públicos do frontend (Vite)
│   │   ├── Dircê.png                 # Logo da aplicação (usado no app)
│   │   ├── favicon.ico
│   │   └── ...
│   └── src/                          # Código fonte do frontend
├── backend/                          # API NestJS
├── docs/
│   ├── research/
│   │   └── 2025-01-27_hackathon-devs-de-impacto.md
│   └── notes/
│       └── 2025-01-27_analise-ideia-dirce.md
└── ...
```

### 📸 Assets e Imagens

- **`readme/img/`** - Imagens para documentação (README, apresentações, documentação externa)
  - `dirce_logo.png` - Logo para uso em documentação
  
- **`frontend/public/`** - Assets públicos do frontend (servidos diretamente pelo Vite)
  - `Dircê.png` - Logo da aplicação (usado no componente `DirceAvatar`)
  - `favicon.ico` - Favicon do app
  - Outros assets estáticos (manifest.json, robots.txt, etc.)

**Nota:** O frontend usa `frontend/public/` (padrão Vite), não um diretório `static`. Assets em `public/` são acessíveis via `/nome-do-arquivo.ext` no app.

---

## 🎯 Jornada do Usuário

1. **Acesso:** Usuário abre o app e encontra a Dirce
2. **Localização:** Fala sua localização por áudio
3. **Busca:** Recebe estações mais próximas por áudio
4. **Escolha:** Seleciona estação por áudio
5. **Navegação:** Recebe link do Google Maps com destino marcado
6. **Deslocamento:** Inicia jornada até o local
7. **Uso:** Chegando no local, interage e usa o cartão para "pagar" por uma refeição

---

## 🚀 Status do Projeto

- [x] Pesquisa sobre o hackathon
- [x] Análise da ideia inicial
- [x] Definição do MVP
- [x] Escolha da stack tecnológica
- [x] Setup inicial (Next.js + NestJS)
- [ ] Desenvolvimento
- [ ] Testes
- [ ] Apresentação

---

## 📚 Documentação

### Pesquisa
- **[Hackathon Devs de Impacto](./docs/research/2025-01-27_hackathon-devs-de-impacto.md)** - Contexto do evento, características, projetos vencedores anteriores

### Análise e Planejamento
- **[Análise da Ideia Dirce](./docs/notes/2025-01-27_analise-ideia-dirce.md)** - Análise detalhada, pontos fortes, desafios, sugestões de melhoria
- **[Decisões Técnicas](./docs/notes/2025-01-27_decisoes-tecnicas.md)** - ✅ Todas as decisões confirmadas
- **[Arquitetura Técnica](./docs/notes/2025-01-27_arquitetura-tecnica.md)** - Arquitetura completa, fluxos, estrutura de dados
- **[Plano de Implementação](./docs/notes/2025-01-27_plano-implementacao.md)** - Cronograma detalhado para 36h

### Setup
- **[Guia de Setup](./docs/SETUP.md)** - Instruções completas para configurar o ambiente

---

## 🛠️ Stack Tecnológica

### ✅ Stack Completa Definida
- **Frontend:** [Next.js](https://nextjs.org/) (App Router, TypeScript)
- **Backend:** [NestJS](https://docs.nestjs.com/) (TypeScript)
- **Banco de Dados:** PostgreSQL (Prisma/TypeORM)
- **Blockchain:** [Stellar](https://developers.stellar.org/docs) (testnet, token customizado "REFEICAO")
- **Áudio:** [Eleven Labs](https://elevenlabs.io/developers) (STT + TTS)
- **Mapas:** Google Maps API

### Características
- **Acesso:** Público (sem login)
- **Cartão:** Mockado (tipo Kast, apenas storytelling)
- **Pagamento:** NFC mockado (aproximação)
- **Dados:** Mockados/inflados para MVP

---

## 💡 Próximos Passos

1. ✅ Todas as decisões técnicas confirmadas
2. ✅ **Setup inicial completo:**
   - ✅ Projetos Next.js e NestJS criados
   - ✅ Schema Prisma configurado
   - ✅ PostgreSQL configurado para localhost (arquivo .env criado)
   - ✅ Script de setup do banco criado (`backend/setup-db.sh`)
   - ⏳ Criar banco de dados (executar `./setup-db.sh`)
   - ⏳ Obter chaves de API (Google Maps, Eleven Labs)
3. **Desenvolvimento:**
   - Ver [Plano de Implementação](./docs/notes/2025-01-27_plano-implementacao.md)
   - Ver [Guia de Setup](./docs/SETUP.md) para configurar ambiente
4. **Preparar dados mock:**
   - Estações de exemplo
   - Wallets Stellar de teste
5. **Estruturar pitch de apresentação**

---

## 🚀 Quick Start

```bash
# 1. Configurar Banco de Dados (PostgreSQL local)
cd backend
./setup-db.sh  # Cria o banco 'dirce' se não existir
# Ou manualmente: createdb -U postgres dirce

# 2. Frontend
cd frontend
npm install
npm run dev  # http://localhost:3000

# 3. Backend
cd backend
npm install
# .env já está configurado para localhost
npx prisma migrate dev  # Criar tabelas
npm run start:dev  # http://localhost:3001
```

**Nota:** O arquivo `.env` do backend já está configurado para PostgreSQL localhost (`postgresql://postgres:postgres@localhost:5432/dirce`). Ajuste usuário/senha se necessário.

Ver [Guia de Setup completo](./docs/SETUP.md) para mais detalhes.

---

## 📖 Referências

- [Hackathon Devs de Impacto - Correio Braziliense](https://www.correiobraziliense.com.br/brasil/2025/10/7282645-curitiba-recebe-evento-que-promove-inteligencia-artificial-como-servico-social.html)
- [Projeto Clima Seguro (Vencedor 2025)](https://iabrasilnoticias.com.br/estudantes-de-sao-paulo-vencem-hackathon-com-plataforma-de-ia-que-calcula-custo-de-desastres-climaticos/)
- [ODS 2 - Fome Zero](https://brasil.un.org/pt-br/sdgs/2)

---

## 👥 Equipe

_[A ser preenchido]_

---

## 📝 Licença

_[A definir]_

