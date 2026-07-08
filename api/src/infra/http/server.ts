import { env } from '@/env';

import { buildApp } from './app';

async function bootstrap() {
  const app = await buildApp();

  await app.listen({
    port: env.PORT,
  });

  console.log('HTTP Server running!');
}

bootstrap();
