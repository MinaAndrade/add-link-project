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

# Infrastructure as Code (IaC) com Terraform

Este projeto utiliza Terraform para modelar a infraestrutura em nuvem da Cloudflare.

A configuração está localizada em:

```txt
infra/terraform
```

Recursos gerenciados:

- Cloudflare R2 Bucket utilizado para armazenar os relatórios CSV da aplicação.

---

## Estrutura

```txt
infra/
└── terraform/
    ├── providers.tf
    ├── variables.tf
    ├── main.tf
    ├── outputs.tf
    └── terraform.tfvars.example
```

---

## Instalação do Terraform

### Windows

1. Acesse:

https://developer.hashicorp.com/terraform/downloads

2. Baixe:

```txt
Windows AMD64
```

3. Extraia o arquivo ZIP.

4. Crie a pasta:

```txt
C:\Terraform
```

5. Copie:

```txt
terraform.exe
```

para dentro dessa pasta.

6. Adicione ao PATH:

```txt
Painel de Controle
→ Sistema
→ Configurações avançadas do sistema
→ Variáveis de Ambiente
→ Path
→ Novo
→ C:\Terraform
```

7. Abra um novo terminal e valide:

```bash
terraform version
```

Resultado esperado:

```txt
Terraform v1.x.x
```

---

## Obtendo credenciais da Cloudflare

### Account ID

Acesse:

```txt
Cloudflare Dashboard
→ R2 Object Storage
```

ou

```txt
Cloudflare Dashboard
→ Manage Account
```

Copie o valor:

```txt
Account ID
```

---

### API Token

Acesse:

```txt
Cloudflare Dashboard
→ My Profile
→ API Tokens
→ Create Token
→ Custom Token
```

Permissões:

```txt
Account Permissions
│
└── Workers R2 Storage
    └── Edit
```

Recursos:

```txt
Include
└── Sua conta Cloudflare
```

ou

```txt
Include
└── All Accounts
```

Clique:

```txt
Continue to Summary
Create Token
```

Copie o token gerado.

⚠️ O token será exibido apenas uma vez.

---

## Configuração das variáveis

Entre na pasta:

```bash
cd infra/terraform
```

Copie o arquivo exemplo:

```bash
cp terraform.tfvars.example terraform.tfvars
```

Preencha:

```hcl
cloudflare_api_token  = "SEU_TOKEN"
cloudflare_account_id = "SEU_ACCOUNT_ID"

r2_bucket_name = "add-link"
r2_location    = "ENAM"
```

---

## Inicializar Terraform

```bash
terraform init
```

Resultado esperado:

```txt
Terraform has been successfully initialized!
```

---

## Bucket já existente

Como o bucket foi criado manualmente durante o desenvolvimento, ele deve ser importado para o Terraform.

Execute:

```bash
terraform import cloudflare_r2_bucket.reports <ACCOUNT_ID>/add-link
```

Exemplo:

```bash
terraform import cloudflare_r2_bucket.reports 123456789abcdef/add-link
```

---

## Validar a infraestrutura

Execute:

```bash
terraform plan
```

Resultado esperado:

```txt
No changes. Your infrastructure matches the configuration.
```

Se aparecer:

```txt
destroy and create replacement
```

não execute o apply antes de revisar.

---

## Aplicar alterações futuras

Quando houver alterações na infraestrutura:

```bash
terraform apply
```

---

## Outputs

Visualizar outputs:

```bash
terraform output
```

Exemplo:

```txt
r2_bucket_name = "add-link"
r2_bucket_location = "ENAM"
```

---

## Arquivos importantes

### providers.tf

Configuração do provider Cloudflare.

### variables.tf

Definição das variáveis utilizadas pela infraestrutura.

### main.tf

Recursos da infraestrutura.

### outputs.tf

Valores retornados após aplicação da infraestrutura.

### terraform.tfvars

Valores reais utilizados no ambiente.

⚠️ Não deve ser commitado.

---

## Git Ignore

Adicionar ao `.gitignore` da raiz:

```gitignore
# Terraform
infra/terraform/.terraform/
infra/terraform/.terraform.lock.hcl
infra/terraform/terraform.tfstate
infra/terraform/terraform.tfstate.backup
infra/terraform/terraform.tfvars

# Env
.env
api/.env
api/.env.test
web/.env

# Dependencies
node_modules
api/node_modules
web/node_modules

# Build
dist
api/dist
web/dist
coverage
```

---

## Fluxo utilizado neste projeto

1. Bucket R2 criado inicialmente na Cloudflare.
2. Bucket importado para o Terraform.
3. Terraform passou a gerenciar o recurso.
4. Estado validado com:

```bash
terraform plan
```

5. Infraestrutura sincronizada quando o resultado foi:

```txt
No changes. Your infrastructure matches the configuration.
```

---

## Benefícios do IaC

- Infraestrutura versionada junto ao código.
- Revisão através de Pull Requests.
- Reprodutibilidade do ambiente.
- Redução de erros manuais.
- Governança e rastreabilidade.
- Facilidade para novos desenvolvedores reproduzirem o ambiente.

---

## Comandos úteis

Inicializar:

```bash
terraform init
```

Validar:

```bash
terraform validate
```

Planejar:

```bash
terraform plan
```

Aplicar:

```bash
terraform apply
```

Visualizar outputs:

```bash
terraform output
```

Importar recurso existente:

```bash
terraform import cloudflare_r2_bucket.reports <ACCOUNT_ID>/add-link
```

Destruir recursos (não utilizar neste projeto):

```bash
terraform destroy
```
