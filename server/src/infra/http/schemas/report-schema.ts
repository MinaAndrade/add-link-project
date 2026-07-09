import { z } from 'zod';

export const reportSchema = {
  summary: 'Gerar relatorio',

  description:
    'Gera um relatorio CSV com os acessos dos links e retorna a URL publica do arquivo.',

  tags: ['Links'],

  response: {
    200: z.object({
      reportUrl: z.string().url(),
    }),
  },
};
