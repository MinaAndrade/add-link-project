# Brev.ly - Encurtador de Links

Aplicação fullstack desenvolvida para o desafio da pós-graduação Brev.ly. O projeto permite cadastrar, listar e remover links encurtados, redirecionar o codigo curto para a URL original, contabilizar acessos e gerar relatórios CSV enviados para o Cloudflare R2.

## Funcionalidades

- Cadastro de links a partir de uma URL original.
- Listagem dos links cadastrados.
- Remoção de links.
- Redirecionamento por código curto.
- Contabilização de acessos por link.
- Geração de relatório CSV com upload para Cloudflare R2.
- Documentação da API via Swagger.
- Execução local com Docker Compose.
- Testes automatizados no backend.

## Tecnologias

Backend:

- Node.js
- TypeScript
- Fastify
- Zod
- fastify-type-provider-zod
- Swagger/OpenAPI
- Drizzle ORM
- PostgreSQL
- Vitest
- Cloudflare R2

Frontend:

- React
- Vite
- TypeScript
- Tailwind CSS
- Axios
- TanStack React Query
- React Hook Form
- Zod
- Lucide React

Infraestrutura:

- Docker
- Docker Compose
- Terraform
- Cloudflare R2

## Estrutura

```txt
projeto_addLink/
|-- server/
|   |-- scripts/
|   |-- src/
|   |   |-- app/
|   |   |   |-- entities/
|   |   |   |-- errors/
|   |   |   |-- repositories/
|   |   |   |-- storage/
|   |   |   `-- use-cases/
|   |   |-- infra/
|   |   |   |-- db/
|   |   |   |-- http/
|   |   |   |-- repositories/
|   |   |   |-- storage/
|   |   |   `-- terraform/
|   |   `-- shared/
|   |-- Dockerfile
|   `-- package.json
|-- web/
|   |-- src/
|   |   |-- components/
|   |   |-- http/
|   |   |-- lib/
|   |   |-- pages/
|   |   `-- types/
|   |-- Dockerfile
|   `-- package.json
|-- docker-compose.yml
`-- README.md
```

## Pré-requisitos

- Node.js 20+
- PNPM 9+
- Docker
- Docker Compose

Verifique as instalações:

```bash
node -v
pnpm -v
docker -v
docker compose version
```

## Variaveis de ambiente

Crie o arquivo do backend a partir do exemplo:

```bash
cp server/.env.example server/.env
```

Exemplo de `server/.env`:

```env
PORT=3333
HOST=0.0.0.0
NODE_ENV=development

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=addlink

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/addlink"

