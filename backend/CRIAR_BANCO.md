# Como Criar o Banco de Dados

O PostgreSQL está rodando, mas você precisa criar o banco de dados manualmente.

## Opção 1: Usando sudo (recomendado)

```bash
sudo -u postgres createdb dirce
```

Ou via psql:
```bash
sudo -u postgres psql
CREATE DATABASE dirce;
\q
```

## Opção 2: Criar usuário PostgreSQL para seu usuário do sistema

```bash
sudo -u postgres createuser -s $(whoami)
createdb dirce
```

## Opção 3: Usar senha do postgres

Se você souber a senha do usuário postgres:

```bash
# Definir variável PGPASSWORD
export PGPASSWORD=sua_senha
createdb -U postgres dirce
```

## Verificar se o banco foi criado

```bash
psql -U postgres -l | grep dirce
```

## Depois de criar o banco

1. Ajuste o `.env` se necessário (usuário/senha)
2. Execute as migrations:
   ```bash
   npx prisma migrate dev
   ```

