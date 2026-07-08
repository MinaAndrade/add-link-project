# AddLink — Encurtador de Links

Projeto Fullstack desenvolvido para o desafio da Pós-Graduação, com foco em arquitetura moderna, separação de responsabilidades e boas práticas de desenvolvimento.

## Objetivo

O AddLink é uma aplicação para encurtamento de links que permite:

- cadastrar links encurtados;
- listar links cadastrados;
- excluir links;
- redirecionar o link encurtado para a URL original;
- contabilizar acessos;
- gerar relatório CSV;
- disponibilizar documentação da API;
- executar a aplicação com Docker.

## Tecnologias

### Backend

- Node.js
- TypeScript
- Fastify
- Zod
- Drizzle ORM
- PostgreSQL
- Docker
- Swagger/OpenAPI
- Vitest
- Cloudflare R2

### Frontend

- React
- Vite
- TypeScript
- Tailwind CSS
- Axios
- React Query
- React Hook Form
- Zod
- Lucide React

### DevOps

- Docker
- Docker Compose
- PostgreSQL containerizado
- Variáveis de ambiente

## Estrutura do projeto

```txt
projeto_addLink
├── api
│   ├── scripts
│   ├── src
│   │   ├── app
│   │   │   ├── entities
│   │   │   ├── errors
│   │   │   ├── repositories
│   │   │   ├── storage
│   │   │   └── use-cases
│   │   ├── infra
│   │   |   ├── db
│   │   |   ├── http
│   │   |   ├── mappers
│   │   |   ├── plugins
│   │   |   ├── repositories
│   │   |   └── storage
│   └── └── shared
│           └── utils
│
├── web
│   ├── src
│   │   ├── components
│   │   │   └── ui
│   │   ├── http
│   │   ├── lib
│   │   ├── pages
│   └── └── types
├── docker-compose.yml
└── README.md
```

# Como rodar o projeto

## Pré-requisitos

Antes de iniciar o projeto, é necessário possuir instalado:

- Node.js 20+
- PNPM 9+
- Docker
- Docker Compose

Verifique as versões:

```bash
node -v
pnpm -v
docker -v
docker compose version
```

---

# Opção 1 — Executando com Docker

Na raiz do projeto execute:

```bash
docker compose up --build
```

Aguarde a criação dos containers:

```txt
addlink-postgres
addlink-api
addlink-web
```

Após os containers iniciarem, execute as migrations:

```bash
docker compose exec api pnpm db:migrate
```

Acesse:

```txt
Frontend:
http://localhost:5173

API:
http://127.0.0.1:3333

Swagger:
http://127.0.0.1:3333/docs
```

---

# Opção 2 — Executando localmente

## 1. Subir apenas o banco de dados

Na raiz:

```bash
docker compose up postgres
```

---

## 2. Rodar Backend

Acesse:

```bash
cd api
```

Instale as dependências:

```bash
pnpm install
```

Execute as migrations:

```bash
pnpm db:migrate
```

Inicie a API:

```bash
pnpm dev
```

API disponível em:

```txt
http://127.0.0.1:3333
```

---

## 3. Rodar Frontend

Em outro terminal:

```bash
cd web
```

Instale as dependências:

```bash
pnpm install
```

Inicie o frontend:

```bash
pnpm dev
```

Frontend disponível em:

```txt
http://localhost:5173
```

---

# Variáveis de Ambiente

## API (.env)

```env
PORT=3333
HOST=0.0.0.0

DATABASE_URL=postgres://postgres:postgres@localhost:5432/addlink

CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_ACCESS_KEY_ID=
CLOUDFLARE_SECRET_ACCESS_KEY=
CLOUDFLARE_BUCKET_NAME=
CLOUDFLARE_PUBLIC_URL=
```

---

## API (.env.test)

```env
NODE_ENV=test
PORT=3334

DATABASE_URL=postgres://postgres:postgres@localhost:5432/addlink_test
```

---

# Como executar os testes

Certifique-se de que o PostgreSQL está rodando.

Entre na pasta da API:

```bash
cd api
```

Execute:

```bash
pnpm test
```

Fluxo executado automaticamente:

```txt
1. Cria o banco addlink_test (caso não exista)
2. Executa as migrations
3. Executa os testes Vitest
```

---

# Como gerar novas migrations

Após alterar o schema do banco:

```bash
pnpm db:generate
```

Aplicar migrations:

```bash
pnpm db:migrate
```

---

# Como abrir o Drizzle Studio

```bash
pnpm db:studio
```

---

# Documentação da API

Swagger disponível em:

```txt
http://127.0.0.1:3333/docs
```

---

# Possíveis erros e soluções

## Erro: EADDRINUSE: address already in use ::1:3333

### Exemplo

```txt
Error: listen EADDRINUSE: address already in use ::1:3333
```

### Causa

A porta 3333 já está sendo utilizada por outro processo.

### Solução

Parar containers Docker:

```bash
docker compose down
```

Ou identificar o processo no Windows:

```bash
netstat -ano | findstr :3333
```

Finalizar processo:

```bash
taskkill /PID NUMERO_DO_PID /F
```

---

## Erro: connect ECONNREFUSED ::1:3333

### Exemplo

```txt
connect ECONNREFUSED ::1:3333
```

### Causa

O localhost está resolvendo para IPv6 (`::1`).

### Solução

Utilizar:

```txt
http://127.0.0.1:3333
```

Ao invés de:

```txt
http://localhost:3333
```

---

## Erro: database "addlink_test" does not exist

### Exemplo

```txt
PostgresError: database "addlink_test" does not exist
```

### Solução

Executar:

```bash
pnpm db:create:test
```

ou:

```bash
docker compose exec postgres psql -U postgres -c "CREATE DATABASE addlink_test;"
```

Depois:

```bash
pnpm db:migrate:test
```

---

## Erro: password authentication failed

### Exemplo

```txt
PostgresError: password authentication failed
```

### Causa

Usuário ou senha incorretos no DATABASE_URL.

### Solução

Verificar:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/addlink
```

e também:

```yaml
POSTGRES_USER: postgres
POSTGRES_PASSWORD: postgres
```

no docker-compose.

---

## Erro: variáveis Cloudflare undefined

### Exemplo

```txt
CLOUDFLARE_ACCOUNT_ID -> undefined
```

### Solução

Verificar se o arquivo `.env` possui:

```env
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_ACCESS_KEY_ID=
CLOUDFLARE_SECRET_ACCESS_KEY=
CLOUDFLARE_BUCKET_NAME=
CLOUDFLARE_PUBLIC_URL=
```

E se o Docker está carregando corretamente o arquivo:

```yaml
env_file:
  - ./api/.env
```

---

## Erro: módulos não encontrados no Docker

### Exemplo

```txt
Cannot find module 'tsx'
Cannot find module 'vite'
Cannot find package 'esbuild'
```

### Solução

Garantir que existem os arquivos:

### /api/.dockerignore

```txt
node_modules
dist
.env
.env.test
coverage
```

### /web/.dockerignore

```txt
node_modules
dist
.env
coverage
```

Depois reconstruir:

```bash
docker compose down -v
docker compose build --no-cache
docker compose up
```

---

# Scripts disponíveis

## API

```bash
pnpm dev
pnpm dev:docker

pnpm build

pnpm test
pnpm test:watch

pnpm db:generate
pnpm db:migrate
pnpm db:migrate:test
pnpm db:create:test
pnpm db:studio

pnpm format
pnpm lint
```

## Frontend

```bash
pnpm dev

pnpm build

pnpm format
pnpm lint
```
