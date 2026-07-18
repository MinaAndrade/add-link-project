import { z } from 'zod';

import { errorResponseSchema } from './error-response-schema';

export const resolveLinkSchema = {
  hide: true,

  summary: 'Resolver link encurtado',

  description:
    'Resolve o codigo curto para a URL original e contabiliza um acesso sem executar o redirect HTTP.',

  tags: ['Links'],

  params: z.object({
    shortCode: z.string(),
  }),

  response: {
    200: z.object({
      originalUrl: z.string().url(),
    }),
    404: errorResponseSchema,
  },
};
