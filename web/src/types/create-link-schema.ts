import { z } from 'zod';

export const createLinkSchema = z.object({
  originalUrl: z.string().url('Informe uma URL válida.'),
  shortCode: z
    .string()
    .min(3, 'Informe pelo menos 3 caracteres.')
    .max(10, 'Informe no máximo 10 caracteres.')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Use apenas letras, números, hífen e underline.'
    ),
});

export type CreateLinkSchema = z.output<typeof createLinkSchema>;
