# Brev.ly Web

Frontend React + Vite do encurtador de links Brev.ly.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- TanStack React Query
- React Hook Form
- Zod
- Axios
- Lucide React

## Comandos

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm format
pnpm preview
```

## Variáveis de Ambiente

```env
VITE_FRONTEND_URL="http://localhost:5173"
VITE_BACKEND_URL="http://localhost:3333"
```

## Rotas

```txt
/            Home
/:shortCode  Redirecionamento
```

Qualquer rota que não corresponda a um `shortCode` válido renderiza a tela 404.

## Design e Tema

Os tokens reais de cor, fonte e espaçamento ficam em `tailwind.config.js`. As decisões de design e o guia de componentes ficam documentados em `STYLEGUIDE.md`.

