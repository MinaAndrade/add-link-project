import { FastifyReply, FastifyRequest } from 'fastify';

import { makeGenerateReportUseCase } from '../factories/make-generate-report-use-case';

export async function generateReportController(
  _: FastifyRequest,
  reply: FastifyReply
) {
  const useCase = makeGenerateReportUseCase();

  const csv = await useCase.execute();

  reply
    .header('Content-Type', 'text/csv')
    .header('Content-Disposition', 'attachment; filename="links-report.csv"');

  return reply.send(csv);
}
