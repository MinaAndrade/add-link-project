import { env } from '@/env';
import type { Config } from 'drizzle-kit';

export default {
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  schema: './src/infra/db/schema/*.ts',
  out: './src/infra/db/migrations',
  dialect: 'postgresql',
} satisfies Config;
