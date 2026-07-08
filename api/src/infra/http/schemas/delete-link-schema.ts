import { z } from 'zod';

import { errorResponseSchema } from './error-response-schema';

export const deleteLinkSchema = {
  summary: 'Excluir link',

  description: 'Remove um link pelo seu identificador.',

  tags: ['Links'],

  params: z.object({
    id: z.string(),
  }),

  response: {
    204: z.void(),
    404: errorResponseSchema,
  },
};