CLOUDFLARE_ACCOUNT_ID=""
CLOUDFLARE_ACCESS_KEY_ID=""
CLOUDFLARE_SECRET_ACCESS_KEY=""
CLOUDFLARE_BUCKET=""
CLOUDFLARE_PUBLIC_URL="https://pub-example.r2.dev"
```

Crie também o arquivo do frontend, se precisar customizar a URL da API:

```bash
cp web/.env.example web/.env
```

Exemplo de `web/.env`:

```env
VITE_FRONTEND_URL="http://localhost:5173"
VITE_BACKEND_URL="http://localhost:3333"
```

## Executando com Docker

Na raiz do projeto:

```bash
docker compose up --build
```

Os serviços esperados são:

- `addlink-postgres`
- `addlink-server`
- `addlink-web`

Depois que os containers estiverem ativos, execute as migrations:

```bash
docker compose exec server pnpm db:migrate
```

Acesse:

```txt
Frontend: http://localhost:5173
API:      http://127.0.0.1:3333
Swagger:  http://127.0.0.1:3333/docs
```

Para parar os containers sem apagar os dados:

```bash
docker compose down
```

Evite usar `docker compose down -v` se quiser preservar o banco, pois esse comando remove os volumes.

## Executando localmente

Suba apenas o PostgreSQL:

```bash
docker compose up postgres
```

Em outro terminal, rode a API:

```bash
cd server
pnpm install
pnpm db:migrate
pnpm dev
```

Em outro terminal, rode o frontend:

```bash
cd web
pnpm install
pnpm dev
```

Acesse:

```txt
Frontend: http://localhost:5173
API:      http://127.0.0.1:3333
Swagger:  http://127.0.0.1:3333/docs
```

## Endpoints principais

| Método | Rota | Descricao |
| --- | --- | --- |
| `POST` | `/links` | Cria um link encurtado |
| `GET` | `/links` | Lista os links cadastrados |
| `DELETE` | `/links/:id` | Remove um link |
| `GET` | `/links/report` | Gera relatório CSV e retorna a URL pública |
| `GET` | `/:shortCode` | Redireciona para a URL original |

Observação: a rota `GET /:shortCode` deve ser testada diretamente no navegador. O "Try it out" do Swagger pode falhar por CORS ao seguir redirects externos.

## Testes e qualidade

Backend:

```bash
cd server
pnpm test
```

O fluxo de testes cria o banco `addlink_test` quando necessário, executa as migrations e roda o Vitest.

Comandos úteis da API:

```bash
pnpm dev
pnpm build
pnpm test
pnpm lint
pnpm format
pnpm db:generate
pnpm db:migrate
pnpm db:studio
```

Comandos úteis do frontend:

```bash
pnpm dev
pnpm build
pnpm lint
pnpm format
pnpm preview
```

## Banco de dados

O projeto usa PostgreSQL com Drizzle ORM. A tabela principal e `links`, com os campos:

- `id`
- `original_url`
- `short_code`
- `access_count`
- `created_at`

As migrations ficam em:

```txt
server/src/infra/db/migrations
```

Para gerar uma nova migration após alterar o schema:

```bash
cd server
pnpm db:generate
pnpm db:migrate
```

## Relatorios e Cloudflare R2

A rota `GET /links/report` gera um CSV com os links cadastrados, envia o arquivo para o Cloudflare R2 e retorna uma URL pública:

```json
{
  "reportUrl": "https://pub-example.r2.dev/reports/report-123.csv"
}
```

Variáveis necessárias para o R2:

```env
CLOUDFLARE_ACCOUNT_ID=""
CLOUDFLARE_ACCESS_KEY_ID=""
CLOUDFLARE_SECRET_ACCESS_KEY=""
CLOUDFLARE_BUCKET=""
CLOUDFLARE_PUBLIC_URL=""
```

## Infraestrutura como código

A configuração Terraform fica em:

```txt
server/src/infra/terraform
```

Arquivos principais:

- `providers.tf`
- `variables.tf`
- `main.tf`
- `outputs.tf`
- `terraform.tfvars.example`

Fluxo básico:

```bash
cd server/src/infra/terraform
cp terraform.tfvars.example terraform.tfvars
terraform init
terraform plan
```

O arquivo `terraform.tfvars` deve conter valores reais apenas no ambiente local e não deve ser commitado.

Arquivos que não devem ir para o repositório:

```txt
server/src/infra/terraform/.terraform/
server/src/infra/terraform/.terraform.lock.hcl
server/src/infra/terraform/terraform.tfstate
server/src/infra/terraform/terraform.tfstate.backup
server/src/infra/terraform/terraform.tfvars
```

## Observações de segurança

- Nunca commite arquivos `.env`.
- Nunca commite `terraform.tfvars` com tokens reais.
- Nunca commite `terraform.tfstate`, pois ele pode conter dados sensíveis da infraestrutura.
- Caso um token tenha sido versionado por engano, revogue-o e gere uma nova credencial.

## Solução de problemas

Porta ocupada:

```bash
docker compose down
netstat -ano | findstr :3333
taskkill /PID NUMERO_DO_PID /F
```

Docker não conecta ao daemon:

```txt
permission denied while trying to connect to the docker API
```

Verifique se o Docker Desktop esta aberto e se o terminal esta rodando com permissão para acessar o Docker.

Banco sem dados apos reiniciar:

- `docker compose down` preserva os dados.
- `docker compose down -v` remove os volumes e apaga os dados.

Erro de conexão com `localhost`:

Use `127.0.0.1` para acessar a API:

```txt
http://127.0.0.1:3333
```

## Status de validação

Durante a revisão do projeto, foram validados:

```txt
API TypeScript
API build
Testes unitários da API
Frontend TypeScript
Frontend build
Docker Compose config
```
