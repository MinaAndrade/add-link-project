FROM node:20-alpine

RUN corepack enable
RUN corepack prepare pnpm@9.15.4 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --no-frozen-lockfile

COPY . .

EXPOSE 3333

CMD ["pnpm", "dev:docker"]