import { z } from 'zod';

const linkResponseSchema = z.object({
  id: z.string(),
  shortCode: z.string(),
  originalUrl: z.string().url(),
  accessCount: z.number(),
  createdAt: z.date(),
});

export const fetchLinksSchema = {
  summary: 'Listar links',

  description: 'Retorna todos os links cadastrados.',

  tags: ['Links'],

  response: {
    200: z.array(linkResponseSchema),
  },
};
