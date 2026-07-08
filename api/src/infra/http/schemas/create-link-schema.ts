import { z } from 'zod';

import { errorResponseSchema } from './error-response-schema';

const linkResponseSchema = z.object({
  id: z.string(),
  originalUrl: z.string().url(),
  shortCode: z.string(),
  accessCount: z.number(),
  createdAt: z.date(),
});

export const createLinkSchema = {
  summary: 'Criar link encurtado',

  description: 'Cria um novo link encurtado a partir de uma URL original.',

  tags: ['Links'],

  body: z.object({
    originalUrl: z.string().url(),
  }),

  response: {
    201: linkResponseSchema,
    400: errorResponseSchema,
  },
};
