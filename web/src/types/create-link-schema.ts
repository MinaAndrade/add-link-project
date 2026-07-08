import { z } from 'zod';

export const createLinkSchema = z.object({
  originalUrl: z.string().url('Informe uma URL válida.'),
});

export type CreateLinkSchema = z.infer<typeof createLinkSchema>;
